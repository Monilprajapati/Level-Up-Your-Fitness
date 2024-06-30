import { Schema, model } from "mongoose";

const ActivityLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    date: {
        type: Date,
        required: true
    },
    workout: {
        name: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        } // Duration in minutes
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const ActivityLogSchema= model('ActivityLog', ActivityLogSchema);
