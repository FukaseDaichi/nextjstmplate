import type { User } from "src/type/User";

export type MyRoomData = {
  users?: Record<string, User>;
  object?: Record<string, any>;
};
