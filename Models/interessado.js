import InteressadoDAO from "../DB/interessadoDAO.js";
export default class Interessado {
 
    // atributos privados da classe Interessados
     
    #cpf; // chave candidata
    #nomeCompleto;
    #telefone;
    #email;
    #filhote;

    constructor (cpf = "", nomeCompleto = "", telefone = "", email = "", filhote = {}) {
        this.#cpf = cpf;
        this.#nomeCompleto = nomeCompleto;
        this.#telefone = telefone;
        this.#email = email;
        this.#filhote = filhote;  // relacionamento da classe interessado e filhote
    }

    //definir métodos de acesso públicos utilizando get e set 

    
    get cpf() {
        return this.#cpf
    }

    set cpf(cpf) {
        this.#cpf = cpf
    }

    get nomeCompleto() {
        return this.#nomeCompleto
    }

    set nomeCompleto(nomeCompleto) {
        this.#nomeCompleto = nomeCompleto

    }

    get telefone() {
        return this.#telefone
    }

    set telefone(telefone) {
        this.#telefone
    }

    get email() {
        return this.#email
    }

    set email(email) {
        this.#email
    }

    get filhote(){
        return this.#filhote
    }

    set filhote(filhote) {
        this.#filhote
    }

    //Escolher uma forma estrutura de representar um objeto do tipo Interessados

    toString() { //override do método da classe Pai
        return `
        CPF: ${this.#cpf}\n
        Nome Completo: ${this.#nomeCompleto} \n
        Telefone: ${this.#telefone} \n
        E-mail: ${this.#email} \n
        Filhote: ${this.#filhote} \n
        
        `;

    }

    // definir um formato que extrapola o ambiente de execução da aplicação
    //qnd for necessário enviar um interessado para a internet, nós vamos enviá-lo no formato JSON
    toJSON() {
        return {
            cpf: this.#cpf,
            nomeCompleto: this.#nomeCompleto,
            telefone: this.#telefone,
            email: this.#email,
            filhote: this.#filhote
        }
    }

    async gravar(){
        const interessadoDAO = new InteressadoDAO();
        await interessadoDAO.gravar(this);
    }

    async alterar(){
        const interessadoDAO = new InteressadoDAO();
        await interessadoDAO.alterar(this);
    }

    async excluir(){
        const interessadoDAO = new InteressadoDAO();
        await interessadoDAO.excluir(this);
    }

    async consultar(){
        const interessadoDAO = new InteressadoDAO();
        return await interessadoDAO.consultar(this);
    }

}