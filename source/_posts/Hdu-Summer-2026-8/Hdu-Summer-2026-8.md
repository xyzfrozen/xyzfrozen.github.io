---
title: Hdu-Summer-2026-8
date: 2026-08-15 22:37:07
tags:
- 树形 Dp
mathjax: true
---



神人比赛，一堆原题还有恶意卡常，成功开发出了字符串快读

赛时五题，取消同步流后变成六题轻松绷住

C虽然过了还是补一下，还有H

另外这一场还是没有仔细看题，导致浪费了一些时间



#  C

 $f(n,k)$ 表示从连续的 $n$ 个位置中选择若干位置，且任意两个被选位置的距离不小于 $k$ 的方案数

对于每次询问 $(x,k)$，先计算不限制位置 $x$ 时的全部方案，再减去选择了位置 $x$ 的方案

$f(n,k)=f(n-1,k)+f(n-k,k)$

初始 $f(n,k)=1$。

$k$ 固定时，Dp 转移是 $O(n)$ 的，我们我们考虑根号分治

考虑当 $k$ 较大时，直接枚举选择位置的数量

选择 $a$ 个位置：$p_1<p_2<\cdots<p_a$，并且相邻位置满足 $q_i=p_{i+1}-p_i\ge k$

$p_1+q_1+\cdots + q_{a-1} \leq n$

$p_1 \geq 1$ ，$p_1+q_1+ \cdots +q_{a-1}+t =n$ ，$t \geq 0$

因此，恰好选择 $a$ 个位置的方案数为：$\binom{n-(a-1)(k-1)-1+1}{a}$。

所以：$f(n,k)=1+\sum_{a= 1}^{(a-1)k+1\le n}\binom{n-(a-1)(k-1)}{a}$ ， $O(n/k)$

不限制位置 $x$ 时的方案数 $f(n,k)$

考虑所有选择了位置 $x$ 的方案。此时，与 $x$ 距离小于 $k$ 的位置均不能被选择

左侧仍可选择的位置为：$1,2,\ldots,x-k$，其长度为 $x-k$

右侧仍可选择的位置为：$x+k,x+k+1,\ldots,n$，其长度为 $n-x-k+1$

左右两部分之间的任意两个位置距离均不小于 $k$，因此可以独立选择

选择了位置 $x$ 的方案数为：$f(x-k,k)f(n-x-k+1,k)$

答案 $f(n,k)-f(x-k,k)f(n-x-k+1,k)$



# H

首先最小是容易的，判断是一条链还是普通树就行

对于一个标签排列，设 $S_i$ 表示标签 $0,1,\ldots,i-1$ 所在的顶点集合

一条路径的 MEX 至少为 $i$，当且仅当它包含 $S_i$ 中的所有顶点。因此，答案可以写成 $\sum_{i=1}^{N}F(S_i)$

其中 $F(S)$ 表示包含集合 $S$ 中所有顶点的无序顶点对 $(u,v)$ 的数量

如果 $S$ 中的顶点不能全部位于一条简单路径上，则 $F(S)=0$，并且之后所有更大的前缀集合贡献也均为 $0$

所以我们可以发现最大的方案一定是尽可能把 $1 \sim i$ 放在一条路径上，也就是不断在路径的两端尝试扩展

设 $f(u,v)$ 表示 $(u,v)$ 代表的路径的答案

当 $u\ne v$ 时，设：

* $u'$ 是从 $u$ 到 $v$ 路径上与 $u$ 相邻的顶点
* $v'$ 是从 $v$ 到 $u$ 路径上与 $v$ 相邻的顶点

最后加入的顶点只能是 $u$ 或 $v$

$f(u,v)=size_u \times size_v+\max(f(u',v),f(u,v'))$。

$f(u,u)=\binom{n}{2} +\binom{n}{1} - \sum_{v \in son_u} \binom{size_v}{2} +\binom{size_v}{1}$。

答案就是最大的 $f_{u,v}$

首先预处理如何扩展，然后随便选个根算每个点的 $size$ 和计算 $f$

```cpp
const int N=2e3+10;
int n,u,v;
int sz[N][N],fa[N][N],f[N][N],d[N][N],in[N];
vector<int> as[N];

void dfs(int x,int rt,int y)
{
    sz[y][x]=1;
    if(x==y) fa[y][x]=0,f[x][x]=n*(n+1)/2,d[x][x]=0;
    else fa[y][x]=rt,d[y][x]=d[y][rt]+1;
    go(v) if(v^rt) {dfs(v,x,y),sz[y][x]+=sz[y][v];f[x][x]-=(x==y)*sz[y][v]*(sz[y][v]+1)/2;}
}

void solve()
{
    n=fr();
    for(int i=1;i<=n;i++) as[i].clear(),in[i]=0;
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
        in[u]++,in[v]++;
    }

    for(int rt=1;rt<=n;rt++) dfs(rt,0,rt);
    vector<pi> rec;
    for(int x=1;x<=n;x++)
        for(int y=x+1;y<=n;y++)
            rec.pb({x,y});
    auto cmp=[&](pi a,pi b){return d[a.first][a.second]<d[b.first][b.second];};
    sort(rec.begin(),rec.end(),cmp);
    int ans=0;
    for(auto &t:rec)
    {
        int x=t.first,y=t.second;
        f[y][x]=f[x][y]=max(f[fa[y][x]][y],f[x][fa[x][y]])+sz[y][x]*sz[x][y]; //注意这里 f[y][x]=f[x][y] 因为取max会访问到下标大小相反的
        ans=max(ans,f[x][y]);
    }

    bool chain=1;
    for(int i=1;i<=n;i++) if(in[i]>=3) chain=0;
    fw(chain?2*n-1:n+1),pt,fw(ans),nl;
}

signed main()
{
    int T=fr();
    while(T--) solve();
    return 0;
}
```

