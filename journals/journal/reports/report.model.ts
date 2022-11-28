import { Effect } from "./effect.model";

export class Report{
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public dateFrom: Date,
    public dateTo: Date,
    public effects: Effect[]
  ){}
}
