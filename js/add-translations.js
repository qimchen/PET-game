// 为常用PET词汇添加中文翻译的函数

const commonTranslations = {
    // A
    "able": "能够", "about": "关于，大约", "above": "在...上面", "abroad": "在国外",
    "accept": "接受", "accident": "事故", "accommodation": "住宿", "account": "账户",
    "ache": "疼痛", "across": "横过", "act": "行动，表演", "activity": "活动",
    "actor": "演员", "actually": "实际上", "add": "添加", "address": "地址",
    
    // B
    "bad": "坏的", "bag": "袋子", "ball": "球", "band": "乐队，带子",
    "bank": "银行，河岸", "bar": "酒吧，条", "base": "基础", "basket": "篮子",
    "bath": "洗澡", "beach": "海滩", "beat": "打，打败", "beautiful": "美丽的",
    "because": "因为", "become": "成为", "bed": "床", "before": "在...之前",
    
    // C
    "camera": "相机", "camp": "露营", "can": "能，罐头", "capital": "首都，资本",
    "captain": "队长，船长", "car": "汽车", "card": "卡片", "care": "照顾，关心",
    "careful": "小心的", "carry": "携带", "case": "案例，箱子", "cash": "现金",
    "cat": "猫", "catch": "抓住", "centre": "中心", "chair": "椅子",
    
    // D
    "dad": "爸爸", "dance": "跳舞", "danger": "危险", "dangerous": "危险的",
    "dark": "黑暗的", "date": "日期，约会", "daughter": "女儿", "day": "天",
    "dead": "死的", "deal": "处理，交易", "dear": "亲爱的，贵的", "decide": "决定",
    
    // E
    "each": "每个", "ear": "耳朵", "early": "早的", "earth": "地球，泥土",
    "east": "东方", "easy": "简单的", "eat": "吃", "egg": "鸡蛋",
    "eight": "八", "either": "任一", "electric": "电的", "elephant": "大象",
    
    // F
    "face": "脸", "fact": "事实", "factory": "工厂", "fail": "失败",
    "fair": "公平的，集市", "fall": "跌倒，秋天", "family": "家庭", "famous": "著名的",
    "fan": "风扇，粉丝", "far": "远的", "farm": "农场", "farmer": "农民",
    "fast": "快的", "fat": "胖的", "father": "父亲", "favorite": "最喜欢的",
    
    // G
    "game": "游戏", "garden": "花园", "gas": "气体，汽油", "gate": "大门",
    "general": "一般的，将军", "gentle": "温柔的", "gentleman": "绅士", "get": "得到",
    "gift": "礼物", "girl": "女孩", "give": "给予", "glad": "高兴的",
    "glass": "玻璃，杯子", "go": "去", "goal": "目标", "gold": "黄金",
    
    // H
    "hair": "头发", "half": "一半", "hall": "大厅", "hand": "手",
    "happen": "发生", "happy": "快乐的", "hard": "硬的，困难的", "hat": "帽子",
    "hate": "憎恨", "have": "有", "he": "他", "head": "头",
    "health": "健康", "hear": "听见", "heart": "心脏", "heat": "热",
    
    // I
    "ice": "冰", "idea": "主意", "if": "如果", "ill": "生病的",
    "important": "重要的", "improve": "改进", "in": "在...里面", "include": "包括",
    "increase": "增加", "information": "信息", "ink": "墨水", "inside": "里面",
    "interest": "兴趣", "interesting": "有趣的", "internet": "互联网", "into": "进入",
    
    // J
    "jacket": "夹克", "job": "工作", "join": "加入", "joke": "玩笑",
    "journey": "旅程", "juice": "果汁", "jump": "跳", "just": "刚刚，仅仅",
    
    // K
    "keep": "保持", "key": "钥匙", "kill": "杀死", "kind": "种类，善良的",
    "king": "国王", "kiss": "吻", "kitchen": "厨房", "knee": "膝盖",
    "knife": "刀", "know": "知道",
    
    // L
    "lady": "女士", "lake": "湖", "lamp": "灯", "land": "土地",
    "language": "语言", "large": "大的", "last": "最后的", "late": "迟的",
    "laugh": "笑", "law": "法律", "lay": "放置", "lazy": "懒惰的",
    "lead": "领导", "learn": "学习", "least": "最少", "leave": "离开",
    
    // M
    "machine": "机器", "magazine": "杂志", "main": "主要的", "make": "制作",
    "man": "男人", "many": "许多", "map": "地图", "march": "三月，行进",
    "mark": "标记", "market": "市场", "marry": "结婚", "master": "主人，掌握",
    "match": "匹配，比赛", "material": "材料", "matter": "物质，事情", "may": "可能",
    
    // N
    "name": "名字", "narrow": "狭窄的", "nation": "国家", "nature": "自然",
    "near": "附近", "necessary": "必要的", "neck": "脖子", "need": "需要",
    "needle": "针", "neighbor": "邻居", "neither": "两者都不", "nest": "巢",
    "net": "网", "never": "从不", "new": "新的", "news": "新闻",
    
    // O - 继续添加常用词...
    "office": "办公室", "often": "经常", "oil": "油", "old": "老的",
    "on": "在...上面", "once": "一次", "one": "一", "only": "仅仅",
    "open": "打开", "opposite": "相反的", "or": "或者", "orange": "橙色，橙子",
    "order": "命令，订单", "other": "其他的", "our": "我们的", "out": "在外面",
    "outside": "外面", "over": "超过", "own": "自己的"
};

// 添加中文翻译到词汇库
function addTranslationsToVocabulary() {
    console.log('开始为词汇添加中文翻译...');
    let updatedCount = 0;
    
    // 遍历所有词汇
    PET_VOCABULARY.all_words.forEach(word => {
        const english = word.english.toLowerCase();
        if (commonTranslations[english] && (!word.chinese || word.chinese === '')) {
            word.chinese = commonTranslations[english];
            updatedCount++;
        }
    });
    
    console.log(`✅ 已完成翻译: ${updatedCount} 个单词`);
    return updatedCount;
}

// 获取需要翻译的单词列表
function getUntranslatedWords(limit = 20) {
    const untranslated = PET_VOCABULARY.all_words
        .filter(word => !word.chinese || word.chinese === '')
        .slice(0, limit);
    
    console.log(`未翻译的前${limit}个单词:`);
    untranslated.forEach((word, index) => {
        console.log(`${index + 1}. ${word.english} - ${word.topic}`);
    });
    
    return untranslated;
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addTranslationsToVocabulary, getUntranslatedWords };
}

// 如果在浏览器环境，添加到全局
if (typeof window !== 'undefined') {
    window.addTranslationsToVocabulary = addTranslationsToVocabulary;
    window.getUntranslatedWords = getUntranslatedWords;
}