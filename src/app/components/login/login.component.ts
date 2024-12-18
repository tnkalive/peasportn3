import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authState: any = null;
  loginMessage: string;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnInit() {
  }

  takeLogin(submitValue) {
    const _email: string = submitValue.email;
    const _pwd: string = submitValue.password;
    this.afAuth.signInWithEmailAndPassword(_email, _pwd)
      .then(value => {
        this.authState = value.user;
      })
      .catch(err => {

        switch (err.code) {
          case 'auth/wrong-password': { this.loginMessage = 'Username หรือ Password ไม่ถูกต้อง กรุณาเช็คความถูกต้องใหม่อีกครั้ง'; break; }
          case 'auth/user-not-found': { this.loginMessage = 'Username หรือ Password ไม่ถูกต้อง กรุณาเช็คความถูกต้องใหม่อีกครั้ง'; break; }
          case 'auth/invalid-email': { this.loginMessage = 'Username หรือ Password ไม่ถูกต้อง กรุณาเช็คความถูกต้องใหม่อีกครั้ง'; break; }
          default: { this.loginMessage = 'เกิดข้อผิดพลาด กรุณาติดต่อ 084-0408844 / (11)10366'; break; }
        }

      });

  }

  logout() {
    this.afAuth.signOut();
  }
}
