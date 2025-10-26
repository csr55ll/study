// 经验记录页面功能
let experienceRecords = JSON.parse(localStorage.getItem('experienceRecords') || '[]');
let currentMode = null;
let currentView = 'timeline';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeExperience();
    loadTimeline();
    updateStats();
    loadInsights();
});

// 初始化经验记录
function initializeExperience() {
    // 设置表单事件监听器
    document.getElementById('structuredForm').addEventListener('submit', handleStructuredSubmit);
    
    // 设置心情选择器
    setupMoodSelector();
    
    // 加载关联资料选项
    loadRelatedMaterials();
}

// 选择记录模式
function selectMode(mode) {
    currentMode = mode;
    
    // 隐藏所有记录区域
    document.getElementById('quickRecord').style.display = 'none';
    document.getElementById('structuredRecord').style.display = 'none';
    
    // 显示选中的模式
    if (mode === 'quick') {
        document.getElementById('quickRecord').style.display = 'block';
        document.getElementById('quickContent').focus();
    } else if (mode === 'structured') {
        document.getElementById('structuredRecord').style.display = 'block';
    }
    
    // 记录埋点
    trackEvent('mode_select', { mode });
}

// 设置心情选择器
function setupMoodSelector() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按钮的选中状态
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加选中状态
            this.classList.add('active');
        });
    });
}

