---
title: P6064 [USACO05JAN] Naptime G
date: 2023-10-11 21:53:04
tags:
- 线性 Dp
- 思维
categories:
- problem
mathjax: true
---

考虑不是环怎么做

我们只用考虑当前选不选

$f_{i,j,0/1}$ 考虑前 $i$ 个数，选了 $j$ 个，当前数选/不选
$$
f_{i,j,0} \gets \max (f_{i-1,j,0},f_{i-1,j,1})\\
f_{i,j,1} \gets \max (f_{i-1,j-1,0},f_{i-1,j-1,1}+a_i)
$$
我们考虑跨过 $n$ 的情况，一定强选了 $1$ 睡觉，我们再钦定 $n$ 强制睡觉，这样就可以得到等效的情况

即 $f_{1,1,1}=a_1$，答案取 $f_{n,m,1}$

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=4e3+10;
int n,m,ans;
int a[N],f[N][N][2];

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
	for(int i=1;i<=n;i++) a[i]=fr();
	memset(f,-0x3f,sizeof f);
	f[0][0][0]=0;
	for(int i=1;i<=n;i++)
		for(int j=0;j<=min(m,i);j++)
		{
			f[i][j][0]=max(f[i-1][j][0],f[i-1][j][1]);
			if(j) f[i][j][1]=max(f[i-1][j-1][0],f[i-1][j-1][1]+a[i]);
		}
	ans=max(f[n][m][0],f[n][m][1]);
	
	memset(f,-0x3f,sizeof f);
	f[1][1][1]=a[1];
	for(int i=2;i<=n;i++)
		for(int j=0;j<=min(m,i);j++)
		{
			f[i][j][0]=max(f[i-1][j][0],f[i-1][j][1]);
			if(j) f[i][j][1]=max(f[i-1][j-1][0],f[i-1][j-1][1]+a[i]);
		}
	ans=max(ans,f[n][m][1]);
	fw(ans);
	return 0;
}
```

