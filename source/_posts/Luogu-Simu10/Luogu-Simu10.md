---
title: Luogu Simu10
date: 2023-11-09 22:35:29
tags:
- 思维
- 树状数组
- 容斥
- 数学
- 线段树
- 树形 Dp
password: Violet Evergarden
mathjax: true
---

# T1

求 $a \lt b \lt c,\,p_a \lt p_c \lt p_b$ 的方案数

$n \leq 3\times 10^6$

我们考虑  $a \lt b \lt c,\,p_a \lt p_b \lt p_c$ 的方案计算是容易的

我们枚举 $a=i$，先不管 $b\,c$ 的相对关系，不合法的容斥减去就行

若设 $cnt_i$ 为 $j \in [i+1,n],\,a_j \gt a_i$ ，则 $a$ 的贡献是 $\frac{cnt_i \times (cnt_i-1)}{2} $

然后减去 $a \lt b \lt c,\,p_a \lt p_b \lt p_c$ 的方案即可



# T2

求 $k^2-b$ 为平方数的 $(k,b)$ 对数，$b\in [P,Q]$

$1 \leq P \leq Q \leq 10^{12}$
$$
\text{令}\,k^2-b=t^2\\
k^2-t^2=b\\
(k+t)(k-t)=b\\
k-t \leq k+t \leq \sqrt b\\
$$
令 $k-t=i$，直接枚举 $i$

则 $\max (i,\frac{P}{i}) \leq \frac bi=k+t \leq \frac Qi$
$$
k-t=i\\
k+t=\frac bi\\
k=\frac{i+\frac bi}2
$$
当 $i,\frac bi$ 同奇偶的时候合法

直接计数即可

```cpp
void solve()
{
    P=fr(),Q=fr();
    int ans=0;
    for(int t=1;t*t<=Q;t++) //t=i
    {
        int L=P/t,R=Q/t;
        if(P%t) L++;
        L=max(L,t);
        if(t&1) ans+=(R+1)/2-L/2;
        else ans+=R/2-(L-1)/2;
    }
    fw(ans),nl;
}
```



# T3

一个子序列的权值定义为偶数位置的和-奇数位置的和，求最大价值的偶数长度子序列和它的长度，价值相同，长度较小更优

$q$ 次询问

1. $i\in [l,r]\,a_i \gets a_i+d$
2. 查询整个序列的最优子序列，输出价值和长度

$n,q \leq 1e5$

选择两点 $\to$ 区间选段

我们差分整个序列，选择 $(l,r)$ 等价于选择 $\Sigma_{i=l+1}^r d_i$，同时也保证了长度一定是偶数

第一问直接贪心，$d$ 为正一定选，$d$ 为负一定不选

第二问主要是要考虑 $0$，因为它可以合并两个段，这样就可以减少序列长度

直接线段树维护

1. 区间 $pre/suf$ 是否为 $0+$ 一堆整数
2. 区间是否全 $0$
3. 区间正数段数

合并就类似最大字段和，如果 $ls.suf$ 和 $rs.pre$ 可以合并，段数就 $-1$

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10;
int n,m;
int a[N],d[N];
struct node{
    int l,r;
    int pre,suf,zero;
    int seg;
}tr[N*4];

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

void make(int idx)
{
    node &t=tr[idx];
    t.pre=t.suf=t.seg=d[t.l]>0,t.zero=!d[t.l];
}

void chf(int idx)
{
    node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
    t.seg=ls.seg+rs.seg-(ls.suf&rs.pre);
    t.pre=ls.pre|(ls.zero&rs.pre);
    t.suf=rs.suf|(rs.zero&ls.suf);
    t.zero=ls.zero&rs.zero;
}

void build(int ql,int qr,int idx)
{
    tr[idx]={ql,qr};
    if(ql==qr) return void(make(idx));
    int mid=(ql+qr)>>1;
    build(ql,mid,idx<<1);
    build(mid+1,qr,idx<<1|1);
    chf(idx);
}

void modify(int ql,int qr,int idx)
{
    node &t=tr[idx];
    if(ql<=t.l && qr>=t.r)
        return void(make(idx));
    int mid=(t.l+t.r)>>1;
    if(ql<=mid) modify(ql,qr,idx<<1);
    if(qr>mid) modify(ql,qr,idx<<1|1);
    chf(idx);
}

void solve()
{
    n=fr(),m=fr();
    for(int i=1;i<=n;i++) a[i]=fr();
    for(int i=2;i<=n;i++) d[i]=a[i]-a[i-1];
    build(2,n,1);
    int ans=0;
    for(int i=2;i<=n;i++) ans+=max(0,d[i]);

    while(m--)
    {
        if(fr()) fw(ans),pt,fw(tr[1].seg<<1),nl;
        else
        {
            int l=fr(),r=fr(),c=fr();
            if(l>=2)
            {
                ans-=max(d[l],0),d[l]+=c;
                modify(l,l,1);
                ans+=max(d[l],0);
            }
            if(r!=n)
            {
                ans-=max(d[r+1],0),d[r+1]-=c;
                modify(r+1,r+1,1);
                ans+=max(d[r+1],0);
            }
        }
    }
}

