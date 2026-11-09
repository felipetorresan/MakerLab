import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Impressao3D } from '../models/impressao3d';

type FirebaseImpressao = Omit<Impressao3D, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class ImpressoesService {
  private http = inject(HttpClient);
  private apiUrl = 'https://makerlab-ca781-default-rtdb.firebaseio.com/Impressao3D';
  private sufixo = '.json';

  getAll(): Observable<Impressao3D[]> {
    return this.http
      .get<Record<string, FirebaseImpressao> | null>(this.apiUrl + this.sufixo)
      .pipe(
        map((response) => {
          if (!response) {
            return [];
          }

          return Object.entries(response).map(([id, impressao]) => ({
            id,
            ...impressao
          }));
        })
      );
  }

  getById(id: string): Observable<Impressao3D> {
    return this.http
      .get<FirebaseImpressao | null>(this.apiUrl + '/' + id + this.sufixo)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error('Impressão não encontrada.');
          }

          return {
            id,
            ...response
          };
        })
      );
  }

  create(impressao: Omit<Impressao3D, 'id'>): Observable<Impressao3D> {
    return this.http
      .post<{ name: string }>(this.apiUrl + this.sufixo, impressao)
      .pipe(
        map((response) => ({
          id: response.name,
          ...impressao
        }))
      );
  }

  update(id: string, impressao: Omit<Impressao3D, 'id'>): Observable<Impressao3D> {
    return this.http
      .put<FirebaseImpressao>(this.apiUrl + '/' + id + this.sufixo, impressao)
      .pipe(
        map(() => ({
          id,
          ...impressao
        }))
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id + this.sufixo);
  }
}
