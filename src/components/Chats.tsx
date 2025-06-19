import React from "react";
import { Chat } from "../pages/ChatPage";

type ChatsProps = {
  chats: Chat[];
  openChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  loading: boolean;
  error: boolean;
};

const Chats: React.FC<ChatsProps> = ({
  chats,
  openChat,
  onChatSelect,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="Loading" data-testid="loading">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="Error" data-testid="error">
        Error loading chats
      </div>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <p className="NoChats" data-testid="no-chats">
        No chats available.
      </p>
    );
  }

  return (
    <ul className="ChatList">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className={`Chat ${openChat?.id === chat.id ? "Open" : ""}`}
          data-testid="chat-list-item"
          onClick={() => onChatSelect(chat)}
        >
          <div className="ChatInfo">
            <h3 className="Name" data-testid="chat-name">
              {chat.name ?? "-"}
            </h3>
            <p className="LastMessage" data-testid="last-message">
              {chat.lastMessage ?? "-"}
            </p>
            <span className="Time" data-testid="chat-time">
              {chat.lastMessageTimestamp
                ? new Date(chat.lastMessageTimestamp).toLocaleTimeString()
                : "-"}
            </span>
            {chat.unreadCount > 0 ? (
              <span className="UnreadMessages">{chat.unreadCount}</span>
            ) : (
              <span className="NoNewMessages">No new messages</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Chats;
