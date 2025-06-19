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
  const [input, setInput] = useState<string>("");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chat && input.trim()) {
      onSendMessage(chat.id, input.trim());
      setInput("");
    }
  };

  if (!chat) {
    return (
      <div className="OpenChat" data-testid="open-chat">
        <p className="NoChatSelected">No chat selected</p>
      </div>
    );
  }

  return (
    <div className="OpenChat" data-testid="open-chat">
      <button
        className="CloseButton"
        data-testid="close-chat"
        onClick={onChatClose}
      >
        ×
      </button>
      <h2 className="Name" data-testid="open-chat-name">
        {chat.name}
      </h2>
      <ul className="Messages" data-testid="messages-list">
        {chat.messages.length === 0 ? (
          <li className="NoMessages" data-testid="no-messages">
            No messages yet.
          </li>
        ) : (
          chat.messages.map((msg) => (
            <li key={msg.id} className="Message" data-testid="message-item">
              <span className="Name" data-testid="message-sender">
                {msg.senderId}
              </span>
              <span className="Text" data-testid="message-text">
                {msg.content}
              </span>
              <span className="Timestamp" data-testid="message-timestamp">
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
          data-testid="chat-input"
        />
        <button
          className="OpenChatSendButton"
          type="submit"
          disabled={!input.trim()}
          data-testid="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default OpenChat;
