import { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ConversationList({ onSelect }) {
  const { conversations } = useChat();

  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div className="conversation-list">
      <h3 className="conversation-heading">Conversations</h3>

      {conversations.map((conv) => (
        <div
          key={conv.conversation_id}
          onClick={() => handleClick(conv.conversation_id)}
          className={`conversation-item ${selectedId === conv.conversation_id ? "active" : ""}`}
        >
          <div className="conversation-name">{conv.target_name}</div>
          <div className="conversation-message">
            {conv.last_message}
          </div>
        </div>
      ))}
    </div>
  );
}