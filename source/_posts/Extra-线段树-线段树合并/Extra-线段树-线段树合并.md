---
title: Extra 线段树-线段树合并
date: 2023-12-10 00:21:10
tags:
- 线段树
- 线段树合并
- 数据结构
categories:
- note
mathjax: true
---

[线段树的高级用法 - qAlex_Weiq - 博客园 (cnblogs.com)](https://www.cnblogs.com/alex-wei/p/segment_tree_yyds.html)

当需要开多个线段树，但是只需要维护一部分信息并要求合并线段树信息时，利用动态开点完成线段树合并

每次合并的复杂度是相同节点个数，每个节点至多被递归一次，总节点数在 $O(n\log n)$ 级别

时空复杂度均在 $O(n\log n)$ 级别

[P4556 [Vani有约会\] 雨天的尾巴 /【模板】线段树合并 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4556)

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=4e5+10,V=1e5+10;
int n,m,u,v,w,cnt,inf=1e5+1;
int Rt[N],fa[22][N],d[N],lg[N],ans[N];
vector<int> as[N];
struct node{
    int ls,rs;
    int mx,id;
}tr[N*20];

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

void prework(int x,int rt)
{
    d[x]=d[rt]+1;
    fa[0][x]=rt;
    for(int k=1;(1<<k)<=d[x];k++)
        fa[k][x]=fa[k-1][fa[k-1][x]];
    go(v) if(v!=rt) prework(v,x);
}

int lca(int x,int y)
{
    if(d[x]<d[y]) return lca(y,x);
    int dh=d[x]-d[y],li=lg[dh];
    for(int k=li;~k;k--)
        if((dh>>k)&1) x=fa[k][x];
    if(x==y) return x;
    li=lg[d[x]];
    for(int k=li;~k;k--)
        if(fa[k][x]!=fa[k][y])
            x=fa[k][x],y=fa[k][y];
    return fa[0][x];
}

void chf(int idx)
{
    node &t=tr[idx],&ls=tr[t.ls],&rs=tr[t.rs];
    t.mx=max(ls.mx,rs.mx);
    t.id=t.mx==ls.mx?ls.id:rs.id;
}

void modify(int vl,int vr,int ql,int qr,int &idx,int x)
{
    if(!idx) idx=++cnt;
    node &t=tr[idx];
    if(vl==vr) return t.mx+=x,t.id=ql,void();
    int mid=(vl+vr)>>1;
    if(ql<=mid) modify(vl,mid,ql,qr,t.ls,x);
    if(qr>mid) modify(mid+1,vr,ql,qr,t.rs,x);
    chf(idx);
}

int merge(int vl,int vr,int Tx,int Ty)
{
    node &l=tr[Tx],&r=tr[Ty];
    if(!Tx || !Ty) return Tx|Ty;
    if(vl==vr)
    {
        l.mx+=r.mx,l.id=vl;
        return Tx;
    }

    int mid=(vl+vr)>>1;
    l.ls=merge(vl,mid,l.ls,r.ls);
    l.rs=merge(mid+1,vr,l.rs,r.rs);
    return chf(Tx),Tx;
}

void dfs(int x,int rt)
{
    go(v)
    {
        if(v==rt) continue;
        dfs(v,x);
        Rt[x]=merge(1,inf,Rt[x],Rt[v]);
    }
    ans[x]=(!tr[Rt[x]].mx)?0:tr[Rt[x]].id;
}

int main()
{
    n=fr(),m=fr();
    lg[0]=-1;
    for(int i=1;i<=n;i++) lg[i]=lg[i>>1]+1;
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
    }
    prework(1,0);
    while(m--)
    {
        u=fr(),v=fr(),w=fr();
        int p=lca(u,v);
        modify(1,inf,w,w,Rt[u],1);
        modify(1,inf,w,w,Rt[v],1);
        modify(1,inf,w,w,Rt[p],-1);
        if(p^1) modify(1,inf,w,w,Rt[fa[0][p]],-1);
    }

    dfs(1,-1);
    for(int i=1;i<=n;i++)
        fw(ans[i]),nl;
    return 0;
}
```



[Lomsat gelral - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF600E)

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
int n,u,v,w,cnt;
int Rt[N];
vector<int> as[N];
struct node{
    int ls,rs;
    int mx,id;
}tr[N*20];

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

void modify(int vl,int vr,int ql,int qr,int &idx,int x)
{
    if(!idx) idx=++cnt;
    node &t=tr[idx];
    t.mx=x,t.id=ql;
    if(vl==vr) return;
    int mid=(vl+vr)>>1;
    if(ql<=mid) modify(vl,mid,ql,qr,t.ls,x);
    if(qr>mid) modify(mid+1,vr,ql,qr,t.rs,x);
}

void chf(int idx)
{
    node &t=tr[idx],&ls=tr[t.ls],&rs=tr[t.rs];
    t.mx=max(ls.mx,rs.mx);
    if(ls.mx>rs.mx) t.id=ls.id;
    else if(ls.mx<rs.mx) t.id=rs.id;
    else t.id=ls.id+rs.id;
}

int merge(int vl,int vr,int Tx,int Ty)
{
    if(!Tx || !Ty) return Tx|Ty;
    node &l=tr[Tx],&r=tr[Ty];
    if(vl==vr)
    {
        l.mx+=r.mx;
        return Tx;
    }

    int mid=(vl+vr)>>1;
    l.ls=merge(vl,mid,l.ls,r.ls);
    l.rs=merge(mid+1,vr,l.rs,r.rs);
    return chf(Tx),Tx;
}

void dfs(int x,int rt)
{
    go(v)
    {
        if(!(v^rt)) continue;
        dfs(v,x);
        Rt[x]=merge(1,n,Rt[x],Rt[v]);
    }
}

signed main()
{
    n=fr();
    for(int i=1,x;i<=n;i++)
        w=fr(),modify(1,n,w,w,Rt[i],1);
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
    }

    dfs(1,-1);
    for(int i=1;i<=n;i++)
        fw(tr[Rt[i]].id),pt;
    return 0;
}
```



