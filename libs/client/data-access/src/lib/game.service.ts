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

  getGameById(todoId: string): Observable<IGame> {
    return this.http.get<IGame>(this.baseUrlById(todoId));
  }

  createGame(game: ICreateGame): Observable<IGame> {
    return this.http.post<IGame>(this.baseUrl, game);
  }

  updateGame(todoId: string, todoData: unknown): Observable<IGame> {
    return this.http.patch<IGame>(this.baseUrlById(todoId), todoData);
  }

  createOrUpdateGame(todoId: string, todoData: unknown): Observable<IGame> {
    return this.http.put<IGame>(this.baseUrlById(todoId), todoData);
  }

  deleteGame(todoId: string): Observable<never> {
    return this.http.delete<never>(this.baseUrlById(todoId));
  }
}
