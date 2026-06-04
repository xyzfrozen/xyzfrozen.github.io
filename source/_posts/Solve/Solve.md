---
title: Solve
date: 2023-10-01 22:38:01
tags:
categories:
- ideas
sticky: 999
mathjax: true
---

1. 读完题，开始不要动键盘，先想好再码
2. 分配好时间，每个题要拿多少分要用多少时间
	如果某个正解挂了，要打多少分暴力
3. 想到算法后，手玩一下样例
4. 对题目难度选择合适算法，高级数据结构/多项式要上想想有没有更简单的方法
5. 心态要好，即使正解冲爆了，也要冷静

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310012239604.png)

来自 $Elegia$ 

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310012239894.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310012240474.png)

# Warn

被卡空间没法 $\text{define int long long}$ 需要修改 $\text{max，min，fr，fw}$

多测 $memset$ 一定要注意，有可能会 $tle$，比如数组开的是最大状态，每次 $n=1$，数据最多，需要用 $for$ 循环初始化 [P8280 「MCOI-08」Photoelectric Effect - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8280)

$bfs$ 只能做单一边权，$0/1$ 需要双端队列 $bfs$ [P3070 [USACO13JAN\] Island Travels G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3070)

注意如果如果输入有空字符串，要用 $getline$ 读入，$scanf$ 自动跳过空行 

最大值要开到足够大！！！

$\text{long long}$ 用 $1ll$ 左移！！

%x 的时候要判断 $x$ 是否为 $0$

注意边界条件

注意基环树和无向图如果用 $vis_x$，一定要 [P5049 [NOIP2018 提高组\] 旅行 加强版 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5049)

```
if(vis[x]) return;
```

有根树的度是儿子的个数，无根树跟无向图一样，度数是相连的边 

注意所有取模最后都要 $\text{+=mod}$  %$\text{=mod}$ （要剪掉一个数的）[P4999 烦人的数学作业 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4999)

$multiset$ 删除的时候一定要删迭代器，而不是删值，否则会把所有这个值删掉 [P9588 队列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P9588)

```cpp
s.erase(s.lower_bound(x))
```

$define$ 里面是计算式子的时候要加括号

```cpp
Define p(x) (x)*(x)
```

dfs无论如何都要返回

```C++
if(!now) return !(s%b); //正确
if(!now && !(s%b)) return 1; //错误 不满足就无法递归了
```

区分平面直角坐标系 和矩阵上的 $x，y$

有返回值类型的函数一定要写返回值 否则开了 O2 可能会出错

文件名不要有符号空格等 避免断点触发错误

注意如果字符数组输入时 $+1$ 了，所有调用都要 $+1$，不 $+1$ 成空串了

```C++
strcmp(s[i]+1,s[k+1]+1)
```

读入单个字符，比如 $A$

```C++
char op[2];
scanf("%s",op);
ch -> *op
```

$dfs$ 最优性剪枝写在 $now>=n+1$ 前一行！！ 注意随时 $ans$ 取 $min$

$log2(0)$ 是负无穷

注意判断 $x\cdot i<=n$ 的时候一定要写成 $x \leq \frac ni$ 

就算写了 $x \cdot i \gt 0$ 因为越界了截取是看最高位是 $0$ 还是 $1$ 可能还是被判成正数了

网络流里面如果网格等从 $0$ 开始的话，源点不能设为 $0$ 改成 $N-2$

如果用到并查集里面的 $pb$ 把宏定义去掉

$rope$ 替换用 $replace$ 不要用 $=$

$rope$ 初始化碰到 $0$ 停止，要保证用到元素范围内一定没有 $0$ ，比如存的是前缀和什么的就要注意！

注意数位 $dp$ 里面求 $[l,r]$ 满足要求的数，如果 $l$ 是类似 $0$ 这种下界的，就不要减去 $dp(l-1)$了，会越界！！！

维护单调序列的时候，注意自己是否也需要和后边一起变成单调序列，可能后面的是单调的，但是加上自己就要去掉后面的一些才单调，这样答案就错了

如果前缀和取模的话 调用区间要 $+Q$ ！！！！

Long double 形用 double 输出会错，用 %LF

%x 的时候要判断 $x$ 是否为 $0$ ！！！

有多个名字相同的函数时，复制一定要注意变量名改完了没有

最大值要开到足够大！

做树形 $dp$ 考虑是不是森林

注意如果如果输入有空字符串，要用 $$getline$$ 读入，$scanf$ 自动跳过空行

$string$ 删除了某个数之后，后面的数会接上来，如果 $i++$，就会错过 $i+1$ 了 [P1323 删数问题 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1323)

