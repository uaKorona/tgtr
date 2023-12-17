import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@client/data-access';

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe],
  selector: 'tgtr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  title = 'client';
  user$ = this.authService.userData$;

  logout() {
    this.authService.logoutUser();
    this.router.navigate([`/login`]);
  }
}
