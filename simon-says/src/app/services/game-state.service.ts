import { Injectable } from '@angular/core';

import { COLORS, START_COUNT } from '../models/constants';
import { Subject } from 'rxjs';

@Injectable()
export class GameStateService {
  count: number;
  round: string[] = [];
  player: string[] = [];
  state = new Subject<any>();

  constructor() {
    this.count = START_COUNT;
  }

  private get randomColor(): string {
    let index = Math.floor(Math.random() * 3.99 );
    return COLORS[index];
  }

  generateRound(): string[] {
    this.round = [];
    for (let i = 0; i < this.count; i++){
      this.appendRound();
    }
    this.setState();
    return this.round;
  }

  appendRound(increment: boolean = false): void {
    if(increment) {
      this.count++;
    }
    this.round.push(this.randomColor);
  }

  restartGame(): string[] {
    this.count = START_COUNT;
    return this.generateRound();
  }

  playerGuess(val: string) {
    this.player.push(val);
    if(!this.compareRound()) {
      this.player = [];
    }
    this.setState();
  }

  compareRound(): boolean {
    for(let i = 0; i < this.player.length; i++) {
      if(this.player[i] !== this.round[i]) {
        this.restartGame();
        return false;
      }
    }
    if(this.player.length === this.round.length) {
      this.updateGame();
    }
    return true;
  }

  updateGame() {
    this.appendRound(true);
    this.player = [];
  }

  setState() {
    this.state.next({
      player: this.player,
      round: this.round,
      count: this.count
    });
  }
}
