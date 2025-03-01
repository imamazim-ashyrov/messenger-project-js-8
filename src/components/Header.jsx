import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import MyImage from "../assets/images/free-icon-telephone-6878353.png"
import MyImage2 from "../assets/images/109164.png"

const Header = () => {
  return (
    <HeaderContainer>
      <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDawSS7BcQ6VR-yVj_d4XHBzuekrzHf9KLlg&s" alt="IT-DOOR" />
      <HeaderTitle>WhatsApp Messenger Clone</HeaderTitle>
      <HeaderDiv>
        <IImg src={MyImage} alt="звонок" />
        <IImg src={MyImage2} alt="поиск" />
        <HeaderMenu/>
      </HeaderDiv>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  background-color: #075e54;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center; 
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  margin: 0;
  margin-right:1000px;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-right: auto;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
`;

const IImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  margin-left: 10px;
`