import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-game-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.css']
})
export class ButtonComponent implements OnInit {
  /**
 * @remarks
 * This class declares the selector app-game-button.
 *
 * @param color - The color in the app-game-button tag called color.
 * @param active - Shows if the button is active or not. If true the background gets changed to the color, otherwise to black. See {@file button.component.css}
 * @param guess - An event emitter from the type EventEmitter.
 *
 */
  @Input()
  color: string;
  @Input()
  active: boolean = false;
  @Output()
  guess: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  /**
 * @remarks
 * This method send out the color saved in the html tag app-game-button.
 *
 */
  onClick() {
    this.guess.emit(this.color);
  }
}
