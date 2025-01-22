import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  movies: any[] = [];
  popularMovies: any[] = [];
  query: string = '';
  loading: boolean = false;
  private apiUrl = 'http://www.omdbapi.com/?apikey=7a0e64a1';
  private popularMovieIds = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0071562', // The Godfather: Part II
    'tt0468569', // The Dark Knight
    'tt0050083', // 12 Angry Men
    'tt0108052', // Schindler's List
    'tt0167260', // The Lord of the Rings: The Return of the King
    'tt0110912', // Pulp Fiction
    'tt0060196', // The Good, the Bad and the Ugly
    'tt0109830', // Forest gump 

  ];

  constructor(private http: HttpClient, private router: Router) {
    this.loadPopularMovies();
  }

  loadPopularMovies() {
    const movieDetails$ = this.popularMovieIds.map(id =>
      this.http.get(`${this.apiUrl}&i=${id}`)
    );
    forkJoin(movieDetails$).subscribe((movies: any[]) => {
      this.popularMovies = movies;
    });
  }

  findMovies() {
    const query = this.query.trim();
    if (query.length > 2) {
      this.loading = true;
      this.http.get(`${this.apiUrl}&s=${query}`).subscribe((res: any) => {
        this.movies = res.Search || [];
        this.loading = false;
      });
    } else {
      this.movies = [];
    }
  }

  viewDetails(movie: any) {
    this.router.navigate(['/tabs/details', { movieId: movie.imdbID }]);
  }

  addToAlreadySeen(movie: any) {
    // Implement logic to add the movie to the "Already Seen" list
    console.log('Added to Already Seen:', movie);
  }

  addToWatchLater(movie: any) {
    // Implement logic to add the movie to the "Watch Later" list
    console.log('Added to Watch Later:', movie);
  }

}