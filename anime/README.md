# 追番记录

这里是网站 `/anime/` 页面的源数据，也可以直接当 Obsidian 笔记改。

## 怎么加一条

1. 按状态选择目录：
   - `watching/`：在看
   - `completed/`：看过
   - `planned/`：想看
2. 新建一个 `slug.md`，复制已有条目的 frontmatter。
3. 把封面放到 `assets/<状态>/slug.webp`。
4. frontmatter 里的 `cover` 写这个文件名，例如 `cover: slug.webp`。

构建或运行 `node blog/scripts/sync-content.js` 后，会自动生成 `blog/src/data/anime.ts`，不要手改生成文件。

## 可改字段

- `title`：页面显示标题。
- `status`：`watching`、`completed` 或 `planned`。
- `rating`：个人评分。
- `description`：卡片上的短描述。
- `episodes`、`year`、`genre`、`studio`：展示信息。
- `link`：点击封面跳转的资料页。
- `progress`、`totalEpisodes`：进度条使用，系列作品可保留 0。

正文区域随便写自己的感想，暂时不会显示在追番卡片里，但方便以后扩展详情页。
