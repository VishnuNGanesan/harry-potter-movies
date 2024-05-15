import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie, MovieDetails } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:4200';
  // private apiUrl = 'https://angular-training-nine.vercel.app';
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.apiUrl}/movies/${id}`);
  }

}

