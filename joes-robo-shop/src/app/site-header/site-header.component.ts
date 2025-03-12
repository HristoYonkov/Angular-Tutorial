import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'bot-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  user: IUser | null = null;
  isSignOut: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (user) => {this.user = user}
    })
  }

  toggleSignOut() {
    this.isSignOut = !this.isSignOut;
  }

  signOut() {
    this.userService.signOut();
    this.isSignOut = false;
  }
}
