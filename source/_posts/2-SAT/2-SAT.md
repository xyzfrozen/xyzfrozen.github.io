---
title: 2-SAT
date: 2023-10-13 23:07:17
tags:
- 2-SAt
- 图论
categories:
- note
mathjax: true
---

# 2-SAT

## SAT

给定变量 $x_1,x_2,...x_n$，$x_i=0/1$

若 $x_i$ 为真则 $x_i=1$，否则 $\lnot x_i=1$

给定约束条件 

$x_i=1$，$x_i=0$

$x_i \oplus x_j \oplus x_k=0/1$

$x_i \lor x_j =0/1$

$x_i \land x_j=0/1$

等，每组多个变量个变量

求是否存在一组 $x_i$ 的解

## 2-SAT 定义

每组两个变量，共 $11$ 种关系

这个很像图论的最小割的二分点集问题，我们考虑图论建模

考虑等价问题，$n$ 个集合，每个集合两个元素 $x_i$，$\lnot x_i$

选择元素，等价于变量为真

$(u,v)$ 表示，当 $x_u=1$ 时，$x_v=1$

$x_a \land x_b=0$，$a\,b$ 不能同时选

等价于 $(a,\lnot b)$，$(b,\lnot a)$

$x_a \oplus x_b=0$，$a\,b$ 必须同时选/不选

等价于 $(a,b)$，$(b,a)$

$x_a \lor x_b=1$，$a\,b$ 必须选至少一个

等价于 $(\lnot a,b)$，$(\lnot b,a)$

$x_a=1/x_a\land x_b=1$，$a$ 必选，等价于 $(\lnot a,a)$

$x_a=0/x_a\land x_b=0$，$a$ 必不选，等价于 $(a,\lnot a)$

## 2-SAT solve

对称性，若有 $(a,b)$，则有 $(\lnot b,\lnot a)$

传递性，若有 $(a,b),(b,c)$，则有 $(a,c)$

路径对称性，若有 $(u,...,v)$，则有 $(\lnot v,..,\lnot u)$

1. 建图
2. 对图求出强联通分量，并求出缩点后的拓扑序
3. 若存在对应同一个变量的两个结点在同一个分量内，即无解
4. 否则一定有解；对每个变量取所在分量拓扑序较大的那个对应结点，一定能构造出一组合法解

$proof$

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132308524.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132308550.png)

跑完 $Tarjan$ 后不需要再拓扑，因为 $Tarjan$ 求出的 $scc$ 编号就是逆拓扑序

[模板题](https://www.luogu.com.cn/problem/P4782 "模板题")

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=2e6+10;
int n,m,u,v,a,b,stm,scc;
int dfn[N],low[N],col[N],p[N];
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

//注意不能判断根rt
void tarjan(int x)
{
	dfn[x]=low[x]=++stm;
	sd.push(x);
	p[x]=1;
	
	go(v)
	{
		if(!dfn[v])
		{
			tarjan(v);
			low[x]=min(low[x],low[v]);
		}
		else if(p[v]) low[x]=min(low[x],dfn[v]);
	}
	
	if(dfn[x]==low[x])
	{
		++scc;
		while(sd.size())
		{
			int t=sd.top();
			sd.pop();
			p[t]=0;
			
			col[t]=scc;
			if(t==x) break;
		}
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),a=fr(),v=fr(),b=fr();
		if(a && b) as[u+n].pb(v),as[v+n].pb(u);
		else if(a && !b) as[u+n].pb(v+n),as[v].pb(u);
		else if(!a && b) as[u].pb(v),as[v+n].pb(u+n);
		else as[u].pb(v+n),as[v].pb(u+n);
	}
	
	for(int i=1;i<=(n<<1);i++) //和 tarjan一样需要都遍历
		if(!dfn[i]) tarjan(i);
	for(int i=1;i<=n;i++)
		if(col[i]==col[i+n]) {puts("IMPOSSIBLE");return 0;}
	puts("POSSIBLE");
	for(int i=1;i<=n;i++) fw((int)(col[i]<col[i+n])),pt; //反着的大就是正着的小
	
	return 0;
}
```

无注释版

```cpp
const int N=2e6+10;
int n,m,u,v,a,b,stm,scc;
int dfn[N],low[N],col[N],p[N];
vector<int> as[N];
stack<int> sd;

