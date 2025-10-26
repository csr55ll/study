// 联系我们页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化联系我们页面
    initializeContact();
    
    // 初始化滚动动画
    initializeScrollAnimations();
    
    // 设置联系表单
    setupContactForm();
    
    // 设置FAQ功能
    setupFAQ();
    
    // 设置卡片交互
    setupCardInteractions();
});

// 初始化联系我们页面
function initializeContact() {
    // 为所有滚动元素添加动画类
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });
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

// 设置联系表单
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // 实时验证
    setupFormValidation();
    
    // 字符计数
    setupCharacterCounter();
    
    // 按钮状态管理
    setupButtonStates();
}

// 处理表单提交
async function handleFormSubmission() {
    const submitBtn = document.getElementById('submitBtn');
    setButtonLoading(submitBtn, true);
    
    // 隐藏之前的提示
    hideAlert('successAlert');
    hideAlert('errorAlert');
    
    const formData = new FormData(document.getElementById('contactForm'));
    const formObject = Object.fromEntries(formData);
    
    // 验证表单
    if (!validateForm(formObject)) {
        setButtonLoading(submitBtn, false);
        return;
    }
    
    try {
        // 模拟API调用
        await simulateFormSubmission();
        
        // 显示成功消息
        showAlert('successAlert');
        
        // 重置表单
        document.getElementById('contactForm').reset();
        updateCharacterCounter();
        
        // 生成工单号
        const ticketNumber = generateTicketNumber();
        showNotification(`消息发送成功！工单号：${ticketNumber}，我们会在24小时内回复您。`, 'success');
        
    } catch (error) {
        showAlert('errorAlert');
        document.getElementById('errorMessage').textContent = '发送失败，请检查网络连接后重试。';
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// 验证表单
function validateForm(data) {
    let isValid = true;
    
    // 验证必填字段
    const requiredFields = ['name', 'email', 'subject', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, '此字段为必填项');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // 验证邮箱格式
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', '请输入有效的邮箱地址');
        isValid = false;
    }
    
    // 验证同意条款
    if (!data.agreeTerms) {
        showFieldError('agreeTerms', '请同意隐私政策和服务条款');
        isValid = false;
    } else {
        clearFieldError('agreeTerms');
    }
    
    return isValid;
}

// 设置表单验证
function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    // 邮箱验证
    emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            showFieldError('email', '请输入有效的邮箱地址');
        } else {
            clearFieldError('email');
        }
    });
    
    // 电话验证
    phoneInput.addEventListener('blur', function() {
        if (this.value && !isValidPhone(this.value)) {
            showFieldError('phone', '请输入有效的电话号码');
        } else {
            clearFieldError('phone');
        }
    });
}

// 显示字段错误
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // 添加错误样式
    field.style.borderColor = '#ff4444';
    field.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
    
    // 显示错误消息
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#ff4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '4px';
}

// 清除字段错误
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // 移除错误样式
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    // 隐藏错误消息
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// 设置FAQ功能
function setupFAQ() {
    // FAQ切换功能已在HTML中设置
}

// 切换FAQ
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // 关闭所有FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 如果当前FAQ未激活，则激活它
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// 设置卡片交互
function setupCardInteractions() {
    // 联系方式卡片
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        setupCardHover(card);
    });
    
    // 团队成员卡片
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        setupCardHover(member);
    });
    
    // FAQ项目
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        setupCardHover(item);
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

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('邮箱地址已复制到剪贴板', 'success');
        }).catch(() => {
            showNotification('复制失败', 'error');
        });
    } else {
        // 备用方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('邮箱地址已复制到剪贴板', 'success');
        } catch (err) {
            showNotification('复制失败', 'error');
        }
        document.body.removeChild(textArea);
    }
}

// 打开在线客服
function openCustomerService() {
    showNotification('正在连接在线客服...', 'info');
    
    // 模拟连接过程
    setTimeout(() => {
        showNotification('客服系统开发中，请稍后再试', 'info');
    }, 1000);
}

// 显示微信二维码
function showWechatQR() {
    const modal = document.getElementById('wechatModal');
    modal.classList.add('active');
}

// 关闭微信二维码模态框
function closeWechatModal() {
    const modal = document.getElementById('wechatModal');
    modal.classList.remove('active');
}

