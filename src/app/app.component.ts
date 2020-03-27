import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'task 1';
  images: NasaItem[];

  constructor(private http: HttpClient) { }

  toUrl(x: string) {
    return "url(" + x + ")"
  }

  ngOnInit() {
    this.http.get("https://images-api.nasa.gov/search?q=mars&description=surface&media_type=image")
    .subscribe((x: NasaResponse) => this.images = x.collection.items.slice(0, 40))
    
  }
}

interface NasaResponse {
  collection: NasaResponseBody
}

interface NasaResponseBody {
  items: NasaItem[]
}

interface NasaItem {
  data:NasaData[],
  links:NasaLink[]
}

interface NasaData {
  title:string,
  description:string
}

interface NasaLink {
  href:string
}