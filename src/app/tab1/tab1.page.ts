import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

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

  constructor(private http: HttpClient, private router: Router, private movieService: MovieService) {
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
    if (this.query.length > 2) {
      this.loading = true;
      this.http.get(`${this.apiUrl}&s=${this.query}`).subscribe((data: any) => {
        if (data.Search) {
          const moviePromises = data.Search.map((movie: any) =>
            this.http.get(`${this.apiUrl}&i=${movie.imdbID}`).toPromise()
          );
          
          Promise.all(moviePromises).then((detailedMovies) => {
            this.movies = detailedMovies;
            this.loading = false;
          });
        } else {
          this.movies = [];
          this.loading = false;
        }
      });
    } else {
      // Clear results when search is empty
      this.movies = [];
    }
  }
  
  clearSearch() {
    this.query = '';
    this.movies = [];
  }

  viewDetails(movie: any) {
    this.router.navigate(['/tabs/details', movie.imdbID]);
  }

  addToAlreadySeen(movie: any) {
    if (movie && movie.imdbID) {
      this.movieService.addToAlreadySeen(movie);
    }
  }

  addToWatchLater(movie: any) {
    if (movie && movie.imdbID) {
      this.movieService.addToWatchLater(movie);
    }
  }
}