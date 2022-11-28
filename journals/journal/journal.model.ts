import { Entry } from "./entries/entry.model";
import { Tracker } from "./entries/tracker.model";
import { Report } from "./reports/report.model";

export class Journal{
  constructor(
    public id: string,
    public name: string,
    public tracking: string,
    public trackers: Tracker[],
    public entries: Entry[],
    public reports: Report[]
  ){}
}
