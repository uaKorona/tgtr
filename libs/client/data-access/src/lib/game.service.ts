import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateGame, IGame } from '@shared/domain';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/games';
  private readonly baseUrlById = (id: string) => `${this.baseUrl}/${id}`;

  getAllGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(this.baseUrl);
  }

  getGameById(gameId: string): Observable<IGame> {
    return this.http.get<IGame>(this.baseUrlById(gameId));
  }

  createGame(game: ICreateGame): Observable<IGame> {
    return this.http.post<IGame>(this.baseUrl, game);
  }

  updateGame(gameId: string, gameData: unknown): Observable<IGame> {
    return this.http.patch<IGame>(this.baseUrlById(gameId), gameData);
  }

  createOrUpdateGame(gameId: string, gameData: unknown): Observable<IGame> {
    return this.http.put<IGame>(this.baseUrlById(gameId), gameData);
  }

  deleteGame(gameId: string): Observable<never> {
    return this.http.delete<never>(this.baseUrlById(gameId));
  }
}
