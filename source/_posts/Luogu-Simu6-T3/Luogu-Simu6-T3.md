---
title: Luogu Simu6 T3
date: 2023-10-07 22:00:11
tags:
- 线段树
- 树状数组
- 均摊分析
- 线段树二分
categories:
- problem
password: Violet Evergarden
mathjax: true
---

### 题目背景

时间限制：3s

空间限制：512MB

### 题目描述

有 $n$ 种松鼠，第 $i$ 种松鼠有 $b_i$ 只。初始时，第 $i$ 种松鼠栖息在数轴上坐标为 $a_i$ 的点上，保证 $a_i$ 是整数。

松鼠会经常移动。具体地，有下面三种可能的移动方式：

1. 给定 $l,r,x$：种类编号在 $[l,r]$ 的松鼠全部往数轴正方向移动 $x$ 单位。

2. 给定 $l,r$：种类编号在 $[l,r]$ 的松鼠全部移动到数轴上同一个**整点**。由于松鼠很聪明，所以这个整点一定是使得所有松鼠移动距离之和最小的整点。若有多个这样的整点，松鼠会选择坐标最小的。

	对于每个 2 操作，你需要输出移动到的整点的坐标。

3. 给定 $id,y$，种类为 $id$ 的松鼠坐标不变，但总数变成了 $y$ 只。

形式化地，你要支持对 $a,b$ 进行如下三种操作：

1. 给定 $l,r,x$：将 $a_l,a_{l+1},\dots,a_r$ 加上 $x$。
2. 给定 $l,r$：设整数 $x$ 满足 $\sum_{l\le i\le r}(b_i\times |a_i-x|)$ 是所有整数 $x$ 中最小的（若有多个则取最小的那个），将 $a_l,a_{l+1},\dots,a_r$ 全部改为 $x$。同时，请你输出 $x$。
3. 给定 $id,y$：将 $b_{id}$ 改为 $y$。

### 输入格式

第一行两个正整数 $n,q$。

接下来一行 $n$ 个整数 $a_1\sim a_n$。

接下来一行 $n$ 个整数 $b_1\sim b_n$。

接下来 $q$ 行，每行第一个整数为 $opt$。

- 若 $opt=1$，再输入三个整数 $l,r,x\ (1\le l\le r\le n)$ 表示操作 1。
- 若 $opt=2$，再输入两个整数 $l,r\ (1\le l\le r\le n)$ 表示操作 2。
- 若 $opt=3$，再输入两个整数 $id,y\ (1\le id\le n)$ 表示操作 3。

### 输出格式

对于每个 2 操作，按要求输出一行一个整数表示答案。

### 样例 #1

```
5 8
8 1 6 4 9
3 6 4 1 7
2 2 4
1 1 4 -8
2 1 1
2 1 3
2 4 5
1 2 5 6
3 3 5
2 1 4
```

```
1
0
-7
9
-1
```

### 提示

### 样例 2,3

见下发文件。

### 数据范围

所有数据均满足：$1\le n\le 5\times 10^5$，$1\le q\le 5\times 10^5$，$-10^8\le a_i,x\le 10^8$，$1\le b_i,y\le 10^8$。

| 测试点编号  |    $n\le $     |    $q\le $     |                 特殊性质                  | 分值 |
| :---------: | :------------: | :------------: | :---------------------------------------: | :--: |
|  $1\sim 5$  |      $15$      |      $15$      | $\vert a_i\vert,b_i,\vert x\vert,y\le 15$ | $5$  |
|    $6,7$    |     $10^3$     |     $10^3$     |                 $b_i=y=1$                 | $5$  |
|    $8,9$    |     $10^3$     |     $10^3$     |                    无                     | $5$  |
| $10,11,12$  |     $10^5$     |     $10^5$     |             2 操作不超过 5 次             | $5$  |
| $13,14,15$  | $2\times 10^5$ | $2\times 10^5$ |                    无                     | $5$  |
| $16\sim 20$ | $5\times 10^5$ | $5\times 10^5$ |                    无                     | $5$  |

------

结论：给定 $n$ 个点，坐标 $a_i$ 升序，点权 $b_i$，其带权中位数为第一个 $a_k [\Sigma_{i=1}^k b_k \geq \Sigma_{j=1}^n b_j]$

而最小化 $|b_ia_i-x|$ 就是 $x$ 取带权中位数

我们考虑线段树维护 $a_i$，树状数组维护 $b_i$

操作 $1,3$ 显然，对于操作 $2$，考虑类似 $ODT$ 的复杂度分析

