// 仪表板交互功能

// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializeDashboard();
    
    // 设置导航切换
    setupNavigation();
    
    // 初始化图表
    initializeCharts();
    
    // 设置模态框
    setupModals();
});

// 初始化仪表板
function initializeDashboard() {
    // 显示默认页面
    showSection('overview');
    
    // 加载用户数据
    loadUserData();
    
    // 设置实时更新
    setupRealTimeUpdates();
}

// 设置导航切换
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 获取目标页面
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
}

// 显示指定页面
function showSection(sectionId) {
    // 隐藏所有页面
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标页面
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // 根据页面类型执行特定初始化
        switch(sectionId) {
            case 'overview':
                updateOverviewData();
                break;
            case 'goals':
                loadGoalsData();
                break;
            case 'timeline':
                loadTimelineData();
                break;
            case 'skills':
                loadSkillsData();
                break;
            case 'records':
                loadRecordsData();
                break;
            case 'ai-report':
                loadAIReport();
                break;
            case 'profile':
                loadProfileData();
                break;
        }
    }
}

// 加载用户数据
function loadUserData() {
    // 模拟用户数据
    const userData = {
        name: '学习者',
        level: 5,
        joinDate: '2024年1月',
        learningDays: 23,
        totalHours: 156,
        activeGoals: 12,
        completedGoals: 8,
        streak: 23
    };
    
    // 更新用户信息显示
    updateUserInfo(userData);
}

// 更新用户信息
function updateUserInfo(data) {
    const userName = document.querySelector('.user-name');
    const userLevel = document.querySelector('.user-level');
    
    if (userName) userName.textContent = data.name;
    if (userLevel) userLevel.textContent = `Level ${data.level}`;
}

// 更新总览数据
function updateOverviewData() {
    // 更新统计数据
    const stats = [
        { selector: '.stat-card:nth-child(1) h3', value: '12' },
        { selector: '.stat-card:nth-child(2) h3', value: '156' },
        { selector: '.stat-card:nth-child(3) h3', value: '8' },
        { selector: '.stat-card:nth-child(4) h3', value: '23' }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) {
            animateNumber(element, 0, parseInt(stat.value), 1000);
        }
    });
}

