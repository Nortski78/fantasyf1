import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const selectionsSchema = new Schema({
    player_id: Number,
    event_id: Number,
    selections: Array
});

const Selections = mongoose.model('selection', selectionsSchema);

export {Selections};