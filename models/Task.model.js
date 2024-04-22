import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    createdFor:{
        type:mongoose.Schema.Types.ObjectId,
    },
    completed:{
        type:Boolean,
        default:false
    },
    deadline:{
        type:Date,
    },
    completeTime:{
        type:Date,
    },
    priority:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Task = mongoose.model('Task',taskSchema)