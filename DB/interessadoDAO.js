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
                interessado.filhote?.id ?? null
            ];

            await conexao.execute(sql, parametros);
            await conexao.release(); // devolve a conexao para o pool


            


        }
    }
    async alterar(interessado) {
        if (interessado instanceof Interessado) {
            const conexao = await conectar();
            const sql = `
                UPDATE interessado
                SET
                    inte_nome_completo = ?,
                    inte_telefone = ?,
                    inte_email = ?,
                    fi_id = ?
                WHERE inte_cpf = ?
            `;
            const parametros = [
                interessado.nomeCompleto,
                interessado.telefone,
                interessado.email,
                interessado.filhote?.id ?? null, // se não tiver filhote, define como null
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
    async consultar(){
        const conexao = await conectar();
        const sql = `
        SELECT 
                i.inte_cpf,
                i.inte_nome_completo,
                i.inte_telefone,
                i.inte_email,
                f.fi_id,
                f.fi_especie,
                f.fi_raca
            FROM interessado i
            LEFT JOIN filhote f ON f.fi_id = i.fi_id
            ORDER BY i.inte_nome_completo;
        `;

        const [registros] = await conexao.query(sql);
        await conexao.release();

       const listaInteressado = [];

    for (const registro of registros) {
        const objFilhote = registro.fi_id
        ? new Filhote (registro.fi_id,registro.fi_especie, registro.fi_raca)
        : null;

        const interessado = new Interessado(
        registro.inte_cpf,
        registro.inte_nome_completo,
        registro.inte_telefone,
        registro.inte_email,
        objFilhote
      );
    
      listaInteressado.push(interessado);
    }

    return listaInteressado;
    }

    async consultarCPF(cpf){
        cpf = cpf  || '';
        const conexao = await conectar();
        const sql = `
        SELECT 
        i.inte_cpf,
        i.inte_nome_completo,
        i.inte_telefone,
        i.inte_email,
        f.fi_id,
        f.fi_especie,
        f.fi_raca
      FROM interessado i
      LEFT JOIN filhote f ON f.fi_id = i.fi_id
      WHERE i.inte_cpf = ?
      ORDER BY i.inte_nome_completo;
            
            `;

        const [registros] = await conexao.query(sql, [cpf]);
        await conexao.release();

       let listaInteressado = [];

    for (const registro of registros) {
        const objFilhote = registro.fi_id 
        ? new Filhote(registro.fi_id, registro.fi_especie, registro.fi_raca)
        : null;

        const interessado = new Interessado(
        registro.inte_cpf,
        registro.inte_nome_completo,
        registro.inte_telefone,
        registro.inte_email,
        objFilhote
      );
    
      listaInteressado.push(interessado);
    }

    return listaInteressado;
    }

}