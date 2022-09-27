import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RoomData } from "skyway-js";
import roomSlice from "src/modules/slice/roomSlice";
import userSlice from "src/modules/slice/userSlice";
import { SkyWaySercive } from "src/service/SkyWayService";
import type { User } from "src/type";

import styles from "./myusercontents.module.scss";

export const MyUserComponents: React.FC = () => {
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch();

  const user: User = useSelector((state: any) => {
    return state.user;
  });

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  useEffect(() => {
    // TODOusers更新メソッド追加
    SkyWaySercive.addEveryCall("chat", (roomData: RoomData) => {
      dispatch(roomSlice.actions.updateObject(roomData.data.param));
    });
  }, [dispatch]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    dispatch(userSlice.actions.setName(event.target.value));
  };

  return (
    <div className={styles.myuser}>
      <h2>{user.src}</h2>
      <h2>名前：{user.name}</h2>
      <label htmlFor="name">名前</label>
      <input type="text" value={name} onChange={handleChangeName} id="name" />
    </div>
  );
};
