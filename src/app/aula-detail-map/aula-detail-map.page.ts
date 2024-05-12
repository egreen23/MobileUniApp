import {Component, OnInit, ElementRef, ViewChild, AfterContentInit} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Aula} from '../../models/aula';
import {ActivatedRoute} from '@angular/router';
import {AulaService} from '../../services/aulaService/aula.service';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';

declare var google;


@Component({
  selector: 'app-aula-detail-map',
  templateUrl: './aula-detail-map.page.html',
  styleUrls: ['./aula-detail-map.page.scss'],
})
export class AulaDetailMapPage implements OnInit {

    @ViewChild('mapElement') mapElement: ElementRef;


    map: any;
    aula = {} as Aula;

    constructor(
        private geolocation: Geolocation,
        private aulaService: AulaService,
        private route: ActivatedRoute,
        private launchNavigator: LaunchNavigator) { }

    ngOnInit() {
        this.getAulaById();
        // this.displayGoogleMap();
    }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.aula);
    }

    getAulaById(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.aulaService.getById(id)
            .subscribe(data =>{
                this.aula = data

                const latLng = new google.maps.LatLng(this.aula.latitudine, this.aula.longitudine);
                const mapOptions = {
                    center: latLng,
                    zoom: 19,
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
                    +'<br>');
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

    // displayGoogleMap() {
    //     this.geolocation.getCurrentPosition().then((resp) => {
    //
    //         const latLng = new google.maps.LatLng(this.aula.latitudine, this.aula.longitudine);
    //
    //         const mapOptions = {
    //             center: latLng,
    //             zoom: 15,
    //             mapTypeId: google.maps.MapTypeId.ROADMAP
    //         };
    //
    //         this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //
    //         this.map.addListener('tilesloaded', () => {
    //             console.log('accuracy', this.map);
    //             // this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    //         });
    //
    //     }).catch((error) => {
    //         console.log('Error getting location', error);
    //     });
    // }

}