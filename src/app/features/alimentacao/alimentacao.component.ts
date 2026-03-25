import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alimentacao',
  templateUrl: './alimentacao.component.html'
})
export class AlimentacaoComponent {
  readonly form = this.fb.group({
    data: [new Date(), Validators.required]
  });

  refeicoes = [
    { refeicao: 'Café da manhã', escola: 'EMEF Centro', alunos: 352 },
    { refeicao: 'Almoço', escola: 'EMEF Centro', alunos: 401 }
  ];

  constructor(private readonly fb: FormBuilder, private readonly messageService: MessageService) {}

  registrar(): void {
    this.messageService.add({ severity: 'success', summary: 'Refeição registrada' });
  }
}
