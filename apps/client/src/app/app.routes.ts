import { Route } from '@angular/router';
import { featureGameRoutes } from '@client/feature-game';
import { clientFeatureLoginRoutes } from '@client/feature-login';
import { featureRegisterRoutes } from '@client/feature-register';

export const appRoutes: Route[] = [
  ...featureGameRoutes,
  ...clientFeatureLoginRoutes,
  ...featureRegisterRoutes,
];
