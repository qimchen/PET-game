// 应用主逻辑 - 词汇列表和初始化

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('APP JS: 页面加载完成');
    
    // 加载今日词汇
    loadTodayVocabulary();
    
    // 初始化数据
    initializeUserData();
    
    // 确保所有游戏按钮可用
    initializeGameButtons();
    
    // 检查浏览器支持
    checkBrowserCompatibility();
});

// 加载今日词汇列表
function loadTodayVocabulary() {
    const vocabList = document.getElementById('vocabList');
    if (!vocabList) {
        console.warn('找不到词汇列表容器');
        return;
    }
    
    // 从词汇库中获取前10个单词作为今日词汇
    const todayWords = PET_VOCABULARY.all_words.slice(0, 10);
    
    let html = '';
    todayWords.forEach((word, index) => {
        html += `
            <div class="vocab-item ${word.mastered ? 'learned' : ''}" data-index="${index}">
                <div class="word-info">
                    <span class="word-english">${word.english}</span>
                    <span class="word-chinese">${word.chinese || '待翻译'}</span>
                </div>
                <div class="word-actions">
                    <button class="btn-small" onclick="playWordSound('${index}')" title="朗读">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="btn-small ${word.mastered ? 'btn-learned' : ''}" onclick="toggleWordLearned('${index}')" title="${word.mastered ? '已掌握' : '标记为已掌握'}">
                        <i class="fas ${word.mastered ? 'fa-check-circle' : 'fa-circle'}"></i>
                    </button>
                </div>
                <div class="word-topic">${word.topic}</div>
            </div>
        `;
    });
    
    vocabList.innerHTML = html;
    console.log('今日词汇加载完成:', todayWords.length, '个单词');
}

// 初始化用户数据
function initializeUserData() {
    // 尝试从本地存储加载
    const savedScore = localStorage.getItem('petGameScore');
    const savedLevel = localStorage.getItem('petGameLevel');
    const savedStreak = localStorage.getItem('petGameStreak');
    
    if (savedScore) {
        try {
            const score = parseInt(savedScore);
            const level = parseInt(savedLevel) || 1;
            const streak = parseInt(savedStreak) || 0;
            
            // 更新全局变量
            if (typeof window.score !== 'undefined') {
                window.score = score;
                window.level = level;
                window.streak = streak;
            }
            
            // 更新显示
            updateScoreDisplay(score);
            updateLevelDisplay(level);
            updateStreakDisplay(streak);
            
            console.log('用户数据从本地存储加载');
        } catch (e) {
            console.warn('加载本地存储数据失败:', e);
        }
    }
}

// 更新分数显示
function updateScoreDisplay(points) {
    const scoreElement = document.getElementById('points');
    if (scoreElement) {
        scoreElement.textContent = points;
    }
}

// 更新等级显示
function updateLevelDisplay(level) {
    const levelElement = document.getElementById('level');
    if (levelElement) {
        levelElement.textContent = level;
    }
}

// 更新连续学习天数显示
function updateStreakDisplay(streak) {
    const streakElement = document.getElementById('streak');
    if (streakElement) {
        streakElement.textContent = streak;
    }
}

// 初始化游戏按钮
function initializeGameButtons() {
    // 确保所有游戏按钮都有正确的点击事件
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const onclickAttr = card.getAttribute('onclick');
        if (!onclickAttr || onclickAttr.trim() === '') {
            // 如果按钮没有点击事件，添加默认事件
            const gameType = card.classList.contains('word-icon') ? 'wordMemory' :
                           card.classList.contains('spelling-icon') ? 'spelling' :
                           card.classList.contains('match-icon') ? 'match' : 'grammar';
            card.setAttribute('onclick', `startGame('${gameType}')`);
        }
    });
    
    console.log('游戏按钮初始化完成');
}

// 播放单词发音
function playWordSound(wordIndex) {
    const word = PET_VOCABULARY.all_words[wordIndex];
    if (!word) return;
    
    alert(`播放单词发音: ${word.english}\n\n语音功能需要Web Speech API支持，正在开发中...`);
    
    // TODO: 使用Web Speech API实现语音合成
    // const utterance = new SpeechSynthesisUtterance(word.english);
    // utterance.lang = 'en-US';
    // speechSynthesis.speak(utterance);
}

