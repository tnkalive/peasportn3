import { Component, OnInit  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Gallery {
  galleryUrl: string;
  seq: number;
  name: string;
}

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    standalone: false
})
export class GalleryComponent implements OnInit {
  galleryList: Gallery[];
  constructor(private db: AngularFirestore) {
    this.db.collection<Gallery>('gallery-list', ref => ref.orderBy('seq', 'asc')).valueChanges().subscribe(data => {
      this.galleryList = data;
  });
}

ngOnInit() {
}

}
