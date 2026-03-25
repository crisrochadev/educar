import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Escola', icon: 'pi pi-building', route: '/escola' },
    { label: 'Alimentação', icon: 'pi pi-apple', route: '/alimentacao' },
    { label: 'Estoque', icon: 'pi pi-box', route: '/estoque' }
  ];
}
