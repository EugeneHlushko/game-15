/*
 *
 * Game
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import GameSolo from 'components/GameSolo';

import makeSelectGame from './selectors';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Game"
          meta={[
            { name: 'description', content: 'Description of Game' },
          ]}
        />
        <GameSolo />
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Game: makeSelectGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
