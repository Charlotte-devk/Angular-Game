import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { ButtonComponent } from './components/game/button/button.component';

import { GameStateService } from './services/game-state.service';


@NgModule({
  declarations: [AppComponent, GameComponent, ButtonComponent],
  imports: [BrowserModule],
  providers: [GameStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
* @remarks
* This class imports the following components from the following files:
* {AppComponent app.component.ts},
* {GameComponent game.component.ts},
* {ButtonComponent button.component.ts},
* and the service from the following file:
* {GameStateService game-state.service.ts}
*/
