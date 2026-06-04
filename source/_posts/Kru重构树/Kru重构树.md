---
title: Kru重构树
date: 2023-10-13 23:15:44
tags:
- Kru重构树
- LCA
categories:
- note
mathjax: true
---

# Kru 重构树

https://www.luogu.com.cn/blog/me-immortal/kruskal-chong-gou-shu

https://www.luogu.com.cn/blog/mywd-ylyy/kruskal-zhong-gou-shu

构造的过程很像 $kru$ 生成树

解决 从A点走到B点的所有路径中，最长的边最小值是多少 这类问题

考虑 $(u,v)=w$

我们新建节点 $T$，$T$ 的点权为 $w$，建边 $(u,T)=(v,T)=0$

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132316164.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132316291.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132316834.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132316288.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132316479.png)

## 性质

1. 是一棵二叉树，点数 $2 \times n-1$

2. 若边权升序，则它是一个大根堆

3. **原图中两个点间所有路径上的边最大权值的最小值 = 最小生成树上两点简单路径的边最大权值= Kruskal 重构树上两点 LCA 的点权**

4. 重构树中代表原树中的点的节点全是叶子节点，其余节点都代表了一条边的边权

关于第三点，边权越大，其对应的点 $T_{(u,v)}$ 的 $dep$ 越小，证明显然

新点的点权的含义就是左右子树中的点想要互通，必须要走至少一条边权等于这个点权的边

## problem

模板题

