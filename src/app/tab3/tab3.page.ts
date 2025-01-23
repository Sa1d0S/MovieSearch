import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit, OnDestroy {
  alreadySeen: any[] = [];
  watchLater: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionViewWillEnter() {
    this.refreshLists();
  }

  private refreshLists() {
    this.movieService.loadFromLocalStorage(); // Add this method to MovieService
  }

  private setupSubscriptions() {
    this.movieService.getAlreadySeen$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(movies => {
        console.log('Already Seen updated:', movies);
        this.alreadySeen = [...movies];
      });

    this.movieService.getWatchLater$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(movies => {
        console.log('Watch Later updated:', movies);
        this.watchLater = [...movies];
      });
  }

  removeFromAlreadySeen(movie: any) {
    this.movieService.removeFromAlreadySeen(movie);
    this.refreshLists();
  }

  removeFromWatchLater(movie: any) {
    this.movieService.removeFromWatchLater(movie);
    this.refreshLists();
  }
}