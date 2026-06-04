---
title: P6381『MdOI R2』Odyssey
date: 2023-10-02 22:17:21
tags:
- Topsort
- 数学
categories:
- problem
mathjax: true
---

考虑 $topsort$ 

我们发现每个点的状态只有它的出边个数个，可以跑

我们考虑到每次传入一个状态，都需要枚举对应出点的所有出边，这样复杂度太高了，可以卡到 $O(m^2)$

我们考虑压缩边的状态，显然可以想到质因数分解，然后判断指数 $\mod k \equiv 0$ 

具体来说，对于一条边，我们可以枚举它的每个因子 $p^a$ ，同时 $a\,mod=k$，然后每个因子乘起来就是可以定义为这条边的状态 $\prod p^a$

我们用一个 $map$ 存下每个边的**对偶状态**，即 $\prod p^{k-a}$ 

这样每次来了一个状态 $\{点,上一条边\}$ 我们可以通过这个上一条边直接找到对偶边，然后转移，不用枚举出边

 ```cpp
int v=it.v,id=it.id,l=it.l; //id 当前边，这里相当于是反着更新每一个出点，这样就不用判断是否合法了，少了一个 log
if(d[{v,id}]<d[{x,match[id]}]+l)
	ans=max(ans,d[{v,id}]=d[{x,match[id]}]+l);
 ```

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

const int N=3e5+10;
int n,m,u,v,w,l,k,cnt,ans;
int pr[N],vis[N],in[N],f[N];
struct node{int v,id,l;};
vector<node> as[N];
unordered_map<int,int> S;
unordered_map<int,int> match;
map<pi,int> d;

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

void prework(int n)
{
	for(int i=2;i<=n;i++)
	{
		if(!vis[i]) pr[++cnt]=i,vis[i]=i;
		for(int j=1;pr[j]<=n/i;j++)
		{
			vis[i*pr[j]]=pr[j];
			if(!(i%pr[j])) break;
		}
	}
}

int calc(int x)
{
	S.clear();
	while(x>1)
	{
		S[vis[x]]++;
		x/=vis[x];
	}
	int val=1,to=1;
	for(auto it:S)
	{
		val*=pow(it.fi,it.se%k);
		to*=pow(it.fi,(k-it.se%k)%k);
	}
	
	match[val]=to;
	return val;
}

void topsort()
{
	queue<int> q;
	for(int i=1;i<=n;i++)
		if(!in[i]) q.push(i);
	
	while(q.size())
	{
		int x=q.front();
		q.pop();

		go(it)
		{
			int v=it.v,id=it.id,l=it.l;
			if(d[{v,id}]<d[{x,match[id]}]+l)
				ans=max(ans,d[{v,id}]=d[{x,match[id]}]+l);
			if(!(--in[v])) q.push(v);
		}
	}
	fw(ans);
}

int main()
{
	n=fr(),m=fr(),k=fr();
	prework(N-10);
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),w=fr(),ans=max(ans,l=fr());
		in[v]++,as[u].pb({v,calc(w),l});
	}
	
	topsort();
	return 0;
}
```
