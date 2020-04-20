import { Component, OnInit } from '@angular/core';

import { GameStateService } from '../../services/game-state.service';
import { sleep } from '../../models/constants';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  count: number;
  colors: any = {
    red: false,
    blue: false,
    green: false,
    yellow: false
  };

  constructor(private game: GameStateService) {}

  ngOnInit(){
    this.game.state.subscribe(state => {
      console.log(state);
      if(this.count != state.count) {
        this.count = state.count;
        this.teasePlayer(state.round);
      }
    });
    this.game.generateRound();
  }
  playerGuess(e: string) {
    this.game.playerGuess(e);
  }

  async teasePlayer(round: string[]) {
    for (let i = 0; i < round.length; i++) {
      this.colors[round[i]] = true;
      await sleep(500);
      this.colors[round[i]] = false;
      await sleep(200);
    }
  }
}
