export class Recensione {

    constructor(
        public voto: number,
        public testo: string,
        public idMateriale: number,
        public idLezione: number,
        public idStudente: number,
        public data: string

    ) {}

}