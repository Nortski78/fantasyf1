import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const playersSchema = new Schema({
    id: Number,
    player_name: String,
    points: Number,
    bonus: Number,
    driver_selection: Array
});

const Players = mongoose.model('player', playersSchema);

export { Players };