/*
 * GameOver Messages
 *
 * This contains all the text for the GameOver component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  winnerText: {
    id: 'app.components.GameOver.winnerText',
    defaultMessage: 'Congratulations! You have won the game against {name}.',
  },
  winnerTextSolo: {
    id: 'app.components.GameOver.winnerTextSolo',
    defaultMessage: 'Congratulations! You have won the game!!!',
  },
  loserText: {
    id: 'app.components.GameOver.loserText',
    defaultMessage: 'Game Over! You have lost the game against: {name}',
  },
  timing: {
    id: 'app.components.GameOver.timing',
    defaultMessage: 'Game time was: {time}',
  },
});
