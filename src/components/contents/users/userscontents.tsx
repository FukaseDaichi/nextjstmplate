import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RoomData } from "skyway-js";
import roomSlice from "src/modules/slice/roomSlice";
import { SkyWaySercive } from "src/service/SkyWayService";
import type { MyRoomData } from "src/type";

import styles from "./userscontents.module.scss";

export const UsersComponents: React.FC = () => {
  const dispatch = useDispatch();

  const room: MyRoomData = useSelector((state: any) => {
    return state.room;
  });

  useEffect(() => {
    SkyWaySercive.addEveryCall("init", (roomData: RoomData) => {
      dispatch(roomSlice.actions.initRoom(roomData.data.param));
    });
  }, [dispatch]);

  return (
    <div className={styles.users}>
      <div>
        {room.users &&
          Object.keys(room.users).map((key) => {
            return <p key={key}>{room.users?.[key].name}</p>;
          })}
      </div>
    </div>
  );
};
