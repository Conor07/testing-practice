import React, { useState } from "react";
import { Chat } from "../pages/ChatPage";

type OpenChatProps = {
  chat: Chat | null;
  onChatClose: () => void;
  onSendMessage: (chatId: number, message: string) => void;
};

const OpenChat: React.FC<OpenChatProps> = ({
  chat,
  onChatClose,
  onSendMessage,
}) => {
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (chat && input.trim()) {
      onSendMessage(chat.id, input.trim());
      setInput("");
    }
  };

  if (!chat) {
    return (
      <div className="OpenChat">
        <p className="NoChatSelected">No chat selected</p>
      </div>
    );
  }

  return (
    <div className="OpenChat">
      <button className="CloseButton" onClick={onChatClose}>
        ×
      </button>
      <h3 className="NameTitle">{chat.name}</h3>
      <ul className="Messages">
        {chat.messages.length === 0 ? (
          <li className="NoMessages">No messages</li>
        ) : (
          chat.messages
            .sort((a, b) => {
              const aTime = a.timestamp
                ? new Date(a.timestamp).getTime()
                : null;
              const bTime = b.timestamp
                ? new Date(b.timestamp).getTime()
                : null;

              if (aTime === null && bTime === null) return 0; // both missing, keep order
              if (aTime === null) return 1; // a missing, put a after b
              if (bTime === null) return -1; // b missing, put b after a
              return aTime - bTime; // both exist, sort by time
            })
            .map((msg) => (
              <li key={msg.id} className="Message">
                <span className="Name">{msg.senderId}</span>
                <span className="Text">{msg.content}</span>
                <span className="Timestamp">
                  {msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString()
                    : ""}
                </span>
              </li>
            ))
        )}
      </ul>
      <form
        onSubmit={handleSend}
        style={{ marginTop: "16px", display: "flex", gap: "8px" }}
      >
        <input
          className="OpenChatInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="OpenChatSendButton"
          type="submit"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default OpenChat;
