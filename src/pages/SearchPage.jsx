import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConversationList from "../components/ConversationList";
import SearchResultPanel from "../components/chat/SearchResultPanel";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, setUser } = useAuth();
  const {
    globalSearchResults,
    setGlobalSearchResults,
    activeSearchUser,
    setActiveSearchUser,
    setCurrentConversationId,
    conversations,
  } = useChat();

  const searchQuery = searchParams.get("q") || "";

  const handleSelectConversation = (conversationId) => {
    setGlobalSearchResults([]);
    navigate(`/chat/${conversationId}`);
  };

  const handleSelectSearchUser = (selectedUser) => {
    // Check if conversation already exists
    const existingConversation = conversations.find(
      (conversation) => conversation.target_id === selectedUser.id,
    );

    if (existingConversation?.conversation_id) {
      setActiveSearchUser(null);
      setGlobalSearchResults([]);
      navigate(`/chat/${existingConversation.conversation_id}`);
      return;
    }

    // Set as active search user (draft mode) - don't create conversation yet
    // Conversation will be created when user sends first message
    setActiveSearchUser(selectedUser);
    setGlobalSearchResults([]);
    navigate("/chat");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const handleBackToChat = () => {
    setGlobalSearchResults([]);
    navigate("/chat");
  };

  return (
    <>
      <div className="chat-layout">
        <div className="conversation-pane">
          <ConversationList onSelect={handleSelectConversation} />
        </div>

        <div className="chat-pane">
          <div className="chat-container search-page-container">
            <div className="search-page-header">
              <div className="search-header-content">
                <h2>Kết quả tìm kiếm {searchQuery && `cho "${searchQuery}"`}</h2>
                <p className="search-header-info">Right-click hoặc chọn từ context menu để bắt đầu trò chuyện</p>
              </div>
              <Button
                className="search-back-btn"
                onClick={handleBackToChat}
              >
                ← Quay lại chat
              </Button>
            </div>

            <SearchResultPanel
              results={globalSearchResults}
              activeSearchUser={activeSearchUser}
              onSelectSearchUser={handleSelectSearchUser}
            />
          </div>
        </div>
      </div>

      <Button className="logout-btn" onClick={handleLogout}>
        Đăng xuất
      </Button>
    </>
  );
}
