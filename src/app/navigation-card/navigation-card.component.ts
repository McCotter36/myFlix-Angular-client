import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-card',
  templateUrl: './navigation-card.component.html',
  styleUrls: ['./navigation-card.component.scss']
})
export class NavigationCardComponent implements OnInit {

  constructor(
    public router: Router,
    public snackbar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  /**
   * Logs the user out and returns them to the welcome screen
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(["welcome"]);
    this.snackbar.open("You have successfully logged out", "OK", {
      duration: 1500,
    });
  }
  /**
   * This navigates to the main view or home view
   */
  mainView(): void {
    this.router.navigate(['movies']);
    this.snackbar.open("Welcome to the main view", "OK", {
      duration: 1000,
    });
  }
  /**
   * This navigates to the profile view
  */
  userProfile(): void {
    this.router.navigate(["profile"]);
    this.snackbar.open("Welcome to your profile page", "OK", {
      duration: 1000,
    });
  }

}
