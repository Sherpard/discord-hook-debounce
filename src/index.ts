import dotenv from 'dotenv';
import { filter, map, mergeMap } from 'rxjs/operators';

import { Debouncer } from './classes/debouncer.class';
import { Bot } from './classes/discord-bot.class';
import { MessageSplitter } from './classes/splitter.class';
import { WebService } from './classes/web-service.class';
import { DefaultMessageMapper } from './message-mappers/default-message-mapper';
import { GroupedMessageMapper } from './message-mappers/grouped-message-mapper.interface';

dotenv.config();

const bot: Bot = new Bot();
const webService: WebService = new WebService();
const debouncer: Debouncer = new Debouncer();
const mapper: GroupedMessageMapper = new DefaultMessageMapper();

debouncer.addHandler(webService.message$);
bot.addMessageHandler(
  debouncer.getGroupedMessagesObservable().pipe(
    filter((x) => x !== undefined),
    mergeMap((x) => MessageSplitter.splitMessage(x)),
    map((x) => mapper.mapMessage(x))
  )
);

webService.startServer();

bot.doLogin();
