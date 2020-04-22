import { Component, OnInit } from '@angular/core';

import { GameStateService } from '../../services/game-state.service';
import { START_COUNT, sleep } from '../../models/constants';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent{
  /**
 * @remarks
 * The GameComponent defines the selector app-game used in the {@file app.component.html}.
 * It also uses the actual running game state from {@file game-state.service.ts} to sync
 * the count and shows the player the colors of each new round.
 *
 * @param count - Counts the numbers of correct guesses and shows it as a score, resets when user guesses wrong.
 * @param colors - An object containing colornames of the type boolean to determine the actual color.
 *
 */
  running: boolean = false;
  count: number;
  colors: any = {
    red: false,
    blue: false,
    green: false,
    yellow: false
  };

  constructor(private game: GameStateService) {}

  /**
 * @remarks
 * This method initialises the game upon clicking the start button.
 *
 */
 onClick(){
   if(!this.running){
     document.getElementById("restarter").innerHTML = "Restart"
     this.game.state.subscribe(state => {
       console.log(state);
       if(this.count != state.count) {
         this.count = state.count;
         this.teasePlayer(state.round);
       }
     });
     this.game.generateRound();
     this.running = true;
   }
   else{
     this.game.state.subscribe(state => {
       console.log(state);
       if(this.count != state.count) {
         this.count = state.count;
         this.teasePlayer(state.round);
       }else if(this.count === START_COUNT){
         this.teasePlayer(state.round);
       }
     });
     this.game.restartGame();
   }
 }

  /**
 * @remarks
 * This method sends the event from the user pressing a button as a string to the {@method game.playerGuess()}.
 * See {@file button.component.ts}
 *
 * @param e - the event value of the app-game-button in the {@file game.component.html}
 *
 */
  playerGuess(e: string) {
    this.game.playerGuess(e);
  }

  /**
 * @remarks
 * This method, using the Promise method in {@file constants.ts}. sets the active color to true after waiting for 200ms
 * after waiting another 500ms it sets the active color to false again. The active colors are saved in the round array in {@file game-state.service.ts}
 *
 * @param round - A string array containing the colors of the going round.
 *
 */
  async teasePlayer(round: string[]) {
    for (let i = 0; i < round.length; i++) {
      await sleep(700);
      this.colors[round[i]] = true;
      await sleep(400);
      this.colors[round[i]] = false;
    }
  }
}
