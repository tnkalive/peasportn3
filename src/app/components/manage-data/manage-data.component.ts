import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
interface Agenda {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  sort: number;
  gold: string;
  silver: string;
  bronze: string;
}

interface AgendaDetail {
  id: string;
  competitor: string;
  date: string;
  time: string;
  location: string;
  seq: number;
  type: string;
  score: string;
}

interface Contact {
  id: string;
  contactName: string;
  seq: number;
  position: string;
  tel: string;
}

interface Gallery {
  id: string;
  galleryUrl: string;
  seq: number;
  name: string;
}

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html',
  styleUrls: ['./manage-data.component.css']
})
export class ManageDataComponent implements OnInit {
  agendaList: Agenda[] = [];
  agendaDetailList: AgendaDetail[] = [];
  contactList: Contact[] = [];
  galleryList: Gallery[] = [];

  selectedAgenda: Agenda;

  isNewAgenda: boolean = false;
  isNewContact: boolean = false;
  isNewGallery: boolean = false;

  constructor(private db: AngularFirestore) {
    this.getData();
    this.getContactList();
    this.getGalleryList();
  }

  ngOnInit() { }

  getData() {

    this.db
      .collection<Agenda>('agenda', ref => ref.orderBy('sort', 'asc'))
      .snapshotChanges()
      .subscribe(agendaItems => {

        this.agendaList = [];
        this.agendaDetailList = [];
        this.selectedAgenda = null;
        this.isNewAgenda = false;

        agendaItems.map(item => {
          this.agendaList.push({
            id: item.payload.doc.id,
            name: item.payload.doc.data().name,
            sort: item.payload.doc.data().sort,
            date: item.payload.doc.data().date,
            time: item.payload.doc.data().time,
            location: item.payload.doc.data().location,
            gold: item.payload.doc.data().gold,
            silver: item.payload.doc.data().silver,
            bronze: item.payload.doc.data().bronze
          });
        });
      });
  }

  getContactList() {
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

  getGalleryList() {
    this.db.collection<Gallery>('gallery-list', ref => ref.orderBy('seq', 'asc')).snapshotChanges().subscribe(gallerys => {
      this.galleryList = [];
      gallerys.map(galleryItem => {
        this.galleryList.push({
          id: galleryItem.payload.doc.id,
          galleryUrl: galleryItem.payload.doc.data().galleryUrl,
          seq: galleryItem.payload.doc.data().seq,
          name: galleryItem.payload.doc.data().name
        });
      });

    });
  }

  selectAgenda(agendaItem: Agenda) {
    this.agendaDetailList = [];
    this.selectedAgenda = null;
    this.isNewAgenda = false;

    this.selectedAgenda = agendaItem;
    this.getAgendaDetail(agendaItem.id);
  }

  insertNewAgenda(form) {

    this.db.collection('agenda').add({
      name: form.value.sportName,
      date: form.value.date,
      time: form.value.time,
      location: form.value.location,
      sort: Number(form.value.sort)
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getData();
        form.reset();
      });

    });

  }

  deleteAgenda(selectedAgenda: any) {
    this.db.collection('agenda').doc(selectedAgenda.id).delete().then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getData();
      });

    });
  }

  updateAgenda(form) {
    this.db.collection<Agenda>('agenda').doc(form.value.id).update({
      sort: Number(form.value.sort),
      name: form.value.sportName,
      date: form.value.date,
      time: form.value.time,
      location: form.value.location
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getData();
        form.reset();
      });

    });
  }

  getAgendaDetail(id: string) {
    this.db
      .collection<AgendaDetail>(
        'agenda/' + id + '/agenda-detail',
        ref => ref.orderBy('seq', 'asc')
      )
      .snapshotChanges()
      .subscribe(items => {

        this.agendaDetailList = [];

        items.map(item => {
          //console.log(item.payload.doc.id);

          this.agendaDetailList.push({
            id: item.payload.doc.id,
            competitor: item.payload.doc.data().competitor,
            seq: item.payload.doc.data().seq,
            date: item.payload.doc.data().date,
            time: item.payload.doc.data().time,
            location: item.payload.doc.data().location,
            type: item.payload.doc.data().type,
            score: item.payload.doc.data().score
          });
        });
      });
  }

  insertAgendaDetail(form) {
    this.agendaDetailList = [];
    this.db.collection('agenda/' + form.value.id + '/agenda-detail').add({
      competitor: form.value.competitor,
      seq: Number(form.value.seq),
      date: form.value.date,
      time: form.value.time,
      location: form.value.location,
      score: form.value.score,
      type: form.value.type
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getAgendaDetail(this.selectedAgenda.id);
      });

    });
  }

  editAgendaDetail(agendaDetailItem: any) {
    this.agendaDetailList = [];
    this.db.collection('agenda/' + this.selectedAgenda.id + '/agenda-detail').doc(agendaDetailItem.id).set(agendaDetailItem).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getAgendaDetail(this.selectedAgenda.id);
      });

    });
  }

  deleteAgendaDetail(agendaDetailItem: any) {
    this.agendaDetailList = [];
    this.db.collection('agenda/' + this.selectedAgenda.id + '/agenda-detail').doc(agendaDetailItem.id).delete().then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getAgendaDetail(this.selectedAgenda.id);
      });

    });
  }

  addNewAgendaDialog() {
    this.agendaDetailList = [];
    this.selectedAgenda = null;
    this.isNewAgenda = true;
  }

  updateRank(agendaListItem: any) {
    this.db.collection('agenda').doc(agendaListItem.id).update({
      gold: agendaListItem.gold === undefined ? '' : agendaListItem.gold,
      silver: agendaListItem.silver === undefined ? '' : agendaListItem.silver,
      bronze: agendaListItem.bronze === undefined ? '' : agendaListItem.bronze
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      });

    });
  }

  addNewContact() {
    if (this.isNewContact) {
      this.isNewContact = false;
    }
    else {
      this.isNewContact = true;
    }
  }

  insertNewContact(form: any) {
    this.db.collection('contact-list').add({
      seq: Number(form.value.seq),
      position: form.value.position,
      contactName: form.value.contactName,
      tel: form.value.tel
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.isNewContact = false;
        this.getContactList();
        form.reset();
      });

    });
  }

  updateContact(contactListItem: any) {
    this.db.collection('contact-list').doc(contactListItem.id).update({
      seq: Number(contactListItem.seq),
      position: contactListItem.position,
      contactName: contactListItem.contactName,
      tel: contactListItem.tel
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getContactList();
      });

    });
  }

  deleteContact(contactListItem: any) {
    this.db.collection('contact-list').doc(contactListItem.id).delete().then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getContactList();
      });

    });
  }

  addNewGallery() {
    if (this.isNewGallery) {
      this.isNewGallery = false;
    }
    else {
      this.isNewGallery = true;
    }
  }

  insertNewGallery(form) {
    this.db.collection('gallery-list').add({
      seq: Number(form.value.seq),
      galleryUrl: form.value.galleryUrl,
      name: form.value.name,
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.isNewGallery = false;
        this.getGalleryList();
        form.reset();
      });

    });
  }

  updateGallery(galleryItem: any) {
    this.db.collection('gallery-list').doc(galleryItem.id).update({
      galleryUrl: galleryItem.galleryUrl,
      seq: Number(galleryItem.seq),
      name: galleryItem.name
    }).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getGalleryList();
      });


    });
  }

  deleteGallery(galleryItem: any) {
    this.db.collection('gallery-list').doc(galleryItem.id).delete().then(() => {

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getGalleryList();
      });

    });
  }

}
