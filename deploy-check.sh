#!/bin/bash
# 部署验证脚本

set -e

echo "🚀 开始验证部署修复..."

# 检查目录结构
echo "📁 检查文件结构..."
required_files=(
    "index.html"
    "css/style.css" 
    "js/vocabulary.js"
    "js/game.js"
    "js/app.js"
    "js/translation-loader.js"
    "vercel.json"
    "package.json"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 缺失"
        exit 1
    fi
done

echo ""
echo "🔧 检查HTML语法..."
if command -v tidy >/dev/null 2>&1; then
    tidy -q -errors index.html 2>&1 | head -10
else
    echo "⚠️  tidy未安装，跳过HTML检查"
fi

echo ""
echo "💅 检查CSS样式..."
grep -o ".modal" css/style.css | wc -l | xargs echo "模态框样式定义:"
grep -o ".game-card" css/style.css | wc -l | xargs echo "游戏卡片样式定义:"
grep -o ".vocab-item" css/style.css | wc -l | xargs echo "词汇项样式定义:"

echo ""
echo "📦 检查JavaScript引用..."
js_files=$(grep -o "src=\"js/[^\"]*\"" index.html | wc -l)
echo "HTML中引用的JS文件: $js_files 个"

echo ""
echo "🌐 检查外部资源..."
external_resources=$(grep -o "https://[^\"']*" index.html | wc -l)
echo "引用的外部资源: $external_resources 个"

echo ""
echo "🔗 测试重要链接..."
important_links=(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Fredoka+One&display=swap"
)

for link in "${important_links[@]}"; do
    # 简化的URL检查
    echo -n "检查链接: $(echo "$link" | cut -c1-30)..."
    echo "（在线检查跳过）"
done

echo ""
echo "📊 词汇库检查..."
if [ -f "js/vocabulary.js" ]; then
    word_count=$(grep -c "\"english\":" js/vocabulary.js 2>/dev/null || echo "0")
    chinese_count=$(grep -c "\"chinese\":\"[^\"]*\"" js/vocabulary.js 2>/dev/null || echo "0")
    echo "总单词数: $word_count"
    echo "有中文翻译的: $chinese_count"
    
    if [ "$chinese_count" -lt 50 ] && [ "$word_count" -gt 100 ]; then
        echo "⚠️  警告: 缺少中文翻译的词很多"
    fi
fi

echo ""
echo "📝 Git状态检查..."
git status --short

echo ""
echo "🏗️  构建大小检查..."
total_size=$(du -sh . 2>/dev/null | cut -f1)
file_count=$(find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" | wc -l)
echo "项目总大小: $total_size"
echo "源码文件数: $file_count"

echo ""
echo "🔍 关键修复验证..."
echo "1. 模态框居中: $(grep -q "justify-content: center" css/style.css && echo "✅" || echo "❌")"
echo "2. 游戏内容样式: $(grep -q ".game-instructions" css/style.css && echo "✅" || echo "❌")"
echo "3. 词汇说明: $(grep -q "vocab-instructions" index.html && echo "✅" || echo "❌")"
echo "4. 翻译加载器: $(grep -q "translation-loader.js" index.html && echo "✅" || echo "❌")"
echo "5. Vercel配置: $(grep -q "Content-Security-Policy" vercel.json && echo "✅" || echo "❌")"

echo ""
echo "🎉 验证完成！"
echo ""
echo "🚀 部署前请运行:"
echo "1. git add ."
echo "2. git commit -m '修复: 模态框样式、词汇翻译、功能说明、资源加载'"
echo "3. git push origin master"
echo ""
echo "📱 部署后请在iPad测试:"
echo "1. 打开 https://pet-game-ruby.vercel.app/"
echo "2. 测试所有按钮点击"
echo "3. 检查词汇是否有中文"
echo "4. 验证模态框显示"
echo ""
echo "如需进一步帮助，随时联系！"