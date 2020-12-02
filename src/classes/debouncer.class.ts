import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { GroupedMessage } from '../interfaces/grouped-messages.interface';
import { NotificationMessage } from '../interfaces/notification-message.interface';

const DEFAULT_DEBOUNCE_DELAY = 1000;

export class Debouncer {
  private readonly cache: { [key: string]: GroupedMessage } = {};

  private readonly DEBOUNCE_DELAY: number;

  private internalBouncer: Subject<string> = new Subject();

  constructor() {
    this.DEBOUNCE_DELAY = Number(process.env.DEBOUNCE_DELAY) || DEFAULT_DEBOUNCE_DELAY;
  }

  public addHandler(handler: Observable<NotificationMessage>): void {
    handler.subscribe((msg) => this.addMessage(msg));
  }

  public addMessage(msg: NotificationMessage): void {
    if (this.cache[msg.title] === undefined) {
      this.cache[msg.title] = { descriptions: [], title: msg.title, user: msg.user };
    }
    this.cache[msg.title].descriptions.push(msg.description);
    this.internalBouncer.next(msg.title);
  }

  public getGroupedMessagesObservable(): Observable<GroupedMessage> {
    return this.internalBouncer.pipe(
      debounceTime(this.DEBOUNCE_DELAY),
      map((key) => {
        const gm: GroupedMessage = this.cache[key];
        delete this.cache[key];
        return gm;
      })
    );
  }
}
