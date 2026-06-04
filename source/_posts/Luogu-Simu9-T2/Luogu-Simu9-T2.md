---
title: Luogu Simu9 T2
date: 2023-11-09 22:35:17
tags:
- 众数
- 复杂度均摊
- 树形 Dp
- 分治
categories:
- problem
mathjax: true
---



## 题目描述

有 $n$ 间屋子，由 $n-1$ 条双向道路连接成了一个树形结构。其中，第 $i$ 间屋子里居住了 $1$ 个种族为 $c_i$ 的人。

现在你要召集一个连通块内的人。设 $a_j$ 表示被召集的种族为 $j$ 的人个数，若存在 $2a_k>\sum_{j=1}^{n} a_j$，则种族为 $k$ 的人会造反。

你想知道有多少个连通块会使某种人造反，答案对 $998244353$ 取模。

### 输入格式

第一行一个正整数 $n$。

第二行 $n$ 个整数 $c_1,c_2,\ldots,c_n$。

接下来 $n-1$ 行，每行两个整数 $u,v$，表示有一条边连接第 $u$ 间和第 $v$ 间屋子。

### 输出格式

一行一个整数，表示答案。



```
3
2 3 3
1 2
2 3
```

```
5
```

```
4
1 1 3 3
1 2
1 3
1 4
```

```
8
```

```
15
5 13 5 1 13 5 14 6 14 12 8 1 12 14 5
2 1
7 1
8 4
10 3
15 1
1 9
1 6
13 1
5 2
14 15
3 9
1 4
3 12
10 11
```

```
104
```

### 提示

** 样例解释 1**

共 $6$ 个连通块，仅 $\{1,2\}$ 不引起造反。

**样例解释 2**

除去大小为 $1$ 的连通块，还有 $\{1,2\},\{1,2,3\},\{1,2,4\},\{1,3,4\}$ 引起造反。

### 数据范围

对于 $30\%$ 数据，$n\le 20$。

对于另外 $30\%$ 数据，树为 $1\to 2\to \ldots \to n$ 的链。

对于另外 $20\%$ 的数据，$c_i\le 2$。

对于 $100\%$ 的数据，$1\le n\le 3000$，$1\le c_i\le n$。

------

我们只关注众数，对于区间众数，我们有非常经典的 $O(n\log n)$ 分治做法

一个众数要打赢原本的众数必然需要 $sz+1$，也就是每产生一个众数 $sz$ 翻倍，所以 $[l,mid]$，$[mid+1,r]$ 的众数都只有 $O(\log n)$ 种，而绝对众数必然是小区间的绝对众数中的一个，反证法显然

所以我们对这 $O(\log n)$ 个众数，每次操作区间，和它相同的变成 $1$，不同变成 $0$，问题转化为求 $s_r-s_{l-1}>\frac {r-l+1} 2$，直接桶维护，$O(1)$

总复杂度 $O(n\log^2n)$

```cpp
int solve(int l,int r)
{
    if(l==r) return 1;
    int mid=(l+r)>>1;
    int res=solve(l,mid)+solve(mid+1,r);
    
    vector<int> vec(0);
    for(int i=mid;i>=l;i--)
    {
        cnt[a[i]]++;
        if(2*cnt[a[i]]>(mid-i+1)) vec.pb(a[i]);
    }
    for(int i=mid;i>=l;i--) cnt[a[i]]--;
    for(int i=mid+1;i<=r;i++)
    {
        cnt[a[i]]++;
        if(2*cnt[a[i]]>(i-mid)) vec.pb(a[i]);
    }
    for(int i=mid+1;i<=r;i++) cnt[a[i]]--;

    for(auto v:vec)
    {
        if(vis[v]) continue;
        vis[v]=1;
        for(int i=l;i<=r;i++) b[i]=(a[i]==v)?1:-1;
        s[mid]=b[mid],s[mid+1]=b[mid+1];
        for(int i=mid-1;i>=l;i--)
            s[i]=s[i+1]+b[i];
        for(int i=mid+2;i<=r;i++)
            s[i]=s[i-1]+b[i];
        int len=mid-l+1;
        for(int i=l;i<=mid;i++) cnt[s[i]+len]++;
        for(int i=len*2-1;~i;i--) cnt[i]+=cnt[i+1];
        for(int i=mid+1;i<=r;i++)
            res+=cnt[1-s[i]+len];
        for(int i=0;i<=len*2;i++) cnt[i]=0;
    }
    for(auto v:vec) vis[v]=0;
    return res;
}
```



我们把这个玩意上树，还是相同设为 $1$，不同设为 $0$，我们直接枚举 $[1,n]$ 作为众数，$O(n^2)$，然后做树形 $dp$

设 $f_{x,j}$ 表示 $T_x$ 内所有连通块，众数个数为 $j$ 的方案数

转移时维护 $L_x,R_x$，就是 `min(sz[x],-cnt)` 和 `max(sz[x],cnt)`，然后做背包即可，这样复杂度均摊是 $O(n^2)$ 的，但是我不会证，但是可能不会超过 $O(n^{2.5})$ ，按根号考虑即可

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=3e3+10,Q=998244353;
int n,u,v,cnt,ans;
int a[N],c[N],sz[N],f[N][N*3],ct[N],L[N],R[N];
vector<int> as[N];

int fr(){
    int x=0,flag=1;
    char ch=getchar();
    while(ch<'0' || ch>'9'){
        if(ch=='-') flag=-1;
        ch=getchar();
    }
    while(ch>='0' && ch<='9'){
        x=x*10+(ch-'0');
        ch=getchar();
    }
    return x*flag;
}
void fw(int x){
    if(x<0) putchar('-'),x=-x;
    if(x>9) fw(x/10);
    putchar(x%10+'0');
}
int max(int a,int b){return a>b?a:b;}
int min(int a,int b){return a<b?a:b;}
void mod(int &x,int y){if((x+=y)>=Q) x-=Q;}

void dfs(int x,int rt)
{
    sz[x]=1;
    f[x][c[x]+N]=1;
    int g[N<<1];
    go(v)
    {
        if(v==rt) continue;
        dfs(v,x);
        int vr=min(sz[x],cnt),vl=max(-sz[x],-cnt);
        int svr=min(sz[v],cnt),svl=max(-sz[v],-cnt);
        for(int j=vr;j>=vl;j--) g[j+N]=f[x][j+N];
        for(int j=vr;j>=vl;j--)
            for(int k=svr;k>=svl;k--)
                if(j+k>=-cnt) mod(f[x][j+k+N],g[j+N]*f[v][k+N]%Q);
        sz[x]+=sz[v];
    }
    for(int j=1;j<=min(cnt,sz[x]);j++)
        mod(ans,f[x][j+N]);
    L[x]=max(-sz[x],-cnt),R[x]=min(sz[x],cnt);
}

signed main()
{
    n=fr();
    for(int i=1;i<=n;i++) ct[a[i]=fr()]++;
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
    }

    for(int i=1;i<=n;i++)
    {
        cnt=ct[i];
        if(!cnt) continue;
        else if(cnt==1) ans++;
        else
        {
            for(int x=1;x<=n;x++)
                for(int j=L[x];j<=R[x];j++)
                    f[x][j+N]=0;
            for(int x=1;x<=n;x++)
                c[x]=(a[x]==i)?1:-1;
            dfs(1,-1);
        }
    }
    fw(ans);
    return 0;
}
```

