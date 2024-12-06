// 添加更多调试信息
console.log('Script loaded');

class AIAssistant {
    constructor() {
        console.log('AI Assistant initializing...');
        this.initElements();
        this.bindEvents();
        this.messages = [];
    }

    initElements() {
        console.log('Initializing elements...');
        this.assistant = document.getElementById('aiAssistant');
        
        if (!this.assistant) {
            console.error('AI Assistant element not found!');
            return;
        }
        
        console.log('AI Assistant element found:', this.assistant);
        
        this.chatWindow = this.assistant.querySelector('.ai-chat-window');
        this.messagesContainer = document.getElementById('chatMessages');
        this.input = document.getElementById('userInput');
        this.toggleButton = this.assistant.querySelector('.ai-toggle');
        this.closeButton = this.assistant.querySelector('.close-chat');
        this.sendButton = this.assistant.querySelector('.send-message');
        
        // 检查所有必要的元素是否都找到
        console.log('Chat window:', this.chatWindow);
        console.log('Messages container:', this.messagesContainer);
        console.log('Input:', this.input);
        console.log('Toggle button:', this.toggleButton);
        console.log('Close button:', this.closeButton);
        console.log('Send button:', this.sendButton);
    }

    bindEvents() {
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.chatWindow.classList.toggle('hidden');
        if (!this.chatWindow.classList.contains('hidden')) {
            this.input.focus();
            // 显示欢迎消息
            if (this.messages.length === 0) {
                this.addMessage('您好！我是AI助手，有什么可以帮您的吗？', 'ai');
            }
        }
    }

    closeChat() {
        this.chatWindow.classList.add('hidden');
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // 添加用户消息
        this.addMessage(message, 'user');
        this.input.value = '';

        // 模拟AI响应
        this.showTypingIndicator();
        await this.getAIResponse(message);
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messages.push({ type, text });
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'ai-message', 'typing');
        indicator.textContent = '正在输入...';
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
        return indicator;
    }

    async getAIResponse(message) {
        // 模拟AI响应延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 这里可以替换为实际的AI API调用
        const response = this.generateSimpleResponse(message);
        
        // 移除输入指示器
        const typingIndicator = this.messagesContainer.querySelector('.typing');
        if (typingIndicator) typingIndicator.remove();
        
        // 添加AI响应
        this.addMessage(response, 'ai');
    }

    generateSimpleResponse(message) {
        // 简单的响应逻辑，实际项目中应该调用AI API
        const responses = {
            '你好': '您好！很高兴为您服务。',
            '再见': '再见！如果还有问题随时问我。',
            default: '我明白了。请问还有什么可以帮您的吗？'
        };
        
        return responses[message] || responses.default;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// 确保DOM加载完成后再初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing AI Assistant...');
    new AIAssistant();
}); 