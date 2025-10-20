import { Router } from "express";
import InteressadoController from "../Controllers/interessadoController.js";

const rotaInteressado = Router();
const interessadoCtrl = new InteressadoController();

rotaInteressado
.get("/", (req, res) => interessadoCtrl.consultar(req, res))
.get("/:cpf", (req, res) => interessadoCtrl.consultar(req, res))
.post("/", (req, res) => interessadoCtrl.gravar(req, res))
.put("/:cpf", (req, res) => interessadoCtrl.alterar(req, res))
.delete("/:cpf", (req, res) => interessadoCtrl.excluir(req, res));


export default rotaInteressado;