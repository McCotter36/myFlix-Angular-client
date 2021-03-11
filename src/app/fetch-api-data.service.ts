import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateProfileFormComponent } from './update-profile-form/update-profile-form.component';

/**
 * Declaring the api url that will provide data for the client app
 */
const apiUrl = 'https://mccotter-movie-api.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

/**
 * This class allows users to register a new account
 */

export class UserRegistrationService {
  /** 
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http
   */
  constructor(private http: HttpClient) { }
  
  /**
   * Making the api call for the user registration endpoint
   * @param userDetails 
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

/**
 * This class allows a user to log in to their account
 */
@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some Error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened: please try again later.');
  }

   /**
   * api call to the user login endpoint
   * @param userDetails 
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
}

/**
 * This class gets a list of all movies in the database and returns 
 * them as an array of objects
 */
@Injectable({
  providedIn: 'root'
})

export class GetAllMoviesService {
  constructor(private http: HttpClient) { }
  // Error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
 /**
   * api call to the get all movies endpoint
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class returns a single movie by title
 */
@Injectable({
  providedIn: 'root'
})

export class GetMovieService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  /**
   * api call to get single movie information
   */  
    getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class returns a director object by the director's name
 */
@Injectable({
  providedIn: 'root'
})

export class GetDirectorService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
 /**
   * api call to get director data
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Directors/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class returns genre info by genre name
 */
@Injectable({
  providedIn: 'root'
})

export class GetGenreService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * api call to get genre data
   */
    getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Genres/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class returns a user object by username
 */
@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  /**
   * api call to get user data by username
   */
    getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class returns a user's favorite movies by username
 */
@Injectable({
  providedIn: 'root'
})

export class GetFavoritesService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || { };
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  /**
   * api call to get a user's favorite movies
   */
    getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:username/movies/:movieID', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class adds a movie to the user's list of favorites
 */
@Injectable({
  providedIn: 'root'
})

export class AddFavoriteService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || { };
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
 /**
   * api call to add a movie to a user's list of favorites
   * @param id 
   */
    addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(`${apiUrl}users/${username}/movies/${id}`, id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class deletes a movie from the user's list of favorites
 */
@Injectable({
  providedIn: 'root'
})

export class DeleteFavoriteService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
 /**
   * api call to delete a movie to a user's list of favorites
   * @param id 
   */
    deleteFavorite(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}/movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class allows a user to update their information
 */
@Injectable({
  providedIn: 'root'
})

export class UpdateProfileService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || { };
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  /**
   * api call to edit a user's information
   * @param userDetails 
   */
    updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}users/${username}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

/**
 * This class allows a user to delete their account 
 * it will remove the user from the database
 */
@Injectable({
  providedIn: 'root'
})

export class DeleteUserService {
  constructor(private http: HttpClient) { }
  // extract response data
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  /**
   * api call to delete a user
   */
    deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}

export class FetchApiDataService {
  constructor() {}
}