[P1600 [NOIP2016 提高组\] 天天爱跑步 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1600)

同时维护两种贡献

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=3e5+10;
int n,m,u,v,cnt,inf=2*N;
int fa[21][N],w[N],d[N],lg[N],ans[N];
vector<int> as[N];

struct SegTree{
    int cnt,Rt[N];
    SegTree(){cnt=0;memset(Rt,0,sizeof Rt);}
    struct node{
        int ls,rs;
        int v;
        node(){}
        node(int ls,int rs,int v=0):
            ls(ls),rs(rs),v(v){}
    }tr[N*20];

    void modify(int vl,int vr,int pos,int &idx,int x)
    {
        if(!idx) idx=++cnt;
        node &t=tr[idx];
        if(vl==vr) return void(t.v+=x);
        int mid=(vl+vr)>>1;
        if(pos<=mid) modify(vl,mid,pos,t.ls,x);
        else modify(mid+1,vr,pos,t.rs,x);
    }

    int merge(int vl,int vr,int Tx,int Ty)
    {
        if(!Tx || !Ty) return Tx|Ty;
        node &l=tr[Tx],&r=tr[Ty];
        if(vl==vr) return l.v+=r.v,Tx;
        int mid=(vl+vr)>>1;
        l.ls=merge(vl,mid,l.ls,r.ls);
        l.rs=merge(mid+1,vr,l.rs,r.rs);
        return Tx;
    }

    int query(int vl,int vr,int pos,int idx)
    {
        if(!idx) return 0;
        node &t=tr[idx];
        if(vl==vr) return t.v;
        int mid=(vl+vr)>>1;
        if(pos<=mid) return query(vl,mid,pos,t.ls);
        return query(mid+1,vr,pos,t.rs);
    }

    void dfs(int x,int rt,int ty)
    {
        go(v)
            if(v^rt)
                dfs(v,x,ty),Rt[x]=merge(-inf,inf,Rt[x],Rt[v]);
        ans[x]+=(!ty)?query(-inf,inf,d[x]+w[x],Rt[x]):query(-inf,inf,w[x]-d[x],Rt[x]);
    }
}up,dn;

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

void prework(int x,int rt)
{
    d[x]=d[rt]+1;
    fa[0][x]=rt;
    for(int k=1;(1<<k)<=d[x];k++)
        fa[k][x]=fa[k-1][fa[k-1][x]];
    go(v) if(v^rt) prework(v,x);
}

