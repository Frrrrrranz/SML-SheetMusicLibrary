# SML - Sheet Music Library 🎼

一个乐谱与录音管理应用，帮助音乐爱好者整理和管理乐谱和录音。

## ✨ 功能特性

- **作曲家管理** - 添加、编辑、删除作曲家信息
- **乐谱收藏** - 为每位作曲家管理乐谱（Sheet Music）并上传 PDF 文件
- **录音管理** - 记录演奏家的录音版本
- **搜索功能** - 快速查找作曲家和作品
- **云端同步** - 数据与文件存储于 Supabase

## 🛠️ 技术栈

| 前端 | 后端服务 |
|------|----------|
| React 19 | Supabase (PostgreSQL + Storage) |
| TypeScript | - |
| Vite | - |

> **注意**: 本项目直接使用 Supabase 作为后端服务，无需单独启动后端服务器。

## 🚀 快速开始

### 前置要求
- Node.js
- Supabase 账户

### 1. 克隆项目
```bash
git clone https://github.com/Frrrrrranz/SML-SheetMusicLibrary.git
cd SML-SheetMusicLibrary
```

### 2. 配置 Supabase
1. 在 [Supabase](https://supabase.com) 创建项目
2. 在 SQL Editor 中执行 `backend/schema.sql` 创建数据库表
3. 创建 Storage Bucket `sheet-music` 用于存储 PDF 文件
4. 在项目根目录创建 `.env.local` 文件：
```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的anon_key
```

### 3. 启动项目
```bash
npm install
npm run dev
```

访问 http://localhost:5173 开始使用！

## 📁 项目结构

```
SML/
├── App.tsx              # 主应用组件
├── api.ts               # Supabase API 调用层
├── supabase.ts          # Supabase 客户端配置
├── screens/             # 页面组件
├── components/          # 通用组件
└── backend/
    └── schema.sql       # 数据库结构
```

## 📄 License

MIT
