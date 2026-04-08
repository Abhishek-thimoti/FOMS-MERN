const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');

const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', UserSchema);

async function run() {
    // Create
    let user = await User.create({ name: 'Alice' });
    // Read
    let found = await User.findById(user._id);
    // Update
    await User.updateOne({ _id: user._id }, { name: 'Bob' });
    // Delete
    await User.deleteOne({ _id: user._id });
    console.log("CRUD complete");
}
run();