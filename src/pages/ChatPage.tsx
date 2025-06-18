import React, { useState, useEffect } from "react";
import Chats from "../components/Chats";
import OpenChat from "../components/OpenChat";

export interface ChatMessage {
  id: number;
  senderId: string;
  content: string;
  timestamp: string;
}

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
    lastMessageTimestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(), // 2 min ago
    unreadCount: 2,
    messages: [
      {
        id: 1,
        senderId: "Alice",
        content: "Hey, how are you?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 10).toISOString(), // 10 min ago
      },
      {
        id: 2,
        senderId: "You",
        content: "I'm good, thanks!",
        timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(), // 2 min ago
      },
      {
        id: 3,
        senderId: "Alice",
        content: "One",
        timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(), // 2 min ago
      },
      {
        id: 4,
        senderId: "You",
        content: "Two",
        timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(), // 2 min ago
      },
      {
        id: 5,
        senderId: "Alice",
        content: "Three",
        timestamp: new Date(now.getTime() - 1000 * 60 * 2).toISOString(), // 2 min ago
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "Let's catch up later.",
    lastMessageTimestamp: new Date(
      now.getTime() - 1000 * 60 * 60 * 2
    ).toISOString(), // 2 hours ago
    unreadCount: 0,
    messages: [
      {
        id: 1,
        senderId: "Bob",
        content: "Let's catch up later.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
    ],
  },
  {
    id: 3,
    name: "John",
    lastMessage: "Did you see my other messages?",
    lastMessageTimestamp: new Date(
      now.getTime() - 1000 * 60 * 60 * 24
    ).toISOString(), // 1 day ago
    unreadCount: 200,
    messages: [
      {
        id: 1,
        senderId: "John",
        content: "Did you see my other messages?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },

      {
        id: 2,
        senderId: "You",
        content: "Yes, just saw them now.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      },
      {
        id: 3,
        senderId: "John",
        content: "Great, are you free later this week?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      },
    ],
  },
  {
    id: 4,
    name: "Jane",
    lastMessage: "Let's catch up later.",
    lastMessageTimestamp: new Date(
      now.getTime() - 1000 * 60 * 60 * 2
    ).toISOString(), // 2 hours ago
    unreadCount: 0,
    messages: [
      {
        id: 1,
        senderId: "Jane",
        content: "Let's catch up later.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
    ],
  },
  {
    id: 5,
    name: "Dave",
    lastMessage: "Let's catch up later.",
    lastMessageTimestamp: new Date(
      now.getTime() - 1000 * 60 * 60 * 2
    ).toISOString(), // 2 hours ago
    unreadCount: 0,
    messages: [
      {
        id: 1,
        senderId: "Jane",
        content: "Let's catch up later.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
    ],
  },
];

type ChatPageProps = {};

const ChatPage: React.FC<ChatPageProps> = ({}) => {
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching chats from an API

    const fetchChats = async () => {
      // Simulate a delay for fetching data
      return new Promise<Chat[]>((resolve) => {
        setTimeout(() => {
          resolve(TEST_CHATS);
        }, 1000); // Simulate a 1 second delay
      });
    };

    setLoading(true);
    setChats([]); // Clear chats before fetching new ones

    fetchChats()
      .then((fetchedChats) => {
        setChats(fetchedChats);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);

        setError("Failed to fetch chats. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onChatClose = () => {
    setOpenChat(null);
  };

  useEffect(() => {
    if (openChat && chats) {
      // Update openChat state when chats state changes
      const match = chats.find((chat) => chat.id === openChat.id);
      if (match) {
        setOpenChat(match);
      } else {
        // If the open chat is not found in the new chats, close it
        setOpenChat(null);
      }
    }
  }, [chats]);

  const onChatSelect = (chat: Chat) => {
    if (openChat && openChat.id === chat.id) {
      // If the same chat is clicked, close it
      onChatClose();
    } else {
      // Otherwise, open the selected chat
      setOpenChat(chat);

      // Reset unread count when chat is opened
      setChats((prevChats) =>
        prevChats
          ? prevChats.map((c) =>
              c.id === chat.id ? { ...c, unreadCount: 0 } : c
            )
          : null
      );
    }
  };

  const onSendMessage = (chatId: number, message: string) => {
    setChats((prevChats) =>
      prevChats
        ? prevChats.map((chat) =>
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
        : null
    );
  };

  return (
    <div className="ChatPage Page">
      <div className="Body">
        <h1>Chats</h1>

        <Chats
          chats={chats}
          openChat={openChat}
          onChatSelect={onChatSelect}
          loading={loading}
          error={error}
        />

        <OpenChat
          chat={openChat}
          onChatClose={onChatClose}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
