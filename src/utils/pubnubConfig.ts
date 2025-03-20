import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: "pub-c-79b10296-7f38-4001-8f82-5e2fff66b5db",
  subscribeKey: "sub-c-243b0bbf-5ece-4fca-8003-fb01b52a2ab1",
  uuid: "unique-user-id", // Use user's ID dynamically
});

export default pubnub;
