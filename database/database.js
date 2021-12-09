import mongoose from 'mongoose';

main().catch(err => console.log(err));

let db = {};

async function main() {
    // Swap for azure deploy
    await mongoose.connect('mongodb://localhost/huskygamecenter');
    //await mongoose.connect(process.env.MONGODB_URI)

    const playerSchema = new mongoose.Schema({
        username: String,
        displayname: String,
    });

    const ticatactoeSchema = new mongoose.Schema({
        wins: Number,
        losses: Number,
        ties: Number,
        username: String
    })

    db.Player = mongoose.model('Player', playerSchema);
    db.TicTacToe = mongoose.model('TicTacToe', ticatactoeSchema);
}

export default db