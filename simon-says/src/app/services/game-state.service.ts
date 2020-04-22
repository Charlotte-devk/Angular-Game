import { Injectable } from '@angular/core';

import { COLORS, START_COUNT } from '../models/constants';
import { Subject } from 'rxjs';

@Injectable()
export class GameStateService {
  /**
 * @remarks
 * The GameStateService manages each playing state, guessing and generating new colors for each new round.
 * It also imports the constants variables declared in the models folder
 *
 * @param count - Counts the numbers of correct guesses and shows it as a score, resets when user guesses wrong.
 * @param round - A string array containing the colors of the going round.
 * @param player - A string array containing the colors the player picked in the going round.
 * @param state - Sets each round to a new state.
 *
 */
  count: number;
  round: string[] = [];
  player: string[] = [];
  state = new Subject<any>();

  constructor() {
    this.count = START_COUNT;
  }

  /**
 * @remarks
 * This method uses a rounded random number to get one out of 4 colors in a string array.
 *
 * @returns - A random color saved in a string.
 *
 */
  private get randomColor(): string {
    let index = Math.floor(Math.random() * 3.99 );
    return COLORS[index];
  }

  /**
 * @remarks
 * This method empties the string array of round. By using the count value a new color is added to the round.
 * It sets this state as active and returns the newly filled string array.
 *
 * @returns - The same round filled with one more color.
 *
 */
  generateRound(): string[] {
    this.round = [];
    for (let i = 0; i < this.count; i++){
      this.appendRound();
    }
    this.setState();
    return this.round;
  }

  /**
 * @remarks
 * This method increases the count when the player guessed right and adds a new color to the round.
 *
 * @param increment - If the player guessed right increment is true otherwise false.
 *
 */
  appendRound(increment: boolean = false): void {
    if(increment) {
      this.count++;
    }
    this.round.push(this.randomColor);
  }
  /**
 * @remarks
 * This method sets the count to the default count constant and generates a new round.
 *
 * @returns - A new generated round with the count of 1.
 *
 */
  restartGame(): string[] {
    this.count = START_COUNT;
    return this.generateRound();
  }

  /**
 * @remarks
 * This method adds a new color with the type string into the player array which contains the guesses.
 * The player array gets emptied after guessing all the colors and the state gets changed.
 *
 * @param val - The color the player picked as a string.
 *
 */
  playerGuess(val: string) {
    this.player.push(val);
    if(!this.compareRound()) {
      this.player = [];
    }
    this.setState();
  }

  /**
 * @remarks
 * This method compares the player picked colors to the round colors.
 *
 * @returns true - If the player guessed all colors correctly.
 * @returns false - If the player guessed incorrectly and restarts the game.
 *
 */
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

  /**
 * @remarks
 * This method updates the game by adding a new color with the {@method appendRound()}
 * and resets the players guesses.
 *
 */
  updateGame() {
    this.appendRound(true);
    this.player = [];
  }

  /**
 * @remarks
 * This method sets the state of the game.
 *
 */
  setState() {
    this.state.next({
      player: this.player,
      round: this.round,
      count: this.count
    });
  }
}
