import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatBotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [chatHistory, setChatHistory] = useState(() => {
    const stored = localStorage.getItem("chatbotChatHistory");
    try {
      return stored
        ? JSON.parse(stored)
        : [
            {
              role: "model",
              text: `Hi there! 👋\n
                I’m your event budgeting assistant.
                Let’s get started with your event budget planning. \n
                What is your name?`,
            },
          ];
    } catch {
      return [];
    }
  });
  const [sessionId, setSessionId] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const chatBodyRef = useRef();

  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatbotSessionId");
    const storedMessages = localStorage.getItem("chatbotChatHistory");

    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId =
        "session_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("chatbotSessionId", newSessionId);
      setSessionId(newSessionId);
    }

    if (storedMessages) {
      setChatHistory(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatbotChatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, fileUrl = false, isError = false) => {
      setChatHistory((prevHistory) => [
        ...prevHistory.filter((msg) => msg.text != "Thinking..."),
        { role: "model", text, fileUrl, isError },
      ]);
    };
    // history = history.map((role, text) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId, text: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response.error || "Something went wrong");
      }
      //console.log(data);
      const apiResponseText = data.reply.trim();
      const fileUrl = data.fileUrl;
      updateHistory(apiResponseText, fileUrl);
    } catch (error) {
      console.log(error);
      updateHistory("Something went wrong please try again. ", true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Budget Assistant 💰</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </button>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          {chatHistory.length === 0 && (
            <div className="message bot-message">
              <ChatbotIcon />
              {/* <p className="message-text">
                Hi there! 👋
                <br /> <br />
                I’m your event budgeting assistant. <br />
                Let’s get started with your event budget planning. <br /> <br />{" "}
                What’s your name?
              </p> */}
            </div>
          )}

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