// 切换单词掌握状态
function toggleWordLearned(wordIndex) {
    if (!PET_VOCABULARY.all_words[wordIndex]) return;
    
    const currentState = PET_VOCABULARY.all_words[wordIndex].mastered;
    PET_VOCABULARY.all_words[wordIndex].mastered = !currentState;
    
    // 更新UI
    const vocabItem = document.querySelector(`.vocab-item[data-index="${wordIndex}"]`);
    if (vocabItem) {
        if (PET_VOCABULARY.all_words[wordIndex].mastered) {
            vocabItem.classList.add('learned');
            vocabItem.querySelector('.btn-small').innerHTML = '<i class="fas fa-check-circle"></i>';
            vocabItem.querySelector('.btn-small').classList.add('btn-learned');
        } else {
            vocabItem.classList.remove('learned');
            vocabItem.querySelector('.btn-small').innerHTML = '<i class="fas fa-circle"></i>';
            vocabItem.querySelector('.btn-small').classList.remove('btn-learned');
        }
    }
    
    // 更新进度条
    updateProgressBars();
    
    // 保存状态（TODO: 实现本地存储）
    console.log(`单词 "${PET_VOCABULARY.all_words[wordIndex].english}" 掌握状态: ${PET_VOCABULARY.all_words[wordIndex].mastered ? '已掌握' : '未掌握'}`);
}

// 更新进度条
function updateProgressBars() {
    // 简化版：固定进度
    // TODO: 根据实际掌握单词数计算进度
    
    const progresses = document.querySelectorAll('.progress');
    progresses.forEach(progress => {
        // 暂时保持原样，后续可计算真实进度
    });
}

// 检查浏览器兼容性
function checkBrowserCompatibility() {
    const compatibility = {
        localStorage: !!window.localStorage,
        speechSynthesis: !!window.speechSynthesis,
        flexbox: 'flex' in document.documentElement.style,
        grid: 'grid' in document.documentElement.style
    };
    
    console.log('浏览器兼容性检查:', compatibility);
    
    // 如果有严重兼容性问题，显示警告
    if (!compatibility.localStorage) {
        console.warn('警告: 当前浏览器不支持localStorage，进度无法保存');
    }
}

// 保存用户数据到本地存储
function saveUserData() {
    try {
        if (typeof score !== 'undefined') {
            localStorage.setItem('petGameScore', score);
        }
        if (typeof level !== 'undefined') {
            localStorage.setItem('petGameLevel', level);
        }
        if (typeof streak !== 'undefined') {
            localStorage.setItem('petGameStreak', streak);
        }
        console.log('用户数据已保存到本地存储');
    } catch (e) {
        console.error('保存用户数据失败:', e);
    }
}

// 页面卸载前保存数据
window.addEventListener('beforeunload', saveUserData);

// 添加一些CSS修复（如果样式有问题）
function applyStyleFixes() {
    // 检查CSS是否加载
    const styleSheets = document.styleSheets;
    let cssLoaded = false;
    
    for (let i = 0; i < styleSheets.length; i++) {
        const href = styleSheets[i].href;
        if (href && href.includes('style.css')) {
            cssLoaded = true;
            break;
        }
    }
    
    if (!cssLoaded) {
        console.warn('CSS文件可能未正确加载，应用基本样式修复');
        
        // 添加一些内联样式作为备用
        const backupStyles = `
            .game-card {
                cursor: pointer !important;
                transition: transform 0.3s ease !important;
            }
            .game-card:hover {
                transform: translateY(-5px) !important;
            }
            .vocab-item {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            }
            .modal {
                position: fixed !important;
                top: 0;
                left: 0;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0,0,0,0.5) !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = backupStyles;
        document.head.appendChild(styleElement);
    }
}

// 应用样式修复
setTimeout(applyStyleFixes, 1000);

// 导出全局函数（确保可以被HTML调用）
window.loadTodayVocabulary = loadTodayVocabulary;
window.playWordSound = playWordSound;
window.toggleWordLearned = toggleWordLearned;
window.speakAllWords = speakAllWords;
window.markAllLearned = markAllLearned;