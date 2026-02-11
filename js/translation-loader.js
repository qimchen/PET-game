// 词汇翻译加载器 - 自动为词汇添加中文翻译

(function() {
    'use strict';
    
    // 等待页面和词汇库加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 延迟执行以确保PET_VOCABULARY已经加载
        setTimeout(initializeTranslations, 500);
    });
    
    function initializeTranslations() {
        console.log('初始化词汇翻译...');
        
        // 检查词汇库是否已加载
        if (typeof PET_VOCABULARY === 'undefined') {
            console.warn('词汇库未加载，无法初始化翻译');
            return;
        }
        
        // 为今日词汇添加翻译
        addTranslationsForTodayWords();
        
        // 为常用词汇添加翻译
        addCommonTranslations();
        
        // 重新加载词汇列表
        if (typeof loadTodayVocabulary === 'function') {
            loadTodayVocabulary();
        } else {
            console.log('注意: loadTodayVocabulary函数未找到');
        }
    }
    
    // 常用词汇翻译表
    const commonTranslations = {
        // A
        "able": "能够", "about": "关于，大约", "above": "在...上面", "abroad": "在国外",
        "accept": "接受", "accident": "事故", "accommodation": "住宿", "account": "账户",
        "ache": "疼痛", "across": "横过", "act": "行动，表演", "activity": "活动",
        "actor": "演员", "actually": "实际上", "add": "添加", "address": "地址",
        "adult": "成年人", "advice": "建议", "afraid": "害怕的", "after": "在...之后",
        
        // B
        "bad": "坏的", "bag": "袋子", "ball": "球", "band": "乐队，带子",
        "bank": "银行，河岸", "bar": "酒吧，条", "base": "基础", "basket": "篮子",
        "bath": "洗澡", "beach": "海滩", "beat": "打，打败", "beautiful": "美丽的",
        "because": "因为", "become": "成为", "bed": "床", "before": "在...之前",
        "begin": "开始", "behind": "在...后面", "believe": "相信", "bell": "铃",
        
        // C
        "camera": "相机", "camp": "露营", "can": "能，罐头", "capital": "首都，资本",
        "captain": "队长，船长", "car": "汽车", "card": "卡片", "care": "照顾，关心",
        "careful": "小心的", "carry": "携带", "case": "案例，箱子", "cash": "现金",
        "cat": "猫", "catch": "抓住", "centre": "中心", "chair": "椅子",
        "chance": "机会", "change": "改变，零钱", "cheap": "便宜的", "check": "检查",
        
        // D
        "dad": "爸爸", "dance": "跳舞", "danger": "危险", "dangerous": "危险的",
        "dark": "黑暗的", "date": "日期，约会", "daughter": "女儿", "day": "天",
        "dead": "死的", "deal": "处理，交易", "dear": "亲爱的，贵的", "decide": "决定",
        "deep": "深的", "degree": "程度，学位", "delay": "延迟", "delicious": "美味的",
        
        // E
        "each": "每个", "ear": "耳朵", "early": "早的", "earth": "地球，泥土",
        "east": "东方", "easy": "简单的", "eat": "吃", "egg": "鸡蛋",
        "eight": "八", "either": "任一", "electric": "电的", "elephant": "大象",
        "else": "其他的", "empty": "空的", "end": "结束", "enjoy": "享受",
        
        // F
        "face": "脸", "fact": "事实", "factory": "工厂", "fail": "失败",
        "fair": "公平的，集市", "fall": "跌倒，秋天", "family": "家庭", "famous": "著名的",
        "fan": "风扇，粉丝", "far": "远的", "farm": "农场", "farmer": "农民",
        "fast": "快的", "fat": "胖的", "father": "父亲", "favorite": "最喜欢的",
        "fear": "恐惧", "feel": "感觉", "few": "很少的", "field": "田野",
        
        // G
        "game": "游戏", "garden": "花园", "gas": "气体，汽油", "gate": "大门",
        "general": "一般的，将军", "gentle": "温柔的", "gentleman": "绅士", "get": "得到",
        "gift": "礼物", "girl": "女孩", "give": "给予", "glad": "高兴的",
        "glass": "玻璃，杯子", "go": "去", "goal": "目标", "gold": "黄金",
        "good": "好的", "government": "政府", "grand": "盛大的", "grass": "草",
        
        // H
        "hair": "头发", "half": "一半", "hall": "大厅", "hand": "手",
        "happen": "发生", "happy": "快乐的", "hard": "硬的，困难的", "hat": "帽子",
        "hate": "憎恨", "have": "有", "he": "他", "head": "头",
        "health": "健康", "hear": "听见", "heart": "心脏", "heat": "热",
        "heavy": "重的", "help": "帮助", "here": "这里", "high": "高的",
        
        // 继续添加更多常用词...
        "useful": "有用的", "office": "办公室", "due": "到期", "chess": "国际象棋",
        "camera": "相机", "dressed": "穿好衣服的"
    };
    
    // 为今日词汇添加翻译
    function addTranslationsForTodayWords() {
        if (!PET_VOCABULARY.all_words || PET_VOCABULARY.all_words.length === 0) {
            return;
        }
        
        // 取前20个单词作为今日词汇
        const todayWords = PET_VOCABULARY.all_words.slice(0, 20);
        let translatedCount = 0;
        
        todayWords.forEach(word => {
            const english = word.english.toLowerCase();
            if (commonTranslations[english] && (!word.chinese || word.chinese === '')) {
                word.chinese = commonTranslations[english];
                translatedCount++;
            } else if (!word.chinese || word.chinese === '') {
                // 如果没有翻译，使用机器翻译占位符
                word.chinese = '[待翻译]';
            }
        });
        
        console.log(`今日词汇翻译: 添加了 ${translatedCount} 个中文翻译`);
    }
    
    // 为常用词汇添加翻译
    function addCommonTranslations() {
        let totalTranslated = 0;
        
        PET_VOCABULARY.all_words.forEach(word => {
            const english = word.english.toLowerCase();
            if (commonTranslations[english] && (!word.chinese || word.chinese === '')) {
                word.chinese = commonTranslations[english];
                totalTranslated++;
            }
        });
        
        console.log(`总共翻译: ${totalTranslated} 个单词 (共 ${PET_VOCABULARY.all_words.length} 个单词)`);
    }
    
    // 手动添加翻译的函数
    window.addManualTranslation = function(english, chinese) {
        const word = PET_VOCABULARY.all_words.find(w => w.english.toLowerCase() === english.toLowerCase());
        if (word) {
            word.chinese = chinese;
            console.log(`手动添加翻译: ${english} -> ${chinese}`);
            return true;
        }
        console.warn(`未找到单词: ${english}`);
        return false;
    };
    
    console.log('词汇翻译加载器已初始化');
})();