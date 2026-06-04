---
title: 2025 ICPC & CCPC Oneline
date: 2025-09-21 22:13:03
tags:
---



# ICPC Online One

[The 2025 ICPC Asia East Continent Online Contest (I) - Dashboard - Contest - QOJ.ac](https://qoj.ac/contest/2513)



# CCPC Onlien 2025

## C

[造桥与砍树 - Problem - QOJ.ac](https://qoj.ac/contest/2534/problem/14549)

对最小生成树贪心的深刻理解

不管是 $Prim$ $Kruskal$ 还是 $Boruvka$ ，本质都是对边的贪心

关于其贪心正确性的证明 来自 rqy

> 证明的关键在于这么一个引理：
> 首先定义一条边 $e$ 相对于一个边集 $E$ 是＂安全边＂，当且仅当存在原图的某个割 ${ }^{+} C$ ，使得 $E \cap C=\emptyset, e \in C$ 并且 $e$ 是 $C$ 上边权最小的最小边。引理内容如下：
>
> 设边集 $E$ 是原图中某棵最小生成树 $T$ 的子集，边 $e$ 相对于 $E$ 是一条安全边，那么 $E \cup\{e\}$ 仍然是某棵最小生成树的子集。
> 引理也不难证：任取一个包含 $E$ 的最小生成树 $T$ ，若 $e \in T$ 那么 $T$ 就是合法的树，否则设 $e=(u, v)$ ，在 $T$ 中找到从 $u$ 到 $v$ 的路径；由于 $e \in C, ~ u$ 和 $v$ 必定分别在割的两个点集里，于是这条路径上必有某条边 $e^{\prime} \in C$ ；令 $T^{\prime}=T /\left\{e^{\prime}\right\} \cup\{e\}$ ，那么 $T^{\prime}$ 显然仍是一棵树，其权值不会大于 $T$ 的权值（因为 $c(e) \leq c\left(e^{\prime}\right)$ ），且 $E \cup\{e\} \subseteq T^{\prime}$（这是因为 $E \cap C=\emptyset$ ），所以删去的边肯定不是 $E$ 中的边。
>
> 根据这个引理，我们发现只要维护一个边集，每次加入一条安全边，就一定能得到某棵最小生成树。
> 对于 Kruskal，每次找到一条能加入当前边集的最小边。由于它是最小的边，所以随便找一个割就满足条件，于是这条边一定是安全边。
> 对于 Prim，每次把点集划分成＂$S$ 能到达的＂和＂$S$ 不能到达的＂两部分，取中间的最小的一条边，显然这是一条安全边。

而 $Boruvka$ 就是把两个连通块改成了森林扩展，自然也是正确的



使用 Boruvka $O(n \log^2 n)$ 直接暴力删除连通块暴力插入连通块

```cpp
const int N=2e5+10;
int n,k,cnt,ans,now,fl;
int a[N],col[N],p[N],sz[N];
vector<int> mem[N];
struct node{int u,v,w;}ed[N];

int find(int x)
{
    if(x==p[x]) return x;
    return p[x]=find(p[x]);
}

void merge(int x,int y,int w)
{
    x=find(x),y=find(y);
    if(x^y)
    {
        if(sz[x]>sz[y]) swap(x,y);
        p[x]=y,sz[y]+=sz[x];
        ans+=w,cnt++,fl=1;
    }
}

void solve()
{
    cin>>n>>k;
    for(int i=1;i<=n;i++) cin>>a[i],a[i]%=k;
    sort(a+1,a+1+n);
    for(int i=1;i<=n;i++) p[i]=i,sz[i]=1;

    ans=cnt=0;
    set<pair<int,int>> s;
    for(int i=1;i<=n;i++) s.insert({a[i],i});
    fl=1;

    while(fl)
    {
        fl=now=0;
        for(int i=1;i<=n;i++)
            if(i==find(i)) col[i]=++now;
        if(now==1) break;
        for(int i=1;i<=n;i++) mem[col[find(i)]].push_back(i);
        
        for(int i=1;i<=now;i++)
        {
            int res=1e18;
            for(auto &x:mem[i]) s.erase({a[x],x});
            for(auto &x:mem[i])
            {
                auto z=s.lower_bound({k-a[x],0});
                if(z==s.end()) z=s.begin();
                int v=(*z).second;
                if((a[x]+a[v])%k<res) res=(a[x]+a[v])%k,ed[i]={x,v,res};
            }
            for(auto &x:mem[i]) s.insert({a[x],x});
        }

        for(int i=1;i<=now;i++) merge(ed[i].u,ed[i].v,ed[i].w);
        for(int i=1;i<=now;i++) mem[i].clear();
        if(cnt==n-1) break;
    }

    cout<<ans<<endl;
}
```



我们考虑模拟 $prim$ 怎么做

在 $0 \sim k$ 的序列上面考虑，初始相当于 $n$ 棵树的森林，每个连通块扩展

仍然贪心边权，我们用双指针扫描，一左一右，每个右侧的点都和恰好能 $-k$ 的点连边，设这个点为 $m_i$

那么当左右指针相撞的时候，右侧所有的点都和左侧的某个点连边了，此时形成了以左侧每个点为根的一堆树组成的森林

现在考虑合并左侧这些连通块，每个左侧点一样两种策略，要么与最小的点合并，要么和 $m_{i-1}$ 合并

贪心的正确性已经证明了，并且每次操作都是有效的，即它一定会合并两个连通块，如果最后存在未合并的连通块，它连通块中最小的点一定属于左边，又由于这个点一定可以有有效操作，所以不成立 



当然也可以用线段树维护这个序列，不过我不会（



## G

[序列与整数对 - Problem - QOJ.ac](https://qoj.ac/contest/2534/problem/14553)

妙妙结论题

显然我们可以把询问 $(x,y)$ 在 $a[i]=x$ 和 $a[i]=y$ 时任选一处理，处理的复杂度是 $O(\max (cnt_x,cnt_y))$ 的

但是我们如果每次挂在小的上面，操作就是 $O(\min(cnt_x,cnt_y))$ 的了

我们把询问离线，并且记忆化，考虑一个经典结论

假设有 $k$ 种数，操作总数至多
$$
\Sigma_{i,j} \min(i,j) \leq \Sigma_{i,j} \frac {i+j}{2} = O(nk)
$$
如果 $k \leq \sqrt n$ 复杂度 $O(n \sqrt n)$

如果 $k \gt \sqrt n$ 那么，我们考虑 $\exist i \gt \sqrt n$ 的情况，不妨设 $cnt_1 \geq cnt_2 \geq ... \geq cnt_k$，那么 $cnt_i \leq cnt_{\sqrt n} \leq \sqrt n$，剩下如果都在之内和第一种情况一样



 ```cpp
 const int N=1e5+10;
 int n,q;
 int a[N];
 map<int,int> pos;
 map<pair<int,int>,int> cq;
 set<int> s;
 vector<pair<int,int>> pre[N],suf[N];
 int cnt[N],ans[N],Ans[N];
 
 signed main()
 {
     ios::sync_with_stdio(0);
     cin.tie(0);
     cin>>n>>q;
     for(int i=1;i<=n;i++)
     {
         cin>>a[i];
         s.insert(a[i]);
     }
     
     int m=0,tmp=0;
     for(auto it:s) pos[it]=++m;
     for(int i=1;i<=n;i++) a[i]=pos[a[i]];
 
     for(int i=1;i<=n;i++) cnt[a[i]]++;
     for(int i=1;i<=q;i++)
     {
         int x,y;
         cin>>x>>y;
         if(!pos.count(x) || !pos.count(y)) continue;
         x=pos[x],y=pos[y];
         if(cq.count({x,y})) {Ans[i]=cq[{x,y}];continue;}
         Ans[i]=cq[{x,y}]=++tmp;
         (cnt[x]<cnt[y])?pre[x].push_back({y,tmp}):suf[y].push_back({x,tmp});
     }
 
     for(int i=1;i<=m;i++) cnt[i]=0;
     for(int i=n;i;i--)
     {
         for(auto &it:pre[a[i]])
             ans[it.second]+=cnt[it.first];
         cnt[a[i]]++;
     }
 
     for(int i=1;i<=m;i++) cnt[i]=0;
     for(int i=1;i<=n;i++)
     {
         for(auto &it:suf[a[i]])
             ans[it.second]+=cnt[it.first];
         cnt[a[i]]++;
     }
 
     for(int i=1;i<=q;i++) cout<<ans[Ans[i]]<<'\n';
     
     return 0;
 }
 ```

