import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './util/navigation-bar/navigation-bar.component';
import { SideBarComponent } from './util/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pizza-order';
}