// 数字动画
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (range * progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 初始化图表
function initializeCharts() {
    // 学习进度图表
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [{
                    label: '学习小时数',
                    data: [12, 19, 25, 22, 28, 35],
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#E2E8F0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// 加载目标数据
function loadGoalsData() {
    // 模拟目标数据
    const goals = [
        {
            id: 1,
            title: '掌握Python编程',
            description: '从基础语法到高级特性，全面掌握Python编程语言',
            progress: 65,
            status: 'active',
            milestones: [
                { name: '基础语法', completed: true },
                { name: '数据结构', completed: true },
                { name: '面向对象', completed: false, active: true },
                { name: '高级特性', completed: false }
            ]
        },
        {
            id: 2,
            title: '提升写作能力',
            description: '通过每日写作练习，提升表达能力和文字功底',
            progress: 40,
            status: 'active',
            milestones: [
                { name: '建立习惯', completed: true },
                { name: '技巧提升', completed: false, active: true },
                { name: '风格形成', completed: false }
            ]
        }
    ];
    
    // 渲染目标卡片
    renderGoals(goals);
}

// 渲染目标卡片
function renderGoals(goals) {
    const goalsGrid = document.querySelector('.goals-grid');
    if (!goalsGrid) return;
    
    goalsGrid.innerHTML = goals.map(goal => `
        <div class="goal-card">
            <div class="goal-header">
                <h3>${goal.title}</h3>
                <span class="goal-status ${goal.status}">${goal.status === 'active' ? '进行中' : '已完成'}</span>
            </div>
            <p class="goal-description">${goal.description}</p>
            <div class="goal-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${goal.progress}%"></div>
                </div>
                <span class="progress-text">${goal.progress}%</span>
            </div>
            <div class="goal-milestones">
                ${goal.milestones.map(milestone => `
                    <div class="milestone ${milestone.completed ? 'completed' : milestone.active ? 'active' : ''}">
                        <i class="fas ${milestone.completed ? 'fa-check' : milestone.active ? 'fa-clock' : 'fa-circle'}"></i>
                        <span>${milestone.name}</span>
                    </div>
                `).join('')}
            </div>
            <div class="goal-actions">
                <button class="btn-small btn-primary" onclick="updateGoalProgress(${goal.id})">更新进度</button>
                <button class="btn-small btn-outline" onclick="editGoal(${goal.id})">编辑</button>
            </div>
        </div>
    `).join('');
}

// 加载时间线数据
function loadTimelineData() {
    // 模拟时间线数据
    const timelineData = [
        {
            date: '今天',
            time: '14:30',
            icon: 'fas fa-code',
            title: 'Python数据结构学习',
            description: '完成了列表、字典、元组等数据结构的深入学习，并完成了相关练习题。',
            tags: ['Python', '编程']
        },
        {
            date: '昨天',
            time: '20:15',
            icon: 'fas fa-pen',
            title: '技术博客写作',
            description: '写了一篇关于Python最佳实践的文章，分享了学习过程中的心得体会。',
            tags: ['写作', '技术分享']
        },
        {
            date: '2天前',
            time: '16:45',
            icon: 'fas fa-dumbbell',
            title: '健身训练',
            description: '完成了30分钟的有氧运动，包括跑步和力量训练，感觉身体状态很好。',
            tags: ['健身', '健康']
        }
    ];
    
    // 渲染时间线
    renderTimeline(timelineData);
}

// 渲染时间线
function renderTimeline(data) {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    timelineContainer.innerHTML = data.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">
                <span class="date">${item.date}</span>
                <span class="time">${item.time}</span>
            </div>
            <div class="timeline-content">
                <div class="timeline-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="timeline-details">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="timeline-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 加载技能数据
function loadSkillsData() {
    // 模拟技能数据
    const skillsData = {
        '技术技能': [
            { name: 'Python', level: 80, status: 'mastered', icon: 'fab fa-python' },
            { name: 'JavaScript', level: 60, status: 'learning', icon: 'fab fa-js' },
            { name: 'React', level: 30, status: 'beginner', icon: 'fab fa-react' }
        ],
        '软技能': [
            { name: '写作', level: 75, status: 'mastered', icon: 'fas fa-pen-fancy' },
            { name: '演讲', level: 50, status: 'learning', icon: 'fas fa-microphone' }
        ]
    };
    
    // 渲染技能树
    renderSkills(skillsData);
}

// 渲染技能树
function renderSkills(data) {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = Object.entries(data).map(([category, skills]) => `
        <div class="skill-category">
            <h3>${category}</h3>
            <div class="skills-grid">
                ${skills.map(skill => `
                    <div class="skill-item ${skill.status}">
                        <div class="skill-icon">
                            <i class="${skill.icon}"></i>
                        </div>
                        <div class="skill-info">
                            <h4>${skill.name}</h4>
                            <div class="skill-level">
                                <div class="level-bar">
                                    <div class="level-fill" style="width: ${skill.level}%"></div>
                                </div>
                                <span>${getSkillLevel(skill.level)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 获取技能等级
function getSkillLevel(percentage) {
    if (percentage >= 80) return '高级';
    if (percentage >= 60) return '中级';
    if (percentage >= 30) return '初级';
    return '入门';
}

// 加载学习记录数据
function loadRecordsData() {
    // 模拟学习记录数据
    const records = [
        {
            type: '编程学习',
            icon: 'fas fa-code',
            date: '今天 14:30',
            title: 'Python数据结构深入学习',
            content: '今天主要学习了Python中的列表、字典、元组等数据结构。通过大量的练习，对数据结构的操作有了更深入的理解。特别是字典的嵌套使用，让我对复杂数据的处理有了新的认识。',
            tags: ['Python', '数据结构', '编程']
        },
        {
            type: '写作练习',
            icon: 'fas fa-pen',
            date: '昨天 20:15',
            title: '技术博客写作',
            content: '写了一篇关于Python最佳实践的技术文章，分享了自己在学习过程中的心得体会。文章结构清晰，逻辑性强，得到了很多读者的好评。',
            tags: ['写作', '技术分享', '博客']
        }
    ];
    
    // 渲染学习记录
    renderRecords(records);
}

// 渲染学习记录
function renderRecords(records) {
    const recordsContainer = document.querySelector('.records-container');
    if (!recordsContainer) return;
    
    recordsContainer.innerHTML = records.map(record => `
        <div class="record-card">
            <div class="record-header">
                <div class="record-type">
                    <i class="${record.icon}"></i>
                    <span>${record.type}</span>
                </div>
                <span class="record-date">${record.date}</span>
            </div>
            <div class="record-content">
                <h4>${record.title}</h4>
                <p>${record.content}</p>
                <div class="record-tags">
                    ${record.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="record-actions">
                <button class="btn-small btn-outline" onclick="editRecord('${record.title}')">
                    <i class="fas fa-edit"></i>
                    编辑
                </button>
                <button class="btn-small btn-outline" onclick="shareRecord('${record.title}')">
                    <i class="fas fa-share"></i>
                    分享
                </button>
            </div>
        </div>
    `).join('');
}

// 加载AI报告
function loadAIReport() {
    // 模拟AI报告数据
    const reportData = {
        period: '本月',
        date: '2024年1月',
        stats: {
            learningHours: 42,
            records: 15,
            completedGoals: 3
        },
        insights: [
            '你在Python学习方面表现突出，建议继续保持这种学习节奏。',
            '学习时间分布较为均匀，说明你建立了良好的学习习惯。',
            '建议下个月挑战更高级的编程项目，将所学知识应用到实践中。'
        ],
        recommendations: [
            '尝试将Python技能应用到实际项目中',
            '考虑学习前端框架，如React或Vue',
            '参与开源项目，提升代码协作能力',
            '定期复习已学知识，巩固基础'
        ]
    };
    
    // 渲染AI报告
    renderAIReport(reportData);
}

// 渲染AI报告
function renderAIReport(data) {
    const reportContainer = document.querySelector('.ai-report-container');
    if (!reportContainer) return;
    
    reportContainer.innerHTML = `
        <div class="report-card">
            <div class="report-header">
                <div class="report-title">
                    <h3>${data.period}成长报告</h3>
                    <span class="report-date">${data.date}</span>
                </div>
                <div class="report-avatar">
                    <i class="fas fa-robot"></i>
                </div>
            </div>
            <div class="report-content">
                <div class="report-section">
                    <h4>学习概览</h4>
                    <div class="report-stats">
                        <div class="report-stat">
                            <span class="stat-value">${data.stats.learningHours}</span>
                            <span class="stat-label">学习小时</span>
                        </div>
                        <div class="report-stat">
                            <span class="stat-value">${data.stats.records}</span>
                            <span class="stat-label">学习记录</span>
                        </div>
                        <div class="report-stat">
                            <span class="stat-value">${data.stats.completedGoals}</span>
                            <span class="stat-label">完成目标</span>
                        </div>
                    </div>
                </div>
                <div class="report-section">
                    <h4>AI 洞察</h4>
                    <div class="ai-insights">
                        ${data.insights.map((insight, index) => `
                            <div class="insight-item">
                                <i class="fas fa-lightbulb"></i>
                                <p>${insight}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="report-section">
                    <h4>成长建议</h4>
                    <ul class="recommendations">
                        ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// 加载个人资料数据
function loadProfileData() {
    // 模拟个人资料数据
    const profileData = {
        name: '学习者',
        level: 'Level 5',
        joinDate: '2024年1月',
        learningDays: 23,
        bio: '热爱学习，追求成长。相信每一次学习都是对未来的投资，每一次记录都是对成长的见证。',
        interests: ['编程', '写作', '健身', '摄影'],
        goal: '在一年内掌握全栈开发技能，并建立自己的技术博客。'
    };
    
    // 渲染个人资料
    renderProfile(profileData);
}

// 渲染个人资料
function renderProfile(data) {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    profileContainer.innerHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="profile-info">
                    <h3>${data.name}</h3>
                    <p>终身学习者 | ${data.level}</p>
                    <div class="profile-stats">
                        <span>加入时间：${data.joinDate}</span>
                        <span>学习天数：${data.learningDays}天</span>
                    </div>
                </div>
            </div>
            <div class="profile-details">
                <div class="detail-group">
                    <label>个人简介</label>
                    <p>${data.bio}</p>
                </div>
                <div class="detail-group">
                    <label>学习兴趣</label>
                    <div class="interest-tags">
                        ${data.interests.map(interest => `<span class="tag">${interest}</span>`).join('')}
                    </div>
                </div>
                <div class="detail-group">
                    <label>学习目标</label>
                    <p>${data.goal}</p>
                </div>
            </div>
        </div>
    `;
}

// 设置模态框
function setupModals() {
    // 目标模态框
    window.openGoalModal = function() {
        const modal = document.getElementById('goalModal');
        if (modal) {
            modal.classList.add('active');
        }
    };
    
    window.closeGoalModal = function() {
        const modal = document.getElementById('goalModal');
        if (modal) {
            modal.classList.remove('active');
        }
    };
    
    // 点击模态框外部关闭
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// 保存目标
function saveGoal() {
    const form = document.getElementById('goalForm');
    const formData = new FormData(form);
    
    // 模拟保存目标
    console.log('保存目标:', Object.fromEntries(formData));
    
    // 关闭模态框
    closeGoalModal();
    
    // 重新加载目标数据
    loadGoalsData();
    
    // 显示成功消息
    showNotification('目标创建成功！', 'success');
}

// 更新目标进度
function updateGoalProgress(goalId) {
    // 模拟更新进度
    console.log('更新目标进度:', goalId);
    showNotification('进度更新成功！', 'success');
}

// 编辑目标
function editGoal(goalId) {
    // 模拟编辑目标
    console.log('编辑目标:', goalId);
    showNotification('编辑功能开发中...', 'info');
}

// 编辑记录
function editRecord(title) {
    console.log('编辑记录:', title);
    showNotification('编辑功能开发中...', 'info');
}

// 分享记录
function shareRecord(title) {
    console.log('分享记录:', title);
    showNotification('分享功能开发中...', 'info');
}

// 生成AI报告
function generateAIReport() {
    showNotification('正在生成AI报告...', 'info');
    
    // 模拟生成过程
    setTimeout(() => {
        loadAIReport();
        showNotification('AI报告生成完成！', 'success');
    }, 2000);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 设置实时更新
function setupRealTimeUpdates() {
    // 模拟实时数据更新
    setInterval(() => {
        // 更新学习时长
        const learningHours = document.querySelector('.stat-card:nth-child(2) h3');
        if (learningHours) {
            const current = parseInt(learningHours.textContent);
            learningHours.textContent = current + 1;
        }
        
        // 更新连续学习天数
        const streak = document.querySelector('.stat-card:nth-child(4) h3');
        if (streak) {
            const current = parseInt(streak.textContent);
            streak.textContent = current + 1;
        }
    }, 60000); // 每分钟更新一次
}

// 导出功能供其他页面使用
window.Dashboard = {
    showSection,
    loadUserData,
    updateOverviewData,
    loadGoalsData,
    loadTimelineData,
    loadSkillsData,
    loadRecordsData,
    loadAIReport,
    loadProfileData,
    showNotification
};





