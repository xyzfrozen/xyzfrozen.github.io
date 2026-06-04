---
title: Tarjan && 圆方树
date: 2023-09-29 23:30:59
tags:
- Tarjan
- 圆方树
- 图论
categories:
- note
password: Violet Evergarden
mathjax: true
---

# Tarjan && 圆方树

和点相关的不需要判是否遍历到父亲 和边相关的则需要

# Tarjan

## 缩点（有向图）

Tarjan算法是基于对图深度优先搜索的算法，每个强连通分量为搜索树中的一棵子树
搜索时，把当前搜索树中未处理的节点加入一个堆栈，回溯时可以判断栈顶到栈中的节点是否为一个强连通分量

定义

$Dfn(x)$ 为节点 $x$ 搜索被搜索到时的次序编号(时间戳)
$Low(x)$ 为 $x$ 或 $x$ 的子树能够追溯到的最早的**栈中**节点的次序号。
当 $Dfn(u)>Low(u)$ 时，说明点u能回到更早被遍历的节点，**从而形成了一个环**
当 $Dfn(u)=Low(u)$ 时，**以u为根的搜索子树上所有节点是一个强连通分量**

每个顶点都被访问了一次，且只进出了一次堆栈，每条边也只被访问了一次，时间复杂度为 $O(N+M)$
$Tarjan$ 算法的意义在于把一个有向有环图变成了一个有向无环图，可以建立拓扑图，具有拓扑性

----------

给定有向图 $G$，求最大点权和

允许多次经过一条边或者一个点，但重复经过的点，权值只计算一次。

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=1e4+10;
int n,m,u,v,stm,idx,ans;
int w[N],dfn[N],low[N],col[N],p[N];
int val[N],inn[N],d[N];
vector<int> as[N];
vector<int> ed[N];
stack<int> sd;

int fr(){ //double 不能快读！！！！
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

//注意不能判断根rt
void tarjan(int x)
{
    //1 3步初始化
	dfn[x]=low[x]=++stm;
	sd.push(x);
	p[x]=1;
	
	//2 遍历子树
    //情况1 该子树没被遍历过 递归并看看能否通过子树回到更早节点
    //情况2 遍历回去了碰到环 更新下
	go(it)
	{
		if(!dfn[it])
		{
			tarjan(it);
			low[x]=min(low[x],low[it]);
		}
		else if(p[it]) low[x]=min(low[x],dfn[it]);
		//注意这里是和dfn[it]比较 防止扩大环的范围
	}
	
	//3 划分强连通分量
	if(dfn[x]==low[x])
	{
		++idx;
		while(sd.size())
		{
			int t=sd.top();
			sd.pop();
			p[t]=0;
			
			col[t]=idx;
			val[idx]+=w[t];
			if(t==x) break;
		}
	}
}

void topsort()
{
	queue<int> q;
	for(int i=1;i<=idx;i++)
		if(!inn[i]) q.push(i),d[i]=val[i];
		
	while(q.size())
	{
		int t=q.front();
		q.pop();
		
		for(auto it:ed[t])
		{
			d[it]=max(d[it],d[t]+val[it]);
			if(!(--inn[it])) q.push(it);
		}
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) w[i]=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		as[u].pb(v);
	}
	
	for(int i=1;i<=n;i++)
		if(!dfn[i]) tarjan(i);
	
	for(int i=1;i<=n;i++)
		for(auto it:as[i])
			if(col[it]!=col[i])
				ed[col[i]].pb(col[it]),inn[col[it]]++;
	topsort();
	for(int i=1;i<=n;i++) ans=max(ans,d[i]);
	fw(ans);
	
	return 0;
}
```
无注释

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=1e4+10;
int n,m,u,v,stm,idx,ans;
int w[N],dfn[N],low[N],col[N],p[N],val[N];
vector<int> as[N];
stack<int> sd;

int fr(){ //double 不能快读！！！！
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

void tarjan(int x)
{
	dfn[x]=low[x]=++stm;
	sd.push(x);
	p[x]=1;
	
	go(it)
	{
		if(!dfn[it])
		{
			tarjan(it);
			low[x]=min(low[x],low[it]);
		}
		else if(p[it]) low[x]=min(low[x],dfn[it]);
	}
	
	if(dfn[x]==low[x])
	{
		++idx;
		while(sd.size())
		{
			int t=sd.top();
			sd.pop();
			p[t]=0;
			
			col[t]=idx;
			val[idx]+=w[t];
			if(t==x) break;
		}
	}
}
```

