import ChatWindow from "../components/ChatWindow";
import ConversationList from "../components/ConversationList";
import { useChat } from "../context/ChatContext";

export default function ChatPage () {
  const { currentConversationId, setCurrentConversationId, chatRef, handleScroll } = useChat();
  return (
    <div className="chat-layout">
      <div className="conversation-pane">
        <ConversationList onSelect={setCurrentConversationId} />
      </div>

      <div className="chat-pane">
        <ChatWindow conversationId={currentConversationId} ref={chatRef} onScroll={handleScroll}/>
      </div>
    </div>
  );
}