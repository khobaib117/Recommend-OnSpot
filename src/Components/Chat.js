import React, { useEffect, useState } from "react";
// import "./styles.css";
import ChatBox, { ChatFrame } from "react-chat-plugin";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      text: "user2 has joined the conversation",
      timestamp: 1578366389250,
      type: "notification",
    },
    {
      author: {
        username: "user1",
        id: 1,
        avatarUrl: "https://image.flaticon.com/icons/svg/2446/2446032.svg",
      },
      text: "Hi",
      type: "text",
      timestamp: 1578366393250,
    },
    {
      author: { username: "user2", id: 2, avatarUrl: null },
      text: "Show two buttons",
      type: "text",
      timestamp: 1578366425250,
      buttons: [
        {
          type: "URL",
          title: "Yahoo",
          payload: "http://www.yahoo.com",
        },
        {
          type: "URL",
          title: "Example",
          payload: "http://www.example.com",
        },
      ],
    },
    {
      author: {
        username: "user1",
        id: 1,
        avatarUrl: "https://image.flaticon.com/icons/svg/2446/2446032.svg",
      },
      text: "What's up?",
      type: "text",
      timestamp: 1578366425250,
      hasError: true,
    },
  ]);

  const handleOnSendMessage = (message) => {
    setMessages(
      messages.concat({
        author: {
          username: "user1",
          id: 1,
          avatarUrl: "https://image.flaticon.com/icons/svg/2446/2446032.svg",
        },
        text: message,
        timestamp: +new Date(),
        type: "text",
      })
    );
  };

  return (
    <div
      className="App"
      style={{ width: "100vw", display: "flex", justifyContent: "center" }}
    >
      <ChatBox
        messages={messages}
        userId={1}
        onSendMessage={handleOnSendMessage}
        width={"600px"}
        height={"500px"}
      />
    </div>
  );
}
