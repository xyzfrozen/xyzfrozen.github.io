---
title: Extra 树状数组
date: 2023-09-29 23:59:59
tags:
- 前缀和
- 二维数点
categories:
- note
mathjax: true
---

# 单点加+矩阵求和

```cpp
void add(int x,int y,int v)
{
    for (int i=x;i<=n;i+=lowbit(i))
        for (int j=y;j<=m;j+=lowbit(j))
            a[i][j]+=v;
}
```

```cpp
int sum(int x,int y)
{
  int res=0;
  for (int i=x;i;i-=lowbit(i))
      for (int j=y;j;j-=lowbit(j))
          res+=a[i][j];
  return res;
}

int ask(int x1,int y1,int x2,int y2)
{
    return sum(x2,y2)-sum(x2,y1-1)-sum(x1-1,y2)+sum(x1-1,y1-1);
}
```

# 矩阵加+矩阵求和

考虑维护差分数组

$$
\begin{aligned}
& \sum_{i=1}^n \sum_{j=1}^m a[i][j] \\
& =\sum_{i=1}^n \sum_{j=1}^m \sum_{k=1}^i \sum_{l=1}^j b[k][l] \\
& =\sum_{i=1}^n \sum_{j=1}^m(n-i+1)(m-j+1) \cdot b[i][j] \\
& =\sum_{i=1}^n \sum_{j=1}^m(n+1)(m+1) \cdot b[i][j]-\sum_{i=1}^n \sum_{j=1}^m(m+1) i \cdot b[i][j]- \sum_{i=1}^n \sum_{j=1}^m(n+1) j \cdot b[i][j]+\sum_{i=1}^n \sum_{j=1}^m i j \cdot b[i][j] \\
& =(n+1)(m+1) \sum_{i=1}^n \sum_{j=1}^m b[i][j]-(m+1) \sum_{i=1}^n \sum_{j=1}^m c[i][j]-(n+1) \sum_{i=1}^n \sum_{j=1}^m d[i][j]+\sum_{i=1}^n \sum_{j=1}^m e[i][j]
\end{aligned}
$$

差分数组 

$b[i][j]=a[i][j]-a[i-1][j]-a[i][j-1]+a[i-1][j-1]$

$$
\begin{aligned}
& c[i][j]=i \cdot b[i][j] \\
& d[i][j]=j \cdot b[i][j] \\
& e[i][j]=i j \cdot b[i][j]
\end{aligned}
$$

