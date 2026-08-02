# sayori.org 主站内容

这里控制 `sayori.org` 的两层页面内容。用 Obsidian 改这些 JSON，再运行预览或部署脚本即可同步到静态站。

- `surface.zh.json` / `surface.en.json`：表层纸面，包含标题、入口、小服务、音乐按钮、贴纸短句。03 号「关于我」入口指向 `/about/` 独立页。
- `about.zh.json` / `about.en.json`：`/about/` 长期名片信的内容：信的分节、落款、底部 FAQ 和联系方式。几个月才需要重写一次，不要写会过期的当前计划。
- `truth.zh.json` / `truth.en.json`：底层终端，包含终端命令回复、彩蛋角色图、`.chr` 对话和终端提示文字。

同步目标：

- `sayori-home/public/assets/data/home-zh.json`
- `sayori-home/public/assets/data/home-en.json`
- `sayori-home/public/assets/data/about-zh.json`
- `sayori-home/public/assets/data/about-en.json`
- `sayori-home/public/assets/data/lines-zh.json`
- `sayori-home/public/assets/data/lines-en.json`

注意：

- 这里不要写密钥、Cookie、服务器后台地址或私人日记。
- 图片路径面向 `sayori-home/public/zh/` / `en/` 页面，通常写 `../assets/generated/name.webp`。
- 如果 JSON 写错，同步脚本会直接失败，不会假装成功。
