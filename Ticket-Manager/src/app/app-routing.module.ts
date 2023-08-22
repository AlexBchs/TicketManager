import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {TicketNewComponent} from "./ticket-new/ticket-new.component";
import {TicketEditComponent} from "./ticket-edit/ticket-edit.component";
import {KanbanComponent} from "./kanban/kanban.component";
import {DeleteTicketComponent} from "./delete-ticket/delete-ticket.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  { path: 'list', component: TicketListComponent },
  { path: 'new', component: TicketNewComponent },
  { path: 'edit/:id', component: TicketEditComponent},
  { path: 'kanban', component: KanbanComponent},
  { path: 'delete/:id', component: DeleteTicketComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
