import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Lezione} from '../../models/lezione';
import {LezioneService} from '../../services/lezioneService/lezione.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AulaService} from '../../services/aulaService/aula.service';
import {Aula} from '../../models/aula';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';

declare var google;

@Component({
  selector: 'app-lezione',
  templateUrl: './lezione.page.html',
  styleUrls: ['./lezione.page.scss'],
})
export class LezionePage implements OnInit {

    @ViewChild('mapElement') mapElement: ElementRef;

    lezione: Lezione = {} as Lezione;
    aula: Aula = {} as Aula;

  // aula: Aula[];

    map: any;

    constructor(private lezService: LezioneService,
                private route: ActivatedRoute,
                private aulaService: AulaService,
                private router: Router,
                private geolocation: Geolocation,
                private launchNavigator: LaunchNavigator) { }

  ngOnInit() {
      this.getLezById();
  }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.lezione);
    }
    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic1() {
        return JSON.stringify(this.aula)
    }

    getLezById(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.lezService.getLezioneById(id)
            .subscribe(data =>{
                this.lezione = data;

                    this.aulaService.getByName(this.lezione.nomeAula)
                        .subscribe(data =>{
                            this.aula = data

                            const latLng = new google.maps.LatLng(this.aula.latitudine, this.aula.longitudine);
                            const mapOptions = {
                                center: latLng,
                                zoom: 18,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };

                            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                            const marker = new google.maps.Marker({
                                map: this.map,
                                animation: google.maps.Animation.DROP,
                                position: latLng
                            });

                            this.addInfoWindow(marker,
                                'Aula: '+ this.aula.nome
                                +'<br>Edificio: '+ this.aula.edificio
                                +'<br>'+ this.aula.piano
                                +'<br><br>');
                        });
            });
    }

    addInfoWindow(marker, content) {
        const infoWindow = new google.maps.InfoWindow({
            content
        });
        infoWindow.open(this.map, marker);

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

    navigateLocation(){

        let options: LaunchNavigatorOptions = {
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };

        this.launchNavigator.navigate( this.aula.latitudine +' '+ this.aula.longitudine,options)
            .then(success =>{
                console.log(success);
            },error=>{
                console.log(error);
            })

    }



    // getLezById(){
    //     const id = +this.route.snapshot.paramMap.get('id');
    //     this.lezService.getLezioneById(id)
    //         .subscribe(data =>{
    //             this.lezione = data;
    //
    //             this.aulaService.getByName(this.lezione.nomeAula)
    //                 .subscribe(data =>{
    //                     this.aula = data
    //
    //                     for (let i = 0; i < this.aula.length; i++) {
    //
    //                         console.log(this.aula);
    //
    //                         // this.   .push(   );
    //                     }
    //
    //                 })
    //         });
    // }







}
