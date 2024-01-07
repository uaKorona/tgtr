import { TestBed } from '@angular/core/testing';

import { GameFacade } from './game-facade.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameFacade', () => {
  let service: GameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GameFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
