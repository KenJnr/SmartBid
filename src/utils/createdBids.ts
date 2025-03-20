import pubnub from "../utils/pubnubConfig";

export const createBidEvent = (bidId: string, startingPrice: number) => {
  pubnub.publish({
    channel: bidId, // Each bid has its own channel
    message: { type: "NEW_BID", bidId, price: startingPrice },
  });
};
