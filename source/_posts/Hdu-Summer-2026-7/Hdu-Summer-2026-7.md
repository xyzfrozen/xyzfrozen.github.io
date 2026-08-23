---
title: Hdu-Summer-2026-7
date: 2026-08-15 22:36:58
tags:
- 线性 Dp
- Hash
- 树同构
---



这场的题目还挺有意思的

赛时五题，补DI



# I

队友提出了一个对全过程的类似型，认为必然先去到一边墙然后疯狂撞然后再走回去

实际上可以先撞一面然后再去撞另一面反正这个策略可以是非常复杂的

实际上暴力设状态然后再单调队列优化一下就行了，当时没仔细想直接认为队友做的是对的就没管了

```
const int N=510;
int n,m,s;
int K[N],C[N],lim[N];
int f[2][N][N];
int q[N];

void solve()
{
    n=fr(),m=fr(),s=fr();
    for(int i=1;i<=m;i++) K[i]=fr(),C[i]=fr();
    for(int i=1;i<=n;i++) lim[i]=fr();

    //f[i][j][pos] now i rush get j the wall pos
    //f[i][j][pos]=f[i-1][j][?]+C[i]/0 or f[i-1][j-1][?]+C[i];
    memset(f,0x3f,sizeof f);
    f[0][0][s]=0;

    for(int t=1,i=1;t<=m;t++,i^=1,memset(f[i],0x3f,sizeof f[i]))
        for(int j=0;j<=t;j++)
        {
            if(j) for(int pos=1;pos<=K[t];pos++) f[i][j][1]=min(f[i][j][1],f[i^1][j-1][pos]+C[t]);
            if(j) for(int pos=n;pos>=n-K[t]+1;pos--) f[i][j][n]=min(f[i][j][n],f[i^1][j-1][pos]+C[t]);

            int hh=0,tt=-1;
            for(int k=1;k<=min(n,K[t]-1);k++)
            {
                while(hh<=tt && f[i^1][j][q[tt]]>=f[i^1][j][k]) tt--;
                q[++tt]=k;
            }

            for(int pos=1;pos<=n;pos++)
            {
                //[pos-K[i],pos+K[i]]
                if(pos-K[t]>=1) f[i][j][pos]=min(f[i][j][pos],f[i^1][j][pos-K[t]]+C[t]);
                if(pos+K[t]<=n) f[i][j][pos]=min(f[i][j][pos],f[i^1][j][pos+K[t]]+C[t]);
                
                //[pos-K[i]+1,pos+K[i]-1]
                // for(int k=max(1,pos-K[t]+1);k<=min(n,pos+K[t]-1);k++)
                //     f[i][j][pos]=min(f[i][j][pos],f[i^1][j][k]);
                
                while(hh<=tt && q[hh]<max(1,pos-K[t]+1)) hh++;
                if(pos+K[t]-1<=n)
                {
                    while(hh<=tt && f[i^1][j][q[tt]]>=f[i^1][j][pos+K[t]-1]) tt--;
                    q[++tt]=pos+K[t]-1;
                }
                f[i][j][pos]=min(f[i][j][pos],f[i^1][j][q[hh]]);
            }
        }
    
    for(int t=1;t<=n;t++)
    {
        int ans=-1;
        for(int j=m;j>=0;j--)
            if(f[m&1][j][t]<=lim[t]) {ans=j;break;}
        fw(ans),pt;
    }
    nl;
}

signed main()
{
    int T=fr();
    while(T--) solve();
    return 0;
}
```



# D

首先要发现只需要形态一样不需要点一定对应的，那么所有二度点都可以直接删掉（三点共线中间点就是没用的）

其次要发现紊乱点一定是中心点，考虑两颗树旋转前后一样，首先这个点一定在树上（非旋转一圈时），单重心中心就是重心，双重心中心就是重心相连边的中点

然后双重心如果两边一模一样就是 `1 2` 否则只有 `1`

单重心就把一样的分成一组，答案就是每组大小的 $\gcd$ 的所有因数

判断一模一样用 树Hash

注意删除点的时候不能边删除边添加，要提前存一下没删时候的儿子，否则递归迭代器会紊乱，建新边的时候要建双向边

```
const int N=2e5+10,Q=1e9+7;
int n,u,v,m;
int sz[N],P[N],d[N],h[N],H[2];
pi S[N];
vector<int> r;
unordered_set<int> as[N];

void era(int x,int rt)
{
    vector<int> son;
    go(v) if(v^rt) son.pb(v);
    for(auto &v:son) era(v,x);
    if(as[x].size()==2 && rt)
    {
        m--;
        if(as[rt].count(x)) as[rt].erase(x);
        
        go(v) 
            if(v^rt) 
            {
                as[rt].insert(v);
                as[v].insert(rt);
                if(as[v].count(x)) as[v].erase(x);
            }
    }
}

void center(int x,int rt)
{
    sz[x]=1;
    int mx=0;
    go(v) if(v^rt) center(v,x),mx=max(mx,sz[v]),sz[x]+=sz[v];
    mx=max(mx,m-sz[x]);
    if(mx<=(m>>1)) r.pb(x);
}

void dfs(int x,int rt)
{
    d[x]=d[rt]+1;
    h[x]=d[x]*P[1]%Q,sz[x]=1;
    go(v) if(v^rt) dfs(v,x);
    int cnt=0;
    go(v) if(v^rt) S[++cnt]={h[v],sz[v]};
    sort(S+1,S+1+cnt);
    for(int i=1;i<=cnt;i++)
        (h[x]+=S[i].first*P[sz[x]]%Q)%=Q,sz[x]+=S[i].second;
     
}

void solve()
{
    m=n=fr();
    for(int i=1;i<=n;i++) as[i].clear(),sz[i]=0;
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].insert(v);
        as[v].insert(u);
    }

    era(1,0);
    int R=1;
    if(as[1].size()==2)
    {
        m--;
        int ls=*as[1].begin(),rs=*(++as[1].begin());
        as[ls].insert(rs),
        as[rs].insert(ls);
        if(as[ls].count(1)) as[ls].erase(1);
        if(as[rs].count(1)) as[rs].erase(1);
        R=ls;
    }
    
    r.clear();
    center(R,0);
    for(int i=0;i<r.size();i++)
    {
        dfs(r[i],0);
        H[i]=h[r[i]];
    }

    if(r.size()==2) H[0]==H[1]?puts("2\n1 2"):puts("1\n1");
    else
    {
        unordered_map<int,int> cnt;
        for(auto v:as[r[0]]) cnt[h[v]]++;
        int ans=0;
        for(auto x:cnt)
            (!ans)?(ans=x.second):(ans=__gcd(ans,x.second));
        vector<int> res;
        for(int i=1;i*i<=ans;i++)
            if(!(ans%i)) 
            {
                res.pb(i);
                if(i!=ans/i) res.pb(ans/i);
            }
        sort(res.begin(),res.end());
        fw(res.size()),nl;
        for(auto &x:res) fw(x),pt;
        nl;
    }
}

signed main()
{
    P[0]=1;
    for(int i=1;i<=200000;i++) P[i]=P[i-1]*233%Q;
    int T=fr();
    while(T--) solve();
    return 0;
}
```

