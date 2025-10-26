// 会员专区功能
document.addEventListener('DOMContentLoaded', function() {
    checkMembershipStatus();
    initializeScrollAnimations();
    initializeModal();
});

// 检查会员状态
function checkMembershipStatus() {
    const statusElement = document.getElementById('membership-status');
    
    // 模拟检查会员状态
    setTimeout(() => {
        const isLoggedIn = checkLoginStatus();
        const isMember = checkMemberStatus();
        
        if (!isLoggedIn) {
            showNonLoggedInStatus();
        } else if (!isMember) {
            showNonMemberStatus();
        } else {
            showMemberStatus();
        }
    }, 1500);
}

function checkLoginStatus() {
    // 这里应该检查实际的登录状态
    // 现在返回false，表示未登录
    return false;
}

function checkMemberStatus() {
    // 这里应该检查实际的会员状态
    // 现在返回false，表示非会员
    return false;
}

function showNonLoggedInStatus() {
    const statusElement = document.getElementById('membership-status');
    statusElement.innerHTML = `
        <div class="status-non-member">
            <i class="fas fa-user-slash"></i>
            <h3>请先登录</h3>
            <p>登录后即可访问会员专区内容</p>
            <a href="login.html" class="btn-primary">立即登录</a>
        </div>
    `;
}

function showNonMemberStatus() {
    const statusElement = document.getElementById('membership-status');
    statusElement.innerHTML = `
        <div class="status-non-member">
            <i class="fas fa-crown"></i>
            <h3>升级到会员</h3>
            <p>解锁更多专属内容和功能</p>
            <a href="pricing.html" class="btn-primary">立即升级</a>
        </div>
    `;
}

function showMemberStatus() {
    const statusElement = document.getElementById('membership-status');
    statusElement.innerHTML = `
        <div class="status-member">
            <i class="fas fa-crown"></i>
            <span>欢迎回来，尊贵的会员！</span>
        </div>
    `;
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
    const scrollElements = document.querySelectorAll('.template-card, .challenge-card, .resource-card');
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// 模态框功能
function initializeModal() {
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('non-member-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showModal() {
    const modal = document.getElementById('non-member-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('non-member-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 模板下载
function downloadTemplate(templateId) {
    const isLoggedIn = checkLoginStatus();
    const isMember = checkMemberStatus();
    
    if (!isLoggedIn) {
        window.location.href = 'login.html?redirect=members';
        return;
    }
    
    if (!isMember) {
        showModal();
        return;
    }
    
    // 模拟下载
    showDownloadProgress(templateId);
}

function showDownloadProgress(templateId) {
    // 创建下载进度提示
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-download"></i>
            <span>正在下载模板...</span>
        </div>
    `;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 模拟下载完成
    setTimeout(() => {
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check"></i>
                <span>下载完成！</span>
            </div>
        `;
        toast.style.background = '#10b981';
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 2000);
}

// 挑战参与
function joinChallenge(challengeId) {
    const isLoggedIn = checkLoginStatus();
    const isMember = checkMemberStatus();
    
    if (!isLoggedIn) {
        window.location.href = 'login.html?redirect=members';
        return;
    }
    
    if (!isMember) {
        showModal();
        return;
    }
    
    // 模拟参与挑战
    showChallengeJoined(challengeId);
}

function showChallengeJoined(challengeId) {
    const toast = document.createElement('div');
    toast.className = 'challenge-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-trophy"></i>
            <span>成功参与挑战！</span>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f59e0b;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 资源下载
function downloadResource(resourceId) {
    const isLoggedIn = checkLoginStatus();
    const isMember = checkMemberStatus();
    
    if (!isLoggedIn) {
        window.location.href = 'login.html?redirect=members';
        return;
    }
    
    if (!isMember) {
        showModal();
        return;
    }
    
    // 模拟资源访问
    showResourceAccess(resourceId);
}

function showResourceAccess(resourceId) {
    const toast = document.createElement('div');
    toast.className = 'resource-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-play"></i>
            <span>正在打开资源...</span>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check"></i>
                <span>资源已打开！</span>
            </div>
        `;
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 1500);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);




