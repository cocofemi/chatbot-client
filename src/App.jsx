import { useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ChatBot from "./components/ChatBot";

const App = () => {
  useEffect(() => {
    localStorage.removeItem("chatbotChatHistory");
  });
  return (
    <>
      <BudgetForm />
      <ChatBot />
    </>
  );
};

export default App;
