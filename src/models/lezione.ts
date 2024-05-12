export class Lezione {

    constructor(

        public idLezione: number,
        public orarioInizio: string,
        public orarioFine: string,
        public data: string,
        public nomeAula: string,
        public idInsegnamento: number,
        public nomeInsegnamento: string,
        public nomeDocente: string,
        public cognomeDocente: string,
        public crediti: number,
        public nomeCorso: string,
        public tipoCorso: string

    ){}



}