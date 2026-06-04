---
title: Luogu Simu6 T1
date: 2023-10-06 20:46:13
tags:
- 思维
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目背景

时间限制：0.5s

空间限制：512MB

## 题目描述

有一个 $H\times W$ 的网格，左上角的格子坐标为 $(1,1)$，右下角的格子坐标为 $(H,W)$。

网格上有 $n$ 枚棋子，第 $i$ 枚棋子的坐标为 $(x_i,y_i)$。

你可以无限次（包括 0 次）任意进行以下操作：

- 将所有棋子向上移动一格。

  如果某棋子原来在 $(x,y)$，则其被移到 $(x-1,y)$。特别地，若原来在 $(1,y)$，则其被移到 $(H,y)$。

- 将所有棋子向下移动一格。

  如果某棋子原来在 $(x,y)$，则其被移到 $(x+1,y)$。特别地，若原来在 $(H,y)$，则其被移到 $(1,y)$。

- 将所有棋子向左移动一格。

  如果某棋子原来在 $(x,y)$，则其被移到 $(x,y-1)$。特别地，若原来在 $(x,1)$，则其被移到 $(x,W)$。
  
- 将所有棋子向右移动一格。

  如果某棋子原来在 $(x,y)$，则其被移到 $(x,y+1)$。特别地，若原来在 $(x,W)$，则其被移到 $(x,1)$。
  

定义所有棋子的**最小包围矩形**是满足以下条件的矩形：

- 所有边都平行于网格边缘
- **面积**最小
- 所有棋子都在矩形内部


你的目标是：在任意多次操作后，让最小包围矩形的面积最小。在此基础上，让操作次数尽可能小。

### 输入格式

第一行三个整数 $H,W,n$。

接下来 $n$ 行，第 $i$ 行两个整数 $x_i,y_i$。保证棋子的位置不重复。

### 输出格式

输出两个整数：第一个为任意操作后，最小包围矩形的面积最小值。第二个为达到这个最小值需要的最小步数。

如果你的最小值正确但是步数错误，仍可以得到该测试点 $60\%$ 的分数。请注意，即使你不知道最小步数，也需要输出一个符合格式要求的答案！

### 样例 #1

```
1 10 3
1 5
1 7
1 2
```

```
6 0
```

### 样例 #2

```
3 4 3
1 1
3 4
1 4
```

```
4 2
```

### 提示

本题共 20 个测试点，每个测试点 5 分。所有数据均满足：$1\le H,W\le 10^9,1\le n\le 10^5$。

测试点 $1$ 满足 $n=1$。

测试点 $2\sim 5$ 满足 $n=2$。

测试点 $6,7$ 满足 $H=1,W\le 500$。

测试点 $8\sim 13$ 满足 $H=1$。

测试点 $14,15$ 满足 $H,W\le 50$。

测试点 $16,17$ 满足 $H,W\le 1000$。

测试点 $18$ 满足 $H,W\le 2\times 10^5$。

测试点 $19,20$ 无特殊限制。

------

我们考虑如果没有一个数“越界”，答案不变，同时 $x,y$ 各自独立，处理相同，考虑 $x$

显然初始从小到大排序

考虑移动到一个数 $i$ 越界，此时的最大宽度就是 $h-(x_i-x_{i-1}-1)$，因为我们显然只会把这个数移动到 $1/h/w$ 才能在答案不变时，最小化操作数，此时操作数为 $\min(x_{i-1},h-x_i+1)$

所以我们的答案是就是 $min(h-d(i,i+1),x_{max}-x_{min})$

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
int h,w,n,ans=1,res;
int x[N],y[N];
vector<int> a;

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
	sort(a.begin(),a.end());
	a.erase(unique(a.begin(),a.end()),a.end());
	int mx=h-(a.back()-a[0]+1),op=0;
	for(int i=1;i<a.size();i++)
	{
		if(mx<a[i]-a[i-1]-1)
			mx=a[i]-a[i-1]-1,op=min(a[i-1],h-a[i]+1);
		else if(mx==a[i]-a[i-1]-1)
			op=min({op,a[i-1],h-a[i]+1});
	}
	ans*=(h-mx),res+=op;
}

signed main()
{
	h=fr(),w=fr(),n=fr();
	for(int i=1;i<=n;i++)
		x[i]=fr(),y[i]=fr();
	
	for(int i=1;i<=n;i++) a.pb(x[i]);
	solve();
	a.clear();
	for(int i=1;i<=n;i++) a.pb(y[i]);
	h=w,solve();
	
	fw(ans),pt,fw(res);
	return 0;
}
```

