import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
    {
    userEmail: {
        type: String,
        required: true,
    },
    goalId: {
        type: String,
        required: true,
    },
    goalName: {
        type: String,
        required: true,
    },
    Time: {
        type: Number,
        min: 0,
        required: true,
    },
    recordsDate: {
        type: Date,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: "records"
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
