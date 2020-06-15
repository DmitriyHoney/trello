import React from 'react';
import styled from "styled-components";

let ContainerStyle = styled.div`
    background-color: rgba(0, 0, 0, .5);
    padding: 10px;
    color: #fff;
    text-align: center;
    position: fixed;
    z-index: 5;
    width: 100%;
`;

const Header = props => {
  return (
    <ContainerStyle>
      header
    </ContainerStyle>
  );
}

export default Header;
