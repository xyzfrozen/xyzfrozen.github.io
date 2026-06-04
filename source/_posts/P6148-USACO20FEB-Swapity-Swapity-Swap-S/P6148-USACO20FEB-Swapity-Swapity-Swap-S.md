---
title: P6148 [USACO20FEB] Swapity Swapity Swap S
date: 2023-10-12 23:54:19
tags:
- 倍增
- 循环节
categories:
- problem
mathjax: true
---

$Sol1$ 

考虑倍增，我们跑一次是 $O(nm)$ 的，直接倍增跑路即可

首先强行记录一次，记录每个点到了哪个位置，倍增转移一下即可

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10,M=110,K=31;
int n,m,k;
int L[M],R[M],p[N],ans[K][N];

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

int main()
{
	n=fr(),m=fr(),k=fr();
	for(int i=1;i<=m;i++)
		L[i]=fr(),R[i]=fr();
	for(int i=1;i<=n;i++) p[i]=i;
	for(int i=1;i<=m;i++)
		reverse(p+L[i],p+R[i]+1);
	for(int i=1;i<=n;i++)
		ans[0][p[i]]=i;
	int t=log2(k)+1;
	for(int q=1;q<=t;q++)
		for(int i=1;i<=n;i++)
			ans[q][i]=ans[q-1][ans[q-1][i]];
	for(int i=1;i<=n;i++)
	{
		int now=i;
		for(int j=t;~j;j--)
			if((k>>j)&1) now=ans[j][now];
		p[now]=i;
	}
	for(int i=1;i<=n;i++) fw(p[i]),nl;
	return 0;
}
```

$Sol2$

循环节，这么大的 $K$ 肯定找循环节

同样暴力做一遍然后记录每个点到了哪里，类似建边的方式跑 $dfs$ 搜出来每个置换环，并记录环的元素

对于每个环的元素直接可以算出 $K$ 步后到了哪里

xxxxxxxxxx #include<bits/stdc++.h>#define pt putchar(' ')#define nl puts("")#define pi pair<int,int>#define fi first#define se second#define pb push_back#define go(it) for(auto &it:as[x])using namespace std;​const int N=3e5+10;int n,m,u,v,w,l,k,cnt,ans;int pr[N],vis[N],in[N],f[N];struct node{int v,id,l;};vector<node> as[N];unordered_map<int,int> S;unordered_map<int,int> match;map<pi,int> d;​int fr(){    int x=0,flag=1;    char ch=getchar();    while(ch<'0' || ch>'9'){        if(ch=='-') flag=-1;        ch=getchar();    }    while(ch>='0' && ch<='9'){        x=x*10+(ch-'0');        ch=getchar();    }    return x*flag;}void fw(int x){    if(x<0) putchar('-'),x=-x;    if(x>9) fw(x/10);    putchar(x%10+'0');}int max(int a,int b){return a>b?a:b;}int min(int a,int b){return a<b?a:b;}​void prework(int n){    for(int i=2;i<=n;i++)    {        if(!vis[i]) pr[++cnt]=i,vis[i]=i;        for(int j=1;pr[j]<=n/i;j++)        {            vis[i*pr[j]]=pr[j];            if(!(i%pr[j])) break;        }    }}​int calc(int x){    S.clear();    while(x>1)    {        S[vis[x]]++;        x/=vis[x];    }    int val=1,to=1;    for(auto it:S)    {        val*=pow(it.fi,it.se%k);        to*=pow(it.fi,(k-it.se%k)%k);    }        match[val]=to;    return val;}​void topsort(){    queue<int> q;    for(int i=1;i<=n;i++)        if(!in[i]) q.push(i);        while(q.size())    {        int x=q.front();        q.pop();​        go(it)        {            int v=it.v,id=it.id,l=it.l;            if(d[{v,id}]<d[{x,match[id]}]+l)                ans=max(ans,d[{v,id}]=d[{x,match[id]}]+l);            if(!(--in[v])) q.push(v);        }    }    fw(ans);}​int main(){    n=fr(),m=fr(),k=fr();    prework(N-10);    for(int i=1;i<=m;i++)    {        u=fr(),v=fr(),w=fr(),ans=max(ans,l=fr());        in[v]++,as[u].pb({v,calc(w),l});    }        topsort();    return 0;}cpp

![image-20231013001559876](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310130016959.png)
