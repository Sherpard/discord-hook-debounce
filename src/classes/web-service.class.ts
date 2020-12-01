import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { Server } from 'http';
import { Observable, Subject } from 'rxjs';

import { NotificationMessage } from '../interfaces/notification-message.interface';

export class WebService {
  public readonly message$: Observable<NotificationMessage>;

  private readonly webserver: Express;
  private readonly activeServers: Server[] = [];

  private readonly messageEmitter$: Subject<NotificationMessage>;

  private readonly PORT: number;
  private readonly DEFAULT_PORT: number = 6969;

  constructor() {
    this.webserver = express();
    this.PORT = Number(process.env.PORT) || this.DEFAULT_PORT;
    this.messageEmitter$ = new Subject();
    this.message$ = this.messageEmitter$.asObservable();

    this.webserver.use(bodyParser.json());

    this.webserver.post('/message', (req, res) => {
      try {
        this.messageEmitter$.next(this.buildNotification(req.body));
        res.status(200).send('OK');
      } catch (e) {
        if (e instanceof Error) {
          res.status(400);
          res.send(e.message);
        } else {
          res.sendStatus(500);
        }
      }
    });
  }

  public startServer(): void {
    this.activeServers.push(
      this.webserver.listen(this.PORT, '127.0.0.1', () =>
        console.debug(`Webserver Listening at port ${this.PORT}!`)
      )
    );
  }

  private buildNotification(data: { [key: string]: string }): NotificationMessage {
    if (data.title === undefined) {
      throw Error("field 'title' not provided");
    }
    if (data.user === undefined) {
      throw Error("field 'user' not provided");
    }

    if (data.description === undefined) {
      throw Error("field 'description' not provided");
    }

    return { title: data.title, user: data.user, description: data.description };
  }
}
