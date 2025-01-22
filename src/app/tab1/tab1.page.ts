import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  movies: any[] = [];
  query: string = '';
  private apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=7a0e64a1';

  constructor(private http: HttpClient) {}

  findMovies() {
    const query = this.query.trim();
    if (query.length > 2) {
      this.http.get(`${this.apiUrl}&s=${query}`).subscribe((res: any) => {
        this.movies = res.Search || [];
      });
    } else {
      this.movies = [];
    }
  }
}
