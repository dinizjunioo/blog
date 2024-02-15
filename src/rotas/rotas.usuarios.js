const express = require('express');
const {v4: uuidv4} = require('uuid');
const router = express.Router();
const validarMiddlewareUsuario = require('../middlewares/validarUsuario.middleware')
const {Usuario} = require('../db/models');

//const O = Object.values;
// inves de Object.values(usuarios) => O(usuarios)

// middlewares 
router.post('/', validarMiddlewareUsuario);
router.put('/', validarMiddlewareUsuario);

router.get('/', async (req, res ) => {
    const usuario = await Usuario.findAll();
    res.json({usuarios: usuario});
});

router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    res.json({usuarios: usuario});
})

router.post('/', (req, res ) => {
    Usuario.create(req.body);
    res.json({msg: "usuario adicionado com sucesso"});  
});

router.put('/', async (req, res ) => {
    const usuario = await Usuario.findByPk(req.query.id);
    if (usuario){
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;
        await usuario.save();
        res.json({msg: "usuario atualizado com sucesso"});
    }else{
        res.status(400).json({msg: "Usuário não encontrado!"});
    }
});
router.delete('/', async (req, res) => {
    const usuario = await Usuario.findByPk(req.query.id);
    if (usuario){
        await usuario.destroy();
        res.json({msg: "usuario deletado com sucesso"})
    }else{
        res.status(400).json({msg: "Usuário não encontrado!"})
    }
});

module.exports = router;
