import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Player } from '../../models/players';
import { ItemsService } from '../../services/items.service';
import { DetailComponent } from '../detail/detail';
import { FiltroPlayersPipe } from '../../pipes/filtro-players.pipe';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, DetailComponent, FiltroPlayersPipe],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent implements OnInit {

  players$!: Observable<Player[]>; // ⚡ Observable de Firebase
  playersCount: number = 0;
  filtroNombre: string = '';
  filtroPosicion: string = '';
  filtroEdadMin: number = 20;
  selectedPlayer: Player | undefined;

  constructor(private firestore: Firestore, private itemsService: ItemsService) {}

  ngOnInit() {
    // Usamos el servicio para obtener los jugadores (observables de Firestore)
    this.players$ = this.itemsService.getItems();

    // Suscripción puntual para comprobar y mostrar el número de documentos traídos desde Firestore
    this.players$.pipe(take(1)).subscribe(list => {
      this.playersCount = Array.isArray(list) ? list.length : 0;
      console.log('Firestore players count:', this.playersCount, list);
    }, err => console.error('Error leyendo players desde Firestore', err));
  }

  seleccionarPlayer(player: Player): void {
    this.selectedPlayer = player;
  }

  // Ejemplo: eliminar un jugador desde el listado usando ItemsService
  deletePlayer(player: Player, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const id = player && (player as any).id ? String((player as any).id) : null;
    if (!id) {
      console.warn('deletePlayer: id no disponible', player);
      return;
    }

    const confirmed = confirm(`¿Eliminar a ${player.nombre} ${player.apellidos}?`);
    if (!confirmed) return;

    this.itemsService.deleteItem(id)
      .then(() => {
        // La colección es reactiva: collectionData actualizará players$ automáticamente.
        console.log('Jugador eliminado:', id);
      })
      .catch(err => {
        console.error('Error eliminando jugador', err);
        alert('Error al eliminar jugador: ' + (err?.message || err));
      });
  }
}