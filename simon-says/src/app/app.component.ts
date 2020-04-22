import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
 * @remarks
 * This class links up the app-root selector used in the {@file index.html}
 * to the other components. For more details look {@file app.module.ts}
 *
 */
  title = 'simon';
}
