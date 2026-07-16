import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import os from 'os'

import { Student } from '../models/student.model.js'
import { Order } from '../models/order.model.js'
import { Transaction } from '../models/transaction.model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const BASE = 'http://localhost:8000/api'

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

async function verifyEmails() {
  console.log('\n--- 1. Email Delivery Verification (Post-Fix) ---')
  const logFile = path.resolve(os.tmpdir(), 'mail_log.json')
  if (fs.existsSync(logFile)) fs.unlinkSync(logFile)

  const empCookies = await empLogin()
  
  let fixtureC = await Order.findOne({ 'requesters.10': { $exists: true } }).populate('requesters')
  if (!fixtureC) {
      console.log('No fixture with 10+ requesters found, creating one...')
      const requesters = await Student.find({ status: 'Approved' }).limit(12)
      fixtureC = await Order.create({
          globalBookId: 'qa_high_demand_003',
          orderTitle: 'QA Email Test Book 3',
          authors: ['QA'],
          category: ['Testing'],
          copiesOrdered: 5,
          requesters: requesters.map(s => s._id),
          status: 'Pending Delivery'
      })
      fixtureC = await Order.findById(fixtureC._id).populate('requesters')
  }

  // Ensure it's Pending Delivery
  if (fixtureC.status !== 'Pending Delivery') {
      fixtureC.status = 'Pending Delivery'
      await fixtureC.save()
  }

  const expectedEmails = fixtureC.requesters.map(r => r.email)
  console.log(`Expected emails count: ${expectedEmails.length}`)

  const r = await req('POST', `/books/orders/receive/${fixtureC._id}`, null, empCookies)
  console.log(`Receive order status: ${r.status}`)

  console.log('Waiting 30 seconds for SMTP delivery...')
  await new Promise(resolve => setTimeout(resolve, 30000)) // wait for mailer

  let delivered = []
  let failed = []
  if (fs.existsSync(logFile)) {
    const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n').filter(Boolean)
    lines.forEach(l => {
      try {
        const parsed = JSON.parse(l)
        if (parsed.success) delivered.push(parsed)
        else failed.push(parsed)
      } catch (e) {}
    })
  }

  console.log(`Actual emails delivered: ${delivered.length}`)
  console.log(`Actual emails failed: ${failed.length}`)
  if (delivered.length === expectedEmails.length) {
    console.log('✅ Email delivery verified')
  } else {
    console.log('❌ Email delivery failed or partial')
    if (failed.length > 0) console.log('First failure:', failed[0])
  }
}

async function verifyBlastRadius() {
  console.log('\n--- 2. Blast Radius Verification ---')

  // Check 1: Fixture A (payAll-eligible) - cardNo 7001
  const studentA = await Student.findOne({ rollNo: 7001 })
  console.log(`\nFixture A (rollNo 7001):`)
  if (!studentA) {
      console.log('❌ Missing!')
  } else {
      console.log(`Status: ${studentA.status}, CardNo: ${studentA.cardNo}, Name: ${studentA.name}`)
      const txnsA = await Transaction.find({ s_id: studentA._id }).lean()
      console.log(`Transactions: ${txnsA.length}`)
      txnsA.forEach(t => console.log(`  - txn ${t._id}: frozenFine=${t.frozenFine}, amountCollected=${t.amountCollected}`))
  }

  // Check 2: Fixture B (payAll-overdue) - cardNo 7002
  const studentB = await Student.findOne({ rollNo: 7002 })
  console.log(`\nFixture B (rollNo 7002):`)
  if (!studentB) {
      console.log('❌ Missing!')
  } else {
      console.log(`Status: ${studentB.status}, CardNo: ${studentB.cardNo}, Name: ${studentB.name}`)
      const txnsB = await Transaction.find({ s_id: studentB._id }).lean()
      console.log(`Transactions: ${txnsB.length}`)
      txnsB.forEach(t => console.log(`  - txn ${t._id}: frozenFine=${t.frozenFine}, amountCollected=${t.amountCollected}`))
  }

  // Check 3: Check a specific transaction with renewalCnt 1 or 2
  console.log(`\nFixture C (Renewal count txns):`)
  const renewedTxns = await Transaction.find({ renewalCnt: { $gte: 1 } }).lean()
  if (renewedTxns.length === 0) {
      console.log('❌ No renewed transactions found. They might have been deleted or modified.')
  } else {
      console.log(`Found ${renewedTxns.length} renewed transactions. Sample:`)
      console.log(`  - txn ${renewedTxns[0]._id}: renewalCnt=${renewedTxns[0].renewalCnt}, dueDate=${renewedTxns[0].dueDate}`)
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  await verifyEmails()
  await verifyBlastRadius()

  await mongoose.disconnect()
  process.exit(0)
}

main().catch(err => {
  console.error('❌ QA failed:', err)
  process.exit(1)
})
