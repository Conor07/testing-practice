import { on } from "events";
import React, { useEffect, useState } from "react";
import { Chat } from "../pages/ChatPage";

type ChatsProps = {
  chats: Chat[] | null;
  openChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  loading: boolean;
  error: string | null;
};

const Chats: React.FC<ChatsProps> = ({
  chats,
  openChat,
  onChatSelect,
  loading,
  error,
}) => {
  return (
    <div className="Chats">
      {loading && <p className="LoadingChats">Loading chats...</p>}

      {error && <p className="Error">{error}</p>}

      {!loading && !error && chats && (
        <ul className="ChatList">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`Chat ${openChat?.id === chat.id ? "Open" : ""}`}
              onClick={() => {
                onChatSelect(chat);
              }}
            >
              <div className="ChatInfo">
                <h3 className="Name">{chat.name ?? "-"}</h3>
                <p className="LastMessage">{chat.lastMessage ?? "-"}</p>
                <span className="Time">
                  {new Date(
                    chat.lastMessageTimestamp ?? "-"
                  ).toLocaleTimeString()}
                </span>

                {chat.unreadCount > 0 ? (
                  <span className="UnreadMessages">
                    <div className="Number">
                      {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                    </div>
                  </span>
                ) : (
                  <span className="NoNewMessages">No new messages</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {chats && chats.length === 0 && !loading && !error && (
        <p className="NoChats">No chats available.</p>
      )}
    </div>
  );
};

export default Chats;
