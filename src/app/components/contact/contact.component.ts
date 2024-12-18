import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Contact {
  id: string;
  contactName: string;
  seq: number;
  position: string;
  tel: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactList: Contact[] = [];

  constructor(private db: AngularFirestore) {
    this.db.collection<Contact>('contact-list', ref => ref.orderBy('seq', 'asc')).snapshotChanges().subscribe(contactList => {
      this.contactList = [];
      contactList.map(contactItem => {
        this.contactList.push({
          id: contactItem.payload.doc.id,
          contactName: contactItem.payload.doc.data().contactName,
          seq: contactItem.payload.doc.data().seq,
          position: contactItem.payload.doc.data().position,
          tel: contactItem.payload.doc.data().tel
        });
      });
    });

  }

  ngOnInit() {
  }

  insertContact(form) {
    this.contactList = [];

    this.db.collection('contact-list').add({
      contactName: form.value.contactName,
      seq: Number(form.value.seq),
      position: form.value.position,
      tel: form.value.tel
    });
  }

}
