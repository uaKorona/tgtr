import { TestBed } from '@angular/core/testing';

import { GameFacade } from './game-facade.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { gameReducers } from './state/ngrx';

describe('GameFacade', () => {
  let service: GameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          [gameReducers.GAMES_FEATURE_KEY]: gameReducers.gamesReducer,
        }),
      ],
    });
    service = TestBed.inject(GameFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
