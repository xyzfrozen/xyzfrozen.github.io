---
title: cdq 分治
date: 2023-09-30 00:03:02
tags:
- 分治
- 归并排序
- 偏序
categories:
- note
password: Violet Evergarden
mathjax: true
---

# Introduction

分而治之，将原问题不断划分成若干个子问题，直到子问题规模小到足以直接解决

子问题间互相独立且原问题形式相同，递归求解这些子问题，然后将各子问题的解合并得到原问题的解

1. 解决和点对有关的问题（类似偏序）

2. 将一些动态问题转化为静态问题

解决点对问题一般将点按 $x$ 排序，消去第一维影响，然后分治解决第二层

先递归做子区间/矩形的贡献，然后再 $merge$

$merge$ 只计算左边的操作对右边的询问的贡献！！

基础二维偏序

给定一个 $N$ 个元素的序列 $a$ ，初始值全部为 0 ，对这个序列进行以下两种操作

操作 $1$：格式 $1\;x\;k$ ，把位置 $\mathrm{x}$ 的元素加上 $k$

操作 $2$：格式为 $2\;x\;y$ ，求出区间 $[x,y]$ 内所有元素的和

这是一个经典的树状数组问题，用 $cdq$ 分治解决它一带修改和询问的问题

我们把它转化成一个二维偏序问题，每个操作用一个有序对 $(a, b)$ 表示，其中 $a$ 表示操作的时间，$b$ 表示操作的位置，时间是默认有序的，所以我们在合并子问题的过程中，就按照 $b$ 从小从到大的顺序合并

首先我们把原数列和 $1$ 操作都看作是修改操作

对于询问操作 $[l,r]$，我们拆成两个: $l-1$ 和 $r$

按照时间顺序进行修改，记录前缀和，当遇到 $l-1$ 的标记时，我们减去 $S(l-1)$，遇到 $r$ 标记时，询问的处理就完成了

```cpp
#include<cstdio>
#include<cstring>
#include<iostream>
#define ll long long

using namespace std;

const int N=5000010;
int n,m,totx=0,tot=0;     //totx是操作的个数,tot询问的编号 

struct node{
    int type,id;
    ll val;
    bool operator < (const node &a) const   //重载运算符,优先时间排序 
    {
        if (id!=a.id) return id<a.id;
        else return type<a.type;
    }
};
node A[N],B[N];
ll ans[N];

void solve(int L,int R)
{
    if (L==R) return;
    int M=(L+R)>>1;
    solve(L,M);
    solve(M+1,R);
    int t1=L,t2=M+1;
    ll sum=0; 
    for (int i=L;i<=R;i++)
    {
        if ((t1<=M&&A[t1]<A[t2])||t2>R) //只修改左边区间内的修改值
        {
            if (A[t1].type==1) sum+=A[t1].val;   //sum是修改的总值
            B[i]=A[t1++]; 
        }
        else                         //只统计右边区间内的查询结果
        {
            if (A[t2].type==3) ans[A[t2].val]+=sum;
            else if (A[t2].type==2) ans[A[t2].val]-=sum;
            B[i]=A[t2++];
        }
    }
    for (int i=L;i<=R;i++) A[i]=B[i];
}

int main()
{
    scanf("%d%d",&n,&m);
    for (int i=1;i<=n;i++)
    {
        tot++;
        A[tot].type=1; A[tot].id=i;            //修改操作 
        scanf("%lld",&A[tot].val);
    }
    for (int i=1;i<=m;i++)
    {
        int t;
        scanf("%d",&t);
        tot++;
        A[tot].type=t; 
        if (t==1)
            scanf("%d%lld",&A[tot].id,&A[tot].val);
        else
        {
            int l,r;
            scanf("%d%d",&l,&r);
            totx++; 
            A[tot].val=totx; A[tot].id=l-1;    //询问的前一个位置 
            tot++; A[tot].type=3; A[tot].val=totx; A[tot].id=r;  //询问的后端点 
        }
    }
    solve(1,tot);
    for (int i=1;i<=totx;i++) printf("%lld\n",ans[i]);
    return 0;
}

```



# Problem

