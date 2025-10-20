import Interessado from "../Models/interessado.js";
export default class InteressadoController{

    //os métodos não são assíncronos
    //Esses métodos irão traduzir requisições HTTP em ações internas da aplicação
    // e irão retornar respostas HTTP

    //HTTP POST
    gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            if(dados.cpf && dados.nomeCompleto && dados.telefone && dados.email && dados.filhote){
                const interessado = new Interessado(dados.cpf, dados.nomeCompleto, dados.telefone, dados.email, dados.filhote );
                interessado.gravar() 
                .then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Interessado gravado com sucesso"
                    });

                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o interessado: " + erro.message
                    });

                });//é um método assíncrono
                 

            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos dos dados do interessado(CPF, Nome Completo, Telefone, E-mail, Filhote)"
                });
            }


        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    //HTTP PUT
    alterar(requisicao, resposta){
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")){
            const dados = requisicao.body;
            //http://localhost:4000/interessado/376.182.308-89
            const cpf = requisicao.params.cpf;  //cpf ser informado na url
            if(cpf && dados.nomeCompleto && dados.telefone && dados.email && dados.filhote){
                const interessado = new Interessado(cpf, dados.nomeCompleto, dados.telefone, dados.email, dados.filhote );
                interessado.alterar() 
                .then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Interessado atualizado com sucesso"
                    });

                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao atualizar o interessado: " + erro.message
                    });

                });//é um método assíncrono
                 

            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos dos dados do interessado(Nome Completo, Telefone, E-mail, Filhote). O cpf deve ser informado na url."
                });
            }


        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };

    //HTTP DELETE
    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const cpf = requisicao.params.cpf;
            if (cpf){
                const interessado = new Interessado();
                interessado.consultarCPF(cpf)
                .then((listaInteressado) => {
                    const interessado = listaInteressado[0];
                    if(interessado){
                        interessado.excluir()
                        .then(() => {
                            resposta.status(200).json({
                                status: true,
                                mensagem: "Interessado excluido com sucesso"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                status: false,
                                mensagem: "Erro ao excluir o interessado: " + erro.message
                            });
                        });
                    }
                    else{
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Interessado não encontrado"

                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o interessado para exclusão: " + erro.message
                    });
                });

            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do interessado"
                });
            }

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };

    //HTTP GET
    consultar(requisicao, resposta){
        if(requisicao.method === "GET"){
            //a consulta pode ou não especificar um cpf
            //qnd um cpf não for especificado então a consulta retornará todos os interessados
            const cpf = requisicao.params.cpf;
            const interessado = Interessado();
            if (cpf){
                interessado.consultarCPF(cpf)
                .then((listaInteressado) => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Consulta realizada com sucesso",
                        interessados: listaInteressado
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar o interessado: " + erro.message
                    });
                });
            }
            else{
                interessado.consultar()
                .then((listaInteressado) => {
                    if(listaInteressado.length > 0) {
                        resposta.status(200).json({
                        status: true,
                        mensagem: "Consulta realizada com sucesso",
                        interessado: listaInteressado
                        });
                    }
                    else{
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Interessado não encontrado"
                        });
                    }
                    
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar os interessados: " + erro.message
                    });
                });
            }

        }
        else{
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    };
}