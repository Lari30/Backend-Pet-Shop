import Filhote from "../Models/filhote.js";

export default class FilhoteController {
  
  // HTTP POST
  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;

      if (dados.especie && dados.raca) {
        const filhote = new Filhote(null, dados.especie, dados.raca);
        filhote.gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Filhote cadastrado com sucesso!"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o filhote: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do filhote (espécie e raça)."
        });
      }

    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }

  //HTTP PUT 
  alterar(requisicao, resposta) {
    if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const id = requisicao.params.id; // ID informado na URL

      if (id && dados.especie && dados.raca) {
        const filhote = new Filhote(id, dados.especie, dados.raca);
        filhote.alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Filhote atualizado com sucesso!"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o filhote: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do filhote (espécie e raça) e o ID na URL."
        });
      }

    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }

  //HTTP DELETE 
  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE") {
      const id = requisicao.params.id;

      if (id) {
        const filhote = new Filhote();
        filhote.consultarPorId(id)
          .then((listaFilhote) => {
            const encontrado = listaFilhote[0];
            if (encontrado) {
              encontrado.excluir()
                .then(() => {
                  resposta.status(200).json({
                    status: true,
                    mensagem: "Filhote excluído com sucesso!"
                  });
                })
                .catch((erro) => {
                  resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao excluir o filhote: " + erro.message
                  });
                });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Filhote não encontrado."
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar o filhote: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o ID do filhote."
        });
      }

    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }

  // HTTP GET 
  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      const id = requisicao.params.id;
      const filhote = new Filhote();

      if (id) {
        filhote.consultarPorId(id)
          .then((resultado) => {
            if (resultado.length > 0) {
              resposta.status(200).json({
                status: true,
                mensagem: "Filhote encontrado com sucesso!",
                filhote: resultado[0]
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Filhote não encontrado."
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar o filhote: " + erro.message
            });
          });
      } else {
        filhote.consultar()
          .then((lista) => {
            resposta.status(200).json({
              status: true,
              mensagem: "Consulta de filhotes realizada com sucesso!",
              filhotes: lista
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar os filhotes: " + erro.message
            });
          });
      }

    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }
}
