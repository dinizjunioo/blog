import { generate, count } from "random-words";
import fs from 'fs';
import http from 'http';

/**
 * @since versao 1.0.0
 * Brincando com gerador de palavras e numeros (com seed fixo)
 * @author diniz
 * 
 */

console.log(generate() + " - " + count());

//----------------------------------------------------------------------------------------------------

/**
 * @since versao 1.0.0
 * LEITURA E ESCRITA DE ARQUIVOS
 * @author diniz
 * @param {FS} 
 * @argument {wda dwadwa dwadwa}
 * @return dwadwa
 */

const fileContent = fs.readFileSync("./teste.txt", "utf8", 'r');
//const data = (JSON.parse(fileContent));

const pessoa2 = {
    "nome":"thiago",
    "idade":"28"
}

const pessoa3 = {
    "nome":"silvia",
    "idade":"32"
}
//data.funcionarios.push(pessoa2);
//data.funcionarios.push(pessoa3);

// Transformando o objeto em JSON antes de escrever no arquivo
//const pessoa2JSON = JSON.stringify(data);
//fs.writeFileSync('./teste.txt', pessoa2JSON,{ encoding: 'utf8', flag: 'w' });

//----------------------------------------------------------------------------------------------------

/**
 * @since versao 1.0.0
 * LEITURA E ESCRITA DE ARQUIVOS
 * @author diniz
 * @param {HTTP} 
 * @argument {wda dwadwa dwadwa}
 * @return dwadwa
 */


// Create a local server to receive data from
const server = http.createServer((req, res) => {
    res.writeHead(
        200, 
        { 'Content-Type': 'text/json' }
    );
    res.write(fileContent);
    res.end(
    );
  });
  server.listen(8000, ()=>{
    console.log("servidor criado com sucesso! na porta 8000")
  });
  
  // Create a local server to receive data from
  //const server = http.createServer();
  
  // Listen to the request event
  //server.on('request', (request, res) => {
  //  res.writeHead(200, { 'Content-Type': 'application/json' });
  //  res.end(JSON.stringify({
  //    data: 'Hello World!',
  //  }));
  //});
  //server.listen(8000);



  // ----------------------------------------------------------------------------------

  const express = require('express');
const {v4: uuidv4} = require('uuid');
const router = express.Router();
const validarMiddlewarePosts = require('../middlewares/validarPosts.middleware')

const posts = {};

// middlewares 
router.post('/', validarMiddlewarePosts);
router.put('/', validarMiddlewarePosts);

router.get('/', (req, res ) => {
    res.json({posts: Object.values(posts)});
});

router.get('/:id', (req, res) => {
    res.json({posts: posts[req.params.id]})
})

router.post('/', (req, res ) => {
    const post = req.body;
    const idPosts = uuidv4();
    post.id = idPosts;
    posts[idPosts] = post;
    res.json({msg: "post adicionado com sucesso"});
});

router.put('/', (req, res ) => {
    const id  = req.query.id;
    if (id && posts[id]){
        const post = req.body
        post.id = id
        posts[id] = post
        res.json({msg: "post atualizado com sucesso"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
});
router.delete('/', (req, res) => {
    const id = req.query.id;
    if (id && posts[id]){
        delete posts[id];
        res.json({msg: "post deletado com sucesso"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
});