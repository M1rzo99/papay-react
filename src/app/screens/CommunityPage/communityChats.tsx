import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import { verifyMemberData } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import Definer from "../../../lib/Definer";
import { RippleBadge } from "../../MaterialTheme/styled";

const NewMessage = (data: any) => {
  console.log("for check:::", data.new_message);

  if (data.new_message.mb_id == verifyMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        sx={{ m: "10px 0px" }}
      >
        <div className={"msg_right"}> {data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        sx={{ m: "10px 0px" }}
      >
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className={"msg_left"}>{data.new_message.msg}</div>
      </Box>
    );
  }
};

export function CommunityChats() {
  /* INITILIAZITIONS */
  const [messegeList, setMessegeList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.connect();
    socket?.on("connect", function () {
      console.log("CLIENT:connect");
    });

    socket?.on("newMsg", (new_message: ChatMessage) => {
      messegeList.push(
        //@ts-ignore
        <NewMessage new_message={new_message} key={messegeList.length} />
      );
      setMessegeList([...messegeList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("CLIENT:  greetMsg");
      messegeList.push(
        //@ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifyMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessegeList([...messegeList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT: info message");

      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /* HANDLERS */

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const getInputMsghandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const onClickHandler = () => {
    try {
      if (!verifyMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", true);
        return false;
      }
      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);

      const mb_image_url =
        verifyMemberData?.mb_image ?? "/auth/default_user.svg";

      socket.emit("createMsg", {
        msg: message,
        mb_id: verifyMemberData?._id,
        mb_nick: verifyMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
      // clean input
      //sent message to socket
    } catch (err: any) {
      console.log("onClickHandler, Error", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className={"chat_frame"}>
      <Box className={"chat_top"} display={"flex"}>
        {" "}
        <div style={{ marginLeft: "120px" }}>Jonli Muloqot</div>
        <RippleBadge
          style={{ margin: "-30px 0 0 20px", marginLeft: "20px" }}
          badgeContent={onlineUsers}
        />
      </Box>
      <Box className={"chat_content"}>
        <Stack className={"chat_main"}>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <div className={"msg_left"}>Bu Yerda Jonli Muloqot bo'ladi</div>
          </Box>
          {messegeList}
        </Stack>
      </Box>
      <Box className={"chat_bott"}>
        <input
          ref={textInput}
          type={"text"}
          name={"message"}
          className={"msg_input"}
          placeholder={"Xabar jo'natish"}
          onChange={getInputMsghandler}
          onKeyDown={getKeyHandler}
        />
        <button className={"send_msg_btn"} onClick={onClickHandler}>
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
}
