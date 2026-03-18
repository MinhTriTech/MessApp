import { useEffect } from "react";
import { useState } from "react";
import { fetchMessages } from "../services/messageService";
import { socket } from "../services/socket";

export default function Chat ({ conversationId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!conversationId) return;

        const loadMessages = async () => {
            const data = await fetchMessages(conversationId);
            setMessages(data);
        };

        loadMessages();
    }, [conversationId]);

    useEffect(() => {
    // nhận message
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [conversationId]);

    return (
        <div>
            {messages.map((msg) => (
                <div key={msg.id}>
                <b>{msg.sender_id}</b>: {msg.content}
                </div>
            ))}
        </div>
    );
}