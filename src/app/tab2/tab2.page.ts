import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  movieDetail: any = null;
  loading = false;
  error = false;
  private apiUrl = 'http://www.omdbapi.com/?apikey=7a0e64a1';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('movieId');
      if (movieId) {
        this.loading = true;
        this.error = false;
        this.movieDetail = null;
        this.fetchMovieDetails(movieId);
      }
    });
  }

  ionViewWillEnter() {
    // Refresh data when view enters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.error = false;
      this.movieDetail = null;
      this.fetchMovieDetails(id);
    }
  }

  private fetchMovieDetails(id: string) {
    this.http.get(`${this.apiUrl}&i=${id}&plot=full`)
      .subscribe({
        next: (response: any) => {
          if (response.Response === 'True') {
            console.log('Movie details:', response);
            this.movieDetail = response;
          } else {
            this.error = true;
            console.error('API Error:', response.Error);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
}