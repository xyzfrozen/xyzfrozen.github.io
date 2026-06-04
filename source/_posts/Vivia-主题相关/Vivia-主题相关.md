---
title: Vivia 主题相关
date: 2023-10-28 11:23:47
tags:
categories:
- technology
mathjax: true
---

因为这个主题没有置顶和隐藏功能，需要换一个主题

`Vivia` 的主题配置

```cpp
# Header
menu:
  Home: /
  Archives: /archives
  About: /about
rss: /atom.xml

home:
  style: default           # default, detail

favicon:                   # Path to the custom favicon (e.g. "/favicon.png" if your favicon file is located at /source/favicon.png)

# Banner
banner:
  enable: true            # Display banner
  url: /image/miku x Darling.png
  position: center         # Specifies the alignment of the image, see the "object-position" property in CSS
  onAllPages: true         # Display banner on all pages

# Appearence
hue: 270                   # The hue of the theme color (e.g. red: 0, orange: 60, blue: 260, purple: 300, pink: 345)

# Sidebar
sidebar:
  widgets:                 # Plugins to be enabled (profile, category, tag, archive, recent_posts)
    normal:                # Scroll along with the page
      - profile
    sticky:                # Stick to the top of the page
      - category
      - tag
      - archive
      - recent_posts

# Widget behavior
archive_type: 'monthly'
recent_posts_limits: 5
categories:
  max_depth:              # Maximum depth of categories displayed in the widget (null for unlimited)

# Math
math:                        
  katex:
    enable: true             
    copytex: true            
    mhchem: false            
  mathjax:
    enable: false           

# Personal info
avatar: 
author: xyzfrozen
subtitle: My darling,stay gold
links:
  - name: Cnblogs
    icon: fa-solid fa-blog # Find icon codes at https://fontawesome.com/search
    url: https://www.cnblogs.com/xyzfrozen
  - name: Luogu
    icon: fa-solid fa-l
    url: https://www.luogu.com.cn
  - name: GitHub
    icon: fa-brands fa-github
    url: https://github.com

comment:
  valine:
    enable: false
    appId: 
    appKey: 
    placeholder: Just go go
    pageSize: 15
    highlight: true
    serverURLs: 
    # Other supported parameters can be added here if needed
    # Visit https://valine.js.org/configuration.html for more details


#Analytics
gauges_analytics: false
google_analytics: false #UA-xxxxxx
baidu_analytics: false # ddxxxxxxxxxxxxxxxxx In the https://hm.baidu.com/hm.js? Afterwards

#Copyright
copyright: #<a target="_blank" rel="noopener" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" style="margin-inline:5px" title="本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可"><img src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?style=flat&amp;logo=Claris"></a>
```

