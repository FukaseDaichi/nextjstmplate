export type Message = {
  src: string;
  content: string;
  timestamp: number;
};
export type Chat = {
  messages: Array<Message>;
};
