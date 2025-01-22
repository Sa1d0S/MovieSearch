import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  alreadySeen: any[] = [];
  watchLater: any[] = [];

  constructor(private movieService: MovieService) {}

  ionViewDidEnter() {
      this.alreadySeen = this.movieService.getAlreadySeen();
      this.watchLater = this.movieService.getWatchLater();
  }

  removeFromAlreadySeen(movie: any) {
    this.movieService.removeFromAlreadySeen(movie);
    this.alreadySeen = this.movieService.getAlreadySeen();
  }

  removeFromWatchLater(movie: any) {
    this.movieService.removeFromWatchLater(movie);
    this.watchLater = this.movieService.getWatchLater();
  }
}