import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const driversSchema = new Schema({
    id: Number,
    driver_name: String,
    totla_points: Number,
    results: Array
});

const Drivers = mongoose.model('driver', driversSchema);

export { Drivers };