// 功能交互系统
let currentFeature = null;
let currentStep = 1;
let totalSteps = 3;
let featureData = {};

// 示例数据
const sampleData = {
    plan: {
        templates: [
            { id: 'python', name: 'Python 入门', duration: '30天', milestones: 4, description: '从零开始学习Python编程' },
            { id: 'writing', name: '写作提升', duration: '21天', milestones: 3, description: '提升写作技能和表达能力' },
            { id: 'fitness', name: '健身计划', duration: '30天', milestones: 4, description: '建立健康的生活习惯' },
            { id: 'custom', name: '自由创建', duration: '自定义', milestones: '自定义', description: '创建你的专属学习计划' }
        ],
        samplePlan: {
            title: '30天Python入门计划',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            frequency: 5,
            duration: 60,
            milestones: [
                { week: 1, title: '基础语法掌握', tasks: ['变量与数据类型', '控制流程', '函数基础'] },
                { week: 2, title: '数据结构学习', tasks: ['列表与字典', '字符串处理', '文件操作'] },
                { week: 3, title: '面向对象编程', tasks: ['类与对象', '继承与多态', '异常处理'] },
                { week: 4, title: '项目实战', tasks: ['小项目开发', '代码优化', '总结反思'] }
            ]
        }
    },
    action: {
        quickActions: [
            { label: '25分钟Python练习', topic: 'Python', duration: 25, type: '练习' },
            { label: '30分钟阅读', topic: '阅读', duration: 30, type: '阅读' },
            { label: '20分钟写作', topic: '写作', duration: 20, type: '输出' }
        ],
        sampleAction: {
            topic: 'Python',
            duration: 25,
            type: '练习',
            content: '完成了Python基础语法的练习，包括变量、数据类型和控制流程。',
            summary: '今日学习要点：\n1. 掌握了Python的基本数据类型\n2. 理解了if-else条件语句\n3. 学会了for和while循环\n\n下次建议：\n- 继续练习函数定义和调用\n- 尝试解决一些简单的算法题'
        }
    },
    show: {
        views: [
            { id: 'timeline', name: '学习时间轴', icon: 'fas fa-timeline' },
            { id: 'skilltree', name: '技能树', icon: 'fas fa-tree' },
            { id: 'curve', name: '成长曲线', icon: 'fas fa-chart-line' }
        ],
        sampleData: {
            totalDays: 15,
            totalHours: 12.5,
            streak: 3,
            skills: ['Python基础', '数据结构', '算法思维'],
            timeline: [
                { date: '2024-01-01', action: '开始Python学习', duration: 30 },
                { date: '2024-01-02', action: 'Python基础语法', duration: 45 },
                { date: '2024-01-03', action: '数据结构练习', duration: 25 }
            ]
        }
    },
    connect: {
        challenges: [
            { id: 'python30', name: '30天编程挑战', participants: 1234, duration: 30, difficulty: '中等' },
            { id: 'writing7', name: '7天写作挑战', participants: 567, duration: 7, difficulty: '简单' },
            { id: 'fitness21', name: '21天健身挑战', participants: 890, duration: 21, difficulty: '中等' }
        ]
    },
    reflect: {
        questions: [
            '本周最有收获的一件事是什么？',
            '遇到的最大阻碍是什么？',
            '下周最重要的一步是什么？'
        ],
        sampleAnswers: [
            '完成了Python基础语法的学习，能够独立编写简单的程序',
            '时间管理不够好，经常被其他事情打断学习',
            '开始学习面向对象编程，并完成一个小项目'
        ]
    },
    ai: {
        sampleTasks: [
            { input: '刷30分钟算法', output: '建议拆解为：\n1. 10分钟复习基础概念\n2. 15分钟练习简单题目\n3. 5分钟总结和记录' },
            { input: '学习React', output: '建议学习路径：\n1. 先了解JSX语法\n2. 学习组件概念\n3. 实践创建简单组件' }
        ]
    }
};

// 初始化功能交互
document.addEventListener('DOMContentLoaded', function() {
    initializeFeatureInteractions();
});

