import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProsConsStreamPageComponent } from "./presentation/pages/prosConsStreamPage/prosConsStreamPage.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProsConsStreamPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularGPT';
}
