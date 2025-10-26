// 功能介绍页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化功能页面
    initializeFeatures();
    
    // 设置标签页切换
    setupTabSwitching();
    
    // 初始化滚动动画
    initializeScrollAnimations();
    
    // 设置演示卡片交互
    setupDemoInteractions();
});

// 初始化功能页面
function initializeFeatures() {
    // 为所有滚动元素添加动画类
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    scrollElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });
}

// 设置标签页切换
function setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const featureSections = document.querySelectorAll('.feature-section');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(tab => tab.classList.remove('active'));
            featureSections.forEach(section => section.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // 滚动到功能详情区域
            document.querySelector('.feature-details').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
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
    
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// 设置演示卡片交互
function setupDemoInteractions() {
    const demoCards = document.querySelectorAll('.demo-card');
    
    demoCards.forEach(card => {
        // 悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        // 点击效果
        card.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // 技能树动画
    setupSkillTreeAnimation();
    
    // 进度条动画
    setupProgressBarAnimation();
    
    // 聊天消息动画
    setupChatAnimation();
}

// 设置技能树动画
function setupSkillTreeAnimation() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// 设置进度条动画
function setupProgressBarAnimation() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 设置聊天动画
function setupChatAnimation() {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        message.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 功能项悬停效果
function setupFeatureItemHover() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// 初始化功能项悬停效果
setupFeatureItemHover();

// 按钮点击效果
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 功能图标动画
function animateFeatureIcons() {
    const icons = document.querySelectorAll('.feature-icon-large');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 15px 40px rgba(74, 144, 226, 0.4)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(74, 144, 226, 0.3)';
        });
    });
}

// 初始化功能图标动画
animateFeatureIcons();

// 统计数字动画
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent.replace(/,/g, ''));
        animateNumber(stat, 0, finalNumber, 2000);
    });
}

// 数字动画函数
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (range * progress));
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 页面加载完成后启动统计动画
setTimeout(animateStats, 1000);

// 功能对比表格交互
function setupComparisonTable() {
    const featureRows = document.querySelectorAll('.feature-row');
    
    featureRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--bg-accent)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // 价格列悬停效果
    const planColumns = document.querySelectorAll('.plan-column');
    
    planColumns.forEach(column => {
        column.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
        
        column.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// 初始化功能对比表格
setupComparisonTable();

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

// 导出功能供其他页面使用
window.Features = {
    setupTabSwitching,
    initializeScrollAnimations,
    setupDemoInteractions,
    animateStats
};




