// 上传页面功能
let uploadedFiles = [];
let currentTags = [];
let materials = JSON.parse(localStorage.getItem('materials') || '[]');

// 常用标签
const commonTags = [
    'Python', 'JavaScript', 'React', 'Vue', 'Node.js',
    '写作', '设计', '摄影', '绘画', '音乐',
    '英语', '日语', '法语', '德语',
    '健身', '瑜伽', '跑步', '游泳',
    '读书', '电影', '旅行', '烹饪',
    '编程', '算法', '数据结构', '机器学习',
    '产品', '运营', '营销', '管理'
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeUpload();
    loadMaterials();
    setupEventListeners();
});

// 初始化上传功能
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    // 点击上传区域
    uploadArea.addEventListener('click', function(e) {
        if (e.target === uploadArea || e.target.closest('.upload-content')) {
            fileInput.click();
        }
    });
    
    // 文件选择
    fileInput.addEventListener('change', handleFileSelect);
    
    // 拖拽上传
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // 字符计数
    const description = document.getElementById('materialDescription');
    const charCount = document.getElementById('charCount');
    
    description.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 50) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '#6b7280';
        }
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 资料信息表单
    document.getElementById('materialInfoForm').addEventListener('submit', handleMaterialSubmit);
    
    // 链接表单
    document.getElementById('linkForm').addEventListener('submit', handleLinkSubmit);
    
    // 笔记表单
    document.getElementById('noteForm').addEventListener('submit', handleNoteSubmit);
    
    // 标签输入
    setupTagInput();
}

// 处理文件选择
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processFiles(files);
}

// 处理拖拽悬停
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

// 处理拖拽离开
function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

// 处理拖拽放下
function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
}

// 处理文件
function processFiles(files) {
    if (files.length === 0) return;
    
    uploadedFiles = files;
    showUploadProgress();
    simulateUpload();
}

// 显示上传进度
function showUploadProgress() {
    const progressSection = document.getElementById('uploadProgress');
    const progressFiles = document.getElementById('progressFiles');
    
    progressSection.style.display = 'block';
    
    // 显示文件列表
    progressFiles.innerHTML = uploadedFiles.map(file => `
        <div class="progress-file">
            <i class="fas fa-file"></i>
            <span class="progress-file-name">${file.name}</span>
            <span class="progress-file-status">等待上传...</span>
        </div>
    `).join('');
    
    // 滚动到进度区域
    progressSection.scrollIntoView({ behavior: 'smooth' });
}

// 模拟上传过程
function simulateUpload() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressFiles = document.querySelectorAll('.progress-file');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.round(progress) + '%';
        
        // 更新文件状态
        progressFiles.forEach((file, index) => {
            const status = file.querySelector('.progress-file-status');
            if (progress > (index + 1) * 20) {
                status.textContent = '上传完成';
                status.style.color = '#22c55e';
            } else if (progress > index * 20) {
                status.textContent = '正在上传...';
                status.style.color = '#3b82f6';
            }
        });
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showMaterialForm();
            }, 1000);
        }
    }, 200);
}

// 显示资料表单
function showMaterialForm() {
    document.getElementById('uploadProgress').style.display = 'none';
    document.getElementById('materialForm').style.display = 'block';
    
    // 自动填充标题
    if (uploadedFiles.length === 1) {
        const fileName = uploadedFiles[0].name;
        const title = fileName.replace(/\.[^/.]+$/, ''); // 移除扩展名
        document.getElementById('materialTitle').value = title;
    }
    
    // 滚动到表单
    document.getElementById('materialForm').scrollIntoView({ behavior: 'smooth' });
}

// 处理资料提交
function handleMaterialSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const materialData = Object.fromEntries(formData);
    
    // 添加文件信息
    materialData.files = uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    }));
    
    // 添加标签
    materialData.tags = currentTags;
    
    // 添加时间戳
    materialData.createdAt = new Date().toISOString();
    materialData.id = generateId();
    
    // 保存到本地存储
    materials.push(materialData);
    localStorage.setItem('materials', JSON.stringify(materials));
    
    // 显示成功页面
    showUploadSuccess();
    
    // 记录埋点
    trackEvent('material_upload', {
        type: materialData.type,
        fileCount: uploadedFiles.length,
        hasTags: currentTags.length > 0,
        isPublic: materialData.isPublic === 'on'
    });
}

