import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.header`
  background: #dee2e6;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 9;
`;

const Inner = styled.div`
  width: 1100px;
  margin: 0 auto;
  position: relative;
`;

const Header = ({ children }) => {
  return (
    <HeaderBlock>
      <Inner>{children}</Inner>
    </HeaderBlock>
  );
};

export default Header;
