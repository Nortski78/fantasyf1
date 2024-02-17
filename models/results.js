import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const resultsSchema = new Schema({
    event_id: Number,
    event_name: String,
    fastest_lap: Number,
    result: Array
})

const Results = mongoose.model('result', resultsSchema);

export { Results };