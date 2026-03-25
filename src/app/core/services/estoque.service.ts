import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProdutoEstoque, StockOption } from '../../shared/models/estoque.models';

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private readonly api = '/api/estoque';
  readonly loading = signal(false);

  constructor(private readonly http: HttpClient) {}

  getEstoques(): Observable<StockOption[]> {
    return of([
      { id: 1, nome: 'Estoque Central', central: true, transferenciaHabilitada: true },
      { id: 2, nome: 'EMEF Centro', central: false, transferenciaHabilitada: true },
      { id: 3, nome: 'EMEF Nova Era', central: false, transferenciaHabilitada: false }
    ]);
  }

  getProdutos(_estoqueId: number): Observable<ProdutoEstoque[]> {
    return of([
      { produto: 'Arroz', quantidadeAtual: 80, unidade: 'kg', estoqueMinimo: 50, status: 'OK' },
      { produto: 'Feijão', quantidadeAtual: 32, unidade: 'kg', estoqueMinimo: 40, status: 'Baixo' },
      { produto: 'Leite', quantidadeAtual: 8, unidade: 'l', estoqueMinimo: 25, status: 'Crítico' }
    ]);
  }

  saveInventario(payload: unknown): Observable<unknown> {
    return this.http.post(`${this.api}/inventario`, payload);
  }
}
