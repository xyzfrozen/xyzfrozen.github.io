---
title: Hdu Summer 2026-1
date: 2026-07-29 23:46:47
tags:
- 贪心
- 并查集
- 数学
- 字符串
- 期望
- 博弈论
categories:
- problem
mathjax: true
---



神秘2题队有感觉吗#

过A，F，签到A，注意力F，D，J思路稍有问题，E忘却一切之人

补FDJE



# D

[1004 搭积木](https://acm.hdu.edu.cn/contest/problem?cid=1229&pid=1004)

显然是和添加顺序有关，赛时观察出按照 $\frac{B}{A}$ 排序，逐个加入，认为从1开始扩展与从中间扩展没有区别

证明上的问题是，贪心的正确性依赖于排序结果，每次选择最优得到最终最优，所有每次必须把所有连通块放进去才是对的，不能只从1扩展

只从1扩展放弃了更优秀的那些节点，赛时一直把顶固定死了那确实是两种扩展没区别，但是固定死顶为1是错的

队友写的代码

```cpp#include<algorithm>
#include<algorithm>
#include<iostream>
#include<cstdio>
#include<queue>
using namespace std;

#define int long long
int T,n;

int a[200002];
int b[200002];
int f[200002];
bool vis[200002];
struct node
{
    int A,B;
    int id;
};

bool operator<(node x,node y) {return x.A*y.B<x.B*y.A;}
priority_queue<node> q;
int fa[200002];
int fnd(int x){return fa[x]==x?x:fa[x]=fnd(fa[x]);}

signed main()
{
    scanf("%lld",&T);
    while (T--)
    {
        long long ans=0;
        scanf("%lld",&n);
        for(int i=1;i<=n;i++) scanf("%lld",&a[i]);
        for(int i=1;i<=n;i++) scanf("%lld",&b[i]);
        for(int i=1;i<=n;i++) scanf("%lld",&f[i]);
        for(int i=1;i<=n;i++)
        {
            fa[i]=i;vis[i]=0;
            q.push({a[i],b[i],i});
        }
        while(!q.empty())
        {
            int u=q.top().id;
            // cout<<u<<" "<<ans<<"\n";
            q.pop();
            if(vis[u]) continue;
            vis[u]=1;
            ans+=b[fnd(f[u])]*a[u];
            if(f[u])
            {
                int v=fnd(f[u]);
                a[v]+=a[u];
                b[v]+=b[u];
                fa[fnd(u)]=v;
                q.push({a[v],b[v],v});
            }
        }
        printf("%lld\n",ans);
    }
    
    return 0;
}
```



# F

[1006 开关灯](https://acm.hdu.edu.cn/contest/problem?cid=1229&pid=1006)

分开计算每个位置 $i$ 被点亮时对答案的贡献，等价于求出当前连通块个数 $c$ 的期望。连通块的个数可以通过一个简单转化来刻画，记 $S$ 表示当前被点亮的位置集合，$e(S)$ 表示$(i, i+1)$ 当前被同时点亮的集合，那么：

$$
c=|S|-|e(S)| \Rightarrow \mathbb{E}[c]=\mathbb{E}[|S|]-\mathbb{E}[|e(S)|]
$$

易知 $\mathbb{E}[|S|]=\frac{n+1}{2}$ ，重点在于求出 $\mathbb{E}[|e(S)|]$ ：

1. 如果一对相邻灯包含 $i$ ，那么它在 $i$ 点亮后同时点亮的概率是 $\frac{1}{2}$ 

2. 如果一对相邻灯不含 $i$ ，那么它在 $i$ 点亮后同时点亮的概率是 $\frac{1}{3}$ 

就是在排列中出现的先后顺序

每一个$(i, i+1)$ 贡献是 1，计算概率即可

对于 $1$ 和 $n$ 是一样的

$(1,2)$ 概率是 $\frac {1}{2}$ ，属于情况 $1$，剩下的都是情况 $2$，$E=\frac {1}{2} \times 1 + \frac{1}{3} \times {n-2} = \frac{2n-1}{6}$ 

对 $2$ ~ $n-1$ ，有两个情况 $1$，$E=\frac {1}{2} \times 2 + \frac{1}{3} \times {n-3} = \frac {n}{3}$

再用 $\frac {n+1}{2}$ 减去它们
$$
\frac{n+4}{6}(a_1+a_n)+\frac{n+3}{6} \sum_{i=2}^{n-1} a_i
$$
主播直接暴力打标顶真出来#



# E

[1005 摩卡数](https://acm.hdu.edu.cn/contest/problem?cid=1229&pid=1005)

基本上这种题的 $\sigma$ 都是 $2$ ，赛时也想到了，只是忘记AC自动机了而已

KMP自动机就是单串AC自动机，AC自动机就是疯狂跳最长后缀然后尝试匹配模式串，所有这里的k就是在Trie树上跳了多少次

直接构造 $aa...aabb..bb$ 这种，设第一段长 $k_1$，第二段长 $k_2$

考虑 $[1,k_1-1]$ ，往后面填 $a$ 匹配成功贡献 $0$，填 $b$ 往前跳 1，贡献是自己 $i$，而对于 $k_1$ 的 $a$，填 $a$ 一直跳 1 次，填 $b$ 匹配成功

总贡献 $\displaystyle\sum_{1}^{k_1-1} i + 1$

后一段 $b$ $[k_1+1,k_1+k_2-1]$ 填 $a$ 直接跳到 0，贡献 1，填 $b$ 匹配成功贡献 0

总共就是 $\frac {k_1(k_1-1)}{2} +k_2$ 二分找到 $k_1$ 即可



# J

[1010 游戏](https://acm.hdu.edu.cn/contest/problem?cid=1229&pid=1010)

很神秘的博弈论

初步想的操作是两个人都疯狂的吃自己的石子（全部挪走），一直吃到只剩三堆或者两堆的时候再决一胜负，多的就赢，平先手输

但是这样对平的考虑太过简单了，而且考虑前后手让问题太过复杂

正确的考虑方式时在当前局面下，先手必胜还是后手必胜，而不是当前是先手，怎么样在当前局面必胜这样，不把先后手加入局面，只判断胜负



首先先手比对面多的时候肯定狂吃就完了，肯定必胜，比对面少先手就算狂吃，后手也狂吃还是胜利不了，接下来考虑平的时候

首先考虑奇数情况，双方都吃到最后剩三堆了，且两侧石子相等，先手可以怎么操作让自己必胜

我们往前推一堆，肯定是 a b c a b 这样，默认先手在左侧

如果 a $\lt$ b，后手不管先手怎么做，反正先狂吃一步，先手可以走两步

首先先手不能吃两步直接送死，最多吃一步，最优局面也只是和我相等，先手仍然必输

反过来 a $\gt$ b，我就送一个，对面吃，下一步我也吃，他必须送一个还是输

送一个对面不吃送几个，我也送几个，局面仍然是 a' > b'，策略不变，就影拖

所以奇数情况就是，大肯定胜利，平就一个个往前看，直到有更大的，如果全平先手仍然输



偶数情况我们考虑直接转成奇数情况，n=2 这种特殊的特判一下

我挪一步相当于交换先后手，直接清空左堆肯定是最优解，哪怕从下一步开始就一直全相等，我执行一样操作肯定赢，下一步不相等，我不吃他吃就把中间点亏了一格，我肯定亏，所以直接清空左堆之后逐个比较

奇数和偶数的区别是偶数全平局由于Alice变后手，全平变成赢的



一个形式化的答案计算

记 $P_i=\sum_{j=1}^i x_j, S_i=\sum_{j=n-i+1}^n x_j$ 

|           | $A$ 时 Alice 必胜                                            | $B$ 时 Alice 必胜                                            |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| $n=2 k+1$ | $\left(P_k, \ldots, P_1\right)>\left(S_k, \ldots, S_1\right)$ | $\left(P_k, \ldots, P_1\right) \geq\left(S_k, \ldots, S_1\right)$ |
| $n=2 k$   | $\left(P_k, \ldots, P_2\right) \geq\left(S_{k-1}, \ldots, S_1\right)$ | $\left(P_{k-1}, \ldots, P_1\right)>\left(S_k, \ldots, S_2\right)$ |