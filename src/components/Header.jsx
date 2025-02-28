import styled from "styled-components";

const Header = () => {
  return (
    <Headerr>
      <HeaderTitle>WhatsApp Messenger Clone</HeaderTitle>
    </Headerr>
  );
};

export default Header;

const Headerr = styled.div`
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
