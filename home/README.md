# sayori.org 主站内容

这里控制 `sayori.org` 的两层页面内容。用 Obsidian 改这些 JSON，再运行预览或部署脚本即可同步到静态站。

- `surface.<lang>.json`：首页入口、服务面板、音乐按钮和贴纸短句。
- `about.<lang>.json`：关于页的介绍信、简历链接、FAQ 与联系方式；社交页也使用这里的联系信息。
- `truth.<lang>.json`：纸背终端的命令、彩蛋、角色对白与提示。

手写版本为 `zh`、`en`、`ja`、`fr`、`ko`、`es`、`de`、`pt-br`。繁体由简体转换；需要单独措辞时，用同名的 `*.zh-hant.json` 覆盖。六种新增译文保留链接、作品名与命令，在介绍信附言标明中文原文与 AI 协助翻译。简历与返回首页的链接指向同语言路径。

在主站运行 `node scripts/sync-home-content.mjs`，生成九种语言的 `public/assets/data/{home,about,lines}-<lang>.json` 和相应的静态社交页。

注意：

- 这里不要写密钥、Cookie、服务器后台地址或私人日记。
- 保留已有图片路径与音乐曲目 ID，不按语言重命名。
- 如果 JSON 写错，同步脚本会直接失败，不会假装成功。
