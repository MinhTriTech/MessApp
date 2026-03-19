import { useEffect, useState } from "react";
import { createSocket } from "../services/socket";

export default function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");
  const socket = createSocket(token);

  // Load messages
  useEffect(() => {
    if (!conversationId) return;

    fetch(`http://localhost:8000/messages/${conversationId}`)
      .then(res => res.json())
      .then(setMessages);

    socket.emit("join_conversation", conversationId);

    return () => {
      setMessages([]); // clear khi đổi room
    };
  }, [conversationId]);

  // Receive realtime
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      conversation_id: conversationId,
      content: input
    });

    setInput("");
  };

  if (!conversationId) {
    return <div style={{ padding: "20px" }}>Chọn cuộc hội thoại</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* Message list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: "10px" }}>
            <b>{m.sender_id}:</b> {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={handleSend} style={{ marginLeft: "10px" }}>
          Send
        </button>
      </div>

    </div>
  );
}