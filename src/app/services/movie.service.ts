import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private alreadySeen: any[] = [];
  private watchLater: any[] = [];
  private readonly ALREADY_SEEN_KEY = 'alreadySeen';
  private readonly WATCH_LATER_KEY = 'watchLater';

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.ALREADY_SEEN_KEY, JSON.stringify(this.alreadySeen));
    localStorage.setItem(this.WATCH_LATER_KEY, JSON.stringify(this.watchLater));
  }

  private loadFromLocalStorage() {
    const alreadySeen = localStorage.getItem(this.ALREADY_SEEN_KEY);
    const watchLater = localStorage.getItem(this.WATCH_LATER_KEY);
    this.alreadySeen = alreadySeen ? JSON.parse(alreadySeen) : [];
    this.watchLater = watchLater ? JSON.parse(watchLater) : [];
  }

  private isDuplicate(movie: any, list: any[]): boolean {
    return list.some(item => item.imdbID === movie.imdbID);
  }

  addToAlreadySeen(movie: any) {
    if (!this.isDuplicate(movie, this.alreadySeen)) {
      console.log('Adding to Already Seen:', movie);
      this.alreadySeen.push(movie);
      this.saveToLocalStorage();
    }
  }

  addToWatchLater(movie: any) {
    if (!this.isDuplicate(movie, this.watchLater)) {
      console.log('Adding to Watch Later:', movie);
      this.watchLater.push(movie);
      this.saveToLocalStorage();
    }
  }

  removeFromAlreadySeen(movie: any) {
    const index = this.alreadySeen.findIndex(item => item.imdbID === movie.imdbID);
    if (index !== -1) {
      this.alreadySeen.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  removeFromWatchLater(movie: any) {
    const index = this.watchLater.findIndex(item => item.imdbID === movie.imdbID);
    if (index !== -1) {
      this.watchLater.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  getAlreadySeen() {
    console.log('Getting Already Seen:', this.alreadySeen);
    return this.alreadySeen;
  }

  getWatchLater() {
    console.log('Getting Watch Later:', this.watchLater);
    return this.watchLater;
  }
}