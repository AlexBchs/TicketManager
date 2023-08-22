import {State} from "../model/State";

export class Ticket {
  constructor (
    public id: number,
    public title: string,
    public description: string,
    public date: Date = new Date(),
    public state: State = State.New
  ) {}
}
