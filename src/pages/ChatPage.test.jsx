import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatPage from "./ChatPage";
import "@testing-library/jest-dom";

const waitForChatListItems = async () => {
  expect(screen.getByTestId("loading")).toBeInTheDocument();
  const chatItems = await screen.findAllByTestId("chat-list-item");
  expect(chatItems.length).toBeGreaterThan(0);
  return chatItems;
};

describe("ChatPage", () => {
  beforeEach(() => {
    render(<ChatPage />);
  });

  test("shows loading initially and then displays the chat list", async () => {
    await waitForChatListItems();
  });

  test("clicking a chat loads the open chat component with chat info", async () => {
    // Wait for chat list to appear
    const chatItems = await waitForChatListItems();
    // // Debug DOM before clicking
    // screen.debug();
    fireEvent.click(chatItems[0]);
    expect(await screen.findByTestId("open-chat-name")).toBeInTheDocument();
    expect(await screen.findByTestId("messages-list")).toBeInTheDocument();
  });

  test("unread messages is set to 0 when a chat is opened", async () => {
    const chatItems = await waitForChatListItems();
    const unreadChat = chatItems.find(item =>
      item.querySelector(".UnreadMessages")
    );
    expect(unreadChat).toBeDefined();
    const unreadBadge = unreadChat && unreadChat.querySelector(".UnreadMessages");
    expect(unreadBadge).toBeInTheDocument();

    fireEvent.click(unreadChat);

    expect(await screen.findByTestId("open-chat-name")).toBeInTheDocument();
    // Optionally, check that the unread badge is not in the document at all
    expect(screen.queryByText(/unread/i)).not.toBeInTheDocument();
  });

  test("message send button is disabled initially", async () => {
    const chatItems = await waitForChatListItems();
    fireEvent.click(chatItems[0]);
    const sendButton = await screen.findByTestId("send-button");
    expect(sendButton).toBeDisabled();
  });

  test("sending a message updates the messages and chat list", async () => {
    const chatItems = await waitForChatListItems();
    fireEvent.click(chatItems[0]);
    const input = await screen.findByTestId("chat-input");
    fireEvent.change(input, { target: { value: "Hello world!" } });
    const sendButton = await screen.findByTestId("send-button");
    expect(sendButton).toBeEnabled();
    fireEvent.click(sendButton);

    // Check the message appears in the open chat (target the message text span)
    const messageTexts = await screen.findAllByTestId("message-text");
    expect(messageTexts.some(el => el.textContent === "Hello world!")).toBe(true);

    // Close the open chat to reveal the chat list again
    const closeButton = await screen.findByTestId("close-chat");
    fireEvent.click(closeButton);

    // Now check the chat list for the updated last message
    const lastMessages = await screen.findAllByTestId("last-message");
    expect(lastMessages[0]).toHaveTextContent(/hello world!/i);
  });

  test("clicking the close button closes the open chat", async () => {
    const chatItems = await waitForChatListItems();
    fireEvent.click(chatItems[0]);
    const closeButton = await screen.findByTestId("close-chat");
    fireEvent.click(closeButton);
    expect(await screen.findByText(/no chat selected/i)).toBeInTheDocument();
  });
});