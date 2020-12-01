import { GroupedMessage } from '../interfaces/grouped-messages.interface';

const MAX_MESSAGE_SIZE = 2000;

export class MessageSplitter {
  public static splitMessage(msg: GroupedMessage): GroupedMessage[] {
    const baseLength: number = msg.title.length + msg.user.length + 10;

    const result: GroupedMessage[] = [];

    let currLength: number = MAX_MESSAGE_SIZE;
    let currMsg: GroupedMessage = { title: msg.title, user: msg.user, descriptions: [] };

    let i = 0;
    const l = msg.descriptions.length;

    while (i < l) {
      console.warn(currLength);
      if (currLength >= MAX_MESSAGE_SIZE) {
        currMsg = { title: msg.title, user: msg.user, descriptions: [] };
        result.push(currMsg);
        currLength = baseLength;
      }
      const desc: string = msg.descriptions[i];
      currMsg.descriptions.push(desc);
      // Decoration offset
      currLength += desc.length + 50;
      i++;
    }

    return result;
  }
}
