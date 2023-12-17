import { Route } from '@angular/router';
import { FeatureGameComponent } from './feature-game/feature-game.component';
import { authGuard } from '@client/data-access';

export const featureGameRoutes: Route[] = [
  { path: '', component: FeatureGameComponent, canActivate: [authGuard] },
];
