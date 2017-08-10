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
  border-bottom: 1px solid #333;
  font-size: 0;
  
  a {
    color: #333;
    text-decoration: none;
    padding: 5px 10px;
    display: inline-block;
    font-size: 14px;
    cursor: pointer
    
    &:hover {
      background: #03a9f4;
      color: #fff;
    }
    
    &.active {
      background: #03a9f4;
      color: #fff;
      
      &:hover {
        background: #0a6892;
      }
    }
  }
`;

const links = [
  {
    msg: messages.home,
    url: '/',
  },
  {
    msg: messages.gameMulti,
    url: '/game-15-multiplayer',
  },
  {
    msg: messages.gameSolo,
    url: '/game-15-single',
  },
];


function Header() {
  return (
    <StyledHeader>
      {
        links.map((item, index) =>
          <Link key={index} to={item.url} className={item.url === document.location.pathname ? 'active' : ''}>
            <FormattedMessage {...item.msg} />
          </Link>
        )
      }
    </StyledHeader>
  );
}

Header.propTypes = {

};

export default Header;
