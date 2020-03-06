import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DndDatabaseService } from '../dnd-database.service';
import { markerData } from '../markerData';


@Component({
  selector: 'app-marker-card',
  templateUrl: './marker-card.component.html',
  styleUrls: ['./marker-card.component.scss']
})
export class MarkerCardComponent implements OnInit {
  cardArray:Array<any>=[];

  constructor(
    private dndDatabaseService: DndDatabaseService,
    private http: HttpClient
    ){};


    @Output()

    
  ngOnInit() {
    this.http.get<markerData[]>('http://localhost:3000/mapMarker')
    .subscribe(posts => {
        posts.forEach(post=>{this.cardArray.push(post)})}) 
    
    console.log("marker-card loaded")
    console.log(this.cardArray)

    
  }
  displayCard(){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    console.log("toggle!")

  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}

