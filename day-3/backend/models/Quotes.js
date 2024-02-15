import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    comment: {
        type:String,
        required:true
    },
    by: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    }
});

mongoose.model("Quote", quoteSchema)