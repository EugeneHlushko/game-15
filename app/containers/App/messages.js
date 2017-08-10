/*
 * Chat Messages
 *
 * This contains all the text for the Chat component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  nameSet: {
    id: 'app.containers.App.nameSet',
    defaultMessage: 'Set name',
  },
  nameTitle: {
    id: 'app.containers.App.nameTitle',
    defaultMessage: 'Please name yourself before proceeding.',
  },
  nameDescription: {
    id: 'app.containers.App.nameDescription',
    defaultMessage: 'The name will be used in chat, game, and highscores table if you succeed :)',
  },
});
