import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { 
  GetAllMoviesService, 
  AddFavoriteService,
} from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchFavoriteData: AddFavoriteService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }
  // Fetches all movies to view 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
    });
  }

  // Opens Genre dialog box with genre name and genre description
  getGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description },
      width: '300px',
    });
  }
  
  // Opens Director dialog box with director name, birth and death, as well as mini bio
  getDirector(name: string, birth: string, death: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, birth, death, bio },
      width: "300px",
    });
  }

  // Opens synopsis dialog box with movie title and movie synopsis
  getSynopsis(title:string, synopsis: string): void {
    this.dialog.open(SynopsisCardComponent, {
    data: { title, synopsis },
    width: "400px",
    });
  }

  // Adds movie to list of favorites
  addFavorite(id: string, title: string): void {
    this.fetchFavoriteData.addFavorite(id).subscribe(() => {
      this.snackbar.open(`${title} has been added to your list of favorites!`, 'OK', {
        duration: 1000,
      });
    });
  }
}