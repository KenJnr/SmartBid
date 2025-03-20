import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import pubnub from "@/src/utils/pubnubConfig";

export default function PubNubTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const testChannel = "test-bidding-channel";

  useEffect(() => {
    // Subscribe to a test channel
    pubnub.subscribe({ channels: [testChannel] });

    // Listen for messages
    const listener = {
      message: (event: any) => {
        setMessages((prevMessages) => [...prevMessages, event.message]);
      },
    };

    pubnub.addListener(listener);

    return () => {
      pubnub.unsubscribeAll();
      pubnub.removeListener(listener);
    };
  }, []);

  const sendMessage = () => {
    pubnub.publish({
      channel: testChannel,
      message: `New bid placed at ${new Date().toLocaleTimeString()}`,
    });
  };

  return (
    <View>
      <Button title="Send Test Message" onPress={sendMessage} />
      {messages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
    </View>
  );
}
