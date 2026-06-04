---
title: ABC248 F
date: 2023-10-04 22:14:23
tags:
- 线性 Dp
categories:
- problem
mathjax: true
---

考虑枚举列，两个点一起做，同时这两个点的相互关系影响了联通，也需要加入状态

$f_{i,j,0/1}$ 考虑前 $i$ 列，删除了 $j$ 条边，第 $i$ 列上下两点之间是否连边

讨论 $i+1$ 删多少条边，怎么删，是否联通转移，$0$ 转移的时候至少要保证一个点在连通块内，同时 $0$ 只能是类似两横行这样的状态，这样后面 $1$ 才可以接上让它变联通，同时因为 $0$ 可能不连通，答案为 $f_{n,?,1}$ 

1. 当前列不连通

	![](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310042318580.png)

只有一种方式保证联通
$$
f_{i+1,j+1,0} \leftarrow f_{i,j,0}\\
f_{i+1,j,1} \leftarrow f_{i,j,0} 
$$

2. 当前列联通

	![](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310042318580.png)

$$
f_{i+1,j+1,1} \leftarrow 2\times f_{i,j,1}\\
f_{i+1,j,1} \leftarrow f_{i,j,1}\\
f_{i+1,j+2,0} \leftarrow 2\times f_{i,j,1}\\
f_{i+1,j+1,1} \leftarrow f_{i,j,1}
$$

上下边算两种

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=3e3+10;
int n,p;
int f[N][N][2];

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
void mod(int &x,int y){if((x+=y)>=p) x-=p;}

int main()
{
	n=fr(),p=fr();
	f[1][0][1]=f[1][1][0]=1;
	for(int i=1;i<=n-1;i++)
		for(int j=0;j<=n-1;j++)
		{
			mod(f[i+1][j+1][0],f[i][j][0]);
			mod(f[i+1][j][1],f[i][j][0]);
			mod(f[i+1][j+1][1],2ll*f[i][j][1]%p);
			mod(f[i+1][j][1],f[i][j][1]);
			mod(f[i+1][j+2][0],2ll*f[i][j][1]%p);
			mod(f[i+1][j+1][1],f[i][j][1]);
		}
	for(int i=1;i<=n-1;i++)
		fw(f[n][i][1]),pt;

	return 0;
}
```