// 初始化功能交互
function initializeFeatureInteractions() {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // 为所有功能卡片添加点击事件
    document.querySelectorAll('.feature-card').forEach(card => {
        const feature = card.getAttribute('data-feature');
        if (feature) {
            // 添加悬停效果
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
    });
}

// 打开功能侧栏
function openFeatureSidebar(featureType) {
    currentFeature = featureType;
    currentStep = 1;
    featureData = {};
    
    const sidebar = document.getElementById('featureSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const title = document.getElementById('sidebarTitle');
    const content = document.getElementById('sidebarContent');
    
    // 设置标题
    const featureNames = {
        plan: '计划 (Plan)',
        action: '行动 (Action)',
        show: '成果显化 (Show)',
        connect: '连接 (Connect)',
        reflect: '反思 (Reflect)',
        ai: 'AI 陪伴'
    };
    
    title.textContent = featureNames[featureType];
    
    // 生成内容
    content.innerHTML = generateFeatureContent(featureType);
    
    // 显示侧栏
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 记录埋点
    trackEvent('feature_open', { feature: featureType });
}

// 关闭功能侧栏
function closeFeatureSidebar() {
    const sidebar = document.getElementById('featureSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // 重置状态
    currentFeature = null;
    currentStep = 1;
    featureData = {};
    
    // 记录埋点
    trackEvent('feature_close', { feature: currentFeature });
}

// 生成功能内容
function generateFeatureContent(featureType) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    switch (featureType) {
        case 'plan':
            return generatePlanContent(isLoggedIn);
        case 'action':
            return generateActionContent(isLoggedIn);
        case 'show':
            return generateShowContent(isLoggedIn);
        case 'connect':
            return generateConnectContent(isLoggedIn);
        case 'reflect':
            return generateReflectContent(isLoggedIn);
        case 'ai':
            return generateAIContent(isLoggedIn);
        default:
            return '<p>功能暂未开放</p>';
    }
}

// 生成计划内容
function generatePlanContent(isLoggedIn) {
    const templates = sampleData.plan.templates;
    
    return `
        ${!isLoggedIn ? `
        <div class="guest-mode-notice">
            <h4><i class="fas fa-info-circle"></i> 游客体验模式</h4>
            <p>您正在体验示例数据，登录后可保存您的真实计划</p>
            <button class="btn-primary btn-sm" onclick="redirectToLogin()">
                <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
        </div>
        ` : ''}
        
        <div class="step-indicator">
            <div class="step-dot ${currentStep >= 1 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 2 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 3 ? 'active' : ''}"></div>
        </div>
        
        <div class="step-content ${currentStep === 1 ? 'active' : ''}">
            <h3 class="step-title">选择目标模板</h3>
            <p class="step-description">选择一个适合你的学习目标，或创建自定义计划</p>
            
            <div class="template-grid">
                ${templates.map(template => `
                    <div class="template-card" onclick="selectTemplate('${template.id}')">
                        <h4>${template.name}</h4>
                        <p>${template.description}</p>
                        <div class="template-meta">
                            <i class="fas fa-calendar"></i> ${template.duration} | 
                            <i class="fas fa-flag"></i> ${template.milestones}个里程碑
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" disabled>
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()" disabled id="nextStepBtn">
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 2 ? 'active' : ''}">
            <h3 class="step-title">设定期限与频率</h3>
            <p class="step-description">设置你的学习时间安排</p>
            
            <form class="sidebar-form">
                <div class="form-group">
                    <label>开始日期</label>
                    <input type="date" id="startDate" value="2024-01-01">
                </div>
                <div class="form-group">
                    <label>结束日期</label>
                    <input type="date" id="endDate" value="2024-01-30">
                </div>
                <div class="form-group">
                    <label>每周频次</label>
                    <select id="frequency">
                        <option value="1">1次/周</option>
                        <option value="2">2次/周</option>
                        <option value="3">3次/周</option>
                        <option value="4">4次/周</option>
                        <option value="5" selected>5次/周</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>每次时长（分钟）</label>
                    <input type="number" id="duration" value="60" min="15" max="180">
                </div>
            </form>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()">
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 3 ? 'active' : ''}">
            <h3 class="step-title">生成路线图</h3>
            <p class="step-description">你的学习路线图已生成</p>
            
            <div class="status-message success">
                <i class="fas fa-check-circle"></i>
                <span>计划创建成功！</span>
            </div>
            
            <div class="plan-preview">
                <h4>${sampleData.plan.samplePlan.title}</h4>
                <div class="plan-meta">
                    <span><i class="fas fa-calendar"></i> ${sampleData.plan.samplePlan.startDate} - ${sampleData.plan.samplePlan.endDate}</span>
                    <span><i class="fas fa-clock"></i> 每周${sampleData.plan.samplePlan.frequency}次，每次${sampleData.plan.samplePlan.duration}分钟</span>
                </div>
                
                <div class="milestones">
                    ${sampleData.plan.samplePlan.milestones.map(milestone => `
                        <div class="milestone-item">
                            <div class="milestone-week">第${milestone.week}周</div>
                            <div class="milestone-title">${milestone.title}</div>
                            <div class="milestone-tasks">
                                ${milestone.tasks.map(task => `<span class="task-tag">${task}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="completePlan()">
                    <i class="fas fa-save"></i> 保存计划
                </button>
            </div>
        </div>
    `;
}

// 生成行动内容
function generateActionContent(isLoggedIn) {
    const quickActions = sampleData.action.quickActions;
    
    return `
        ${!isLoggedIn ? `
        <div class="guest-mode-notice">
            <h4><i class="fas fa-info-circle"></i> 游客体验模式</h4>
            <p>您正在体验示例数据，登录后可保存您的真实记录</p>
            <button class="btn-primary btn-sm" onclick="redirectToLogin()">
                <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
        </div>
        ` : ''}
        
        <div class="step-indicator">
            <div class="step-dot ${currentStep >= 1 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 2 ? 'active' : ''}"></div>
        </div>
        
        <div class="step-content ${currentStep === 1 ? 'active' : ''}">
            <h3 class="step-title">记录一次行动</h3>
            <p class="step-description">记录你今天的学习过程</p>
            
            <div class="quick-actions">
                ${quickActions.map(action => `
                    <button class="quick-btn" onclick="fillQuickAction('${action.topic}', ${action.duration}, '${action.type}')">
                        ${action.label}
                    </button>
                `).join('')}
            </div>
            
            <form class="sidebar-form">
                <div class="form-group">
                    <label>学习主题</label>
                    <select id="actionTopic">
                        <option value="">请选择主题</option>
                        <option value="Python">Python</option>
                        <option value="写作">写作</option>
                        <option value="健身">健身</option>
                        <option value="阅读">阅读</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>学习时长（分钟）</label>
                    <input type="number" id="actionDuration" min="1" max="300">
                </div>
                <div class="form-group">
                    <label>学习类型</label>
                    <select id="actionType">
                        <option value="">请选择类型</option>
                        <option value="阅读">阅读</option>
                        <option value="练习">练习</option>
                        <option value="输出">输出</option>
                        <option value="思考">思考</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>学习内容</label>
                    <textarea id="actionContent" placeholder="今天学习了什么？有什么收获？" rows="4"></textarea>
                </div>
            </form>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" disabled>
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()" id="actionNextBtn" disabled>
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 2 ? 'active' : ''}">
            <h3 class="step-title">生成学习摘要</h3>
            <p class="step-description">AI正在整理你的学习要点...</p>
            
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin"></i>
                <span>正在生成摘要...</span>
            </div>
            
            <div class="action-summary" style="display: none;">
                <h4>学习摘要</h4>
                <div class="summary-content">
                    ${sampleData.action.sampleAction.summary.split('\n').map(line => `<p>${line}</p>`).join('')}
                </div>
                
                <div class="action-stats">
                    <div class="stat-item">
                        <i class="fas fa-chart-line"></i>
                        <span>累计行动 15 次</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-fire"></i>
                        <span>连续打卡 3 天</span>
                    </div>
                </div>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="completeAction()">
                    <i class="fas fa-save"></i> 保存记录
                </button>
            </div>
        </div>
    `;
}

// 生成成果显化内容
function generateShowContent(isLoggedIn) {
    const views = sampleData.show.views;
    const data = sampleData.show.sampleData;
    
    return `
        ${!isLoggedIn ? `
        <div class="guest-mode-notice">
            <h4><i class="fas fa-info-circle"></i> 游客体验模式</h4>
            <p>您正在查看示例数据，登录后可查看您的真实成长轨迹</p>
            <button class="btn-primary btn-sm" onclick="redirectToLogin()">
                <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
        </div>
        ` : ''}
        
        <div class="step-indicator">
            <div class="step-dot ${currentStep >= 1 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 2 ? 'active' : ''}"></div>
        </div>
        
        <div class="step-content ${currentStep === 1 ? 'active' : ''}">
            <h3 class="step-title">选择展示模板</h3>
            <p class="step-description">选择你喜欢的展示方式</p>
            
            <div class="view-selector">
                ${views.map(view => `
                    <div class="view-card" onclick="selectView('${view.id}')">
                        <i class="${view.icon}"></i>
                        <h4>${view.name}</h4>
                    </div>
                `).join('')}
            </div>
            
            <div class="time-range-selector">
                <label>时间范围</label>
                <select id="timeRange">
                    <option value="7">近7天</option>
                    <option value="30" selected>近30天</option>
                    <option value="all">全部</option>
                </select>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" disabled>
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()" id="showNextBtn" disabled>
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 2 ? 'active' : ''}">
            <h3 class="step-title">导出或分享</h3>
            <p class="step-description">保存你的成长轨迹</p>
            
            <div class="show-preview">
                <h4>学习时间轴</h4>
                <div class="timeline-preview">
                    ${data.timeline.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-date">${item.date}</div>
                            <div class="timeline-action">${item.action}</div>
                            <div class="timeline-duration">${item.duration}分钟</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="show-stats">
                    <div class="stat-card">
                        <i class="fas fa-calendar"></i>
                        <span>学习天数</span>
                        <strong>${data.totalDays}天</strong>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-clock"></i>
                        <span>总时长</span>
                        <strong>${data.totalHours}小时</strong>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-fire"></i>
                        <span>连续打卡</span>
                        <strong>${data.streak}天</strong>
                    </div>
                </div>
            </div>
            
            <div class="export-options">
                <button class="btn-primary" onclick="exportImage()">
                    <i class="fas fa-image"></i> 导出图片
                </button>
                <button class="btn-outline" onclick="shareLink()">
                    <i class="fas fa-share"></i> 分享链接
                </button>
                <button class="btn-outline" onclick="saveToAccount()">
                    <i class="fas fa-save"></i> 保存到账户
                </button>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="completeShow()">
                    <i class="fas fa-check"></i> 完成
                </button>
            </div>
        </div>
    `;
}

// 生成连接内容
function generateConnectContent(isLoggedIn) {
    const challenges = sampleData.connect.challenges;
    
    return `
        ${!isLoggedIn ? `
        <div class="guest-mode-notice">
            <h4><i class="fas fa-info-circle"></i> 游客体验模式</h4>
            <p>您正在体验示例数据，登录后可参与真实挑战</p>
            <button class="btn-primary btn-sm" onclick="redirectToLogin()">
                <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
        </div>
        ` : ''}
        
        <div class="step-indicator">
            <div class="step-dot ${currentStep >= 1 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 2 ? 'active' : ''}"></div>
        </div>
        
        <div class="step-content ${currentStep === 1 ? 'active' : ''}">
            <h3 class="step-title">加入一个挑战</h3>
            <p class="step-description">选择你感兴趣的挑战活动</p>
            
            <div class="challenge-list">
                ${challenges.map(challenge => `
                    <div class="challenge-card" onclick="selectChallenge('${challenge.id}')">
                        <div class="challenge-header">
                            <h4>${challenge.name}</h4>
                            <span class="challenge-duration">${challenge.duration}天</span>
                        </div>
                        <div class="challenge-meta">
                            <span class="participants">
                                <i class="fas fa-users"></i> ${challenge.participants}人参与
                            </span>
                            <span class="difficulty difficulty-${challenge.difficulty === '简单' ? 'easy' : challenge.difficulty === '中等' ? 'medium' : 'hard'}">
                                ${challenge.difficulty}
                            </span>
                        </div>
                        <div class="challenge-description">
                            与${challenge.participants}位学习者一起完成${challenge.duration}天的学习挑战
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" disabled>
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()" id="connectNextBtn" disabled>
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 2 ? 'active' : ''}">
            <h3 class="step-title">挑战详情</h3>
            <p class="step-description">了解挑战规则和奖励</p>
            
            <div class="challenge-details">
                <h4>30天编程挑战</h4>
                <div class="challenge-rules">
                    <h5>挑战规则</h5>
                    <ul>
                        <li>每天至少学习30分钟编程</li>
                        <li>完成每日打卡任务</li>
                        <li>分享学习心得</li>
                        <li>帮助其他参与者</li>
                    </ul>
                </div>
                
                <div class="challenge-rewards">
                    <h5>挑战奖励</h5>
                    <div class="reward-list">
                        <div class="reward-item">
                            <i class="fas fa-medal"></i>
                            <span>完成徽章</span>
                        </div>
                        <div class="reward-item">
                            <i class="fas fa-certificate"></i>
                            <span>成就证书</span>
                        </div>
                        <div class="reward-item">
                            <i class="fas fa-gift"></i>
                            <span>学习资料</span>
                        </div>
                    </div>
                </div>
                
                <div class="challenge-progress">
                    <h5>进度追踪</h5>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-text">第1天 / 30天</div>
                </div>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="joinChallenge()">
                    <i class="fas fa-plus"></i> 加入挑战
                </button>
            </div>
        </div>
    `;
}

// 生成反思内容
function generateReflectContent(isLoggedIn) {
    const questions = sampleData.reflect.questions;
    const sampleAnswers = sampleData.reflect.sampleAnswers;
    
    return `
        ${!isLoggedIn ? `
        <div class="guest-mode-notice">
            <h4><i class="fas fa-info-circle"></i> 游客体验模式</h4>
            <p>您正在体验示例数据，登录后可保存您的真实反思</p>
            <button class="btn-primary btn-sm" onclick="redirectToLogin()">
                <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
        </div>
        ` : ''}
        
        <div class="step-indicator">
            <div class="step-dot ${currentStep >= 1 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 2 ? 'active' : ''}"></div>
            <div class="step-dot ${currentStep >= 3 ? 'active' : ''}"></div>
        </div>
        
        <div class="step-content ${currentStep === 1 ? 'active' : ''}">
            <h3 class="step-title">选择时间范围</h3>
            <p class="step-description">选择你要反思的时间段</p>
            
            <div class="time-range-cards">
                <div class="time-card" onclick="selectTimeRange('week')">
                    <i class="fas fa-calendar-week"></i>
                    <h4>本周</h4>
                    <p>2024年1月1日 - 1月7日</p>
                </div>
                <div class="time-card" onclick="selectTimeRange('lastweek')">
                    <i class="fas fa-calendar-alt"></i>
                    <h4>上周</h4>
                    <p>2023年12月25日 - 12月31日</p>
                </div>
                <div class="time-card" onclick="selectTimeRange('custom')">
                    <i class="fas fa-calendar"></i>
                    <h4>自定义</h4>
                    <p>选择特定时间段</p>
                </div>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" disabled>
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()" id="reflectNextBtn" disabled>
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 2 ? 'active' : ''}">
            <h3 class="step-title">回答关键问题</h3>
            <p class="step-description">思考并回答以下问题</p>
            
            <form class="sidebar-form">
                ${questions.map((question, index) => `
                    <div class="form-group">
                        <label>${question}</label>
                        <textarea id="question${index + 1}" placeholder="${sampleAnswers[index]}" rows="3"></textarea>
                    </div>
                `).join('')}
            </form>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="nextStep()">
                    下一步 <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <div class="step-content ${currentStep === 3 ? 'active' : ''}">
            <h3 class="step-title">生成报告</h3>
            <p class="step-description">AI正在分析你的回答...</p>
            
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin"></i>
                <span>正在生成反思报告...</span>
            </div>
            
            <div class="reflection-report" style="display: none;">
                <h4>本周成长报告</h4>
                
                <div class="report-section">
                    <h5><i class="fas fa-star"></i> 亮点</h5>
                    <p>完成了Python基础语法的学习，能够独立编写简单的程序。学习效率比上周提升了20%。</p>
                </div>
                
                <div class="report-section">
                    <h5><i class="fas fa-exclamation-triangle"></i> 问题</h5>
                    <p>时间管理不够好，经常被其他事情打断学习。需要建立更稳定的学习习惯。</p>
                </div>
                
                <div class="report-section">
                    <h5><i class="fas fa-lightbulb"></i> 建议</h5>
                    <p>建议使用番茄工作法，每次专注学习25分钟。可以设置学习提醒，避免被干扰。</p>
                </div>
                
                <div class="report-section">
                    <h5><i class="fas fa-list"></i> 下周行动清单</h5>
                    <ul>
                        <li>开始学习面向对象编程</li>
                        <li>完成一个小项目</li>
                        <li>建立每日学习提醒</li>
                    </ul>
                </div>
            </div>
            
            <div class="step-navigation">
                <button class="step-btn btn-outline" onclick="prevStep()">
                    <i class="fas fa-arrow-left"></i> 上一步
                </button>
                <button class="step-btn btn-primary" onclick="completeReflection()">
                    <i class="fas fa-save"></i> 保存报告
                </button>
            </div>
        </div>
    `;
}

// 生成AI陪伴内容
function generateAIContent(isLoggedIn) {
    const sampleTasks = sampleData.ai.sampleTasks;
    
    return `
        ${!isLoggedIn ? `
        <div class="guest-mode-notice">
            <h4><i class="fas fa-info-circle"></i> 游客体验模式</h4>
            <p>您正在体验示例功能，登录后可享受完整AI服务</p>
            <button class="btn-primary btn-sm" onclick="redirectToLogin()">
                <i class="fas fa-sign-in-alt"></i> 立即登录
            </button>
        </div>
        ` : ''}
        
        <div class="ai-companion">
            <h3 class="step-title">AI学习助手</h3>
            <p class="step-description">智能学习助手，陪伴你的成长旅程</p>
            
            <div class="ai-features">
                <div class="ai-feature-card" onclick="openAIFeature('task-breakdown')">
                    <i class="fas fa-tasks"></i>
                    <h4>任务拆解</h4>
                    <p>将复杂任务分解为可执行的小步骤</p>
                </div>
                
                <div class="ai-feature-card" onclick="openAIFeature('pomodoro')">
                    <i class="fas fa-stopwatch"></i>
                    <h4>番茄计时</h4>
                    <p>专注学习25分钟，休息5分钟</p>
                </div>
                
                <div class="ai-feature-card" onclick="openAIFeature('problem-solving')">
                    <i class="fas fa-question-circle"></i>
                    <h4>问题解决</h4>
                    <p>遇到困难时提供解决建议</p>
                </div>
            </div>
            
            <div class="ai-chat" id="aiChat" style="display: none;">
                <div class="chat-header">
                    <h4>AI助手对话</h4>
                    <button class="btn-outline btn-sm" onclick="closeAIChat()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chat-messages">
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            你好！我是你的学习助手。有什么可以帮助你的吗？
                        </div>
                    </div>
                </div>
                
                <div class="chat-input">
                    <input type="text" id="chatInput" placeholder="输入你的问题...">
                    <button class="btn-primary" onclick="sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
            
            <div class="sample-tasks">
                <h4>示例任务</h4>
                ${sampleTasks.map(task => `
                    <div class="sample-task" onclick="trySampleTask('${task.input}')">
                        <div class="task-input">
                            <strong>输入：</strong>${task.input}
                        </div>
                        <div class="task-output">
                            <strong>输出：</strong>${task.output}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 功能交互函数
function selectTemplate(templateId) {
    // 移除其他选中状态
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    event.target.closest('.template-card').classList.add('selected');
    
    // 启用下一步按钮
    document.getElementById('nextStepBtn').disabled = false;
    
    // 保存选择
    featureData.selectedTemplate = templateId;
    
    trackEvent('template_select', { template: templateId });
}

function fillQuickAction(topic, duration, type) {
    document.getElementById('actionTopic').value = topic;
    document.getElementById('actionDuration').value = duration;
    document.getElementById('actionType').value = type;
    
    // 启用下一步按钮
    document.getElementById('actionNextBtn').disabled = false;
    
    trackEvent('quick_action_fill', { topic, duration, type });
}

function selectView(viewId) {
    // 移除其他选中状态
    document.querySelectorAll('.view-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    event.target.closest('.view-card').classList.add('selected');
    
    // 启用下一步按钮
    document.getElementById('showNextBtn').disabled = false;
    
    // 保存选择
    featureData.selectedView = viewId;
    
    trackEvent('view_select', { view: viewId });
}

function selectChallenge(challengeId) {
    // 移除其他选中状态
    document.querySelectorAll('.challenge-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    event.target.closest('.challenge-card').classList.add('selected');
    
    // 启用下一步按钮
    document.getElementById('connectNextBtn').disabled = false;
    
    // 保存选择
    featureData.selectedChallenge = challengeId;
    
    trackEvent('challenge_select', { challenge: challengeId });
}

function selectTimeRange(range) {
    // 移除其他选中状态
    document.querySelectorAll('.time-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加选中状态
    event.target.closest('.time-card').classList.add('selected');
    
    // 启用下一步按钮
    document.getElementById('reflectNextBtn').disabled = false;
    
    // 保存选择
    featureData.selectedTimeRange = range;
    
    trackEvent('time_range_select', { range });
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepIndicator();
        updateStepContent();
        
        // 特殊处理：行动记录生成摘要
        if (currentFeature === 'action' && currentStep === 2) {
            setTimeout(() => {
                document.querySelector('.loading-indicator').style.display = 'none';
                document.querySelector('.action-summary').style.display = 'block';
            }, 2000);
        }
        
        // 特殊处理：反思报告生成
        if (currentFeature === 'reflect' && currentStep === 3) {
            setTimeout(() => {
                document.querySelector('.loading-indicator').style.display = 'none';
                document.querySelector('.reflection-report').style.display = 'block';
            }, 3000);
        }
        
        trackEvent('step_next', { feature: currentFeature, step: currentStep });
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepIndicator();
        updateStepContent();
        
        trackEvent('step_prev', { feature: currentFeature, step: currentStep });
    }
}

function updateStepIndicator() {
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index < currentStep) {
            dot.classList.add('completed');
        } else if (index === currentStep - 1) {
            dot.classList.add('active');
        }
    });
}

function updateStepContent() {
    document.querySelectorAll('.step-content').forEach((content, index) => {
        content.classList.remove('active');
        if (index === currentStep - 1) {
            content.classList.add('active');
        }
    });
}

// 完成功能
function completePlan() {
    showSuccessMessage('计划已保存！');
    setTimeout(() => {
        closeFeatureSidebar();
        // 可以跳转到行动记录
        showNotification('建议开始记录你的第一次学习行动', 'info');
    }, 1500);
    
    trackEvent('plan_complete', featureData);
}

function completeAction() {
    showSuccessMessage('学习记录已保存！');
    setTimeout(() => {
        closeFeatureSidebar();
        // 可以跳转到成果显化
        showNotification('查看你的学习成果', 'info');
    }, 1500);
    
    trackEvent('action_complete', featureData);
}

function completeShow() {
    showSuccessMessage('成果已保存！');
    setTimeout(() => {
        closeFeatureSidebar();
    }, 1500);
    
    trackEvent('show_complete', featureData);
}

function joinChallenge() {
    showSuccessMessage('已加入挑战！');
    setTimeout(() => {
        closeFeatureSidebar();
        // 可以跳转到行动记录
        showNotification('开始你的第一天打卡', 'info');
    }, 1500);
    
    trackEvent('challenge_join', featureData);
}

function completeReflection() {
    showSuccessMessage('反思报告已保存！');
    setTimeout(() => {
        closeFeatureSidebar();
    }, 1500);
    
    trackEvent('reflection_complete', featureData);
}

// AI功能
function openAIFeature(feature) {
    const chat = document.getElementById('aiChat');
    chat.style.display = 'block';
    
    // 根据功能类型设置不同的提示
    const prompts = {
        'task-breakdown': '请告诉我你想要学习的任务，我会帮你拆解成可执行的小步骤。',
        'pomodoro': '准备开始专注学习吗？我将为你启动25分钟的番茄计时器。',
        'problem-solving': '遇到什么学习困难了吗？告诉我具体情况，我会提供解决建议。'
    };
    
    const messages = chat.querySelector('.chat-messages');
    messages.innerHTML += `
        <div class="message ai-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                ${prompts[feature]}
            </div>
        </div>
    `;
    
    trackEvent('ai_feature_open', { feature });
}

function closeAIChat() {
    document.getElementById('aiChat').style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        // 添加用户消息
        const messages = document.querySelector('.chat-messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        messages.appendChild(userMessage);
        
        // 清空输入框
        input.value = '';
        
        // 滚动到底部
        messages.scrollTop = messages.scrollHeight;
        
        // 模拟AI回复
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${aiResponse}</p>
                </div>
            `;
            messages.appendChild(aiMessage);
            
            // 滚动到底部
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        
        trackEvent('ai_message_send', { message });
    }
}

function generateAIResponse(message) {
    // 简单的AI回复逻辑
    if (message.includes('Python') || message.includes('python')) {
        return 'Python是一个很好的编程语言！建议从基础语法开始，然后学习数据结构，最后尝试小项目。需要我帮你制定学习计划吗？';
    } else if (message.includes('时间') || message.includes('计划')) {
        return '建议使用番茄工作法：25分钟专注学习，5分钟休息。每天保持固定的学习时间，这样更容易养成习惯。';
    } else if (message.includes('困难') || message.includes('问题')) {
        return '遇到困难是正常的！建议：1. 分解问题 2. 查找资料 3. 寻求帮助 4. 坚持练习。需要我帮你分析具体问题吗？';
    } else {
        return '这是一个很好的问题！建议你保持学习的热情，遇到困难时不要放弃。需要我为你提供更具体的建议吗？';
    }
}

function trySampleTask(input) {
    const chat = document.getElementById('aiChat');
    chat.style.display = 'block';
    
    const messages = chat.querySelector('.chat-messages');
    messages.innerHTML += `
        <div class="message user-message">
            <div class="message-content">
                ${input}
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        const response = sampleData.ai.sampleTasks.find(task => task.input === input)?.output || '这是一个很好的任务！';
        messages.innerHTML += `
            <div class="message ai-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    ${response}
                </div>
            </div>
        `;
        
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
    
    trackEvent('sample_task_try', { input });
}

// 导出和分享功能
function exportImage() {
    showNotification('正在生成图片...', 'info');
    setTimeout(() => {
        showNotification('图片已生成并下载', 'success');
    }, 2000);
    
    trackEvent('export_image', { feature: currentFeature });
}

function shareLink() {
    const link = 'https://mychronicle.com/share/123456';
    navigator.clipboard.writeText(link).then(() => {
        showNotification('分享链接已复制到剪贴板', 'success');
    });
    
    trackEvent('share_link', { feature: currentFeature });
}

function saveToAccount() {
    showNotification('已保存到你的账户', 'success');
    trackEvent('save_to_account', { feature: currentFeature });
}

// 显示功能详情
function showFeatureDetails(featureType) {
    const modal = document.getElementById('featureModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    const featureNames = {
        plan: '计划 (Plan)',
        action: '行动 (Action)',
        show: '成果显化 (Show)',
        connect: '连接 (Connect)',
        reflect: '反思 (Reflect)',
        ai: 'AI 陪伴'
    };
    
    title.textContent = featureNames[featureType];
    
    const details = {
        plan: `
            <h4>功能特点</h4>
            <ul>
                <li>预设多种学习模板</li>
                <li>自定义学习计划</li>
                <li>可视化学习路线</li>
                <li>里程碑追踪</li>
            </ul>
            <h4>使用场景</h4>
            <p>适合想要系统学习新技能的用户，帮助制定清晰的学习路径。</p>
        `,
        action: `
            <h4>功能特点</h4>
            <ul>
                <li>快速记录学习过程</li>
                <li>AI自动生成摘要</li>
                <li>学习数据统计</li>
                <li>连续打卡激励</li>
            </ul>
            <h4>使用场景</h4>
            <p>适合需要记录学习过程的用户，让成长轨迹清晰可见。</p>
        `,
        show: `
            <h4>功能特点</h4>
            <ul>
                <li>多种展示方式</li>
                <li>数据可视化</li>
                <li>导出分享功能</li>
                <li>成长曲线分析</li>
            </ul>
            <h4>使用场景</h4>
            <p>适合想要展示学习成果的用户，让成长更有成就感。</p>
        `,
        connect: `
            <h4>功能特点</h4>
            <ul>
                <li>挑战活动参与</li>
                <li>学习搭子匹配</li>
                <li>社区互动</li>
                <li>成就系统</li>
            </ul>
            <h4>使用场景</h4>
            <p>适合需要学习伙伴的用户，让学习不再孤单。</p>
        `,
        reflect: `
            <h4>功能特点</h4>
            <ul>
                <li>结构化反思</li>
                <li>AI生成报告</li>
                <li>成长建议</li>
                <li>行动清单</li>
            </ul>
            <h4>使用场景</h4>
            <p>适合需要深度反思的用户，让学习更有意义。</p>
        `,
        ai: `
            <h4>功能特点</h4>
            <ul>
                <li>智能学习建议</li>
                <li>任务拆解</li>
                <li>番茄计时</li>
                <li>问题解决</li>
            </ul>
            <h4>使用场景</h4>
            <p>适合需要学习指导的用户，让学习更高效。</p>
        `
    };
    
    body.innerHTML = details[featureType];
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    trackEvent('feature_details_view', { feature: featureType });
}

function closeFeatureModal() {
    const modal = document.getElementById('featureModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 工具函数
function showSuccessMessage(message) {
    const statusMessage = document.createElement('div');
    statusMessage.className = 'status-message success';
    statusMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    const content = document.getElementById('sidebarContent');
    content.insertBefore(statusMessage, content.firstChild);
    
    setTimeout(() => {
        statusMessage.remove();
    }, 3000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

// 埋点统计
function trackEvent(eventName, data = {}) {
    // 这里可以集成真实的埋点系统
    console.log('Event:', eventName, data);
    
    // 模拟发送到分析平台
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
}

// 导出功能供其他页面使用
window.FeatureInteractions = {
    openFeatureSidebar,
    closeFeatureSidebar,
    showFeatureDetails,
    closeFeatureModal,
    trackEvent
};




