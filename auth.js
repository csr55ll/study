// 认证页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 检查URL参数
    checkURLParams();
    
    // 初始化认证页面
    initializeAuth();
    
    // 设置表单验证
    setupFormValidation();
    
    // 设置密码强度检测
    setupPasswordStrength();
    
    // 设置社交登录
    setupSocialLogin();
    
    // 设置按钮状态管理
    setupButtonStates();
});

// 初始化认证页面
function initializeAuth() {
    // 设置标签页切换
    setupTabSwitching();
    
    // 设置表单提交
    setupFormSubmission();
    
    // 设置输入动画
    setupInputAnimations();
}

// 设置标签页切换
function setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(tab => tab.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab + 'Form').classList.add('active');
            
            // 清除表单数据
            clearForms();
        });
    });
}

// 设置表单提交
function setupFormSubmission() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// 处理登录
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email') || document.getElementById('loginEmail').value;
    const password = formData.get('password') || document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // 验证表单
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    // 显示加载动画
    showLoading('正在登录...');
    
    try {
        // 模拟API调用
        await simulateAPICall(1500);
        
        // 模拟登录成功
        const userData = {
            email: email,
            name: '学习者',
            level: 5,
            avatar: null
        };
        
        // 保存用户数据
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // 显示成功消息
        showNotification('登录成功！正在跳转...', 'success');
        
        // 跳转到仪表板
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showNotification('登录失败，请检查邮箱和密码', 'error');
    } finally {
        hideLoading();
    }
}

// 处理注册
async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // 验证表单
    if (!validateRegisterForm(firstName, lastName, email, password, confirmPassword, agreeTerms)) {
        return;
    }
    
    // 显示加载动画
    showLoading('正在创建账户...');
    
    try {
        // 模拟API调用
        await simulateAPICall(2000);
        
        // 模拟注册成功
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            name: `${firstName} ${lastName}`,
            level: 1,
            avatar: null,
            joinDate: new Date().toISOString()
        };
        
        // 保存用户数据
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // 显示成功消息
        showNotification('账户创建成功！正在跳转...', 'success');
        
        // 跳转到仪表板
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showNotification('注册失败，请稍后重试', 'error');
    } finally {
        hideLoading();
    }
}

// 验证登录表单
function validateLoginForm(email, password) {
    let isValid = true;
    
    // 验证邮箱
    if (!email || !isValidEmail(email)) {
        showFieldError('loginEmail', '请输入有效的邮箱地址');
        isValid = false;
    } else {
        clearFieldError('loginEmail');
    }
    
    // 验证密码
    if (!password || password.length < 6) {
        showFieldError('loginPassword', '密码至少需要6个字符');
        isValid = false;
    } else {
        clearFieldError('loginPassword');
    }
    
    return isValid;
}

// 验证注册表单
function validateRegisterForm(firstName, lastName, email, password, confirmPassword, agreeTerms) {
    let isValid = true;
    
    // 验证姓名
    if (!firstName.trim()) {
        showFieldError('firstName', '请输入姓名');
        isValid = false;
    } else {
        clearFieldError('firstName');
    }
    
    if (!lastName.trim()) {
        showFieldError('lastName', '请输入姓氏');
        isValid = false;
    } else {
        clearFieldError('lastName');
    }
    
    // 验证邮箱
    if (!email || !isValidEmail(email)) {
        showFieldError('registerEmail', '请输入有效的邮箱地址');
        isValid = false;
    } else {
        clearFieldError('registerEmail');
    }
    
    // 验证密码
    if (!password || password.length < 8) {
        showFieldError('registerPassword', '密码至少需要8个字符');
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showFieldError('registerPassword', '密码强度不够，请包含大小写字母、数字和特殊字符');
        isValid = false;
    } else {
        clearFieldError('registerPassword');
    }
    
    // 验证确认密码
    if (password !== confirmPassword) {
        showFieldError('confirmPassword', '两次输入的密码不一致');
        isValid = false;
    } else {
        clearFieldError('confirmPassword');
    }
    
    // 验证同意条款
    if (!agreeTerms) {
        showFieldError('agreeTerms', '请同意服务条款和隐私政策');
        isValid = false;
    } else {
        clearFieldError('agreeTerms');
    }
    
    return isValid;
}

// 设置表单验证
function setupFormValidation() {
    // 实时验证邮箱
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldError(this.id, '请输入有效的邮箱地址');
            } else {
                clearFieldError(this.id);
            }
        });
    });
    
    // 实时验证密码确认
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordInput = document.getElementById('registerPassword');
    
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            if (this.value && this.value !== passwordInput.value) {
                showFieldError(this.id, '两次输入的密码不一致');
            } else {
                clearFieldError(this.id);
            }
        });
    }
}

// 设置密码强度检测
function setupPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrength(strength);
    });
}

