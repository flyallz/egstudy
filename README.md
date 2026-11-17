# ForumFlash 中文学习版

本仓库保存 ForumFlash 中文学习版的当前源码。课程内容、题目、词卡和页面仍在逐项与原站核对；仓库中的内容并不代表已经完成全部还原。

原作者已允许翻译原文素材供学习，并允许在 GitHub 托管。项目不用于商业用途。

## Windows 本地运行

需要 Node.js 22 或更新版本。进入 `local-run`，首次运行时执行 `npm ci`，此后每次需要查看最新源码时运行：

```powershell
cd 'D:\Projects\ForumFlash-中文版\local-run'
npm run build:client
npm run build:backend
npm start
```

打开 <http://127.0.0.1:60002/>。在终端按 `Ctrl+C` 停止。也可以在资源管理器中双击 `local-run/启动.bat`，它会构建前后端并启动服务。如果 60002 端口被占用，可在 PowerShell 中设置 `$env:PORT=60003` 后运行 `npm start`，再访问相应端口。

`已构建成品-dist/` 是旧的静态快照，不包含后续修改；`local-run/dist-client/` 是每次构建后生成的最新版前端。学习记录保存在本机 `local-run/app.db`，不会提交到仓库。

本地运行细节与限制见 [运行说明](local-run/运行说明.md)。
