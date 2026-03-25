export interface StockOption {
  id: number;
  nome: string;
  central: boolean;
  transferenciaHabilitada: boolean;
}

export type StockStatus = 'OK' | 'Baixo' | 'Crítico';

export interface ProdutoEstoque {
  produto: string;
  quantidadeAtual: number;
  unidade: string;
  estoqueMinimo: number;
  status: StockStatus;
}
