---
title: Luogu Simu5 T4
date: 2023-10-03 22:47:05
tags:
- 根号分治
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目描述

给定一个长度为 $n$ 的数列 $a$。

有 $m$ 次询问，每次给出 $x$ 和 $y$。你要把数列划分成非空的两段（一个非空前缀和一个非空后缀），使得『$x$ 在前缀中出现的次数 $\times y$ 在后缀中出现的次数』最大。

形式化地，定义：

- $A(p, x)$：$[1, p]$ 这个前缀里 $x$ 的出现次数。
- $B(p, x)$：$[p, n]$ 这个后缀里 $x$ 的出现次数。

对于一组询问，你要找到一个 $p \in [2, n]$，最大化 $A(p - 1, x) \times B(p, y)$。

### 输入格式

第一行是两个整数，表示数列长度 $n$ 和询问次数 $m$。

第二行有 $n$ 个整数，依次表示 $a_1, a_2, \cdots, a_n$。

接下来 $m$ 行，每行两个整数 $x, y$ 表示一次询问。

### 输出格式

对每组询问，输出一行一个整数表示 $A(p - 1, x) \times B(p, y)$ 的最大值。

### 样例 #1

```
5 3
1 2 3 2 1
1 2
2 2
1 2
```

```
2
1
2
```

### 提示

### 数据规模与约定

- 对 $20\%$ 的数据，$n, m \leq 100$。
- 对 $40\%$ 的数据，$n, m \leq 1,000$。
- 另有 $20\%$ 的数据，数列中每个数字的出现次数不超过 $100$。
- 另有 $20\%$ 的数据，数列中的不同数字数量不超过 $100$。
- 对 $100\%$ 的数据，$2 \leq n \leq 10^5$，$1 \leq m \leq 10^5$，$1 \leq a_i, x, y \leq 10^9$。

------

考虑暴力 $O(nm)$

对于每个数字出现次数不超过 $100$，我们可以考虑所有询问一起处理

具体来说，我们初始 $p=1$，离散化之后用桶统计一下数

考虑到移动指针 $p$ 只会影响 $a_p$ 所以只用修改 $(x=a_p\,or\,y=a_p)$ 的询问 $(x,y)$

每个询问被修改的次数是 $O(cnt_x+cnt_y)$，均摊 $O(100m)$

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=4e5+10;
int n,m,x,y,len;
int a[N],b[N],t1[N],t2[N],ans[N];
struct node{int x,y;}q[N];
vector<int> L[N],R[N];

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

void update(int x)
{
	for(auto id:L[x])
		ans[id]=max(ans[id],t1[q[id].x]*t2[q[id].y]);
	for(auto id:R[x])
		ans[id]=max(ans[id],t1[q[id].x]*t2[q[id].y]);
}

void solve()
{
	for(int i=1;i<=n;i++) a[i]=fr();
	for(int i=1;i<=m;i++)
	{
		x=fr(),y=fr();
		int cnt1=0,cnt2=0,res=0;
		for(int j=2;j<=n;j++)
			if(a[j]==y) cnt2++;
		if(a[1]==x) cnt1++;
		res=max(res,cnt1*cnt2);
		for(int j=2;j<=n;j++)
		{
			if(a[j]==x) cnt1++;
			if(a[j]==y) cnt2--;
			res=max(res,cnt1*cnt2);
		}
		fw(res),nl;
	}
	exit(0);
}

