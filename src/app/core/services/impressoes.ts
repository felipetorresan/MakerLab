import { inject, Service } from '@angular/core';
import { Impressao3D } from '../models/impressao3d';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

type FirebaseImpressoes = Omit<Impressao3D, "id"> & { id?: unknown };

@Service()
export class Impressoes {
    private http = inject(HttpClient);
    private apiUrl = "https://makerlab-ca781-default-rtdb.firebaseio.com/Impressao3D";
    private sufix = ".json";

    getAll(): Observable<Impressao3D[]> {
        return this.http.get<Record<string, FirebaseImpressoes> | null>
            (this.apiUrl + this.sufix).pipe(
                map((response) => {
                    if (!response) {
                        return [];
                    }

                    return Object.entries(response).map(([id, impressao]) => {
                        const { id: _ignoredId, ...impressaoData } = impressao;
                        return { id, ...impressaoData } as Impressao3D;
                    });
                })
            );
    }

    getById(id: string): Observable<Impressao3D> {
        return this.http.get<FirebaseImpressoes | null>
            (`${this.apiUrl}/${id}${this.sufix}`).pipe(
                map((response) => {
                    if (!response) {
                        throw new Error(`Impressão 3D com ID ${id} não encontrada`);
                    }
                    const { id: _ignoredId, ...impressaoData } = response;
                    return { id, ...impressaoData } as Impressao3D;
                })
            );
    }
}
