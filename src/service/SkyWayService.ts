/* eslint-disable no-console */
import type Peer from "skyway-js";
import type { MeshRoom, RoomData } from "skyway-js";

export class SkyWaySercive {
  public static peer: Peer;
  public static room: MeshRoom;
  private static callMap: Map<string, (data: any) => void> = new Map();

  constructor(peer: Peer) {
    SkyWaySercive.peer = peer;
  }

  public static roomIn(roomId: string) {
    this.room = this.peer.joinRoom(roomId, { mode: "mesh" });

    this.room.on("peerLeave", (leavedata: string) => {
      console.log("peerLeave:" + leavedata);
    });

    this.room.once("close", (closeData: string) => {
      console.log("cloce" + closeData);
    });

    this.room.on("data", (roomData: RoomData) => {
      const fnc = this.callMap.get(roomData.data.key);
      if (fnc) {
        fnc(roomData);
      }
    });
  }
  public static addEveryCall(key: string, fnc: (roomData: RoomData) => void) {
    this.callMap.set(key, fnc);
  }
}
