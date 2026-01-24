# SML - Sheet Music Library 🎼

一个乐谱与录音管理应用，帮助音乐爱好者整理和管理乐谱和录音。

## ✨ 功能特性

- **作曲家管理** - 添加、编辑、删除作曲家信息
- **乐谱收藏** - 为每位作曲家管理乐谱（Sheet Music）
- **录音管理** - 记录演奏家的录音版本
- **搜索功能** - 快速查找作曲家和作品
- **云端同步** - 数据持久化存储于 Supabase

## 🛠️ 技术栈

| 前端 | 后端 | 数据库 |
|------|------|--------|
| React 19 | FastAPI | Supabase (PostgreSQL) |
| TypeScript | Python | - |
| Vite | Uvicorn | - |

## 🚀 快速开始

### 前置要求
- Node.js
- Python 3.10+
- Supabase 账户

### 1. 克隆项目
```bash
git clone https://github.com/Frrrrrranz/SML-SheetMusicLibrary.git
cd SML-SheetMusicLibrary
```

### 2. 配置 Supabase
1. 在 [Supabase](https://supabase.com) 创建项目
2. 在 SQL Editor 中执行 `backend/schema.sql`
3. 创建 `backend/.env` 文件：
```env
SUPABASE_URL=你的项目URL
SUPABASE_ANON_KEY=你的anon_key
PORT=8000
```

### 3. 启动后端
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### 4. 启动前端
```bash
npm install
npm run dev
```

访问 http://localhost:3000 开始使用！

## 📁 项目结构

```
SML/
├── App.tsx              # 主应用组件
├── api.ts               # API 调用层
├── screens/             # 页面组件
├── components/          # 通用组件
└── backend/
    ├── main.py          # FastAPI 入口
    ├── routers/         # API 路由
    ├── models.py        # 数据模型
    └── schema.sql       # 数据库结构
```

## 📄 License

MIT
