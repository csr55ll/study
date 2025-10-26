// 平滑滚动
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

// 滚动动画观察器
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

// 初始化滚动动画
function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

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

// 时间线动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有卡片添加观察
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .timeline-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

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

// 按钮悬停效果
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeFeatureCards();
    initializeTimelineHover();
    
    // 备用方案：确保功能卡片在3秒后显示，即使滚动动画失败
    setTimeout(() => {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
            }
        });
    }, 3000);
});

// 初始化功能卡片动画
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // 确保卡片有scroll-reveal类
        if (!card.classList.contains('scroll-reveal')) {
            card.classList.add('scroll-reveal');
        }
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// 初始化时间线悬停效果
function initializeTimelineHover() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// 数字计数动画
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

// 统计数字动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalNumber = parseInt(statNumber.textContent.replace(/,/g, ''));
            animateNumber(statNumber, 0, finalNumber, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stat => {
    statsObserver.observe(stat);
});

// 模拟AI生成内容
function generateAIContent() {
    const aiMessages = [
        "今天你完成了80%的学习计划，继续保持！",
        "你的Python技能正在稳步提升，建议明天尝试更复杂的项目。",
        "写作练习很有成效，你的表达能力在持续改善。",
        "健身计划执行得很好，身体状态正在向目标靠近。",
        "学习记录显示你正在建立良好的学习习惯。"
    ];
    
    return aiMessages[Math.floor(Math.random() * aiMessages.length)];
}

// 模拟学习记录功能
function addLearningRecord() {
    const record = {
        date: new Date().toLocaleDateString('zh-CN'),
        content: generateAIContent(),
        type: 'learning',
        progress: Math.floor(Math.random() * 40) + 60 // 60-100%
    };
    
    console.log('学习记录:', record);
    return record;
}

// 模拟目标设定
function createGoal(goalData) {
    const goal = {
        id: Date.now(),
        title: goalData.title,
        description: goalData.description,
        targetDate: goalData.targetDate,
        milestones: goalData.milestones || [],
        progress: 0,
        createdAt: new Date().toISOString()
    };
    
    console.log('新目标:', goal);
    return goal;
}

// 模拟技能树生成
function generateSkillTree(skills) {
    const skillTree = {
        categories: {
            '技术技能': skills.filter(s => ['Python', 'JavaScript', 'React', 'Node.js'].includes(s)),
            '软技能': skills.filter(s => ['写作', '演讲', '领导力', '沟通'].includes(s)),
            '兴趣爱好': skills.filter(s => ['摄影', '绘画', '音乐', '健身'].includes(s))
        },
        totalSkills: skills.length,
        masteredSkills: skills.filter(s => Math.random() > 0.5).length
    };
    
    console.log('技能树:', skillTree);
    return skillTree;
}

// 模拟成长报告生成
function generateGrowthReport() {
    const report = {
        period: '本月',
        totalLearningTime: Math.floor(Math.random() * 50) + 20, // 20-70小时
        completedGoals: Math.floor(Math.random() * 5) + 1, // 1-6个目标
        newSkills: Math.floor(Math.random() * 3) + 1, // 1-4个新技能
        insights: [
            "你在技术学习方面表现突出",
            "建议增加实践项目的比重",
            "学习时间分布较为均匀",
            "可以考虑挑战更高级的目标"
        ],
        recommendations: [
            "尝试将所学技能应用到实际项目中",
            "考虑加入学习小组与他人交流",
            "设定下个月的挑战性目标"
        ]
    };
    
    console.log('成长报告:', report);
    return report;
}

// 导出功能供其他页面使用
window.MyChronicle = {
    generateAIContent,
    addLearningRecord,
    createGoal,
    generateSkillTree,
    generateGrowthReport
};
