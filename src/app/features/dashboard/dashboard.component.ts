import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  readonly cards = [
    { label: 'Escolas', value: 14, icon: 'pi pi-building' },
    { label: 'Refeições hoje', value: 1842, icon: 'pi pi-apple' },
    { label: 'Produtos em estoque', value: 326, icon: 'pi pi-box' },
    { label: 'Alertas', value: 7, icon: 'pi pi-bell' }
  ];
}
