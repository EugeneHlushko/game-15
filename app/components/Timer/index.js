/**
*
* Timer
*
*/

import React from 'react';
import styled from 'styled-components';

const StyledTimer = styled.div`
  border: 1px solid #333;
  padding: 4px 10px;
  text-align: center;
  width: 120px;
  margin: 15px auto;
`;


class Timer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    time: 0,
    timeout: null,
  };

  componentDidMount() {
    this.state.timeout = window.setInterval(this.increment, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  increment = () => {
    const { stop } = this.props;
    return stop ? false : this.setState({ time: this.state.time + 1 });
  };

  stop = () => {
    clearInterval(this.state.timeout);
    this.state.timeout = null;
  };

  render() {
    const { time } = this.state;

    return (
      <StyledTimer>
        { time }
      </StyledTimer>
    );
  }
}

Timer.propTypes = {
  stop: React.PropTypes.bool,
};

export default Timer;
