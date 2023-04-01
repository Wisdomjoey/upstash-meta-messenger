import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const pusher = new Pusher({
  appId: "1570611",
  key: "18df0ebba9265171c336",
  secret: "a566982ed75085337b4d",
  cluster: "eu",
  useTLS: true
});
export const clientPusher = new ClientPusher('18df0ebba9265171c336', {
  cluster: 'eu',
  forceTLS: true
});