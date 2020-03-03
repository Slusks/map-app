import { Component, OnInit, AfterViewInit} from '@angular/core';
import { DndDatabaseService } from './dnd-database.service';
import { HttpClient } from '@angular/common/http';
import { markerData } from './markerData';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'map-app';
  xPosition:number;
  yPosition:number;

  
  constructor(
    private dndDatabaseService: DndDatabaseService,
    private http: HttpClient
    ){};
  
  iconDescription:Object={};

  ngOnInit(){
      const iconImage = new Image();
      iconImage.src = "../assets/img/marker.jpg"
      
      //subscribes to the JSON file
      this.http.get<markerData[]>('http://localhost:3000/mapMarker')
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
        img.style.left= (x)+'px';
        img.style.top=(y)+'px';

        //add img to map element
        document.getElementById('map container').appendChild(img);
      }
  }

  logCursorPosition(e){
      //Get Cursor Location
      var x = e.clientX;
      this.xPosition = x - 20;
      var y = e.clientY;
      this.yPosition = y - 40;
      console.log("X Position "+ x + " Y Position" +y);
      console.log(this.xPosition);
      
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
        "yPos":this.yPosition,
        "xPos":this.xPosition
      };
    if (marker.description.length >= 3){
    this.http.post("http://localhost:3000/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)})
    alert("Successfully Added")} else {
      alert("description is too short")
    }

    document.getElementById("currentMarker").remove()
    location.reload()
    document.getElementById("myForm").style.display = "none";
    
  }

  
}
