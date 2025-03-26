import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Agenda {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  sort: number;
}

interface AgendaDetail {
  competitor: string;
  date: string;
  time: string;
  location: string;
  seq: number;
  type: string;
  score: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agendaList: Agenda[] = [];
  agendaDetailList: AgendaDetail[] = [];

  constructor(private db: AngularFirestore) {
    this.db
      .collection<Agenda>('agenda', ref => ref.orderBy('sort', 'asc'))
      .snapshotChanges()
      .subscribe(agendaItems => {
        this.agendaList = [];
        agendaItems.map(item => {
          this.agendaList.push({
            id: item.payload.doc.id,
            name: item.payload.doc.data().name,
            sort: item.payload.doc.data().sort,
            date: item.payload.doc.data().date,
            time: item.payload.doc.data().time,
            location: item.payload.doc.data().location
          });
        });
      });
  }

  ngOnInit() { }

  selectAgenda(agendaItem: Agenda) {
    this.agendaDetailList = [];
    const selectAgendaId = agendaItem.id;

    this.db
      .collection<AgendaDetail>(
        'agenda/' + selectAgendaId + '/agenda-detail',
        ref => ref.orderBy('seq', 'asc')
      )
      .valueChanges()
      .subscribe(agendaDetailItems => {
        agendaDetailItems.map(item => {
          this.agendaDetailList.push({
            competitor: item.competitor,
            seq: item.seq,
            date: item.date,
            time: item.time,
            location: item.location,
            type: item.type,
            score: item.score
          });
        });
      });
  }
}