// 显示上传成功
function showUploadSuccess() {
    document.getElementById('materialForm').style.display = 'none';
    document.getElementById('uploadSuccess').style.display = 'block';
    
    // 重新加载资料库
    loadMaterials();
}

// 设置标签输入
function setupTagInput() {
    const tagInput = document.getElementById('materialTags');
    const tagSuggestions = document.getElementById('tagSuggestions');
    const tagList = document.getElementById('tagList');
    
    // 标签输入事件
    tagInput.addEventListener('input', function() {
        const value = this.value.trim();
        if (value) {
            showTagSuggestions(value);
        } else {
            hideTagSuggestions();
        }
    });
    
    // 回车添加标签
    tagInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = this.value.trim();
            if (value && !currentTags.includes(value)) {
                addTag(value);
                this.value = '';
                hideTagSuggestions();
            }
        }
    });
    
    // 点击外部隐藏建议
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tag-input-container')) {
            hideTagSuggestions();
        }
    });
}

// 显示标签建议
function showTagSuggestions(query) {
    const suggestions = commonTags.filter(tag => 
        tag.toLowerCase().includes(query.toLowerCase()) && 
        !currentTags.includes(tag)
    );
    
    const tagSuggestions = document.getElementById('tagSuggestions');
    
    if (suggestions.length > 0) {
        tagSuggestions.innerHTML = suggestions.map(tag => `
            <div class="tag-suggestion" onclick="selectTag('${tag}')">${tag}</div>
        `).join('');
        tagSuggestions.style.display = 'block';
    } else {
        hideTagSuggestions();
    }
}

// 隐藏标签建议
function hideTagSuggestions() {
    document.getElementById('tagSuggestions').style.display = 'none';
}

// 选择标签
function selectTag(tag) {
    addTag(tag);
    document.getElementById('materialTags').value = '';
    hideTagSuggestions();
}

// 添加标签
function addTag(tag) {
    if (!currentTags.includes(tag)) {
        currentTags.push(tag);
        updateTagList();
    }
}

// 更新标签列表
function updateTagList() {
    const tagList = document.getElementById('tagList');
    tagList.innerHTML = currentTags.map(tag => `
        <div class="tag-item">
            ${tag}
            <span class="remove-tag" onclick="removeTag('${tag}')">×</span>
        </div>
    `).join('');
}

// 移除标签
function removeTag(tag) {
    currentTags = currentTags.filter(t => t !== tag);
    updateTagList();
}

// 触发文件输入
function triggerFileInput() {
    document.getElementById('fileInput').click();
}

// 添加链接
function addLink() {
    document.getElementById('linkModal').style.display = 'flex';
}

// 关闭链接模态框
function closeLinkModal() {
    document.getElementById('linkModal').style.display = 'none';
    document.getElementById('linkForm').reset();
}

// 处理链接提交
function handleLinkSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const linkData = Object.fromEntries(formData);
    
    // 模拟获取链接标题
    if (!linkData.title) {
        linkData.title = extractTitleFromUrl(linkData.url);
    }
    
    // 创建虚拟文件对象
    const virtualFile = {
        name: linkData.title + '.url',
        size: 0,
        type: 'text/url',
        url: linkData.url,
        isLink: true
    };
    
    uploadedFiles = [virtualFile];
    showUploadProgress();
    simulateUpload();
    
    closeLinkModal();
}

// 从URL提取标题
function extractTitleFromUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return domain.replace('www.', '');
    } catch {
        return '网页链接';
    }
}

// 添加笔记
function addNote() {
    document.getElementById('noteModal').style.display = 'flex';
}

// 关闭笔记模态框
function closeNoteModal() {
    document.getElementById('noteModal').style.display = 'none';
    document.getElementById('noteForm').reset();
}

// 处理笔记提交
function handleNoteSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const noteData = Object.fromEntries(formData);
    
    // 添加笔记到最新资料
    if (materials.length > 0) {
        const latestMaterial = materials[materials.length - 1];
        if (!latestMaterial.notes) {
            latestMaterial.notes = [];
        }
        
        noteData.id = generateId();
        noteData.createdAt = new Date().toISOString();
        latestMaterial.notes.push(noteData);
        
        // 更新本地存储
        localStorage.setItem('materials', JSON.stringify(materials));
        
        // 重新加载资料库
        loadMaterials();
    }
    
    closeNoteModal();
    showNotification('笔记已保存！', 'success');
}

