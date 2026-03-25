import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/players';

@Component({
    selector: 'app-detail',
    imports: [CommonModule],
    templateUrl: './detail.html',
    styleUrls: ['./detail.css']
})
export class DetailComponent {
  @Input() jugador?: Player;

  // Devuelve la altura en metros con 2 decimales si la altura viene en cm
  get alturaFormateada(): string | null {
    if (!this.jugador || this.jugador.altura == null) return null;
    // suponemos que los datos en 'altura' están en centímetros si son >= 100
    const h = this.jugador.altura;
    if (h >= 100) {
      return (h / 100).toFixed(2) + ' m';
    }
    // ya está en metros
    return h + ' m';
  }
}
