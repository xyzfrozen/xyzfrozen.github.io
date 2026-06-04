---
title: CF27E Number With The Given Amount Of Divisors
date: 2023-10-17 22:26:07
tags:
- 数学
- 线性 Dp
categories:
- problem
mathjax: true
---

一个数的因数为 $\prod (1+a_i)[x=\prod p_i^{a_i}]$

考虑到每个质因子的贡献之和选择了多少个有关，我们肯定能用小的就用小的

但是不能只用 $2$，因为 $(x+1)y$ 和 $x(y+1)$ 不知道谁大，比如 $x=3\,y=2$

考虑到前 $10$ 个质数最劣可以贡献 $2^{10}$ 个因数，我们完全没有必要选前 $10$ 个质数以外的质数

$f_{i,j}$ 考虑前 $i$ 个质数，当前有 $j$ 个因子的最小数

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e3+10;
int n,inf=1e18,ans=1e18;
int f[12][N];
const int pr[]={0,2,3,5,7,11,13,17,19,23,31};

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

signed main()
{
	n=fr();
	for(int i=0;i<=10;i++)
		for(int j=0;j<=n;j++)
			f[i][j]=2e18;
	f[0][1]=1;
	for(int i=1;i<=10;i++)
		for(int j=1;j<=n;j++)
			for(int k=0,v=1;k<j;k++)
			{
				if(!(j%(k+1)) && f[i-1][j/(k+1)]<=inf/v)
					f[i][j]=min(f[i][j],f[i-1][j/(k+1)]*v);
				if(v<=inf/pr[i]) v*=pr[i];
				else break;
			}
	fw(f[10][n]);
	return 0;
}
```
