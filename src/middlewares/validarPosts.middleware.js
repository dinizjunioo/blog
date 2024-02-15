const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
const postSchema = require('../schemas/schema.posts')

addFormats(ajv)

function validarPosts(req, res, next){
    const posts = req.body
    const validate = ajv.compile(postSchema)
    const valid = validate(posts)
    if (valid){
        next()
    }else{
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
    }
}

module.exports = validarPosts