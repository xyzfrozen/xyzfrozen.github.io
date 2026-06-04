---
title: 杂题精选 Nov.1 Wildest Dreams
date: 2023-11-06 23:38:02
tags:
- 状压 Dp
- 思维
- 并查集
- 树形 Dp
- 二分图
- 线性 Dp
- MST
categories:
- problem
mathjax: true
---

[P3092 [USACO13NOV\] No Change G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3092)

观察到 $k$ 很小，直接考虑状压用那些硬币

因为状压可以顺便做掉硬币的顺序，直接 $dp$，注意物品题目规定了按顺序买

设 $f_S$ 表示仅用 $S$ 内的硬币，可以达到的右端点，判断 $\geq n$ 即可加入答案

[U93147 旅行诗（lyric） - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/U93147)

多年前就想做的一道题

考虑这条路径，如果是到子树内部的，可以直接 $dp$ 做，如果是到父亲的，我们就放到 $lca$ 统计

具体来说，设 $f_i$ 表示 $i$ 到子树内节点的最小逃脱代价，$O(n)$

我们直接树上倍增，维护前缀和和最小值，然后查询直接暴力向上跳知道 $dep \lt k$ 即可，$O(m\log n)$，$88pts$

直接树上 $k$ 级祖先可以做到 $O(n\log n)-O(m)$ 的复杂度，可以通过

[题目详情 - 星球联盟 - BZOJ by HydroOJ](https://hydro.ac/d/bzoj/p/4998)

$xyd$ 老题

离线所有边建图，这个图我们把他拆成树边+非树边

如果一条边是树边，则输出 $NO$ 即可，否则我们需要查询

我们考虑非树边的贡献，相当于覆盖了一条树上路径，可以全部缩到一个并查集里面

这是一个并查集的经典应用 [并查集应用 - OI Wiki (oi-wiki.org)](https://oi-wiki.org/topic/dsu-app/)

我们维护一个树上集合，绑定在 $dep$ 最浅的点上面，每次直接暴力合并即可，每条边至多覆盖一次，$O(n\alpha (n))$ 

注意这里不要直接启发式合并了，一定是按 $dep$ 来

合并链

```cpp
void cover(int x,int y)
{
    x=find(x),y=find(y);
    while(x!=y)
    {
        if(d[x]<d[y]) swap(x,y);
        merge(x,fa[x]);
        x=find(x);
    }
}
```

[P6185 [NOI Online #1 提高组\] 序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P6185)

[题解 P6185 【[NOI Online 提高组\]序列】 - ylxmf2005's Blog - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/ylxmf2005/solution-p6185)

[P1129 [ZJOI2007\] 矩阵游戏 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1129)

有一个黑棋子，我们就把对应的行向对应的列建边

现在问题等价于，是否能给每一行分配唯一的列，满足全部条件，网络流二分图最大匹配即可

[Count Binary Strings - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1767C)

[题解 CF1767C 【Count Binary Strings】 - CQ 最菜 OIer - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/Leasier/solution-CF1767C)

操作 $1$ 等价于 $i,j$ 的 $LCS \geq j-i+1$ ，操作二相反

$f_{i,j}$ 表示 $[j,i]$ 相等的方案，分类讨论 $j$ 的位置即可，当 $j \lt i,f_{i,j}=f_{i-1,j}$,否则 $f_{i,j}=\Sigma_{k=1}^{i-1} f_{i-1,k}$

最后还要 $\times 2$ 因为第一个连续段选 $0/1$ 任意

[P8745 [蓝桥杯 2021 省 AB\] 括号序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8745)

[P8745 [蓝桥杯 2021 省 AB\] 括号序列 - hzx2020 的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/hzx2020/solution-p8745gg)

[括号序列-蓝桥杯 - ever_garden - 博客园 (cnblogs.com)](https://www.cnblogs.com/evergarden/p/16072437.html)

左右括号的添加互不影响，序列翻转求右括号

每个右括号左侧至少要有多少左括号才能保证从左往右扫描和大于等于 $0$

$f_{i,j}$ 第 $i$ 个右括号 $[1,pos_i]$ 多了 $j$ 个左括号的方案数，当 $j\geq dif_i$，$dif_i$ 为右括号 $i$ 差的左括号，合法

$f_{i,j} =\Sigma_{k=dif_{i-1}}^j f_{i-1,k}$ 我们直接在 $[pos_{i-1},pos_i]$ 之间加即可 

[P2474 [SCOI2008\] 天平 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2474)

差分约束上下界

[Balance (Hard version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1732D2)

观察到 $+$ $?$ 跳表操作可以记忆化，而 $-$ 就是去掉记忆化，设 $infl$ 维护这个

跳表过程同时维护 $-$ 的影响，$i \times x$ 可以影响到 $x$ 的记忆化，如果 $i\times x$ 在集合中，在 $infl[i \times x]$ 中加入 $x$ ，同时为了保证复杂度，我们不能撤销记忆化数组，我们再开一个 $vector$ $del$，表示那些原来在集合中现在被撤销的数

我们每次 $- i\times x$ 操作就往 $del[x]$ 里面插入 $i\times x$ ，考虑到跳表递增，只要 $del_x$ 不为空，则一定是最小的成为答案

$O(q\log n)$

[P5414 [YNOI2019\] 排序 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5414)

考虑移动一个数一定是移动到了所在的位置，问题等价于不动一些数，求总和-最大剩下来的成本

不移动的数构成了一个单调不降子序列，求一个单调递增子序列它里面数的和最大

[P2039 [AHOI2009\] 跳棋 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2039)

[Zero-One (Easy Version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1733D1)

$r-l$ 次 $x$ 操作可以转化为 $(l,r)$ 的操作！

 现在只需要考虑远程操作加上一个 $y$，但是每两次才操作一次，所以需要判断当前是否 **负债**，设 $f_{i,0/1}$ 表示 $i$ 是否在**负债**状态

$f_{i,1} = f_{i-1,0},f_{i,0}=f_{i-1,1}+y$

$f_{i,0} = f_{i-2,0}+(pos_i-pos_{i-1})\cdot x,f_{i,1}=f_{i-2,1}+(pos_i-pos_{i-1})\cdot x$

[P2619 [国家集训队\] Tree I - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2619)

我们考虑 $kru$ 的过程，是根据边的边权来判断是否选择的

所以我们要恰好 $need$ 条边，可以给白边加上/减去一个值，强心卡到 $need$，又保证了最小

不知阈值，直接考虑二分即可

[P8096 [USACO22JAN\] Drought G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8096)

偶数状态都可以两两消 $0$，所以直接 $lim=0$ 即可，这种时候算多了可以把 $dp$ 表打出来看看
