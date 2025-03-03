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
        <MenuDiv>
        <HeaderMenu/>
        </MenuDiv>
      </HeaderDiv>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  background-color: #128f59;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%; 
`;

const HeaderTitle = styled.h1`
  font-size: 1.5vw;
  margin: 0;
  text-align: left;
  flex-grow: 1; 
`;

const Img = styled.img`
  width: 5vw; 
  height: 5vw; 
  border-radius: 50%;
  margin-right: 20px;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
`;

const IImg = styled.img`
  width: 2vw; 
  height: 2vw;
  border-radius: 50%;
  margin-left: 10px;
`;

const MenuDiv = styled.div`
  width: 5vw;
  height: 5vw; 
  min-width: 10px; 
  min-height: 10px;
  max-width: 15px; 
  max-height: 15px;
  margin-top: -25px;
`