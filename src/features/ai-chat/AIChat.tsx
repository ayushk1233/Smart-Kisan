"use client"

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Leaf,
  Sun,
  Droplets,
  Thermometer,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Mic,
  MicOff,
  Paperclip,
  Image,
  FileText,
  Crop,
  Wrench,
  TrendingUp,
  Brain
} from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  category?: 'general' | 'crop' | 'weather' | 'pest' | 'soil' | 'market' | 'equipment'
  attachments?: string[]
}

interface QuickQuestion {
  id: string
  question: string
  icon: React.ReactNode
  category: string
  color: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your Smart Kisan AI assistant. I can help you with crop advice, weather analysis, pest control, soil management, market insights, and equipment recommendations. What would you like to know about farming today? 🌾",
      timestamp: new Date(),
      category: 'general'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const quickQuestions: QuickQuestion[] = [
    {
      id: '1',
      question: 'What crops are best for my soil type?',
      icon: <Crop className="w-5 h-5" />,
      category: 'crop',
      color: 'bg-green-500'
    },
    {
      id: '2',
      question: 'How to control pests naturally?',
      icon: <AlertTriangle className="w-5 h-5" />,
      category: 'pest',
      color: 'bg-amber-500'
    },
    {
      id: '3',
      question: 'When is the best time to plant?',
      icon: <Clock className="w-5 h-5" />,
      category: 'crop',
      color: 'bg-blue-500'
    },
    {
      id: '4',
      question: 'How to improve soil fertility?',
      icon: <Leaf className="w-5 h-5" />,
      category: 'soil',
      color: 'bg-emerald-500'
    },
    {
      id: '5',
      question: 'Current market prices for crops?',
      icon: <TrendingUp className="w-5 h-5" />,
      category: 'market',
      color: 'bg-purple-500'
    },
    {
      id: '6',
      question: 'Equipment maintenance tips?',
      icon: <Wrench className="w-5 h-5" />,
      category: 'equipment',
      color: 'bg-orange-500'
    }
  ]

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    const lowerMessage = userMessage.toLowerCase()
    