// 保存快速记录
function saveQuickRecord() {
    const content = document.getElementById('quickContent').value.trim();
    const tags = document.getElementById('quickTags').value.trim();
    const selectedMood = document.querySelector('.mood-btn.active');
    const mood = selectedMood ? selectedMood.dataset.mood : 'neutral';
    
    if (!content) {
        showNotification('请输入学习内容', 'error');
        return;
    }
    
    const record = {
        id: generateId(),
        type: 'quick',
        content: content,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        mood: mood,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    experienceRecords.push(record);
    localStorage.setItem('experienceRecords', JSON.stringify(experienceRecords));
    
    // 重置表单
    document.getElementById('quickContent').value = '';
    document.getElementById('quickTags').value = '';
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    
    // 隐藏记录区域
    document.getElementById('quickRecord').style.display = 'none';
    
    // 重新加载时间线
    loadTimeline();
    updateStats();
    
    showNotification('记录已保存！', 'success');
    
    // 记录埋点
    trackEvent('quick_record_save', {
        hasTags: record.tags.length > 0,
        mood: record.mood
    });
}

// 取消快速记录
function cancelQuickRecord() {
    document.getElementById('quickRecord').style.display = 'none';
    document.getElementById('quickContent').value = '';
    document.getElementById('quickTags').value = '';
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
}

// 处理结构化记录提交
function handleStructuredSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const record = {
        id: generateId(),
        type: 'structured',
        completedTasks: formData.get('completedTasks'),
        incompleteTasks: formData.get('incompleteTasks'),
        biggestGain: formData.get('biggestGain'),
        knowledgePoints: formData.get('knowledgePoints'),
        skillImprovement: formData.get('skillImprovement'),
        biggestObstacle: formData.get('biggestObstacle'),
        solution: formData.get('solution'),
        tomorrowPlan: formData.get('tomorrowPlan'),
        learningGoal: formData.get('learningGoal'),
        relatedMaterials: Array.from(formData.getAll('relatedMaterials')),
        aiSuggestions: formData.get('aiSuggestions'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    experienceRecords.push(record);
    localStorage.setItem('experienceRecords', JSON.stringify(experienceRecords));
    
    // 重置表单
    event.target.reset();
    
    // 隐藏记录区域
    document.getElementById('structuredRecord').style.display = 'none';
    
    // 重新加载时间线
    loadTimeline();
    updateStats();
    
    showNotification('记录已保存！', 'success');
    
    // 记录埋点
    trackEvent('structured_record_save', {
        hasRelatedMaterials: record.relatedMaterials.length > 0,
        hasAiSuggestions: !!record.aiSuggestions
    });
}

// 取消结构化记录
function cancelStructuredRecord() {
    document.getElementById('structuredRecord').style.display = 'none';
    document.getElementById('structuredForm').reset();
}

// 加载关联资料选项
function loadRelatedMaterials() {
    const materials = JSON.parse(localStorage.getItem('materials') || '[]');
    const select = document.getElementById('relatedMaterials');
    
    select.innerHTML = '<option value="">选择关联的学习资料</option>';
    
    materials.forEach(material => {
        const option = document.createElement('option');
        option.value = material.id;
        option.textContent = material.title;
        select.appendChild(option);
    });
}

// 加载时间线
function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    const timeRange = document.getElementById('timeRange').value;
    
    let filteredRecords = experienceRecords;
    
    // 根据时间范围过滤
    if (timeRange !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (timeRange) {
            case 'week':
                filterDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                filterDate.setMonth(now.getMonth() - 1);
                break;
            case 'quarter':
                filterDate.setMonth(now.getMonth() - 3);
                break;
            case 'year':
                filterDate.setFullYear(now.getFullYear() - 1);
                break;
        }
        
        filteredRecords = experienceRecords.filter(record => 
            new Date(record.createdAt) >= filterDate
        );
    }
    
    if (filteredRecords.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-alt"></i>
                <h4>还没有记录</h4>
                <p>开始记录你的学习经验吧</p>
            </div>
        `;
        return;
    }
    
    // 按时间倒序排列
    filteredRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = filteredRecords.map(record => createTimelineItem(record)).join('');
}

// 创建时间线项目
function createTimelineItem(record) {
    const date = new Date(record.createdAt);
    const formattedDate = date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let content = '';
    let tags = [];
    
    if (record.type === 'quick') {
        content = record.content;
        tags = record.tags || [];
    } else {
        content = record.biggestGain || record.completedTasks || '结构化学习记录';
        tags = record.relatedMaterials || [];
    }
    
    return `
        <div class="timeline-item" onclick="viewRecordDetail('${record.id}')">
            <div class="timeline-header">
                <span class="timeline-date">${formattedDate}</span>
                <span class="timeline-type ${record.type}">${record.type === 'quick' ? '快速记录' : '结构化记录'}</span>
            </div>
            <div class="timeline-content">${content}</div>
            ${tags.length > 0 ? `
                <div class="timeline-tags">
                    ${tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            ${record.mood ? `
                <div class="timeline-mood">
                    <i class="fas fa-${getMoodIcon(record.mood)}"></i>
                    <span>${getMoodText(record.mood)}</span>
                </div>
            ` : ''}
        </div>
    `;
}

// 获取心情图标
function getMoodIcon(mood) {
    const icons = {
        happy: 'smile',
        neutral: 'meh',
        frustrated: 'frown',
        excited: 'grin'
    };
    return icons[mood] || 'meh';
}

// 获取心情文本
function getMoodText(mood) {
    const texts = {
        happy: '开心',
        neutral: '平静',
        frustrated: '困惑',
        excited: '兴奋'
    };
    return texts[mood] || '平静';
}

// 过滤时间线
function filterTimeline() {
    loadTimeline();
}

// 切换视图
function toggleView(view) {
    currentView = view;
    
    // 更新按钮状态
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // 显示/隐藏视图
    if (view === 'timeline') {
        document.getElementById('timelineView').style.display = 'block';
        document.getElementById('calendarView').style.display = 'none';
    } else {
        document.getElementById('timelineView').style.display = 'none';
        document.getElementById('calendarView').style.display = 'block';
        loadCalendar();
    }
    
    trackEvent('view_toggle', { view });
}

// 加载日历
function loadCalendar() {
    const container = document.getElementById('calendarContainer');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // 获取月份的第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    // 创建日历头部
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    let calendarHTML = '';
    
    // 添加星期标题
    weekDays.forEach(day => {
        calendarHTML += `<div class="calendar-header">${day}</div>`;
    });
    
    // 添加空白日期
    for (let i = 0; i < startDay; i++) {
        calendarHTML += '<div class="calendar-day other-month"></div>';
    }
    
    // 添加月份日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasRecord = experienceRecords.some(record => 
            record.createdAt.startsWith(dateStr)
        );
        
        calendarHTML += `
            <div class="calendar-day ${hasRecord ? 'has-record' : ''}" onclick="viewDayRecords('${dateStr}')">
                ${day}
            </div>
        `;
    }
    
    container.innerHTML = calendarHTML;
}

// 查看某天的记录
function viewDayRecords(dateStr) {
    const dayRecords = experienceRecords.filter(record => 
        record.createdAt.startsWith(dateStr)
    );
    
    if (dayRecords.length === 0) {
        showNotification('这一天没有记录', 'info');
        return;
    }
    
    // 显示记录列表
    const recordsList = dayRecords.map(record => `
        <div class="day-record" onclick="viewRecordDetail('${record.id}')">
            <div class="record-time">${new Date(record.createdAt).toLocaleTimeString('zh-CN')}</div>
            <div class="record-content">${record.type === 'quick' ? record.content : (record.biggestGain || '结构化记录')}</div>
        </div>
    `).join('');
    
    showNotification(`找到 ${dayRecords.length} 条记录`, 'info');
}

// 更新统计
function updateStats() {
    const totalDays = new Set(experienceRecords.map(record => 
        record.createdAt.split('T')[0]
    )).size;
    
    const streakDays = calculateStreak();
    const totalTags = new Set(experienceRecords.flatMap(record => record.tags || [])).size;
    const growthRate = calculateGrowthRate();
    
    document.getElementById('totalDays').textContent = totalDays;
    document.getElementById('streakDays').textContent = streakDays;
    document.getElementById('totalTags').textContent = totalTags;
    document.getElementById('growthRate').textContent = growthRate + '%';
}

// 计算连续打卡天数
function calculateStreak() {
    if (experienceRecords.length === 0) return 0;
    
    const dates = [...new Set(experienceRecords.map(record => 
        record.createdAt.split('T')[0]
    ))].sort().reverse();
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date(today);
    
    for (const dateStr of dates) {
        const recordDate = new Date(dateStr);
        const diffTime = currentDate - recordDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
            streak++;
            currentDate = recordDate;
        } else {
            break;
        }
    }
    
    return streak;
}

