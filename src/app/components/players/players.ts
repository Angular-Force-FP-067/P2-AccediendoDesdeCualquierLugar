import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/players';
import { PLAYERS } from '../../data/players';
import { DetailComponent } from '../detail/detail';
import { MediaComponent } from '../media/media';
import { RouterModule } from '@angular/router';
import { FiltroPlayersPipe } from '../../pipes/filtro-players.pipe';

@Component({
    selector: 'app-players',
    imports: [FormsModule, CommonModule, DetailComponent, MediaComponent, FiltroPlayersPipe, RouterModule],
    templateUrl: './players.html',
    styleUrls: ['./players.css']
})
export class PlayersComponent {

  players: Player[] = PLAYERS;

  filtroNombre: string = '';
  filtroPosicion: string = '';
  filtroEdadMin?: number = 20; // Valor por defecto para el filtro de edad mínima

  // 1. Inicializamos explícitamente como undefined
  selectedPlayer: Player | undefined = undefined;

  // 2. Método para asignar el jugador
  seleccionarPlayer(player: Player): void {
    this.selectedPlayer = player;
  }
}