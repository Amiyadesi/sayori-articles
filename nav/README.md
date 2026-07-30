# sayori.org 资源导航内容

这里控制 `nav.sayori.org` 的全部内容。用 Obsidian 改 `nav.zh.json`，再运行发布脚本即可同步到站点。

## 文件

- `nav.zh.json`：资源导航唯一内容源，分类和条目全在这一个文件里（方便跨分类移动）。

## 结构

```json
{
  "meta": { "title": "...", "description": "...", "updated": "YYYY-MM-DD" },
  "categories": [
    {
      "id": "music", "num": "01", "name": "音乐与音效", "icon": "🎵", "desc": "一句话描述",
      "entries": [
        {
          "name": "站点名（必填）",
          "url": "https://...（必填）",
          "desc": "一句话说明（必填）",
          "usage": "怎么用（可选）",
          "license": "授权/使用条件提示（可选）",
          "tier": "top 或 good（可选；top → 🥇，good → 👍）",
          "tags": ["可选"],
          "added": "YYYY-MM-DD（可选，90 天内显示「新」）"
        }
      ]
    }
  ]
}
```

## 规则

- 🥇（tier: "top"）控制在 25 条以内，只标真的会反复回去用的。
- `license` 写口语化提示即可，不追求规范化；站点页脚统一声明「授权以各站当页说明为准」。
- 新条目尽量补 `added` 日期，`meta.updated` 每次改动顺手更新。
- 同步目标：`sayori-nav/public/assets/data/nav-zh.json`（经 sayori-articles 镜像 + sayori-nav CI 的 sync 脚本生成）。
- 这里不要写密钥、Cookie、服务器后台地址或私人链接。
- JSON 写错时 CI 的 nav-data 测试会失败，部署会停，不会上线半坏页面。