// 拨打电话
function callPhone(phoneNumber) {
    if (confirm(`是否要拨打 ${phoneNumber}？`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// 工具函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
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

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// 设置字符计数
function setupCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const charCountElement = document.getElementById('charCount');
    
    if (messageTextarea && charCountElement) {
        messageTextarea.addEventListener('input', updateCharacterCounter);
    }
}

// 更新字符计数
function updateCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const charCountElement = document.getElementById('charCount');
    
    if (messageTextarea && charCountElement) {
        const count = messageTextarea.value.length;
        charCountElement.textContent = count;
        
        // 根据字符数改变颜色
        if (count > 800) {
            charCountElement.style.color = '#ff4444';
        } else if (count > 600) {
            charCountElement.style.color = '#ffa502';
        } else {
            charCountElement.style.color = '#666';
        }
    }
}

// 设置按钮状态管理
function setupButtonStates() {
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            setButtonLoading(this, true);
        });
    }
}

// 设置按钮加载状态
function setButtonLoading(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (isLoading) {
        button.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-block';
    } else {
        button.disabled = false;
        if (btnText) btnText.style.display = 'inline-block';
        if (btnLoading) btnLoading.style.display = 'none';
    }
}

// 显示/隐藏提示
function showAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.style.display = 'block';
    }
}

function hideAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.style.display = 'none';
    }
}

// 显示字段反馈
function showFieldFeedback(fieldId, message, type = 'error') {
    const feedbackElement = document.getElementById(fieldId + 'Feedback');
    if (feedbackElement) {
        feedbackElement.textContent = message;
        feedbackElement.className = `field-feedback ${type}`;
        feedbackElement.style.display = 'block';
    }
}

function hideFieldFeedback(fieldId) {
    const feedbackElement = document.getElementById(fieldId + 'Feedback');
    if (feedbackElement) {
        feedbackElement.style.display = 'none';
    }
}

// 更新验证函数
function validateForm(data) {
    let isValid = true;
    
    // 验证必填字段
    const requiredFields = [
        { id: 'name', value: data.name, message: '请输入姓名' },
        { id: 'email', value: data.email, message: '请输入邮箱地址' },
        { id: 'subject', value: data.subject, message: '请选择主题' },
        { id: 'message', value: data.message, message: '请输入消息内容' }
    ];
    
    requiredFields.forEach(field => {
        if (!field.value || field.value.trim() === '') {
            showFieldFeedback(field.id, field.message, 'error');
            isValid = false;
        } else {
            hideFieldFeedback(field.id);
        }
    });
    
    // 验证邮箱格式
    if (data.email && !isValidEmail(data.email)) {
        showFieldFeedback('email', '请输入有效的邮箱地址', 'error');
        isValid = false;
    }
    
    // 验证电话格式
    if (data.phone && !isValidPhone(data.phone)) {
        showFieldFeedback('phone', '请输入有效的电话号码', 'error');
        isValid = false;
    }
    
    // 验证消息长度
    if (data.message && data.message.length > 1000) {
        showFieldFeedback('message', '消息内容不能超过1000个字符', 'error');
        isValid = false;
    }
    
    // 验证同意条款
    if (!data.agreeTerms) {
        showFieldFeedback('terms', '请同意隐私政策和服务条款', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('terms');
    }
    
    return isValid;
}

// 更新表单验证
function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageTextarea = document.getElementById('message');
    
    // 邮箱验证
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldFeedback('email', '请输入有效的邮箱地址', 'error');
            } else {
                hideFieldFeedback('email');
            }
        });
    }
    
    // 电话验证
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                showFieldFeedback('phone', '请输入有效的电话号码', 'error');
            } else {
                hideFieldFeedback('phone');
            }
        });
    }
    
    // 消息长度验证
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            if (this.value.length > 1000) {
                showFieldFeedback('message', '消息内容不能超过1000个字符', 'error');
            } else {
                hideFieldFeedback('message');
            }
        });
    }
}

// 模拟表单提交
function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟90%的成功率
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('网络错误'));
            }
        }, 2000);
    });
}

// 生成工单号
function generateTicketNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TC${timestamp}${random}`;
}

// 导出功能供其他页面使用
window.Contact = {
    setupContactForm,
    setupFAQ,
    copyToClipboard,
    showNotification,
    showFieldFeedback,
    hideFieldFeedback,
    validateForm
};
