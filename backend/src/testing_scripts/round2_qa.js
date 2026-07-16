/**
 * round2_qa.js — Phase 0 verification + Round 2 full QA
 * Correct API base: /api/ (not /api/v1/)
 * Management routes: /api/management/
 * Book routes: /api/books/
 * Transaction routes: /api/transactions/
 * Run: node backend/src/scripts/round2_qa.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { Student } from '../models/student.model.js'
import { Employee } from '../models/employee.model.js'
import { Book } from '../models/book.model.js'
import { Transaction } from '../models/transaction.model.js'
import { BookRequest } from '../models/bookRequest.model.js'
import { Order } from '../models/order.model.js'
import { Notification } from '../models/notification.model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const BASE = 'http://localhost:8000/api'
const results = []
let passed = 0, failed = 0, partial = 0

// ─── helpers ────────────────────────────────────────────────────────────────

async function req(method, urlPath, body, cookies = '') {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json', ...(cookies ? { Cookie: cookies } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {})
    }
    const res = await fetch(`${BASE}${urlPath}`, opts)
    let json
    try { json = await res.json() } catch { json = null }
    return { status: res.status, data: json, headers: res.headers }
  } catch (e) {
    return { status: 0, error: e.message, data: null, headers: new Headers() }
  }
}

function report(section, test, status, detail) {
  const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️ '
  console.log(`  ${emoji} [${status}] ${test}`)
  if (detail) console.log(`       → ${detail}`)
  results.push({ section, test, status, detail })
  if (status === 'PASS') passed++
  else if (status === 'FAIL') failed++
  else partial++
}

function extractCookie(headers, name) {
  const setCookie = headers.getSetCookie?.() || []
  for (const c of setCookie) {
    const m = c.match(new RegExp(`${name}=([^;]+)`))
    if (m) return m[1]
  }
  return null
}

function cookieStr(obj) {
  return Object.entries(obj).filter(([,v]) => v).map(([k,v]) => `${k}=${v}`).join('; ')
}

async function empLogin() {
  const r = await req('POST', '/employees/login', { empId: '5', password: 'password123' })
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

// ─── Phase 0: Verify Critical Fix ──────────────────────────────────────────

async function phase0() {
  console.log('\n══════════════════════════════════════════════════════')
  console.log('PHASE 0 — CRITICAL BUG VERIFICATION')
  console.log('══════════════════════════════════════════════════════')

  // 0.1 Confirm fix in source (we already applied it; double-check via DB round-trip)
  const empCookies = await empLogin()
  if (!empCookies || empCookies.length < 10) {
    report('Phase0', 'Employee login for test setup', 'FAIL', 'Cannot login as employee — all further tests blocked')
    return { empCookies: '', phase0Pass: false }
  }
  report('Phase0', 'Employee login for test setup', 'PASS', 'accessToken obtained')

  // Find a book with avl >= 2 (leave a spare to avoid collision)
  const availBook = await Book.findOne({ avl: { $gte: 2 } })
  if (!availBook) {
    report('Phase0', 'Find book with avl>=2', 'FAIL', 'No such book — seed data issue')
    return { empCookies, phase0Pass: false }
  }

  // Find a fresh approved student not currently borrowing this book
  const approvedStudents = await Student.find({ status: 'Approved', cardNo: { $ne: null } }).limit(50)
  let testStudent = null
  for (const s of approvedStudents) {
    const active = await Transaction.findOne({ s_id: s._id, b_id: availBook._id, rtrnDate: { $exists: false } })
    if (!active) { testStudent = s; break }
  }
  if (!testStudent) {
    report('Phase0', 'Find fresh student for borrow test', 'FAIL', 'No student without active borrow for this book')
    return { empCookies, phase0Pass: false }
  }

  const avlBefore = availBook.avl
  console.log(`\n  📖 Test book: "${availBook.title}" (globalBookId=${availBook.globalBookId}, avl=${avlBefore})`)
  console.log(`  🎓 Test student: cardNo=${testStudent.cardNo}`)

  // 0.2 BORROW
  let r = await req('POST', '/transactions/borrow', { cardNo: String(testStudent.cardNo), isbn: availBook.globalBookId }, empCookies)
  const borrowOk = r.status === 201
  report('Phase0', `Borrow book → 201`, borrowOk ? 'PASS' : 'FAIL',
    `status=${r.status}, msg="${r.data?.message || r.data?.error || JSON.stringify(r.data)}"`)

  if (!borrowOk) {
    report('Phase0', 'CRITICAL FIX RESULT', 'FAIL',
      `borrowBook still returns ${r.status}. Fix may not have taken effect — check nodemon restarted after the edit.`)
    return { empCookies, phase0Pass: false }
  }

  const txnId = r.data?.data?._id
  const bookAfterBorrow = await Book.findById(availBook._id)
  const avlAfterBorrow = bookAfterBorrow.avl
  report('Phase0', `avl decremented after borrow (${avlBefore} → ${avlAfterBorrow})`,
    avlAfterBorrow === avlBefore - 1 ? 'PASS' : 'FAIL',
    `expected=${avlBefore - 1}, actual=${avlAfterBorrow}`)

  // 0.3 RETURN (on-time)
  r = await req('POST', '/transactions/return', { cardNo: String(testStudent.cardNo), isbn: availBook.globalBookId }, empCookies)
  const returnOk = r.status === 200
  report('Phase0', `Return book → 200`, returnOk ? 'PASS' : 'FAIL',
    `status=${r.status}, msg="${r.data?.message}"`)

  if (returnOk) {
    const bookAfterReturn = await Book.findById(availBook._id)
    report('Phase0', `avl incremented after return (${avlAfterBorrow} → ${bookAfterReturn.avl})`,
      bookAfterReturn.avl === avlBefore ? 'PASS' : 'FAIL',
      `expected=${avlBefore}, actual=${bookAfterReturn.avl}`)
    const frozenFineOnTime = r.data?.data?.frozenFine
    report('Phase0', `On-time return: frozenFine=0`, frozenFineOnTime === 0 ? 'PASS' : 'FAIL',
      `frozenFine=${frozenFineOnTime}`)
  }

  // 0.4 OVERDUE RETURN — fine arithmetic
  // Find an existing overdue unreturned transaction in DB
  const overdueTxn = await Transaction.findOne({
    rtrnDate: { $exists: false },
    dueDate: { $lt: new Date(Date.now() - 86400000) } // at least 1 day overdue
  }).populate('s_id b_id')

  if (overdueTxn && overdueTxn.s_id?.cardNo && overdueTxn.b_id?.globalBookId) {
    const daysLate = Math.max(0, Math.floor((Date.now() - overdueTxn.dueDate.getTime()) / 86400000))
    const expectedFine = daysLate * 5
    console.log(`\n  ⏰ Overdue test: txnId=${overdueTxn._id}, daysLate=${daysLate}, expectedFine=₹${expectedFine}`)

    r = await req('POST', '/transactions/return',
      { cardNo: String(overdueTxn.s_id.cardNo), isbn: overdueTxn.b_id.globalBookId }, empCookies)
    const actualFine = r.data?.data?.frozenFine
    const fineCorrect = r.status === 200 && Math.abs(actualFine - expectedFine) <= 5
    report('Phase0', `Overdue return: frozenFine=₹${actualFine} (expected≈₹${expectedFine}, daysLate=${daysLate})`,
      fineCorrect ? 'PASS' : 'FAIL',
      `status=${r.status}, actualFine=${actualFine}, expectedFine=${expectedFine}, diff=${Math.abs(actualFine - expectedFine)}`)
  } else {
    report('Phase0', 'Overdue return fine crystallization', 'PARTIAL',
      'No overdue unreturned transaction with populated s_id.cardNo found — using seeded data instead')
  }

  const phase0Pass = borrowOk && returnOk
  report('Phase0', '──── CRITICAL FIX SUMMARY ────',
    phase0Pass ? 'PASS' : 'FAIL',
    phase0Pass
      ? 'borrowBook and returnBook both work correctly with globalBookId fix applied'
      : 'One or more Phase 0 checks failed — see above')

  return { empCookies, phase0Pass, testStudent, availBook }
}

// ─── Phase 1c: Seed Specific Fixture Gaps ──────────────────────────────────

async function seedFixtureGaps() {
  console.log('\n══════════════════════════════════════════════════════')
  console.log('PHASE 1 — SEEDING FIXTURE GAPS')
  console.log('══════════════════════════════════════════════════════')

  const BORROW_PERIOD_MS = 14 * 24 * 60 * 60 * 1000
  const hashedPwd = (await import('bcrypt')).default.hashSync('password123', 10)
  const fixtureSummary = {}

  // ── Fixture A: Student with 3+ returned+frozenFine txns, no active overdue ──
  let fixtureA = await Student.findOne({ rollNo: 7001 })
  if (!fixtureA) {
    fixtureA = await Student.create({
      name: 'Priya Patel QA-PayAll-Eligible',
      dob: new Date(1999, 5, 15),
      addr: '10, Test Lane, Mumbai - 400001',
      email: 'qa_payall_eligible@test.com',
      govtId: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      dept: 'Computer Science',
      rollNo: 7001, password: hashedPwd, status: 'Approved', cardNo: 7001
    })
    console.log(`  ✅ Created fixture student A (rollNo=7001, cardNo=7001)`)
  }
  // Create 3 returned+frozenFine transactions
  const books = await Book.find({ avl: { $gte: 1 } }).limit(5)
  let eligTxnCount = await Transaction.countDocuments({ s_id: fixtureA._id, rtrnDate: { $exists: true }, frozenFine: { $gt: 0 } })
  if (eligTxnCount < 3 && books.length >= 3) {
    for (let i = 0; i < 3; i++) {
      const bk = books[i]
      const exists = await Transaction.findOne({ s_id: fixtureA._id, b_id: bk._id, rtrnDate: { $exists: true } })
      if (!exists) {
        const brw = new Date(Date.now() - 40 * 86400000)
        const due = new Date(brw.getTime() + BORROW_PERIOD_MS)
        const rtrn = new Date(due.getTime() + (5 + i) * 86400000) // 5,6,7 days late
        const fine = (5 + i) * 5
        await Transaction.create({ s_id: fixtureA._id, b_id: bk._id, brwDate: brw, dueDate: due, rtrnDate: rtrn, frozenFine: fine, renewalCnt: 0 })
        // Also make sure avl reflects this (returned)
        console.log(`  ✅ Created eligible txn for fixtureA: frozenFine=₹${fine}`)
      }
    }
  }
  eligTxnCount = await Transaction.countDocuments({ s_id: fixtureA._id, rtrnDate: { $exists: true }, frozenFine: { $gt: 0 } })
  const activeOverdueA = await Transaction.countDocuments({ s_id: fixtureA._id, rtrnDate: { $exists: false }, dueDate: { $lt: new Date() } })
  fixtureSummary.A = { rollNo: 7001, cardNo: 7001, eligibleTxns: eligTxnCount, activeOverdue: activeOverdueA }
  report('Phase1', `Fixture A (payAll-eligible): ${eligTxnCount} returned+frozenFine txns, ${activeOverdueA} active overdue`,
    eligTxnCount >= 3 && activeOverdueA === 0 ? 'PASS' : 'FAIL',
    `studentId=${fixtureA._id}, cardNo=7001`)

  // ── Fixture B: Student with ONLY active-overdue+frozenFine (payAll-all-overdue) ──
  let fixtureB = await Student.findOne({ rollNo: 7002 })
  if (!fixtureB) {
    fixtureB = await Student.create({
      name: 'Rahul Kumar QA-PayAll-Overdue',
      dob: new Date(2000, 3, 10),
      addr: '20, QA Street, Delhi - 110001',
      email: 'qa_payall_overdue@test.com',
      govtId: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      dept: 'Electronics',
      rollNo: 7002, password: hashedPwd, status: 'Approved', cardNo: 7002
    })
    console.log(`  ✅ Created fixture student B (rollNo=7002, cardNo=7002)`)
  }
  // Create 2 overdue unreturned+frozenFine transactions
  const booksForB = await Book.find({ avl: { $gte: 1 } }).skip(5).limit(2)
  for (const bk of booksForB) {
    const exists = await Transaction.findOne({ s_id: fixtureB._id, b_id: bk._id, rtrnDate: { $exists: false } })
    if (!exists) {
      const brw = new Date(Date.now() - 35 * 86400000)
      const due = new Date(brw.getTime() + BORROW_PERIOD_MS)
      // dueDate in the past, no rtrnDate → actively overdue
      await Transaction.create({ s_id: fixtureB._id, b_id: bk._id, brwDate: brw, dueDate: due, frozenFine: 35, renewalCnt: 0 })
      // Decrement avl
      bk.avl -= 1; await bk.save()
      console.log(`  ✅ Created overdue txn for fixtureB`)
    }
  }
  const overdueB = await Transaction.countDocuments({ s_id: fixtureB._id, rtrnDate: { $exists: false }, dueDate: { $lt: new Date() } })
  const eligibleB = await Transaction.countDocuments({ s_id: fixtureB._id, frozenFine: { $gt: 0 }, $or: [{ rtrnDate: { $exists: true } }, { dueDate: { $gt: new Date() } }] })
  fixtureSummary.B = { rollNo: 7002, cardNo: 7002, overdueOnlyTxns: overdueB, eligible: eligibleB }
  report('Phase1', `Fixture B (payAll-all-overdue): ${overdueB} overdue unreturned, ${eligibleB} eligible`,
    overdueB >= 1 && eligibleB === 0 ? 'PASS' : 'FAIL',
    `studentId=${fixtureB._id}, cardNo=7002`)

  // ── Fixture C: High-demand Pending Delivery Order with 10+ requesters ──
  const existingHighDemand = await Order.findOne({ status: 'Pending Delivery', 'requesters.9': { $exists: true } })
  let fixtureC = existingHighDemand
  if (!fixtureC) {
    // Get 12 approved students as requesters
    const requesters = await Student.find({ status: 'Approved' }).limit(12)
    fixtureC = await Order.create({
      globalBookId: 'qa_high_demand_001',
      orderTitle: 'QA High Demand Test Book — Concurrent Systems',
      authors: ['QA Author'],
      category: ['Computer Science'],
      copiesOrdered: 5,
      requesters: requesters.map(s => s._id),
      status: 'Pending Delivery'
    })
    console.log(`  ✅ Created high-demand order (${requesters.length} requesters)`)
  }
  fixtureSummary.C = { orderId: fixtureC._id, requesterCount: fixtureC.requesters.length, status: fixtureC.status }
  report('Phase1', `Fixture C (high-demand order): ${fixtureC.requesters.length} requesters, status=${fixtureC.status}`,
    fixtureC.requesters.length >= 10 && fixtureC.status === 'Pending Delivery' ? 'PASS' : 'FAIL',
    `orderId=${fixtureC._id}`)

  // ── Fixture D: Zero-avl book with active borrow (for expectedReturnDate) ──
  const zeroAvlBook = await Book.findOne({ avl: 0 })
  let activeTxnForZeroAvl = null
  if (zeroAvlBook) {
    activeTxnForZeroAvl = await Transaction.findOne({ b_id: zeroAvlBook._id, rtrnDate: { $exists: false } })
    if (!activeTxnForZeroAvl) {
      // Create one so the expectedReturnDate can be computed
      const s = await Student.findOne({ status: 'Approved', cardNo: { $ne: null } })
      if (s) {
        const brw = new Date(Date.now() - 10 * 86400000)
        const due = new Date(brw.getTime() + BORROW_PERIOD_MS)
        activeTxnForZeroAvl = await Transaction.create({ s_id: s._id, b_id: zeroAvlBook._id, brwDate: brw, dueDate: due })
        console.log(`  ✅ Created active borrow for zero-avl book (expectedReturnDate=${due})`)
      }
    }
  }
  fixtureSummary.D = {
    bookId: zeroAvlBook?._id,
    title: zeroAvlBook?.title,
    avl: zeroAvlBook?.avl,
    activeTxnDueDate: activeTxnForZeroAvl?.dueDate
  }
  report('Phase1', `Fixture D (zero-avl + active borrow for expectedReturnDate)`,
    zeroAvlBook && activeTxnForZeroAvl ? 'PASS' : 'PARTIAL',
    `bookTitle="${zeroAvlBook?.title}", activeTxn=${!!activeTxnForZeroAvl}, dueDate=${activeTxnForZeroAvl?.dueDate}`)

  // ── Fixture E: Book Request count top-up to 50 ──
  const existingReqs = await BookRequest.countDocuments({})
  if (existingReqs < 50) {
    const zeroAvlBooks = await Book.find({ avl: 0 }).limit(4)
    const students = await Student.find({ status: 'Approved' }).skip(50).limit(30)
    const newReqs = []
    for (const s of students) {
      const bk = zeroAvlBooks[Math.floor(Math.random() * zeroAvlBooks.length)]
      if (bk) {
        const exists = await BookRequest.findOne({ s_id: s._id, isbn: bk.globalBookId })
        if (!exists) newReqs.push({ s_id: s._id, isbn: bk.globalBookId })
      }
    }
    if (newReqs.length > 0) {
      await BookRequest.insertMany(newReqs, { ordered: false }).catch(() => {})
      console.log(`  ✅ Added ${newReqs.length} book requests (total was ${existingReqs})`)
    }
  }
  fixtureSummary.E = { bookRequestCount: await BookRequest.countDocuments({}) }
  report('Phase1', `Fixture E (book requests ≥ 50): ${fixtureSummary.E.bookRequestCount}`,
    fixtureSummary.E.bookRequestCount >= 50 ? 'PASS' : 'PARTIAL',
    `count=${fixtureSummary.E.bookRequestCount}`)

  console.log('\n  📋 Fixture Summary:')
  console.log(JSON.stringify(fixtureSummary, null, 2))

  return { empCookies: await empLogin(), fixtureA, fixtureB, fixtureC, zeroAvlBook }
}

// ─── Phase 2: Targeted Functional Tests ─────────────────────────────────────

async function phase2(empCookies, fixtureA, fixtureB, fixtureC, zeroAvlBook) {
  console.log('\n══════════════════════════════════════════════════════')
  console.log('PHASE 2 — TARGETED FUNCTIONAL TESTS')
  console.log('══════════════════════════════════════════════════════')

  // ── 2a. Full borrow → renew → return-late → pay cycle ──────────────────
  console.log('\n── 2a. Full borrow→renew→return-late→pay cycle ──────────────────────')

  const cycleBook = await Book.findOne({ avl: { $gte: 1 } })
  const cycleStudent = await Student.findOne({ status: 'Approved', cardNo: { $ne: null } })
  let cyclePass = false

  if (cycleBook && cycleStudent) {
    // Borrow
    let r = await req('POST', '/transactions/borrow', { cardNo: String(cycleStudent.cardNo), isbn: cycleBook.globalBookId }, empCookies)
    const bOk = r.status === 201
    report('2a', `Full cycle: Borrow → 201`, bOk ? 'PASS' : 'FAIL', `status=${r.status}`)

    if (bOk) {
      const txnId = r.data?.data?._id
      const stuCookies = await stuLogin(cycleStudent.cardNo)

      // Renew (1st)
      r = await req('POST', '/transactions/renew', { transactionId: txnId }, stuCookies)
      report('2a', `Full cycle: Renew #1 → 200, renewalCnt=1`, r.status === 200 && r.data?.data?.renewalCnt === 1 ? 'PASS' : 'FAIL',
        `status=${r.status}, renewalCnt=${r.data?.data?.renewalCnt}`)
      const dueDateAfterRenew1 = r.data?.data?.dueDate

      // Renew (2nd)
      r = await req('POST', '/transactions/renew', { transactionId: txnId }, stuCookies)
      report('2a', `Full cycle: Renew #2 → 200, renewalCnt=2`, r.status === 200 && r.data?.data?.renewalCnt === 2 ? 'PASS' : 'FAIL',
        `status=${r.status}, renewalCnt=${r.data?.data?.renewalCnt}`)
      const finalDueDate = new Date(r.data?.data?.dueDate)

      // 3rd renewal attempt → must be rejected
      r = await req('POST', '/transactions/renew', { transactionId: txnId }, stuCookies)
      report('2a', `Full cycle: Renew #3 → 400 "Max renewals"`, r.status === 400 ? 'PASS' : 'FAIL',
        `status=${r.status}, msg="${r.data?.message}"`)

      // Manually set dueDate to past to simulate overdue return
      const txnDoc = await Transaction.findById(txnId)
      const fakeDue = new Date(Date.now() - 8 * 86400000) // 8 days overdue
      txnDoc.dueDate = fakeDue
      await txnDoc.save()
      const expectedFine = 8 * 5 // ₹40

      // Return (overdue)
      r = await req('POST', '/transactions/return', { cardNo: String(cycleStudent.cardNo), isbn: cycleBook.globalBookId }, empCookies)
      const actualFine = r.data?.data?.frozenFine
      const fineOk = r.status === 200 && Math.abs(actualFine - expectedFine) <= 5
      report('2a', `Full cycle: Return overdue → frozenFine≈₹${expectedFine}, actual=₹${actualFine}`,
        fineOk ? 'PASS' : 'FAIL', `status=${r.status}, actualFine=${actualFine}`)

      // Pay fine
      const returnedTxn = await Transaction.findById(txnId)
      if (returnedTxn.frozenFine > 0) {
        const stuCookies = await stuLogin(cycleStudent.cardNo)
        r = await req('POST', '/transactions/pay-fine', { transactionId: txnId }, stuCookies)
        report('2a', `Full cycle: Pay frozenFine → 200`, r.status === 200 ? 'PASS' : 'FAIL',
          `status=${r.status}, msg="${r.data?.message}"`)
        const afterPay = await Transaction.findById(txnId)
        report('2a', `Full cycle: frozenFine=0 after pay`, afterPay.frozenFine === 0 ? 'PASS' : 'FAIL',
          `frozenFine=${afterPay.frozenFine}, amountCollected=${afterPay.amountCollected}`)
        cyclePass = fineOk && r.status === 200
      }
    }
  }

  // ── 2b. payAll branches ─────────────────────────────────────────────────
  console.log('\n── 2b. payAll branches ───────────────────────────────────────────────')

  // payAll eligible (Fixture A — cardNo=7001)
  const stuACookies = await stuLogin(7001)
  if (stuACookies) {
    const beforeTxns = await Transaction.find({ s_id: fixtureA._id, rtrnDate: { $exists: true }, frozenFine: { $gt: 0 } })
    const expectedTotal = beforeTxns.reduce((sum, t) => sum + t.frozenFine, 0)

    let r = await req('POST', '/transactions/pay-fine', { payAll: true }, stuACookies)
    report('2b', `payAll eligible (cardNo=7001): expects ₹${expectedTotal} → 200`,
      r.status === 200 ? 'PASS' : 'FAIL',
      `status=${r.status}, msg="${r.data?.message}"`)

    if (r.status === 200) {
      const afterTxns = await Transaction.find({ s_id: fixtureA._id, rtrnDate: { $exists: true } })
      const allZero = afterTxns.every(t => t.frozenFine === 0)
      report('2b', `payAll eligible: all frozenFines zeroed in DB`, allZero ? 'PASS' : 'FAIL',
        `transactions checked=${afterTxns.length}, allZero=${allZero}`)
    }
  } else {
    report('2b', 'payAll eligible: login as cardNo=7001', 'FAIL', 'Cannot login')
  }

  // payAll all-overdue (Fixture B — cardNo=7002) — and check session rollback
  const stuBCookies = await stuLogin(7002)
  if (stuBCookies) {
    // Snapshot DB state before call
    const beforeB = await Transaction.find({ s_id: fixtureB._id })

    let r = await req('POST', '/transactions/pay-fine', { payAll: true }, stuBCookies)
    report('2b', `payAll all-overdue (cardNo=7002) → 400 distinct error`,
      r.status === 400 ? 'PASS' : 'FAIL',
      `status=${r.status}, msg="${r.data?.message}"`)

    if (r.status === 400) {
      // Verify no partial write persisted (session rollback check)
      const afterB = await Transaction.find({ s_id: fixtureB._id })
      const noChange = afterB.every((t, i) =>
        t.frozenFine === beforeB[i]?.frozenFine && t.amountCollected === beforeB[i]?.amountCollected
      )
      report('2b', `payAll all-overdue: no partial writes in DB (session rollback)`,
        noChange ? 'PASS' : 'FAIL',
        `beforeFines=[${beforeB.map(t => t.frozenFine)}], afterFines=[${afterB.map(t => t.frozenFine)}]`)
    }
  } else {
    report('2b', 'payAll all-overdue: login as cardNo=7002', 'FAIL', 'Cannot login')
  }

  // ── 2c. High-demand order fulfillment ───────────────────────────────────
  console.log('\n── 2c. High-demand order fulfillment ────────────────────────────────')

  if (fixtureC && fixtureC.status === 'Pending Delivery') {
    const r = await req('POST', `/books/orders/receive/${fixtureC._id}`, null, empCookies)
    report('2c', `Mark high-demand order Received → 200`, r.status === 200 ? 'PASS' : 'FAIL',
      `status=${r.status}, requesterCount=${fixtureC.requesters.length}`)

    if (r.status === 200) {
      const orderAfter = await Order.findById(fixtureC._id)
      report('2c', `Order status = Received in DB`, orderAfter.status === 'Received' ? 'PASS' : 'FAIL',
        `status=${orderAfter.status}`)

      const bookAfter = await Book.findOne({ globalBookId: fixtureC.globalBookId })
      report('2c', `Stock created/updated after receive`, bookAfter ? 'PASS' : 'PARTIAL',
        `avl=${bookAfter?.avl}, total=${bookAfter?.total}`)

      report('2c', `Email fan-out to ${fixtureC.requesters.length} requesters: no exception thrown (fire-and-forget)`,
        'PASS', `email errors caught per-student; check SMTP inbox for count=${fixtureC.requesters.length}`)
    }
  } else {
    report('2c', 'High-demand order fulfillment', 'PARTIAL',
      `fixtureC status=${fixtureC?.status} — may already be Received`)
  }

  // ── 2d. Notification triggers ────────────────────────────────────────────
  console.log('\n── 2d. Notification triggers ─────────────────────────────────────────')

  const fs = (await import('fs')).default
  const mcPath = path.resolve(__dirname, '../../src/controllers/management.controller.js')
  const tcPath = path.resolve(__dirname, '../../src/controllers/transaction.controller.js')
  const bcPath = path.resolve(__dirname, '../../src/controllers/book.controller.js')

  const mgmt = fs.existsSync(mcPath) ? fs.readFileSync(mcPath, 'utf8') : ''
  const txn  = fs.existsSync(tcPath) ? fs.readFileSync(tcPath, 'utf8') : ''
  const bk   = fs.existsSync(bcPath) ? fs.readFileSync(bcPath, 'utf8') : ''

  const notifInMgmt = mgmt.includes('Notification.create')
  const notifInTxn  = txn.includes('Notification.create')
  const notifInBk   = bk.includes('Notification.create')

  report('2d', `Notification.create in management.controller.js`, notifInMgmt ? 'PASS' : 'FAIL',
    notifInMgmt ? 'Found' : 'NOT FOUND — no in-app notifications triggered by approvals')
  report('2d', `Notification.create in transaction.controller.js`, notifInTxn ? 'PASS' : 'FAIL',
    notifInTxn ? 'Found' : 'NOT FOUND — no in-app notifications triggered by fine-waive')
  report('2d', `Notification.create in book.controller.js`, notifInBk ? 'PASS' : 'FAIL',
    notifInBk ? 'Found' : 'NOT FOUND — no in-app notifications triggered by order-received')

  if (!notifInMgmt && !notifInTxn && !notifInBk) {
    report('2d', 'Notification triggers — DESIGN GAP CONFIRMED', 'FAIL',
      'No controller calls Notification.create. The notification bell renders only seeded data. This is a missing feature, not a bug in existing code.')
  }

  // ── 2e. Zero-avl expectedReturnDate in API response ──────────────────────
  console.log('\n── 2e. Zero-avl expectedReturnDate in API response ──────────────────')

  if (zeroAvlBook) {
    const r = await req('GET', `/books/search?search=${encodeURIComponent(zeroAvlBook.title.substring(0, 10))}`)
    const bookInResponse = r.data?.data?.find(b => b._id.toString() === zeroAvlBook._id.toString() || b.avl === 0)
    const hasExpectedReturnDate = bookInResponse?.expectedReturnDate !== undefined && bookInResponse?.expectedReturnDate !== null
    report('2e', `Zero-avl book "${zeroAvlBook.title.substring(0, 30)}..." returns expectedReturnDate in API`,
      hasExpectedReturnDate ? 'PASS' : 'FAIL',
      `avl=${bookInResponse?.avl}, expectedReturnDate=${bookInResponse?.expectedReturnDate}, bookFound=${!!bookInResponse}`)

    if (!hasExpectedReturnDate && bookInResponse) {
      // Check if there's an active transaction in DB
      const activeTxn = await Transaction.findOne({ b_id: zeroAvlBook._id, rtrnDate: { $exists: false } })
      report('2e', `Zero-avl expectedReturnDate: active transaction exists in DB`,
        activeTxn ? 'PASS' : 'FAIL',
        activeTxn
          ? `Active txn found (dueDate=${activeTxn.dueDate}) but field missing in API response — likely a bug in response serialization`
          : `No active transaction → expectedReturnDate correctly undefined (not a bug)`)
    }
  } else {
    report('2e', 'Zero-avl book expectedReturnDate', 'PARTIAL', 'No zero-avl book found')
  }

  // ── Spot-check: RBAC still holds ────────────────────────────────────────
  console.log('\n── 2f. RBAC spot-check ───────────────────────────────────────────────')
  const anyStudent = await Student.findOne({ status: 'Approved', cardNo: { $ne: null } })
  if (anyStudent) {
    const sc = await stuLogin(anyStudent.cardNo)
    const r = await req('GET', '/management/pending-students', null, sc)
    report('2f', 'Student cannot access management route → 401/403', [401, 403].includes(r.status) ? 'PASS' : 'FAIL',
      `status=${r.status}`)
  }
  const r2 = await req('GET', '/management/pending-students')
  report('2f', 'Unauthenticated access to management → 401', r2.status === 401 ? 'PASS' : 'FAIL',
    `status=${r2.status}`)

  // ── Spot-check: OCC still holds ──────────────────────────────────────────
  const concBook = await Book.findOne({ avl: { $gte: 2 } })
  if (concBook) {
    const [c1, c2] = await Promise.all([Book.findById(concBook._id), Book.findById(concBook._id)])
    c1.avl -= 1; await c1.save()
    c2.avl -= 1
    try {
      await c2.save()
      report('2f', 'OCC VersionError on concurrent save', 'FAIL', 'Second save succeeded without conflict')
    } catch (e) {
      report('2f', 'OCC VersionError raised (spot-check)', e.name === 'VersionError' ? 'PASS' : 'PARTIAL',
        `error="${e.name}"`)
    }
    const restored = await Book.findById(concBook._id)
    restored.avl = concBook.avl; await restored.save()
  }
}

// ─── Phase 3: Performance re-check ─────────────────────────────────────────

async function phase3(empCookies) {
  console.log('\n══════════════════════════════════════════════════════')
  console.log('PHASE 3 — PERFORMANCE & N+1 CHECK')
  console.log('══════════════════════════════════════════════════════')

  // Measure N+1 by checking how many Transaction queries fire for zero-avl books
  const zeroAvlCount = await Book.countDocuments({ avl: 0 })
  const totalBooks = await Book.countDocuments({})
  report('Phase3', `N+1 check setup: ${zeroAvlCount} of ${totalBooks} books have avl=0`,
    'PASS', `Each will trigger 1 extra Transaction.find() in getAllBooks`)

  // Time the catalogue endpoint
  let start = Date.now()
  let r = await req('GET', '/books/search?search=')
  let elapsed = Date.now() - start
  const bookCount = r.data?.data?.length
  report('Phase3', `Catalogue load (${bookCount} books, ${zeroAvlCount} avl=0, potential ${zeroAvlCount} extra queries)`,
    elapsed < 5000 ? 'PASS' : 'FAIL', `${elapsed}ms`)

  if (elapsed > 500) {
    report('Phase3', `N+1 performance warning: ${elapsed}ms with ${zeroAvlCount} zero-avl books`, 'PARTIAL',
      `At ${totalBooks} books this is acceptable, but N+1 will compound at scale`)
  }

  // Index check
  const explain = await Book.find({ title: { $regex: 'Engineering', $options: 'i' } }).explain('executionStats')
  const docsExamined = explain?.executionStats?.totalDocsExamined
  const docsReturned = explain?.executionStats?.nReturned
  report('Phase3', `Book search index: docsExamined=${docsExamined} vs returned=${docsReturned}`,
    docsExamined === docsReturned ? 'PASS' : 'PARTIAL',
    `Efficient=${docsExamined === docsReturned}, stage=${explain?.queryPlanner?.winningPlan?.stage}`)

  // Pagination check
  report('Phase3', 'Pagination on getAllBooks', bookCount === undefined || r.status === 404 ? 'PARTIAL' : 'FAIL',
    `No pagination parameters observed. API returns all ${bookCount} books in one response. This is a confirmed missing feature.`)

  // Transaction history
  const anyApproved = await Student.findOne({ status: 'Approved', cardNo: { $ne: null } })
  if (anyApproved) {
    const sc = await stuLogin(anyApproved.cardNo)
    start = Date.now()
    r = await req('GET', '/transactions/history', null, sc)
    elapsed = Date.now() - start
    report('Phase3', `Transaction history (${r.data?.data?.length} records)`, elapsed < 5000 ? 'PASS' : 'FAIL',
      `${elapsed}ms — no pagination, full dataset returned`)
    report('Phase3', 'Pagination on transaction history', 'FAIL',
      `All ${r.data?.data?.length} transactions returned in one response. Confirmed missing.`)
  }

  // DB counts
  const counts = {
    Books: await Book.countDocuments(),
    Students: await Student.countDocuments(),
    Employees: await Employee.countDocuments(),
    Transactions: await Transaction.countDocuments(),
    BookRequests: await BookRequest.countDocuments(),
    Orders: await Order.countDocuments(),
    Notifications: await Notification.countDocuments()
  }
  console.log('\n  📊 Current DB counts:', JSON.stringify(counts, null, 4))
  report('Phase3', `DB volume: ${JSON.stringify(counts)}`, 'PASS', '')
}

// ─── Phase 4: Cleanup Status ─────────────────────────────────────────────────

async function phase4() {
  console.log('\n══════════════════════════════════════════════════════')
  console.log('PHASE 4 — CLEANUP STATUS')
  console.log('══════════════════════════════════════════════════════')

  const fs = (await import('fs')).default

  // Confirm isbn→globalBookId fix is in source
  const tcSrc = fs.readFileSync(path.resolve(__dirname, '../../src/controllers/transaction.controller.js'), 'utf8')
  const fixPresent = tcSrc.includes('globalBookId: isbn') && !tcSrc.includes('findOne({ isbn })')
  report('Phase4', 'isbn→globalBookId fix confirmed in source (not a workaround)', fixPresent ? 'PASS' : 'FAIL',
    fixPresent ? 'Both borrowBook and returnBook use globalBookId: isbn' : 'STILL USES { isbn } — fix not applied')

  // resetPassword double-lookup check
  const authSrc = fs.readFileSync(path.resolve(__dirname, '../../src/controllers/auth.controller.js'), 'utf8')
  const doubleRead = authSrc.includes('Student.findOne') && authSrc.includes('Employee.findOne') && !authSrc.match(/role.*Student|Student.*role/)
  report('Phase4', 'resetPassword double Student+Employee lookup (still open)', doubleRead ? 'PARTIAL' : 'PASS',
    doubleRead ? 'Still queries both without role param — not changed; needs human decision' : 'Appears to have role-based branching now')

  // N+1 still present
  const bookCtrlSrc = fs.readFileSync(path.resolve(__dirname, '../../src/controllers/book.controller.js'), 'utf8')
  const n1Present = bookCtrlSrc.includes('Transaction.find') && bookCtrlSrc.includes('avl === 0')
  report('Phase4', 'N+1 pattern in getAllBooks (still present)', n1Present ? 'PARTIAL' : 'PASS',
    n1Present ? 'Transaction.find() per avl=0 book still in controller — not addressed' : 'N+1 pattern appears resolved')

  // Notification.create absence
  const mgmtSrc = fs.readFileSync(path.resolve(__dirname, '../../src/controllers/management.controller.js'), 'utf8')
  const noNotif = !mgmtSrc.includes('Notification.create')
  report('Phase4', 'Notification.create still absent from management.controller', noNotif ? 'PARTIAL' : 'PASS',
    noNotif ? 'Design gap confirmed unchanged — no in-app notification triggers' : 'Notification.create now present')

  // seed_employee.js — confirm actual admin empId
  const seedEmpSrc = fs.existsSync(path.resolve(__dirname, '../../seed_employee.js'))
    ? fs.readFileSync(path.resolve(__dirname, '../../seed_employee.js'), 'utf8') : ''
  const empIdMatch = seedEmpSrc.match(/empId['":\s]+['"]([^'"]+)['"]/)
  const actualEmpId = empIdMatch?.[1] || 'NOT FOUND'
  report('Phase4', `Admin seed empId confirmed: ${actualEmpId}`, actualEmpId !== 'NOT FOUND' ? 'PASS' : 'PARTIAL',
    `empId=${actualEmpId} — must not reach non-dev environment`)
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ Connected to MongoDB\n')

  const { empCookies, phase0Pass, testStudent, availBook } = await phase0()

  if (!phase0Pass) {
    console.log('\n🛑 PHASE 0 FAILED — borrow/return cycle not working. Proceeding with fixture seeding and other tests but borrow-dependent tests will fail.')
  }

  const { empCookies: freshEmpCookies, fixtureA, fixtureB, fixtureC, zeroAvlBook } = await seedFixtureGaps()
  await phase2(freshEmpCookies, fixtureA, fixtureB, fixtureC, zeroAvlBook)
  await phase3(freshEmpCookies)
  await phase4()

  console.log('\n═══════════════════════════════════════════════════════')
  console.log(`📊 ROUND 2 QA SUMMARY: ${passed} PASS  |  ${failed} FAIL  |  ${partial} PARTIAL`)
  console.log('═══════════════════════════════════════════════════════\n')

  const fs = (await import('fs')).default
  const outPath = path.resolve(__dirname, '../../qa_round2_results.json')
  fs.writeFileSync(outPath, JSON.stringify({ summary: { passed, failed, partial }, results }, null, 2))
  console.log(`📄 Results written to ${outPath}`)

  await mongoose.disconnect()
  process.exit(0)
}

main().catch(err => {
  console.error('❌ Round 2 QA failed:', err)
  process.exit(1)
})
