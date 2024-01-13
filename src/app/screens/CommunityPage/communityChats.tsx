import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";

export function CommunityChats() {
  /* INITILIAZITIONS */
  const [messegeList, setMessegeList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    socket.connect();
    socket?.on("connect", function () {
      console.log("CLIENT:connect");
    });

    socket?.on("newMsg", (new_message: any) => {
      console.log("CLIENT:  new message");
      alert(new_message);
    });

    socket?.on("greetMsg", (new_message: any) => {
      console.log("CLIENT:  greetMsg");
    });

    socket?.on("infoMsg", (msg: any) => {
      console.log("CLIENT: info message");

      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Stack className={"chat_frame"}>
      <Box className={"chat_top"}>Jonli Muloqot {onlineUsers} </Box>
      <Box className={"chat_content"}>
        <Stack className={"chat_main"}>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_left"}> AssalomAlaykum Barchaga!</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_right"}>Bu Yerda Jonli Muloqot bo'ladi</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <Avatar alt={"bdb"} src={"/community/cute_girl.jpeg"} />
            <div className={"msg_left"}>Bu Yerda Boshqalarning Habarlari</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_right"}>Hop</div>
          </Box>
        </Stack>
      </Box>
      <Box className={"chat_bott"}>
        <input
          type={"text"}
          name={"message"}
          className={"msg_input"}
          placeholder={"Xabar jo'natish"}
        />
        <button className={"send_msg_btn"}>
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
}
