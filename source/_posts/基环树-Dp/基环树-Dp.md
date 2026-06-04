---
title: 基环树 Dp
date: 2023-09-30 00:05:52
tags:
- 基环树
- 树形 Dp
categories:
- note
mathjax: true
---

# 基环树 $Dp$

$n$ 个点 $n$ 条边的图，一个或多个一个环上挂了一堆树的单元组成

对于基环树的题，常见的套路就是断掉其中一条边，变成树的处理方式

需要注意的是，如果出现重边，只可能是 $1 \to 2$，$2 \to 1$ 这样的二元环构成

# 例题

[P1453 城市环路](https://www.luogu.com.cn/problem/P1453 "P1453 城市环路")

考虑树怎么做，就是没有上司的舞会

1. 并查集找环，标记环上任意两点和这条边

2. 分别对两个点跑树形 $dp$，然后取 $\max (f_{R_1,0},f_{R_2,0})$

注意这里断边必须标记边，而不是标记点，否则就会被二元环卡掉，因为原理是通过跑 $R_1$ 的时候 $R_2$ 可以通过环上的其它点到达，但是这里二元环就只有两个点，到不了

正常的 $sz \gt 2$ 的不会出现重边，而且可以直接断掉

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

const int N=1e5+10;
int n,u,v,R1,R2,ban;
double k;
int w[N],f[N][2],p[N];
vector<pi> as[N];

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

void dfs(int x,int rt)
{
	f[x][0]=0,f[x][1]=w[x];
	go(it)
	{
		int v=it.fi,i=it.se;
		if(v==rt || ban==i) continue;
		dfs(v,x);
		f[x][0]+=max(f[v][0],f[v][1]);
		f[x][1]+=f[v][0];
	}
}

int calc(int x)
{
	dfs(x,-1);
	return f[x][0];
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++)
		w[i]=fr(),p[i]=i;
	for(int i=1;i<=n;i++)
	{
		u=fr()+1,v=fr()+1;
		as[u].pb({v,i}),as[v].pb({u,i});
		int px=find(u),py=find(v);
		if(px!=py) p[px]=py;
		else R1=u,R2=v,ban=i;
	}
	scanf("%lf",&k);
	printf("%.1lf",k*max(calc(R1),calc(R2)));
	return 0;
}
```

------------

[P2607 [ZJOI2008] 骑士](https://www.luogu.com.cn/problem/P2607 "P2607 [ZJOI2008] 骑士")

和上题基本一样，就是变成了森林

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define fi first
#define se second
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int n,u,v,ban;
int w[N],p[N];
long long ans,f[N][2];
struct node{int R1,R2,edge;};
vector<pi> as[N];
vector<node> R;

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

int find(int x)
{
	if(x!=p[x]) p[x]=find(p[x]);
	return p[x];
}

void dfs(int x,int rt)
{
	f[x][0]=0,f[x][1]=w[x];
	go(it)
	{
		int v=it.fi,i=it.se;
		if(v==rt || ban==i) continue;
		dfs(v,x);
		f[x][0]+=max(f[v][0],f[v][1]);
		f[x][1]+=f[v][0];
	}
}

long long calc(int x)
{
	dfs(x,-1);
	return f[x][0];
}

int main()
{
	n=fr();
	for(int i=1;i<=n;i++) p[i]=i;
	for(int i=1;i<=n;i++)
	{
		w[u=i]=fr(),v=fr();
		as[u].pb({v,i}),as[v].pb({u,i});
		int px=find(u),py=find(v);
		if(px!=py) p[px]=py;
		else R.pb({u,v,i});
	}
	
	for(auto &it:R)
	{
		ban=it.edge;
		ans+=max(calc(it.R1),calc(it.R2));
	}
	cout<<ans;
	return 0;
}
```

------------

