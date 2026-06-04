---
title: P7811 [JRKSJ R2] 你的名字。
date: 2024-01-13 23:15:00
tags:
- 分块
- 根号分治
- 待修ST表
categories:
- problem
mathjax: true
---

看到取模直接根号分治

设阈值为 $T$

$k \leq T$ ：离线后枚举每个 $k$，区间最小值随便做，$O(nT+m)/O(nT+mB)$ 笔者直接大力分块

$k \gt T$ ：我们可以发现问题等价于求 $\min_{p \in [0,\lfloor \frac {V}{k} \rfloor]} (x-p \times k)[x \geq p \times k]$

$p$ 只有 $\frac {V}{T}$ 个，总询问个数 $O(m\frac {V}{T})$，需要 $O(1)$ 查询最小值



我们考虑离线来降低查询复杂度，首先针对值域上的问题可以扫描线消一维，这个时候修改次数只有 $O(n)$，可以从修改入手

我们把询问挂在值域上，然后从大到小扫，我们需要 $O(1)$ 区间最小值，这只有 `RMQ` 可以做到，但是我们知道 `RMQ` 不支持待修，我们需要在根号时间内进行重构

引入分块 `RMQ` ：

首先这里只有单点修改，我们如果修改一个点，会影响 $O(\Sigma_{k=0}^{\lfloor \log_2^n \rfloor} 2^k)=O(2^{k+1}-1) \approx O(n)$ 个节点，所以我们想到分块，维护块间 `ST`  表和块内 `ST` 表，最多 $\sqrt n$ 个块，每块 $\sqrt n$ 个点，这样就是 $O(\sqrt n)$ 了



总复杂度 $O(nT+m\frac {V}{T})$，取 $T=\sqrt V$ 即可

注意到空间复杂度是 $O(n\sqrt V)$ 的，对于 $k\leq T$ ，我们每次重新建不预处理，而对于 $k \gt T$，我们不直接加入所有询问，而是最后把询问也挂到 $k$ 上面，最后把所有的 $k$ 的倍数 $p$ 全部挂上 $k$ ，处理 $p$ 的时候处理一下 $k$ 的询问即可，相当于是从枚举倍数变成枚举 $p$ 的因子，这样就变成 $O(V\log V)$ 的了

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb emplace_back
#define go(it) for(auto &it:as[x])
#define il inline
using namespace std;

const int N=3e5+10,M=1e3,B=550,V=1e5+10;
int n,m;
int a[N],ans[N],st[M],ed[M],c[N];
struct node{int l,r,id;};
vector<node> q[V],qs[V];
vector<int> ck[V];
bitset<N> bs,apr;

il int fr(){
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
il void fw(int x){
    if(x<0) putchar('-'),x=-x;
    if(x>9) fw(x/10);
    putchar(x%10+'0');
}
il int max(int a,int b){return a>b?a:b;}
il int min(int a,int b){return a<b?a:b;}

struct Block_Min
{
    int Min[M],b[N];
    int query(int l,int r,int k)
    {
        int L=c[l]+1,R=c[r]-1,ans=2e9;
        if(c[l]==c[r])
        {
            for(int i=l;i<=r;i++) ans=min(ans,b[i]);
            return ans;
        }
        for(int i=L;i<=R;i++) ans=min(ans,Min[i]);
        for(int i=l;i<=ed[c[l]];i++) ans=min(ans,b[i]);
        for(int i=st[c[r]];i<=r;i++) ans=min(ans,b[i]);
        return ans;
    }
    void build(int k)
    {
        memset(Min,0x3f,sizeof Min);
        for(int i=1;i<=n;i++)
            Min[c[i]]=min(Min[c[i]],b[i]=a[i]%k);
    }
    void solve()
    {
        for(int i=1;i<=n;i++) c[i]=(i-1)/B+1;
        for(int k=1;k<=c[n];k++)
            st[k]=(k-1)*B+1,ed[k]=k*B;
        ed[c[n]]=n;

        for(int k=1;k<=B;k++)
        {
            if(!qs[k].size()) continue;
            build(k);
            for(node &v:qs[k])
                ans[v.id]=query(v.l,v.r,k);
        }
    }
}B1;

struct Block_Max
{
    int Min[10][M],_Min[10][M][M],lg[N],pre[N],suf[N];
    vector<int> add[N];

    void mdf(int p)
    {
        int b=c[p];
        for(int k=0;k<=lg[c[n]];k++)
            for(int i=max(b-(1<<k)+1,1);i<=b && i+(1<<k)-1<=c[n];i++)
                Min[k][i]=a[p];
        for(int i=st[b];i<=p;i++) suf[i]=a[p];
        for(int i=p;i<=ed[b];i++) pre[i]=a[p];
        int sz=ed[b]-st[b]+1,now=p-st[b]+1;
        for(int k=0;k<=lg[sz];k++)
            for(int i=max(now-(1<<k)+1,1);i<=now && i+(1<<k)-1<=sz;i++)
                _Min[k][b][i]=a[p];
    }
    int ST(int l,int r)
    {
        if(l>r) return 2e9;
        int d=lg[r-l+1];
        return min(Min[d][l],Min[d][r-(1<<d)+1]);
    }
    int query(int l,int r)
    {
        if(c[l]==c[r])
        {
            int d=lg[r-l+1],b=c[l];
            l=l-st[b]+1,r=r-st[b]+1;
            return min(_Min[d][b][l],_Min[d][b][r-(1<<d)+1]);
        }
        return min({suf[l],pre[r],ST(c[l]+1,c[r]-1)});
    }

    void solve()
    {
        lg[0]=-1;
        memset(Min,0x3f,sizeof Min);
        memset(pre,0x3f,sizeof pre);
        memset(suf,0x3f,sizeof suf);
        memset(_Min,0x3f,sizeof _Min);
        for(int i=1;i<=n;i++)
            add[a[i]].pb(i),lg[i]=lg[i>>1]+1;
        
        for(int v=apr._Find_first();v<=1e5;v=apr._Find_next(v))
            for(int x=0;x<=1e5;x+=v)
                ck[x].pb(v);

        for(int v=1e5;~v;v--)
        {
            for(int &p:add[v]) mdf(p),bs.set(p,1);
            for(int &now:ck[v])
                for(node &k:q[now])
                    ans[k.id]=min(ans[k.id],query(k.l,k.r)-v);
        }
    }
}B2;

int main()
{
    n=fr(),m=fr();
    for(int i=1;i<=n;i++) a[i]=fr();

    memset(ans,0x3f,sizeof ans);
    for(int i=1;i<=m;i++)
    {
        int l=fr(),r=fr(),k=fr();
        if(k<=B) qs[k].pb(node({l,r,i}));
        else q[k].pb(node({l,r,i})),apr.set(k,1);
    }

    B1.solve();
    B2.solve();
    for(int i=1;i<=m;i++) fw(ans[i]),nl;
    return 0;
}
```

