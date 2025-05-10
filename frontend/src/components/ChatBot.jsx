import React, { useState } from "react";
import "./chatbot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to PulsePoint. How can I help you today?",
      options: [
        "1. Appointment Booking",
        "2. Token Generation",
        "3. Symptoms/Diagnose",
      ],
    },
  ]);
  const [input, setInput] = useState("");

  const handleOptionSelect = (option) => {
    // Add user's selection to messages
    const updatedMessages = [...messages, { from: "user", text: option }];
    setMessages(updatedMessages);
    
    // Process the selected option
    let botResponse;
    switch (option) {
      case "1. Appointment Booking":
        botResponse = {
          from: "bot",
          text: "Your appointment has been scheduled for tomorrow at 2 PM. Token: APT" +
            Math.floor(1000 + Math.random() * 9000),
        };
        break;
      case "2. Token Generation":
        botResponse = {
          from: "bot",
          text: "Your token number is: TKN" + Math.floor(1000 + Math.random() * 9000),
        };
        break;
      case "3. Symptoms/Diagnose":
        botResponse = {
          from: "bot",
          text: "Please describe your symptoms in detail.",
          options: [
            "1. Fever and cough",
            "2. Headache and fatigue",
            "3. Stomach pain",
            "4. Other symptoms"
          ]
        };
        break;
      default:
        botResponse = {
          from: "bot",
          text: "How can I assist you further?",
        };
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const updatedMessages = [...messages, { from: "user", text: input }];
    setMessages(updatedMessages);

    // Generate bot response
    let botResponse;
    if (input.toLowerCase().includes("appointment") || input.includes("1")) {
      botResponse = {
        from: "bot",
        text: "Your appointment has been scheduled for tomorrow at 2 PM. Token: APT" +
          Math.floor(1000 + Math.random() * 9000),
      };
    } else if (input.toLowerCase().includes("token") || input.includes("2")) {
      botResponse = {
        from: "bot",
        text: "Your token number is: TKN" + Math.floor(1000 + Math.random() * 9000),
      };
    } else if (
      input.toLowerCase().includes("diagnose") ||
      input.toLowerCase().includes("symptom") ||
      input.includes("3")
    ) {
      const possibleDiagnoses = [
        "Based on your symptoms, you may have a common cold. Drink plenty of fluids and rest.",
        "Your symptoms could indicate seasonal allergies. Try an antihistamine.",
        "These symptoms may require medical attention. Please visit a doctor.",
      ];
      botResponse = {
        from: "bot",
        text: possibleDiagnoses[
          Math.floor(Math.random() * possibleDiagnoses.length)
        ],
      };
    } else if (
      input.toLowerCase().includes("hello") ||
      input.toLowerCase().includes("hi")
    ) {
      botResponse = {
        from: "bot",
        text: "Hello! How can I assist you with your healthcare needs today?",
        options: [
          "1. Appointment Booking",
          "2. Token Generation",
          "3. Symptoms/Diagnose",
        ],
      };
    } else if (input.toLowerCase().includes("thank")) {
      botResponse = {
        from: "bot",
        text: "You're welcome! Is there anything else I can help you with?",
        options: [
          "1. Appointment Booking",
          "2. Token Generation",
          "3. Symptoms/Diagnose",
        ],
      };
    } else {
      botResponse = {
        from: "bot",
        text: "I'm a healthcare assistant. You can ask about appointments, symptoms, or general health questions.",
        options: [
          "1. Appointment Booking",
          "2. Token Generation",
          "3. Symptoms/Diagnose",
        ],
      };
    }

    // Add bot response after a short delay
    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>
            <div className="message-content">{msg.text}</div>
            {msg.options && msg.from === "bot" && (
              <div className="message-options">
                {msg.options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;