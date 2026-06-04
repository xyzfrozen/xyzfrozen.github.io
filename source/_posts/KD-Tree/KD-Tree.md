---
title: KD-Tree
date: 2023-12-23 21:05:04
tags:
- KD-Tree
categories:
- note
password: Violet Evergarden
mathjax: true
---

这个玩意实在是太少见了，用于维护高维信息查询，不过一般 $k=2$

我们考察把空间上的点维护成一个树形结构，同时通过 $size$ 来保证复杂度

每个节点维护左右儿子，每个维护的值域范围（比如二维就是 $x_{min},x_{max},y_{min},y_{max}$），以及需要查询的信息



`build`

若已知 $k$ 维空间中的 $n$ 个点坐标，将其构建成一棵 K-D tree，过程如下：

1. 若当前只有一个点，返回这个点
2. 选择一个维度，将当前点集按照这个维度分成两个点集
3. 选切割点，在选择的维度上选择一个点，这一维度上的值小于这个点的归入左子树，其余归入右子树
4. 将选择的点作为这棵子树的根节点，递归左右子树并维护信息

![9oc6zusm](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202312232111716.png)

![6cq7ikki](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202312232112898.png)

为保证复杂度，切割维度可以选择方差最大的维度，也可以随机选一个维度，选切割点的时候选择该维度的中位数，可以保证层数。

用 `nth_element(s+l,s+mid,s+r+1,tmp)` 可以找到 `s[l]` 到 `s[r]` 之间值按 `tmp` 排序后再 `s[mid]` 处的值，并 `s[mid]` 左边均小于 `s[mid]`，右边均大于，不同于排序函数，它是 $O(n)$ 的！！！



`insert` 

每次按照当前根节点的划分维度，判定这个新增节点应该放到什么位置，当碰到一个空位置时直接返回结果

由于这里不像建树，每次 $sz$ 减半，保证了树高为 $O(\log n)$，我们需要在某个时间重构树

[替罪羊树的复杂度严谨证明 - LawArthur&小落的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/LAWArthur/ti-zui-yang-shu-di-fu-za-du-yan-jin-zheng-ming)

复杂度均摊 $O(n\log n)$，重构条件 `max(sz(ls),sz(rs))>0.75*sz(now)`



`query`

和平衡树类似，当前节点贡献+儿子节点贡献

复杂度是递归次数，$O(n^{1-\frac 1k})$，一般就 $O(\sqrt n)$



总复杂度 $O(n\sqrt n)$



[模板题](https://www.luogu.com.cn/problem/P4148)

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,op,lst,rt,cnt,inf=2e9;
int x[N],y[N],sz[N],sum[N],v[N],dms[N];
int ls[N],rs[N],vl[N],vr[N],vu[N],vd[N];
int vec[N],idx;
double alpha=0.75;

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

void chf(int now)
{
    sum[now]=sum[ls[now]]+sum[rs[now]]+v[now];
    sz[now]=sz[ls[now]]+sz[rs[now]]+1;
    vl[now]=min({x[now],vl[ls[now]],vl[rs[now]]});
    vr[now]=max({x[now],vr[ls[now]],vr[rs[now]]});
    vd[now]=min({y[now],vd[ls[now]],vd[rs[now]]});
    vu[now]=max({y[now],vu[ls[now]],vu[rs[now]]});
}

void dfs(int now)
{
    if(!now) return;
    dfs(ls[now]);
    vec[++idx]=now;
    dfs(rs[now]);
}

void build(int &now,int l,int r)
{
    if(l>r) return void(now=0);
    double avg1=0,sqr1=0,avg2=0,sqr2=0;
    for(int i=l;i<=r;i++)
        avg1+=x[vec[i]],avg2+=y[vec[i]];
    avg1/=r-l+1,avg2/=r-l+1;
    for(int i=l;i<=r;i++)
        sqr1+=(x[vec[i]]-avg1)*(x[vec[i]]-avg1),
        sqr2+=(y[vec[i]]-avg2)*(y[vec[i]]-avg2);
    int mid=(l+r)>>1;
    if(sqr1>sqr2)
    {
        auto tmp=[](const int a,const int b){return x[a]<x[b];};
        nth_element(vec+l,vec+mid,vec+r+1,tmp);
    }
    else
    {
        auto tmp=[](const int a,const int b){return y[a]<y[b];};
        nth_element(vec+l,vec+mid,vec+r+1,tmp);
    }
    dms[now=vec[mid]]=sqr1>sqr2;
    build(ls[now],l,mid-1);
    build(rs[now],mid+1,r);
    chf(now);
}

void rebuild(int &now)
{
    idx=0,dfs(now);
    build(now,1,idx);
}

void ins(int &now)
{
    if(!now) return void(chf(now=cnt));
    if(!dms[now]) //dimension x
        (x[cnt]<=x[now])?ins(ls[now]):ins(rs[now]);
    else //dimension y
        (y[cnt]<=y[now])?ins(ls[now]):ins(rs[now]);
    chf(now);
    if(sz[now] && 1.0*max(sz[ls[now]],sz[rs[now]])>sz[now]*alpha) rebuild(now);
}

bool ok(int l1,int l2,int d1,int d2,int r1,int r2,int u1,int u2){return l1<=l2 && d1<=d2 && r1>=r2 && u1>=u2;}
int query(int now,int ql,int qd,int qr,int qu)
{
    if(!now || qr<vl[now] || ql>vr[now] || qd>vu[now] || qu<vd[now]) return 0;
    if(ok(ql,vl[now],qd,vd[now],qr,vr[now],qu,vu[now])) return sum[now];
    return ok(ql,x[now],qd,y[now],qr,x[now],qu,y[now])*v[now]+query(ls[now],ql,qd,qr,qu)+query(rs[now],ql,qd,qr,qu);
}

int main()
{
    n=fr();
    vl[0]=vd[0]=inf,vr[0]=vu[0]=-inf;
    while(op=fr(),op^3)
    {
        if(op&1)
            x[++cnt]=fr()^lst,y[cnt]=fr()^lst,v[cnt]=fr()^lst,ins(rt);
        else
        {
            int x1=fr()^lst,y1=fr()^lst,x2=fr()^lst,y2=fr()^lst;
            fw(lst=query(rt,x1,y1,x2,y2)),nl;
        }
    }

    return 0;
}
```

