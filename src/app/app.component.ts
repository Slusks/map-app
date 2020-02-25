import { Component, OnInit, AfterViewInit} from '@angular/core';
import { DndDatabaseService } from './dnd-database.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { markerData } from './markerData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'map-app';
  
  

  constructor(private dndDatabaseService: DndDatabaseService,
              private httpClient: HttpClient,
              private http: HttpClient){};
  
  iconDescription:Object={};
  xPosition:number;
  yPosition:number;

  
  

 
  ngOnInit(){
      const iconImage = new Image();
      iconImage.src = "../assets/img/marker.jpg"
      
      //subscribes to the JSON file
      this.httpClient.get<markerData[]>('http://localhost:3000/mapMarker')
      .subscribe(posts => {
          posts.forEach(post=>{
                setMarker(post)})})      
        
      //Generate the markers from the json data
      function setMarker(post){
        console.log("function started", post.id)
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
      }

      //Listen for map events
      var map = document.getElementById('map')
      map.addEventListener("click", this.logCursorPosition);
      map.addEventListener("click", this.getCursorPositionX)
      map.addEventListener("click", this.getCursorPositionY)


  }

  getCursorPositionX(e){
    var x = (e.clientX)-20;
    console.log("x:", x)
    return this.xPosition = x;
  }

  getCursorPositionY(e){
    var y = (e.clientY)-40;
    console.log("y:", y)
    return this.yPosition = y;
  }

  logCursorPosition(e){
      //Get Cursor Location
      var x = e.clientX;
      var y = e.clientY;
      console.log("X Position "+ x + " Y Position" +y);
      //Place Icon
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x-20)+'px';
      img.style.top=(y-40)+'px';
      document.getElementById('map container').appendChild(img);
      img.id="currentMarker"
      //Open Form
      document.getElementById("myForm").style.display = "block"; //Opens the form
      document.getElementById('myForm').style.top = y +'px'; // sets the form y coordinate
      document.getElementById('myForm').style.left = x +'px'; // sets the form x coordinate
  }

//function that opens and closes the form for the icons
closeForm() {
  document.getElementById("myForm").style.display = "none";
}


  markerFormSubmit(marker){
      this.iconDescription ={
        "description": marker.description,
        "xPos":this.xPosition,
        "yPos":this.yPosition,
      }
    this.http.post("http://localhost:3000/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)})
    document.getElementById("myForm").style.display = "none";
    alert("Successfully Added")
  }

  
}
