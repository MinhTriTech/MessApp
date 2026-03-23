import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import { useChat } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

function RoughMessageBubble({ message, isMe, isSeen }) {
  const bubbleRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawBubble = () => {
      const bubbleElement = bubbleRef.current;
      const canvasElement = canvasRef.current;

      if (!bubbleElement || !canvasElement) {
        return;
      }

      const rect = bubbleElement.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = window.devicePixelRatio || 1;

      canvasElement.width = width * dpr;
      canvasElement.height = height * dpr;
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      const context = canvasElement.getContext("2d");
      if (!context) {
        return;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const roughCanvas = rough.canvas(canvasElement);
      const fillColor = isMe ? "#dcebff" : "#f3e3ff";
      const stripeColor = isMe ? "#4f7faa" : "#8f6db3";

      roughCanvas.rectangle(1, 1, width - 2, height - 2, {
        seed: Number(message.id) || undefined,
        stroke: "#111",
        strokeWidth: 1.6,
        roughness: 1.3,
        bowing: 1.2,
        fill: fillColor,
        fillStyle: "hachure",
        hachureAngle: isMe ? -35 : 35,
        hachureGap: 5,
        fillWeight: 1.5,
        strokeLineDash: [1, 0],
        fillLineDash: [3, 2],
        fillLineDashOffset: 2,
        fillShapeRoughnessGain: 1,
        fillStroke: stripeColor,
      });
    };

    drawBubble();

    let resizeObserver;
    if (window.ResizeObserver && bubbleRef.current) {
      resizeObserver = new ResizeObserver(() => {
        drawBubble();
      });
      resizeObserver.observe(bubbleRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isMe, message.content, message.id]);

  return (
    <div className={`message-row ${isMe ? "me" : ""}`} ref={bubbleRef}>
      <canvas className="message-bubble-canvas" ref={canvasRef} />
      <div className="message-bubble-content">
        <div className="message-meta">
          {isSeen ? "✓✓ Seen • " : ""}
          <b>{message.sender_id}</b>
        </div>
        <div className="message-content">{message.content}</div>
      </div>
    </div>
  );
}

const ChatWindow = forwardRef(function ChatWindow({ conversationId, onScroll }, messageListRef) {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const { messages, typingUsers, sendMessage, emitTyping, emitStopTyping, emitSeenMessage } = useChat();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    emitSeenMessage();
  }, [conversationId, messages]);

  const handleTyping = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!value.trim()) {
      if (isTypingRef.current) {
        emitStopTyping();
        isTypingRef.current = false;
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      return;
    }

    if (!isTypingRef.current) {
      emitTyping();
      isTypingRef.current = true;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping();
      isTypingRef.current = false;
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (isTypingRef.current) {
      emitStopTyping();
      isTypingRef.current = false;
    }

    setInput("");
  };

  const isSeen = (msg) => {
    return msg.sender_id === user?.id && msg.seenBy && msg.seenBy.length > 0;
  };

  if (!conversationId) {
    return <div className="chat-empty">Chọn cuộc hội thoại</div>;
  }

  return (
    <div className="chat-window">

      {typingUsers.length > 0 && (
        <div className="typing-indicator">Ai đó đang soạn tin nhắn...</div>
      )}
      
      <div
        ref={messageListRef}
        onScroll={onScroll}
        className="message-list"
      >
        {messages.map((m) => (
          <RoughMessageBubble
            key={m.id}
            message={m}
            isMe={m.sender_id === user?.id}
            isSeen={isSeen(m)}
          />
        ))}
      </div>

      <div className="message-input-row">
        <input
          value={input}
          onChange={handleTyping}
          className="text-input"
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSend} className="btn">
          Send
        </button>
      </div>

    </div>
  );
});

export default ChatWindow;