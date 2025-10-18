import Interessado from "../Models/interessado.js";
import Filhote from "../Models/filhote.js";
import conectar from "./conexao.js";

export default class InteressadoDAO {

    async gravar(interessado){
        if (interessado instanceof Interessado) {
            const conexao = await conectar();
            const sql = `
            INSERT INTO interessado 
            (inte_cpf, inte_nome_Completo, inte_telefone, inte_email, fi_id) 
            VALUES (?,?,?,?,?) `;
            const parametros = [
                interessado.cpf,
                interessado.nomeCompleto,
                interessado.telefone,
                interessado.email,
                interessado.filhote.id
            ];

            await conexao.execute(sql, parametros);
            await conexao.release(); // devolve a conexao para o pool


            


        }
    }
    async alterar(interessado){
        if (interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `
            UPDATE interessado
            SET
                inte_nome_completo = "",
                inte_telefone = "",
                inte_email = "",
            WHERE inte_cpf = ?    

             `;
             const parametros = [
                interessado.nomeCompleto,
                interessado.telefone,
                interessado.email,
                interessado.filhote.id,
                interessado.cpf
             ];

             await conexao.execute(sql, parametros);
             await conexao.release();
        }
    }
    async excluir(interessado){
        if (interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `DELETE FROM interessado WHERE inte_cpf = ?`;
            const parametros = [interessado.cpf];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
    async consultar(interessado){
        const conexao = await conectar();
        const sql = `
        SELECT * FROM interessado i INNER JOIN filhote f ON i.fi_id = f.fi_id
            i.inte_cpf,
            i.inte_nome_completo,
            i.inte_telefone,
            i.inte_email,
            f.fi_especie,
            f.fi_raca
            ORDER BY i.inte_nome_completo
            
            `;

        const [registros] = await conexao.query(sql);
        await conexao.release();

       let listaInteressado = [];

    for (const registro of registros) {
        const filhote = new filhote(registro.fi_id, registro.fi_especie, registro.fi_raca)
        const interessado = new Interessado(
        registro.inte_cpf,
        registro.inte_nome_completo,
        registro.inte_telefone,
        registro.inte_email,
        registro.fi_id
      );
    
      listaInteressado.push(interessado);
    }

    return listaInteressado;
    }

}