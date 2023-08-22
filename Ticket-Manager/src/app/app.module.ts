import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule, DecimalPipe} from "@angular/common";
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { KanbanComponent } from './kanban/kanban.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatTableModule} from "@angular/material/table";
import { DeleteTicketComponent } from './delete-ticket/delete-ticket.component';
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import {MatSelectModule} from "@angular/material/select";
import { ErrorInterceptorComponent } from './service/error-interceptor/error-interceptor.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketNewComponent,
    TicketEditComponent,
    KanbanComponent,
    DeleteTicketComponent,
    WelcomeComponent,
    HeaderComponent,
    ErrorInterceptorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    NgChartsModule,
    DecimalPipe
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,

    useClass: ErrorInterceptorComponent,

    multi: true

  }, MatPaginator,DecimalPipe],

  bootstrap: [AppComponent]
})
export class AppModule { }
