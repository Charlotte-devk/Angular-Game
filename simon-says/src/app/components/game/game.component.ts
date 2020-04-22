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
  sounds: any = {};
  colors: any = {
    red: false,
    blue: false,
    green: false,
    yellow: false
  };

  constructor(private game: GameStateService) {
    this.loadSounds();
  }

  /**
  * @remarks
  * This method loads all the sound files.
  */
  loadSounds(){
    let audioUrl1 = '../../../assets/sounds/simonSound1.mp3';
    let audioUrl2 = '../../../assets/sounds/simonSound2.mp3';
    let audioUrl3 = '../../../assets/sounds/simonSound3.mp3';
    let audioUrl4 = '../../../assets/sounds/simonSound4.mp3';
    this.sounds= {
      red: new Audio(audioUrl1),
      blue: new Audio(audioUrl2),
      green: new Audio(audioUrl3),
      yellow: new Audio(audioUrl4)
    };
  }

  /**
  * @remarks
  * This method plays specific sounds.
  *
  * @param color - Uses the color to get the sound.
  *
  */
  playAudio(color: string){
    this.sounds[color].play();
  }
  /**
 * @remarks
 * This method initialises the game upon clicking the start button.
 * It also changes the "Start" on the start button to "Restart".
 * If the game is already running it skips generating a Round and only restarts it.
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
    this.playAudio(e);
  }

  /**
 * @remarks
 * This method, using the Promise method in {@file constants.ts}. sets the active color to true after waiting for 1000ms
 * after waiting another 400ms it sets the active color to false again. The active colors are saved in the round array in {@file game-state.service.ts}
 *
 * @param round - A string array containing the colors of the going round.
 *
 */
  async teasePlayer(round: string[]) {
    for (let i = 0; i < round.length; i++) {
      await sleep(1000);
      this.colors[round[i]] = true;
      this.playAudio(round[i]);
      await sleep(400);
      this.colors[round[i]] = false;
    }
  }
}
