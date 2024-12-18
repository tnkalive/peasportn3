import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface PeriodicElement {
  position: number;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'จักรยาน', gold: 0, silver: 0, bronze: 0 },
  { position: 2, name: 'บิลเลียด', gold: 0, silver: 0, bronze: 0 },
  { position: 3, name: 'กอล์ฟ', gold: 0, silver: 0, bronze: 0 },
  { position: 4, name: 'ดาร์ท', gold: 0, silver: 0, bronze: 0 },
  { position: 5, name: 'เปตอง', gold: 0, silver: 0, bronze: 0 },
  { position: 6, name: 'วอลเลย์บอล', gold: 0, silver: 0, bronze: 0 },
  { position: 7, name: 'ตะกร้อ', gold: 0, silver: 0, bronze: 0 },
  { position: 8, name: 'แบดมินตัน', gold: 0, silver: 0, bronze: 0 },
  { position: 9, name: 'เทเบิลเทนนิส', gold: 0, silver: 0, bronze: 0 },
  { position: 10, name: 'เทนนิส', gold: 0, silver: 0, bronze: 0 },
  { position: 10, name: 'หมากกระดาน', gold: 0, silver: 0, bronze: 0 },
  { position: 10, name: 'ฟุตบอล', gold: 0, silver: 0, bronze: 0 },
  { position: 10, name: 'e-Sport', gold: 0, silver: 0, bronze: 0 },
];

interface Agenda {
  name: string;
  date: string;
  time: string;
  location: string;
  sort: number;
  gold: number;
  silver: number;
  bronze: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'gold', 'silver', 'bronze'];
  dataSource = ELEMENT_DATA;

  agendaList: Agenda[] = [];

  constructor(private db: AngularFirestore) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {

    this.db
      .collection<Agenda>('agenda', ref => ref.orderBy('sort', 'asc'))
      .valueChanges()
      .subscribe(agendaItems => {
        this.agendaList = [];

        agendaItems.map(item => {
          this.agendaList.push({
            name: item.name,
            sort: item.sort,
            date: item.date,
            time: item.time,
            location: item.location,
            gold: item.gold,
            silver: item.silver,
            bronze: item.bronze
          });
        });
      });
  }
}
