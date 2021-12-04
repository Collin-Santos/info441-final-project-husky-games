import mongoose from 'mongoose';

main().catch(err => console.log(err));
let Player;
let TicTacToe;
let db;

async function main() {
    await mongoose.connect('mongodb://localhost/huskygamecenter');

    const playerSchema = new mongoose.Schema({
        username: String,
        displayname: String,
    });

    const ticatactoeSchema = new mongoose.Schema({
        wins: Number,
        losses: Number,
        username: String
    })

    Player = mongoose.model('Player', playerSchema);
    TicTacToe = mongoose.model('TicTacToe', ticatactoeSchema);
    db = {
        Player: Player,
        TicTacToe: TicTacToe
    };
}