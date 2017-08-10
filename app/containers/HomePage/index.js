/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import messages from './messages';

const StyledH1 = styled.h1`
  font-size: 18px;
  color: #607d8b;
  margin: 150px 0;
  padding: 15px;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Homepage"
          meta={[
            { name: 'description', content: 'Description of HomePage' },
          ]}
        />
        <StyledH1><FormattedMessage {...messages.header} /></StyledH1>
      </div>
    );
  }
}
