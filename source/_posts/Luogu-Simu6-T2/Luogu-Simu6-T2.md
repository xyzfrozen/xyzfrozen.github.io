---
title: Luogu Simu6 T2
date: 2023-10-07 21:59:44
tags:
- 思维
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目背景

时间限制：2s

空间限制：512MB

## 题目描述

我们说一个 01 串是好的，当且仅当其能被写为 $(0^k)1(0^k)1\dots 1(0^k)$ 的形式，$k$ 是非负整数，且中间至少有一个 1。换句话说，其形如：“$k$ 个 $0$，一个 $1$”不停重复，最后以 $k$ 个 $0$ 结尾，且至少有一个 1。

给定一个 01 串，求其最长的好子序列。子序列的定义是删去若干个位置后得到的串。

### 输入格式

一行一个 01 串。

### 输出格式

第一行一个整数，表示答案长度。

第二行输出这个最长的好子序列。若有多个输出任意一个均可。

### 样例 #1

```
0100100000
```

```
7
0001000
```

### 样例 #2

```
0100101
```

```
5
01010
```

### 提示

### 样例 3

见下发文件。

### 数据范围

设 $len$ 为 01 串长度。

所有数据均满足 $1\le len\le 5\times 10^6$。保证 01 串中至少有一个 1。

测试点 $1$ 满足 $len\le 1$。

测试点 $2,3,4$ 满足 $len\le 50$。

测试点 $5,6,7$ 满足 $len\le 10^4$。

测试点 $8,9,10$ 满足 $len\le 10^5$ 且字符串中至多有 50 个 1。

测试点 $11,12,13$ 满足 $len\le 5\times 10^5$。

测试点 $14,15,16$ 无特殊限制。

测试点 $1\sim 4$ 每个测试点 7 分，测试点 $5\sim 10$ 每个测试点 8 分，测试点 $11\sim 16$ 每个测试点 4 分。

------

考虑 $O(n^3)$ 暴力，$f_{i,k}$ 表示考虑前 $i$ 个 $1$，$0$ 的系数为 $k$ 的最大长度

我们考虑优化这个过程，本质上是判断一个字符串 $(0)^k1(0)^k\ldots 1 (0)^k$ 是不是 $s$ 的子串

匹配子串是一个贪心的过程，让子串 $t$ 每个字符匹配 $s$ 的指针后第一个能匹配的字符，然后移动指针到该字符后

我们枚举 $k$，我们发现每个 $k$，最多匹配 $\frac nk$ 段，我们考虑 $O(1)$ 匹配每一段，这样做就是 $O(n\log n)$ 的

如何 $O(1)$ 匹配？

我们给每个 $0$ 一个编号，同时找到每一个 $0$ 在经过一个 $1$ 后的第一个 $0$，记为 $nxt_i$ 那么当前匹配到 $i$，下一段截止的 $0$ 就是 $nxt_i+k-1(\text{按 0 的编号})$

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e6+10;
int n,m,ans,res;
char s[N];
int a[N],nxt[N],id[N];

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
	scanf("%s",s+1);
	n=strlen(s+1);
	for(int i=1;i<=n;i++)
		a[i]=(s[i]=='1');
	for(int i=1;i<=n;i++)
		if(!a[i]) id[i]=++m;
	
	for(int i=n,lt=0;i;i--)
	{
		if(a[i])
		{
			int j=i-1;
			while(j && !a[j])
				nxt[id[j--]]=lt;
		}
		else lt=id[i];
	}
	
	ans=n-m;
	for(int k=1;k<=m;k++)
	{
		int p=k,q=0;
		while(1) //接下来匹配 q
		{
			if(!nxt[p]) break;
			p=nxt[p]+k-1;
			if(p>m) break;
			q++;
		}
		if(q && ans<q*(k+1)+k)
			ans=q*(k+1)+k,res=k;
	}
	
	fw(ans),nl;
	for(int i=1;i<=ans;i++)
	{
		if(!(i%(res+1))) putchar('1');
		else putchar('0');
	}
	return 0;
}
```

