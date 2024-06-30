import { Schema, model } from "mongoose";

const WorkoutPlanSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    exercises: [{
        name: { type: String, required: true },
        duration: { type: Number, required: true }, // Duration in minutes
        videoUrl: { type: String, required: true },
        instructions: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