int lca(int x,int y)
{
    if(d[x]<d[y]) return lca(y,x);
    int dh=d[x]-d[y],li=lg[dh];
    for(int k=li;~k;k--)
        if((dh>>k)&1) x=fa[k][x];
    if(x==y) return x;
    li=lg[d[x]];
    for(int k=li;~k;k--)
        if(fa[k][x]!=fa[k][y])
            x=fa[k][x],y=fa[k][y];
    return fa[0][x];
}

int main()
{
    n=fr(),m=fr();
    lg[0]=-1;
    for(int i=1;i<=n;i++) lg[i]=lg[i>>1]+1;
    for(int i=1;i<n;i++)
    {
        u=fr(),v=fr();
        as[u].pb(v),as[v].pb(u);
    }
    for(int i=1;i<=n;i++) w[i]=fr();
    prework(1,0);
    while(m--)
    {
        u=fr(),v=fr();
        int p=lca(u,v),len=d[u]+d[v]-(d[p]<<1);
        up.modify(-inf,inf,d[u],up.Rt[u],1);
        if(fa[0][p]) up.modify(-inf,inf,d[u],up.Rt[fa[0][p]],-1);
        dn.modify(-inf,inf,len-d[v],dn.Rt[v],1);
        dn.modify(-inf,inf,len-d[v],dn.Rt[p],-1);
    }
    up.dfs(1,-1,0),dn.dfs(1,-1,1);
    for(int i=1;i<=n;i++)
        fw(ans[i]),pt;
    return 0;
}
```



[Mass Change Queries - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF911G)

对 $100$ 种数，维护它拥有的序列下标，操作等价于把某种树的一些子树裂出来，再合并给另一种树

这里空间回收，注意每次把整棵树的节点都要回收

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10,M=110;
int n,m,l,r,x,y,cnt,now;
int col[N],rt[N];
stack<int> s;
struct node{
    int ls,rs;
    int v;
    void init(){ls=rs=v=0;}
}tr[N*80];

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
int Node()
{
    int v=0;
    if(s.size()) v=s.top(),s.pop();
    else v=++cnt;
    tr[v].init();
    return v;
}

void modify(int vl,int vr,int pos,int &idx)
{
    if(!idx) idx=++cnt;
    node &t=tr[idx];
    if(vl==vr) return void(t.v=1);
    int mid=(vl+vr)>>1;
    if(pos<=mid) modify(vl,mid,pos,t.ls);
    else modify(mid+1,vr,pos,t.rs);
}

int merge(int vl,int vr,int &Tx,int &Ty)
{
    if(!Tx || !Ty) return Tx|Ty;
    node &l=tr[Tx],&r=tr[Ty];
    if(vl==vr)
    {
        l.v+=r.v,r.init();
        s.push(Ty),Ty=0;
        return Tx;
    }
    int mid=(vl+vr)>>1;
    l.ls=merge(vl,mid,l.ls,r.ls);
    l.rs=merge(mid+1,vr,l.rs,r.rs);
    s.push(Ty),r.init(),Ty=0; //回收节点
    return Tx;
}

void update(int vl,int vr,int ql,int qr,int &Tx,int &Ty)
{
    if(!Tx) Tx=Node();
    node &l=tr[Tx],&r=tr[Ty];
    if(ql<=vl && qr>=vr)
        return void(Tx=merge(vl,vr,Tx,Ty));
    int mid=(vl+vr)>>1;
    if(ql<=mid) update(vl,mid,ql,qr,l.ls,r.ls);
    if(qr>mid) update(mid+1,vr,ql,qr,l.rs,r.rs);
}

void dfs(int vl,int vr,int idx)
{
    if(!idx) return;
    node &t=tr[idx];
    if(vl==vr)
    {
        if(t.v) col[vl]=now;
        return;
    }
    int mid=(vl+vr)>>1;
    dfs(vl,mid,t.ls),dfs(mid+1,vr,t.rs);
}

int main()
{
    n=fr();
    for(int i=1;i<=n;i++)
        modify(1,n,i,rt[fr()]);
    m=fr();
    while(m--)
    {
        l=fr(),r=fr(),x=fr(),y=fr();
        if(x^y) update(1,n,l,r,rt[y],rt[x]);
    }
    for(int i=1;i<=100;i++) now=i,dfs(1,n,rt[i]);
    for(int i=1;i<=n;i++) fw(col[i]),pt;
    return 0;
}
```

