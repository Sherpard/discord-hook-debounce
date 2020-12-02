import { GroupedMessage } from '../interfaces/grouped-messages.interface';
import { GroupedMessageMapper } from './grouped-message-mapper.interface';

export class DefaultMessageMapper implements GroupedMessageMapper {
  public mapMessage(group: GroupedMessage): string {
    const header = `[${group.user}] ${group.title}`;
    const body: string = group.descriptions.map((x) => `:small_orange_diamond: ${x}`).join('\n');

    return `***${header}***
${body}    
`;
  }
}
