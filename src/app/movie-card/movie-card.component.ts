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

  /**
   * getMovies() function called on initialization
   */
  ngOnInit(): void {
    this.getMovies();
  }
  
  /**
   * Fetches movie data and stored it inside the movies array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
    });
  }

  /**
   * Opens dialog with genre name and description
   * @param name 
   * @param description 
   */
  getGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description },
      width: '300px',
    });
  }
  
  /**
   * Opens dialog with Director name birth data and death date
   * @param name 
   * @param birth 
   * @param death 
   * @param bio 
   */
  getDirector(name: string, birth: string, death: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, birth, death, bio },
      width: "300px",
    });
  }

  /**
   * Opens dialog with movie title and movie synopsis
   */
  getSynopsis(title:string, synopsis: string): void {
    this.dialog.open(SynopsisCardComponent, {
    data: { title, synopsis },
    width: "400px",
    });
  }

  /**
   * Adds movie to list of favorite movies
   * @param id 
   * @param title 
   */
  addFavorite(id: string, title: string): void {
    this.fetchFavoriteData.addFavorite(id).subscribe(() => {
      this.snackbar.open(`${title} has been added to your list of favorites!`, 'OK', {
        duration: 1000,
      });
    });
  }
}