判断一个数的位数的时候一定要注意 $0$ [P9437 『XYGOI round1』一棵树 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P9437)

注意要用

```cpp
i<(int)sz[x].size()-1
```

这样写

```cpp
i<sz[x].size()-1ll
```

$windows$ 可以，在 $linux$ 还是不行

注意用原数组转移的转移顺序，[P8188 [USACO22FEB\] Email Filing S - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8188)

取模有减法的话一定要 `+=Q`

注意无向图还是有向图，连边不要想当然[P7297 [USACO21JAN\] Telephone G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7297)

优化建图的时候，一定要注意是否联通 [P7297 [USACO21JAN\] Telephone G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7297)

想到一个什么贪心的思路，先不着急推翻，记下来，看可不可以调整一下，提高正确性，说不定就是正解，只是自己没法证明而已

折半搜索的时候一定要注意

`if(now==n/2+1)` 和 `if(now==n+1)` 这两个递归条件一定要写在算贡献之后，递归之前 [P9234 [蓝桥杯 2023 省 A\] 买瓜 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P9234)

剪枝 `if(d.count(s) && d[s]<cnt) return;` 要看情况判断 `d[s]<=cnt` 还是 `d[s]<cnt`

折半搜索排序要两侧分开排序

莫队注意 `++--`

快速幂底数也要取模 [Willem, Chtholly and Seniorious - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF896C)

`ODT` 一定要先 `R` 再 `L` [P4344 [SHOI2015\] 脑洞治疗仪 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4344)

`Trie` 清空从 $idx$ 从 $0$ 开始！！！

线段树二分注意二分的区间和所求区间的关系，是否需要加上 $[1,l-1]$ 的贡献，注意这里还要判断  $l \not =1$

错误 `modify(l2,find(l2,r2,1,one),1,1);`

正确 `modify(l2,find(l2,r2,1,one+((l2==1)?(0):sum(1,l2-1,1))),1,1);`

[P4344 [SHOI2015\] 脑洞治疗仪 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4344)

网络流双向边开两倍边空间

网络流的队列数组要开到足够到不只是 $N$ [P2457 [SDOI2006\] 仓库管理员的烦恼 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2457)，建议直接开 1000 背

$\oplus$ 只有在 $=$ 的时候才可以两边同时 $\oplus$ 某个值，$i \oplus a_j \lt j \oplus a_i$ 这种不能两边 $\oplus$