[P5049 [NOIP2018 提高组] 旅行](https://www.luogu.com.cn/problem/P5049 "P5049 [NOIP2018 提高组] 旅行")

考虑树，每个点排序，然后直接贪心跑就行了

$O(n^2)$ 直接暴力枚举断边

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define fi first
#define se second
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e3+10;
int n,m,u,v,ban,fl,now,R;
int p[N],vis[N],f[N][2],ans[N],res[N];
vector<pi> as[N];
vector<int> circle;

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

bool find_circle(int x,int rt)
{
	vis[x]=1;
	go(it)
	{
		int v=it.fi;
		if(v==rt) continue;
		if(vis[v] || find_circle(v,x))
		{
			circle.pb(it.se);
			return 1;
		}
	}
	return 0;
}

void update()
{
	if(!fl)
	{
		memcpy(ans,res,sizeof ans);
		fl=1;return;
	}
	
	for(int i=1;i<=n;i++)
	{
		if(res[i]>ans[i]) return;
		else if(res[i]<ans[i]) {memcpy(ans,res,sizeof ans);return;}
	}
}

void dfs(int x,int rt)
{
	res[++now]=x;
	go(it)
	{
		int v=it.fi,i=it.se;
		if(v==rt || i==ban) continue;
		dfs(v,x);
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) p[i]=i; 
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		as[u].pb({v,i}),as[v].pb({u,i});
		int px=find(u),py=find(v);
		if(px!=py) p[px]=py;
		else R=u;
 	}
 	for(int i=1;i<=n;i++)
	 	sort(as[i].begin(),as[i].end());
 	
 	if(m==n-1) dfs(1,-1),update();
	else
	{
		ban=find(R);
		find_circle(R,-1);
		for(auto it:circle)
			ban=it,now=0,dfs(1,-1),update();
	}
	for(int i=1;i<=n;i++) fw(ans[i]),pt;
	return 0;
}
```

------------

参考博客：https://blog.csdn.net/m0_46222454/article/details/126309507

[P5049 [NOIP2018 提高组] 旅行 加强版](https://www.luogu.com.cn/problem/P5049 "P5049 [NOIP2018 提高组] 旅行 加强版")

我们考察断边的本质，相比于树上普通的 dfs，我们实际上就是加了一个“走回头路”的”反悔“操作，断边就是完成这个贪心操作

具体来说

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010058995.png)

如果我们的路径是 $1 \to 3 \to 2$，在 $2$ 点的时候我们可以选择走 $5$ 也可以选择返回去走 $4$，如果选 $4，就把这次贪心的就会用掉了，接下来的都只能下子树了

而暴力断边就是断掉 $(2,5)$ 帮助我们完成这次贪心

我们考察这次贪心的机会，如果当前在树里面，肯定只能做完在上来

换言之，在环上 $dfs$ 过程中，只有当之前访问过的并且在环上的节点，有一个未被访问的儿子的节点编号小于当前将要访问的节点时，才有可能进行"反悔"操作

其次，在"反悔"之前，当前节点的所有非环上儿子已经被访问过。因为这些节点不再环上，无法通过除了这个节点之外的其它节点被访问到

反悔条件为

1. 当前节点的所有非环上儿子都已经被访问过，将要访问的节点是环上的节点

2. 之前访问过的并且在环上的节点，有一个未被访问的儿子的节点编号 $\lt$ 当前将要访问节点编号

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e5+10;
int n,m,u,v,R,inf=0x3f3f3f3f,used;
int p[N],vis[N],col[N];
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

int find(int x)
{
	if(x!=p[x]) p[x]=find(p[x]);
	return p[x];
}

bool find_circle(int x,int rt)
{
	vis[x]=1;
	go(v)
	{
		if(v==rt) continue;
		if(vis[v] || find_circle(v,x))
		{
			col[v]=1;
			return 1;
		}
	}
	return 0;
}

void dfs(int x,int rt,int lt)
{
	if(vis[x]) return; //注意判断
	fw(x),pt;
	vis[x]=1;
	
	vector<int> rest;
	go(v)
	{
		if(v==rt || vis[v]) continue;
		rest.pb(v);
	}
	
	reverse(rest.begin(),rest.end());
	while(rest.size()) //从小到大做
	{
		int v=rest.back();
		rest.pop_back();
		
		//没用反悔机会 下一个点是环上点 所有树节点都访问完 访问原来的最小节点更优
		if(!used && col[v] && !rest.size() && lt<v)
		{
			used=1;
			return; //直接 return 让 lt 的父亲来做
		}
		
		if(rest.size() && col[x]) dfs(v,x,rest.back()); //下一个点环上的点，那 v 就继承 x 的，因为如果必须回来，相当于下一个需要处理的节点
		else dfs(v,x,lt); //否则下树不用管 或者儿子做完了
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) p[i]=i;
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		as[u].pb(v),as[v].pb(u);
		int px=find(u),py=find(v);
		if(px!=py) p[px]=py;
		else R=u;
	}
	for(int i=1;i<=n;i++)
		sort(as[i].begin(),as[i].end());
	
	col[R]=1,find_circle(R,-1);
	memset(vis,0,sizeof vis);
	dfs(1,-1,inf);

	return 0;
}
```
