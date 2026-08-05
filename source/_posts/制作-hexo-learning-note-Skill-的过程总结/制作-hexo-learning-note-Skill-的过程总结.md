---
title: 制作 hexo-learning-note Skill 的过程总结
date: 2026-06-06 14:19:03
tags:
- Codex
- Skill
- Hexo
- Workflow
categories:
- note
mathjax: true
---
# 制作 hexo-learning-note Skill 的过程总结

## 需求

搭建一套学习工作流：先确定当前学习内容和阶段目标，然后通过网络资源、自己的笔记和 Codex 对话一起学习；阶段结束后，再把这些材料整理成一篇可以发布到个人 Hexo 博客的 Markdown 笔记。

这套工作流还有几个具体要求：

- 笔记用 `.md` 编写，支持图片、链接、视频链接和数学公式。
- 可以在本地用 Typora 修改。
- 修改完成后通过 Git 上传。
- Windows 和 Ubuntu 双系统互不直接访问对方磁盘。
- 博客由 GitHub Pages 和 Netlify 自动部署。
- 最终发布格式要贴合现有 Hexo 文章格式。



## 博客源码迁移

最开始，GitHub 上的 `xyzfrozen.github.io` 仓库只有 Hexo 生成后的静态网页文件，例如 `index.html`、`archives/`、`tags/` 等。

真正的 Hexo 源码在 Windows 本地：


```text
E:\blog
```

这个目录里有完整的 Hexo 源码结构：

```text
_config.yml
package.json
package-lock.json
source/_posts/
themes/
scaffolds/
```

为了让 Windows 和 Ubuntu 都能独立修改博客源码，我们把 `E:\blog` 初始化为 Git 仓库，并推送到 `xyzfrozen.github.io` 的 `source` 分支。这样 GitHub 就成为两个系统之间唯一的同步中心：

```text
Windows: E:\blog
Ubuntu: ~/blog
GitHub: xyzfrozen.github.io/source
```

Ubuntu 不需要访问 Windows 的 `E:\blog`，Windows 也不需要访问 Ubuntu 的磁盘。两边只通过 `git pull` 和 `git push` 同步。



## GitHub Pages 自动部署

为了不再手动执行 `hexo deploy`，我们在博客源码里加入了 GitHub Actions 工作流：

```text
.github/workflows/hexo-pages.yml
```

这个 workflow 会在 `source` 分支更新后自动执行：

```bash
npm ci
npx hexo generate
```

然后把生成后的 `public/` 发布到 GitHub Pages。

中间遇到过一个 GitHub Pages 环境保护问题：`source` 分支一开始不允许部署到 `github-pages` 环境。解决方法是在 GitHub 仓库的环境设置里允许 `source` 分支部署。



## Netlify 部署

除了 GitHub Pages，站点也部署到了 Netlify。Netlify 原本还在使用旧的 `master` 静态分支。为了让它也从源码构建，我们添加了：

```text
netlify.toml
```

内容是：

```toml
[build]
  command = "npm run build"
  publish = "public"

[build.environment]
  NODE_VERSION = "22"
```

之后把 Netlify 的生产分支切换到 `source`，Netlify 就可以和 GitHub Pages 一样，从同一份 Hexo 源码自动构建。



## 修复 permalink 问题

在 Netlify 构建日志中发现 Hexo 生成了大量 `undefined/...` 页面。原因是 `_config.yml` 中的 permalink 写成了：

```yaml
permalink: :xyzfrozen/:title/
```

这里的 `:xyzfrozen` 会被 Hexo 当作变量，但这个变量不存在，所以生成了 `undefined`。

后来修正为：

```yaml
permalink: xyzfrozen/:title/
```

本地重新构建后，旧的 `undefined/...` 页面被删除，新文章路径变成：

```text
xyzfrozen/<title>/<title>/index.html
```



## Skill 的目标

完成基础部署流程后，我制作了一个 Codex Skill：

```text
hexo-learning-note
```

它的目标是让 Codex 在学习和发布笔记时固定执行同一套流程：

1. 接收我想学习的主题。
2. 帮我确定当前阶段目标。
3. 给出学习笔记骨架。
4. 学习过程中持续整理链接、视频、原始笔记和对话结论。
5. 学习结束后接收我的最终 Markdown。
6. 用 `hexo new "title"` 创建 Hexo 文章。
7. 按我现有博客格式写入 front matter。
8. 运行 `npm run build` 验证。
9. 提交并推送到 `source` 分支。
10. 由 GitHub Pages 和 Netlify 自动发布。



## Skill 的文章格式要求

发布到博客时，文章 front matter 统一为：

```yaml
---
title: TITLE
date: YYYY-MM-DD HH:mm:ss
tags:
- TAG1
- TAG2
categories:
- note
mathjax: true
---
```

其中：

- `title` 使用最终文档标题。
- `date` 使用发布时间。
- `tags` 由我自己指定。
- `categories` 默认是 `note`。
- `mathjax` 默认开启。

正文中不再单独维护 `resources.yml`。网页链接、视频链接和学习笔记都直接写在同一个 Markdown 文档里。




## 当前工作流总结

最终形成的工作流是：

```text
确定学习主题
  -> 调用 $hexo-learning-note
  -> 生成阶段目标和笔记骨架
  -> 学习过程中写入链接、视频、原始笔记和讨论总结
  -> 阶段结束后整理最终 Markdown
  -> Codex 使用 hexo new 创建博客文章
  -> npm run build 验证
  -> git commit && git push
  -> GitHub Pages 和 Netlify 自动部署
```

Windows 和 Ubuntu 仍然保持独立：

```text
Windows: E:\blog
Ubuntu: ~/blog
同步中心: GitHub source 分支
```
