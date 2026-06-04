---
title: Luogu Simu5 T3
date: 2023-10-03 22:46:53
tags:
- 前缀和
- 线性 Dp
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目描述

又到了疯狂星期四！沃若和扶苏来到了肯德基，买了许多蛋挞。

沃若觉得简单地吃太没意思了，拉着扶苏来玩一个吃蛋挞游戏：

- 他们都有一个得分序列，初始为空
- 第 $1$ 轮吃的人会吃掉 $1$ 个蛋挞，随后每轮吃的人都要比上轮多吃 $1$ 个蛋挞
- 双方可以随时抢吃，但只有一个人吃完了本轮才能进行下一轮，同一个人**可以**连续多轮抢吃
- 每当一个人吃完了本轮的蛋挞，就将本轮吃的蛋挞数量加入自己的得分序列末尾
- 游戏可以在任何一轮吃完后结束，但至少进行 $1$ 轮

例如，一种可能的最终得分序列是：

- 沃若：$[1, 3, 4]$
- 扶苏：$[2, 5]$

在这个例子中，沃若抢吃了第 $1$ 轮，随后扶苏抢吃了第 $2$ 轮，第 $3, 4$ 轮均被沃若抢得，最终扶苏又抢吃第 $5$ 轮。

已知沃若和扶苏分别可以吃下不超过 $n, m$ 个蛋挞，请问最终可能的得分序列有多少种情况。两种情况视为不同，当且仅当沃若的得分序列不同**或**扶苏的得分序列不同。

由于答案可能很大，你只需要输出**答案对 $10^9 + 7$ 取模**后的值。

### 输入格式

**输入由多组数据构成。**

第一行一个正整数 $T$，表示共有 $T$ 组数据。

对于每组数据，有一行两个空格分隔的正整数 $n, m$。

### 输出格式

对于每组数据，依次输出一行一个整数表示答案。

### 样例 #1

```
4
8 7
1 1
2 9
4 6
```

```
28
2
10
14
```

## 提示

对于 $8 \%$ 的测试数据，有 $T = 1$，$1 \leq n, m \leq 6$。

对于 $16 \%$ 的测试数据，有 $T = 1$，$1 \leq n, m \leq 100$。

对于 $32 \%$ 的测试数据，有 $T = 1$，$1 \leq n, m \leq 1,000$。

对于 $64 \%$ 的测试数据，有 $T = 1$，$1 \leq n, m \leq 5,000$。

对于 $88 \%$ 的测试数据，有 $T = 1$，$1 \leq n, m \leq 50,000$。

对于 $100 \%$ 的测试数据，保证 $1 \leq T \leq 10,000$，$1 \leq n, m \leq 50,000$。

------

暴力 $dp$

$f_{i,j,k}$ 当前做到第 $i$ 个数，沃若吃了 $j$ 个，扶苏吃了 $k$ 个的方案数，$O(n^2\sqrt {2n})$

考虑优化，发现一定有 $S=\Sigma_{j=1}^i j\,S=j+k$ 合法

简化状态 $f_{i,j}$ 当前做到 $i$ 个数，沃若吃了 $j$ 个方案数

$$f_{i,j} \leftarrow f_{i-1,j}+f_{i-1,j-i}\,[j\geq i]$$

这个复杂度是 $O(T\sqrt{n+m}\,max(n,m))$ 的

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e4+10,Q=1e9+7;
int n,m;
int f[N][(int)sqrt(N)+5];

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

void solve()
{
	n=fr(),m=fr();
	int ans=0;
	f[0][0]=1;
	for(int i=1,s=0;(s+=i)<=n+m;i++)
	{
		for(int j=n;~j;j--)
		{
			f[i][j]=f[i-1][j];
			if(j>=i)
			{
				f[i][j]+=f[i-1][j-i];
				if(f[i][j]>=Q) f[i][j]-=Q;
			}
		}
		for(int j=n;j>=max(0,s-m);j--)
		{
			ans+=f[i][j];
			if(ans>=Q) ans-=Q;
		}
	}
	fw(ans),nl;
}

signed main()
{
	int T=fr();
	while(T--) solve();

	return 0;
}
```



发现 $f$ 数组可以预处理，下面这个式子前缀和一下就可以

```cpp
for(int j=n;j>=max(0,s-m);j--) ans+=f[i][j];
```

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e4+10,M=500,Q=1e9+7;
int n,m;
int f[M][N],s[M][N];

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

void prework(int n)
{
	f[0][0]=1;
	for(int i=1;i<M;i++)
	{
		for(int j=n;~j;j--)
		{
			f[i][j]=f[i-1][j];
			if(j>=i)
			{
				f[i][j]+=f[i-1][j-i];
				if(f[i][j]>=Q) f[i][j]-=Q;
			}
		}
	}
	
	for(int i=1;i<M;i++)
	{
		s[i][0]=f[i][0];
		for(int j=1;j<=n;j++)
		{
			s[i][j]+=s[i][j-1]+f[i][j];
			if(s[i][j]>=Q) s[i][j]-=Q;
		}
	}
}

void solve()
{
	n=fr(),m=fr();
	int ans=0;
	for(int i=1,S=0;(S+=i)<=n+m;i++)
	{
		ans+=s[i][n];
		if(S-m-1>=0) ans-=s[i][S-m-1];
		if(ans<0) ans+=Q;
		if(ans>=Q) ans-=Q;
	}
	fw(ans),nl;
}

signed main()
{
	prework(N-10);
	int T=fr();
	while(T--) solve();

	return 0;
}
```