signed main()
{
    int T=fr();
    while(T--) solve();
    return 0;
}
```



另外本题还有一个 $dp$ 做法，当然是 $O(qn)$ 的

```cpp
void Dp()
{
    //f 偶数 g 基数
    g[0]=-1e18,f[0]=0;
    fl[0]=gl[0]=0;

    for(int i=1;i<=n;i++)
    {
        f[i]=f[i-1],fl[i]=fl[i-1];
        if(f[i]<g[i-1]+a[i])
            f[i]=g[i-1]+a[i],fl[i]=gl[i-1]+1;
        else if(f[i]==g[i-1]+a[i])
            fl[i]=min(fl[i],gl[i-1]+1);

        g[i]=g[i-1],gl[i]=gl[i-1];
        if(g[i]<f[i-1]-a[i])
            g[i]=f[i-1]-a[i],gl[i]=fl[i-1]+1;
        else if(g[i]==f[i-1]-a[i])
            gl[i]=min(gl[i],fl[i-1]+1);
    }
}

void solve()
{
    n=fr(),m=fr();
    for(int i=1;i<=n;i++) a[i]=fr();
    while(m--)
    {
        int op=fr();
        if(op&1)
        {
            Dp();
            fw(f[n]),pt,fw(fl[n]),nl;
        }
        else
        {
            int l=fr(),r=fr(),d=fr();
            for(int i=l;i<=r;i++) a[i]+=d;
        }
    }
}
```



# T4

有一个公园有 $n$ 个景点，用 $n-1$ 条双向道路连通起来。

白云想参观里面的一些景点，从 $1$ 号景点出发。不过，它不想走重复的道路，所以，它规定，走的路线中，同一条边的同一个方向不能走两次。

现在，白云想知道，对于任意的点 $i$，白云有多少种方案行走，最后停留在了点 $i$。

两种方案不同，当且仅当走的边数不同，或者某一步走了两条不同的边。

**输入格式**

第一行一个整数 $n$。

接下来 $n-1$ 行，每行两个整数，表示一条树上的边。

**输出格式**

输出 $n$ 行，第 $i$ 行一个整数，表示停在 $i$ 的行走方案数，答案对 $998244353$ 取模。



```
4
1 2
1 3
3 4
```

```
8
3
4
2
```

```
10
1 2
2 3
3 4
4 5
5 6
6 7
7 8
8 9
9 10
```

```
10
9
8
7
6
5
4
3
2
1
```

```
见附件
```

```
见附件
```

样例 1 解释

- 对于在 $4$ 号点结束的情况，有 $1\to2\to1\to3\to4$ 和 $1\to3\to4$ 两种走法
- 对于在 $3$ 号点结束的情况，有 $1\to2\to1\to3$、$1\to2\to1\to3\to4\to3$、$1\to3$、$1\to3\to4\to3$ 四种走法
- 注意，对于在 $1$ 号点结束的情况，一步都不走也算一种走法

样例 2 解释

这个样例是一条链，从 $1$ 号点出发，到达 $i$ 的方案数，就是 $i$ 下方的点数，因为可以任意从下方绕一圈回来。

**数据范围**

对于 $20\%$ 的数据，$n \le 10$。

对于 $50\%$ 的数据，$n \le 100$。

对于另外 $5\%$ 的数据，树是一条链。

对于 $100\%$ 的数据，$1 \le n \le 10^4$。

------

先考虑一个简单的问题，从 $1$ 下去，回到 $1$ 的方案数

我们发现这个下去之后只能上来，去别的子树，所以只和子树有关，并且下子树的顺序也是加入方案的

我们所需的状态是当前子树的一个类似排列状态

为了不算重，我们采用经典的 **按顺序** 插入子树，最后 $\times son!$ 即可

我们发现这是一个 $01$ 背包，考虑每个子树下不下去即可，$f_x$ 为答案，$g_{x,j}$ 表示选 $j$ 个子树的方案数

则 $g_{x,j} \gets g_{x,j-1} \times f_v$，$f_x =\Sigma g_{x,j} \times j!$

然后考虑从 $1$ 下到一个节点，我们要从 $1$ 不断下降，但是这个节点所在的子树必须是最后走的，剩下的任意

我们发现这是一个退背包的过程，根据背包的结合律，设 $h_x$ 表示从 $1$ 下到 $x$，最后一步走到 $x$ 所在子树的方案数

$g_{x,j} \gets -g_{x,j-1} \times f_v$，$h_x = h_{rt} \times \Sigma g_{x,j}(\text{退背包后的})$

则 $ans_x = h_x \times f_x$

注意每次 $g$ 都要新开，不能公用！！

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e4+10,Q=998244353;
int n,u,v;
int f[N],g[N],h[N],fac[N];
vector<int> as[N];
vector<int> ret[N];

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

void prework(int x,int rt)
{
    int son=as[x].size()-(x!=1);
    ret[x].resize(son+1,0);
    ret[x][0]=1;
    go(v)
    {
        if(v==rt) continue;
        prework(v,x);
        for(int j=son;j;j--)
            mod(ret[x][j],ret[x][j-1]*f[v]%Q);
    }
    for(int j=0;j<=son;j++)
        mod(f[x],ret[x][j]*fac[j]%Q);
}

void dfs(int x,int rt)
{
    int son=as[x].size()-(x!=1);
    go(v)
    {
        if(v==rt) continue;
        int gj=1; //g[0]
        h[v]=1;
        for(int j=1;j<=son;j++)
        {
            gj=(ret[x][j]-gj*f[v]%Q+Q)%Q;
            mod(h[v],gj*fac[j]%Q);
        }
        (h[v]*=h[x])%=Q;
        dfs(v,x);
    }
}

signed main()
{
    n=fr();
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
    }

    fac[0]=1;
    for(int i=1;i<=n;i++)
        fac[i]=fac[i-1]*i%Q;
    prework(1,-1);
    h[1]=1,dfs(1,-1);
    for(int i=1;i<=n;i++)
        fw(f[i]*h[i]%Q),nl;
    return 0;
}
```

