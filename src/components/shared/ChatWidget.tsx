"use client";

import { useState, useRef, useEffect } from "react";
import { Headset, X, Send, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";

interface Message {
    id: string;
    text: string;
    sender: "USER" | "AGENT";
    timestamp: Date;
    isBot?: boolean;
}

import { getSocket, disconnectSocket } from "@/lib/api/socket";
// ... imports

// Remove SOCKET_URL

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Initialize Socket
    useEffect(() => {
        if (!isOpen) return;

        const socketInstance = getSocket();
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to chat server", socketInstance.id);
            const storedSessionId = localStorage.getItem("chatSessionId");
            socketInstance.emit("joinRoom", { sessionId: storedSessionId });
        });

        socketInstance.on("sessionJoined", (data: { sessionId: string }) => {
            setSessionId(data.sessionId);
            localStorage.setItem("chatSessionId", data.sessionId);
        });

        socketInstance.on("receiveMessage", (message: any) => {
            const formattedMessage: Message = {
                id: message.id,
                text: message.text,
                sender: message.sender,
                timestamp: new Date(message.createdAt),
                isBot: message.isBot,
            };
            setMessages((prev) => [...prev, formattedMessage]);
        });

        socketInstance.on("agentTyping", (isAgentTyping: boolean) => {
            setIsTyping(isAgentTyping);
        });

        return () => {
            socketInstance.off("connect");
            socketInstance.off("sessionJoined");
            socketInstance.off("receiveMessage");
            socketInstance.off("agentTyping");
            disconnectSocket();
            setSocket(null);
        };
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    const minimizeChat = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMinimized(!isMinimized);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && !isMinimized) {
            scrollToBottom();
        }
    }, [messages, isOpen, isMinimized]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const socketInstance = getSocket();
        if (!inputValue.trim() || !socketInstance || !sessionId) return;

        const text = inputValue;
        setInputValue(""); // Clear immediately

        // Optimistically add user message
        const tempMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: "USER",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, tempMessage]);

        socketInstance.emit("sendMessage", { sessionId, text });
    };

    return (
        <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none">
            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-[calc(100vw-2rem)] sm:w-[380px] h-[60vh] sm:h-[500px] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="p-4 bg-secondary/95 backdrop-blur-sm text-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                        <Headset size={20} className="text-primary" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-secondary rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm tracking-wide">Safari Support</h3>
                                    <p className="text-xs text-zinc-400">Typically replies in minutes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={minimizeChat}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                                >
                                    <Minus size={16} />
                                </button>
                                <button
                                    onClick={toggleChat}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                            {messages.length === 0 && (
                                <div className="text-center text-zinc-400 text-sm mt-10">
                                    <p>Welcome to Safari Roast!</p>
                                    <p>Ask us anything about our coffee.</p>
                                </div>
                            )}
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex flex-col max-w-[80%]",
                                        message.sender === "USER" ? "self-end items-end" : "self-start items-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "p-3 rounded-2xl text-sm shadow-sm",
                                            message.sender === "USER"
                                                ? "bg-primary text-black font-medium rounded-br-sm"
                                                : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-bl-sm"
                                        )}
                                    >
                                        {message.text}
                                    </div>
                                    <span className="text-[10px] text-zinc-400 mt-1 px-1">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="self-start bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                                    <div className="flex gap-1">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                                        />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shrink-0"
                        >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-zinc-500"
                                />
                                <Button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    size="icon"
                                    className="rounded-full bg-primary hover:bg-white hover:text-black text-black shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 shrink-0 transition-colors"
                                >
                                    <Send size={18} className="ml-0.5" />
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 pointer-events-auto border border-primary/20",
                    isOpen && !isMinimized
                        ? "bg-secondary text-primary rotate-90"
                        : "bg-primary text-black hover:bg-white hover:text-primary"
                )}
            >
                {isOpen && !isMinimized ? <X size={24} /> : <Headset size={28} />}
            </motion.button>
        </div>
    );
}
