import cron from "node-cron";
import { Transaction } from "../models/transaction.model.js";
import { sendMail } from "../utils/mailer.js";

export const startOverdueWarningsCron = () => {
    // Run daily at 9:00 AM
    cron.schedule("0 9 * * *", async () => {
        try {
            const now = new Date();
            const overdueTxns = await Transaction.find({
                rtrnDate: { $exists: false },
                dueDate: { $lt: now }
            }).populate("s_id", "name email").populate("b_id", "title");

            for (const txn of overdueTxns) {
                if (txn.s_id && txn.s_id.email) {
                    await sendMail(
                        txn.s_id.email,
                        "Overdue Book Warning",
                        `<p>Hello ${txn.s_id.name},</p><p>Your borrowed book <strong>${txn.b_id?.title || 'Book'}</strong> was due on ${new Date(txn.dueDate).toLocaleDateString()}. Please return or renew it as soon as possible to avoid accumulating further fines.</p>`
                    ).catch(e => console.error("Cron mail error:", e));
                }
            }
            console.log(`[Cron] Overdue warnings sent for ${overdueTxns.length} books.`);
        } catch (error) {
            console.error("[Cron Error] Failed to process overdue warnings:", error);
        }
    });
};
