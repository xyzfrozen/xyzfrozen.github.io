---
title: P9437 『XYGOI round1』一棵树
date: 2023-10-04 22:14:47
tags:
- 树形 Dp
- 换根 Dp
categories:
- problem
mathjax: true
---

虽然这是路径集问题，应该在 $lca$ 算答案，但是我们发现跨过当前点到达儿子这类方案比较难统计

主要是因为假设当前新儿子为 $v$ ，$v \to x$ 的贡献方便计算，但是从 $x\to another_v$ 因为无法知道距离所以比较难计算

当然可以拆贡献算

所以我们就直接简化一下，只讨论 $v \to x$ 的路径，然后换根

假设 $a_x$ 在 $10$ 进制下有 $w_x$ 位，为了方便计算，令 $w_x \leftarrow 10^{w_x}$
$$
f_x = \sum_{v[(u,v)]} f_v \times w_x +sz_x \times a_x
$$
当前点贡献为 $sz_x \times a_x$，每个子树内的点都会被向前顶 $w_x$ 位

考虑 $x$ 变成 $v$ 的子树
$$
g_x-f_v\times w_x-sz_v \times a_x
$$
然后 $g_v$ 再用 $f$ 公式算下就行了

注意要特判 $a_x=0$ 的情况，它的 $w_x=10$

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10,Q=998244353;
int n,u,v,ans;
int a[N],f[N],sz[N],g[N],w[N];
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

void prework(int x,int rt)
{
	sz[x]=1;
	go(v)
	{
		if(v==rt) continue;
		prework(v,x);
		sz[x]+=sz[v];
		mod(f[x],f[v]*w[x]%Q);
	}
	mod(f[x],sz[x]*a[x]%Q);
}

void dfs(int x,int rt)
{
	go(v)
	{
		if(v==rt) continue;
		int val=(g[x]-f[v]*w[x]%Q+Q-sz[v]*a[x]%Q+Q)%Q;
		(g[v]=f[v]+val*w[v]%Q+(n-sz[v])*a[v]%Q)%=Q;
		dfs(v,x);
	}
}

int calc(int x)
{
	if(!x) return 10;
	int res=1;
	while(x) (res*=10ll)%=Q,x/=10;
	return res;
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) w[i]=calc(a[i]=fr());
	for(int i=2;i<=n;i++)
	{
		u=fr(),v=i;
		as[u].pb(v),as[v].pb(u);
	}
	
	prework(1,-1);
	g[1]=f[1];
	dfs(1,-1);
	for(int i=1;i<=n;i++) mod(ans,g[i]);
	fw(ans);
	return 0;
}
```

------

当然我们可以强行 $lca$ 统计

我们借用换根的思路，拆贡献，具体来说我们把 $x \to p \to y$ 的贡献拆成 $x\to p$ 和 $p \to y$ 分别计算，就是拆成每个点作为起点，终点，$lca$ 的三种贡献

我们需要解决上面那个被顶了多少位的问题，考虑子树 $v$

设 $f_x$ 表示 $x$ 的子树内点到 $x$ 的路径权值（不含 $x$）的长度的和，用于算系数
$$
f_x =\sum_{(x,v)} w_v \times f_v
$$
$g_x$ 表示 $x$ 子树内，以 $x$ 为终点的路径权值和
$$
g_x =\sum_{(x,v)} w_x\times g_v + sz_x \times a_x
$$
$h_x$ 表示 $x$ 子树内，以 $x$ 为起点的路径权值和
$$
h_x =\sum_{(x,v)} h_v + f_x \times a_x
$$

------

考虑怎么算答案，注意这里是拆贡献了的

1. $g_v$ 的贡献

我们考虑其它子树对 $v$ 的贡献，设 $P=w_x \times (f_x-f_v\times w_v)$

去掉 $v$ 子树后就是 $x$ 剩下的子树，然后还要经过 $x$ 到达 $v$，这些被往前顶了 $P$

$ans \leftarrow P \times g_v$

2. $h_v$ 的贡献

$ans \leftarrow (sz_x-sz_v) \times h_v$

3. $x$ 的贡献

上面这两个是 $lca$ 处算路径贡献，接下来算 $x$

由于路径起点和终点只用讨论一个，否则 $x$ 的贡献会被算 $2$ 次，我们就根据那个算的方便，就讨论哪个

先考虑跨过 $x$ 的，终点在 $v$ 子树内部的贡献

$ans \leftarrow (f_x-f_v \times w_v)\times sz_v \times a_x$

$a_x$ 被顶了这么多位的总和 $\times$ 每个一个 $v$ 的子树节点都可以匹配

再单独算下 $x$ 为起点的贡献，为 $f_x \times a_x$

参考题解：[P9437 题解 Ver2 - 2018ljw 的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/128606/solution-p9437-ver2)

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10,Q=998244353;
int n,u,v,ans;
int f[N],g[N],h[N],a[N],w[N],sz[N];
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

int calc(int x)
{
	if(!x) return 10;
	int res=1;
	while(x) (res*=10ll)%=Q,x/=10;
	return res;
}
//g x 为终点 h x 为起点
void dfs(int x,int rt)
{
	sz[x]=f[x]=1;
	go(v)
	{
		if(v==rt) continue;
		dfs(v,x);
		sz[x]+=sz[v];
		mod(f[x],f[v]*w[v]%Q);
		mod(g[x],g[v]*w[x]%Q);
		mod(h[x],h[v]);
	}
	mod(g[x],sz[x]*a[x]%Q);
	mod(h[x],f[x]*a[x]%Q);
	
	go(v)
	{
		if(v==rt) continue;
		mod(ans,w[x]*(f[x]-f[v]*w[v]%Q+Q)%Q*g[v]%Q);
		mod(ans,h[v]*(sz[x]-sz[v])%Q);
		mod(ans,(f[x]-f[v]*w[v]%Q+Q)%Q*sz[v]%Q*a[x]%Q);
	}
	mod(ans,f[x]*a[x]%Q);
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) w[i]=calc(a[i]=fr());
	for(int i=2;i<=n;i++)
	{
		u=fr(),v=i;
		as[u].pb(v),as[v].pb(u);
	}
	dfs(1,-1);
	fw(ans);
	return 0;
}
```

