import React, { useEffect, useState } from "react";
import Chats from "../components/Chats";
import OpenChat from "../components/OpenChat";

export type ChatMessage = {
  id: number;
  senderId: string;
  content: string;
  timestamp: string;
};

export type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
};

const now = new Date();

const TEST_CHATS: Chat[] = [
  {
    id: 1,
    name: "Alice",
    lastMessage: "Hey, how are you?",
    lastMessageTimestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(),
    unreadCount: 2,
    messages: [
      {
        id: 1,
        senderId: "Alice",
        content: "Hey, how are you?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
      },
      {
        id: 2,
        senderId: "You",
        content: "I'm good, thanks!",
        timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(),
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "Let's catch up later.",
    lastMessageTimestamp: new Date(
      now.getTime() - 1000 * 60 * 60 * 2
    ).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: 1,
        senderId: "Bob",
        content: "Let's catch up later.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ],
  },
];

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  useEffect(() => {
    // Simulate async loading
    const timer = setTimeout(() => {
      setChats(TEST_CHATS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChatSelect = (chat: Chat) => {
    setOpenChatId(chat.id);
    setChats((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleChatClose = () => setOpenChatId(null);

  const handleSendMessage = (chatId: number, message: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: chat.messages.length + 1,
                  senderId: "You",
                  content: message,
                  timestamp: new Date().toISOString(),
                },
              ],
              lastMessage: message,
              lastMessageTimestamp: new Date().toISOString(),
            }
          : chat
      )
    );
  };

  const openChat = chats.find((c) => c.id === openChatId) || null;

  return (
    <div>
      <Chats
        chats={chats}
        openChat={openChat}
        onChatSelect={handleChatSelect}
        loading={loading}
        error={false}
      />
      <OpenChat
        chat={openChat}
        onChatClose={handleChatClose}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
