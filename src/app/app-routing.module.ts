import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GeneralDataComponent } from './components/general-data/general-data.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { ManageDataComponent } from './components/manage-data/manage-data.component';
import { LoginComponent } from './components/login/login.component';

// Auth Guard
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'general', component: GeneralDataComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'manage', component: ManageDataComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