----------

## 割点（无向图）

割点：若删除该点，图不连通，则该点为割点 
桥：若删除该边，图不连通，则该边为桥

对于一个点 $u$，存在它的子节点和孙子节点 $v$ 的low值，满足：$low_v \geq dfn_u$。 
即代表，$v$ 所在的强连通最上高度，都不超过 $u$ ，也就是说，如果 $v$ 点想要达到 $u$ 以上高度，必须经过 $u$。 

则 $u$ 为割点。

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=2e4+10;
int n,m,u,v,stm,idx;
int dfn[N],low[N];
bool p[N];
vector<int> as[N];

int fr(){ //double 不能快读！！！！
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

void tarjan(int x,int rt)
{
	dfn[x]=low[x]=++stm;
	int chi=0;
	
	go(it)
	{
		if(!dfn[it]) //没有被访问
		{
			tarjan(it,rt); //这里还是rt 只是为了处理根
			low[x]=min(low[x],low[it]);
			if(low[it]>=dfn[x] && x!=rt) p[x]=1; //表示为割点
			if(x==rt) chi++; //有效子树
		}
		low[x]=min(low[x],dfn[it]); //如果son被访问过 一定dfn更前
	}
	
	if(chi==2 && x==rt) p[x]=1;
}
```

----------

## 点双连通分量（无向图）

又称 $V-DCC$

定义：图中任意两点都同时包含在至少一个简单环中

性质

除了仅包含两个点一条边的点双外，其他点双都满足：任意两点间都存在至少两条点不重复路径。

图中任意一个割点都在至少两个点双。

两个点双至多存在一个公共点——割点。

任意一个不是割点的点都只存在于一个点双中，割点也一定属于两个及以上的点双。

证明

对于第二点，因为删去割点后图会不连通，所以割点至少连接着图的两部分，而由于点双中不能有割点，所以这两部分肯定不在同一个点双中，所以割点至少存在于两个点双中。

对于第三点，用反证法，假设存在两个及以上的公共点，那这两个点双就可以通过两条及以上的边相连，那么这就变成一个点双了，与定义矛盾，故假设不成立。如果这个公共点不是割点，那么说明两个点双还有别的边相连，同样变成一个点双，所以公共点一定是割点。

对于第四点，若点在两个及以上点双中，那么删去它就可以分成两个及以上的点双，它就一定是割点；而割点如果只属于一个点双，删去它后图依然连通，这个点就不是割点了，所以割点一定属于两个及以上的点双。

----------

我们再次利用栈求解，当出现 $low_v \geq dfn_u$ 的时候，把整个子树 $tree(v)$ 弹出栈

然后把 $x$ 也要入栈 ！！！ 割点同时存在于多个点双中

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=5e5+10;
int n,m,u,v,chi,stm,cnt,idx;
int dfn[N],low[N];
bool p[N];
vector<int> as[N];
vector<int> dcc[N];
stack<int> sd;

int fr(){ //double 不能快读！！！！
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

void tarjan(int x,int rt)
{
	dfn[x]=low[x]=++stm;
	sd.push(x);
	
	go(it)
	{
		if(!dfn[it]) //没有被访问
		{
			tarjan(it,rt); //这里还是rt 只是为了处理根
			low[x]=min(low[x],low[it]);
			if(low[it]>=dfn[x])
			{
				cnt++;
				while(sd.size())
				{
					int t=sd.top();
					sd.pop();
					dcc[cnt].pb(t);
					if(t==it) break; //弹出整个子树
				}
				dcc[cnt].pb(x); //割点也算进去
			}
			if(x==rt) chi++; //有效儿子
		}
		low[x]=min(low[x],dfn[it]); //如果son被访问过 一定dfn更前
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		as[u].pb(v),as[v].pb(u);
	}
	
	for(int i=1;i<=n;i++)
		if(!dfn[i]) 
		{
			chi=0;
			tarjan(i,i);
			if(!chi) dcc[++cnt].pb(i); //特判孤点
		}
	
	return 0;
}
```

----------

## 边双连通分量（无向图）

又称 $E-DCC$

对点 $u$，存在子节点满足，$low_v \gt dfn_u$，该边 $(u,v)$ 为桥。 

因为当 $low_v=dfn_u$ 时，即表明两点间存在环路，不可能为桥；

即只有小于情况下想要跳到 $u$ 以上高度，一定经过 $(u,v)$ 边。

边双连通分量 等价于 任意两点之间都有分离的路径连接

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=5e5+10,M=2e6+10;
int n,m,u,v,stm,idx,dcc,ans;
int h[M<<1],e[M<<1],ne[M<<1],br[M<<1];
int dfn[N],low[N],col[N],vis[N];
vector<int> bel[N];

int fr(){ //double 不能快读！！！！
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

void add(int u,int v)
{
	e[idx]=v,ne[idx]=h[u],h[u]=idx++;
}

void tarjan(int x,int rt)
{
	dfn[x]=low[x]=++stm;
	
	for(int i=h[x];~i;i=ne[i])
	{
		int j=e[i];
		if(j==rt) continue;
		if(!dfn[j])
		{
			tarjan(j,x);
			low[x]=min(low[x],low[j]);
			if(low[j]>dfn[x]) br[i]=br[i^1]=1; //标记桥边
		}
		low[x]=min(low[x],dfn[j]);
	}
}

void dfs(int x,int rt)
{
	vis[x]=1; //注意判环
	bel[dcc].pb(x);
	for(int i=h[x];~i;i=ne[i])
	{
		int j=e[i];
		if(j!=rt && !br[i] && !vis[j]) dfs(j,x); //不能是返祖边 不能横跨两个边双
	}
}

int main()
{
	memset(h,-1,sizeof h);
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		add(u,v),add(v,u);
	}
	
	for(int i=1;i<=n;i++)
		if(!dfn[i]) tarjan(i,-1);
		
	for(int i=1;i<=n;i++)
		if(!vis[i]) ++dcc,dfs(i,-1);
	
	return 0;
}
```

无注释版

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=5e5+10,M=2e6+10;
int n,m,u,v,stm,idx,dcc,ans;
int h[M<<1],e[M<<1],ne[M<<1],br[M<<1];
int dfn[N],low[N],col[N],vis[N];
vector<int> bel[N];

int fr(){ //double 不能快读！！！！
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

void add(int u,int v)
{
	e[idx]=v,ne[idx]=h[u],h[u]=idx++;
}

void tarjan(int x,int rt)
{
	dfn[x]=low[x]=++stm;
	
	for(int i=h[x];~i;i=ne[i])
	{
		int j=e[i];
		if(j==rt) continue;
		if(!dfn[j])
		{
			tarjan(j,x);
			low[x]=min(low[x],low[j]);
			if(low[j]>dfn[x]) br[i]=br[i^1]=1;
		}
		low[x]=min(low[x],dfn[j]);
	}
}

void dfs(int x,int rt)
{
	vis[x]=1;
	bel[dcc].pb(x);
	for(int i=h[x];~i;i=ne[i])
	{
		int j=e[i];
		if(j!=rt && !br[i] && !vis[j]) dfs(j,x);
	}
}

int main()
{
	memset(h,-1,sizeof h);
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		add(u,v),add(v,u);
	}
	
	for(int i=1;i<=n;i++)
		if(!dfn[i]) tarjan(i,-1);
		
	for(int i=1;i<=n;i++)
		if(!vis[i]) ++dcc,dfs(i,-1);
	
	return 0;
}
```

----------

# 圆方树（无向图）

无向连通图，每条边出现在至多一个简单环里面，这样的图称为仙人掌图

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010106048.png)

