import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { collectionData, Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../../models/players';
import { DetailComponent } from '../detail/detail';
import { MediaComponent } from '../media/media';
import { FiltroPlayersPipe } from '../../pipes/filtro-players.pipe';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, DetailComponent, MediaComponent, FiltroPlayersPipe],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent implements OnInit {

  players$!: Observable<Player[]>; // ⚡ Observable de Firebase
  filtroNombre: string = '';
  filtroPosicion: string = '';
  filtroEdadMin: number = 20;
  selectedPlayer: Player | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const playersCollection = collection(this.firestore, 'players'); // nombre de la colección en Firebase
    this.players$ = collectionData(playersCollection, { idField: 'id' }) as Observable<Player[]>;
  }

  seleccionarPlayer(player: Player): void {
    this.selectedPlayer = player;
  }
}