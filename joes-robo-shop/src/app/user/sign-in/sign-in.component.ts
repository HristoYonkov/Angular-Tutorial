import { Component } from '@angular/core';
import { IUserCredentials } from '../user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  credentials: IUserCredentials = { email: '', password: '' }
  
  constructor(private userService: UserService, private router: Router) { }
  
  signIn() {
    this.userService.signIn(this.credentials).subscribe( {
      next: () => this.router.navigate(['/catalog'])
    })
  }
}
