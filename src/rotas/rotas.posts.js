const express = require('express');
//const {v4: uuidv4} = require('uuid');
const router = express.Router();
const validarMiddlewarePosts = require('../middlewares/validarPosts.middleware')
const { Post } = require('../db/models')

// middlewares 
router.post('/', validarMiddlewarePosts);
router.put('/', validarMiddlewarePosts);

router.get('/', async (req, res ) => {
    const post = await Post.findAll();
    res.json({posts: post});
});

router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    res.json({posts: post})
})

router.post('/',async (req, res ) => {
    const post = await Post.create(req.body);
    res.json({msg: "Post adicionado com sucesso!"});
});

router.put('/', async(req, res ) => {
    const post = await Post.findByPk(req.query.id);
    if (post){
        post.titulo = req.body.titulo;
        post.texto = req.body.texto;
        await post.save();
        res.json({msg: "post atualizado com sucesso"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
});
router.delete('/', async (req, res) => {
    const post = await Post.findByPk(req.query.id);
    if (post){
        await post.destroy();
        res.json({msg: "post deletado com sucesso"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
});

module.exports = router;