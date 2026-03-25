import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ARQUETIPOS } from '../../data/arquetipos';
import { Arquetipo } from '../../models/arquetipos';

@Component({
    selector: 'app-arquetipos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './arquetipos.html',
    styleUrls: ['./arquetipos.css']
})

export class ArquetiposComponent {

  tabActiva: 'entrenador' | 'jugador' | 'aficionado' = 'entrenador';

  arquetipos: Arquetipo[] = ARQUETIPOS;

  get arquetiposFiltrados(){
    return this.arquetipos.filter(a => a.rol === this.tabActiva);
  }

}