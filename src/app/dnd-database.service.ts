import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { markerData } from './markerData';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DndDatabaseService {
  apiUrl = "http://localhost:3000/"

  constructor(private http: HttpClient) {}

  getPanels(){
    return this.http.get(`${this.apiUrl}panel`)
    };

  getmapMarkers(){
    return this.http.get(`${this.apiUrl}mapMarker`)
  }

}
