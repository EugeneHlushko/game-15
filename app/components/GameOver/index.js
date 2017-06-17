/**
*
* GameOver
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const StyledGameOverWrapper = styled.div`
  padding-top: 10px;
  margin: auto;
  font-size: 14px;
  color: ${(props) => props.winner ? 'green' : 'red'};
  text-align: center;
`;

const StyledGameOverTime = styled.div`
  padding-top: 10px;
`;

function GameOver(props) {
  return (
    <StyledGameOverWrapper winner={props.winner}>
      {
        props.solo ?
          <FormattedMessage {...messages.winnerTextSolo} /> :
          props.winner ?
            <FormattedMessage {...messages.winnerText} values={{ name: props.opponentName }} /> :
            <FormattedMessage {...messages.loserText} values={{ name: props.opponentName }} />
      }
      <StyledGameOverTime>
        <FormattedMessage {...messages.timing} values={{ time: props.time }} />
      </StyledGameOverTime>
    </StyledGameOverWrapper>
  );
}

GameOver.propTypes = {
  winner: PropTypes.bool,
  solo: PropTypes.bool,
  opponentName: PropTypes.string,
  time: PropTypes.number.isRequired,
};

export default GameOver;
