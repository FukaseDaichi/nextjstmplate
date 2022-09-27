import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RoomData } from "skyway-js";
import type { ObjectUpdateParam } from "src/modules/slice/roomSlice";
import roomSlice from "src/modules/slice/roomSlice";
import { SkyWaySercive } from "src/service/SkyWayService";
import type { User } from "src/type";
import type { Chat, Message } from "src/type/roomComponent";

import styles from "./chatcontents.module.scss";

const defoltChat: Chat = {
  messages: [],
};

export const ChatComponents: React.FC = () => {
  const dispatch = useDispatch();

  // state の取得
  const chat: Chat = useSelector((state: any) => {
    return state.room.object.chat;
  });

  const user: User = useSelector((state: any) => {
    return state.user;
  });

  const [inputMsg, setInputMsg] = useState<string>("");

  const handleChangeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(event.target.value);
  };

  useEffect(() => {
    //初期化
    const updateObjectparam: ObjectUpdateParam = {
      paramName: "chat",
      param: defoltChat,
    };

    dispatch(roomSlice.actions.initalObject(updateObjectparam));

    // chat更新メソッド追加
    SkyWaySercive.addEveryCall("chat", (roomData: RoomData) => {
      dispatch(roomSlice.actions.updateObject(roomData.data.param));
    });
  }, [dispatch]);

  const handleChatSend = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(SkyWaySercive.room.connections);
    const message: Message = {
      src: user.src,
      content: inputMsg,
      timestamp: Date.now(),
    };

    const messages: Array<Message> = [...chat.messages, message];

    const updateObjectparam: ObjectUpdateParam = {
      paramName: "chat",
      param: {
        messages: messages,
      },
    };
    dispatch(roomSlice.actions.everyObjectUpdate(updateObjectparam));
  }, [inputMsg, dispatch, user, chat]);

  return (
    <div className={styles.chat}>
      <h1>Chat</h1>
      <h2>{user.name}</h2>
      <div>
        <input type="text" value={inputMsg} onChange={handleChangeMsg} />
        <button onClick={handleChatSend}>メッセージ送付</button>
      </div>
      <div>
        {chat?.messages.map((message: Message, index: number) => {
          return <p key={index}>{message.content}</p>;
        })}
      </div>
    </div>
  );
};
