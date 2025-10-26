// 购买页面功能
document.addEventListener('DOMContentLoaded', function() {
    initializePurchase();
    initializePaymentMethods();
    checkURLParams();
});

// 初始化购买页面
function initializePurchase() {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        showNotification('请先登录以购买套餐', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=purchase';
        }, 2000);
        return;
    }
    
    // 初始化按钮状态
    updatePurchaseButton();
}

// 检查URL参数
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    
    if (plan) {
        selectPlan(plan);
    }
}

// 选择套餐
function selectPlan(planType) {
    // 移除所有选中状态
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    const selectedCard = document.querySelector(`[data-plan="${planType}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // 保存选择的套餐
    localStorage.setItem('selectedPlan', planType);
    
    // 更新购买按钮
    updatePurchaseButton();
    
    // 更新步骤
    updateSteps(2);
}

// 初始化支付方式
function initializePaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选中状态
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // 添加选中状态
            this.classList.add('active');
            
            // 保存选择的支付方式
            const method = this.getAttribute('data-method');
            localStorage.setItem('selectedPaymentMethod', method);
        });
    });
}

// 更新购买按钮状态
function updatePurchaseButton() {
    const purchaseBtn = document.getElementById('purchaseBtn');
    const selectedPlan = localStorage.getItem('selectedPlan');
    
    if (selectedPlan) {
        purchaseBtn.disabled = false;
        purchaseBtn.querySelector('.btn-text').textContent = `立即购买 ${selectedPlan.toUpperCase()}`;
    } else {
        purchaseBtn.disabled = true;
        purchaseBtn.querySelector('.btn-text').textContent = '请先选择套餐';
    }
}

// 更新步骤
function updateSteps(stepNumber) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// 处理支付
async function proceedToPayment() {
    const selectedPlan = localStorage.getItem('selectedPlan');
    const selectedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
    
    if (!selectedPlan) {
        showNotification('请先选择套餐', 'error');
        return;
    }
    
    if (!selectedPaymentMethod) {
        showNotification('请选择支付方式', 'error');
        return;
    }
    
    const purchaseBtn = document.getElementById('purchaseBtn');
    setButtonLoading(purchaseBtn, true);
    
    try {
        // 模拟支付过程
        await simulatePayment();
        
        // 支付成功
        showPaymentSuccess(selectedPlan);
        
    } catch (error) {
        showNotification('支付失败，请重试', 'error');
    } finally {
        setButtonLoading(purchaseBtn, false);
    }
}

// 模拟支付过程
function simulatePayment() {
    return new Promise((resolve, reject) => {
        // 显示支付进度
        showNotification('正在处理支付...', 'info');
        
        setTimeout(() => {
            // 模拟90%的成功率
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('支付失败'));
            }
        }, 3000);
    });
}

// 显示支付成功
function showPaymentSuccess(planType) {
    // 更新用户数据
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.isMember = true;
    userData.membershipType = planType;
    userData.membershipStartDate = new Date().toISOString();
    userData.membershipEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30天后
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // 生成订单信息
    const orderNumber = generateOrderNumber();
    const activationTime = new Date().toLocaleString('zh-CN');
    const expiryTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleString('zh-CN');
    
    // 更新模态框内容
    document.getElementById('successPlanName').textContent = planType.toUpperCase();
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('activationTime').textContent = activationTime;
    document.getElementById('expiryTime').textContent = expiryTime;
    
    // 显示模态框
    const modal = document.getElementById('paymentSuccessModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 更新步骤
    updateSteps(3);
}

// 生成订单号
function generateOrderNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TC${timestamp}${random}`;
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

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('paymentSuccessModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
window.addEventListener('click', function(e) {
    const modal = document.getElementById('paymentSuccessModal');
    if (e.target === modal) {
        closeModal();
    }
});

// 导出功能供其他页面使用
window.Purchase = {
    selectPlan,
    proceedToPayment,
    showNotification
};




