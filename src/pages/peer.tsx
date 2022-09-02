/* eslint-disable no-console */
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback, useEffect, useState } from "react";
import type { MeshRoom } from "skyway-js";
import Peer from "skyway-js";
import { Layout } from "src/components/layout/layout";

const peer: Peer = new Peer({
  key: process.env.NEXT_PUBLIC_SKYWAY_API_KEY as string,
});

const SkyWaySample: NextPage = () => {
  const [peerId, setPeerId] = useState<string>("");
  const [room, setRoom] = useState<MeshRoom>();

  const [messages, setMessages] = useState<string[]>([]);

  const [inputId, setInputId] = useState<string>("");
  const [inputMsg, setInputMsg] = useState<string>("");

  useEffect(() => {
    peer.on("open", () => {
      setPeerId(peer.id);
    });

    // エラー時のコンソール
    peer.on("error", console.error);
  }, []);

  useEffect(() => {
    if (room) {
      room.once("open", () => {
        console.log("オープン");
      });

      room.on("peerJoin", (joindata: string) => {
        console.log("ジョイン:" + joindata);
      });

      room.on("stream", async (stream) => {
        console.log("stream");
        console.log(stream);
      });

      room.on("peerLeave", (leavedata: string) => {
        console.log("peerLeave:" + leavedata);
      });

      room.once("close", (closeData: string) => {
        console.log("cloce" + closeData);
      });
    }
  }, [room]);

  useEffect(() => {
    if (room) {
      room.on("data", ({ data, src }) => {
        console.log(src);
        setMessages([...messages, data]);
      });
    }
  }, [room, messages]);

  const handleConnect = useCallback(() => {
    console.log(inputId + "で接続");
    setRoom(peer.joinRoom(inputId, { mode: "mesh" }));
  }, [inputId]);

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  const handleChangeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMsg(event.target.value);
  };

  const handleSend = useCallback(() => {
    setMessages([...messages, inputMsg]);
    room?.send(inputMsg);
  }, [room, inputMsg, messages]);

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
      <h2>my:{peerId}</h2>
      <div>
        <div>
          <input type="text" value={inputId} onChange={handleChangeId} />
          <button onClick={handleConnect}>接続</button>
        </div>
        <div>
          <input type="text" value={inputMsg} onChange={handleChangeMsg} />
          <button onClick={handleSend}>メッセージ送付</button>
        </div>
        <div>
          {messages.map((msg: string, index: number) => {
            return <p key={index}>{msg}</p>;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default SkyWaySample;
