import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PlayersComponent } from './components/players/players';
import { PlayerPage } from './components/player-page/player-page';
import { ArquetiposComponent } from './components/arquetipos/arquetipos';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'players/:id', component: PlayerPage },
  { path: 'arquetipos', component: ArquetiposComponent },
  { path: 'players/new', component: PlayerPage },
];