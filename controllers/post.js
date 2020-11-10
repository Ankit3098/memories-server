import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js' 

export const getPosts = async (req,res,next)=>{

    try {
        const postMessage = await PostMessage.find()

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }

}

export const getPost = async (req,res,next)=>{
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const createPost = async (req,res,next)=>{

    const {title, message, selectedFile, creator, tags} = req.body;
    const newPost = new PostMessage({title, message, selectedFile, creator, tags})

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }

}

export const updatePost = async (req,res,next)=>{
    const { id } = req.params
    const {title, message, selectedFile, creator, tags} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post found with id : ${id}`)
    
    const updatedPost = { title, message, selectedFile, creator, tags, _id:id};

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })
    res.json(updatedPost)

}

export const likePost = async (req,res,next) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send(`No post found with id : ${id}`)
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new : true })

    res.json(updatePost)

}

export const deletePost = async (req,res,next)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).send(`No post found with id : ${id}`)

    await PostMessage.findByIdAndRemove(id)

    res.json({message: 'Post deleted successfully.'})
}