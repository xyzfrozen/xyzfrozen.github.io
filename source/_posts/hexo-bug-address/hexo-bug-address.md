---
title: hexo bug address
date: 2025-06-18 17:44:21
tags:
- 杂谈
categories:
- technology
mathjax: true
---



# 前言

高考完了，终于有时间修一下之前博客的bug了



# 问题描述

本来只有一个markdown渲染失败的问题的

更换了多种markdown插件，以及mathjax和katex，都没有成功

然后在我尝试mathjax的时候，网站突然404，本地也显示cannot get/



# 问题解决

1. 搜索hexo 404，尝试网上大部分方法，失败

2. 搜索hexo cannot get/

	同样尝试了很多方法，都没用

	[hexo启动服务访问 cannot get · Issue #1309 · hexojs/hexo](https://github.com/hexojs/hexo/issues/1309)

	看完这个issue，我决定直接重建一个

	```
	npm install hexo-cli -g
	hexo init blog
	cd blog
	npm install
	hexo server
	```

3. 博客迁移

	将源文件中的__config.yml及主题yml迁移

	npm安装主题及deploy插件

4. hexo s成功

5. hexo d & g 后网站显示与本地不同，渲染失败

	[Hexo本地预览与部署不同的解决方法 | 小牛学习日记](https://nxhhhh.github.io/2024/01/19/Hexoerror/)

	[hexo+github搭建个人博客网站问题汇总和解决办法_heox+github搭建的博客网站打不开-CSDN博客](https://blog.csdn.net/qq_53101767/article/details/121587574)

	按第一篇文章中的方法尝试，刚开始还是渲染失败，过一会突然又渲染成功了很神奇



mathjax手动添加了，反正用着还可以大部分都能渲染，一小部分我也懒得修了

修这个玩意累死我了，整理快4个小时才弄好