[模板题(陌上花开)](https://www.luogu.com.cn/problem/P3810)

先考虑没有相同点的情况，我们按照 $a$ 排序，然后做 `cdq`

每一层内部按 $b$ 排序，然后双指针算贡献，每次移动右端点，加入合法左端点，树状数组上加入 $l.c$，统计 $s(r.c)$

注意这里每一层用 `inplace_merge()` 排序之后每个点的编号会变，所以我们不能用 `f_i` 代表每个点的答案，要绑在点上，记一个 `dot.ans`

考虑有相同的点的情况，我们认为是这一个点有点权，每个点的贡献是相同的，同时 $dot_i.ans$ 多了 $dot_i.cnt-1$ 

即 $f(dot_i.ans) \leftarrow 1 \rightarrow f(dot_i.ans+dot_i.cnt-1) \leftarrow dot_i.cnt$

$O(n\log n\log k)$ 

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,k,cnt;
int s[N],ans[N],f[N];
struct node{
	int a,b,c,cnt,ans;
}dot[N];
bool operator==(const node &a,const node &b){
	return a.a==b.a && a.b==b.b && a.c==b.c;
}

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

void add(int i,int x){for(;i<=k;i+=i&(-i)) s[i]+=x;}
int query(int i,int res=0){for(;i;i-=i&(-i)) res+=s[i];return res;}

void solve(int l,int r)
{
	if(l>=r) return;
	int mid=(l+r)>>1;
	solve(l,mid),solve(mid+1,r);
	
	int j=l;
	for(int i=mid+1;i<=r;i++)
	{
		while(j<=mid && dot[j].b<=dot[i].b) add(dot[j].c,dot[j].cnt),j++;
		dot[i].ans+=query(dot[i].c);
	}
	
	for(int i=l;i<=j-1;i++)
		add(dot[i].c,-dot[i].cnt);
	
	auto tmp=[](const node &a,const node &b){return a.b==b.b?a.c<b.c:a.b<b.b;};
	inplace_merge(dot+l,dot+mid+1,dot+r+1,tmp);
}

int main()
{
	n=fr(),k=fr();
	for(int i=1;i<=n;i++)
		dot[i]={fr(),fr(),fr(),1,0};
	auto tmp=[](const node &a,const node&b){return (a.a==b.a)?((a.b==b.b)?a.c<b.c:a.b<b.b):a.a<b.a;};
	sort(dot+1,dot+1+n,tmp);
	for(int i=1;i<n;i++)
		if(dot[i]==dot[i+1])
			dot[i].a=0,dot[i+1].cnt+=dot[i].cnt;
	for(int i=1;i<=n;i++)
		if(dot[i].a) dot[++cnt]=dot[i];
	
	solve(1,cnt);
	for(int i=1;i<=cnt;i++) ans[dot[i].ans+dot[i].cnt-1]+=dot[i].cnt;
	for(int i=0;i<n;i++) fw(ans[i]),nl;
	return 0;
}
```

------

**P7883 平面最近点对（加强加强版）**

首先按 $x$ 排序

我们可以接受 $O(n\log n)$ 的复杂度

考虑分治算，按 $x$ 作为 $mid$ 递归处理

设 $solve(l,r)$ 表示处理 $[l,r]$ 内的点的点对最小距离

我们已知 $[l,mid]$ 和 $[mid+1,r]$ 的答案，我们现在只用考虑跨过 $mid$ 的点对

设 $[l,mid]$ 和 $[mid+1,r]$ 答案较小值为 $k$

我们只用管 $fabs(x-mid) \leq \sqrt k$ 的点

这个时候我们再按 $y$ 排序，每次找出左边哪些点可能成为线段左端点和右边的可能点

按照 $cdq$ 分治的套路，枚举左点看它对哪些右点有贡献

这样做看似 $O(n^2)$ 但是如果两个点的 $y$ 值差 $\gt k$ 也不可能成为答案

这样的点只可能有 $6$ 个见下图，所以是线性的，双指针做一下即可

注意判断两点重合的情况，输入判断即可

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010104401.png)

注：要开方一个小 $trick$ 最后再开方

注意 $x$ 恰好在中线的情况，这种直接暴力左边右边都加，然后后面算距离的时候判断是否相等即可，这样写还要在输入的时候判断下有没有重合的点

inplace_merge 函数 http://c.biancheng.net/view/7485.html

```cpp
const int N=4e5+10;
int n,inf=1e18;
struct node{
	int x,y;
	bool operator<(const node&Q)const{
		return (x==Q.x)?(y<Q.y):(x<Q.x);
	}
	bool operator!=(const node&Q)const{
		return (x!=Q.x || y!=Q.y);
	}
}dot[N],ans[N],lq[N],rq[N];

int sqr(int x){return x*x;}
int d(node a,node b){return (a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y);}

void merge(int l,int r)
{
	int x=(l+r)>>1;
	int k=0,i=l,j=x+1;
    while(i<=x && j<=r)
    {
        if(dot[i].y<=dot[j].y) ans[k++]=dot[i++];
        else ans[k++]=dot[j++];
    }
    while(i<=x) ans[k++]=dot[i++];
    while(j<=r) ans[k++]=dot[j++];
    for(int i=l,j=0;i<=r;i++,j++) dot[i]=ans[j];
}

int solve(int l,int r)
{
	if(l>=r) return inf;
	if(l+1==r)
	{
		if(dot[l].y>dot[r].y) swap(dot[l],dot[r]);
		return d(dot[l],dot[r]);
	}
	int mid=(l+r)>>1,line=dot[mid].x;
	int k=min(solve(l,mid),solve(mid+1,r)),res=k,s=sqrt(k)+1;
	merge(l,r);
	
	int lf=0,rt=0;
	for(int i=l;i<=r;i++)
	{
		if(dot[i].x==line) lq[++lf]=dot[i],rq[++rt]=dot[i];
		else if(dot[i].x<line && sqr(dot[i].x-line)<k) lq[++lf]=dot[i];
		else if(dot[i].x>line && sqr(dot[i].x-line)<k) rq[++rt]=dot[i];
	}
	
	for(int i=1,j=1;i<=lf && j<=rt;i++)
	{
		while(rq[j].y<lq[i].y-s && j<=rt) j++;
		for(int t=j;rq[t].y<=lq[i].y+s && t<=rt;t++)
			if(lq[i]!=rq[t]) res=min(res,d(lq[i],rq[t]));
	}
	return res;
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) dot[i].x=fr(),dot[i].y=fr();
	sort(dot+1,dot+1+n);
	for(int i=1;i<n;i++)
		if(dot[i].x==dot[i+1].x && dot[i].y==dot[i+1].y) {puts("0");return 0;}
	fw(solve(1,n));

	return 0;
}
```

------------

**#2880. 「JOISC 2014 Day3」稻草人**

平面点对，考虑 $cdq$ 分治维护二维偏序，首先按 $x$ 排序，考虑 $merge$ 过程

我们考虑固定当前左下角，右上角的取值变化，假设取值序列为 $P$

则一定满足 $P:x_{i+1} \gt x_i and y_{i+1} \lt y_i$，类似一个递减序列，单调栈维护

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010104029.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010105531.png)

如上图， $D$ 会使 $E$ 失去贡献，对 $B$ 我们在右侧单调栈上的贡献是 $A$ 下面的点，但是 $B$ 并不影响 $C$，这启示我们对左侧也单调栈维护，第一个在它右上角的点，左上角的点不管

这个上界二分，每次加入左侧点前，先加入右侧比它高的点，维护 $y$ 这一维的偏序，动态维护下界，比如 $B$ 我们就二分右侧单调栈上第一个 $y\lt A.y$ 的值，这些就是它合法的右上角

注意使用归并排序时，一定要把还没加入 $ans$ 的 $dot$ 强行加入

```cpp
const int N=2e5+10;
int n,res;
int ak1[N],ak2[N];
struct node{
	int x,y;
	bool operator<(const node&Q)const{
		return x<Q.x;
	}
}dot[N],ans[N];

