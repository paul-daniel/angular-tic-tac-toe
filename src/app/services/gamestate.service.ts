import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamestateService {
  private currentPlayer$ = new BehaviorSubject<'⚔️' | '🌕'>(Math.round(Math.random() + 1) === 1 ? '🌕' : '⚔️');
  selectedPlayer$ = this.currentPlayer$.asObservable();

  private elementOnBoard$ = new BehaviorSubject<number>(0);
  currentNumberOfElements$ = this.elementOnBoard$.asObservable();

  private endGameString$ = new BehaviorSubject<string>('');
  endGame$ = this.endGameString$.asObservable();

  private reset$ = new BehaviorSubject<boolean>(false);
  resetGame$ = this.reset$.asObservable();

  constructor() { }

  switchPlayers(){
    this.currentPlayer$.next(this.currentPlayer$.value === '⚔️' ? '🌕' : '⚔️');
  }

  addElementOnBoard() {
    this.elementOnBoard$.next(this.getNumberOfElementsOnBoard() + 1);
  }

  resetElementsOnBoard() {
    this.elementOnBoard$.next(0);
  }
  
  setEndGameString(message: string) {
    this.endGameString$.next(message);
  }

  getCurrentPlayer() {
    return this.currentPlayer$.value;
  }

  resetCurrentPlayer() {
    this.currentPlayer$.next(Math.round(Math.random() + 1) === 1? '🌕' : '⚔️');
  }

  getNumberOfElementsOnBoard() {
    return this.elementOnBoard$.value;
  }

  getEndGameString() {
    return this.endGameString$.value;
  }

  resetEndGameString() {
    this.endGameString$.next('');
  }
  
  setResetGame(reset: boolean) {
    this.reset$.next(reset);
  }

}