[模板题](https://www.luogu.com.cn/problem/P4514 "P4514 上帝造题的七分钟")

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2050;
int n,m,a,b,c,d,k;
int B[N][N],C[N][N],D[N][N],E[N][N];
char op[2];

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

struct Bit{
	int s[N][N];
	void add(int x,int y,int v)
	{
		for(int i=x;i<=n;i+=i&(-i))
			for(int j=y;j<=m;j+=j&(-j))
			{
				B[i][j]+=v;
				C[i][j]+=x*v;
				D[i][j]+=y*v;
				E[i][j]+=x*y*v;
			}
	}
	int query(int x,int y)
	{
		int res=0;
		for(int i=x;i;i-=i&(-i))
			for(int j=y;j;j-=j&(-j))
			{
				res+=(x+1)*(y+1)*B[i][j];
				res-=(y+1)*C[i][j];
				res-=(x+1)*D[i][j];
				res+=E[i][j];
			}
		return res;
	}
	void ins(int a,int b,int c,int d,int v)
	{
		add(a,b,v);
		add(a,d+1,-v);
		add(c+1,b,-v);
		add(c+1,d+1,v);
	}
	int ask(int a,int b,int c,int d)
	{
		return query(c,d)-query(c,b-1)-query(a-1,d)+query(a-1,b-1);
	}
}tr;

int main()
{
	char X;
	cin>>X>>n>>m;
	while(~scanf("%s",op))
	{
		a=fr(),b=fr(),c=fr(),d=fr();
		if(op[0]=='L') tr.ins(a,b,c,d,fr());
		else fw(tr.ask(a,b,c,d)),nl;
	}

	return 0;
}
```

# 二维数点

[模板题](https://www.luogu.com.cn/problem/P2163 "模板题")

首先询问转化为二维前缀和求解，其次把树和询问（四个角）全部离散化

本题也是一个二维偏序题，一般用树状数组做，即 

$$val(x,y)=\Sigma_{i=1}^x \Sigma_{j=1}^y f(x,y)$$

贡献的表达如上，$f$ 是单点贡献

按 $x$ 排序，则转化为求比自己 $y$ 值小的树的个数（注意这里已经转化成前缀问题了，不再是矩阵），类似整体二分，树状数组维护值域即可

注意：排序函数要这样写

```cpp
return (x==Q.x)?((y==Q.y?id<Q.id:y<Q.y)):(x<Q.x);
```

同一个点，修改一定要在询问前面（修改的 $id=0$)

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2.5e6+10;
int n,m,a,b,c,d,cnt;
int e[N],ans[N],s[N];
struct node{
	int x,y,id,type;
	bool operator<(const node&Q)const{
		return (x==Q.x)?((y==Q.y?id<Q.id:y<Q.y)):(x<Q.x);
	}
}q[N<<1];

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
void add(int i,int x){for(;i<=n;i+=i&(-i)) s[i]+=x;}
int query(int i)
{
	int res=0;
	for(;i;i-=i&(-i)) res+=s[i];
	return res;
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
	{
		a=fr(),b=fr();
		q[++cnt]={a,b,0,0};
	}
	for(int i=1;i<=m;i++)
	{
		a=fr(),b=fr(),c=fr(),d=fr();
		q[++cnt]={a-1,b-1,i,1};
		q[++cnt]={c,d,i,1};
		q[++cnt]={c,b-1,i,-1};
		q[++cnt]={a-1,d,i,-1};
	}
	n=cnt;
	sort(q+1,q+1+n);
	for(int i=1;i<=n;i++) e[i]=q[i].y;
	sort(e+1,e+1+n);
	cnt=unique(e+1,e+1+n)-e-1;
	
	for(int i=1;i<=n;i++)
	{
		int y=lower_bound(e+1,e+1+cnt,q[i].y)-e;
		if(q[i].id) ans[q[i].id]+=query(y)*q[i].type;
		else add(y,1);
	}
	for(int i=1;i<=m;i++) fw(ans[i]),nl;

	return 0;
}
```

------------

[P9196 [JOI Open 2016] 销售基因链](https://www.luogu.com.cn/problem/P9196 "P9196 [JOI Open 2016] 销售基因链")

建一棵前缀 $trie$ 和一颗后缀 $trie$

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010106816.png)

设前缀到节点 $x$，后缀到节点 $y$，则我们要求的就是 $x\,y$  的共同子树中的字符串个数

子树问题 $\to$ $dfn$ 序，这转化成一个二维偏序数点问题

```cpp
const int N=2e6+10;
int n,m,cnt;
int e[N*5],ans[N*5];
char s[N],t[N];
vector<pi> dot;
struct node{
	int x,y,id,type;
	bool operator<(const node&Q)const{
		return (x==Q.x)?((y==Q.y?id<Q.id:y<Q.y)):(x<Q.x);
	}
}q[N*5];

int id(char c)
{
	if(c=='A') return 1;
	if(c=='G') return 2;
	if(c=='U') return 3;
	return 0;
}

struct Tire{
	int tr[N<<1][4],dfn[N],sz[N],idx=0,stm=0;
	int insert()
	{
		int now=0;
		for(int i=0;s[i];i++)
		{
			int word=id(s[i]);
			if(!tr[now][word]) tr[now][word]=++idx;
			now=tr[now][word];
		}
		return now;
	}
	int query(char s[])
	{
		int now=0;
		for(int i=0;s[i];i++)
		{
			int word=id(s[i]);
			if(!tr[now][word]) return -1;
			now=tr[now][word];
		}
		return now;
	}
	void dfs(int x)
	{
		dfn[x]=++stm;
		sz[x]=1;
		for(int i=0;i<=3;i++)
			if(tr[x][i])
				dfs(tr[x][i]),sz[x]+=sz[tr[x][i]];
	}
}Tr1,Tr2;

struct Bit{
	int s[N];
	void add(int i,int x){for(;i<=n;i+=i&(-i)) s[i]+=x;}
	int query(int i)
	{
		int res=0;
		for(;i;i-=i&(-i)) res+=s[i];
		return res;
	}	
}Tr;

void strrev(int op)
{
	if(op==1)
	{
		for(int i=0,j=strlen(s)-1;i<j;i++,j--)
			swap(s[i],s[j]);
	}
	else
	{
		for(int i=0,j=strlen(t)-1;i<j;i++,j--)
			swap(t[i],t[j]);
	}
}

int main()
{	
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
	{
		scanf("%s",s);
		int p=Tr1.insert();
		strrev(1);
		int q=Tr2.insert();
		dot.pb({p,q});
	}
	
	Tr1.dfs(0),Tr2.dfs(0);
	for(auto &v:dot)
	{
		v.fi=Tr1.dfn[v.fi];
		v.se=Tr2.dfn[v.se];
		q[++cnt]={v.fi,v.se,0,0};
	}
	
	for(int i=1;i<=m;i++)
	{
		scanf("%s%s",s,t);
		strrev(2);
		int x=Tr1.query(s),y=Tr2.query(t);
		if(!(~x) || !(~y)) {ans[i]=0;continue;}
		
		int a=Tr1.dfn[x],b=Tr2.dfn[y],c=a+Tr1.sz[x]-1,d=b+Tr2.sz[y]-1;
		q[++cnt]={a-1,b-1,i,1};
		q[++cnt]={c,d,i,1};
		q[++cnt]={c,b-1,i,-1};
		q[++cnt]={a-1,d,i,-1};
	}
	
	n=cnt;
	sort(q+1,q+1+n);
	for(int i=1;i<=n;i++) e[i]=q[i].y;
	sort(e+1,e+1+n);
	cnt=unique(e+1,e+1+n)-e-1;
	
	for(int i=1;i<=n;i++)
	{
		int y=lower_bound(e+1,e+1+cnt,q[i].y)-e;
		if(q[i].id) ans[q[i].id]+=Tr.query(y)*q[i].type;
		else Tr.add(y,1);
	}
	for(int i=1;i<=m;i++) fw(ans[i]),nl;

	return 0;
}
```
