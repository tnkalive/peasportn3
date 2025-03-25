import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('งานกีฬาสีสานสัมพันธ์ กฟน.3');
  }
}
