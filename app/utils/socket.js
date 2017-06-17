import io from 'socket.io-client';

// export const socket = io.connect('http://localhost:6882');
export const socket = io.connect(`${window.location.protocol}//${window.location.hostname}:6882`);
