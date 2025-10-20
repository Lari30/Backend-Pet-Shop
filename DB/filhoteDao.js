import Filhote from "../Models/filhote.js";
import conectar from "./conexao.js";
export default class FilhoteDAO{

    async gravar(filhote){
        if (filhote instanceof Filhote) {
                    const conexao = await conectar();
                    const sql = `
                    INSERT INTO filhote 
                    (fi_especie, fi_raca) 
                    VALUES (?,?) `;
                    const parametros = [
                        
                        filhote.especie,
                        filhote.raca
                        
                        
                    ];
        
                    const [resultado] = await conexao.execute(sql, parametros);

                    filhote.id = resultado.insertId;
                    await conexao.release(); // devolve a conexao para o pool
    }
}
    async alterar(filhote){
        if (filhote instanceof Filhote) {
      const conexao = await conectar();
      const sql = `
        UPDATE filhote 
        SET fi_especie = ?, fi_raca = ?
        WHERE fi_id = ?
      `;
      const parametros = [
        filhote.especie,
        filhote.raca,
        filhote.id
      ];

      await conexao.execute(sql, parametros);
      await conexao.release();
    }

    }
    async excluir(filhote){
        if (filhote instanceof Filhote) {
      const conexao = await conectar();
      const sql = `
        DELETE FROM filhote 
        WHERE fi_id = ?
      `;
      const parametros = [filhote.id];

      await conexao.execute(sql, parametros);
      await conexao.release();
    }
    }
     async consultar() {
    const conexao = await conectar();
    const sql = `SELECT * FROM filhote ORDER BY fi_id`;
    const [linhas] = await conexao.execute(sql);
    await conexao.release();

    return linhas.map(l => new Filhote(l.fi_id, l.fi_especie, l.fi_raca));
  }

  async consultarPorId(id) {
    const conexao = await conectar();
    const sql = `SELECT * FROM filhote WHERE fi_id = ?`;
    const [linhas] = await conexao.execute(sql, [id]);
    await conexao.release();

    return linhas.map(l => new Filhote(l.fi_id, l.fi_especie, l.fi_raca));
  }
}

    
