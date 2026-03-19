import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ConversationList from "../components/ConversationList";

export default function ChatPage () {
  const [currentConversation, setCurrentConversation] = useState(null);
    return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
        <ConversationList onSelect={setCurrentConversation} />
      </div>

      <div style={{ width: "70%" }}>
        <ChatWindow conversationId={currentConversation} />
      </div>

    </div>
  );
}