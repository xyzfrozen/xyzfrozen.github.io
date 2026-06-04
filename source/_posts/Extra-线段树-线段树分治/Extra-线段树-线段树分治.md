---
title: Extra 线段树-线段树分治
date: 2023-12-29 23:09:45
tags:
- 线段树
- 分治
- 可撤销并查集
- 图论
categories:
- note
mathjax: true
---

线段树分治作为分治的一种主要用于有上下界的时效性的操作，而询问则是从 $1 \sim n$ 全部的这种

$cdq$ 分治的核心思想就是将修改和询问丢一块，然后左右区间合并上来的时候考虑左边区间对右边区间的贡献，其修改一般都是**永久性的，不可撤销**，也就是作用时间是 $[tim,+\infty]$

线段树分治仅对询问区间进行分治，并且修改对应**一段区间** $[l,r]$ ，也就相当于**可撤销**。进而，每个修改对应的就是一段询问区间。如果把询问建成 " 线段树 " 的模样，修改就可以拆分成修改 $O(\log n)$ 个线段树节点



对于每个询问，我们在叶子节点处理，在线段树上，从父亲走向叶子节点加入操作，从儿子回溯父亲节点撤销操作

这样对于一个修改和撤销都方便的操作，我们就可以使用线段树分治

一般来说如果离线就是 $O(m\log n V)$，$O(V)$ 为单次修改和撤销的复杂度



[模板题](https://www.luogu.com.cn/problem/P5787)

判定二分图等价于判定奇环，我们有一种拆点依靠正反点判定二分图的简单办法

首先 $(u,v)$ 拆成 $(u,v+n)$，$(v,u+n)$，我们注意到从 $[1,n]$ 集合中的一点作为起点，如果终点在 $[n+1,2 \times n]$ 之间则一定走了奇数步，这样只用判定是否有环形成

一旦 $(x,x+n)$ 在同一个集合里面，一定对应在**原图**中（不是拆点后的图）是存在一条从 $x$ 出发的奇环的，我们只用在每次合并时判定一下即可



如果路径压缩，就可以均摊 $O(n\log n)$ 的实现合并，但路径压缩并不能撤销，我们想到可持久化并查集的办法，启发式合并即可，递归时用 `vector` 记录下操作并撤销，**注意按栈的方式倒序撤销**！！

递归总复杂度 $O(n\log n)$，每次操作 $O(m\log n)$，总复杂度 $O((n+m)\log n)$

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
#define vec vector<node>
using namespace std;

const int N=2e5+10;
int n,m,k;
int p[N],sz[N],ok[N<<2];
struct node{int x,y;};
vec oper[N<<2];

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

void modify(int vl,int vr,int ql,int qr,int idx,node v)
{
    if(ql<=vl && qr>=vr) return void(oper[idx].pb(v));
    int mid=(vl+vr)>>1;
    if(ql<=mid) modify(vl,mid,ql,qr,idx<<1,v);
    if(qr>mid) modify(mid+1,vr,ql,qr,idx<<1|1,v);
}

int find(int x){return (p[x]^x)?find(p[x]):x;}
void del(node &v){sz[v.y]-=sz[v.x],p[v.x]=v.x;}
void merge(int x,int y,vec &now)
{
    x=find(x),y=find(y);
    if(!(x^y)) return;
    if(sz[x]>sz[y]) swap(x,y);
    sz[y]+=sz[x],p[x]=y;
    now.pb({x,y});
}

void query(int vl,int vr,int idx)
{
    vec now(0);
    if(ok[idx])
    {
        for(node &v:oper[idx])
        {
            int x=v.x,y=v.y;
            merge(x,y+n,now),merge(y,x+n,now);
            ok[idx]&=(find(x)^find(x+n)) && (find(y)^find(y+n));
            if(!ok[idx]) break;
        }
    }

    if(vl==vr)
    {
        puts(ok[idx]?"Yes":"No");
        while(now.size()) del(now.back()),now.pop_back();
        return;
    }
    int mid=(vl+vr)>>1;
    ok[idx<<1]=ok[idx<<1|1]=ok[idx];
    query(vl,mid,idx<<1),query(mid+1,vr,idx<<1|1);
    while(now.size()) del(now.back()),now.pop_back();
}

int main()
{
    n=fr(),m=fr(),k=fr();
    for(int i=1;i<=(n<<1);i++) 
        p[i]=i,sz[i]=1;
    while(m--)
    {
        int x=fr(),y=fr(),l=fr()+1,r=fr();  
        modify(1,k,l,r,1,{x,y});
    }
    ok[1]=1,query(1,k,1);
    return 0;
}
```



[P5227 [AHOI2013\] 连通图](https://www.luogu.com.cn/problem/P5227)

判定联通等价于任意连通块 $size=n$，并查集维护即可

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
#define vec vector<node>
using namespace std;

const int N=4e5+10;
int n,m,k,u,v;
int p[N],sz[N],ans[N];
struct node{int x,y;}ed[N];
vector<node> oper[N<<1];
vector<int> s[N];

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

int find(int x){return (p[x]^x)?find(p[x]):x;}
void del(node &v){sz[v.y]-=sz[v.x],p[v.x]=v.x;}
void merge(int x,int y,vec &now)
{
    x=find(x),y=find(y);
    if(!(x^y)) return;
    if(sz[x]>sz[y]) swap(x,y);
    sz[y]+=sz[x],p[x]=y;
    now.pb({x,y});
}

void modify(int vl,int vr,int ql,int qr,int idx,node v)
{
    if(ql<=vl && qr>=vr) return void(oper[idx].pb(v));
    int mid=(vl+vr)>>1;
    if(ql<=mid) modify(vl,mid,ql,qr,idx<<1,v);
    if(qr>mid) modify(mid+1,vr,ql,qr,idx<<1|1,v);
}

void query(int vl,int vr,int idx)
{
    vec now(0);
    for(node &v:oper[idx]) merge(v.x,v.y,now);
    int mid=(vl+vr)>>1;
    if(vl^vr) query(vl,mid,idx<<1),query(mid+1,vr,idx<<1|1);
    else ans[vl]=(sz[find(1)]==n);
    while(now.size()) del(now.back()),now.pop_back();
}

int main()
{
    n=fr(),m=fr();
    for(int i=1;i<=m;i++)
        ed[i].x=fr(),ed[i].y=fr(),s[i].pb(0);
    for(int i=1;i<=n;i++) sz[i]=1,p[i]=i;

    k=fr();
    for(int i=1;i<=k;i++)
        for(int cnt=fr();cnt;cnt--)
            s[fr()].pb(i);
    
    for(int i=1;i<=m;i++)
    {
        s[i].pb(k+1);
        for(int j=1;j<(int)s[i].size();j++)
            if(s[i][j-1]+1<=s[i][j]-1)
                modify(1,k,s[i][j-1]+1,s[i][j]-1,1,ed[i]);
    }
    
    query(1,k,1);
    for(int i=1;i<=k;i++)
        puts(ans[i]?"Connected":"Disconnected");
    return 0;
}
```

