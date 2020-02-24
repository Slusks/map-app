import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { DndDatabaseService } from './dnd-database.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { markerData } from './markerData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'map-app';
  id: number;
  jsonmarkerData;

  constructor(private dndDatabaseService: DndDatabaseService,
              private http: HttpClient){};
  

  iconDescription:object={};


 
  ngOnInit(){
    const iconImage = new Image();
    iconImage.src = "../assets/img/marker.jpg"
    var map = document.getElementById('map')
    map.addEventListener("click", this.logCursorPosition)

    //subscribes to the JSON file
    this.dndDatabaseService.getmapMarkers().subscribe(posts => {posts.forEach(post =>{setMarker(post)})}) // console log so we know what we're getting

    /*this.http.get('http://localhost:3000/mapMarker')
        .subscribe(posts => {
            posts.forEach(post=>{
                  setMarker(post)})})*/

    //this.markerData = this.dndDatabaseService.getmapMarkers(); // puts the data into a usable variable


    
    
    //function to programmatically generate the markers from the json data

    
    function setMarker(post){
      console.log("function started", post.id)
      var description = post.description;
      var x = post.xPos;
      var y = post.yPos;
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x-20)+'px';
      img.style.top=(y-40)+'px';
      document.getElementById('map container').appendChild(img);
      console.log("function ran")
    }


    }

getCursorPosition(e){
  var x = (e.clientX)-20;
  var y = (e.clientY)-40;
  console.log(x , y)
  return {"x": x, "y": y}
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
    img.id="currentMarker"


  // I am not sure why this doesn't work in the openForm function below
  //leads to TypeError: this.openForm() is not a function
  
  document.getElementById("myForm").style.display = "block"; //Opens the form
  document.getElementById('myForm').style.top = y +'px'; // sets the form y coordinate
  document.getElementById('myForm').style.left = x +'px'; // sets the form x coordinate
  
  const coordinate = {"x":x-20, "y":y-40}
  return coordinate
  }

//function that opens and closes the form for the icons, currently doesn't work
closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/* Submit form needs to do the following:
 - Add Description, xpos, and ypos to json file
 - change img.id to a number */




 markerFormSubmit(marker, position){
    console.log("coordinate", this.logCursorPosition)
    this.iconDescription ={
      "description": marker.description,
      "xPos":position.x,
      "yPos":position.y,
  }
    this.http.post("http://localhost:3000/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)})
    
    document.getElementById("myForm").style.display = "none";
    alert("Description entered")
   }




 }


