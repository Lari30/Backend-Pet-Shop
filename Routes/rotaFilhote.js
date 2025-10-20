import { Router } from "express";
import FilhoteController from "../Controllers/filhoteController.js";

const rotaFilhote = Router();
const filhoteCtrl = new FilhoteController();

rotaFilhote
.get("/", (req, res) => filhoteCtrl.consultar(req, res))
  .get("/:id", (req, res) => filhoteCtrl.consultar(req, res))
  .post("/", (req, res) => filhoteCtrl.gravar(req, res))
  .put("/:id", (req, res) => filhoteCtrl.alterar(req, res))
  .delete("/:id", (req, res) => filhoteCtrl.excluir(req, res));

export default rotaFilhote;