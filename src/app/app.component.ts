import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'task 1';
  images: NasaItem[];

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  toUrl(x: string) {
    return "url(" + x + ")"
  }

  ngOnInit() {
    this.http.get("https://images-api.nasa.gov/search?q=mars&description=surface&media_type=image")
    .subscribe((x: NasaResponse) => this.images = x.collection.items.slice(0, 40))
  }

  openDialog(title, description, image): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {title: title, description: description, image: image}
    });
  }
}

export interface DialogData {
  title: string,
  description: string,
  image: string
}

@Component({
  selector: 'nasa-dialog',
  templateUrl: 'nasa-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClose(): void {
    this.dialogRef.close();
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