import { Client, TextChannel } from 'discord.js';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

export class Bot {
  private readonly BOT_TOKEN: string;
  private readonly GUILD_ID: string;
  private readonly CHANNEL: string;
  private readonly client: Client;

  private textChannel?: TextChannel;

  constructor() {
    this.BOT_TOKEN = process.env.BOT_TOKEN || '';
    this.GUILD_ID = process.env.GUILD_ID || '';
    this.CHANNEL = process.env.CHANNEL || '';
    this.client = new Client({ disableMentions: 'all' });

    if (this.BOT_TOKEN === '') {
      throw Error('Missing BOT_TOKEN at environment');
    }
    if (this.GUILD_ID === '') {
      throw Error('Missing GUILD_ID at environment');
    }
    if (this.CHANNEL === '') {
      throw Error('Missing CHANNEL at environment');
    }

    this.client.on('ready', () => this.afterLogin());
  }

  public addMessageHandler(obs: Observable<string>): void {
    obs.subscribe((x) => this.sendMessage(x));
  }

  private sendMessage(msg: string): void {
    if (this.textChannel === undefined) {
      console.warn('Channel is still being retrieved');
      return;
    }
    this.textChannel.send(msg);
  }

  public doLogin(): void {
    this.client.login(this.BOT_TOKEN);
  }

  private afterLogin(): void {
    from(this.client.guilds.fetch(this.GUILD_ID))
      .pipe(
        switchMap((x) => x.channels.cache),
        map((x) => x[1]),
        filter((x) => x.name === this.CHANNEL),
        filter((x) => x.type === 'text'),
        map((x) => x as TextChannel)
      )
      .subscribe(
        (c) => {
          this.textChannel = c;
          console.info('Channel Retrieval Successful');
          //    c.send("I'm Alive");
        },
        (e) => console.error('Could not find channel / guild', e)
      );
  }
}
