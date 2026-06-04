---
title: ABC277 G
date: 2023-10-13 22:42:10
tags:
- 期望
- 数学
- 图论
categories:
- problem
mathjax: true
---

考虑暴力 $dp$，$f_{x,j,k}$ 当前在 $x$，移动了 $j$ 次，等级为 $k$ 的期望

考虑把 $k$ 融入 $dp$ 状态

我们考虑 $X_i^2 \to X_{i+1}^2$

显然有 $E(X_{i+1})=E(X_{i}+A)=E(X_i)+E(A)$

根据 $osu!$ 的套路，我们可以得到 $E(A)=2\times E(X_i)+E(1)$

直接维护 $f_{x,j,0/1/2}$ 表示当前在 $x$，移动了 $j$ 次，$0/1/2$ 次项的期望
$$
f_{x,j,0/1/2} \gets \sum_{(x,v)} f_{v,j-1,0/1/2} \times \frac 1d_v\\
$$
 以及
$$
ans \gets f_{x,j,2}\,[c_x=1]\\
f_{x,j,2} \gets 2\times f_{i,j,1}+f_{i,j,0}\;f_{i,j,1} \gets f_{i,j,0}\,[c_x=0]
$$
注意是 $E(A)$ 的贡献，所以是 `+=`

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=3e3+10,Q=998244353;
int n,m,k,u,v,ans;
int c[N],d[N],f[N][N][3];
vector<int> as[N];

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

signed main()
{
	n=fr(),m=fr(),k=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		d[u]++,d[v]++;
		as[u].pb(v),as[v].pb(u);
	}
	for(int i=1;i<=n;i++) d[i]=qkw(d[i],Q-2),c[i]=fr();
	f[1][0][0]=1;
	for(int i=1;i<=k;i++)
		for(int x=1;x<=n;x++)
		{
			go(v)
			{
				mod(f[x][i][0],f[v][i-1][0]*d[v]%Q);
				mod(f[x][i][1],f[v][i-1][1]*d[v]%Q);
				mod(f[x][i][2],f[v][i-1][2]*d[v]%Q);
			}
			if(c[x]) mod(ans,f[x][i][2]);
			else
			{
				mod(f[x][i][2],2*f[x][i][1]+f[x][i][0]);
				mod(f[x][i][1],f[x][i][0]);
			}
		}
	fw(ans);
	return 0;
}
```

