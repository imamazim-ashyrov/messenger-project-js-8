import styled from "styled-components";
import MessagesList from "./MessagesList";
import SendMessage from "./SendMessage";
import Header from "./Header";

const Chat = () => {

  return (
    <ChatContainer>
      <Header />
      <MessagesList />
      <SendMessage />
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


