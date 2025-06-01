import ChatbotIcon from "./ChatBotIcon";

function ChatMessage({ chat }) {
  return (
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}-message ${
        chat.isError ? "error" : ""
      }`}
    >
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
      {/* ✅ Show link if there's a file URL */}
      {chat.fileUrl && (
        <a
          href={chat.fileUrl}
          className="message-text"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          📥 Download
        </a>
      )}
    </div>
  );
}

export default ChatMessage;
