import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log('login btn clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (user: any) => {
        console.log('success');
        console.log(user);

        //login...
        this.login.loginUser("Login_successfull");

        this.login.setUser(user.data);
        console.log(user.data);
        //redirect ...ADMIN: admin-dashboard
        //redirect ...NORMAL:normal-dashboard
        if (this.login.getUserRole() == 'ADMIN') {
          //admin dashboard
          // window.location.href = '/admin';
          this.router.navigate(['admin/quizzes']);
          this.login.loginStatusSubject.next(true);
        } else if (this.login.getUserRole() == 'NORMAL') {
          //normal user dashbaord
          // window.location.href = '/user-dashboard';
          this.router.navigate(['user-dashboard/0']);
          this.login.loginStatusSubject.next(true);
        } else {
          this.login.logout();
        }
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }
}
