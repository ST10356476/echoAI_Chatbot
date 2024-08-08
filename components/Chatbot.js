import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chatbot.module.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  // Scroll to the bottom of the message list
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Function to send messages
  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      } else {
        console.error('Error from API:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  
    setIsLoading(false);
  };

  // Send welcome message when the component mounts
  useEffect(() => {
    const welcomeMessage = { role: 'assistant', content: 'Welcome to the AI Customer Support! My name is EchoAI and How can I assist you today?' };
    setMessages([welcomeMessage]);
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className={styles.inputField}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
      {isLoading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
};

export default Chatbot;
