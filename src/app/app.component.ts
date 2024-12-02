import { Component } from '@angular/core';
import { NavigationCancel, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './util/navigation-bar/navigation-bar.component';
//import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pizza-order';
}
