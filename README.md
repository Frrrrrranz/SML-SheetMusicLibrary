# SML Admin Console 🎼

<p align="center">
  <img src="https://img.shields.io/badge/Status-Maintenance-yellow?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

> **⚠️ 本仓库为管理员后台，仅供管理员操作云端数据使用。**
>
> 普通用户请使用 👉 [**SML-APP**](https://github.com/Frrrrrranz/SML-APP)（Android 客户端）

---

## 📌 项目定位

本项目是 SML（Sheet Music Library）的 Web 管理后台，主要用途：

- **管理云端乐谱数据**：上传/编辑/删除作曲家、乐谱、录音
- **管理用户数据**：云端 Supabase 数据库的增删改查
- **AI 音乐助手**：内置 AI 聊天（通义千问）

> 📋 本网页已关闭公开注册，非管理员无法访问。

## 🛠️ 技术栈

- **前端**: React 19 + TypeScript + Vite
- **后端**: Supabase (Database & Storage)
- **AI**: 通义千问 (DashScope API)，通过 Supabase Edge Functions 调用
- **动画**: Framer Motion
- **部署**: Vercel

## 🚀 本地运行（仅管理员）

```bash
npm install
# 在 .env 中配置 Supabase 凭据
npm run dev
```

## 🔮 未来规划

本网页将逐步改造为 **SML-APP 的官方介绍展示页**，作为用户下载和了解 SML-APP 的入口。

---

## 📄 相关仓库

| 仓库 | 说明 |
|------|------|
| [SML-APP](https://github.com/Frrrrrranz/SML-APP) | Android 客户端（主力开发） |
| [SML](https://github.com/Frrrrrranz/SML-SheetMusicLibrary) | Web 管理后台（本仓库，维护模式） |
