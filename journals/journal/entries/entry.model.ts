import { Tracker } from "./tracker.model";

export class Entry{
  constructor(
    public id: string,
    public name: string,
    public date: string,
    public mood: number,
    public trackers: Tracker[]
  ){}
}
