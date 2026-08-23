---
title: Hdu-Summer-2026-6
date: 2026-08-08 16:26:10
tags:
---





昏睡ing，还好应该不计入排名

前半场基本昏睡，后面打表看出来了稍微顺利了一点

问题是状态太差，没有及时调整，在能够优化时间复杂度且没有增加多少复杂度的情况下就应该多优化

以后每次开场先打初始模板，都用快读快写，两个人不要空机，一个想的时候另一个人就用电脑做些事情，积极去写暴力和打表做观察

算过了 BJL 吧，补一下AFH



# H

[1008 CuteSafari](https://acm.hdu.edu.cn/contest/problem?cid=1234&pid=1008)

首先我们啥也没观察出来，除了每个字母出现个数必须一样

$n=1$ 和 $n \lt k$ 是平凡的

最基本的观察就是可以把 $[2,k-1]$ 和 $[n-k,n-1]$ 这两段不考虑因为一定换不了，所以我们只用考虑 $\{1\} \cup \{n\} \,\cup [k,n-k+1]$

我们先考虑 $[k,n-k+1]$ 存在的情况，不存在的情况那就得中间全部相等，只有 $1$ $n$ 可以换，判断是平凡的，也就是 $k \leq n \lt 2k$ 的情况

现在考虑 $n \geq 2k$ 

考虑 $k$ ，现在不对，因为个数相等，剩下的可换数中一定有一个 $l$ 可以换

如果 $l$ 在 $[k+1,n-k+1]$ ，我们看能不能交换 $(k,k+1)$ 一直换过去

首先交换 $(1,k)(k+1,n)$，再换 $(1,n)$ ，再 $(1,k)(k+1,n)$ 就完成了相邻交换，所以可以直接这样换成任意排列

然后把 $1$ 和 $n$ 也加入，这样整个都可以重排

$(1,k+1)(k+2,n)$，$(1,k)(k+1,n)$，$(1,n)$，$(1,k)(k+1,n)$，$(1,k+1)(k+2,n)$

这样 $1$ 到了 $k$ 的位置，$k$ 到了 $1$ 的位置，说明可以交换 $(1,k)$ ,并且 $k+1$，$k+2$ 和 $n$ 都没移动，$n$ 也是一样的

这样我们发现任意重排还需要有 $k+2$ 的存在，所以对于 $n=2k$ 的临界情况要单独处理一下

因为此时只有四个数可以交换 $(1,k,k+1,n)$ ，几个数交换的时候互相牵制

每次只能交换 $(1,n)$ 或同时交换 $(1,k)(k+1,n)$ 

一共只有 8 种情况，直接暴力枚举
$$
\begin{aligned} & (a, b, c, d) \\ & (a, c, b, d) \\ & (b, a, d, c) \\ & (b, d, a, c) \\ & (c, a, d, b) \\ & (c, d, a, b) \\ & (d, b, c, a) \\ & (d, c, b, a)\end{aligned}
$$
判断一下有没有合法的就行



# A

队友观察出了答案只可能是 1 或者 2，但是我们认为和顺序没关系，直接大力树形 dp，发现过不了样例难绷

关键性质是每个点的答案只与最后连续选取的指向它的边数有关，要想没有 $1$ ，只有一条边的一定不指向它，有多于一条边的要么最后一条不指向它，要么最后和倒数第二条边都得指向它

我们把每个边指向看成一个变量，取值 $0$ 或 $1$ 代表指向，那么每个点给出的就是一个变量或者两个变量的式子，可以用交并和是非来表达，转化成 2-SAT 问题

`rebegin()++` 才是倒数第二个数不是 `--`

```
const int N=1e6+10;
int n,u,v,stm,top,scc;
int d[N],dfn[N],low[N],ak[N],in[N],col[N];
vector<int> as[N],E[N];
pair<int,int> ed[N];
void add(int x,int y){as[x].pb(y);}

void dfs(int x)
{
    dfn[x]=low[x]=++stm;
    ak[++top]=x;
    in[x]=1;

    go(v)
    {
        if(!dfn[v]) dfs(v),low[x]=min(low[x],low[v]);
        else if(in[v]) low[x]=min(low[x],dfn[v]);
    }

    if(!(low[x]^dfn[x]))
    {
        scc++;
        while(top)
        {
            col[ak[top]]=scc,in[ak[top]]=0,top--;
            if(x==ak[top+1]) break;
        }
    }
}

void dfs(int x,int rt)
{
    d[x]=d[rt]+1;
    go(v) if(v^rt) dfs(v,x); 
}

void solve()
{
    n=fr();

    stm=top=scc=0;
    for(int i=1;i<=n*2;i++) as[i].clear(),E[i].clear(),dfn[i]=low[i]=0;

    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        ed[i]={u,v}; //u ->0 v -> 1
        E[u].pb(i),E[v].pb(i);
    }

    for(int x=1;x<=n;x++)
    {
        if(E[x].size()==1)
        {
            int id=E[x][0];
            if(ed[id].first==x) add(id<<1,id<<1|1);
            else add(id<<1|1,id<<1);
        }
        else
        {
            int i=*E[x].rbegin(),j=*(++E[x].rbegin());
            int p=ed[i].second==x,q=ed[j].second==x;
            add(i<<1|p,j<<1|q);
            add((j<<1|q)^1,(i<<1|p)^1);
        }
    }

    for(int i=2;i<=((n-1)<<1)+1;i++)
        if(!dfn[i]) dfs(i);

    int mex=1;
    for(int i=1;i<=n-1;i++)
        if(col[i<<1]==col[i<<1|1]) mex=2;
    
    if(mex==1)
    {
        puts("1");
        for(int i=1;i<n;i++)
            fw((col[i<<1]<col[i<<1|1])?ed[i].first:ed[i].second),pt;
    }
    else
    {
        puts("2");
        for(int i=1;i<=n;i++) as[i].clear();
        for(int i=1;i<n;i++) add(ed[i].first,ed[i].second),add(ed[i].second,ed[i].first);
        dfs(1,0);
        for(int i=1;i<n;i++)
            fw(d[ed[i].first]>d[ed[i].second]?ed[i].first:ed[i].second),pt;
    }
    puts("");
}
```



# F

给定 $n$ ，求

$$
\sum_{i=1}^n \sum_{j=i}^n \sum_{k=i}^j \operatorname{gcd}(i, k) \operatorname{gcd}(j, k)\binom{j}{k}
$$

对 998244353 取模的结果。
$$
\sum_{i=1}^n \sum_{j=i}^n \sum_{k=i}^j \operatorname{gcd}(i, k) \operatorname{gcd}(j, k)\binom{j}{k}\\
=\sum_{k=1}^n \sum_{i=1}^k \sum_{j=k}^n \gcd(i,k)\gcd(j,k)\binom{j}{k}\\
=\sum_{k=1}^n \sum_{i=1}^k\gcd(i,k)\sum_{j=k}^n \gcd(j,k)\binom{j}{k}
=\sum_{k=1}^n f_k\times g_k
$$

$$
\begin{aligned}
f_k &= \sum_{i=1}^k \gcd(i,k)\\
&=\sum_{i=1}^k \sum_{d \mid \gcd(i,k)} \phi(d)\\
&=\sum_{d\mid k} \phi(d)  \frac kd \\
\end{aligned}
$$

$$
\begin{aligned}
g_k&=\sum_{i=k}^n \gcd(i,k)\binom{i}{k} \\
&=\sum_{i=k}^n \sum_{d \mid \gcd(i,k)} \phi(d) \binom{i}{k}\\
&= \sum_{d\mid k} \phi(d) \sum_{i=t}^{\lfloor \frac nd \rfloor} \binom{di}{dt} \\
&= \sum_{d \mid k} \phi(d) \sum_{i=t}^{\lfloor \frac nd \rfloor} \frac{(di)!}{(dt)!(di-dt)}\\
&= \frac{1}{k!} \sum_{d \mid k} \phi(d) \sum_{i=0}^{\lfloor \frac nd \rfloor -\frac kd} \frac{(d(i+\frac kd))!}{(di)!}\\
&=\frac{1}{k!} \sum_{d\mid k} \phi(d)  \sum_{i=0}^{\lfloor \frac nd \rfloor -\frac kd} A_{d,i}\times B_{d,i}
\end{aligned}
$$

两边都直接枚举 $d$ 再枚举倍数 $k$，$f$ 复杂度为 $O(n\log n)$,$g$ 复杂度为 $O(n\log n \log{n \log n})=O(n\log^2 n)$

老生常谈得把 NTT 的数组清空到 w

```c[[
const int N=(1<<21)+10,Q=998244353,G=3,IG=332748118;
int n,m,w,ivs,cnt;
int phi[N],p[N],pr[N];
int f[N],g[N],org[N][2];
int fac[N],ifac[N],_f[N],_g[N];

int qkw(int a,int k=Q-2,int ans=1)
{
    for(;k;a=(a*a)%Q,k>>=1) if(k&1) ans=ans*a%Q;
    return ans;
}

void NTT(int n,int *A)
{
    if(n==1) return;
    int m=n>>1;
    int A0[m+1],A1[m+1];
    for(int i=0;i<=n-1;i+=2)
        A0[i>>1]=A[i],A1[i>>1]=A[i+1];
    NTT(m,A0),NTT(m,A1);
    int wnk=1,dlt=~ivs?org[n][0]:org[n][1]; //wnk wn1
    for(int k=0;k<=m-1;k++,(wnk*=dlt)%=Q)
    {
        A[k]=(A0[k]+wnk*A1[k]%Q)%Q; //A0[k]+wnk*A1[k]
        A[m+k]=(A0[k]-wnk*A1[k]%Q+Q)%Q; //A0[k]-wnk*A1[k]
    }
}

void NTT(int *f){ivs=1;NTT(w,f);}
void INTT(int *f){ivs=-1;NTT(w,f);}

void init()
{
    w=(1<<21);
    phi[1]=1;
    for(int i=2;i<=w;i<<=1)
        org[i][0]=qkw(G,(Q-1)/i),org[i][1]=qkw(IG,(Q-1)/i);
    for(int i=2;i<=w;i++)
    {
        if(!p[i]) pr[++cnt]=i,phi[i]=i-1;
        for(int j=1;j<=cnt && pr[j]<=w/i;j++)
        {
            int t=pr[j]*i;
            p[t]=1;
            if(!(i%pr[j]))
            {
                phi[t]=phi[i]*pr[j];
                break;
            }
            phi[t]=phi[i]*(pr[j]-1);
        }
    }
    fac[0]=ifac[0]=1;
    for(int i=1;i<=w;i++) fac[i]=fac[i-1]*i%Q;
    ifac[w]=qkw(fac[w]);
    for(int i=w-1;i;i--) ifac[i]=ifac[i+1]*(i+1)%Q;
}

void calc(int d)
{
    int m=n/d;
    w=1;
    while(w<=(m<<1)) w<<=1;
    for(int i=m+1;i<w;i++) _f[i]=_g[i]=0;
    for(int i=0;i<=m;i++)
        _f[i]=fac[d*(m-i)],_g[i]=ifac[d*i];
    NTT(_f),NTT(_g);
    for(int i=0;i<w;i++) (_f[i]*=_g[i])%=Q;
    INTT(_f);
    int invn=qkw(w);
    for(int i=0;i<=m;i++)
        (_f[i]*=invn)%=Q;
}

void solve()
{
    n=fr();
    for(int i=0;i<=n;i++) f[i]=g[i]=0;
    for(int d=1;d<=n;d++)
    {
        calc(d);
        for(int k=d;k<=n;k+=d)
        {
            (f[k]+=phi[d]*(k/d)%Q)%=Q;
            (g[k]+=phi[d]*_f[n/d-k/d]%Q)%=Q;
        }
    }
    
    int ans=0;
    for(int i=1;i<=n;i++) (ans+=f[i]*g[i]%Q*ifac[i]%Q)%=Q;
    fw(ans),nl;
}

signed main()
{
    freopen("data.in","r",stdin);
    init();
    int T=fr();
    while(T--) solve();
    return 0;
}
```

