import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import {TicketService} from "../service/ticket.service";
import {Ticket} from "../model/ticket";
import {State} from "../model/State";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  tNew: Ticket[] = [];
  tToDo: Ticket[] = [];
  tDoing: Ticket[] = [];
  tDone: Ticket[] = [];

  constructor(private ticketServ: TicketService) {
  }

  public pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  public pieChartLabels = ['New', 'ToDo', 'Doing', 'Done'];
  public pieChartDatasets = [];
  public pieChartLegend = true;
  public pieChartPlugins = [DatalabelsPlugin];

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
      this.pieChartDatasets = [{
        data: [this.tNew.length, this.tToDo.length, this.tDoing.length, this.tDone.length],
        backgroundColor: ['#ffa1b5','#86c7f3','#ffe29a', '#d9b3ff']
      }]
    })
  }

  ngOnInit(): void {
    this.getTickets();
  }
}
