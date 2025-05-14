## How to use

### Setup Instructions

Recommend NodeJS version: v20.19.1

```bash
npm install
npm run dev
```

or

```bash
yarn
yarn dev
```

server will launch at: http://localhost:5173/
default port: 5173

## Features

A SPA show posts and detail information. data from jsonplaceholder.

### Routes

| 路由路徑           | 說明                       |
| ------------------ | -------------------------- |
| `/`                | 首頁，顯示所有貼文         |
| `/post-detail/:id` | 貼文詳細頁，顯示內容與留言 |
