import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import {Page404Component} from "./404/404.component";
import {CardContainerComponent} from "./card-container/card-container.component";
// import {RecipesModule} from "./recipes/recipes.module";
// import {ShoppingListModule} from "./shopping-list/shopping-list.module";

const APP_ROUTERS: Routes = [
  // {path: 'shopping-list', component: ShoppingListModule},
  // {path: 'recipes', component: RecipesModule},
  // {path: '', redirectTo: '/default', pathMatch: 'full'},
  {path: '**', component: CardContainerComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTERS)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
