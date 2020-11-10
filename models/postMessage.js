import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = Schema({
    title:String,
    creator:String,
    message:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const postMessage = mongoose.model('PostMessage',postSchema)

export default postMessage