const express = require('express');
const app = express();
const routeUsuario = require('./rotas/rotas.usuarios');
const routePosts = require('./rotas/rotas.posts');
const PORT = 8000;
app.use( express.json());
app.use('/usuarios', routeUsuario);
app.use('/posts', routePosts);

// Middleware para adicionar cabeçalho de resposta
// app.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next(); // Chama next() para passar o controle para o próximo middleware ou rota
// });

app.get('/', async (req, res) => {
    res.json({msg: "pagina principal"});
});

app.listen(PORT, () => {
    console.log(`servidor aberto na porta ${8000}`);
})