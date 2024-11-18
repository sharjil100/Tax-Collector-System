import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

const AgenieChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messageEndRef = useRef(null);

  const welcomeMessage = {
    sender: "bot",
    text: "Hey there! 👋 I'm AGenie 🤖, your friendly Tech Genie. How can I assist you today?",
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("agenieChatMessages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to load chat messages:", error);
        setMessages([welcomeMessage]);
      }
    } else {
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever the messages state changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("agenieChatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
    } catch (error) {
      console.error("Error in fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Enter" key for message submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Reset chat to the welcome message
  const resetChat = () => {
    setMessages([welcomeMessage]);
    localStorage.removeItem("agenieChatMessages");
  };

  // Delete all chat messages
  const deleteChat = () => {
    setMessages([]);
    localStorage.removeItem("agenieChatMessages");
  };

  // Toggle chatbox visibility
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "200px",
          background: "linear-gradient(135deg, #007bff, #6a11cb)",
          color: "white",
          padding: "15px",
          borderRadius: "50%",
          border: "none",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
        }}
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <FontAwesomeIcon icon={faTimes} size="lg" /> : "Chat"}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "400px",
            height: "500px",
            background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
            borderRadius: "15px",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #6a11cb, #007bff)",
              color: "white",
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Chat with AGenie</span>
            <div>
              <button
                onClick={deleteChat}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                title="Delete Chat"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                onClick={toggleChat}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                title="Close Chat"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              background: "#f1f5f9",
            }}
          >
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    margin: "10px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 15px",
                      borderRadius: "15px",
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg, #007bff, #6a11cb)"
                          : "#e9ecef",
                      color: msg.sender === "user" ? "white" : "black",
                      maxWidth: "70%",
                      wordWrap: "break-word",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#aaa",
                  marginTop: "20px",
                }}
              >
                No messages yet. Start a conversation!
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Chat Input */}
          <div
            style={{
              display: "flex",
              padding: "10px 15px",
              borderTop: "1px solid #ddd",
              background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "25px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #007bff, #6a11cb)",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              {loading ? "..." : <FontAwesomeIcon icon={faPaperPlane} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenieChatbot;
