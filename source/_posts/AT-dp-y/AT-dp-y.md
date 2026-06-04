---
title: AT_dp_y
date: 2023-10-17 22:25:10
tags:
- 线性 Dp
- 数学
- 组合数学
- 容斥原理
categories:
- problem
mathjax: true
---

考虑容斥，要求 $O(n^2)$

总方案数显然 ${n+m-2} \choose n-1$

我们枚举一条不合法路径的起点 $i$，那么所有 $(x_i,y_i) \to (n,m)$ 的路径都是不合法的

设从 $(1,1)\to (x_i,y_i)$ 的不经过任何其它的点的路径方案数为 $f_i$

考虑这条路径的不合法贡献为 
$$
f_i \times { {n-x_i+m-y_i} \choose {n-x_i} }
$$
如何求 $f_i$ ? 继续容斥
$$
{ {x_i-1+y_i-1,x_i-1} \choose {x_i-1} } -\sum_{j=1}^{i-1} f_j \times { {x_i-x_j+y_i-y_j} \choose {x_i-x_j} }
$$

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define fi first
#define se second
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=6e3+10,M=2e5+10,Q=1e9+7;
int n,m,k,ans;
pi dot[N];
int fac[M],nf[M],f[N];

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
void mod(int &x,int y){if((x-=y)<0) x+=Q;}

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
	for(int i=1;i<=n;i++)
		fac[i]=fac[i-1]*i%Q;
	nf[n]=qkw(fac[n],Q-2);
	for(int i=n-1;i;i--)
		nf[i]=nf[i+1]*(i+1)%Q;
}

int C(int a,int b)
{
	if(a<b) return 0;
	return fac[a]*nf[b]%Q*nf[a-b]%Q;
}

void solve()
{
	ans=C(n+m-2,n-1);
	for(int i=1;i<=k;i++)
	{
		f[i]=C(dot[i].fi+dot[i].se-2,dot[i].fi-1);
		if(ans<0) ans+=Q;
		for(int j=1;j<i;j++)
		{
			if(dot[j].se>dot[i].se) continue;
			mod(f[i],f[j]*C(dot[i].fi-dot[j].fi+dot[i].se-dot[j].se,dot[i].fi-dot[j].fi)%Q);
		}
	}
	for(int i=1;i<=k;i++)
		mod(ans,f[i]*C(n-dot[i].fi+m-dot[i].se,n-dot[i].fi)%Q);
	fw((ans%Q+Q)%Q);
}

signed main()
{
	n=fr(),m=fr(),k=fr();
	for(int i=1;i<=k;i++)
		dot[i].fi=fr(),dot[i].se=fr();
	sort(dot+1,dot+1+k);
	prework(M-10);
	solve();
	return 0;
}
```
