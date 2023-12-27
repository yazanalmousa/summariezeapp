import React, { useState, useRef, useEffect } from 'react';
import '../chat.css'

function Chat() {

  

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const [userMessage,setUserMessage] = useState("")
  const [botResposne,setBotResposne] = useState("")


  function addMessage(type, text) {
    setMessages(prevMessages => [...prevMessages, { type, text }]);
  }

  function handleSendButtonClick() {
    const message = inputValue.trim();
    if (message) {
      addMessage('user-message', message);
      setUserMessage(message)
      setInputValue('');

      setTimeout(() => {
        addMessage('agent-message', 'Bot response to: ' + message);
        scrollToBottom();
      }, 1000);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSendButtonClick();
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  var ws = null;
  useEffect(() => {
        console.log(messages)
        ws = new WebSocket("ws://localhost:8000/ws");
        ws.onopen = () => ws.send(userMessage);
        ws.onmessage = (e) => {
          setBotResposne("tasnim")
            console.log(e);
        };
    },[messages]);

  return ( 
  <div className="app">
  <div className="chat-section2" ref={chatRef}>
    <div className="chat-container">
      <div className="top-part">
        <div className="agent-details">
          <div className="agent-text">
          <i class="fa-solid fa-robot"></i>
          </div>
        </div>
      </div>
      <div className="chat-section">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          id="chat-input" 
          placeholder="Type your message here..." 
          aria-label="Type your message" 
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id="send-btn" onClick={handleSendButtonClick}>
          <i className='bx bx-send'></i>
        </button>
      </div>
    </div>
    </div>
    </div>

  );
        }
        export default Chat;