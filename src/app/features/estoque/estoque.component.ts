import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EstoqueService } from '../../core/services/estoque.service';
import { ProdutoEstoque, StockOption } from '../../shared/models/estoque.models';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss'
})
export class EstoqueComponent implements OnInit {
  estoqueOptions: StockOption[] = [];
  selectedEstoque?: StockOption;
  produtos: ProdutoEstoque[] = [];
  loading = false;

  readonly inventarioForm = this.fb.group({
    itens: this.fb.array([])
  });

  readonly entradaForm = this.fb.group({
    fornecedor: ['', Validators.required],
    nf: ['', Validators.required],
    dataEntrada: [new Date(), Validators.required],
    valorTotal: [0, Validators.required]
  });

  readonly saidaForm = this.fb.group({
    data: [new Date(), Validators.required],
    produto: ['', Validators.required],
    quantidade: [0, Validators.required],
    motivo: ['', Validators.required],
    responsavel: ['', Validators.required],
    cardapio: [''],
    lote: ['']
  });

  readonly kpis = [
    { label: 'Total produtos', value: 326, icon: 'pi pi-box' },
    { label: 'Itens abaixo do mínimo', value: 12, icon: 'pi pi-exclamation-triangle' },
    { label: 'Próximos do vencimento', value: 18, icon: 'pi pi-calendar-clock' },
    { label: 'Última movimentação', value: 'Hoje 10:42', icon: 'pi pi-refresh' }
  ];

  readonly movimentacoesRecentes = [
    { tipo: 'Entrada', produto: 'Arroz', quantidade: 50, data: '25/03/2026', responsavel: 'João' },
    { tipo: 'Saída', produto: 'Leite', quantidade: 20, data: '25/03/2026', responsavel: 'Marta' }
  ];

  readonly entradasItens = [
    { produto: 'Feijão', quantidade: 30, unidade: 'kg', validade: '15/06/2026', valorUnitario: 8.5, total: 255 },
    { produto: 'Macarrão', quantidade: 20, unidade: 'kg', validade: '10/08/2026', valorUnitario: 6.2, total: 124 }
  ];

  readonly motivosSaida = [
    { label: 'Consumo diário', value: 'consumo' },
    { label: 'Perda', value: 'perda' },
    { label: 'Transferência', value: 'transferencia' }
  ];

  readonly lotes = [
    { produto: 'Leite', lote: 'LT-001', validade: '05/04/2026', quantidade: 14, diasRestantes: 11 },
    { produto: 'Iogurte', lote: 'LT-009', validade: '28/03/2026', quantidade: 6, diasRestantes: 3 }
  ];

  readonly fornecimentos = [
    { fornecedor: 'Coop Alimentos', status: 'Aprovado', dataAtualizacao: '24/03/2026' },
    { fornecedor: 'Nutri Brasil', status: 'Em análise', dataAtualizacao: '22/03/2026' },
    { fornecedor: 'Mercado Sul', status: 'Reprovado', dataAtualizacao: '20/03/2026' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly estoqueService: EstoqueService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.estoqueService.getEstoques().subscribe((options) => {
      this.estoqueOptions = options;
      this.onEstoqueChange(options[0]);
    });
  }

  onEstoqueChange(option: StockOption): void {
    this.selectedEstoque = option;
    this.loading = true;
    this.estoqueService.getProdutos(option.id).subscribe((produtos) => {
      this.produtos = produtos;
      this.loading = false;
    });
  }

  get inventarioItens(): FormArray {
    return this.inventarioForm.get('itens') as FormArray;
  }

  addEntradaItem(): void {
    this.messageService.add({ severity: 'info', summary: 'Item adicionado à entrada' });
  }

  ajustarEstoque(): void {
    this.messageService.add({ severity: 'success', summary: 'Inventário ajustado com sucesso' });
  }

  registrarSaida(): void {
    if (this.saidaForm.invalid) {
      this.saidaForm.markAllAsTouched();
      return;
    }

    this.messageService.add({ severity: 'success', summary: 'Saída registrada com sucesso' });
  }

  statusSeverity(status: string): 'success' | 'warn' | 'danger' {
    if (status === 'OK' || status === 'Aprovado') return 'success';
    if (status === 'Baixo' || status === 'Em análise') return 'warn';
    return 'danger';
  }

  fornecimentoSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' {
    if (status === 'Aprovado') return 'success';
    if (status === 'Em análise') return 'warn';
    if (status === 'Finalizado') return 'secondary';
    return 'danger';
  }
}