signed main()
{
	n=fr(),m=fr();
	if(n*m<=1e7) solve();
	for(int i=1;i<=n;i++) b[++len]=a[i]=fr();
	for(int i=1;i<=m;i++)
	{
		b[++len]=x=fr(),b[++len]=y=fr();
		q[i]={x,y};
	}
	
	sort(b+1,b+1+len);
	len=unique(b+1,b+1+len)-b-1;
	
	for(int i=1;i<=n;i++)
		a[i]=lower_bound(b+1,b+1+len,a[i])-b;
	for(int i=1;i<=m;i++)
	{
		q[i].x=lower_bound(b+1,b+1+len,q[i].x)-b;
		q[i].y=lower_bound(b+1,b+1+len,q[i].y)-b;
		L[q[i].x].pb(i),R[q[i].y].pb(i);
	}
	
	for(int i=2;i<=n;i++) t2[a[i]]++;
	t1[a[1]]++;
	update(a[1]);
	
	for(int i=2;i<=n;i++)
	{
		t1[a[i]]++;
		t2[a[i]]--;
		update(a[i]);
	}
	
	for(int i=1;i<=m;i++)
		fw(ans[i]),nl;

	return 0;
}
```

------

考虑子任务：出现的数字不超过 $100$ 个

因为前后缀一定切分在 $y$ 处，所以对于一个 $x$ ，只需要扫一遍数列就可以求出它和所有的 $y$ 的答案

枚举每个前后缀切分法，顺手维护每个数在后缀里出现的次数。对于一个位置 $p$ ，只需要尝试更新查询 $\left(x, a_p\right)$ 的答案

对每个数字预处理它作为 $x$ 时和其他所有数字的答案，一共只需要 $100 n$ 的时间，每个询问就可以 $O(1)$ 查询了

------

合并两个子任务，考虑到是两个独立的问题，并且都需要降到一定规模，且总和一定

考虑根号分治

出现次数超过 $\sqrt{n}$ 的数只有 $\sqrt{n}$ 个，预处理这些所有数字作为 $x$ 和 $y$ 时和其它所有数字的答案，如果查询里有一 个数的出现次数大于 $\sqrt{n}$ 就直接查询预处理的答案

具体来说，我们给每个 $sz\geq \sqrt n$ 的颜色一个编号，然后枚举前缀状态和后缀状态计算，存在 $f$ 和 $g$ 数组里面

剩下的询问的数字出现次数都不超过 $\sqrt{n}$ ，暴力枚举这些位置作为 $p$ 的取值时尝试更新查询答案即可，只有 $O(\sqrt{n})$ 次枚举单次询问

具体来说，我们把位置存在一个 $vec$ 里面，维护一个前缀和后缀状态，每次加入 $(x,y)$ 中 $pos$ 较小的那个然后算答案，初始前缀为空，后缀为整段序列

预处理答案 $O(n \sqrt n)$ ，查询单次不超过 $O(\sqrt{n})$ ，所以总复杂度 $O((n+q) \sqrt{n})$ 

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10,B=320;
int n,m,x,y,len,idx;
int a[N],b[N],t[N],cnt[N],id[N];
int f[B+5][N],g[B+5][N];
unordered_map<int,int> vis;
vector<int> pos[N];

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

void prework()
{
	for(int i=1;i<=len;i++)
	{
		if(t[i]>=B)
		{
			id[i]=++idx;
			for(int j=1;j<=n;j++) cnt[j]=t[j];
			for(int j=1,x=0;j<=n;j++)
			{
				f[idx][a[j]]=max(f[idx][a[j]],x*cnt[a[j]]); //这两句话顺序不能变，因为 p \in [2,n] 换了就会把 1 放进去
				cnt[a[j]]--,x+=(a[j]==i);
			}
			for(int j=1;j<=n;j++) cnt[j]=t[j];
			for(int j=n,x=0;j;j--)
			{
				g[idx][a[j]]=max(g[idx][a[j]],x*cnt[a[j]]);
				cnt[a[j]]--,x+=(a[j]==i);
			}
		}
	}
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
		b[++len]=a[i]=fr();
	
	sort(b+1,b+1+len);
	len=unique(b+1,b+1+len)-b-1;
	for(int i=1;i<=n;i++)
	{
		int x=a[i];
		a[i]=lower_bound(b+1,b+1+len,a[i])-b;
		t[a[i]]++,vis[x]=a[i],pos[a[i]].pb(i);
	}
	prework();
	
	while(m--)
	{
		x=fr(),y=fr();
		if(!vis.count(x) || !vis.count(y)) {puts("0");continue;}
		x=vis[x],y=vis[y];
		if(t[x]>=B) fw(f[id[x]][y]),nl;
		else if(t[y]>=B) fw(g[id[y]][x]),nl;
		else
		{
			int sx=0,sy=pos[y].size(),ans=0;
			auto ix=pos[x].begin(),iy=pos[y].begin();
			while(ix!=pos[x].end() && iy!=pos[y].end())
			{
				if(*ix<*iy) ++sx,++ix;
				else --sy,++iy;
			    ans=max(ans,sx*sy);
			}
			fw(ans),nl;
		}
	}

	return 0;
}
```

