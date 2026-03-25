import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail';
import { MediaComponent } from '../media/media';
import { PLAYERS } from '../../data/players';

@Component({
    selector: 'app-player-page',
    imports: [CommonModule, DetailComponent, MediaComponent],
    templateUrl: './player-page.html',
    styleUrls: ['./player-page.css']
})
export class PlayerPage {
  player: any | undefined;

  constructor(private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.player = PLAYERS.find((p: any) => p.id === id);
    }
  }
}
