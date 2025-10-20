import Filhote from "../Models/filhote.js";
import conectar from "./conexao.js";
export default class FilhoteDAO{

    async gravar(filhote){
        if (filhote instanceof Filhote) {
                    const conexao = await conectar();
                    const sql = `
                    INSERT INTO filhote 
                    (fi_especie, fi_raca, inte_id) 
                    VALUES (?,?,?) `;
                    const parametros = [
                        
                        filhote.especie,
                        filhote.raca,
                        filhote.inte_id ?? null
                        
                        
                    ];
        
                    const [resultado] = await conexao.execute(sql, parametros);

                    filhote.id = resultado.insertId;
                    await conexao.release(); // devolve a conexao para o pool
    }
}
    async alterar(filhote){}
    async excluir(filhote){}
    async consultar(filhote){}
}