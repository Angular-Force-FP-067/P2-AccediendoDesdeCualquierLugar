import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail';
import { MediaComponent } from '../media/media';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-player-page',
  imports: [CommonModule, DetailComponent, MediaComponent],
  templateUrl: './player-page.html',
  standalone: true,
  styleUrls: ['./player-page.css']
})
export class PlayerPage implements OnInit {

  player$: Observable<any> = of(null); // Observable que contendrá los datos del jugador

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    this.player$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of(null); // Si no hay id, devolvemos null
        const playerDoc = doc(this.firestore, `players/${id}`);
        return docData(playerDoc, { idField: 'id' }); // Observable con los datos del jugador
      })
    );
  }
}