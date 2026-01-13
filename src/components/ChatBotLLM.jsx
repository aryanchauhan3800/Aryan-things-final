import { useEffect } from "react";

const ChatbaseChatbot = () => {
  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "kEuUjgRGMmKjRqNbFC3zw",
      domain: "www.chatbase.co",
    };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "kEuUjgRGMmKjRqNbFC3zw");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ChatbaseChatbot;
