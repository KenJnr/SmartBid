import PubNub from 'pubnub';
import Constants from "expo-constants";

const pubnub = new PubNub({
  publishKey: Constants.expoConfig?.extra?.PUBNUB_PUBLISH_KEY as string,
  subscribeKey: Constants.expoConfig?.extra?.PUBNUB_SUBSCRIBE_KEY as string,
  uuid: Constants.expoConfig?.extra?.PUBNUB_UUID as string, // Use user's ID dynamically
});

export default pubnub;