[P1967 [NOIP2013 提高组] 货车运输](https://www.luogu.com.cn/problem/P1967 "P1967 [NOIP2013 提高组] 货车运输")

改成最大 $kru$ 重构树即可

```cpp
const int N=3e4+10,M=5e4+10;
int n,m,q,u,v,w,T;
int p[N],val[N],d[N],fa[N][19],vis[N];
struct node{
	int u,v,w;
	bool operator<(const node&Q)const{
		return w>Q.w;
	}
}ed[M];
vector<int> as[N];

void kru()
{
	for(int i=1;i<=2*n-1;i++) p[i]=i;
	sort(ed+1,ed+1+m);
	
	T=n;
	for(int i=1;i<=m;i++)
	{
		int a=ed[i].u,b=ed[i].v,c=ed[i].w;
		int x=find(a),y=find(b);
		if(x!=y)
		{
			p[x]=p[y]=++T;
			as[T].pb(x),as[T].pb(y);
			val[T]=c;
		}
		if(T==2*n-1) break;
	}
}

void dfs(int x,int rt)
{
	vis[x]=1;
	d[x]=d[rt]+1;
	fa[x][0]=rt;
	for(int k=1;(1<<k)<=d[x];k++)
		fa[x][k]=fa[fa[x][k-1]][k-1];
	go(v) dfs(v,x);
}

int lca(int x,int y)
{
	if(d[x]<d[y]) return lca(y,x);
	int dh=d[x]-d[y],li=log2(dh);
	for(int k=li;k>=0;k--)
		if((dh>>k)&1) x=fa[x][k];
	if(x==y) return x;
	li=log2(d[x]);
	for(int k=li;k>=0;k--)
		if(fa[x][k]!=fa[y][k]) x=fa[x][k],y=fa[y][k];
	return fa[x][0];
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),w=fr();
		ed[i]={u,v,w};
	}
	
	kru();
	for(int i=T;i>n;i--)
		if(!vis[i]) dfs(i,0);
	
	q=fr();
	while(q--)
	{
		u=fr(),v=fr();
		if(find(u)!=find(v)) puts("-1");
		else fw(val[lca(u,v)]),nl;
	}

	return 0;
}
```

------------

[P4768 [NOI2018] 归程](https://www.luogu.com.cn/problem/P4768 "P4768 [NOI2018] 归程")

考虑答案路径 $P$

$P=(u,v)+(v,1)$，前面一段开车，后面一段走路

双条件，分解条件

先考虑海拔，即第一段 $(u,v)$ 这一段的路径长度是不管的

再考虑 $(v,1)$，既然已经下车了，这就是个单源最短路

题目要求回到 $1$，为什么不是任意的点对 $(u,v)$，这就说明需要对 $1$ 有一些特殊处理！！

我们现在就是要找到这个 $v$

$v$ 满足的性质是，从 $u$ 走到 $v$，最小边权 $\gt p$，$d_v$ ($1 \to v$ 的最短路) 最小

这就是一个典型的 $kru$ 重构树问题，维护重构树内部最小值即可

每次暴力往上跳，直到 $val_{fa_{x,k}} \leq p$ 

```cpp
const int N=4e5+10,M=4e5+10;
int n,m,Q,u,v,w,l,k,s,st,lim,T;
int d[N],p[N],val[N],fa[N][20],dep[N],mint[N];
struct node{
	int u,v,w,l;
	bool operator<(const node&Q)const{
		return l>Q.l;
	}
}ed[M];
vector<pi> as[N];
vector<int> tr[N];

void kru()
{
	memset(val,0,sizeof val);
	for(int i=1;i<=2*n-1;i++) tr[i].clear(); //这里清空不能是 [n+1，2*n-1] 可能之前的询问 [1,n] 也有 son
	for(int i=1;i<=2*n-1;i++) p[i]=i;
	sort(ed+1,ed+1+m);
	
	T=n;
	for(int i=1;i<=m;i++)
	{
		int a=ed[i].u,b=ed[i].v,c=ed[i].l;
		int x=find(a),y=find(b);
		if(x!=y)
		{
			p[x]=p[y]=++T;
			tr[T].pb(x),tr[T].pb(y);
			val[T]=c;
		}
		if(T==2*n-1) break;
	}
}

int dfs(int x,int rt)
{
	dep[x]=dep[rt]+1;
	fa[x][0]=rt,mint[x]=d[x]; //子树内最小值
	for(int k=1;(1<<k)<=dep[x];k++) fa[x][k]=fa[fa[x][k-1]][k-1];
	for(auto &v:tr[x]) mint[x]=min(mint[x],dfs(v,x));
	return mint[x];
}

void prework()
{
	priority_queue<pi,vector<pi>,greater<pi>> q;
	memset(d,0x3f,sizeof d);
	memset(p,0,sizeof p);
	d[1]=0;
	q.push({0,1});
	
	while(q.size())
	{
		auto t=q.top();
		q.pop();
		
		int x=t.se;
		if(p[x]) continue;
		p[x]=1;
		
		go(it)
		{
			int v=it.fi,w=it.se;
			if(d[v]>d[x]+w)
			{
				d[v]=d[x]+w;
				q.push({d[v],v});
			}
		}
	}
	
	kru();
	memset(mint,0x3f,sizeof mint);
	memset(fa,0,sizeof fa);
	memset(dep,0,sizeof dep);
	dfs(T,0);
}

int query(int x)
{
	int ans=mint[st];
	int li=log2(dep[x]);
	for(int k=li;k>=0;k--)
		if(val[fa[x][k]]>lim) //暴力跳 k 会之间减小
		{
			ans=min(ans,mint[fa[x][k]]);
			x=fa[x][k];
		}
	return ans;
}

void solve()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) as[i].clear();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),w=fr(),l=fr();
		as[u].pb({v,w}),as[v].pb({u,w});
		ed[i]={u,v,w,l};
	}
	prework();
	
	int lt=0;
	Q=fr(),k=fr(),s=fr();
	while(Q--)
	{
		int v0=fr(),p0=fr();
		st=(v0+k*lt-1)%n+1;
		lim=(p0+k*lt)%(s+1);
		fw(lt=query(st)),nl;
	}
}

signed main()
{
	int _T=fr();
	while(_T--) solve();

	return 0;
}
```
