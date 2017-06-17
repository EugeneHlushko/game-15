/**
*
* Header
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const StyledHeader = styled.div`
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #333;
  
  a {
    color: #333;
    text-decoration: none;
    margin-right: 10px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <FormattedMessage {...messages.home} />
      </Link>
      <Link to="/game-15-multiplayer">
        <FormattedMessage {...messages.gameMulti} />
      </Link>
      <Link to="/game-15-single">
        <FormattedMessage {...messages.gameSolo} />
      </Link>
    </StyledHeader>
  );
}

Header.propTypes = {

};

export default Header;