[Xor-Subsequence (hard version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1720D2)

单调队列转移的时候一定要判断是否合法 [P6434 「EZEC-1」甜品 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P6434)

单点算不算链

`MST` 要求 `lca` ！！！

写单调队列不要写成单调栈了

长剖 `MLE`，`x==Top` 写成 `top[x]==Top`，还有先合并子树信息再递归

使用 `s+=getchar()` 添加字符

同步流不关 `cout`



# Trick



1. 拿到一个问题，先想想有没有做过类似的题，如果有考虑原来的算法
2. 当一个题条件 $$\geq$$ 2 的时候 先分解条件 条件内部继续细化子问题
3. 每个约束条件先假设答案，观察答案性质，考虑答案的形成，假设答案不仅是一个数，还可以是一个子树的遍历顺序，儿子的答案序列等
4. 考虑算法，先打暴力
5. 代码复杂度优先考虑，优化在整体框架打完之后在考虑
6. 决定打优化前先把暴力代码存下来
7. 部分枚举，一般枚举无法求的量，通过它求个范围或者啥玩意来求解
8. 根据时间复杂度确定枚举什么
9. 复制代码的时候，ctrl + A 后再 Ctrl+c，保证不会有什么其它的比如样例的东西复制进去
10. 按一定的**顺序枚举** 防止算重
11. 正难则反，删除 $\to$ 保留！！！，不合法 $\to$ 合法
12. 发现自己思考的情况很复杂的时候，想想在题目的条件下是否可能出现这种情况
13. 设计状态直接考虑子问题，求 $n$，就考虑任意数，求组合就考虑加入某个数，然后按顺序加入保证不重复，如果讲顺序最后再乘个方案数
14. 离线少一维，扫描线，端点递增，离线区间按右端点/左端点处理信息，带修就想线段树，大力分讨
15. 考虑两个极近的相等元素，就能转化成区间包含



在推式子这一块还是有待提升，经常还是要回看一些题目

多找找题目与之前做过题的相同点，和这个题目独特的地方

感觉这个转移不了就加一维是个神仙思路啊，还有强行选定某个东西，直接加维，真的巧妙

一些题看出来了，先把经典式子写出来，多画画图

有时候把维度放到平面直角坐标系，求的其实是一个矩阵的最值啥玩意，这个用数据结构搞很方便

还有，管他啥玩意，先上个 $i\;j$ 这样某些区间中间的操作就好搞了

多想想题目几个变量之间的联系，这样就可以用比较少的维度维护比较多的信息，可以考虑换某个维度表示的意义，来方便维护，但是结果算的方式不一样，来得到一样的效果

注意等价转化和问题的缩小（子问题）

优化的时候一定要把原来的暴力代码留着！！

注意可能题目是诈骗，比如最少操作数，如果每个点至多操作一次，等价于问最少需要操作几个点

别忘记了还有**冰茶姬**！！！！！！！

找环可以用 $topsort$ 和冰茶姬

$dp$ 不只需要维护所求状态，还需要维护"辅助状态"

辅助状态可以是多个条件，也可以是所求状态取反面，$\oplus$ 等

当维护的东西过多，可以直接某个需要维护的东西强行变成 $dp$ 数组的一维

值域太大了，但是有可能可以用 $map$ 缩小到 $O(n)$ 等小级别

有重复元素可能是比如 $n$ 为偶数分成两半这种情况

注意当需要维护单调序列时，是否要考虑自己会影响答案，不能无脑不管自己

当答案更新的点很少时，只用考虑那些点就行了

$set/multiset$ $lowerbound$ 用成员函数，普通的退化到 $O(n)$，容器下标不连续！！

当有多个元素需要遍历一次计算，复杂度过高时，可以考虑遍历一次算出所有元素

组合数考虑杨辉三角，注意还有定义式！！，考虑约分这种

什么全部子集，直接考虑每个元素的贡献

分数形最值，$01$ 分数规划！！

求一个区间，可以考虑根据区间长度分类

考虑清楚每个点的状态，有些条件是不需要加到状态里面的

一个排列是由多个置换环决定的！！

删边 $\to$ 加边

对于两个相等元素控制区间可能在端点重复导致算重，可以考虑改成前开后闭这种形式

背包问题，$m$ 上线很大的时候，可以考虑和某个约束取 $min$，然后把所有超过这个上界的贡献全部算到 $f[limit]$ 上面，一般适用于求最大值的情况

如果一段固定序列，让你求不管 $[l,r]$ 的答案，直接考虑维护前后缀答案，类似 $f[l-1]+g[r+1]$ 这样算

考虑二分答案的时候，出现那种半单调的，比如 $s_r-s_{l-1}-ans \times (r-l+1)$ 这种，就把 $ans$ 搞进去，先把前缀全部 $-ans$ 就具有单调性了

还有最大密度子图这种，可以化成有相同项的，对前面的常数也可以调整

优先队列重载，写的时候大根对重载小于号，然后它是大的在前面

小于号真就会到后面，手动模拟下就推出来了

什么可以免费 $k$ 段路，逆向走 $k$ 条啊，考虑分层图， $k \leq 20$

有些限制条件在最优情况肯定不会出现的，就不用管了

$dfs$ 没有边界了，就考虑用 $bfs$ 搜

树上子树/单点/链修改查询 $\to$ $dfn$ 序

每个子串都是某个前缀的后缀！！

判断链，两个点 $d=1$，$n-2$ 个点 $d=2$

无向图缩点，直接冰茶姬！！

和二进制有关的，考虑拆开每一位算

做树形 $dp$ 注意是不是森林

vector 清空注意用

```
vector<int>().swap(as)
```

两个数相等合并成一个数这种，主要不能全部 $f$ 是 $0$，有可能 $a_i=0$ 初始成 $-1$

环直接考虑断环成链

判断区间 $[l,r]$ 满足某个条件，比如 $s[l,r]=0$，枚举 $r$，$map$ 找 $s_r=s_{l-1}$

有时候状压复杂度不对，但是这个状态必须满足比如 $size=?$ 的条件，就可以用 $dfs$ 爆搜出来方案，优化复杂度

不要惯性认为 $T1$ 不可能 $dp$

upd：$T1$ 甚至可能放换根 $Dp$

状压 $dp$ 的时候，如果有两个集合，一个集合转移需要枚举当前集合最后一个和对面集合的某一个，直接让对面集合的哪一个为 $T_{sz(S)}$ 即可，答案一定可以被枚举出来

不好直接算一个东西的时候，就考虑 $dp$

bitset 字符串匹配 $O(\frac{n+m}{w})$ [link](https://codeforces.com/contest/914/submission/221940038 "link")

注意是拆前缀和的时候找 $s_r$ 是对于 $s_l-1$ 不是 $s_l$

动态开点权值线段树的时候，它的值域的 $inf$ 和那种 $ans=inf$ 不能混用！！！

所有线性 $Dp$ 都要注意算答案不一定是 $f_n$

多个数问题，用集合的方式考虑，整个集合大部分都要操作的，就会用到整体偏移量，即少部分数  $-=val$ 等价于剩下的数加上 $val$

依赖顺序的贡献就考虑调整法，就是考虑交换对于答案产生的贡献，令其 $\geq 0$，然后看不等式条件是啥

某些式子的限制可以转化为某种 贪心/$Dp$ 的决策思路/准则，比如 $(a+b)^2 \geq a^2+b^2$ 如果是求平方的和，就要尽量拆数字

限制条件相似项全部丢到一边

考虑倒着做，通过某种方法去掉限制

考虑可以枚举什么东西，从这些东西开始考虑

考虑利用比如 $2^i \to 2^{i+1}$ 这种关系转移，抓住主要解决的东西进行枚举，换东西枚举，枚举无法求的东西 ，比如 NOIP 数列

$n\leq 10^{18}$ 矩阵快速幂，压缩值域，推式子

正难则反，容斥考虑枚举一个什么东西，不重不漏统计即可

无向图连通块内部任意两点距离 带权并查集/并查集+差分约束

`set` 的 `find` 是 $O(\log n)$ 的

并查集合并注意是否在同一个集合里面

枚举子集 ，$O(3^n)$

```cpp
for(int T=S;T;T=(T-1)&S)
```

[集合枚举子集-学习笔记 - 编程客 - 博客园 (cnblogs.com)](https://www.cnblogs.com/One-coder/p/16113670.html)

区间最大值只有 $n$ 种 [Range Sorting (Hard Version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1827B2)

考虑利用什么性质简化操作

比如两个相交区间操作不如一个区间操作，操作一段区间一定操作到区间末尾 [P3287 [SCOI2014\] 方伯伯的玉米田 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3287)

不知道单独选它优秀还是留着它优秀，可以二分一个值，根据它的属性和这个mid判断的结果来选择 [P5021 [NOIP2018 提高组\] 赛道修建 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5021)

考虑树可以从二叉树的情况考虑

路径集就维护两类，链和跨过的方案

`multiset` 维护备选方案 [P5021 [NOIP2018 提高组\] 赛道修建 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5021)

从 $1$ 走到 $n$ 困难，就从 $n$ 走到 $1$ [Keshi in Search of AmShZ - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1693C)

有向图可以先考虑 $DAG$ 的情况 [Keshi in Search of AmShZ - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1693C)

维护区间看看是不是只用维护左端点 [Count the Trains - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1690G)

质数只可能是偶数+奇数 [P5771 [JSOI2016\] 反质数序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5771)

当维护类似 $i \oplus a_j \lt j \oplus a_i$ 的时候，可以维护 $(i,a_i)$ 这样的二元组

[Xor-Subsequence (hard version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1720D2)

区间转前缀和，如区间状态相同且区间可消除，等价于 $[1,l-1]=[1,r]$

[Burenka and Traditions (hard version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1718A2)

[P9753 [CSP-S 2023\] 消消乐 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P9753)

区间操作最小化操作数

1. 操作 $[1,i] \operatorname{or} [i,n]$
2. 考察区间相交是否优
3. 考察大区间操作是否不如小区间操作 （操作代价 $r-l$，$\lfloor \frac {r-l+1}2 \rfloor$）
4. 区间不相交的充要条件
5. 执行区间相交操作的条件

[P5978 [CEOI2018\] Global warming - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5978)

[Range Sorting (Hard Version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1827B2)

[Burenka and Traditions (hard version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1718A2)

线性 $Dp$ 就考察最后一段，本质是分段划分

字符串字典序比较等价于，$LCP$+第一个小于字符

[Lexicographically Small Enough - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1616E)

多轮操作直接打表找规律，数组平移，全部 $-1$，最大值减少 $\ldots$

$\Sigma max(a_i-d,0)$ 直接维护 $a_i \gt d$ 的个数和和，然后减个数 $\times d$

[P6186 [NOI Online #1 提高组\] 冒泡排序 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P6186)

网格图压状态，终点相同，将状态改成每个操作的数量

[[ABC265E\] Warp - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/AT_abc265_e) 状态压成 $3$ 个操作的数量

[Relay Race - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF213C) 可以视为 $(x+1,y+0),(x+0,y+1)$ 两个操作，直接压状态

括号序列

1. 区间左端点匹配右端点
2. 暴力跳表找合法另一个端点
3. 合法当且仅当 $cnt_{(} \geq cnt_{)}$

[P8745 [蓝桥杯 2021 省 AB\] 括号序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8745)

[P7914 [CSP-S 2021\] 括号序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7914)

正难则反，$f_i$ 最多保留数 [Chain Reaction - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF607A)

分治可以发扬人类智慧，旋转平面 $3$ 次 [P4169 [Violet\] 天使玩偶/SJY摆棋子 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4169)

询问区间内的点是否满足条件，等价于对于区间内每一个点，它有一个最靠近它的满足条件的点，这些点中的最大值是否 $\geq l$，[P8773 [蓝桥杯 2022 省 A\] 选数异或 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8773)

如果一个题不是很好暴力，就考虑是否能通过排序得到暴力的思路 [P8252 [NOI Online 2022 提高组\] 讨论 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8252)

两点任意匹配合法  $\to$ 排序后相邻两点合法 [P8252 [NOI Online 2022 提高组\] 讨论 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8252)

多画几个图找规律 [P2039 [AHOI2009\] 跳棋 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2039)

序列问题上图 [P8098 [USACO22JAN\] Tests for Haybales G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8098)

一个环随意标号的方案数是 $(sz-1)!$，固定头枚举下一条边

排列问题就 $dp$，考虑 $1 \sim i$ 的排列

排序 $l,r,l+r,r-l,a,b,a+b,a+b-c,\ldots$

大区间操作 $\to$ 相邻两点操作 $\text{(len=2/3) 等小区间操作}$ ，$r-l$ 个相邻两点操作，$\to [l,r]$ 区间操作 [Zero-One (Hard Version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1733D2)

无法全局 $dij$，对较少的点跑 $dij$ [The Shortest Statement - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1051F)

断环成链，复制一份，最短距离，倍增跑路 [P4155 [SCOI2015\] 国旗计划 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4155)

[P2375 [NOI2014\] 动物园 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2375)

`while(k>i/2) k=kmp[k]` 优化，直接做 $kmp$，然后每次最后加上这一句，因为每次至多新增一个

[P1357 花园 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1357)

断环成链，$1 \sim m \to n+1 \sim n+m$ 直接钦定初始状态 $S[1 \sim m]$，转移 $n$ 次 **到** $S[n+1 \sim n+m]$ 计算就保证合法了

按照题目要求的东西/最小化的东西排序 [P1712 [NOI2016\] 区间 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1712)

发现复杂度多了一个 $O(n) \operatorname{or} O(m)$ 的时候，可以肉眼顶真观察某一个多出来的复杂度是不是多次进行了相同的操作，考虑这个操作的指针是否单调不减

[P1712 [NOI2016\] 区间 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1712)

[P7913 [CSP-S 2021\] 廊桥分配 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7913)

找和一个区间相交的线段可以直接用 `set`，利用它的判定是根据 `!a<b && !a>b -> a=b ` 得到

[P2161 [SHOI2009\] 会场预约 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2161)

设计状态直接考虑子问题，求 $n$，就考虑任意数，求组合就考虑加入某个数，然后按顺序加入保证不重复，如果讲顺序最后再乘个方案数

[P3861 拆分 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3861)

$n\leq 10^{12}$ 因数最多 $6720$

颜色段数 `mex` 转成 $pre$ 位置关系！！！ [P7416 [USACO21FEB\] No Time to Dry P - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7416)

求 $[x,y]$ 被包含在 $[l,r]$ 内的数量，离线询问右端点 $r$ 递增，然后直接把贡献绑定在 $x$ 上面，树状数组一减 [P7416 [USACO21FEB\] No Time to Dry P - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7416)

但需要求三个或三个元素以上参与的表达式，比如 $a_i-b_j+a_k$ 这种，可以考虑把其中两个绑定起来，比如 $(a_i-b_j)+a_k$ 这样转化成两个元素的处理[P7706 「Wdsr-2.7」文文的摄影布置 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P7706)

如果要考虑任意两个数，可以先排序，可能就只用考虑相邻的数，比如 $a \lt b \lt c$ 时，$a \oplus c \gt \min(a \oplus b,b \oplus c)$

[mex技巧总结 - crs_line 的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/crs-line/mex-ji-qiao-zong-jie)

[高维偏序类问题的常见处理 - black-swallow - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/89645/gao-wei-pian-xu-lei-wen-ti-di-chang-jian-chu-li)

[bitset 求解高维偏序 - -Wallace- - 博客园 (cnblogs.com)](https://www.cnblogs.com/-Wallace-/p/bit-parti-ord.html)

列向量代替矩阵，多测预处理矩阵的 $2^i$ 
