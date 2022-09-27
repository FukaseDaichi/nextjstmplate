import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Peer from "skyway-js";
import { ChatComponents } from "src/components/contents/chat/chatcontents";
import { MyUserComponents } from "src/components/contents/myuser/myusercontents";
import { UsersComponents } from "src/components/contents/users/userscontents";
import { Layout } from "src/components/layout/layout";
import roomSlice from "src/modules/slice/roomSlice";
import userSlice from "src/modules/slice/userSlice";
import { SkyWaySercive } from "src/service/SkyWayService";
import type { User } from "src/type";

const peer: Peer = new Peer({
  key: process.env.NEXT_PUBLIC_SKYWAY_API_KEY as string,
});

const SkyWaySample: NextPage = () => {
  const dispatch = useDispatch();

  const [inputId, setInputId] = useState<string>("");

  useEffect(() => {
    peer.on("open", () => {
      new SkyWaySercive(peer);
      dispatch(userSlice.actions.setSrc(peer.id));
    });
  }, [dispatch]);

  const handleConnect = useCallback(() => {
    SkyWaySercive.roomIn(inputId);

    // 入室順の取得、設定
    SkyWaySercive.room.once("open", () => {
      const no: number = Object.keys(SkyWaySercive.room.connections).length;
      // eslint-disable-next-line no-console
      console.log(SkyWaySercive.room.connections);
      dispatch(userSlice.actions.setNo(no));
    });

    SkyWaySercive.room.on("peerJoin", (src: string) => {
      const user: User = {
        no: Object.keys(SkyWaySercive.room.connections).length,
        name: "",
        src: src,
      };
      dispatch(roomSlice.actions.updateUser(user));
    });
  }, [inputId, dispatch]);

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  return (
    <Layout>
      <NextSeo
        title="さんぷる"
        description="ページの説明"
        openGraph={{
          url: "ページのURL",
          title: "ページのタイトル",
          description: "ページの説明",
        }}
      />
      <div>
        <div>
          <input type="text" value={inputId} onChange={handleChangeId} />
          <button onClick={handleConnect}>接続</button>
        </div>
      </div>
      <MyUserComponents />
      <ChatComponents />
      <UsersComponents />
    </Layout>
  );
};

export default SkyWaySample;
