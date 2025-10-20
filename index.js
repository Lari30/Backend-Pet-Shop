import express from 'express';

import rotaInteressado from './Routes/rotaInteressado.js';
import rotaFilhote from './Routes/rotaFilhote.js';

const app = express();

const hostname = '0.0.0.0';
const port = 4000;



app.use(express.json());

app.use("/interessado", rotaInteressado);
app.use("/filhote", rotaFilhote);

app.get("/", (req,res) => {
    res.send("API Pet Shop Amigo Animal está online!")
});


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}`);
});