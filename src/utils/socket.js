import { io } from 'socket.io-client';

const socket = io('https://core.instantexpert.online/');

export default socket;