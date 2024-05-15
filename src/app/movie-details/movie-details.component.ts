import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  private subscription: Subscription = new Subscription;
  movie: MovieDetails = {
    id: '',
    title: '',
    duration: '',
    budget: '',
    release_date: '',
    box_office: '',
    cinematographers: [],
    poster: '',
    producers: [],
    summary: ''
  };
  
  id: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')?? '';
    this.subscription = this.movieService.getMovieDetails(this.id).subscribe((movie) => {
      this.movie = movie;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
