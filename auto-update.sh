#!/bin/bash
# 自动任务更新脚本

set -e

echo "🔄 开始自动更新任务状态..."

# 进入脚本所在目录
cd "$(dirname "$0")"

# 运行节点脚本更新任务状态
if command -v node >/dev/null 2>&1; then
    node update-tasks.js
else
    echo "⚠️  Node.js未找到，跳过任务状态更新"
fi

# 检查Git状态
echo "📊 Git状态检查..."
git status --short

# 如果有更改，自动提交
if [[ $(git status --porcelain) ]]; then
    echo "📝 检测到更改，准备提交..."
    
    # 添加所有更改
    git add .
    
    # 提交更改
    COMMIT_MSG="自动更新任务状态 $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MSG"
    
    # 推送到远程
    echo "🚀 推送到GitHub..."
    git push origin master
    
    echo "✅ 更新已提交并推送"
else
    echo "✅ 没有需要提交的更改"
fi

echo ""
echo "📋 任务状态更新完成"
echo "🌐 查看GitHub: https://github.com/qimchen/PET-game"
echo "🚀 查看部署: https://pet-game-ruby.vercel.app/"