export class Insegnamento {

    constructor(

        public idInsegnamento: number,
        public nome: string,
        public crediti: number,
        public descrizione: string,
        public annoCorso: string,
        public idDocente: number,
        public idCorsoDiStudio: number,
        public nomeDocente: string,
        public cognomeDocente: string,
        public nomeCorsoDiStudio: string,
        public tipo: string

    ) {}

}
