---
title: Luogu Simu4 T1
date: 2023-10-01 17:12:06
tags:
- 线性 Dp
- 平衡树
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目描述

我们称一个长度为 $k$ 的序列 $c$ 是好的，当且仅当对任意正整数 $i$ 在 $[1,k-1]$ 中，满足 $c_{i+1}>b_i \times c_i$，$b$ 序列在下文描述。

胡子叔叔现在给你两个序列 $a,b$，你需要从 $a$ 序列中找出一个最长的子序列 $c$，使得 $c$ 是好的。

输出这个最长的子序列的长度即可。

### 输入格式

第一行一个数 $n$，表示序列的长度。

接下来一行 $n$ 个数表示序列 $a$。

接下来一行 $n$ 个数表示序列 $b$。

### 输出格式

一行一个数，表示最长的好的子序列的长度。

```
4
1 2 3 10
2 3 4 5
```

```
3
```

### 提示

### 样例解释

$\{1,3,10\}$ 是好的序列，因为 $3>2\times 1,10>3\times 3$。

### 数据范围

对于 $25\%$ 的数据，满足 $n\le 100$。

对于另外 $25\%$ 的数据，满足 $n\le 1000$。

对于另外 $5\%$ 的数据，满足 $b_i=i+1$。

对于另外 $10\%$ 的数据，满足 $b_i>1$。

对于另外 $15\%$ 的数据，满足 $b_i=1$。

对于 $100\%$ 的数据，满足 $1\le n\le 10^6$，$1\le a_i\le 10^{12}$，$1\le b_i\le 10^6$。

------

## Sol 1

设 $f_i$ 表示以 $i$ 结尾的最长好的序列的长度

$$
f_i =\max_{j=1}^{i-1} f_j+1\,[a_i \gt a_j \times b_{f_j}]
$$
考虑到答案序列一定可以这样被枚举出来，这么做是对的

我们现在需要支持的就是

1. 求一段值域的点的某个属性最值
2. 在某一段值域内加入某个点

显然可以平衡树做

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

const int N=2e6+10;
int n,fl;
int a[N],b[N],f[N];

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

namespace Tree
{
	int idx=0,rt=0;
	struct node{
	    int ls,rs;
	    int val,heap;
	    int s,f,g;
	}tr[N];
	
	void chf(int now)
	{
		node &t=tr[now],&ls=tr[tr[now].ls],&rs=tr[tr[now].rs];
		t.s=ls.s+rs.s+1;
		t.g=max({ls.g,rs.g,t.f});
	}
	int add(int x,int f) {tr[++idx]={0,0,x,rand(),1,f,f};return idx;}
	
	void split(int now,int x,int &l,int &r)
	{
	    if(!now)
	    {
	        l=r=0;
	        return;
	    }
	    if(tr[now].val<=x)
	    {
	        l=now;
	        split(tr[now].rs,x,tr[now].rs,r);
	    }
	    else
	    {
	        r=now;
	        split(tr[now].ls,x,l,tr[now].ls);
	    }
	    chf(now);
	}
	
	int merge(int l,int r)
	{
	    if(!l || !r) return l+r;
	    if(tr[l].heap>tr[r].heap)
	    {
	        tr[l].rs=merge(tr[l].rs,r);
	        chf(l);
	        return l;
	    }
	    else
	    {
	        tr[r].ls=merge(l,tr[r].ls);
	        chf(r);
	        return r;
	    }
	}
	
	int l,r,mid;
	void ins(int val,int f)
	{
	    split(rt,val,l,r);
	    rt=merge(merge(l,add(val,f)),r);
	}
	
	int query(int x)
	{
		split(rt,x,l,r);
		int ans=tr[l].g;
		rt=merge(l,r);
		return ans;
	}
}

using namespace Tree;

namespace Solve
{	
	void solve()
	{
		int ans=0;
		for(int i=1;i<=n;i++)
		{
			f[i]=query(a[i]-1)+1;
			ans=max(ans,f[i]);
			ins(a[i]*b[f[i]],f[i]);
		}
		fw(ans);
	}
	
	void work()
	{
		vector<int> g(0);
		for(int i=1;i<=n;i++)
		{
			int pos=lower_bound(g.begin(),g.end(),a[i])-g.begin(); //找到位置
	        if(!g.size() || a[i]>g.back()) g.push_back(a[i]); //栈空或满足条件
	        else g[pos]=a[i]; //贪心
		}
		fw(g.size());
	}
}

using namespace Solve;

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	for(int i=1;i<=n;i++) b[i]=fr(),fl|=(b[i]>1);
	if(!fl) work();
	else solve();
	
	return 0;
}
```

------

## Sol 2

设 $f_{i,j}$ 表示考虑前 $i$ 个数，好序列长度为 $j$ 的最小结尾

暴力是 $O(n^2)$ 的

$f_{i,j} =\min(f_{i-1,j},a_i\,[f_{i-1,j-1}\times b_{j-1} \lt a_i])$

考虑性质：有一个分界点 $k$，满足恰有 $f_{i-1,k} \leq a_i$

我们考虑 $j \in [1,k]$ 这个区间，显然不用更新，而 $j \in [k+2,n]$ 这个区间有 $f_{i-1,j-1}\times b_{j-1} \gt a_i$ 不能更新

所以我们只用更新 $k+1$ 这个位置即可

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N=1e6+5;
const ll inf=1e18;
int n;
ll a[N],b[N],f[N];

int main()
{
	scanf("%d",&n);
    fill_n(f+1,n,inf);
	for(int i=1;i<=n;i++) scanf("%lld",&a[i]);
	for(int i=1;i<=n;i++) scanf("%lld",&b[i]);
	for(int i=1;i<=n;i++){
		int x=upper_bound(f+1,f+n+1,a[i])-f-1;
		if(f[x]*b[x]<a[i]) f[x+1]=a[i];
	}
	for(int i=n;i;i--)
		if(f[i]!=inf) return printf("%d\n",i),0;
}
```

