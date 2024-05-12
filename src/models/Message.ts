import * as firebase from "firebase";

// export interface Message {
//   studentId?: number;
//   studentName?: string;
//   professorId?: number;
//   professorName?: string;
//   senderType?: string;
//   message?: string;
//   date?: Timestamp;
//   chatId?: string;
//   hours?: string;
//   chatType?: string;
//   senderName?: string;
// }

export class Message {

  constructor(
      public chatId: string,
      public chatName: string,
      public recId: string,
      public recName: string,
      public recSurname: string,
      public sendId: string,
      public sendName: string,
      public sendSurname: string,
      public text: string,
      public date: Date
  ) {}
}