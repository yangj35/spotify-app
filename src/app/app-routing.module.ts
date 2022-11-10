import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, RouterConfigOptions } from '@angular/router';
import { SearchComponent } from './home/search/search.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component:SearchComponent },
  { path: 'about', component: AboutComponent },
];

export const appRouterProviders = [
  provideRouter(routes),
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