考虑区间赋值复杂度均摊 $O(n)$，初始为 $n$ 个区间，操作区间数至多 $O(n+q)$ 个，复杂度为 $O((n+q)\log n)$

维护连续段就判断 $max(l,r)=min(l,r)$

注意线段树的 $assign$ 对 $add$ 操作的影响，当 $col\not = inf$ 时要加到 $col$ 上，否则加到 $tag$ 上

每次修改 $col$，都要清空 $tag$，儿子的也要清空

![image-20231007221041822](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310072210688.png)

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define fi first
#define se second
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e5+10;
int n,m,op,l,r,x,k,inf=1e18;
int a[N],b[N],s[N];
pi seg[N];
struct node{
	int l,r;
	int mxv,mnv;
	int tag,col;
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

void chf(int idx)
{
	node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
	t.mxv=max(ls.mxv,rs.mxv);
	t.mnv=min(ls.mnv,rs.mnv);
}

void chs(int idx)
{
	node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
	if(t.col!=inf)
	{
		ls.mxv=ls.mnv=ls.col=t.col;
		rs.mxv=rs.mnv=rs.col=t.col;
		ls.tag=rs.tag=0;
		t.col=inf;
	}
	if(t.tag)
	{
		ls.mxv+=t.tag,ls.mnv+=t.tag;
		rs.mxv+=t.tag,rs.mnv+=t.tag;
		if(ls.col!=inf) ls.col+=t.tag;
		else ls.tag+=t.tag;
		if(rs.col!=inf) rs.col+=t.tag;
		else rs.tag+=t.tag;
		t.tag=0;
	}
}

void build(int ql,int qr,int idx)
{
	node &t=tr[idx];
	t.l=ql,t.r=qr,t.col=inf;
	if(ql==qr)
	{
		t.mxv=t.mnv=a[ql];
		return;
	}
	int mid=(ql+qr)>>1;
	build(ql,mid,idx<<1);
	build(mid+1,qr,idx<<1|1);
	chf(idx);
}

void modify(int ql,int qr,int idx,int x,int op)
{
	node &t=tr[idx];
	if(ql<=t.l && qr>=t.r)
	{
		if(op&1)
		{
			if(t.col!=inf) t.col+=x;
			else t.tag+=x;
			t.mxv+=x,t.mnv+=x;
		}
		else
		{
			t.col=t.mxv=t.mnv=x;
			t.tag=0;
		}
		return;
	}
	
	chs(idx);
	int mid=(t.l+t.r)>>1;
	if(ql<=mid) modify(ql,qr,idx<<1,x,op);
	if(qr>mid) modify(ql,qr,idx<<1|1,x,op);
	chf(idx);
}

int get(int pos,int idx)
{
	node &t=tr[idx];
	if(t.l==t.r) return t.mxv;
	
	chs(idx);
	int mid=(t.l+t.r)>>1;
	if(pos<=mid) return get(pos,idx<<1);
	return get(pos,idx<<1|1);
}

int find(int ql,int qr,int idx,int x)
{
	node &t=tr[idx];
	if(t.r<ql) return inf;
	if(t.mxv==x && t.mnv==x) return inf; 
	if(t.l==t.r) return t.l;
	
	chs(idx);
	int res=find(ql,qr,idx<<1,x);
	if(res!=inf) return res;
	return find(ql,qr,idx<<1|1,x);
}

void add(int i,int x){for(;i<=n;i+=i&(-i)) s[i]+=x;}
int query(int i)
{
	int res=0;
	for(;i;i-=i&(-i)) res+=s[i];
	return res;
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	for(int i=1;i<=n;i++) b[i]=fr(),add(i,b[i]);
	
	build(1,n,1);
	while(m--)
	{
		op=fr();
		if(op==1)
		{
			l=fr(),r=fr(),x=fr();
			modify(l,r,1,x,1);
		}
		else if(op==2)
		{
			l=fr(),r=fr();
			k=query(r)-query(l-1);
			int now=l,cnt=0;
			while(now<=r)
			{
				int v=get(now,1);
				int nxt=min(r,find(now,n,1,v)-1);
				seg[++cnt]={v,query(nxt)-query(now-1)};
				now=nxt+1;
			}
			
			sort(seg+1,seg+1+cnt);
			for(int i=1,s=0;i<=cnt;i++)
			{
				s+=seg[i].se;
				if(s*2ll>=k)
				{
					fw(seg[i].fi),nl;
					modify(l,r,1,seg[i].fi,2);
					break;
				}
			}
		}
		else
		{
			l=fr(),x=fr();
			add(l,x-b[l]);
			b[l]=x;
		}
	}

	return 0;
}
```

