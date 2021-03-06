/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import debug from 'debug';

import LocalStorageHelper from 'utils/localStorageHelper';
import { socket } from 'utils/socket';
import { SOCKET_NAME_SET } from 'shared/constants';
import Overlay from 'components/Overlay';
import OverlayBox from 'components/OverlayBox';
import Input from 'components/Input';
import Button from 'components/Button';
import Header from 'components/Header';

import { makeSelectAppPlayerName } from './selectors';
import { nameSet } from './actions';
import messages from './messages';
import Chat from '../Chat';
import { PLAYER_NAME_KEY_IN_LOCALSTORAGE } from './constants';

const Heading = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  margin: 10px 0;
  border-top: 1px solid #dedede;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    debug.enable('App');
    this.state = {};

    if (!this.props.playerName) {
      this.state.playerNameSaved = false;
    }
  }

  inputChanged = (string) => {
    this.props.onChangeName(string);
  };

  saveName = () => {
    const { playerName } = this.props;
    debug('App')('Sending name!', playerName);
    socket.emit(SOCKET_NAME_SET, playerName);
    this.setState({ playerNameSaved: true });
    LocalStorageHelper.setStorageItem(PLAYER_NAME_KEY_IN_LOCALSTORAGE, playerName);
  };

  render() {
    const { playerNameSaved } = this.state;
    const { playerName } = this.props;

    return (
      <div>
        <Header />
        {
          playerNameSaved ?
            <div>
              {React.Children.toArray(this.props.children)}
              <Chat />
            </div> :
            <Overlay>
              <OverlayBox>
                <Heading>
                  <FormattedMessage {...messages.nameTitle} />
                </Heading>
                <FormattedMessage {...messages.nameDescription} />
                <InputWrapper>
                  <Input submitCallback={this.saveName} changeCallback={this.inputChanged} value={playerName || ''} />
                  <Button
                    style={{
                      margin: '0 0 0 15px',
                    }}
                    text={messages.nameSet}
                    clickCallback={this.saveName}
                    disabled={playerName && playerName.length > 0}
                  />
                </InputWrapper>
              </OverlayBox>
            </Overlay>
        }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  onChangeName: PropTypes.func.isRequired,
  playerName: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  playerName: makeSelectAppPlayerName(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeName: (name) => {
      dispatch(nameSet(name));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
