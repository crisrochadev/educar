import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EscolaService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get('/api/escolas');
  }
}
