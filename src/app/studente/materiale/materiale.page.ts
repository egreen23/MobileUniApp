import { Component, OnInit } from '@angular/core';
import {MaterialeService} from '../../../services/materialeService/materiale.service';
import {InsegnamentoService} from '../../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Materiale} from '../../../models/materiale';
import {Recensione} from '../../../models/recensione';
import {StudenteService} from '../../../services/studenteService/studente.service';
import {RecensioneMatService} from '../../../services/recesioneMatService/recensione-mat.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/File/ngx';
import {Platform} from '@ionic/angular';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';






@Component({
    selector: 'app-materiale',
    templateUrl: './materiale.page.html',
    styleUrls: ['./materiale.page.scss'],
})
export class MaterialePage implements OnInit {


    materiale: Materiale = {} as Materiale;
    recensione: Recensione = {} as Recensione;
    rec: boolean = true;
    votoRG: number;
    note: string = null;

    url: Observable<string | null>;


    idUser = +this.route.snapshot.paramMap.get('idUser');
    idStudente = +this.route.snapshot.paramMap.get('idStudente');


    private fileTransfer: FileTransferObject;


    constructor(private matService: MaterialeService,
                private insegnService: InsegnamentoService,
                private studService: StudenteService,
                public recMatService: RecensioneMatService,
                private router: Router,
                private route: ActivatedRoute,
                private storage: AngularFireStorage,

                private platform: Platform,
                private file: File,
                private ft: FileTransfer,
                private fileOpener: FileOpener,
                private document: DocumentViewer,
                private toastCtrl: ToastController,
    )
    {}



    ngOnInit() {
        this.getMatByIdMateriale();
        this.getRecensione();

    }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.recensione);
    }

    getMatByIdMateriale() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.matService.getMatById(id)
            .subscribe(data => {
                this.materiale = data;

                let ref = this.storage.ref(this.materiale.url);
                this.url = ref.getDownloadURL();

            });
    }


    getRecensione() {

        const id = +this.route.snapshot.paramMap.get('id');
        this.matService.getMatById(id)
            .subscribe(data => {
                this.materiale = data;

                this.recMatService.getRecMatByMatStudIdInsegnIdMat(this.idUser ,this.materiale.idInsegnamento,this.materiale.idMateriale)
                    .subscribe( data => {

                        if (data != null) {
                            this.recensione = data;
                            this.rec = true;
                        } else {
                            this.rec = false;
                        }

                    });
            });
    }

    onSubmit() {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var todayString: string;

        todayString =  yyyy + '/' + mm + '/' + dd;

        console.log(todayString)

        this.recensione.voto = this.votoRG;
        this.recensione.testo = this.note;
        this.recensione.idMateriale = this.materiale.idMateriale
        this.recensione.idStudente = this.idStudente;
        this.recensione.data = todayString;
        console.log(this.votoRG);
        console.log(this.note);
        console.log(this.materiale.idMateriale);
        console.log(this.idStudente);

        // this.recMatService.newRecMat(this.recensione)
        //     .subscribe(data =>{
        //
        //         this.recensione = data;
        //
        //     });

        if (this.recensione.voto == null || this.recensione.testo == null){

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Inserisci un voto ed una nota alla tua recensione!',
                // footer: '<a href>Why do I have this issue?</a>'
            })

        }
        else{

            Swal.fire({
                title: 'Conferma...',
                text: "Sicuro di voler procedere?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10dc60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Procedi!'
            }).then((result) => {
                if (result.value) {

                    this.recMatService.newRecMat(this.recensione)
                        .subscribe(data =>{

                            this.recensione = data;

                        });
                    this.Toast.fire({
                        type: 'success',
                        title: 'Recensione inserita con successo!',

                    });
                    this.router.navigateByUrl(`/list-materiale/${this.materiale.idInsegnamento}/${this.idUser}/${this.idStudente}`);

                }
            })
        }
    }

    Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000

    });



    // IMPLEMENTARE NOTIFICA RECENSIONE PER IL DOCENTE

    // onSubmit() {
    //     this.lectureRating.rate = String(this.rate);
    //     this.lectureRating.student = this.student;
    //     this.lectureRating.calendar = this.lecture;
    //     this.lectureRating.calendar.calendarDate.startDate = null;
    //     this.lectureRating.calendar.calendarDate.endDate = null;
    //     this.lectureRating.calendar.roomEquipment = null;
    //     this.lectureRating.date = new Date();
    //     this.lectureRating.note = this.note;
    //     this.postService.postLectureRating(this.lectureRating).subscribe( rating => {
    //         if (rating != null) {
    //             console.log(this.lectureRating);
    //             this.firestore.collection('tickets').doc(String(this.selectedModule.professor.person.personId))
    //                 .collection('ratings').add(
    //                 {
    //                     file: this.lecture.calendarDate.date,
    //                     rate: this.rate + ' - ' + this.lectureRating.note
    //                 });
    //             this.getRating();
    //         }
    //     });
    // }



    btNDownload() {

        let ref = this.storage.ref(this.materiale.url);
        this.url = ref.getDownloadURL();

    }


    downloadAndOpenPdf() {
        let downloadUrl = " ";
        let path = this.file.dataDirectory;
        const transfer = this.ft.create();

        transfer.download(downloadUrl, path + 'myfile.pdf').then(entry => {
            let url = entry.toURL();

            if (this.platform.is('ios')) {
                this.document.viewDocument(url, 'application/pdf', {});
            } else {
                this.fileOpener.open(url, 'application/pdf')
                    .then(() => console.log('File is opened'))
                    .catch(e => console.log('Error opening file', e));
            }
        });
    }


}
