---
title: CF708C Centroids
date: 2023-10-10 23:55:14
tags:
- 树形 Dp
- 换根 Dp
categories:
- problem
mathjax: true
---

先考虑以 $1$ 为根的情况

考虑到至多只有一个 $sz \gt \frac n2$ 的子树 $v$ ，我们肯定找是 $v$ 中那个最大的 $sz \leq \frac n2$ 的子树 $p$，然后扣下来接到 $x$ 上面，再判断能否成为重心，即 $sz_v-sz_p \leq \frac n2$

我们考虑如何维护这个过程，我们先维护最大的儿子 $son_x=v$，然后求每个 $T_x$ 内最大的 $sz \leq \frac n2$ 的子树 $q$，记为 $f_x=sz_q$ 和 $bel_x=q$

这样就把问题转化成 $sz_{son_x}-f_{son_x} \leq \frac n2$

我们考虑换根解决剩下的部分，我们还需要维护 $v$ 的补树中的 $sz_p$，传给 $v$

1. $bel_x=v$ ，$v$ 的 $sz_p\,[p\in subtree_v]$ 此时显然为 $x$ 中的次大子树 $t$ 中的 $f_t$，所以这启示我们还需要维护一个次大的 $T_x$ 内 $sz \leq \frac n2$ 的子树大小 $g_x$
2. $bel_x\not =v$ ，$v$ 的 $sz_p\,[p\in subtree_v]$ 此时显然为 $f_x$

记这个 $sz_p=h_v$

并且上述的要和 $\max(h_x,n-sz_x\,[n-sz_x \leq \frac n2])$ 取个最大值

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=4e5+10;
int n,u,v;
int sz[N],f[N],g[N],h[N],son[N],bel[N],ans[N];
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

void prework(int x,int rt)
{
	sz[x]=1;
	go(v)
	{
		if(v==rt) continue;
		prework(v,x);
		sz[x]+=sz[v];
		if(sz[son[x]]<sz[v]) son[x]=v;
		int val=(sz[v]<=n/2)?sz[v]:f[v];
		if(val>f[x]) g[x]=f[x],f[x]=val,bel[x]=v;
		else g[x]=max(g[x],val);
	}
}

void dfs(int x,int rt)
{
	ans[x]=1;
	if(n-sz[x]>n/2 && n-sz[x]-h[x]>n/2) ans[x]=0;
	if(sz[son[x]]>n/2 && sz[son[x]]-f[son[x]]>n/2) ans[x]=0;
	
	go(v)
	{
		if(v==rt) continue;
		h[v]=(n-sz[x]<=n/2)?(n-sz[x]):h[x];
		
		if(v==bel[x]) h[v]=max(h[v],g[x]); //最大子树
		else h[v]=max(h[v],f[x]);
		dfs(v,x);
	}
}

int main()
{
	n=fr();
	for(int i=1;i<n;i++)
	{
		u=fr(),v=fr();
		as[u].pb(v),as[v].pb(u);
	}
	
	prework(1,0);
	dfs(1,0);
	for(int i=1;i<=n;i++)
		fw(ans[i]),pt;
	
	return 0;
}
```

