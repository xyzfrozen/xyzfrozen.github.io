---
title: Dfn序 && 欧拉序
date: 2023-09-30 00:01:45
tags:
- LCA
- 线段树
- 树状数组
categories:
- note
mathjax: true
---

# Dfn 序

1. 点修改+子树查询/子树修改+点查询

树状数组维护单点/差分

2. 子树修改+子树查询

线段树区间加区间和

3. 路径修改+点查询

维护 $lca$ 和每个点到根的路径和，转成 $u \to rt$，$v \to rt$，$lca \to rt$，$fa(lca) \to rt$

$u+=w,v+=w,lca-=w,fa(lca)-=w$

从下往上**差分**，一个点的差分为它的值-所有儿子的值

```cpp
mdf(dfn[x],d);mdf(dfn[y],d);mdf(dfn[p],-d);
if(fa[p]) mdf(dfn[fa[p]],-d);

printf("%llu\n",qry(dfn[x]-1,dfn[x]+sz[x]-1));
```

上述代码只会影响到

4. 点修改+路径查询

考虑查询点到根的路径，一个点子树内的所有点到根的路径中必然经过这个点，即路径上每一个点只对它的儿子有贡献

从上向下**前缀和**，每个点维护差分值，就转化成了子树修改，点查询

```cpp
mdf(dfn[x][0],dfn[x][1],y);

printf("%llu\n",qry(dfn[x])+qry(dfn[y])-qry(dfn[p])-qry(dfn[fa[p]]]);
```

5. 路径修改+子树和查询

首先转化为问题 $3$ 的四条链修改

考虑修改儿子节点 $y$ 对父亲 $x$ 的贡献，把贡献均摊到每个点上，求子树和再区间求和

$$val=w(dep_y-dep_x+1)=w(dep_y+1)-wdep_x$$

整条链区间加 $\Sigma w(dep_y+1)$ 和 $\Sigma w$

6. 子树修改+路径查询

$$w(dep_y-dep_x+1)=wdep_y-w(dep_x-1)$$

7. 路径修改+路径查询

树剖

https://www.cnblogs.com/nkxjlym/p/13938494.html

https://blog.csdn.net/CH_Vaniteux/article/details/84932063

$O(n\log n)$ 预处理，$O(1)$ 求 $lca$

考虑 $(u,v)\,[dfn_u \lt dfn_v]$

考虑不在一条链上的情况

因为 $dfn_p \lt \min dfn_u$

因为在这个 $dfn$ 区间内一定会经过 $p \to v$ 这条链，我们主需要查询 $dfn$ 在 $[dfn_u,dfn_v]$ 之间深度最小的点即可，他的父亲就是 $p$

考虑在同一条链上的情况，修正为 $[dfn_u+1,dfn_v]$ 即可，同时对情况 $1$ 也成立

------------

# 欧拉序

欧拉序 $1$：在每个节点进和出都加入序列

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010105600.png)

欧拉序 $2$ ：$dfs$ 进加进，$dfs$ 最后一次回加进，总共加两遍

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010105071.png)

欧拉序2为A-B-D-D-E-G-G-E-B-C-F-H-H-F-C-A

```cpp
void dfs(int x,int rt)
{
	a[++len]=x;
	go(v)
	{
		if(v==rt) continue;
		dfs(v,x);
		a[++len]=x;
	}
}

void dfs(int x,int rt)
{
	a[++len]=x;
	go(v) if(v!=rt) dfs(v,x);
	a[++len]=x;
}
```

欧拉序 $1$ 应用：求某两点的LCA

显然这两点之间的区间中，深度最小点就是 $LCA$，$RMQ$ 维护预处理 $O(n\log n)$，查询 $O(1)$

贴个别人的，有时间修

```cpp
vector<int > g[40010];
int len,a[80020],dep[80020],pos[80020][17],dp[80020][17],vis[80020],cnt[80020];

void dfs(int u,int fa,int deep)
{
    a[++len]=u;
    dep[len]=deep+1;
    if(!vis[u])
    {
        cnt[u]=len;
        vis[u]=1;
    }
	
    for(int i=0;i<g[u].size();i++)
    {
        if(g[u][i]!=fa)
        {
            dfs(g[u][i],u,deep+1);
            a[++len]=u;
            dep[len]=deep+1;
        }
    }
}

int main()
{
	int n,m;
	scanf("%d%d",&n,&m);
	for(int i=1;i<=n;i++) g[i].clear();
	for(int i=1;i<n;i++)
	{
		int from,to;
		scanf("%d%d",&from,&to);
		g[from].push_back(to);
		g[to].push_back(from);
	}
	dfs(1,0,0);
	printf("%d\n",len);
	for(int i=1;i<=len;i++)
	{
		dp[i][0]=dep[i];
		pos[i][0]=i;
	}
	for(int j=1;j<=17;j++)
	{
		for(int i=1;i<=len;i++)
		{
			if(i+(1<<(j-1))>=len) break;
			if(dp[i][j-1]>dp[i+(1<<(j-1))][j-1])
			{
				dp[i][j]=dp[i+(1<<(j-1))][j-1];
				pos[i][j]=pos[i+(1<<(j-1))][j-1];
			}
			else
			{
				dp[i][j]=dp[i][j-1];
				pos[i][j]=pos[i][j-1];
			}
		}
	}
	
	for(int i=1;i<=m;i++)
	{
		int x,y,p;
		scanf("%d%d",&x,&y);
		int dx=cnt[x];
		int dy=cnt[y];
		if(dx>dy)
		{
			swap(dx,dy);
			swap(x,y);
		}
		int k=(int)(log((double)(dy-dx+1))/log(2.0));
		if(dp[dx][k]>dp[dy-(1<<k)+1][k]) p=pos[dy-(1<<k)+1][k];
		else p=pos[dx][k];
		printf("%d\n",a[p]);
	}
}
```

------------

欧拉序 $2$ 应用：子树修改+子树查询

每个点出现两次，两次出现位置之间的都是子树

查分修改维护前缀和即可，每个点被加了两次，要 / $2$
