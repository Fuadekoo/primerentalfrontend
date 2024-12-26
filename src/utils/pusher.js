import Pusher from 'pusher-js';

const pusher = new Pusher('af0bfeece7846ee91ec9', {
  cluster: 'ap2',
    encrypted: true,
});

export const subscribeToChannel = (userId) => {
    return pusher.subscribe(`chat.${userId}`);
  };

export default pusher;
