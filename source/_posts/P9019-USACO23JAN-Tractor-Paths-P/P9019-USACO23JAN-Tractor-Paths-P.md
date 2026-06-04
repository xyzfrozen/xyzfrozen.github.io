---
title: P9019 [USACO23JAN] Tractor Paths P
date: 2023-10-14 16:53:10
tags:
- 倍增
- 最短路
- 前缀和
categories:
- problem
mathjax: true
---

一个点跑到一个区间+两点最短距离，直接倍增一直跑就行了

找到每个点向左最远的区间 $f_{0,i}$，向右最优的区间 $g_{0,i}$ 直接大力倍增跑路

注意倍增跑路一定是 $\lt$ 不要取 $\leq$，最后再 `+1` 即可

考虑第二问，设第一问答案为 $d$

考虑走到一个特殊点 $k$，当前走了 $l$ 步

$l+dis(k,j)=dis(i,j)$

问题等价于从 $k$ 出发，走 $dis(i,j)-l$ 步可达

维护 $ls_{k,i}=[1,i+2^k-1]$ 这段的特殊拖拉机个数

同理维护 $rs_{k,i}$

我们 `i 4 p 2 q 1 j` 从 $i \to p \to q \to j$ 中间的数字表示跳了多少条边

 考虑可达一定是区间到区间，因为如果 $a$ 可以跳到 $b$，那么在 $[a+1,b-1]$ 之间的更与 $b$ 有交，肯定跳的到

我们单独算起点和终点的贡献，然后把 $d \gets d-1$ 因为最后一部一定是跳到终点，但是我们不能跳出去了

那么这一段 $g$ 的贡献分别为，注意 $d \gets d-1$ 后就只到 $q$ 了

$rs_{2,i}\,s[1,p]$，$rs_{1,p}\,[1,q]$

算重了 $[1,i]\,[1,p]$

减掉 $ls_{2,j}$，$ls_{1,f_{2,j}}$ 

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,m,u,v;
int L[N],R[N],w[N],f[21][N],g[21][N],ls[21][N],rs[21][N];
char s[N];

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
	scanf("%s",s+1);
	for(int i=1,pr=0,t=0;i<=(n<<1);i++)
	{
		if(s[i]=='L') t++;
		else R[++pr]=t;
	}
	for(int i=(n<<1),pl=n+1,t=n+1;i;i--)
	{
		if(s[i]=='R') t--;
		else L[--pl]=t;
	}
	scanf("%s",s+1);
	for(int i=1;i<=n;i++) w[i]=s[i]-'0'+w[i-1];
	for(int i=1;i<=n;i++)
	{
		f[0][i]=L[i],g[0][i]=R[i];
		ls[0][i]=w[L[i]-1],rs[0][i]=w[R[i]];
	}
	for(int k=1;k<=18;k++)
		for(int i=1;i<=n;i++)
		{
			f[k][i]=f[k-1][f[k-1][i]];
			ls[k][i]=ls[k-1][i]+ls[k-1][f[k-1][i]];
			g[k][i]=g[k-1][g[k-1][i]];
			rs[k][i]=rs[k-1][i]+rs[k-1][g[k-1][i]];
		}
	
	while(m--)
	{
		u=fr(),v=fr();
		int ans=0,res=w[u]-w[u-1]+w[v]-w[v-1];
		int l=u,r=v;
		for(int k=18;~k;k--)
			if(g[k][l]<v) l=g[k][l],ans+=(1<<k);
		fw(++ans),pt,ans--;
		l=u;
		for(int k=18;~k;k--)
		{
			if((ans>>k)&1)
			{
				res+=rs[k][l],l=g[k][l];
				res-=ls[k][r],r=f[k][r];
			}
		}
		fw(res),nl;
	}
	return 0;
}
```

