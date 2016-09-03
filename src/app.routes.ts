import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './app/editor';

const appRoutes: Routes = [
  { path: '', component: EditorComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: any = RouterModule.forRoot(appRoutes);
