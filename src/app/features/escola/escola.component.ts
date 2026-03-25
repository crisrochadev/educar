import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-escola',
  templateUrl: './escola.component.html',
  styleUrl: './escola.component.scss'
})
export class EscolaComponent {
  displayDialog = false;
  readonly form = this.fb.group({
    nome: ['', Validators.required],
    diretor: ['', Validators.required],
    status: ['Ativa', Validators.required]
  });

  escolas = [
    { nome: 'EMEF Centro', diretor: 'Ana Ramos', status: 'Ativa' },
    { nome: 'EMEF Nova Era', diretor: 'Carlos Lima', status: 'Ativa' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly messageService: MessageService) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.escolas = [this.form.getRawValue() as { nome: string; diretor: string; status: string }, ...this.escolas];
    this.displayDialog = false;
    this.form.reset({ status: 'Ativa' });
    this.messageService.add({ severity: 'success', summary: 'Escola criada com sucesso' });
  }
}
