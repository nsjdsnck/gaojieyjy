class AIAssistant {
    constructor() {
        console.log('AI Assistant initializing...');
        this.initElements();
        this.bindEvents();
        this.messages = [];
    }

    initElements() {
        this.assistant = document.getElementById('aiAssistant');
        if (!this.assistant) {
            console.error('AI Assistant element not found!');
            return;
        }

        this.chatWindow = this.assistant.querySelector('.ai-chat-window');
        this.messagesContainer = document.getElementById('chatMessages');
        this.input = document.getElementById('userInput');
        this.toggleButton = this.assistant.querySelector('.ai-toggle');
        this.closeButton = this.assistant.querySelector('.close-chat');
        this.sendButton = this.assistant.querySelector('.send-message');

        // 添加初始欢迎消息
        this.addMessage('您好！我是高洁智造AI助手，请问有什么可以帮您？', 'ai');
    }

    bindEvents() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleChat());
        }
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeChat());
        }
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
    }

    toggleChat() {
        if (this.chatWindow) {
            this.chatWindow.classList.toggle('hidden');
            if (!this.chatWindow.classList.contains('hidden')) {
                this.input.focus();
            }
        }
    }

    closeChat() {
        if (this.chatWindow) {
            this.chatWindow.classList.add('hidden');
        }
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // 添加用户消息
        this.addMessage(message, 'user');
        this.input.value = '';

        // 显示正在输入状态
        const typingIndicator = this.showTypingIndicator();

        // 模拟AI响应延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 移除输入指示器
        if (typingIndicator) {
            typingIndicator.remove();
        }

        // 生成AI响应
        const response = this.generateResponse(message);
        this.addMessage(response, 'ai');
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = text;
        
        if (this.messagesContainer) {
            this.messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'ai-message', 'typing');
        indicator.textContent = '正在输入...';
        if (this.messagesContainer) {
            this.messagesContainer.appendChild(indicator);
            this.scrollToBottom();
        }
        return indicator;
    }

    generateResponse(message) {
        // 扩展响应逻辑，添加更多公司相关的问答
        const responses = {
            '你好': '您好！我是高洁智造AI助手，很高兴为您服务。',
            '再见': '再见！如果还有问题随时问我。',
            '联系方式': '您可以拨打我们的服务热线：023-66298735，或者到访我们的地址：重庆市巴南区界石镇石桂大道16号1幢',
            '公司介绍': '重庆高洁绿色机械设备智能制造研究院有限公司成立于2021年8月，是巴南区政府招商引资公司。我们致力于为制造企业提供机床绿色智能化改造升级以及绿色智能数字产线/工厂的整体解决方案。',
            '资质': '我们公司在2023年10月成为高新技术企业，在2024年成为重庆市"专精特新"企业。',
            '荣誉': '我们获得了多项荣誉：\n1. 专精特新企业\n2. 高新技术企业\n3. 重庆产学研合作试点企业\n4. 重庆市先进集体',
            '地址': '我们的地址是：重庆市巴南区界石镇石桂大道16号1幢',
            '电话': '服务热线：023-66298735',
            '服务': '我们可以为制造企业提供机床绿色智能化改造升级以及绿色智能数字产线/工厂的整体解决方案。',
            '合作': '我们有多家合作伙伴，包括：兵器、长安、富士康、航天、航天科工等知名企业。',
            '产品': '我们提供绿色智能制造解决方案，包括机床改造升级和智能数字产线/工厂建设。',
            default: '感谢您的咨询。如果您想了解更多信息，可以询问：\n- 公司介绍\n- 联系方式\n- 资质荣誉\n- 服务项目\n- 合作伙伴'
        };
        
        // 检查消息中是否包含关键词
        for (const [key, value] of Object.entries(responses)) {
            if (message.toLowerCase().includes(key)) {
                return value;
            }
        }
        
        // 智能匹配相关问题
        if (message.includes('在哪') || message.includes('位置')) {
            return responses['地址'];
        }
        if (message.includes('打电话') || message.includes('联系')) {
            return responses['联系方式'];
        }
        if (message.includes('资质') || message.includes('证书')) {
            return responses['资质'];
        }
        if (message.includes('做什么') || message.includes('业务')) {
            return responses['服务'];
        }
        
        return responses.default;
    }

    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }
}

// 初始化AI助手
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing AI Assistant...');
    new AIAssistant();
}); 