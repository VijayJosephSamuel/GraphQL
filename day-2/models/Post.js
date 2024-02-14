import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    details: {
        type:String,
        required:true
    },
    by: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    type: {
        type:String,
        required:true
    }
});

mongoose.model("Post", postSchema)