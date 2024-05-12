import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {LezioneCal} from '../../../models/lezioneCal';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {LezioneService} from '../../../services/lezioneService/lezione.service';
import {StudenteService} from '../../../services/studenteService/studente.service';
import {Studente} from '../../../models/studente';

@Component({
  selector: 'app-calendario-lez-stud',
  templateUrl: './calendario-lez-stud.page.html',
  styleUrls: ['./calendario-lez-stud.page.scss'],
})
export class CalendarioLezStudPage implements OnInit {

    lezioneCal: LezioneCal[];
    studente: Studente = {} as Studente;


    // minDate = new Date().toISOString();

    eventSource = [];
    viewTitle;



    calendar = {
        mode: 'day',
        currentDate: new Date(),
    };

    @ViewChild(CalendarComponent) myCal: CalendarComponent;

    constructor(private alertCtrl: AlertController,
                @Inject(LOCALE_ID) private locale: string,
                private lezService: LezioneService,
                private studService: StudenteService,
                private route: ActivatedRoute,
                private router: Router
    ) { }

    ngOnInit() {
        // this.resetEvent();
        this.getLezByCorso();
    }

    //STAMPA I RISULATATI DELLE GET NEL HTML
    get diagnostic1() {
        return JSON.stringify(this.studente);
    }

    //STAMPA I RISULATATI DELLE GET NEL HTML
    get diagnostic() {
        return JSON.stringify(this.lezioneCal);
    }


    // resetEvent() {
    //     this.event = {
    //         startTime: new Date().toISOString(),
    //         endTime: new Date().toISOString(),
    //         title: '',
    //     };
    // }


    // Change current month/week/day
    next() {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    back() {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

// Change between month/week/day
    changeMode(mode) {
        this.calendar.mode = mode;
    }

// Focus today
    today() {
        this.calendar.currentDate = new Date();
    }

// Selected date reange and hence title changed
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    // this.router.navigateByUrl(`/lezione/${this.lezioneCal.id}`);

    // Calendar event was clicked
    async onEventSelected(event) {

        console.log('CLICK EVENT');
        this.router.navigateByUrl(`/lezione/${event.id}`);
    }


// // Time slot was clicked
//     onTimeSelected(ev) {
//         let selected = new Date(ev.selectedTime);
//         this.event.startTime = selected.toISOString();
//         selected.setHours(selected.getHours() + 1);
//         this.event.endTime = (selected.toISOString());
//     }

    getLezByCorso(){
        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.studService.getStudenteByMatricola(id)
            .subscribe(data =>{
            this.studente = data;

            console.log(this.studente.nomeCorsoDiStudio);

                this.lezService.getLezioniByCorso(this.studente.nomeCorsoDiStudio)
                    .subscribe(data => {
                        this.lezioneCal = data;

                        console.log(this.lezioneCal);
                        for (let i = 0; i < this.lezioneCal.length; i++) {

                            let event = {
                                startTime: new Date(this.lezioneCal[i].start),
                                endTime: new Date(this.lezioneCal[i].end),
                                title: this.lezioneCal[i].title,
                                id: this.lezioneCal[i].id,
                            };
                            this.eventSource.push(event);
                        }

                    });
                this.myCal.loadEvents();
                // this.resetEvent();
            });
    }






}