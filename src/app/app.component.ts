import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'map-app';
  id: number;

  constructor(private http: HttpClient){}

  iconDescription:object={};
  confirmationString:string = "Marker Added!";
  isAdded: boolean = false;

 
  ngOnInit(){
    const iconImage = new Image();
    iconImage.src = "../assets/img/marker.jpg"
    var map = document.getElementById('map')
    map.addEventListener("click", this.logCursorPosition)    
  }


//this function now places the icon but I dont want to change the name yet
// for the position: https://www.geeksforgeeks.org/how-to-position-a-div-at-specific-coordinates/
logCursorPosition(e){
  var x = e.clientX;
  var y = e.clientY;
  console.log("X Position "+ x + " Y Position" +y);
  //place Icon
  var img = document.createElement("img");
  img.src = "../assets/img/marker.jpg";
  img.width = 20;
  img.height= 20;
  img.style.position="absolute";
  img.style.left= (x-20)+'px';
  img.style.top=(y-40)+'px';
  document.getElementById('map container').appendChild(img);

  // I am not sure why this doesn't work in the openForm function below
  //leads to TypeError: this.openForm() is not a function
  //Otherwise, the below opens the form and puts it where it needs to be
  document.getElementById("myForm").style.display = "block";
  document.getElementById('myForm').style.top = y +'px';
  document.getElementById('myForm').style.left = x +'px';
  }


// functions for increasing the id number because this is something that i will need to do.
step = 0;
setStep(index:number){
  this.step =index;
}
nextStep() {
  this.step++;
}
prevStep() {
  this.step--;
}

//function that opens and closes the form for the icons, currently doesn't work
openForm(){
  document.getElementById("myForm").style.display = "block";
}

closeForm() {
  document.getElementById("myForm").style.display = "none";
}


//Actual hard part for subscribing to the json file
updateMarkerJSON(mapMarker){
  this.iconDescription ={
    "description": mapMarker.description,
    "xPos": mapMarker.xPos,
    "yPos": mapMarker.yPos,
  }
  
  this.http.post("http://localhost:3000/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)})
  this.isAdded = true;
  location.reload(true)
}











}