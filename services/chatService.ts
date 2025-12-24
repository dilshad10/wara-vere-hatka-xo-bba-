
import { GoogleGenAI } from "@google/genai";
import { ChatType, Gender, Message } from "../types.ts";

export class ChatService {
  private channel: BroadcastChannel;
  private geminiChat: any = null;
  private onMessageReceived: (msg: Message) => void;
  private onPeerJoined: () => void;
  private isAI: boolean = false;
  private userId: string;

  constructor(
    userId: string,
    onMessage: (msg: Message) => void,
    onPeerJoined: () => void
  ) {
    this.userId = userId;
    this.onMessageReceived = onMessage;
    this.onPeerJoined = onPeerJoined;
    this.channel = new BroadcastChannel('warahatkaxobaa_global_lobby');
    
    this.channel.onmessage = (event) => {
      const data = event.data;
      if (data.type === 'PEER_JOINED' && data.senderId !== this.userId) {
        this.onPeerJoined();
        this.channel.postMessage({ type: 'PEER_ACK', senderId: this.userId });
      } else if (data.type === 'PEER_ACK' && data.senderId !== this.userId) {
        this.onPeerJoined();
      } else if (data.type === 'CHAT_MESSAGE' && data.senderId !== this.userId) {
        this.onMessageReceived({
          id: data.id,
          senderId: 'stranger',
          text: data.text,
          imageUrl: data.imageUrl,
          isViewOnce: data.isViewOnce,
          timestamp: data.timestamp
        });
      }
    };
  }

  joinLobby() {
    this.channel.postMessage({ type: 'PEER_JOINED', senderId: this.userId });
  }

  async initializeAI(chatType: ChatType, userGender: Gender, lookingFor: string) {
    if (!process.env.API_KEY) {
      console.warn("API_KEY is missing. AI Chat will not work. Please set it in your environment variables.");
      return "Hello! (Note: AI is currently offline due to missing API Key)";
    }

    try {
      this.isAI = true;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      this.geminiChat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are an anonymous user on WaraHatkaXoBaa. 
          Context: ${chatType}. User is ${userGender}, looking for ${lookingFor}. 
          Act like a real casual human. Use lowercase, slang, or short sentences. 
          DO NOT mention you are an AI. Be slightly mysterious but friendly.`
        }
      });
      const response = await this.geminiChat.sendMessage({ message: "Say something to start the conversation as a new stranger who just joined." });
      return response.text;
    } catch (err) {
      console.error("AI Initialization failed:", err);
      return "Connected to the network. Say hello!";
    }
  }

  async sendMessage(text: string, imageUrl?: string, isViewOnce?: boolean) {
    const msgId = Math.random().toString(36).substring(7);
    const timestamp = Date.now();

    if (this.isAI && this.geminiChat) {
      try {
        const response = await this.geminiChat.sendMessage({ message: text || "User sent an image. React to it." });
        return {
          id: msgId,
          senderId: 'stranger' as const,
          text: response.text,
          timestamp: Date.now()
        };
      } catch (err) {
        console.error("Failed to get AI response:", err);
        return null;
      }
    } else {
      this.channel.postMessage({
        type: 'CHAT_MESSAGE',
        senderId: this.userId,
        id: msgId,
        text,
        imageUrl,
        isViewOnce,
        timestamp
      });
      return null;
    }
  }

  disconnect() {
    this.channel.close();
  }
}
