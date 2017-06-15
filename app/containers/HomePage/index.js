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
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';


const styles = {
  Header: {
    fontSize: '18px',
    color: '#607d8b',
    margin: '0',
    padding: '15px',
  },
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1 style={styles.Header}></h1>
        <Link to="/play-single-player"><FormattedMessage {...messages.playSolo} /></Link>
      </div>
    );
  }
}
