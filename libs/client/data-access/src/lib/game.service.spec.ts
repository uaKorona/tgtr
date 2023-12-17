import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IGame } from '@shared/domain';
import { createMockGame, createMockUser } from '@shared/util-testing';
import { of } from 'rxjs';

const mockUser = createMockUser();

describe('GameService', () => {
  let service: GameService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * The first test is a simple call against the GET endpoint
   * for game entities.
   *
   * This test differs from the backend's unit tests in that
   * instead of using `async ()` for the callback, we define
   * a callback method `done` that we can call when we choose.
   */
  it('should get a list of games items', (done) => {
    const games: IGame[] = Array.from({ length: 5 }).map(() =>
      createMockGame(mockUser.id)
    );

    /**
     * This should look familiar at this point - Jest will monitor
     * HttpClient for calls to it's `get()` method and return whatever
     * value we provide. Since HttpClient returns Observables, we
     * need to wrap our response payload with `of()`
     */
    const httpSpy = jest.spyOn(http, 'get').mockReturnValue(of(games));

    /**
     * Calling `subscribe()` on the service's method will cause it
     * to run, thus emitting the value we mocked above. As you can
     * see, we manually call the `done` callback once we've
     * completed our checks.
     */
    service.getAllGames().subscribe({
      next: (val) => {
        expect(val).toStrictEqual(games);
        expect(val.length).toEqual(games.length);
        done();
      },
      error: done.fail,
    });

    expect(httpSpy).toHaveBeenCalledTimes(1);
  });
});
