---
title: Luogu Simu5 T1
date: 2023-10-03 22:46:35
tags:
- 思维
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目描述

沃若决定给扶苏一点小小的蠕虫病毒震撼！

具体来说，沃若手里有 $n$ 种蠕虫病毒，而扶苏的电脑中有 $m$ 张硬盘。第 $i$ 种蠕虫病毒可以让扶苏电脑中的第 $l_i$ 到第 $r_i$ 张硬盘均被攻击 $k_i$ 次。

现在，沃若将所有 $n$ 种病毒都通过粉兔网络传输到了扶苏的电脑中，即将发动攻击。就在这时，扶苏告诉沃若自己的电脑中存放着许多洛谷机密。为了大局着想，沃若决定放下私人恩怨，保护洛谷谷民。

但是病毒已经发出，即便是沃若也不能完全撤回攻击了。沃若只能选择**恰好 $1$ 种**蠕虫病毒让其失效自毁，而其余的蠕虫病毒仍然会攻击指定的硬盘。

对于每种蠕虫病毒，沃若想知道如果让其失效自毁，所有硬盘被攻击的最大次数。

### 输入格式

第一行为两个正整数 $n$ 和 $m$，表示蠕虫病毒的数量及硬盘的数量。

随后 $n$ 行，第 $i$ 行有三个正整数 $l_i, r_i, k_i$，描述了第 $i$ 种蠕虫病毒的效果。

### 输出格式

输出 $n$ 行，每行一个整数表示答案。

### 样例 #1

```
3 5
1 3 2
3 5 1
2 4 3
```

```
4
5
3
```

### 提示

对于 $20 \%$ 的测试数据，有 $1 \leq n, m \leq 10$。

对于 $40 \%$ 的测试数据，有 $1 \leq n, m \leq 5,000$。

对于 $60 \%$ 的测试数据，有 $1 \leq n, m \leq 10^5$。

对于 $100 \%$ 的测试数据，保证 $1 \leq n, m \leq 10^6$，$1 \leq l_i \leq r_i \leq m$，$1 \leq k_i \leq 1,000$。

------

线段树的做法显然

我们考虑 $O(n)$ 做法，考虑最大值的位置，设最大值第一次出现的位置为 $L$，最后一次出现的位置为 $R$，当前病毒 $\{l,r,k\}$

如果 $r \lt L \,or\,l \gt R$，答案仍是 $max$

如果区间有交，则 $[l,r]$ 区间的最大值一定是 $max-k$，我们只需要维护 $[1,l-1]\, \lor \,[r+1,n]$ 的最大值即可，可以预处理

这里用这个函数查最大值，很方便

```cpp
int mx=*max_element(a+1,a+1+m);
```

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int n,m,L,R;
int d[N],a[N],pre[N],suf[N];
struct Query{int l,r,k;}vir[N];

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

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
	{
		vir[i].l=fr(),vir[i].r=fr(),vir[i].k=fr();
		d[vir[i].l]+=vir[i].k;
		d[vir[i].r+1]-=vir[i].k;
	}
	
	for(int i=1;i<=m;i++)
		a[i]=a[i-1]+d[i];
	for(int i=1;i<=n;i++)
		pre[i]=max(pre[i-1],a[i]);
	for(int i=n;i;i--)
		suf[i]=max(suf[i+1],a[i]);
	
	L=1,R=m;
	int mx=*max_element(a+1,a+1+m);
	while(a[L]!=mx) L++;
	while(a[R]!=mx) R--;
	
	for(int i=1;i<=n;i++)
	{
		int l=vir[i].l,r=vir[i].r;
		if(r<L || l>R) fw(mx),nl;
		else fw(max({mx-vir[i].k,pre[l-1],suf[r+1]})),nl;
	}

	return 0;
}
```

