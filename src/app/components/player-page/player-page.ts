import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail';
import { MediaComponent } from '../media/media';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ItemsService } from '../../services/items.service';
import { Player } from '../../models/players';

@Component({
  selector: 'app-player-page',
  imports: [CommonModule, DetailComponent, MediaComponent],
  templateUrl: './player-page.html',
  standalone: true,
  styleUrls: ['./player-page.css']
})
export class PlayerPage implements OnInit {

  player$: Observable<Player | undefined> = of(undefined);
  isNewMode = false;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.player$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        if (!id) {
          return of(undefined);
        }

        if (id === 'new') {
          this.isNewMode = true;
          return of(undefined);
        }

        this.isNewMode = false;
        return this.itemsService.getItemById(id);
      })
    );
  }
}