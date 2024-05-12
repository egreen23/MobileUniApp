import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AlertController} from '@ionic/angular';
import {LezioneService} from '../../../services/lezioneService/lezione.service';
import {Docente} from '../../../models/docente';
import {LezioneCal} from '../../../models/lezioneCal';
import {ActivatedRoute, Router} from '@angular/router';
import * as events from 'events';
import {load} from '@angular/core/src/render3';

@Component({
  selector: 'app-calendario-lez',
  templateUrl: './calendario-lez-doc.page.html',
  styleUrls: ['./calendario-lez-doc.page.scss'],
})
export class CalendarioLezDocPage implements OnInit {

    lezioneCal: LezioneCal[];

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
                private route: ActivatedRoute,
                private router: Router
    ) { }

    ngOnInit() {
        // this.resetEvent();
        this.getLezByDocente();
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

    getLezByDocente(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.lezService.getLezioniByIdDocente(id)
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
                this.myCal.loadEvents();
                // this.resetEvent();
            });
    }


}