void tarjan(int x)
{
	dfn[x]=low[x]=++stm;
	sd.push(x);
	p[x]=1;
	
	go(v)
	{
		if(!dfn[v])
		{
			tarjan(v);
			low[x]=min(low[x],low[v]);
		}
		else if(p[v]) low[x]=min(low[x],dfn[v]);
	}
	
	if(dfn[x]==low[x])
	{
		++scc;
		while(sd.size())
		{
			int t=sd.top();
			sd.pop();
			p[t]=0;
			
			col[t]=scc;
			if(t==x) break;
		}
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),a=fr(),v=fr(),b=fr();
		if(a && b) as[u+n].pb(v),as[v+n].pb(u);
		else if(a && !b) as[u+n].pb(v+n),as[v].pb(u);
		else if(!a && b) as[u].pb(v),as[v+n].pb(u+n);
		else as[u].pb(v+n),as[v].pb(u+n);
	}
	
	for(int i=1;i<=(n<<1);i++)
		if(!dfn[i]) tarjan(i);
	for(int i=1;i<=n;i++)
		if(col[i]==col[i+n]) {puts("IMPOSSIBLE");return 0;}
	puts("POSSIBLE");
	for(int i=1;i<=n;i++) fw((int)(col[i]<col[i+n])),pt;
	
	return 0;
}
```

------------

[P3825 [NOI2017] 游戏](https://www.luogu.com.cn/problem/P3825 "P3825 [NOI2017] 游戏")

先只考虑 $A\;B\;C$ 类

问题在于每个 $x_i$ 的取值变成了 $A\;B\;C$ 三种，而不是 $0/1$ 两种

但是去掉 $x$ 类地图，实际上只有两种选择，这就是裸的 $2-SAT$ 问题

$x_i$ 表示选择字典序较小的那个可行地图，$
lnot x_i$ 表示较大的

比如 $s_i=A$，则 $x_i=B$，$\lnot x_i=C$

考虑 $x$ 类

对 $x$ 形这个 $d$ 的范围肯定直接暴力枚举 $x$ 是哪种类型，$O(3^d(n+m))$

写出这三种情况

1. 不选 $A$，考虑填 $B\;C$
2. 不选 $B$，考虑填 $A\;C$
3. 不选 $C$，考虑填 $A\;B$

情况 $3$ 考虑填 $A\;B$，在 $1\;2$ 已经有了，就不用枚举了

直接二进制枚举，为 $0$ 表示选择情况 $1$，为 $1$ 情况 $2$

注意清空 $as$，每次还要连 $(\lnot u,\lnot v)$，$u$，$v$ 分别是转换后的新点，具体看代码，那种 $\land\;\lor$ 的就不用了

$O(2^d(n+m))$

```cpp
const int N=2e5+10;
int n,m,d,u,v,stm,scc,idx;
int dfn[N],low[N],p[N],col[N],pos[10];
vector<int> as[N];
stack<int> sd;
char a,b,s[N],ch[N][2],rub[N];
struct node{
	int u;char a;
	int v;char b;
}q[N];

void tarjan(int x)
{
	dfn[x]=low[x]=++stm;
	sd.push(x);
	p[x]=1;
	
	go(v)
	{
		if(!dfn[v])
		{
			tarjan(v);
			low[x]=min(low[x],low[v]);
		}
		else if(p[v]) low[x]=min(low[x],dfn[v]);
	}
	
	if(dfn[x]==low[x])
	{
		scc++;
		while(sd.size())
		{
			int t=sd.top();
			sd.pop();
			p[t]=0;
			
			col[t]=scc;
			if(t==x) break;
		}
	}
}
void build()
{
	for(int i=1;i<=m;i++)
	{
		if(q[i].a==rub[q[i].u]) continue;
		int u=q[i].u+n*(q[i].a!=ch[q[i].u][0]),fu=(u>n)?(u-n):(u+n);
		int v=q[i].v+n*(q[i].b!=ch[q[i].v][0]),fv=(v>n)?(v-n):(v+n);
		if(q[i].b==rub[q[i].v]) as[u].pb(fu); //不能在 u 选择 q[i].a
		else as[u].pb(v),as[fv].pb(fu);
	}
}

void solve(int st)
{
	for(int i=0;i<d;i++,st>>=1) //决策
	{
		if(!(st&1)) ch[pos[i]][0]='B',ch[pos[i]][1]='C',rub[pos[i]]='A';
		else ch[pos[i]][0]='A',ch[pos[i]][1]='C',rub[pos[i]]='B';
	}
	for(int i=1;i<=(n<<1);i++) as[i].clear();
	build();
	
	memset(dfn,0,sizeof dfn);
	memset(low,0,sizeof low);
	memset(col,0,sizeof col);
	stm=scc=0;
	for(int i=1;i<=(n<<1);i++)
		if(!dfn[i]) tarjan(i);
	
	for(int i=1;i<=n;i++)
		if(col[i]==col[i+n]) return;
	for(int i=1;i<=n;i++)
		putchar(ch[i][(int)(col[i]>col[i+n])]);
	exit(0);
}

int main()
{
	n=fr(),d=fr();
	scanf("%s",s+1);
	for(int i=1;i<=strlen(s+1);i++)
	{
		if(s[i]=='x') pos[idx++]=i;
		else if(s[i]=='a') ch[i][0]='B',ch[i][1]='C',rub[i]='A';
		else if(s[i]=='b') ch[i][0]='A',ch[i][1]='C',rub[i]='B';
		else if(s[i]=='c') ch[i][0]='A',ch[i][1]='B',rub[i]='C';
	}
	m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),a=getchar(),v=fr(),b=getchar();
		q[i]={u,a,v,b};
	}
	
	for(int i=0;i<=(1<<d)-1;i++) solve(i);
	puts("-1");
	return 0;
}
```
