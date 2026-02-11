#!/bin/bash
# 一键推送淼淼的游戏到GitHub
# 使用方法：
# 1. 获取GitHub Personal Access Token
# 2. 运行: bash push-to-github.sh YOUR_TOKEN_HERE

set -e  # 遇到错误退出

echo "🚀 开始推送淼淼的PET游戏到GitHub..."

# 检查是否提供了token
if [ $# -eq 0 ]; then
    echo "❌ 错误：请提供GitHub Personal Access Token"
    echo "使用方法: bash push-to-github.sh YOUR_TOKEN_HERE"
    echo ""
    echo "如何获取token："
    echo "1. 访问: https://github.com/settings/tokens"
    echo "2. 点击 'Generate new token (classic)'"
    echo "3. Note: 'Pet-game-deployment'"
    echo "4. Expiration: 90天"
    echo "5. Select scopes: 勾选 'repo'"
    echo "6. 复制生成的token"
    exit 1
fi

GITHUB_TOKEN=$1

echo "✅ 设置远程仓库URL..."
# 用token设置远程仓库URL
git remote set-url origin https://$GITHUB_TOKEN@github.com/qimchen/PET-game.git

echo "✅ 检查本地更改..."
git status

echo "✅ 添加到暂存区..."
git add .

echo "✅ 提交更改..."
git commit -m "更新淼淼的PET备考游戏 $(date '+%Y-%m-%d %H:%M:%S')" || echo "没有新更改"

echo "✅ 推送到GitHub..."
git push -u origin main

echo ""
echo "🎉 推送成功！"
echo ""
echo "🌐 GitHub仓库地址: https://github.com/qimchen/PET-game"
echo ""
echo "📱 接下来步骤："
echo "1. 在Vercel中导入这个GitHub仓库"
echo "2. 获得部署链接 (如: https://pet-game.vercel.app)"
echo "3. 让淼淼iPad扫码访问"
echo ""
echo "✨ 淼淼可以随时随地学习英语了！"