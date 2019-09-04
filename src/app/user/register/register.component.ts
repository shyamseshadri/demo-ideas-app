import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public name = '';
  public email = '';
  public password = '';
  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    this.userService.register(this.name, this.email, this.password)
        .subscribe(() => {
          this.router.navigate(['main']);
        }, (err) => {
          this.snackBar.open(err.error.reason || 'Error registering user', 'Dismiss', {
            duration: 5000
          });
        });
  }
}
