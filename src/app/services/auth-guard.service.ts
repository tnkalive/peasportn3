import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService  {
    authState: any = null;

    constructor(private router: Router,
        private afAuth: AngularFireAuth) { }

    canActivate(): boolean {
        this.afAuth.authState.subscribe((auth) => {
            if (auth == null) {
                this.router.navigate(['login']);
                return false;
            }
        });
        return true;

    }
}
