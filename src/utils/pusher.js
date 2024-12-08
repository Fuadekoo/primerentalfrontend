import Pusher from 'pusher-js';

const pusher = new Pusher('ffc1213c9bb622bea8b8', {
  cluster: 'ap2',
    encrypted: true,
});

export const subscribeToChannel = (userId) => {
    return pusher.subscribe(`chat.${userId}`);
  };

export default pusher;
