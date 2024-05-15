import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  titleFilter: string = '';
  yearFilter: string = '';
  movies: Movie[] = [];
  originalMovies: Movie[] = [];
  private subscription: Subscription = new Subscription;
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.originalMovies = this.movies = movies;
    });
  }

  filterMovies(): void {
    const hasTitleFilter = this.titleFilter !== '' && this.titleFilter !== null;
    const hasYearFilter = this.yearFilter !== '' && this.yearFilter !== null;
  
    if (!hasTitleFilter && !hasYearFilter) {
      this.movies = this.originalMovies;
      return;
    }
  
    this.movies = this.originalMovies.filter((movie: Movie) => {
      return (hasTitleFilter ? movie.title.toLowerCase().includes(this.titleFilter.toLowerCase()) : true) &&
             (hasYearFilter ? movie.release_date.includes(this.yearFilter) : true);
    });
  }

  getMovieDetails(id: string){
    this.router.navigate(['/movie-details', id]);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}