// 加载资料库
function loadMaterials() {
    const materialsGrid = document.getElementById('materialsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (materials.length === 0) {
        materialsGrid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        materialsGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        materialsGrid.innerHTML = materials.map(material => createMaterialCard(material)).join('');
    }
}

// 创建资料卡片
function createMaterialCard(material) {
    const fileCount = material.files ? material.files.length : 0;
    const noteCount = material.notes ? material.notes.length : 0;
    const fileType = getFileType(material.files?.[0]?.type || '');
    
    return `
        <div class="material-card" onclick="viewMaterial('${material.id}')">
            <div class="material-header">
                <div class="material-icon ${fileType}">
                    <i class="fas fa-${getFileIcon(fileType)}"></i>
                </div>
                <div class="material-info">
                    <div class="material-title">${material.title}</div>
                    <div class="material-meta">
                        <span><i class="fas fa-file"></i> ${fileCount}个文件</span>
                        <span><i class="fas fa-edit"></i> ${noteCount}条笔记</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(material.createdAt)}</span>
                    </div>
                </div>
            </div>
            
            ${material.description ? `<div class="material-description">${material.description}</div>` : ''}
            
            ${material.tags && material.tags.length > 0 ? `
                <div class="material-tags">
                    ${material.tags.map(tag => `<span class="material-tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            
            <div class="material-actions">
                <button class="material-action primary" onclick="event.stopPropagation(); addNoteToMaterial('${material.id}')">
                    <i class="fas fa-edit"></i> 添加笔记
                </button>
                <button class="material-action secondary" onclick="event.stopPropagation(); shareMaterial('${material.id}')">
                    <i class="fas fa-share"></i> 分享
                </button>
            </div>
        </div>
    `;
}

// 获取文件类型
function getFileType(mimeType) {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'ppt';
    if (mimeType.includes('document') || mimeType.includes('word')) return 'doc';
    if (mimeType.includes('image')) return 'image';
    if (mimeType.includes('video')) return 'video';
    if (mimeType.includes('url') || mimeType.includes('text/url')) return 'link';
    return 'doc';
}

// 获取文件图标
function getFileIcon(type) {
    const icons = {
        pdf: 'file-pdf',
        ppt: 'file-powerpoint',
        doc: 'file-word',
        image: 'file-image',
        video: 'file-video',
        link: 'link'
    };
    return icons[type] || 'file';
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}周前`;
    return date.toLocaleDateString('zh-CN');
}

// 查看资料
function viewMaterial(materialId) {
    const material = materials.find(m => m.id === materialId);
    if (material) {
        // 这里可以跳转到资料详情页面
        showNotification('跳转到资料详情页面', 'info');
    }
}

// 为资料添加笔记
function addNoteToMaterial(materialId) {
    // 设置当前资料ID
    window.currentMaterialId = materialId;
    addNote();
}

// 分享资料
function shareMaterial(materialId) {
    const material = materials.find(m => m.id === materialId);
    if (material) {
        const shareUrl = `${window.location.origin}/material/${materialId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            showNotification('分享链接已复制到剪贴板', 'success');
        });
    }
}

// 查看资料库
function viewMaterials() {
    window.location.href = 'materials.html';
}

// 继续上传
function uploadMore() {
    // 重置状态
    uploadedFiles = [];
    currentTags = [];
    document.getElementById('uploadSuccess').style.display = 'none';
    document.getElementById('materialForm').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'none';
    
    // 滚动到上传区域
    document.getElementById('uploadArea').scrollIntoView({ behavior: 'smooth' });
}

// 取消上传
function cancelUpload() {
    uploadedFiles = [];
    currentTags = [];
    document.getElementById('materialForm').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'none';
    
    // 滚动到上传区域
    document.getElementById('uploadArea').scrollIntoView({ behavior: 'smooth' });
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
    
    // 这里可以集成真实的埋点系统
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
}

// 导出功能
window.Upload = {
    addLink,
    addNote,
    viewMaterials,
    uploadMore
};


