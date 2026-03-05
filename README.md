# SML-APP 🎼

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor" />
  <img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9" alt="Electron" />
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android" />
  <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-GPL_v3-blue.svg?style=for-the-badge" alt="License: GPL v3" /></a>
</p>

一个简洁、高效的乐谱与练习录音管理应用，支持 **Android** 与 **Windows** 双平台，为音乐学习者提供便捷的资源整理方案。

---

## 🌟 核心功能

- **🎼 乐谱管理**：上传 PDF 格式曲谱，打造私人数字曲库
- **🎙️ 练习录音**：记录与管理练习音频，见证演奏进步
- **🗂️ 分类整理**：按作曲家和作品系统化管理音乐资产
- **🤖 AI 音乐助手**：内置 AI 聊天，随时解答乐理、音乐史等问题
- **📱 离线使用**：本地存储，无需网络即可管理乐谱
- **☁️ 云端同步**：可选的 Supabase 云端数据同步
- **🖥️ Windows 桌面端**：Electron 打包，原生桌面体验，内置自动更新

## 📥 下载与安装 (Download & Install)

### Android

1. **前往下载**: 访问 [GitHub Releases 页面](https://github.com/Frrrrrranz/SML-APP/releases)
2. **获取文件**: 找到最新的 **SML-APP Release** 版本，下载 `app-release.apk`
3. **安装应用**: 在 Android 手机上打开下载的 APK，如有提示请允许"安装未知来源应用"

### Windows 桌面端

1. **前往下载**: 访问 [GitHub Releases 页面](https://github.com/Frrrrrranz/SML-APP/releases)
2. **获取文件**: 找到最新的 **desktop-vX.X.X** 版本，下载 `.exe` 安装包
3. **安装应用**: 双击安装包即可完成安装
4. **自动更新**: 应用内置自动更新功能，后续版本会自动推送

---

## 🛠️ 技术实现

### 客户端
- **框架**: React 19 + TypeScript
- **移动端原生层**: Capacitor (Android)
- **桌面端原生层**: Electron (Windows)
- **构建工具**: Vite
- **动画**: Framer Motion
- **图标**: Lucide React
- **路由**: React Router

### 跨平台策略
- 单一代码库同时支持 Android 和 Windows
- `platform.ts` 提供统一的 `isElectron()` / `isAndroid()` 平台检测
- 数据层通过适配器自动路由到正确的 SQLite 实现
- UI 层根据平台切换 BottomNav ↔ SideNav 导航方式

### 后端与 AI
- **云端服务**: Supabase (Database & Storage)
- **本地存储**: Capacitor Preferences + Filesystem / Electron IPC
- **AI 能力**: 通义千问 (DashScope API)

---

## 📌 关于本仓库

> **本仓库为 SML-APP 的 Web 展示页**，已从原管理后台改造为 SML-APP 的官方介绍页面。
>
> ⚠️ **SML-APP 的所有后续开发与更新均在 [SML-APP 仓库](https://github.com/Frrrrrranz/SML-APP) 进行。**

本网页采用 GTA6 风格的沉浸式滚动设计，包含：
- 全屏深色主题 + GSAP ScrollTrigger 滚动驱动动画
- 金色粒子 Canvas + 桌面端自定义光标
- 5 段式布局：Hero / 功能揭示 / 故事叙述 / 技术展示 / CTA
- 中英文双语切换
- 部署于 Vercel

### 本地运行

```bash
npm install
npm run dev
```

---

## 📄 相关仓库

| 仓库 | 说明 |
|------|------|
| [SML-APP](https://github.com/Frrrrrranz/SML-APP) | Android & Windows 客户端（**主力开发，所有更新在此**） |
| [SML-Web](https://github.com/Frrrrrranz/SML-SheetMusicLibrary) | Web 展示页（本仓库） |

## 📄 协议 (License)

本项目基于 [GPL-3.0 协议](LICENSE) 开源。详细信息请参阅 [LICENSE](LICENSE) 文件。

## 📄 致谢

本项目的 UI 组件和动画设计灵感部分源自 [ShipSwift](https://github.com/signerlabs/ShipSwift.git)，由 [SignerLabs](https://github.com/signerlabs) 开发。特别感谢其对移动端体验和 AI 交互动画的探索，为本项目的前端优化提供了宝贵参考。
