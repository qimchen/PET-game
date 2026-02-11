#!/usr/bin/env node
/**
 * 任务自动更新脚本
 * 用于更新 TASKS.md 文件中的状态信息
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function updateTasks() {
    console.log('📋 开始更新任务状态...');
    
    try {
        // 1. 读取当前任务文件
        const tasksPath = path.join(__dirname, 'TASKS.md');
        let content = await fs.readFile(tasksPath, 'utf-8');
        
        // 2. 获取Git信息
        let gitInfo = {
            lastCommit: '',
            lastDate: '',
            branch: ''
        };
        
        try {
            gitInfo.lastCommit = execSync('git log -1 --pretty=format:"%h"', { cwd: __dirname }).toString().trim();
            gitInfo.lastDate = execSync('git log -1 --pretty=format:"%cd" --date=short', { cwd: __dirname }).toString().trim();
            gitInfo.branch = execSync('git branch --show-current', { cwd: __dirname }).toString().trim();
        } catch (error) {
            console.log('⚠️  Git信息获取失败，继续其他更新');
        }
        
        // 3. 更新最后更新时间和Git信息
        const now = new Date();
        const updateTimestamp = now.toISOString().split('T')[0] + ' ' + now.toLocaleTimeString('zh-CN', { hour12: false });
        
        // 替换最后更新时间
        content = content.replace(
            /最后更新\*?\*?:.*$/m,
            `**最后更新**: ${updateTimestamp}`
        );
        
        // 如果有Git信息，添加Git状态
        if (gitInfo.lastCommit) {
            const gitStatusSection = `
## 🔧 Git状态

| 项目 | 值 |
|------|----|
| 当前分支 | \`${gitInfo.branch}\` |
| 最后提交 | \`${gitInfo.lastCommit}\` |
| 提交时间 | ${gitInfo.lastDate} |
| GitHub仓库 | [qimchen/PET-game](https://github.com/qimchen/PET-game) |
| Vercel部署 | [pet-game-ruby.vercel.app](https://pet-game-ruby.vercel.app/) |
`;
            
            // 在部署记录后插入Git状态
            const deploySection = '## 🚀 部署记录';
            if (content.includes(deploySection)) {
                const parts = content.split(deploySection);
                if (parts.length === 2) {
                    content = parts[0] + gitStatusSection + deploySection + parts[1];
                }
            }
        }
        
        // 4. 更新部署状态
        // TODO: 集成Vercel API获取部署状态
        // 暂时用占位符
        
        // 5. 写入更新后的文件
        await fs.writeFile(tasksPath, content, 'utf-8');
        
        console.log('✅ 任务状态更新完成');
        console.log(`📅 更新时间: ${updateTimestamp}`);
        
    } catch (error) {
        console.error('❌ 更新任务状态失败:', error.message);
        process.exit(1);
    }
}

// 主要执行
if (require.main === module) {
    updateTasks();
}

module.exports = { updateTasks };