import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { saveMessages } from "../store/slices/messengerSlice";
import sendAudio from "../assets/audios/sendAudio.mp3";
import MessageMenu from "./MessageMenu";

const audio = new Audio(sendAudio);

const getCurrentTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const Chat = () => {
  const userName = "Imamazim";
  const dispatch = useDispatch();
  const messagesData = useSelector((state) => state.messenger.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [changeMessage, setChangeMessage] = useState("");

  const sortedMessages = [...messagesData].sort((a, b) => {
    return a.index - b.index;
  });

  console.log(sortedMessages);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "messenger"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messengerData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(saveMessages(messengerData));
        setIsLoading(false);
      },
      (error) => {
        console.error("Ошибка запроса:", error);
        alert("Возникла ошибка при загрузке данных!");
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [dispatch]);

  const sendMessageHandler = async () => {
    audio.play();
    const message = {
      userName: userName,
      message: changeMessage,
      dateOfMessage: getCurrentTime(),
      index: messagesData.length + 1,
    };
    try {
      await addDoc(collection(db, "messenger"), message);
      setChangeMessage("");
    } catch (error) {
      window.alert("Возникла ошибка при отправлении сообщения!");
    }
  };

  const deleteMessageHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "messenger", id));
    } catch (error) {
      window.alert("Ошибка при удалении сообщении");
    }
  };

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <ChatContainer>
      <Header>
        <HeaderTitle>WhatsApp Messenger Clone</HeaderTitle>
      </Header>
      <MessagesContainer>
        {sortedMessages.map((message) => (
          <MessageRow key={message.id} isOwn={message.userName === userName}>
            <MessageBubble isOwn={message.userName === userName}>
              <MessageMenu onClick={() => deleteMessageHandler(message.id)} />
              <MessageUser>{message.userName}</MessageUser>
              <MessageText>{message.message}</MessageText>
              <MessageTime>{message.time}</MessageTime>
            </MessageBubble>
          </MessageRow>
        ))}
      </MessagesContainer>
      <InputContainer>
        <StyledTextField
          value={changeMessage}
          onChange={(e) => setChangeMessage(e.target.value)}
          label="Введите сообщение"
          variant="outlined"
          fullWidth
        />
        <StyledButton
          disabled={changeMessage.trim() === ""}
          onClick={sendMessageHandler}
          variant="contained"
        >
          <SendIcon />
        </StyledButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;

// Styled Components

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #e5ddd5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  background-color: #075e54;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-image: url("https://example.com/chat-bg.png"); /* Замените на нужное изображение */
  background-size: cover;
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isOwn ? "#dcf8c6" : "white")};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MessageUser = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #075e54;
`;

const MessageText = styled.p`
  margin: 0;
`;

const MessageTime = styled.span`
  font-size: 10px;
  position: absolute;
  bottom: 2px;
  right: 5px;
  color: gray;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  .MuiOutlinedInput-root {
    border-radius: 20px;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  border-radius: 50%;
  min-width: 0;
  padding: 10px;
  background-color: #075e54;
  &:hover {
    background-color: #0a7e66;
  }
`;

const Loading = styled.h2`
  text-align: center;
  margin-top: 50px;
`;
