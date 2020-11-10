import express from 'express'

import {getPost, getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/post.js'
const router = express.Router()

router.get('/',getPosts)
router.post('/',createPost)
router.get('/:id',getPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',likePost)

export default router

