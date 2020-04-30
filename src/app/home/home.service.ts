import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'https://indian-cities-api-nocbegfhqg.now.sh/'
  constructor(public http: HttpClient) { }

  getCities(){
    return this.http.get(this.url+'cities');
  }

  cityFromSate(state){
    return this.http.get(this.url+'cities?State='+ encodeURIComponent(state));
  }
  getLocation(stateName, cityName?){
    let loc;
    if(cityName){
      loc = cityName + '+' + stateName
    } else loc = stateName
    
    return this.http.get('https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=OS2tSip_NYA-IruvicZpaMi0ZmWy282FFrJouTz0Iqg&searchtext='+ loc)
  }
}
