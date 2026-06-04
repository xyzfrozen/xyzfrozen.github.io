---
title: 斜率优化 Dp
date: 2023-09-30 00:04:14
tags:
- 斜率优化 Dp
- 线性 Dp
categories:
- note
mathjax: true
---

# 斜率优化 $dp$

# 介绍

一般为 $O(n^3) \to O(n^2)$ 等降掉一个 $O(n)$ 的 $dp$ 优化

本质上基于决策单调性，单调队列维护

$dp$ 方程大概长成：

$$f_i=\min_{j=0}^{i-1}\,or\,\max_{j=0}^{i-1} a_i\times b_j+c_i+d_j+g$$

注：$g$ 为常数

https://www.cnblogs.com/MashiroSky/p/6009685.html

https://www.cnblogs.com/Xing-Ling/p/11210179.html

------------

# Step

[P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195 "P3195 [HNOI2008] 玩具装箱")

例题

朴素 

$$f_i=\min_{j=0}^{i-1} f_j+(s_i-s_j+i-j-1-L)^2$$

1. 化成上述基本 $dp$ 方程的样子，尽量去掉已知的（融到式子里面）

$s_i \to s_i+i$，$L\to L+1$

$$f_i=\min_{j=0}^{i-1} f_j+(s_i-s_j-L)^2$$

$$f_i=\min_{j=0}^{i-1} f_j+s_i^2+s_j^2-2s_is_j-2Ls_i+2Ls_j+L^2$$

$a_i=-2s_i$，$b_j=s_j$，$c_i=s_i^2-2Ls_i$，$d_j=f_j+s_j^2+2Ls_j$，$g=L^2$

2. $a_i \to -k，b_j \to x，d_j\to y$

由一次函数解析式

$$b=y-kx$$

$$f_i=\min_{j=0}^{i-1} (f_j+s_j^2+2Ls_j)-(2s_i)s_j+(s_i^2-2Ls_i+L^2)$$

3. 决策单调性

若 $0 \leq j \lt k \lt i$，且决策点 $k$ 优于 $j$

$$a_i\times b_j+d_j \geq a_i \times b_k+d_k$$

$$a_i(b_j-b_k) \geq d_k-d_j$$

$$a_i \geq \frac{d_k-d_j}{b_k-b_j}$$

注意 $b_i$ 单增

带入上面的解析式

$$-k \geq \frac{y(k)-y(j)}{x(k)-x(j)}$$

4. 数形结合

$f_i$ 为函数在 $y$ 轴上的截距

所以用这条已经确定 $k$ 的直线往上移动，碰到的第一个点就是最优决策点

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010100859.png)


------------

如何寻找最优决策点？

我们需要维护的是一个下凸壳，利用单调队列+决策单调性

```cpp
#include<bits/stdc++.h>
#define int long long
#define llb long double
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e4+10;
int n,L;
int c[N],s[N],f[N],q[N];

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

llb x(int a){return (llb)s[a];}
llb y(int a){return (llb)(f[a]+s[a]*s[a]+2*L*s[a]);}
llb slo(int a,int b){return (y(b)-y(a))/(x(b)-x(a));}

signed main()
{
	n=fr(),L=fr()+1;
	for(int i=1;i<=n;i++) c[i]=fr(),s[i]=s[i-1]+c[i];
	for(int i=1;i<=n;i++) s[i]+=i;
	
	int hh=0,tt=-1;
	q[++tt]=0;
	for(int i=1;i<=n;i++)
	{
		while(hh<tt && slo(q[hh],q[hh+1])<=2*s[i]) hh++;
		f[i]=f[q[hh]]+(s[i]-s[q[hh]]-L)*(s[i]-s[q[hh]]-L);
		while(hh<tt && slo(q[tt-1],q[tt])>=slo(q[tt],i)) tt--;
		q[++tt]=i;
	}
	fw(f[n]);
	return 0;
}
```
