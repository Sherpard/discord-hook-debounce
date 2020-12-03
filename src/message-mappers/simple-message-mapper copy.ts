import { GroupedMessage } from '../interfaces/grouped-messages.interface';
import { GroupedMessageMapper } from './grouped-message-mapper.interface';

export class SimpleMessageMapper implements GroupedMessageMapper {
  public mapMessage(group: GroupedMessage): string {
    return `[${group.user}] ${group.title}\n${group.descriptions.join('\n')}`;
  }
}
