// 社区页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化社区页面
    initializeCommunity();
    
    // 设置排行榜标签页切换
    setupLeaderboardTabs();
    
    // 初始化滚动动画
    initializeScrollAnimations();
    
    // 设置卡片交互
    setupCardInteractions();
    
    // 设置点赞和分享功能
    setupSocialInteractions();
});

// 初始化社区页面
function initializeCommunity() {
    // 为所有滚动元素添加动画类
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // 初始化统计数字动画
    animateStats();
    
    // 初始化进度条动画
    animateProgressBars();
}

// 设置排行榜标签页切换
function setupLeaderboardTabs() {
    const tabBtns = document.querySelectorAll('.leaderboard-tabs .tab-btn');
    const leaderboardTabs = document.querySelectorAll('.leaderboard-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(tab => tab.classList.remove('active'));
            leaderboardTabs.forEach(tab => tab.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // 重新加载排行榜数据
            loadLeaderboardData(targetTab);
        });
    });
}

// 加载排行榜数据
function loadLeaderboardData(period) {
    const leaderboardList = document.querySelector('.leaderboard-list');
    if (!leaderboardList) return;
    
    // 模拟不同时期的数据
    const data = {
        weekly: [
            { rank: 1, name: '张小明', role: 'Python学习者', hours: 156, records: 23, badge: '学习之星' },
            { rank: 2, name: '李小红', role: '写作爱好者', hours: 142, records: 19, badge: '勤奋学习' },
            { rank: 3, name: '王大强', role: '健身达人', hours: 128, records: 17, badge: '坚持不懈' }
        ],
        monthly: [
            { rank: 1, name: '陈小华', role: '全栈开发者', hours: 420, records: 65, badge: '月度冠军' },
            { rank: 2, name: '刘小美', role: '设计师', hours: 398, records: 58, badge: '创意达人' },
            { rank: 3, name: '赵小刚', role: '产品经理', hours: 375, records: 52, badge: '学习狂人' }
        ],
        'all-time': [
            { rank: 1, name: '王大师', role: '终身学习者', hours: 2500, records: 380, badge: '传奇人物' },
            { rank: 2, name: '李专家', role: '技术专家', hours: 2200, records: 350, badge: '技术大牛' },
            { rank: 3, name: '张导师', role: '学习导师', hours: 2000, records: 320, badge: '知识传播者' }
        ]
    };
    
    const currentData = data[period] || data.weekly;
    
    // 清空现有内容
    leaderboardList.innerHTML = '';
    
    // 渲染新数据
    currentData.forEach((user, index) => {
        const leaderboardItem = document.createElement('div');
        leaderboardItem.className = 'leaderboard-item scroll-reveal';
        leaderboardItem.style.animationDelay = `${index * 0.1}s`;
        
        leaderboardItem.innerHTML = `
            <div class="rank">${user.rank}</div>
            <div class="user-info">
                <div class="user-avatar">
                    <img src="https://via.placeholder.com/50" alt="用户头像">
                </div>
                <div class="user-details">
                    <h4>${user.name}</h4>
                    <span>${user.role}</span>
                </div>
            </div>
            <div class="user-stats">
                <div class="stat">
                    <span class="stat-number">${user.hours}</span>
                    <span class="stat-label">学习小时</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${user.records}</span>
                    <span class="stat-label">学习记录</span>
                </div>
            </div>
            <div class="user-badge">
                <i class="fas fa-crown"></i>
                <span>${user.badge}</span>
            </div>
        `;
        
        leaderboardList.appendChild(leaderboardItem);
    });
    
    // 重新初始化滚动动画
    initializeScrollAnimations();
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

// 设置卡片交互
function setupCardInteractions() {
    // 挑战卡片
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        setupCardHover(card);
        setupCardClick(card);
    });
    
    // 学习小组卡片
    const groupCards = document.querySelectorAll('.group-card');
    groupCards.forEach(card => {
        setupCardHover(card);
        setupCardClick(card);
    });
    
    // 学习故事卡片
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        setupCardHover(card);
        setupCardClick(card);
    });
    
    // 统计卡片
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
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

// 设置卡片点击效果
function setupCardClick(card) {
    card.addEventListener('click', function() {
        // 添加点击动画
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// 设置社交交互功能
function setupSocialInteractions() {
    // 点赞功能
    const likeButtons = document.querySelectorAll('.story-actions .btn-outline');
    likeButtons.forEach(button => {
        if (button.innerHTML.includes('heart')) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                handleLike(this);
            });
        }
    });
    
    // 分享功能
    const shareButtons = document.querySelectorAll('.story-actions .btn-outline');
    shareButtons.forEach(button => {
        if (button.innerHTML.includes('share')) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                handleShare(this);
            });
        }
    });
}

// 处理点赞
function handleLike(button) {
    const isLiked = button.classList.contains('liked');
    const heartIcon = button.querySelector('i');
    
    if (isLiked) {
        // 取消点赞
        button.classList.remove('liked');
        heartIcon.style.color = '';
        button.style.color = '';
        showNotification('已取消点赞', 'info');
    } else {
        // 点赞
        button.classList.add('liked');
        heartIcon.style.color = '#ff4444';
        button.style.color = '#ff4444';
        
        // 添加点赞动画
        heartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 200);
        
        showNotification('点赞成功！', 'success');
    }
}

// 处理分享
function handleShare(button) {
    if (navigator.share) {
        navigator.share({
            title: '学习故事分享',
            text: '来看看这个有趣的学习故事！',
            url: window.location.href
        }).then(() => {
            showNotification('分享成功！', 'success');
        }).catch(() => {
            showNotification('分享失败', 'error');
        });
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('链接已复制到剪贴板', 'success');
        }).catch(() => {
            showNotification('复制失败', 'error');
        });
    }
}

// 统计数字动画
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3, .stat-number');
    
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
        
        // 保持原始格式（如 "10,000+"）
        if (originalText.includes(',')) {
            element.textContent = current.toLocaleString() + '+';
        } else if (originalText.includes('+')) {
            element.textContent = current + '+';
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 进度条动画
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 挑战参与功能
function setupChallengeParticipation() {
    const participateButtons = document.querySelectorAll('.challenge-actions .btn-primary');
    
    participateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const challengeCard = this.closest('.challenge-card');
            const challengeTitle = challengeCard.querySelector('h3').textContent;
            
            showNotification(`正在加入"${challengeTitle}"挑战...`, 'info');
            
            // 模拟加入挑战
            setTimeout(() => {
                showNotification('成功加入挑战！', 'success');
                this.textContent = '已参与';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.disabled = true;
            }, 1500);
        });
    });
}

// 学习小组加入功能
function setupGroupJoining() {
    const joinButtons = document.querySelectorAll('.group-actions .btn-primary');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const groupCard = this.closest('.group-card');
            const groupName = groupCard.querySelector('h3').textContent;
            
            showNotification(`正在加入"${groupName}"...`, 'info');
            
            // 模拟加入小组
            setTimeout(() => {
                showNotification('成功加入学习小组！', 'success');
                this.textContent = '已加入';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.disabled = true;
            }, 1500);
        });
    });
}

// 初始化挑战和小组功能
setupChallengeParticipation();
setupGroupJoining();

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

// 导出功能供其他页面使用
window.Community = {
    setupLeaderboardTabs,
    initializeScrollAnimations,
    setupCardInteractions,
    setupSocialInteractions,
    animateStats,
    showNotification
};