// 计算成长率
function calculateGrowthRate() {
    if (experienceRecords.length < 2) return 0;
    
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    const recentRecords = experienceRecords.filter(record => 
        new Date(record.createdAt) >= lastWeek
    ).length;
    
    const previousRecords = experienceRecords.filter(record => {
        const date = new Date(record.createdAt);
        return date >= twoWeeksAgo && date < lastWeek;
    }).length;
    
    if (previousRecords === 0) return recentRecords > 0 ? 100 : 0;
    
    return Math.round(((recentRecords - previousRecords) / previousRecords) * 100);
}

// 加载洞察
function loadInsights() {
    const insightsContent = document.getElementById('insightsContent');
    
    const insights = generateInsights();
    
    insightsContent.innerHTML = insights.map(insight => `
        <div class="insight-item">
            <h4>${insight.title}</h4>
            <p>${insight.content}</p>
        </div>
    `).join('');
}

// 生成洞察
function generateInsights() {
    const insights = [];
    
    // 学习频率洞察
    const totalDays = new Set(experienceRecords.map(record => 
        record.createdAt.split('T')[0]
    )).size;
    
    if (totalDays > 0) {
        insights.push({
            title: '学习频率',
            content: `你已经连续学习 ${calculateStreak()} 天，总共记录了 ${totalDays} 天的学习经验。继续保持！`
        });
    }
    
    // 心情分析
    const moodCounts = {};
    experienceRecords.forEach(record => {
        if (record.mood) {
            moodCounts[record.mood] = (moodCounts[record.mood] || 0) + 1;
        }
    });
    
    if (Object.keys(moodCounts).length > 0) {
        const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
            moodCounts[a] > moodCounts[b] ? a : b
        );
        insights.push({
            title: '学习心情',
            content: `你的学习心情主要是${getMoodText(dominantMood)}，这说明学习给你带来了积极的体验。`
        });
    }
    
    // 标签分析
    const allTags = experienceRecords.flatMap(record => record.tags || []);
    if (allTags.length > 0) {
        const tagCounts = {};
        allTags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        const topTag = Object.keys(tagCounts).reduce((a, b) => 
            tagCounts[a] > tagCounts[b] ? a : b
        );
        
        insights.push({
            title: '学习重点',
            content: `你最常学习的是"${topTag}"相关的内容，这表明你在这个领域有持续的兴趣和投入。`
        });
    }
    
    // 成长建议
    if (experienceRecords.length > 5) {
        insights.push({
            title: '成长建议',
            content: '建议你定期回顾之前的学习记录，总结经验和教训，这将帮助你更好地规划未来的学习。'
        });
    }
    
    return insights;
}

// 查看记录详情
function viewRecordDetail(recordId) {
    const record = experienceRecords.find(r => r.id === recordId);
    if (!record) return;
    
    const modal = document.getElementById('recordDetailModal');
    const detail = document.getElementById('recordDetail');
    
    let detailHTML = `
        <div class="detail-header">
            <div class="detail-date">${new Date(record.createdAt).toLocaleString('zh-CN')}</div>
            <span class="detail-type">${record.type === 'quick' ? '快速记录' : '结构化记录'}</span>
        </div>
    `;
    
    if (record.type === 'quick') {
        detailHTML += `
            <div class="detail-content">${record.content}</div>
            ${record.mood ? `
                <div class="detail-mood">
                    <i class="fas fa-${getMoodIcon(record.mood)}"></i>
                    <span>${getMoodText(record.mood)}</span>
                </div>
            ` : ''}
            ${record.tags && record.tags.length > 0 ? `
                <div class="detail-tags">
                    ${record.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
        `;
    } else {
        detailHTML += `
            <div class="detail-content">
                <h4>今日任务完成情况</h4>
                <p>${record.completedTasks || '无'}</p>
                
                <h4>学习收获</h4>
                <p>${record.biggestGain || '无'}</p>
                
                <h4>遇到的问题</h4>
                <p>${record.biggestObstacle || '无'}</p>
                
                <h4>明日计划</h4>
                <p>${record.tomorrowPlan || '无'}</p>
            </div>
        `;
    }
    
    detail.innerHTML = detailHTML;
    modal.style.display = 'flex';
}

// 关闭记录详情
function closeRecordDetail() {
    document.getElementById('recordDetailModal').style.display = 'none';
}

// 编辑记录
function editRecord() {
    showNotification('编辑功能开发中', 'info');
}

// 分享记录
function shareRecord() {
    const shareUrl = `${window.location.origin}/experience/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        showNotification('分享链接已复制到剪贴板', 'success');
    });
}

// 生成ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 显示通知
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

// 埋点统计
function trackEvent(eventName, data = {}) {
    console.log('Event:', eventName, data);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
}

// 导出功能
window.Experience = {
    selectMode,
    saveQuickRecord,
    cancelQuickRecord,
    saveStructuredRecord: handleStructuredSubmit,
    cancelStructuredRecord,
    viewRecordDetail,
    closeRecordDetail
};


