import { GroupedMessage } from '../interfaces/grouped-messages.interface';

export interface GroupedMessageMapper {
  mapMessage(group: GroupedMessage): string;
}
