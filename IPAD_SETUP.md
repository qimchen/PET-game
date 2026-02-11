# iPad运行指南 - 为淼淼定制

## 🏠 家庭局域网访问（最推荐）

### 准备工作
1. **你的电脑**：保持运行本地服务器（已在运行）
2. **iPad**：连接到**同一个WiFi网络**
3. **IP地址**：192.168.1.3:8080

### 访问步骤
1. 打开iPad的**Safari浏览器**
2. 在地址栏输入：
   ```
   http://192.168.1.3:8080
   ```
3. 点击进入，游戏将加载

### 添加到主屏幕（创建App图标）
为了让淼淼像使用App一样方便：

**操作步骤：**
1. 在Safari中打开游戏
2. 点击底部中间的**分享按钮（📤）**
3. 向上滑动找到 **"添加到主屏幕"**
4. 将名称改为：**"淼淼的PET游戏"**
5. 点击 **"添加"**
6. 现在桌面上就有游戏图标了 🎉

**效果：**
- 点击图标直接打开游戏
- 像原生App一样全屏运行
- 不需要每次都输入网址

## 📡 互联网访问（外出时可选）

如果需要在外面也能访问，可以用 **ngrok**（临时公开链接）：

### 安装ngrok（第一次需要）
```bash
# 安装ngrok
brew install ngrok  # 或从官网下载

# 启动（需要账号token）
ngrok http 8080
```

### 获取公开链接
ngrok会提供一个类似这样的链接：
```
https://abc123.ngrok-free.app
```

**在iPad输入这个链接即可访问**

## 💾 离线使用（备用方案）

如果想要淼淼在没有网络时也能玩：

### 方法A：打包发送到iPad
1. 将整个游戏文件夹打包成ZIP
2. 通过AirDrop发送到iPad
3. 在iPad的文件App中解压
4. 使用 **"文件" → 找到index.html → 在Safari中打开**

### 方法B：使用文件共享App
1. 安装支持Web服务器的App（如"Server for PHP"）
2. 将游戏文件拖入App
3. 启动本地服务器

## 🔧 常见问题解决

### 无法访问？
1. **检查防火墙**：允许端口8080
   ```bash
   # 临时允许（macOS）
   sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/bin/python3
   ```

2. **检查服务器状态**：
   ```bash
   curl http://localhost:8080
   ```

3. **确保同一网络**：电脑和iPad连接到同一个WiFi

### 游戏卡顿？
- 检查网络信号强度
- 关闭其他大型App
- 清除Safari缓存

## 📞 快速帮助

**爸爸的操作备忘录：**

**启动游戏服务器：**
```bash
cd ~/.openclaw/workspace/projects/pet-game-simple
python3 -m http.server 8080
```

**获取当前IP地址：**
```bash
python3 -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8', 80)); print('IP地址：', s.getsockname()[0]); s.close()"
```

**iPad访问地址模板：**
```
http://[你的IP地址]:8080
```

当前地址：**http://192.168.1.3:8080**

---

**淼淼专属设置完成！🎮**
游戏已为9岁女孩优化，界面友好，操作简单，支持离线进度保存。

有任何问题随时告诉我！ 😊