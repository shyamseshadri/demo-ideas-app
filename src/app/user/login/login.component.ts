import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';
  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  handleLogin() {
    this.userService.login(this.email, this.password)
    .subscribe(() => {
      this.router.navigate(['main']);
    }, (err) => {
      this.snackBar.open(err.error.reason || 'Error logging in user', 'Dismiss', {
        duration: 5000
      });
    });
  }
}
