import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Active", "Complete"],
            default: "Active",
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, //createAt and updatedAt moogoose auto create
    }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
