// 游戏核心逻辑

let score = 0;
let level = 1;
let streak = 0;
let currentGame = null;

// 游戏配置
const GAME_CONFIG = {
    wordMemory: {
        name: '单词记忆卡片',
        pointsPerMatch: 10,
        timeLimit: 120 // 秒
    },
    spelling: {
        name: '拼写游戏', 
        pointsPerWord: 15,
        timeLimit: 90
    },
    match: {
        name: '词义配对',
        pointsPerPair: 12,
        timeLimit: 150
    },
    grammar: {
        name: '语法挑战',
        pointsPerQuestion: 20,
        timeLimit: 180
    }
};

// 游戏开始函数
function startGame(gameType) {
    console.log('开始游戏:', gameType);
    
    // 更新游戏标题
    document.getElementById('gameTitle').textContent = GAME_CONFIG[gameType].name;
    
    // 显示游戏模态框
    const modal = document.getElementById('gameModal');
    modal.style.display = 'block';
    
    // 设置游戏内容
    const content = document.getElementById('gameContent');
    
    // 根据游戏类型显示不同内容
    switch(gameType) {
        case 'wordMemory':
            content.innerHTML = generateWordMemoryGame();
            initializeWordMemoryGame();
            break;
        case 'spelling':
            content.innerHTML = generateSpellingGame();
            initializeSpellingGame();
            break;
        case 'match':
            content.innerHTML = generateMatchingGame();
            initializeMatchingGame();
            break;
        case 'grammar':
            content.innerHTML = generateGrammarGame();
            initializeGrammarGame();
            break;
    }
    
    currentGame = gameType;
}

// 关闭游戏
function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    currentGame = null;
}

// 单词记忆游戏生成
function generateWordMemoryGame() {
    return `
        <div class="memory-game">
            <div class="game-instructions">
                <h3>游戏规则</h3>
                <p>点击卡片翻转，找到匹配的单词和释义。</p>
                <div class="game-stats">
                    <span>时间: <span id="timer">120</span>秒</span>
                    <span>得分: <span id="currentScore">0</span></span>
                    <span>配对: <span id="pairsMatched">0</span>/6</span>
                </div>
            </div>
            <div class="memory-grid" id="memoryGrid">
                <!-- 卡片动态生成 -->
            </div>
            <div class="game-controls">
                <button class="btn-game" onclick="restartMemoryGame()">重新开始</button>
                <button class="btn-game" onclick="closeGame()">返回首页</button>
            </div>
        </div>
    `;
}

// 拼写游戏生成
function generateSpellingGame() {
    return `
        <div class="spelling-game">
            <div class="game-instructions">
                <h3>拼写挑战</h3>
                <p>听单词发音，在下方输入正确的拼写。</p>
                <div class="game-stats">
                    <span>单词: <span id="wordIndex">1</span>/10</span>
                    <span>正确: <span id="correctCount">0</span></span>
                    <span>得分: <span id="spellingScore">0</span></span>
                </div>
            </div>
            <div class="spelling-area">
                <div class="current-word" id="currentWord">
                    <!-- 单词显示区域 -->
                </div>
                <div class="pronunciation">
                    <button class="btn-pronounce" onclick="playWord()">
                        <i class="fas fa-volume-up"></i> 播放单词
                    </button>
                </div>
                <div class="input-area">
                    <input type="text" id="spellingInput" placeholder="输入拼写..." autocomplete="off">
                    <button class="btn-submit" onclick="checkSpelling()">检查</button>
                </div>
                <div class="feedback" id="spellingFeedback"></div>
            </div>
            <div class="game-controls">
                <button class="btn-game" onclick="nextWord()">下一个</button>
                <button class="btn-game" onclick="closeGame()">返回</button>
            </div>
        </div>
    `;
}

// 词义配对游戏生成
function generateMatchingGame() {
    return `
        <div class="matching-game">
            <div class="game-instructions">
                <h3>词义配对</h3>
                <p>将左边的单词拖到右边正确的释义上。</p>
                <div class="game-stats">
                    <span>时间: <span id="matchTimer">150</span>秒</span>
                    <span>正确配对: <span id="matchCount">0</span>/8</span>
                </div>
            </div>
            <div class="match-container">
                <div class="words-column" id="wordsColumn">
                    <!-- 单词列 -->
                </div>
                <div class="meanings-column" id="meaningsColumn">
                    <!-- 释义列 -->
                </div>
            </div>
            <div class="game-controls">
                <button class="btn-game" onclick="shuffleMatches()">重新洗牌</button>
                <button class="btn-game" onclick="closeGame()">返回</button>
            </div>
        </div>
    `;
}

// 语法挑战生成
function generateGrammarGame() {
    return `
        <div class="grammar-game">
            <div class="game-instructions">
                <h3>语法挑战</h3>
                <p>选择正确的答案完成句子。</p>
                <div class="game-stats">
                    <span>题目: <span id="questionNum">1</span>/5</span>
                    <span>正确: <span id="grammarCorrect">0</span></span>
                </div>
            </div>
            <div class="question-area">
                <div class="question-text" id="questionText">
                    <!-- 问题文本 -->
                </div>
                <div class="options" id="optionsContainer">
                    <!-- 选项按钮 -->
                </div>
                <div class="explanation" id="explanation"></div>
            </div>
            <div class="game-controls">
                <button class="btn-game" onclick="nextQuestion()">下一题</button>
                <button class="btn-game" onclick="closeGame()">返回</button>
            </div>
        </div>
    `;
}

// 初始化函数（占位）
function initializeWordMemoryGame() {
    console.log('初始化单词记忆游戏');
    // TODO: 实现卡片生成逻辑
}

function initializeSpellingGame() {
    console.log('初始化拼写游戏');
    // TODO: 实现拼写游戏逻辑
}

function initializeMatchingGame() {
    console.log('初始化配对游戏');
    // TODO: 实现配对游戏逻辑
}

function initializeGrammarGame() {
    console.log('初始化语法游戏');
    // TODO: 实现语法游戏逻辑
}

// 加分函数
function addPoints(points) {
    score += points;
    updateScore();
    
    // 每100分升一级
    if (score >= level * 100) {
        level++;
        updateLevel();
    }
}

// 更新分数显示
function updateScore() {
    const scoreElement = document.getElementById('points');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

// 更新等级显示
function updateLevel() {
    const levelElement = document.getElementById('level');
    if (levelElement) {
        levelElement.textContent = level;
    }
}

// 更新连续学习天数
function updateStreak(days) {
    streak = days;
    const streakElement = document.getElementById('streak');
    if (streakElement) {
        streakElement.textContent = streak;
    }
}

// 显示个人中心
function showProfile() {
    alert('个人中心功能开发中...\n\n当前数据：\n积分: ' + score + '\n等级: ' + level + '\n连续学习: ' + streak + '天');
}

// 切换标签页
function switchTab(tab) {
    // 移除所有按钮的活动状态
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 添加当前按钮的活动状态
    const currentButton = document.querySelector(`.nav-btn[onclick="switchTab('${tab}')"]`);
    if (currentButton) {
        currentButton.classList.add('active');
    }
}

// 朗读所有单词
function speakAllWords() {
    alert('朗读功能开发中...');
}

// 标记所有单词为已学
function markAllLearned() {
    if (confirm('确定要标记所有单词为已学吗？')) {
        alert('已标记所有今日词汇为已学！');
        // TODO: 实现标记逻辑
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('游戏初始化完成');
    updateScore();
    updateLevel();
    updateStreak(1);
    
    // 设置当前时间
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}