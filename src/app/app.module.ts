import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { GeneralDataComponent } from './components/general-data/general-data.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { NguCarouselModule } from '@ngu/carousel';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ManageDataComponent } from './components/manage-data/manage-data.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    GeneralDataComponent,
    SummaryComponent,
    AgendaComponent,
    GalleryComponent,
    ContactComponent,
    SafeUrlPipe,
    ManageDataComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatChipsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatTreeModule,
    FormsModule,
    NguCarouselModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
