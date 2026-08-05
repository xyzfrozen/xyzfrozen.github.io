---
title: Hdu-Summer-2026-2
date: 2026-07-30 19:47:19
tags:
- 线性Dp
- 莫比乌斯反演
- 虚树
- Trie
- 树形Dp
- 凸性优化
categories:
- problem
mathjax: true
---





两题队变三题队有感觉吗，本质彩笔了

赛过 DHJ，补G，K，C

貌似网络赛第二场是HDU出题，还是得好好补题的



# K

[1011 键盘杀手](https://acm.hdu.edu.cn/contest/problem?cid=1230&pid=1011)

以为是签到结果被一脚踢死了

太久太久无dp了，这个位置根本想不到放了一道dp题目，而且这个dp状态也挺难想到的，被爆了，不过学长队也是4小时才做出来

dp设 $f_{i,0/1}$ 表示考虑 $[1,i]$，$i$ 比 $i-1$ 先/后下，这样就可以消除一边的影响方便多了

$f_{i,0}=a_{i-1} + \min (f_{i-1,0},f_{i-1,1})$

$f_{i,1}=\min(f_{i-1,0}+\max (0,a_i-a_{i-2}),f_{i-1,1}+a_i)$

初始 $f_{2,0}=a_1,f_{2,1}=a_2$



```cpp
void solve()
{
    n=fr();
    for(int i=1;i<=n;i++) a[i]=fr();
    
    if(n==1) return void(puts("0"));
    
    f[2][0]=a[1],f[2][1]=a[2];
    for(int i=3;i<=n;i++)
    {
        f[i][0]=a[i-1]+min(f[i-1][0],f[i-1][1]);
        f[i][1]=min(f[i-1][0]+max(0,a[i]-a[i-2]),f[i-1][1]+a[i]);
    }
    
    fw(min(f[n][0],f[n][1])),nl;
}
```



# G

[1007 另一个 shu 论问题](https://acm.hdu.edu.cn/contest/problem?cid=1230&pid=1007)

复习了一下莫比乌斯反演

[莫比乌斯函数为什么长这样？形式推导 + 反演公式_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1LJ2nYCEfD/?)

若 $F(n)=\sum_{d \mid n} f(d)$，则 $f(n)=\sum_{d \mid n} \mu(d)F(\frac nd)$

证明：
$$
\begin{aligned}
\sum_{d\mid n}\mu(d)F(\frac nd)&=\sum_{d \mid n} \mu(d)\sum_{i \mid \frac nd} f(i)\\
&=\sum_{i \mid n} f(i) \sum_{d \mid \frac ni}\mu(d)\\
&=\sum_{i \mid n} f(i)[\frac ni=1]\\
&=f(n)
\end{aligned}
$$
中间的一步求和变换，可以看做是展开后重新求和，$i \mid \frac nd \Rightarrow d\mid \frac ni$

若 $F(n)=\sum_{n \mid d} f(d)$，则 $f(n)=\sum_{n \mid d} \mu (\frac dn)F(d)$
$$
\begin{aligned}
\sum_{n \mid d} \mu (\frac dn)F(d)&=\sum_{n \mid d} \mu (\frac dn)\sum_{d\mid i}f(i)\\
&=\sum_{n \mid i}f(i)\sum_{(d' =\frac dn)\mid \frac in} \mu(d')\\
&=\sum_{n \mid i}f(i)[\frac in=1]\\
&=f(n)
\end{aligned}
$$
令 $d'=\frac dn$，$d \mid i \Rightarrow d'n \mid i \Rightarrow d' \mid \frac in$



记 $\text{lca} (x,y)= \gcd (x,y)=u$

$f_u(d)$ 为 $\text{lca}(x,y)=u,\gcd(x,y)=d,x \lt y$ 的点对数量

$g_d(u)$ 为 $\text{lca}(x,y)=u,d \mid x,d \mid y,x \lt y$ 的点对数量


$$
g_d(u)=\sum_{d \mid t} f_u(t) \\

\text{set}\,\, F(d)=\sum_{d \mid t} f(t) \\

f(t)= \sum_{t \mid d} \mu ( \frac dt) F(d)\\

f_u(t)=\sum_{t \mid d} \mu(\frac dt)g_d(u)\\

f_u(u)=\sum_{u \mid d} g_d(u) \mu\left(\frac{d}{u}\right)\\
$$



$$
\begin{aligned}
\sum_{u=1}^{n} f_u (u) &=\sum_{u=1}^n \sum_{u \mid d} g_d(u)\mu\left(\frac{d}{u}\right)\\&=\sum_{d=1}^n \sum_{u \mid d} g_d(u)\mu\left(\frac{d}{u}\right)\\
\end{aligned}\\
$$

考虑怎么求 $g_d(u)$

观察到我们只需要 $d$ 的倍数节点，对这些关键点和关键点的 $\text{lca}$ 建出虚树，这里有个结论就算 $1 \sim n$ 的约数个数之和为 $O(n \log n)$，所以虚数的大小也是 $O(n \log n)$ 的
$$
\begin{aligned}
g_d(u)&=\frac{\sum_{v\, \in\, \text{nulltree u}} (sz_v \times (\sum sz_k - sz_v))}2\, + [d \mid u] \times \sum_{v\, \in\, \text{nulltree u}} sz_v
\\&=\frac{(\sum sz_v)^2 - \sum sz_v^2}2+[d \mid u] \times \sum sz_v
\end{aligned}
$$
注意只有关键点有贡献，为了建树额外插入的 $\text{lca}$ 没有贡献

当 $u \mid d$ 时把加入贡献 $g_d(u)\mu\left(\frac{d}{u}\right)$

复杂度 $O(n\log n \log (n\log n))$



```cpp
const int N=2e5+10;
int n,u,v,stm,top,cnt,_d,ans;
int dfn[N],pos[21][N],d[N],fa[N],ak[N],sz[N];
int p[N],mu[N],pr[N],lg[N];
vector<int> as[N],G[N],S;

void link(int x,int y){G[x].pb(y),G[y].pb(x);}
int get(int x,int y){return d[x]<d[y]?x:y;}
int lca(int x,int y)
{
    if(x==y) return x;
    if(((x=dfn[x])>(y=dfn[y]))) swap(x,y);
    int d=lg[y-x++];
    return fa[get(pos[d][x],pos[d][y-(1<<d)+1])];
}

void dfs(int x,int rt)
{
    d[x]=d[fa[x]=rt]+1;
    pos[0][dfn[x]=++stm]=x;
    go(v) if(v^rt) dfs(v,x);
}

void ins(int x)
{
    sz[x]=1;
    if(!top) return void(ak[++top]=x);
    int p=lca(x,ak[top]);
    while(top>1 && d[ak[top-1]]>d[p])
        link(ak[top],ak[top-1]),top--;
    if(top && d[p]<d[ak[top]]) link(ak[top--],p);
    if(!top || ak[top]^p) ak[++top]=p;
    ak[++top]=x;
}

void dp(int x,int rt)
{
    int res=0;
    for(int &v:G[x]) 
        if(v^rt) dp(v,x),res+=sz[x]*sz[v],sz[x]+=sz[v];
    if(_d%x==0) ans+=res*mu[_d/x];
}

void clear(int x,int rt)
{
    for(int &v:G[x]) if(v^rt) clear(v,x);
    G[x].clear(),sz[x]=0;
}

void work(int x)
{
    S.clear(),top=0,_d=x;
    for(int k=1;k*x<=n;k++) S.push_back(k*x);
    auto tmp=[&](const int &a,const int &b){return dfn[a]<dfn[b];};
    sort(S.begin(),S.end(),tmp);

    if(x!=1) ak[top=1]=1;
    for(int &now:S) ins(now);
    while(top>1) link(ak[top],ak[top-1]),top--;

    dp(1,0);
    clear(1,0);
}

void solve()
{
    n=fr();
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
    }

    dfs(1,0);
    for(int k=1;(1<<k)<=n;k++)
        for(int i=1;i+(1<<k)-1<=n;i++)
            pos[k][i]=get(pos[k-1][i],pos[k-1][i+(1<<k-1)]);
    
    for(int D=1;D<=n;D++) work(D);
    fw(ans),nl;

    stm=ans=0;
    for(int i=1;i<=n;i++) as[i].clear();
}

signed main()
{
    lg[0]=-1;
    for(int i=1;i<=200000;i++) lg[i]=lg[i>>1]+1;
    mu[1]=1;
    for(int i=2;i<=200000;i++)
    {
        if(!p[i]) mu[pr[++cnt]=i]=-1;
        for(int j=1;pr[j]*i<=200000;j++)
        {
            p[pr[j]*i]=1;
            if(!(i%pr[j])) break;
            mu[i*pr[j]]=-mu[i];
        }
    }

    int T=fr();
    while(T--) solve();

    return 0;
}
```



# C

[1003 张力](https://acm.hdu.edu.cn/contest/problem?cid=1230&pid=1003)

异或的值可以考虑 $\text{Trie}$ 树，直接插入，则 $\text{lowbit} (x\oplus y)$ 为树上 $\text{lca}$ 的深度，因为是第一个不同的位置

因为推出最终序列的样子比较复杂，我们想直接计算出最终的答案

我们考虑最终序列中，我们随机找几个数，在最终序列里面就是几个连续段这样的分布

考虑设 $f_{u,k}$ 将节点 $u$ 子树中的所有数字在最终序列安排成 $k$ 个连续段的最小连接代价，则最终答案就是 $f_{rt,1}$

由于只有左儿子右儿子，单儿子直接转移，考虑如何合并左右儿子，这是一个类似树上背包的问题

$f(u,k)=\min (f_{ls,i}+f_{rs,j}+(i+j-k) \times 2^{dep_u+1})$

拆分一下变成 $f(u,k)=\min (f_{ls,i}+i \times 2^{dep_u+1}+f_{rs,j}+j \times 2^{dep_u+1})-k \times 2^{dep_u+1}\,,\, \max (1, \mid i-j\mid) \leq k \leq i+j$

这样枚举，考虑有两个 $\frac n2$ 的儿子，复杂度变成 $\frac n2 \times \frac n2 \times n$ 直接就是 $O(n^3)$ 级别，需要优化

由于这三个量我们还是得枚举两个才能确定第三个，我们考虑枚举 $k,i$ ，然后直接找出最优的 $j$，取 $i$ 为较小子树这样复杂度就是

 $sz_{ls} \times (sz_{ls}+sz_{rs}) \leq 2sz_{ls}sz_{rs} = O(sz_{ls}sz_{rs})=O(n^2)$ ，是树上背包的经典复杂度，取较大儿子会退化成 $O(n^3)$ 

考虑如何直接找到 $j$ ，一种可行的方式是使用 $st$ 表，这样复杂度只会增加 $O(n\log n \log A)$ $n$ 个节点每次计算要花费 $O(\log n)$ 的代价，至多计算 $O(\log A)$ 次

总复杂度 $O(n^2 + n\log n \log A)$ 

当然你可以用直觉或者注意力发现 $j$ 的函数具有下凸性，找靠近最低点的那一侧即可

关于 $j$ 的范围，$i-j \leq k,j-i \leq k,k \leq i+j$，也就是 $\mid\,\, i-k \mid\, \leq j \leq k+i$，当然还要在 $[1,sz]$ 之间

合并时考虑直接用 vector 存，直接把 vector 再传回去，也是一种分治再合并的经典Trick

注意 左移时要用 $\text{1ll}$

```cpp
const int N=5e6+10;
int n,idx;
int tr[N][2],q[N];

void ins(int x)
{
    int now=0;
    for(int i=0;i<=49;i++)
    {
        int t=(x>>i)&1;
        if(!tr[now][t]) tr[now][t]=++idx;
        now=tr[now][t];
    }
    q[now]++;
}

vector<int> merge(vector<int> a,vector<int> b,int w)
{
    if(a.size()>b.size()) a.swap(b);
    int x=a.size()-1,y=b.size()-1;
    int _min=1;
    for(int i=1;i<=y;i++)
        if(b[i]+w*i<b[_min]+w*_min) _min=i;
    vector<int> c(x+y+1,1000000000000000000);
    for(int k=1;k<=x+y;k++)
        for(int i=1;i<=x;i++)
        {
            int l=max(1,abs(i-k)),r=min(y,i+k);
            if(l<=r)
            {
                int j;
                if(_min<=l) j=l; 
                else if(_min<=r) j=_min;
                else j=r;
                c[k]=min(c[k],a[i]+b[j]+(i+j-k)*w);
            }
        }
    return c;
}

vector<int> dfs(int x,int d)
{
    if(d==50) return vector<int>(q[x]+1,0);
    if(!tr[x][0]) return dfs(tr[x][1],d+1);
    if(!tr[x][1]) return dfs(tr[x][0],d+1);
    return merge(dfs(tr[x][0],d+1),dfs(tr[x][1],d+1),1ll<<d);
}

void solve()
{
    n=fr();
    for(int i=1;i<=n;i++) ins(fr());
    fw(dfs(0,0)[1]),nl;
    for(int i=0;i<=idx;i++) tr[i][0]=tr[i][1]=q[i]=0;
    idx=0;
}
```



如果想进一步优化复杂度为 $O(n\log A)$ 就要充分利用每个 $f$ 都有下凸性的性质，对左右儿子线性合并

我们设两个儿子的最低点在 $p$ $q$ 的位置，$i$ $j$ 可以覆盖的区域为 $[\mid i-j \mid,i+j]$

我们初始把 $i$ $j$ 放在 $p$ $q$ 的位置，每次选择移动 $i$ $j$ 中更优的，更新新拓展的区域

向左拓展 $[1,\mid p-q \mid -1]$ 把 $i$ $j$ 向彼此移动，每次移动代价只与相邻差分有关系，往差分更小的地方移动即可

往右拓展 $[p+q+1,sz_{ls}+sz_{rs}]$ 把 $i$ $j$ 都向右移动，显然向左不如全向右，每次也选择差分更小的就行

每次都一定拓展一个，至多拓展 $O(sz_{ls}+sz_{rs})$ 次，复杂度为 $O(n\log A)$