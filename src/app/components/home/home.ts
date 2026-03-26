import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterModule],
    standalone: true,
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent {
  title = 'Equipo Basket';
  subtitle = 'Angular Force';
}