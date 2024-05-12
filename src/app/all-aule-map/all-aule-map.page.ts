import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AulaService} from '../../services/aulaService/aula.service';
import {Aula} from '../../models/aula';

declare var google;

@Component({
  selector: 'app-all-aule-map',
  templateUrl: './all-aule-map.page.html',
  styleUrls: ['./all-aule-map.page.scss'],
})
export class AllAuleMapPage implements OnInit {

    @ViewChild('mapElement') mapElement: ElementRef;

    map: any;
    aula: Aula[];

    constructor(
        private geolocation: Geolocation,
        private aulaService: AulaService) { }

    ngOnInit() {
        // this.displayGoogleMap();
        this.getAllAule();
        // this.getMarkers();
    }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.aula);
    }


    getAllAule() {
        this.aulaService.findAll()
            .subscribe(data =>{
                this.aula = data

                const latLng = new google.maps.LatLng(this.aula[0].latitudine, this.aula[0].longitudine);

                const mapOptions = {
                    center: latLng,
                    disableDefaultUI: true,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

                for (let i = 0; i < this.aula.length; i++) {

                    const position = new google.maps.LatLng(this.aula[i].latitudine, this.aula[i].longitudine);
                    const aulaMarker = new google.maps.Marker({ position, title: this.aula[i].nome });
                    aulaMarker.setMap(this.map);


                    this.addInfoWindow(aulaMarker,
                        'Aula: '+ this.aula[i].nome
                        +'<br>Edificio: '+ this.aula[i].edificio
                        +'<br>'+ this.aula[i].piano
                        +'<br>');

                }
        });
    }

    addInfoWindow(marker, content) {
        const infoWindow = new google.maps.InfoWindow({
            content
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

}

