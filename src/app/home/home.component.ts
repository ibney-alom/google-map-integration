import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  allStates = [];
  selectedState:any;
  showCities:boolean = false;
  showAll:boolean = true;
  boolPreloader:boolean = false;
  latitdeState;
  longitudeState;
  latCity;
  longCity;
  cityLabel:string;
  arrOfLatAndLong= []
  constructor(private _homeService:HomeService) { }

  ngOnInit() {
    this._homeService.getCities().subscribe(res=>{
      //this.allStates = res;
      for (const index in res) {
        if(this.allStates.indexOf(res[index]['State']) === -1) {
          this.allStates.push(res[index]['State']);
      }
      }
    })
  }

  cityFromState(state){
    this.showCities = true;
    this.showAll = true;
    this.boolPreloader = true;
    this._homeService.cityFromSate(state).subscribe(res=>{
      this.selectedState = res;
      this.getLatAndLong(state);
      this.getAllcitiesLocation(state);
      this.boolPreloader = false;
    })
   
  }

  getLatAndLong(state){
    this._homeService.getLocation(state).subscribe(res=>{
      this.latitdeState = res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude'];
      this.longitudeState = res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude'];
    })
  }

  markCity(state){
    this.showAll = false;
    this._homeService.getLocation(state.State, state.City).subscribe(res=>{
      this.latCity = res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude'];
      this.longCity = res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude'];
      this.cityLabel = state.City;
     })
  }

  getAllcitiesLocation(state){
    this.arrOfLatAndLong = [];
    for(const index in this.selectedState){
      this._homeService.getLocation(state, this.selectedState[index]['City']).subscribe(res=>{
        this.arrOfLatAndLong.push({
          "latitude": res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude'],
          "longitude": res['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude'],
          "label": this.selectedState[index]['City']
        })
      })
    }
  }

}
