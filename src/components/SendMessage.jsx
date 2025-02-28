import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { Button, TextField } from "@mui/material";
import sendAudio from "../assets/audios/sendAudio.mp3"
import { userName } from "./MessagesList";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send"

const getCurrentTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const SendMessage = () => {

  const messagesData = useSelector((state) => state.messenger.messages);

  const [changeMessage, setChangeMessage] = useState("");
  const sendMessageHandler = async () => {
    new Audio(sendAudio).play();
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

  return (
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
  );
};

export default SendMessage;

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
