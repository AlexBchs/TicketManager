import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Ticket} from "../model/ticket";
import {TicketService} from "../service/ticket.service";
import {State} from "../model/State";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})

export class KanbanComponent implements OnInit {
  tNew: Ticket[] = [];
  tToDo: Ticket[] = [];
  tDoing: Ticket[] = [];
  tDone: Ticket[] = [];

  research: string = "";

  constructor(private ticketServ: TicketService) {}

  getTickets(): void {
    this.ticketServ.getTickets().subscribe(t => {
      t.forEach(t => {
        switch (t.state) {
          case State.New:
            this.tNew.push(t);
            break;
          case State.ToDo:
            this.tToDo.push(t);
            break;
          case State.Doing:
            this.tDoing.push(t);
            break;
          case State.Done:
            this.tDone.push(t);
            break;
        }
      })
    })
  }

  ngOnInit(): void {
    this.getTickets();
  }

  dropItem(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      switch (event.container.id) {
        case 'cdk-drop-list-3':
          event.container.data[event.currentIndex].state = State.Done;
          event.container.data[event.currentIndex].date = new Date();
          break;
        case 'cdk-drop-list-2':
          event.container.data[event.currentIndex].state = State.Doing;
          event.container.data[event.currentIndex].date = new Date();
          break;
        case 'cdk-drop-list-1':
          event.container.data[event.currentIndex].state = State.ToDo;
          event.container.data[event.currentIndex].date = new Date();
          break;
        case 'cdk-drop-list-0':
          event.container.data[event.currentIndex].state = State.New;
          event.container.data[event.currentIndex].date = new Date();
          break;
      }
      this.ticketServ.updateTicket(event.container.data[event.currentIndex]).subscribe();
    }
  }

  delete(tick: Ticket) {
    switch (tick.state) {
      case State.New:
        this.tNew = this.tNew.filter(t => t !== tick);
        this.ticketServ.deleteTicket(tick.id).subscribe();
        break;
      case State.ToDo:
        this.tToDo = this.tToDo.filter(t => t !== tick);
        this.ticketServ.deleteTicket(tick.id).subscribe();
        break;
      case State.Doing:
        this.tDoing = this.tDoing.filter(t => t !== tick);
        this.ticketServ.deleteTicket(tick.id).subscribe();
        break;
      case State.Done:
        this.tDone = this.tDone.filter(t => t !== tick);
        this.ticketServ.deleteTicket(tick.id).subscribe();
        break;
    }
  }

}
