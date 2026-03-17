import { useEffect, useState } from "react";
import { socket } from "../services/socket";


export default function TestChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // join room
    socket.emit("join_conversation", 1);

    // nhận message
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      conversationId: 1,
      content: message,
    });

    setMessage("");
  };

  return (
    <div>
      <h2>Chat Test</h2>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}