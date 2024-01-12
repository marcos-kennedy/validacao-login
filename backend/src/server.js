// server.js
const express = require('express');
const cors = require('cors');
const  bcrypt  =  require( 'bcrypt' );
const app = express();

const port = 3000;
const userController = require('./controllers/user')
const db = require('./database/db')

app.use(cors());
app.use(express.json());
db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

app.post('/api/cadastrar', async (req, res, next) =>{
    let dados = req.body
    dados.password = await bcrypt.hash(dados.password, 8)

    await userController.createUser(dados)
    .then((user)=> res.send(user))
    .catch((err) =>{
        console.log('Erro no cadastro do usuário', JSON.stringify(err))
        return res.status(400).send(err)
    })
})

app.post('/api/login', async (req, res) => {
    let dados = req.body
    console.log(dados)
    const usuario = await userController.getUser(dados.username)

    if((usuario === null) || (!(await bcrypt.compare(dados.password, usuario.password)))){
        // Envie uma resposta de erro
        res.status(401).json({ success: false, message: 'Credenciais inválidas' })
    }
    
    else if(usuario.username === "admin" && await bcrypt.compare(dados.password, usuario.password)){
        // Envie uma resposta de sucesso
        res.status(200).json({ success: true, admin: true });
    }

    else{
        // Envie uma resposta de sucesso
        res.status(200).json({ success: true });
    }
});

