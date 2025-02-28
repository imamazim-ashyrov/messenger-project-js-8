import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MessageMenu from "./MessageMenu";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { saveMessages } from "../store/slices/messengerSlice";

export const userName = "Imamazim";

const MessagesList = () => {
  const dispatch = useDispatch();
  const messagesData = useSelector((state) => state.messenger.messages);
  const [isLoading, setIsLoading] = useState(false);

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
    <MessagesContainer>
      {sortedMessages.map((message) => (
        <MessageRow key={message.id} is_own={message.userName === userName}>
          <MessageBubble is_own={message.userName === userName}>
            <MessageMenu onClick={() => deleteMessageHandler(message.id)} />
            <MessageUser>{message.userName}</MessageUser>
            <MessageText>{message.message}</MessageText>
            <MessageTime>{message.time}</MessageTime>
          </MessageBubble>
        </MessageRow>
      ))}
    </MessagesContainer>
  );
};

export default MessagesList;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-image: url("https://example.com/chat-bg.png"); /* Замените на нужное изображение */
  background-size: cover;
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.is_own ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.is_own ? "#dcf8c6" : "white")};
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

const Loading = styled.h2`
  text-align: center;
  margin-top: 50px;
`;
