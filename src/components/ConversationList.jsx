import { useEffect, useState } from "react";

export default function ConversationList({ onSelect }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/conversations", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setConversations);
  }, []);

  return (
    <div>
      <h3 style={{ padding: "10px" }}>Conversations</h3>

      {conversations.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          style={{
            padding: "10px",
            borderBottom: "1px solid #eee",
            cursor: "pointer"
          }}
        >
          Conversation #{c.id}
        </div>
      ))}
    </div>
  );
}