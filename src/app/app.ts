import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingBannerComponent } from './shared/landing-banner/landing-banner.component';

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [
      RouterOutlet,
      NgIf,
      HeaderComponent,
      FooterComponent,
      LandingBannerComponent
    ],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
  })
  export class AppComponent {
  isLanding = false;

  constructor(private router: Router) {
    this.updateLayout(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateLayout(event.urlAfterRedirects);
      });
  }

  private updateLayout(url: string): void {
    this.isLanding = url === '/' || url === '';
  }
}