import { mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const f1eventSchema = new Schema({
    id: Number,
    event_name: String,
    event_start: Date
});

const F1Events = mongoose.model('f1_event', f1eventSchema);

export {F1Events};