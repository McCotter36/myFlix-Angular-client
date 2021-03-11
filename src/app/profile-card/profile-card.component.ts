import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { 
  GetAllMoviesService, 
  GetUserService,
  DeleteFavoriteService,
  DeleteUserService,
} from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UpdateProfileFormComponent } from '../update-profile-form/update-profile-form.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchUserData: GetUserService,
    public fetchMovieData: GetAllMoviesService,
    public deleteFavoriteMovie: DeleteFavoriteService,
    public fetchDeleteData: DeleteUserService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router,
    ) { }

  /**
   * Calls getUser() function on initialization
   */
  ngOnInit(): void {
    this.getUser();
  }
  /**
   * Fetch User data
   */
  getUser(): void {
    this.fetchUserData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }

  /**
   * Fetches all movies to view and filters out favorites with filterFavoriteMovies() function
   */
  getMovies(): void {
    this.fetchMovieData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        this.filterFavoriteMovies();
    });
  }

  /**
   * Opens Genre dialog box with genre name and genre description
   */
  
  getGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description },
      width: '300px',
    });
  }
  
  /**
   * Opens Director dialog box with director name, birth and death, as well as mini bio
   */

  getDirector(name: string, birth: string, death: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, birth, death, bio },
      width: "300px",
    });
  }

  /** 
   * Opens synopsis dialog box with movie title and movie synopsis
   */
  getSynopsis(title: string, synopsis: string): void {
    this.dialog.open(SynopsisCardComponent, {
    data: { title, synopsis },
    width: "400px",
    });
  }

  /** 
   * Filters list of favorite movies for profile view
  */
  filterFavoriteMovies(): void {
    this.favorites = this.movies.filter((movie: any) => 
      this.user.FavoriteMovies.includes(movie._id)
    );
    return this.favorites;
  }

  /** 
   * Removes favorite from list of favorites
   */ 
  deleteFavorite(id: string, title: string): void {
    this.deleteFavoriteMovie.deleteFavorite(id).subscribe(() => {
      this.snackbar.open(`${title} has been removed from your list of favorites!`, 'OK', {
        duration: 1000,
      });
      setTimeout(function() {
          window.location.reload();
        }, 1000);
    });
  }

  /** 
   * Opens update profile card
   */
    openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileFormComponent, {
      width: '300px'
    });
  }

  /** 
   * Deletes the user profile
   */
  deleteUser(): void{
    let ok = confirm("Are you sure you want to delete your profile, this cannot be reversed.");
    if (ok) {
      this.fetchDeleteData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackbar.open('Profile Deleted', 'OK', {
          duration: 1500,
        });    
      });
    };
  }
}