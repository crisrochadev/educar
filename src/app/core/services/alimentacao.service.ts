import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AlimentacaoService {
  constructor(private readonly http: HttpClient) {}

  listByDate(dateIso: string) {
    return this.http.get('/api/alimentacao', { params: { date: dateIso } });
  }
}
