import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EscolaComponent } from './features/escola/escola.component';
import { AlimentacaoComponent } from './features/alimentacao/alimentacao.component';
import { EstoqueComponent } from './features/estoque/estoque.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'escola', component: EscolaComponent },
      { path: 'alimentacao', component: AlimentacaoComponent },
      { path: 'estoque', component: EstoqueComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
