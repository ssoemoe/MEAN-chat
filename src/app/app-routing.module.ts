import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    loadChildren: () => import("./components/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "chat/:username/:room",
    component: ChatComponent,
    loadChildren: () => import("./components/chat/chat.module").then(m => m.ChatModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
