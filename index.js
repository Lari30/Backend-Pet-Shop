import express from 'express';
import InteressadoController from './Controllers/interessadoController.js';
import rotaInteressado from '../Routes/rotaInteressado.js';

const hostname = '0.0.0.0';
const port = 4000;

const app = express();

app.use(express.json());

app.use("/interessado", rotaInteressado);

app.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${porta}`);
});