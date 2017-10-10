import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const router: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent }, // always last
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(router);