根据边双的性质，若我们将原图全部缩掉，则变为一棵树，但是如果按照边双，我们无法快速求出任意两点的最短距离

我们考虑构造圆方树

对于一个仙人掌，它的圆方树如下定义：

首先分为了两类点，一类是圆点，一类是方点

圆点就是原仙人掌中所有的点，方点是我们新添加进去的点

而圆方树的连边规则是这样的：

如果一条边在仙人掌中不属于任何一个环中，那么它直接圆方树中的两个圆点

对于仙人掌中的任意一个环，则每个环上的点在圆方树上对应的圆点向这个环对应的方点连边

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010106435.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010107022.png)

加上边权后，如下图

如果该点在某一个环上，那么建立一个新的方点，并使该点向方点连一条权值为 $0$ 的有向边，并把该点叫做这个环的“头”，再将环上其他点变成圆点，从方点依次向它们连一条权值为 $k$ 的有向边

头是环上离根节点最近的点

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010107283.png)

在这个最短路问题中，我们就把 $k$ 当做每个点到方点距离为到“头”的最短距离

我们显然用 $lca$ 维护树上路径，记 $p=lca(x,y)$

若 $p$ 为圆点，显然和方点的边不影响路径长度，$ans=d(x)+d(y)-2d(p)$

若 $p$ 为方点，如下图，我们分类讨论

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010107768.png)

