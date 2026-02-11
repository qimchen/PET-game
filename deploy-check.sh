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
echo "🔧 检查HTML引用..."
js_refs=$(grep -o "src=\"js/[^\"]*\"" index.html | wc -l)
echo "HTML引用的JS文件数: $js_refs"

css_refs=$(grep -o "href=\"css/[^\"]*\"" index.html | wc -l)
echo "HTML引用的CSS文件数: $css_refs"

echo ""
echo "💅 检查CSS样式完整性..."
css_checks=(
    "modal"
    "game-card"
    "vocab-item"
    "game-instructions"
    "memory-grid"
)

echo "CSS样式检查结果:"
for style in "${css_checks[@]}"; do
    count=$(grep -c ".$style" css/style.css 2>/dev/null || echo "0")
    if [ "$count" -gt 0 ]; then
        echo "✅ .$style 已定义"
    else
        echo "❌ .$style 未定义"
    fi
done

echo ""
echo "📦 检查JavaScript功能..."
js_checks=(
    "startGame"
    "closeGame"
    "showProfile"
    "loadTodayVocabulary"
)

echo "JavaScript函数检查:"
for func in "${js_checks[@]}"; do
    if grep -q "function $func" js/*.js 2>/dev/null || grep -q "$func = function" js/*.js 2>/dev/null; then
        echo "✅ $func() 函数存在"
    else
        echo "❌ $func() 函数缺失"
    fi
done

echo ""
echo "🌐 检查外部依赖..."
external_deps=$(grep -o "https://[^\"']*" index.html | wc -l)
echo "外部依赖数量: $external_deps"

echo ""
echo "📊 词汇库状态..."
if [ -f "js/vocabulary.js" ]; then
    word_count=$(grep -c "\"english\":" js/vocabulary.js 2>/dev/null || echo "0")
    chinese_count=$(grep -c '"chinese":"[^"]*"' js/vocabulary.js 2>/dev/null || echo "0")
    echo "总单词数: $word_count"
    echo "有中文翻译: $chinese_count"
    
    if [ "$word_count" -gt 0 ]; then
        translation_rate=$((chinese_count * 100 / word_count))
        echo "翻译覆盖率: $translation_rate%"
    fi
fi

echo ""
echo "📝 Git状态..."
git status --short

echo ""
echo "🏗️  项目大小..."
total_files=$(find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" | wc -l)
total_size=$(du -sh . 2>/dev/null | cut -f1 || echo "未知")
echo "总文件数: $total_files"
echo "项目大小: $total_size"

echo ""
echo "🎯 关键修复验证..."
echo "1. 模态框功能: $(grep -q "justify-content: center" css/style.css && echo "✅" || echo "❌")"
echo "2. 游戏内容样式: $(grep -q ".game-instructions" css/style.css && grep -q ".memory-grid" css/style.css && echo "✅" || echo "❌")"
echo "3. 词汇说明: $(grep -q "vocab-instructions" index.html && echo "✅" || echo "❌")"
echo "4. 中文翻译: $(grep -q "translation-loader.js" index.html && echo "✅" || echo "❌")"
echo "5. 游戏按钮: $(grep -q "startGame.*wordMemory" index.html && echo "✅" || echo "❌")"

echo ""
echo "📱 iPad优化检查..."
echo "1. 视口设置: $(grep -q "viewport.*maximum-scale" index.html && echo "✅" || echo "❌")"
echo "2. PWA支持: $(grep -q "apple-mobile-web-app-capable" index.html && echo "✅" || echo "❌")"
echo "3. 触摸优化: $(grep -q "touch-action" css/style.css && echo "✅" || echo "❌")"

echo ""
echo "🎉 验证完成！"
echo ""
echo "当前状态: $(if git status --porcelain | grep -q '.'; then echo "有未提交的更改"; else echo "所有更改已提交"; fi)"
echo ""
echo "🚀 如需部署:"
echo "1. git add ."
echo "2. git commit -m '说明你的更改'"
echo "3. git push origin master"
echo ""
echo "🌐 测试地址: https://pet-game-ruby.vercel.app/"
echo ""
echo "🔧 已部署修复:"
echo "• 模态框样式与居中"
echo "• 词汇中文翻译系统"
echo "• 今日词汇操作指南"
echo "• 游戏内容完整样式"
echo "• Vercel资源配置"
echo ""
echo "📞 如有问题，请详细描述！"