void solve(int l,int r)
{
	if(l>=r) return;
	int mid=(l+r)>>1;
	solve(l,mid),solve(mid+1,r);
	
	int top1=0,top2=0; //右侧/左侧
	int k=0,i=l,j=mid+1;
	
	while(i<=mid)
	{
		while(j<=r && dot[j].y>dot[i].y) //维护右侧单调栈
		{
			while(top1 && dot[ak1[top1]].x>dot[j].x) top1--;
			ak1[++top1]=j;
			ans[k++]=dot[j++]; //ans 维护 y 归并递减
		}
		
		while(top2 && dot[ak2[top2]].x<dot[i].x) top2--; //左侧
		
		if(!top2) res+=top1; 
		else //左侧存在限制
		{
			int p=dot[ak2[top2]].y; //上个限制
			if(dot[ak1[top1]].y<p)
			{
				int L=1,R=top1,g=top1+1;
				while(L<=R)
				{
					int M=(L+R)>>1;
					if(dot[ak1[M]].y>p) L=M+1;
					else R=M-1,g=M;
				}
				res+=top1-g+1;
			}
		}
		
		ak2[++top2]=i;
		ans[k++]=dot[i++];
	}

    while(j<=r) ans[k++]=dot[j++]; //强行加入！！！
    for(int i=l,j=0;i<=r;i++,j++) dot[i]=ans[j];
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) dot[i].x=fr(),dot[i].y=fr();
	sort(dot+1,dot+1+n);
	solve(1,n);
	fw(res);
	return 0;
}
```
