---
title: Luogu Simu7 T4
date: 2023-10-24 22:48:32
tags:
- 莫队
- 思维
- 博弈论
categories:
- problem
password: Violet Evergarden
mathjax: true
---

### 题目描述

给定一个长度为 $n$ 的数组，其中第 $i$ 个数字记为 $a_i$。

沃若和扶苏会轮流进行操作，到某人的回合时，她要从当前的数组中选择**一个或多个**相等的元素，将它们从数组中删除。

由于是沃若出的题，所以沃若会先手进行操作。率先将数组中所有数字全部删除的人取得胜利。

这个题目过于简单，所以本题会进行多组询问 $(l, r)$：如果游戏仅在 $a_{l \sim r}$ 上进行，沃若在第一回合中，有多少种操作方案保证自己必胜呢？这个数字可能很大，你只需要输出**答案对 $998,244,353$ 取模**的值。

两方案被认为不同，当且仅当存在某个下标，此处的元素在一种方案中被删除，在另一种中未被删除。

**每组询问独立，即你可以认为每次询问后都会将数组恢复原样。**

### 输入格式

第一行两个正整数 $n$ 和 $q$。

第二行 $n$ 个空格分隔的正整数 $a_i$。

接下来 $q$ 行，每行两个正整数 $l$ 和 $r$，表示一组询问。

### 输出格式

对于每组询问，依次输出一行一个整数，表示答案。

#### 样例 #1

```
8 4
1 3 1 4 1 3 1 4
1 3
1 7
2 6
4 5
```

```
2
4
1
0
```

### 提示

#### 样例解释 1

对于第一组询问，有两种操作方案：

- 取走第 $1$ 个元素
- 取走第 $3$ 个元素

对于第二组询问，有四种操作方案：

- 取走第 $1$ 个元素
- 取走第 $3$ 个元素
- 取走第 $5$ 个元素
- 取走第 $7$ 个元素

对于第三组询问，有一种操作方案：

- 取走第 $4$ 个元素

对于第四组询问，不存在操作方案。

#### 数据范围与约定

- 对于 $12 \%$ 的测试数据，有 $1 \leq n \leq 20$。
- 对于另外 $16 \%$ 的测试数据，有 $1 \leq n, q \leq 100$，$1 \leq a_i \leq 5 \cdot 10^5$。
- 对于另外 $24 \%$ 的测试数据，有 $1 \leq n, q \leq 1,000$，$1 \leq a_i \leq 5 \cdot 10^5$。
- 对于 $100 \%$ 的测试数据，有 $1 \leq n, q \leq 10^5$，$1 \leq a_i \leq 10^9$，$1 \leq l \leq r \leq n$。

------

所有相同的数可以看做一堆石子，转化为 Nim 游戏

先手必胜当且仅当 $\oplus a_i \not = 0$，并且通过一步操作变成 $\oplus a_i=0$

我们考虑取第 $k$ 堆石子，令 $s=\oplus a_i$，则 $a_k \to s\,\oplus\,a_k$，即可

等价于求 $\Sigma_{k=1}^{cnt} { {a_k} \choose {a_k \oplus s} }\,[a_k\oplus s \lt s]$

考虑考虑与数的种类无关只与个数有关，直接维护区间个数的桶，不超过 $\sqrt n$ 个

证明：第 $i$ 种数 $i$ 个，这样是最大化个数的种类，最多 $1+2+\cdots+k \leq n$，则 $k \leq \sqrt n$

区间移动，这就是经典莫队维护

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=4e5+10,Q=998244353;
int n,m,l,r,len,s;
int a[N],fac[N],nf[N],ans[N],c[N],t[N],cnt[N];
unordered_map<int,int> id;
unordered_set<int> vis;
struct Query{
    int l,r,id;
    bool operator<(const Query &T)const{
        return c[l]!=c[T.l]?c[l]<c[T.l]:(c[l]&1?r<T.r:r>T.r);
    }
}q[N];

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
void mod(int &x,int y){if((x+=y)>=Q) x-=Q;}

int qkw(int a,int k)
{
	int ans=1,base=a;
	while(k)
	{
		if(k&1) ans=ans*base%Q;
		base=base*base%Q;
		k>>=1;
	}
	return ans;
}

void prework(int n)
{
	fac[0]=nf[0]=1;
	for(int i=1;i<=n;i++) fac[i]=fac[i-1]*i%Q;
	nf[n]=qkw(fac[n],Q-2);
	for(int i=n-1;i;i--) nf[i]=nf[i+1]*(i+1)%Q;
}

int C(int a,int b)
{
	if(a<b) return 0;
	return fac[a]*nf[b]%Q*nf[a-b]%Q;
}

void add(int x)
{
	s^=t[x];
	if(!cnt[t[x]+1]) vis.insert(t[x]+1);
	cnt[t[x]+1]++;
	if(cnt[t[x]]==1) vis.erase(t[x]);
	cnt[t[x]]--;
	t[x]++;
	s^=t[x];
}

void del(int x)
{
	s^=t[x];
	if(t[x]==1)
	{
		if(cnt[1]==1) vis.erase(1);
		cnt[1]--;
		t[x]--;
		return;
	}
	if(!cnt[t[x]-1]) vis.insert(t[x]-1);
	cnt[t[x]-1]++;
	if(cnt[t[x]]==1) vis.erase(t[x]);
	cnt[t[x]]--;
	t[x]--;
	s^=t[x];
}

int calc()
{
	int res=0;
	for(auto v:vis)
		if(v>(s^v))
			if(v) mod(res,C(v,s^v)*cnt[v]%Q);
	return res;
}

signed main()
{
	prework(N-10);
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
	{
		a[i]=fr();
		if(!id.count(a[i]))
			id[a[i]]=id.size()+1;
		a[i]=id[a[i]];
	}
	for(int i=1;i<=m;i++)
		q[i]={fr(),fr(),i};
	len=sqrt(1.0*n);
	for(int i=1;i<=n;i++)
		c[i]=(i-1)/len+1;
	sort(q+1,q+1+m);
	int j=1,i=0;
	for(int k=1;k<=m;k++)
	{
		int l=q[k].l,r=q[k].r;
		while(i<r) add(a[++i]);
         while(j>l) add(a[--j]);
		while(i>r) del(a[i--]);
		while(j<l) del(a[j++]);
		ans[q[k].id]=calc();
	}
	for(int i=1;i<=m;i++)
		fw(ans[i]),nl;
	return 0;
}
```

