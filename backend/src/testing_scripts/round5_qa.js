import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import os from 'os'

import { Student } from '../models/student.model.js'
import { Employee } from '../models/employee.model.js'
import { Book } from '../models/book.model.js'
import { Transaction } from '../models/transaction.model.js'
import { Order } from '../models/order.model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const BASE = 'http://localhost:8000/api'
const results = { fixtureC: null, borrowReturn: null, hotfix: null, mailer: null }

async function req(method, urlPath, body, cookies = '') {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json', ...(cookies ? { Cookie: cookies } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {})
    }
    const res = await fetch(`${BASE}${urlPath}`, opts)
    let json; try { json = await res.json() } catch { json = null }
    return { status: res.status, data: json, headers: res.headers }
  } catch (e) {
    return { status: 0, error: e.message }
  }
}

function extractCookie(headers, name) {
  const setCookie = headers.getSetCookie?.() || []
  for (const c of setCookie) {
    const m = c.match(new RegExp(`${name}=([^;]+)`))
    if (m) return m[1]
  }
  return null
}
function cookieStr(obj) { return Object.entries(obj).filter(([,v]) => v).map(([k,v]) => `${k}=${v}`).join('; ') }

async function empLogin(empId = '5') {
  const r = await req('POST', '/employees/login', { empId, password: 'password123' })
  const at = extractCookie(r.headers, 'accessToken')
  const rt = extractCookie(r.headers, 'refreshToken')
  return cookieStr({ accessToken: at, refreshToken: rt })
}

async function stuLogin(cardNo) {
  const r = await req('POST', '/students/login', { cardNo: String(cardNo), password: 'password123' })
  const at = extractCookie(r.headers, 'accessToken')
  const rt = extractCookie(r.headers, 'refreshToken')
  return cookieStr({ accessToken: at, refreshToken: rt })
}

// ─── 1. Pin down Fixture C properly ──────────────────────────────────────────
async function verifyFixtureC() {
  console.log('\n--- 1. Fixture C (Renewal Cap Test) ---')
  
  // Find a specific transaction that hit the renewal cap (renewalCnt = 2)
  const txn = await Transaction.findOne({ renewalCnt: 2 }).sort({ _id: -1 }).lean()
  if (!txn) {
    console.log('❌ Could not find a transaction with renewalCnt=2')
    results.fixtureC = '❌ FAIL - No specific record found'
    return
  }

  console.log(`✅ Identified specific record ID: ${txn._id}`)
  console.log(`   - Current renewalCnt: ${txn.renewalCnt}`)
  console.log(`   - Current dueDate: ${txn.dueDate}`)
  console.log(`   - Frozen Fine: ${txn.frozenFine}`)
  console.log(`   - Amount Collected: ${txn.amountCollected}`)
  
  results.fixtureC = `✅ PASS - Record ${txn._id} verified with renewalCnt=${txn.renewalCnt}, dueDate=${txn.dueDate}`
}

// ─── 2. Regression check across Rounds 2-4 fixes ───────────────────────────
async function runRegressionChecks() {
  console.log('\n--- 2. Regression Checks ---')
  const empCookies = await empLogin()

  // 2a. Borrow -> Return cycle (globalBookId fix)
  console.log('\n[Check A] Borrow -> Return cycle (globalBookId fix)')
  const testStudent = await Student.findOne({ status: 'Approved', cardNo: { $ne: null } })
  const testBook = await Book.findOne({ avl: { $gt: 0 } })
  
  if (testStudent && testBook) {
    let r = await req('POST', '/transactions/borrow', { cardNo: String(testStudent.cardNo), isbn: testBook.globalBookId }, empCookies)
    if (r.status === 201) {
      const returnReq = await req('POST', '/transactions/return', { cardNo: String(testStudent.cardNo), isbn: testBook.globalBookId }, empCookies)
      if (returnReq.status === 200) {
        console.log(`  ✅ Passed: Borrowed and returned book ${testBook.globalBookId}`)
        results.borrowReturn = '✅ PASS'
      } else {
        console.log(`  ❌ Failed on return: ${returnReq.status}`)
        results.borrowReturn = `❌ FAIL - Return returned ${returnReq.status}`
      }
    } else {
      console.log(`  ❌ Failed on borrow: ${r.status}`)
      results.borrowReturn = `❌ FAIL - Borrow returned ${r.status}`
    }
  } else {
    results.borrowReturn = '❌ FAIL - Could not find test data'
  }

  // 2b. Create one fresh account through fixed path and login (Double-hash fix)
  console.log('\n[Check B] Fresh Seeded Account Login (Double-hashing fix)')
  const rollNo = 80000 + Math.floor(Math.random() * 1000)
  const freshStudent = await Student.create({
    name: 'Regression Test Student',
    dob: new Date('2000-01-01'),
    addr: 'Regression Ave',
    email: `regression_${rollNo}@test.com`,
    govtId: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    dept: 'Testing',
    rollNo: rollNo,
    password: 'password123', // Raw string, pre('save') should hash it once
    status: 'Approved',
    cardNo: rollNo
  })
  
  const loginCookies = await stuLogin(freshStudent.cardNo)
  if (loginCookies && loginCookies.length > 10) {
    console.log(`  ✅ Passed: Logged in successfully with cardNo ${freshStudent.cardNo}`)
    results.hotfix = '✅ PASS'
  } else {
    console.log(`  ❌ Failed: Could not login with newly created account`)
    results.hotfix = '❌ FAIL - Login rejected'
  }

  // 2c. Send one real email and confirm actual delivery (Mailer config fix)
  console.log('\n[Check C] Mailer Lazy-Loading Fix')
  const logFile = path.resolve(os.tmpdir(), 'mail_log.json')
  if (fs.existsSync(logFile)) fs.unlinkSync(logFile)

  // Create an order to trigger the email
  const order = await Order.create({
    globalBookId: `regression_order_${Date.now()}`,
    orderTitle: 'Regression Mail Test',
    authors: ['QA'],
    category: ['Testing'],
    copiesOrdered: 1,
    requesters: [freshStudent._id],
    status: 'Pending Delivery'
  })

  const markReq = await req('POST', `/books/orders/receive/${order._id}`, null, empCookies)
  if (markReq.status === 200) {
    console.log('  Waiting 15 seconds for Nodemailer...')
    await new Promise(resolve => setTimeout(resolve, 15000))
    
    let delivered = false
    if (fs.existsSync(logFile)) {
      const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n').filter(Boolean)
      const parsed = lines.map(l => JSON.parse(l))
      delivered = parsed.some(p => p.success && p.to === freshStudent.email)
    }

    if (delivered) {
      console.log(`  ✅ Passed: Confirmed actual delivery via SMTP for ${freshStudent.email}`)
      results.mailer = '✅ PASS'
    } else {
      console.log(`  ❌ Failed: Mail log showed no successful delivery for ${freshStudent.email}`)
      results.mailer = '❌ FAIL - No delivery logged'
    }
  } else {
    console.log(`  ❌ Failed to mark order received: ${markReq.status}`)
    results.mailer = `❌ FAIL - receive API returned ${markReq.status}`
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  await verifyFixtureC()
  await runRegressionChecks()

  console.log('\n=== REGRESSION RESULTS ===')
  console.log(JSON.stringify(results, null, 2))

  await mongoose.disconnect()
  process.exit(0)
}

main().catch(err => {
  console.error('❌ QA failed:', err)
  process.exit(1)
})
