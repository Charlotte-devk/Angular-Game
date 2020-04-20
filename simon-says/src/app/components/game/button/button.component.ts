import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-game-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  color: string;
  @Input()
  active: boolean = false;
  @Output()
  guess: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.guess.emit(this.color);
  }
}
