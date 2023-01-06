import { createSlice } from "@reduxjs/toolkit";
import { SkyWaySercive } from "src/service/SkyWayService";
import type { MyRoomData, PeerData, User } from "src/type";

export type ObjectUpdateParam = {
  paramName: string;
  param: any;
};

const sendObject = (data: ObjectUpdateParam) => {
  const peerData: PeerData = {
    key: data.paramName,
    param: data,
  };
  if (SkyWaySercive.room) {
    SkyWaySercive.room.send(peerData);
  }
};

const sendUser = (data: User) => {
  const peerData: PeerData = {
    key: "users",
    param: data,
  };
  if (SkyWaySercive.room) {
    SkyWaySercive.room.send(peerData);
  }
};

const initialRoomData: MyRoomData = {
  users: {},
  object: {},
};

const roomSlice = createSlice({
  name: "room",
  initialState: initialRoomData,

  reducers: {
    initalObject: (state: any, action) => {
      const objectUpdateParam: ObjectUpdateParam = action.payload;
      if (!state.object[objectUpdateParam.paramName]) {
        state.object = {
          ...state.object,
          [objectUpdateParam.paramName]: objectUpdateParam.param,
        };
      }
    },
    updateObject: (state: any, action) => {
      const objectUpdateParam: ObjectUpdateParam = action.payload;
      if (state.object[objectUpdateParam.paramName]) {
        state.object[objectUpdateParam.paramName] = objectUpdateParam.param;
      } else {
        state.object = {
          ...state.object,
          [objectUpdateParam.paramName]: objectUpdateParam.param,
        };
      }
    },
    everyObjectUpdate: (state: any, action) => {
      const objectUpdateParam: ObjectUpdateParam = action.payload;
      if (state.object[objectUpdateParam.paramName]) {
        state.object[objectUpdateParam.paramName] = objectUpdateParam.param;
      } else {
        state.object = {
          ...state.object,
          [objectUpdateParam.paramName]: objectUpdateParam.param,
        };
      }

      //全体更新
      sendObject(objectUpdateParam);
    },
    updateUser: (state: any, action) => {
      state.users = { ...state.users, [action.payload.src]: action.payload };
    },

    everyUsersUpdate: (state: any, action) => {
      state.users = { ...state.users, [action.payload.src]: action.payload };
      //全体更新
      sendUser(state.users);
    },

    // srcをセットする
    deleteUser: (state: any, action) => {
      const newUsers = { ...state.users };
      delete newUsers[action.payload];
      state.users = newUsers;
    },
    initRoom: (state: any, action) => {
      state = action.payload;
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default roomSlice;
