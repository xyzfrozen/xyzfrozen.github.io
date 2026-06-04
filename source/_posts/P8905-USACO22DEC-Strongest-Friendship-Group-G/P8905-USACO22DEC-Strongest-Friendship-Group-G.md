---
title: P8905 [USACO22DEC] Strongest Friendship Group G
date: 2023-10-18 22:17:58
tags:
- 并查集
- 思维
categories:
- problem
mathjax: true
---

考虑枚举最小度数的点，则其贡献为度数 $\times $ 包含它的极大连通块的 $size$

直接枚举该点，算答案，然后暴力删除这个点，更新与它相邻的点的度数

我们需要维护的操作有

1. 找当前度数最小的点
2. 删除点，修改度数

这是非常经典的连通块维护删点问题，直接考虑时间回溯并查集加点，用 `set` 维护度数

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
int n,m,u,v,ans;
int p[N],sz[N],c[N],d[N],id[N],vis[N];
vector<int> as[N];
set<pi> s;

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

int find(int x)
{
	if(x!=p[x]) p[x]=find(p[x]);
	return p[x];
}

void merge(int x,int y)
{
	int px=find(x),py=find(y);
	if(!(px^py)) return; 
	if(sz[px]>sz[py]) swap(px,py);
	p[px]=py,sz[py]+=sz[px];
}

void build()
{
	for(int i=1;i<=n;i++)
		s.insert({d[i],i});
	for(int i=1;i<=n;i++)
	{
		auto it=s.begin();
		int x=it->second;
		id[i]=x,c[x]=it->first,vis[x]=1;
		s.erase(it);
		go(v)
		{
			if(!vis[v])
			{
				auto t=s.find({d[v],v});
				s.erase(t);
				s.insert({--d[v],v});
			}
		}
	}
}

void solve()
{
	memset(vis,0,sizeof vis);
	for(int i=n;i;i--)
	{
		int x=id[i];
		vis[x]=1;
		go(v)
			if(vis[v])
				merge(x,v);
		ans=max(ans,c[x]*sz[find(x)]);
	}
	fw(ans);
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
		p[i]=i,sz[i]=1;
	while(m--)
	{
		u=fr(),v=fr();
		as[u].pb(v),as[v].pb(u);
		d[u]++,d[v]++;
	}
	build();
	solve();
	return 0;
}
```
