//achievement schema
import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    userId: {
        type: String,
        
      },
    description: String,
    goalId: {
        type: String,
        default: '' // Set default value as an empty string
    },
    achieved: Boolean,
    imagePath: String,
    achievementDate: String,
},{
    versionKey: false,
    collection: "achievements"
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;