// AI陪伴页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化AI陪伴页面
    initializeAICompanion();
    
    // 初始化滚动动画
    initializeScrollAnimations();
    
    // 设置聊天功能
    setupChatFunctionality();
    
    // 设置学习计划生成
    setupPlanningForm();
    
    // 设置报告生成
    setupReportGeneration();
    
    // 设置卡片交互
    setupCardInteractions();
});

// 初始化AI陪伴页面
function initializeAICompanion() {
    // 为所有滚动元素添加动画类
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // 初始化统计数字动画
    animateStats();
    
    // 初始化演示动画
    animateDemos();
}

// 初始化滚动动画
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// 设置聊天功能
function setupChatFunctionality() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.querySelector('.send-btn');
    
    // 发送按钮点击事件
    sendBtn.addEventListener('click', sendMessage);
    
    // 输入框回车事件
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 输入框变化事件
    messageInput.addEventListener('input', function() {
        const hasText = this.value.trim().length > 0;
        sendBtn.style.opacity = hasText ? '1' : '0.6';
        sendBtn.style.cursor = hasText ? 'pointer' : 'not-allowed';
    });
}

// 发送消息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    addMessage(message, 'user');
    
    // 清空输入框
    messageInput.value = '';
    
    // 显示AI正在输入
    showTypingIndicator();
    
    // 模拟AI回复
    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = generateAIResponse(message);
        addMessage(aiResponse, 'ai');
    }, 1500);
}

// 发送快速消息
function sendQuickMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    sendMessage();
}

// 添加消息到聊天界面
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'ai' ? 
        '<i class="fas fa-robot"></i>' : 
        '<i class="fas fa-user"></i>';
    
    const time = new Date().toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${avatar}
        </div>
        <div class="message-content">
            <p>${content}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 添加消息动画
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
        messageDiv.style.transition = 'all 0.3s ease';
    }, 100);
}