对于环上两点的最短距离，我们可以用前缀和实现！！！

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=2.4e4+10,M=N*3;
int n,m,q,u,v,w,stm,dcc,idx,X,Y,top;
int h[N],e[M],c[M],ne[M];
int dfn[N],low[N],vis[N];
int fa[N][15],dep[N],dis[N];
int s[N],len[N]; //顺时针前缀和 所在环总长度
int ed[N],F[N];
vector<pi> as[N];

int fr(){ //double 不能快读！！！！
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

void add(int u,int v,int w)
{
	e[idx]=v,ne[idx]=h[u],c[idx]=w,h[u]=idx++;
}

void build(int x,int y,int z)
{
	int S=z,sqr=n+(++dcc);
	for(int k=y;k!=x;k=F[k])
		s[k]=S,S+=c[ed[k]];
	s[x]=len[x]=S;
	as[x].pb({sqr,0});
	for(int k=y;k!=x;k=F[k])
		len[k]=S,as[sqr].pb({k,min(s[k],S-s[k])});
}

void tarjan(int x,int rt)
{
	dfn[x]=low[x]=++stm;
	
	for(int i=h[x];~i;i=ne[i])
	{
		int j=e[i];
		if(!dfn[j])
		{
			F[j]=x,ed[j]=i;
			tarjan(j,i);
			low[x]=min(low[x],low[j]);
			if(low[j]>dfn[x]) as[x].pb({j,c[i]}); //非环内边
		}
		else if(i!=(rt^1)) low[x]=min(low[x],dfn[j]);
	}
	
	for(int i=h[x];~i;i=ne[i])
	{
		int j=e[i];
		if(dfn[x]<dfn[j] && ed[j]!=i) build(x,j,c[i]);
	}
}

void dfs(int x,int rt)
{
    dep[x]=dep[rt]+1;
    fa[x][0]=rt;
    for(int k=1;(1<<k)<=dep[x];k++)
       fa[x][k]=fa[fa[x][k-1]][k-1]; 
    go(it)
    {
        int id=it.first,val=it.second;
        if(id==rt) continue;
        dis[id]=dis[x]+val;
        dfs(id,x);
    }
}

int lca(int x,int y)
{
    if(dep[x]<dep[y]) return lca(y,x);
    int dh=dep[x]-dep[y],li=log2(dh);
    for(int k=li;k>=0;k--)
      if((dh>>k)&1) x=fa[x][k];
    if(x==y) return y;
    li=log2(dep[x]);
    for(int k=li;k>=0;k--)
        if(fa[x][k]!=fa[y][k]) x=fa[x][k],y=fa[y][k];
    X=x,Y=y;
    return fa[x][0];
}

int main()
{
	memset(h,-1,sizeof h);
	n=fr(),m=fr(),q=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),w=fr();
		add(u,v,w),add(v,u,w);
	}
	
	tarjan(1,-1); //连通图一次就够
	dfs(1,0);
	
	for(int i=1;i<=q;i++)
	{
		int x=fr(),y=fr();
		int p=lca(x,y);
		if(p<=n) fw(dis[x]+dis[y]-(dis[p]<<1)),nl;
		else fw(dis[x]-dis[X]+dis[y]-dis[Y]+min(abs(s[X]-s[Y]),len[X]-abs(s[X]-s[Y]))),nl;
	}
	
	return 0;
}
```

$O(n+m+q\log n)$