// 计算密码强度
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    if (score <= 5) return 'strong';
    return 'very-strong';
}

// 更新密码强度显示
function updatePasswordStrength(strength) {
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthFill || !strengthText) return;
    
    // 移除所有强度类
    strengthFill.classList.remove('weak', 'medium', 'strong', 'very-strong');
    
    // 添加当前强度类
    strengthFill.classList.add(strength);
    
    // 更新文本
    const strengthLabels = {
        'weak': '密码强度：弱',
        'medium': '密码强度：中等',
        'strong': '密码强度：强',
        'very-strong': '密码强度：很强'
    };
    
    strengthText.textContent = strengthLabels[strength] || '密码强度：弱';
}

// 设置社交登录
function setupSocialLogin() {
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', handleGithubLogin);
    }
}

// 处理Google登录
function handleGoogleLogin() {
    showNotification('Google登录功能开发中...', 'info');
    // 这里可以集成Google OAuth
}

// 处理GitHub登录
function handleGithubLogin() {
    showNotification('GitHub登录功能开发中...', 'info');
    // 这里可以集成GitHub OAuth
}

// 设置输入动画
function setupInputAnimations() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// 切换密码显示
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
    }
}

// 显示字段错误
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const inputGroup = field.closest('.input-group') || field.closest('.form-group');
    if (!inputGroup) return;
    
    // 添加错误样式
    field.classList.add('error');
    inputGroup.classList.add('error');
    
    // 显示错误消息
    let errorElement = inputGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// 清除字段错误
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const inputGroup = field.closest('.input-group') || field.closest('.form-group');
    if (!inputGroup) return;
    
    // 移除错误样式
    field.classList.remove('error');
    inputGroup.classList.remove('error');
    
    // 隐藏错误消息
    const errorElement = inputGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// 清除所有表单
function clearForms() {
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.reset();
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.classList.remove('show'));
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        const errorGroups = form.querySelectorAll('.form-group.error, .input-group.error');
        errorGroups.forEach(group => group.classList.remove('error'));
    });
    
    // 重置密码强度
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    if (strengthFill) {
        strengthFill.className = 'strength-fill';
    }
    if (strengthText) {
        strengthText.textContent = '密码强度：弱';
    }
}

// 显示加载动画
function showLoading(message = '正在处理...') {
    const overlay = document.getElementById('loadingOverlay');
    const messageElement = overlay.querySelector('p');
    
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    overlay.classList.add('active');
}

// 隐藏加载动画
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
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

// 工具函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStrongPassword(password) {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    
    return password.length >= 8 && hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChar;
}

function simulateAPICall(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟90%的成功率
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('API调用失败'));
            }
        }, delay);
    });
}

// 检查是否已登录
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // 如果已登录，跳转到仪表板
        window.location.href = 'dashboard.html';
    }
}

// 页面加载时检查登录状态
checkAuthStatus();

// 检查URL参数
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    const plan = urlParams.get('plan');
    
    if (redirect === 'purchase' && plan) {
        // 如果是从购买页面跳转来的，显示相应提示
        showNotification(`请先登录以购买 ${plan} 套餐`, 'info');
    }
}

// 设置按钮状态管理
function setupButtonStates() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            setButtonLoading(this, true);
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
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

// 显示/隐藏错误提示
function showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        const errorText = container.querySelector('span');
        if (errorText) {
            errorText.textContent = message;
        }
        container.style.display = 'block';
    }
}

function hideError(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'none';
    }
}

function showSuccess(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'block';
    }
}

function hideSuccess(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'none';
    }
}

// 显示字段反馈
function showFieldFeedback(fieldId, message, type = 'error') {
    const feedbackElement = document.getElementById(fieldId + 'Feedback');
    if (feedbackElement) {
        feedbackElement.textContent = message;
        feedbackElement.className = `input-feedback ${type}`;
        feedbackElement.style.display = 'block';
    }
}

function hideFieldFeedback(fieldId) {
    const feedbackElement = document.getElementById(fieldId + 'Feedback');
    if (feedbackElement) {
        feedbackElement.style.display = 'none';
    }
}

// 忘记密码功能
function showForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function sendResetEmail() {
    const email = document.getElementById('resetEmail').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return;
    }
    
    // 模拟发送重置邮件
    showNotification('重置密码链接已发送到您的邮箱', 'success');
    closeForgotPasswordModal();
}

// 社交登录
function socialLogin(provider) {
    showNotification(`${provider} 登录功能即将推出`, 'info');
    // 这里可以集成实际的OAuth登录
}