// 显示AI正在输入指示器
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 隐藏AI正在输入指示器
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 生成AI回复
function generateAIResponse(userMessage) {
    const responses = {
        '学习效率': '要提高学习效率，建议采用以下方法：\n1. 使用番茄工作法，25分钟专注学习\n2. 制定明确的学习目标\n3. 定期复习和总结\n4. 保持良好的学习环境',
        '学习计划': '我来为你制定一个学习计划。首先，请告诉我你想学习什么技能？预计学习多长时间？每天能投入多少时间？',
        '数据分析': '根据你的学习数据，我发现：\n1. 你的学习时间主要集中在上午\n2. Python学习进度很好\n3. 建议增加实践练习时间\n4. 可以考虑加入学习小组',
        '学习建议': '基于你的学习模式，我建议：\n1. 保持当前的学习节奏\n2. 增加项目实战练习\n3. 定期回顾和总结\n4. 与其他学习者交流心得'
    };
    
    // 简单的关键词匹配
    for (const [keyword, response] of Object.entries(responses)) {
        if (userMessage.includes(keyword)) {
            return response;
        }
    }
    
    // 默认回复
    const defaultResponses = [
        '这是一个很好的问题！让我为你详细分析一下...',
        '根据你的学习情况，我建议你可以尝试以下方法...',
        '我理解你的困惑。让我为你提供一些建议...',
        '这是一个常见的学习问题。让我来帮你解决...'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// 清空聊天记录
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="message ai">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>你好！我是你的学习小助手。我可以帮你分析学习数据、制定学习计划、解答学习疑问。有什么我可以帮助你的吗？</p>
                <span class="message-time">刚刚</span>
            </div>
        </div>
    `;
    showNotification('聊天记录已清空', 'info');
}

// 切换语音功能
function toggleVoice() {
    showNotification('语音功能开发中...', 'info');
}

// 设置学习计划生成
function setupPlanningForm() {
    const planningForm = document.getElementById('planningForm');
    
    planningForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateLearningPlan();
    });
}

// 生成学习计划
function generateLearningPlan() {
    const formData = new FormData(document.getElementById('planningForm'));
    const goal = formData.get('goal') || document.querySelector('input[placeholder*="掌握"]').value;
    const timeFrame = formData.get('timeFrame') || document.querySelector('select').value;
    const dailyTime = formData.get('dailyTime') || document.querySelectorAll('select')[1].value;
    
    if (!goal || !timeFrame || !dailyTime) {
        showNotification('请填写完整信息', 'error');
        return;
    }
    
    // 显示生成中状态
    showNotification('正在生成学习计划...', 'info');
    
    // 模拟生成过程
    setTimeout(() => {
        showPlanningResult();
        showNotification('学习计划生成完成！', 'success');
    }, 2000);
}

// 显示学习计划结果
function showPlanningResult() {
    const planningResult = document.getElementById('planningResult');
    planningResult.style.display = 'block';
    
    // 滚动到结果区域
    planningResult.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // 添加动画效果
    planningResult.style.opacity = '0';
    planningResult.style.transform = 'translateY(20px)';
    setTimeout(() => {
        planningResult.style.opacity = '1';
        planningResult.style.transform = 'translateY(0)';
        planningResult.style.transition = 'all 0.5s ease';
    }, 100);
}

// 保存学习计划
function savePlan() {
    showNotification('学习计划已保存！', 'success');
}

// 重新生成学习计划
function regeneratePlan() {
    const planningResult = document.getElementById('planningResult');
    planningResult.style.display = 'none';
    
    // 清空表单
    document.getElementById('planningForm').reset();
    
    showNotification('请重新填写信息', 'info');
}

// 设置报告生成
function setupReportGeneration() {
    // 报告生成按钮事件已在HTML中设置
}

// 生成报告
function generateReport(type) {
    const reportTypes = {
        weekly: '周报',
        monthly: '月报',
        skills: '技能分析'
    };
    
    showNotification(`正在生成${reportTypes[type]}...`, 'info');
    
    // 模拟生成过程
    setTimeout(() => {
        showNotification(`${reportTypes[type]}生成完成！`, 'success');
        
        // 这里可以添加跳转到报告详情页面的逻辑
        // window.location.href = `report.html?type=${type}`;
    }, 2000);
}

// 设置卡片交互
function setupCardInteractions() {
    // 功能卡片
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        setupCardHover(card);
    });
    
    // 报告卡片
    const reportCards = document.querySelectorAll('.report-card');
    reportCards.forEach(card => {
        setupCardHover(card);
    });
    
    // 建议卡片
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    suggestionCards.forEach(card => {
        setupCardHover(card);
    });
}

// 设置卡片悬停效果
function setupCardHover(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
}

// 统计数字动画
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        
        if (number) {
            animateNumber(stat, 0, number, 2000);
        }
    });
}

// 数字动画函数
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    const originalText = element.textContent;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (range * progress));
        
        // 保持原始格式
        if (originalText.includes('%')) {
            element.textContent = current + '%';
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 演示动画
function animateDemos() {
    // 图表动画
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = height;
        }, index * 200);
    });
    
    // 预测线动画
    const predictionLine = document.querySelector('.prediction-line');
    if (predictionLine) {
        predictionLine.style.width = '0%';
        setTimeout(() => {
            predictionLine.style.width = '100%';
        }, 1000);
    }
    
    // 建议项动画
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'all 0.3s ease';
        }, index * 200);
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#2196F3',
        warning: '#FF9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${colors[type] || colors.info};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 添加打字机效果样式
const style = document.createElement('style');
style.textContent = `
    .typing-indicator .typing-dots {
        display: flex;
        gap: 4px;
        padding: 8px 0;
    }
    
    .typing-indicator .typing-dots span {
        width: 8px;
        height: 8px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-indicator .typing-dots span:nth-child(1) {
        animation-delay: -0.32s;
    }
    
    .typing-indicator .typing-dots span:nth-child(2) {
        animation-delay: -0.16s;
    }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// 导出功能供其他页面使用
window.AICompanion = {
    setupChatFunctionality,
    setupPlanningForm,
    setupReportGeneration,
    generateAIResponse,
    showNotification
};




