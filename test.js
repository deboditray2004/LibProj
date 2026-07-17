import mongoose from 'mongoose';

async function run() {
    await mongoose.connect('mongodb+srv://deboditray2004:Debodit%401494@librarycluster.6v8y4.mongodb.net/Library?retryWrites=true&w=majority&appName=LibraryCluster');
    const Student = mongoose.model('Student', new mongoose.Schema({ pendingEdits: mongoose.Schema.Types.Mixed, name: String, email: String, addr: String }));
    const s = await Student.find({ pendingEdits: { $ne: null } });
    console.log(JSON.stringify(s, null, 2));
    process.exit(0);
}
run();