    // Mock AI responses based on keywords
    if (lowerMessage.includes('soil') || lowerMessage.includes('fertility')) {
      return "🌱 **Soil Fertility Tips:**\n\n1. **Organic Matter**: Add compost, manure, or crop residues to improve soil structure\n2. **Crop Rotation**: Rotate crops to prevent nutrient depletion\n3. **Cover Crops**: Plant legumes like clover or beans to fix nitrogen\n4. **pH Testing**: Test soil pH and adjust with lime or sulfur\n5. **Mulching**: Use organic mulch to retain moisture and add nutrients\n\nWould you like specific recommendations for your soil type?"
    }
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect')) {
      return "🐛 **Natural Pest Control Methods:**\n\n1. **Neem Oil**: Effective against many pests, safe for beneficial insects\n2. **Companion Planting**: Plant marigolds, basil, or garlic to repel pests\n3. **Beneficial Insects**: Attract ladybugs, lacewings, and parasitic wasps\n4. **Crop Rotation**: Break pest life cycles\n5. **Physical Barriers**: Use row covers or netting\n6. **Hand Picking**: Remove pests manually for small infestations\n\nWhat specific pest are you dealing with?"
    }
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) {
      return "🌦️ **Weather-Based Farming Advice:**\n\n1. **Rainy Season**: Focus on drainage, avoid waterlogging\n2. **Dry Season**: Implement irrigation systems, use drought-resistant crops\n3. **Temperature**: Plant heat-tolerant varieties in summer\n4. **Frost Protection**: Use row covers or irrigation for frost-sensitive crops\n5. **Wind Protection**: Plant windbreaks or use stakes for tall crops\n\nI can help you plan based on your local weather patterns!"
    }
    
    if (lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
      return "🌾 **Crop Selection Guide:**\n\n**For Beginners:**\n- Tomatoes, peppers, beans, lettuce\n\n**High Yield:**\n- Potatoes, sweet potatoes, corn\n\n**Drought Resistant:**\n- Millet, sorghum, cowpeas\n\n**Quick Growing:**\n- Radishes, spinach, arugula\n\n**Perennial:**\n- Asparagus, rhubarb, fruit trees\n\nWhat's your experience level and growing conditions?"
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('price')) {
      return "📈 **Market Insights:**\n\n**Current Trends:**\n- Organic produce demand is increasing\n- Local markets prefer fresh, seasonal crops\n- Export opportunities for spices and herbs\n\n**Pricing Tips:**\n- Direct marketing to consumers gets better prices\n- Value-added products (jams, pickles) increase profits\n- Seasonal timing affects prices significantly\n\n**Marketing Channels:**\n- Farmers markets\n- CSA (Community Supported Agriculture)\n- Online platforms\n- Restaurant partnerships\n\nWould you like specific crop price analysis?"
    }
    
    if (lowerMessage.includes('equipment') || lowerMessage.includes('tool')) {
      return "🔧 **Equipment & Tools Guide:**\n\n**Essential Tools:**\n- Hand trowel, pruners, watering can\n- Wheelbarrow, rake, hoe\n- Garden fork, shovel\n\n**Power Equipment:**\n- Tiller for soil preparation\n- Irrigation system for water management\n- Greenhouse for extended growing\n\n**Maintenance Tips:**\n- Clean tools after each use\n- Sharpen blades regularly\n- Store in dry place\n- Oil moving parts\n\nWhat specific equipment do you need help with?"
    }
    
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) {
      return "🌿 **Fertilizer Guide:**\n\n**Organic Options:**\n- Compost: Complete nutrient source\n- Manure: High in nitrogen\n- Bone meal: Rich in phosphorus\n- Fish emulsion: Quick nitrogen boost\n\n**Application Tips:**\n- Test soil before applying\n- Apply in growing season\n- Don't over-fertilize\n- Water after application\n\n**Natural Alternatives:**\n- Crop rotation\n- Green manure\n- Mulching\n- Compost tea\n\nWhat type of fertilizer are you considering?"
    }
    
         // Default response
     return "🤖 **Smart Kisan AI Response:**\n\nI understand you're asking about farming. I can help you with:\n\n• **Crop Selection** - Best crops for your conditions\n• **Soil Management** - Improving fertility and structure\n• **Pest Control** - Natural and effective methods\n• **Weather Planning** - Seasonal farming strategies\n• **Market Analysis** - Pricing and selling advice\n• **Equipment Tips** - Tools and maintenance\n\nPlease ask me a specific question about any of these topics, and I'll provide detailed, practical advice for your farming needs! 🌾"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputMessage)
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        category: 'general'
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: QuickQuestion) => {
    setInputMessage(question.question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        // Simulate speech-to-text result
        const voiceResults = [
          "How to grow tomatoes in my area?",
          "What's the best time to plant wheat?",
          "How to control pests naturally?",
          "What fertilizer should I use for vegetables?",
          "Tell me about crop rotation"
        ]
        const randomQuestion = voiceResults[Math.floor(Math.random() * voiceResults.length)]
        setInputMessage(randomQuestion)
        alert(`Voice detected: "${randomQuestion}" 🎤`)
      }, 2000)
    } else {
      setIsRecording(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
         <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
                                                   <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Smart Kisan AI</h1>
              <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>Your intelligent farming companion for expert advice</p>
          </div>
        </div>
      </div>

             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quick Questions Sidebar */}
        <div className="lg:col-span-1">
                     <Card className="border-0 shadow-lg sticky top-8" style={{ backgroundColor: 'var(--card)' }}>
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Quick Questions</span>
              </CardTitle>
              <CardDescription className="text-purple-100">
                Popular farming topics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {quickQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${question.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {question.icon}
                      </div>
                      <div>
                                                 <p className="text-sm font-medium transition-colors" style={{ color: 'var(--foreground)' }}>
                           {question.question}
                         </p>
                         <p className="text-xs capitalize" style={{ color: 'var(--muted-foreground)' }}>{question.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

                 {/* Chat Interface */}
         <div className="lg:col-span-4">
                     <Card className="border-0 shadow-lg h-[600px] flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                             <CardTitle className="flex items-center space-x-2">
                 <MessageCircle className="w-5 h-5" />
                 <span>Chat with Smart Kisan AI</span>
               </CardTitle>
                             <CardDescription className="text-green-100">
                 Ask me anything about farming! 🌾 • {messages.length - 1} messages
               </CardDescription>
            </CardHeader>
            
                         <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
                             {/* Messages Area */}
               <div 
                 ref={messagesContainerRef}
                 className="flex-1 p-6 overflow-y-auto space-y-4 chat-container relative" 
                 style={{ overflowX: 'hidden', maxHeight: 'calc(100vh - 300px)', minHeight: '400px' }}
               >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                                         <div className={`max-w-[75%] flex-shrink-0 ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-green-500' 
                            : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                                                 <div className={`rounded-2xl px-4 py-3 min-w-0 max-w-full chat-bubble ${
                           message.type === 'user'
                             ? 'bg-green-500 text-white'
                             : ''
                         }`} style={{ 
                           backgroundColor: message.type === 'user' ? undefined : 'var(--muted)',
                           color: message.type === 'user' ? 'white' : 'var(--foreground)',
                           maxWidth: '100%',
                           wordWrap: 'break-word',
                           overflow: 'hidden'
                         }}>
                           <div className="whitespace-pre-wrap text-sm leading-relaxed break-words overflow-wrap-anywhere max-w-full overflow-hidden chat-message" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                             <div className="word-break-all" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                               {message.content}
                             </div>
                           </div>
                                                    <div className={`text-xs mt-2 ${
                             message.type === 'user' ? 'text-green-100' : ''
                           }`} style={{ color: message.type === 'user' ? undefined : 'var(--muted-foreground)' }}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                                             <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: 'var(--muted)' }}>
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                                                     <span className="text-sm" style={{ color: 'var(--foreground)' }}>AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                                                  <div ref={messagesEndRef} className="h-4" />
                 
                 {/* Scroll to Bottom Button */}
                 {showScrollButton && (
                   <button
                     onClick={scrollToBottom}
                     className="absolute bottom-4 right-4 w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10"
                     title="Scroll to bottom"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                     </svg>
                   </button>
                 )}
               </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about farming, crops, weather, pests, soil, market prices, equipment..."
                        className="pr-20 h-12 text-base border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl transition-all duration-300"
                        disabled={isLoading}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleRecording}
                          className={`p-2 rounded-lg transition-colors ${
                            isRecording ? 'text-red-500 hover:bg-red-50' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                                                 <Button
                           variant="ghost"
                           size="sm"
                           className="p-2 rounded-lg text-slate-400 hover:text-slate-600"
                           onClick={() => {
                             const input = document.createElement('input')
                             input.type = 'file'
                             input.accept = 'image/*,.pdf,.txt'
                             input.onchange = (e) => {
                               const file = (e.target as HTMLInputElement).files?.[0]
                               if (file) {
                                 alert(`File attached: ${file.name} 📎`)
                                 // In a real app, you would upload the file and get a URL
                               }
                             }
                             input.click()
                           }}
                         >
                           <Paperclip className="w-4 h-4" />
                         </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 h-12 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                
                <div className="mt-3 text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                  💡 Tip: Ask specific questions for better answers. Try "How to grow tomatoes in clay soil?" or "Best time to plant wheat in Punjab?"
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Overview */}
             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--card)' }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Crop className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Crop Advice</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Get personalized recommendations for crop selection, planting times, and growing techniques based on your location and conditions.
              </p>
            </CardContent>
          </Card>

                                   <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--card)' }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Pest Control</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Learn natural and effective methods to control pests and diseases without harming your crops or the environment.
              </p>
            </CardContent>
          </Card>

                                   <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--card)' }}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Market Insights</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Stay updated with current market prices, trends, and selling strategies to maximize your farming profits.
              </p>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
