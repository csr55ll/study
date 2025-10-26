// 账户中心功能
document.addEventListener('DOMContentLoaded', function() {
    initializeAccount();
    initializeTabSwitching();
    loadUserData();
    checkMembershipStatus();
});

// 初始化账户页面
function initializeAccount() {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // 初始化用户菜单
    initializeUserMenu();
    
    // 初始化进度动画
    initializeProgressAnimations();
}

// 加载用户数据
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // 更新用户信息
    document.getElementById('userName').textContent = userData.name || '用户';
    document.getElementById('userFullName').textContent = userData.name || '用户姓名';
    document.getElementById('userEmail').textContent = userData.email || 'user@example.com';
    document.getElementById('userLevel').textContent = userData.level || 1;
    
    // 计算加入天数
    const joinDate = userData.joinDate ? new Date(userData.joinDate) : new Date();
    const daysSinceJoin = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
    document.getElementById('joinDays').textContent = daysSinceJoin;
    
    // 模拟学习记录数量
    document.getElementById('totalRecords').textContent = Math.floor(Math.random() * 50) + 10;
    
    // 更新设置表单
    if (userData.firstName) {
        document.getElementById('settingsFirstName').value = userData.firstName;
    }
    if (userData.lastName) {
        document.getElementById('settingsLastName').value = userData.lastName;
    }
    if (userData.email) {
        document.getElementById('settingsEmail').value = userData.email;
    }
}

// 检查会员状态
function checkMembershipStatus() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const isMember = userData.isMember || false;
    
    const membershipIcon = document.getElementById('membershipIcon');
    const membershipTitle = document.getElementById('membershipTitle');
    const membershipDescription = document.getElementById('membershipDescription');
    const membershipAction = document.getElementById('membershipAction');
    
    if (isMember) {
        membershipIcon.className = 'fas fa-crown';
        membershipTitle.textContent = 'Pro 会员';
        membershipDescription.textContent = '享受所有会员特权';
        membershipAction.innerHTML = '<i class="fas fa-cog"></i> 管理订阅';
        membershipAction.onclick = manageSubscription;
    } else {
        membershipIcon.className = 'fas fa-crown';
        membershipTitle.textContent = '免费用户';
        membershipDescription.textContent = '升级到会员解锁更多功能';
        membershipAction.innerHTML = '<i class="fas fa-crown"></i> 升级会员';
        membershipAction.onclick = upgradeMembership;
    }
}

// 初始化标签页切换
function initializeTabSwitching() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // 根据标签页加载相应数据
            loadTabData(targetTab);
        });
    });
}

// 加载标签页数据
function loadTabData(tabName) {
    switch(tabName) {
        case 'overview':
            loadOverviewData();
            break;
        case 'learning':
            loadLearningData();
            break;
        case 'goals':
            loadGoalsData();
            break;
        case 'achievements':
            loadAchievementsData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

// 加载概览数据
function loadOverviewData() {
    // 模拟数据加载
    setTimeout(() => {
        animateProgressCircle();
        animateWeeklyStats();
    }, 100);
}

// 加载学习记录数据
function loadLearningData() {
    // 这里可以加载实际的学习记录数据
    console.log('Loading learning data...');
}

// 加载目标数据
function loadGoalsData() {
    // 这里可以加载实际的目标数据
    console.log('Loading goals data...');
}

// 加载成就数据
function loadAchievementsData() {
    // 这里可以加载实际的成就数据
    console.log('Loading achievements data...');
}

// 加载设置数据
function loadSettingsData() {
    // 这里可以加载实际的设置数据
    console.log('Loading settings data...');
}

// 初始化用户菜单
function initializeUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    
    // 点击外部关闭菜单
    document.addEventListener('click', function(e) {
        if (!userMenu.contains(e.target)) {
            userMenu.querySelector('.user-dropdown').style.opacity = '0';
            userMenu.querySelector('.user-dropdown').style.visibility = 'hidden';
        }
    });
}

// 初始化进度动画
function initializeProgressAnimations() {
    // 进度圆环动画
    const progressRing = document.querySelector('.progress-ring');
    if (progressRing) {
        const circumference = 2 * Math.PI * 40; // r=40
        progressRing.style.strokeDasharray = circumference;
        progressRing.style.strokeDashoffset = circumference * 0.5; // 50% progress
    }
}

// 动画进度圆环
function animateProgressCircle() {
    const progressRing = document.querySelector('.progress-ring');
    if (progressRing) {
        const circumference = 2 * Math.PI * 40;
        const progress = 0.5; // 50%
        const offset = circumference * (1 - progress);
        
        progressRing.style.transition = 'stroke-dashoffset 1s ease-in-out';
        progressRing.style.strokeDashoffset = offset;
    }
}

// 动画周统计
function animateWeeklyStats() {
    const bars = document.querySelectorAll('.day-stat .bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transition = 'height 0.5s ease-in-out';
        }, index * 100);
    });
}

// 升级会员
function upgradeMembership() {
    window.location.href = 'pricing.html';
}

// 管理订阅
function manageSubscription() {
    showNotification('订阅管理功能开发中...', 'info');
}

// 编辑资料
function editProfile() {
    showNotification('编辑资料功能开发中...', 'info');
}

// 开始学习
function startLearning() {
    window.location.href = 'dashboard.html';
}

// 添加学习记录
function addLearningRecord() {
    showNotification('添加学习记录功能开发中...', 'info');
}

// 编辑记录
function editRecord(recordId) {
    showNotification(`编辑记录 ${recordId} 功能开发中...`, 'info');
}

// 删除记录
function deleteRecord(recordId) {
    if (confirm('确定要删除这条学习记录吗？')) {
        showNotification(`记录 ${recordId} 已删除`, 'success');
    }
}

// 添加目标
function addGoal() {
    showNotification('添加目标功能开发中...', 'info');
}

// 保存资料
function saveProfile() {
    const firstName = document.getElementById('settingsFirstName').value;
    const lastName = document.getElementById('settingsLastName').value;
    const email = document.getElementById('settingsEmail').value;
    
    if (!firstName || !lastName || !email) {
        showNotification('请填写所有必填字段', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return;
    }
    
    // 更新用户数据
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.email = email;
    userData.name = `${firstName} ${lastName}`;
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // 更新页面显示
    loadUserData();
    
    showNotification('资料保存成功', 'success');
}

// 修改密码
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('请填写所有密码字段', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('两次输入的新密码不一致', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('新密码至少需要8个字符', 'error');
        return;
    }
    
    // 模拟密码修改
    showNotification('密码修改成功', 'success');
    
    // 清空表单
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
}

// 保存通知设置
function saveNotificationSettings() {
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const learningReminders = document.getElementById('learningReminders').checked;
    const goalReminders = document.getElementById('goalReminders').checked;
    
    // 保存设置到localStorage
    const settings = {
        emailNotifications,
        learningReminders,
        goalReminders
    };
    
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    
    showNotification('通知设置保存成功', 'success');
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        localStorage.removeItem('rememberMe');
        
        showNotification('已退出登录', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// 工具函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// 导出功能供其他页面使用
window.Account = {
    showNotification,
    loadUserData,
    checkMembershipStatus
};




