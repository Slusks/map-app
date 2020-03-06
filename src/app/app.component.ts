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
  iconDescription:Object={};
  xPosition:number;
  yPosition:number;
  id:boolean;

  
  constructor(
    private dndDatabaseService: DndDatabaseService,
    private http: HttpClient
    ){};
  
  

ngOnInit(){
      const iconImage = new Image();
      iconImage.src = "../assets/img/marker.jpg"
      //subscribes to the JSON file
      this.http.get<markerData[]>('http://localhost:3000/mapMarker')
      .subscribe(posts => {
          posts.forEach(post=>{
                this.setMarker(post)})})     
}

  // Prevents the set marker function from loading a marker that already exists
  postValidation(post){
    var docElementId = document.getElementById(post.id)
    var postElementId = post.id
    if (docElementId || postElementId){
      this.setMarker(post)
    } else { return; }
}

  // Creates map markers from db with attributes
   setMarker(post){
    console.log("function started", post.id)
    if (post.id > 0){
      var x = post.xPos;
      var y = post.yPos;
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x)+'px';
      img.style.top=(y)+'px';
      img.id = post.id
      console.log("img.id is", img.id)
      //add img to map element
      document.getElementById('mapContainer').appendChild(img);
      this.id = true;
    } 
    else {console.log ("post is undefined"); this.id = false; return;}

    // Each marker should have a function that triggers onclick, need to add that attribute here
    // and then make the function below


  }

  logCursorPosition(e){
      //Get Cursor Location
      var x = e.clientX;
      this.xPosition = x;
      var y = e.clientY;
      this.yPosition = y - 40;
      console.log("X Position "+ x + " Y Position" +y);
      //Create Temp icon with Attributes
      var img = document.createElement("img");
      img.src = "../assets/img/marker.jpg";
      img.width = 20;
      img.height= 20;
      img.style.position="absolute";
      img.style.left= (x-10)+'px';
      img.style.top=(y-40)+'px';
      document.getElementById('mapContainer').appendChild(img);
      img.id="currentMarker"
      //Open Form
      document.getElementById("myForm").style.display = "block"; //Opens the form
      document.getElementById('myForm').style.top = y +'px'; // sets the form y coordinate
      document.getElementById('myForm').style.left = x +'px'; // sets the form x coordinate
  }

//function that opens and closes the form for the icons
closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("currentMarker").remove()
}


//Form that submits marker data to db
markerFormSubmit(marker){
      console.log(this.id)
      this.iconDescription ={
        "description": marker.description,
        "yPos":this.yPosition,
        "xPos":this.xPosition,
      };
      if (this.id != true){
        this.iconDescription["id"]=1
        this.id = true;
      }
    //only post new icon info of sufficient length
    if (marker.description.length >= 3){
    this.http.post("http://localhost:3000/mapMarker", this.iconDescription).subscribe((po:Response) => {console.log("po",po)})
    alert("Successfully Added")} else {
      alert("description is too short")
    }
    //draw markers with validation to avoid displaying existing markers
      console.log("post validation get")
      this.http.get<markerData[]>('http://localhost:3000/mapMarker')
      .subscribe(posts => {posts.forEach(post=>{this.postValidation(post)})})

    document.getElementById("currentMarker").remove()
    document.getElementById("myForm").style.display = "none";
}

  
}
