
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Heart, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface FamilyMember {
  id: string;
  name: string;
  personality: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const Chat = () => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const familyMembers: FamilyMember[] = [
    {
      id: 'mother',
      name: 'Mom',
      personality: 'nurturing',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-pink-500',
      description: 'Warm, caring, and always ready to listen'
    },
    {
      id: 'father',
      name: 'Dad',
      personality: 'motivational',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Encouraging, wise, and supportive'
    },
    {
      id: 'sibling',
      name: 'Sibling',
      personality: 'friendly',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Fun, casual, and always up for a chat'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAIResponse = async (userMessage: string, personality: string) => {
    // Simulate API call - replace with your MongoDB/OpenAI integration
    setIsLoading(true);
    
    // Sample responses based on personality
    const responses = {
      nurturing: [
        "Oh sweetheart, I'm so glad you're sharing this with me. How are you feeling today? 💕",
        "You know I'm always here for you, dear. Take your time and tell me what's on your mind.",
        "Have you been taking care of yourself? Remember to eat well and get enough rest, honey."
      ],
      motivational: [
        "I believe in you! Every challenge is an opportunity to grow stronger. 💪",
        "You've got this! Remember all the obstacles you've already overcome.",
        "Success isn't about being perfect, it's about not giving up. Keep pushing forward!"
      ],
      friendly: [
        "Hey! What's up? Always good to chat with you! 😊",
        "Haha, you always know how to make things interesting! What's new?",
        "Yo! How's life treating you? Got any cool stories to share?"
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    const personalityResponses = responses[personality as keyof typeof responses];
    const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    
    setIsLoading(false);
    return randomResponse;
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !selectedMember) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get AI response
    const aiResponse = await getAIResponse(inputText, selectedMember.personality);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);

    // Here you would save the conversation to MongoDB
    console.log('Saving conversation to MongoDB:', { userMessage, aiMessage });
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  if (!selectedMember) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-white mb-8 text-center glow-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your AI Family Member
          </motion.h1>

          <div className="grid md:grid-cols-3 gap-6">
            {familyMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="glass-card border-white/20 cursor-pointer hover:border-purple-400/50 transition-all duration-300"
                  onClick={() => setSelectedMember(member)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                      {member.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-gray-300 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-12 h-12 rounded-full ${selectedMember.color} flex items-center justify-center text-white`}>
              {selectedMember.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Chatting with {selectedMember.name}</h1>
              <p className="text-gray-300 text-sm">{selectedMember.description}</p>
            </div>
          </motion.div>
          
          <Button
            onClick={() => setSelectedMember(null)}
            variant="outline"
            className="glass-card border-white/20"
          >
            Change Member
          </Button>
        </div>

        <motion.div
          className="glass-card border-white/20 h-96 mb-4 overflow-y-auto p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-center">
                Start a conversation with {selectedMember.name}!<br />
                They're here to listen and support you.
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'glass-card border-white/20 text-gray-300'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="glass-card border-white/20 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
          
          <Button
            onClick={startVoiceRecognition}
            className={`px-3 ${isListening ? 'bg-red-500' : 'bg-blue-500'}`}
            disabled={isListening}
          >
            {isListening ? <MicOff /> : <Mic />}
          </Button>
          
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