// 更新处理登录函数
async function handleLogin(e) {
    e.preventDefault();
    
    const loginBtn = document.getElementById('loginBtn');
    setButtonLoading(loginBtn, true);
    
    // 隐藏之前的错误和成功提示
    hideError('loginError');
    hideSuccess('loginSuccess');
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // 验证表单
    if (!validateLoginForm(email, password)) {
        setButtonLoading(loginBtn, false);
        return;
    }
    
    try {
        // 模拟API调用
        await simulateAPICall(1500);
        
        // 模拟登录成功
        const userData = {
            email: email,
            name: '学习者',
            level: 5,
            avatar: null,
            isMember: false // 默认非会员
        };
        
        // 保存用户数据
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // 显示成功消息
        showSuccess('loginSuccess');
        
        // 跳转到相应页面
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            
            if (redirect === 'purchase') {
                window.location.href = 'purchase.html?' + window.location.search;
            } else if (redirect === 'members') {
                window.location.href = 'members.html';
            } else {
                window.location.href = 'account.html';
            }
        }, 1500);
        
    } catch (error) {
        showError('loginError', '登录失败，请检查邮箱和密码');
    } finally {
        setButtonLoading(loginBtn, false);
    }
}

// 更新处理注册函数
async function handleRegister(e) {
    e.preventDefault();
    
    const registerBtn = document.getElementById('registerBtn');
    setButtonLoading(registerBtn, true);
    
    // 隐藏之前的错误和成功提示
    hideError('registerError');
    hideSuccess('registerSuccess');
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // 验证表单
    if (!validateRegisterForm(firstName, lastName, email, password, confirmPassword, agreeTerms)) {
        setButtonLoading(registerBtn, false);
        return;
    }
    
    try {
        // 模拟API调用
        await simulateAPICall(2000);
        
        // 模拟注册成功
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            name: `${firstName} ${lastName}`,
            level: 1,
            avatar: null,
            joinDate: new Date().toISOString(),
            isMember: false // 默认非会员
        };
        
        // 保存用户数据
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // 显示成功消息
        showSuccess('registerSuccess');
        
        // 跳转到账户中心
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1500);
        
    } catch (error) {
        showError('registerError', '注册失败，请稍后重试');
    } finally {
        setButtonLoading(registerBtn, false);
    }
}

// 更新验证函数，使用新的反馈系统
function validateLoginForm(email, password) {
    let isValid = true;
    
    // 验证邮箱
    if (!email || !isValidEmail(email)) {
        showFieldFeedback('loginEmail', '请输入有效的邮箱地址', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('loginEmail');
    }
    
    // 验证密码
    if (!password || password.length < 6) {
        showFieldFeedback('loginPassword', '密码至少需要6个字符', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('loginPassword');
    }
    
    return isValid;
}

function validateRegisterForm(firstName, lastName, email, password, confirmPassword, agreeTerms) {
    let isValid = true;
    
    // 验证姓名
    if (!firstName.trim()) {
        showFieldFeedback('firstName', '请输入姓名', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('firstName');
    }
    
    if (!lastName.trim()) {
        showFieldFeedback('lastName', '请输入姓氏', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('lastName');
    }
    
    // 验证邮箱
    if (!email || !isValidEmail(email)) {
        showFieldFeedback('registerEmail', '请输入有效的邮箱地址', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('registerEmail');
    }
    
    // 验证密码
    if (!password || password.length < 8) {
        showFieldFeedback('registerPassword', '密码至少需要8个字符', 'error');
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showFieldFeedback('registerPassword', '密码强度不够，请包含大小写字母、数字和特殊字符', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('registerPassword');
    }
    
    // 验证确认密码
    if (password !== confirmPassword) {
        showFieldFeedback('confirmPassword', '两次输入的密码不一致', 'error');
        isValid = false;
    } else {
        hideFieldFeedback('confirmPassword');
    }
    
    // 验证同意条款
    if (!agreeTerms) {
        showNotification('请同意服务条款和隐私政策', 'error');
        isValid = false;
    }
    
    return isValid;
}

// 更新密码强度显示
function updatePasswordStrength(strength) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    // 移除所有强度类
    strengthFill.className = 'strength-fill';
    
    // 添加当前强度类和颜色
    const strengthConfig = {
        'weak': { class: 'weak', color: '#ff4757', text: '密码强度：弱' },
        'medium': { class: 'medium', color: '#ffa502', text: '密码强度：中等' },
        'strong': { class: 'strong', color: '#2ed573', text: '密码强度：强' },
        'very-strong': { class: 'very-strong', color: '#1e90ff', text: '密码强度：很强' }
    };
    
    const config = strengthConfig[strength] || strengthConfig['weak'];
    strengthFill.classList.add(config.class);
    strengthFill.style.backgroundColor = config.color;
    strengthText.textContent = config.text;
}

// 导出功能供其他页面使用
window.Auth = {
    showNotification,
    validateLoginForm,
    validateRegisterForm,
    checkAuthStatus,
    showError,
    hideError,
    showSuccess,
    hideSuccess
};

