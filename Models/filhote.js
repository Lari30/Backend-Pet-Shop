import FilhoteDAO from "../DB/filhoteDao.js";
export default class Filhote {

    // atributos privados da classe Interessados
    #id; 
    #especie;
    #raca;

    constructor(id = 0, especie="", raca="") {
        this.#id = id;
        this.#especie = especie;
        this.#raca = raca;
    }

    get id() {
        return this.#id
    }

    set id(id) {
        this.#id = id
    }

    get especie() {
        return this.#especie
    }

    set especie(especie) {
        this.#especie = especie
    }

    get raca() {
        return this.#raca
    }

    set raca(raca) {
        this.#raca = raca
    }

    toString(){
        return `
        ID: ${this.#id} \n
        Especie: ${this.#especie} \n
        Raca: ${this.#raca} \n
        `;
    }

    toJSON(){
        return{
            id: this.#id,
            especie: this.#especie,
            raca: this.#raca
        }
    } 
    
    async gravar(){
        const filhoteDao = new FilhoteDAO();
        await filhoteDao.gravar(this);
    }

    async alterar(){
        const filhoteDao = new FilhoteDAO();
        await filhoteDao.alterar(this);
    }

    async excluir(){
        const filhoteDao = new FilhoteDAO();
        await filhoteDao.excluir(this);
    }

    async consultar(){
        const filhoteDao = new FilhoteDAO();
        return await filhoteDao.consultar(this)
    }
}

