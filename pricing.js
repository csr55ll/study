// 价格页面功能
document.addEventListener('DOMContentLoaded', function() {
    initializeBillingToggle();
    initializeFAQ();
    initializeScrollAnimations();
});

// 计费周期切换
function initializeBillingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const yearlyPrices = document.querySelectorAll('.price.yearly');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                // 切换到年付
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            } else {
                // 切换到月付
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
}

// FAQ 展开/收起
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 关闭其他FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ项
            item.classList.toggle('active');
        });
    });
}

// 滚动动画
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
    
    // 观察所有需要动画的元素
    const scrollElements = document.querySelectorAll('.plan-card, .faq-item, .testimonial-card');
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// 购买按钮点击处理
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href*="purchase.html"]')) {
        e.preventDefault();
        const plan = e.target.getAttribute('href').split('plan=')[1];
        handlePurchase(plan);
    }
});

function handlePurchase(plan) {
    // 检查用户是否已登录
    const isLoggedIn = checkLoginStatus();
    
    if (!isLoggedIn) {
        // 未登录，跳转到登录页面
        window.location.href = 'login.html?redirect=purchase&plan=' + plan;
        return;
    }
    
    // 已登录，跳转到购买页面
    window.location.href = 'purchase.html?plan=' + plan;
}

function checkLoginStatus() {
    // 这里应该检查实际的登录状态
    // 现在返回false，表示未登录
    return false;
}

// 按钮悬停效果
document.addEventListener('mouseenter', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-outline')) {
        e.target.style.transform = 'translateY(-2px)';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-outline')) {
        e.target.style.transform = 'translateY(0)';
    }
}, true);




