import  { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
    const [messages, setMessages] = useState(() => {
        // Obtener mensajes del localStorage al iniciar la app
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [inputMessage, setInputMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const connectWebSocket = () => {
        if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
            ws.current = new WebSocket('ws://54.242.88.9');

            ws.current.onopen = () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);
            };

            ws.current.onmessage = (event) => {
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };

            ws.current.onclose = () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
            };
        }
    };

    const disconnectWebSocket = () => {
        if (ws.current) {
            ws.current.close();
            setIsConnected(false);
            console.log('Disconnected from WebSocket');
        }
    };

    const sendMessage = () => {
        if (inputMessage.trim() !== '' && isConnected) {
            ws.current.send(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>Marketplace Chat</h1>
            </header>
            <div className="connection-buttons">
                {!isConnected ? (
                    <button onClick={connectWebSocket} className="connect-button">Connect</button>
                ) : (
                    <button onClick={disconnectWebSocket} className="disconnect-button">Disconnect</button>
                )}
            </div>
            <div className="chat-container">
                <div className="message-list">
                    <h2>Messages:</h2>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index} className="message">{msg}</li>
                        ))}
                    </ul>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="input"
                        disabled={!isConnected}
                    />
                    <button onClick={sendMessage} className="send-button" disabled={!isConnected}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
