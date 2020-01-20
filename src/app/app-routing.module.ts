import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { HeroesComponent } from './pages/heroes/heroes.component';


const routes: Routes = [
  {path: 'hero/:id', component: HeroComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
