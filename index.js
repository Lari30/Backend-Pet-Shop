import express from 'express';
import cors from 'cors';

import rotaInteressado from './Routes/rotaInteressado.js';
import rotaFilhote from './Routes/rotaFilhote.js';

const app = express();

//configurar o servidor para a política cors
app.use(cors({
    origin: "*"
    
}));


const hostname = '0.0.0.0';
const port = 4000;


//configura o servidor para receber dados no formato json
app.use(express.json());

app.use("/interessado", rotaInteressado);
app.use("/filhote", rotaFilhote);

app.get("/", (req,res) => {
    res.send("API Pet Shop Amigo Animal está online!")
});


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}`);
});