---
title: Borůvka
date: 2023-10-13 23:13:20
tags:
- 最小生成树
- Trie
categories:
- note
mathjax: true
---

## Borůvka

$O(m\log n)$ 求 $MST$，一般用于求完全图

$Borůvka$ 其实是一种多路增广的 $prim$

$Prim$ 算法由一个点开始，往外不断贪心地找最短边，然后不断扩大连通块，直到形成一棵树

而 $Borůvka$ 算法每一次的增广，会对现在的每一个连通块都找一遍的最短边，最后每个连通块择优，将这些边全部连上

1. 对于现在的每个连通块，找到从这个连通块出发，不在最小生成树中的、到达别的连通块的最短边

（注：若权值相同，则需要再按照另一个维度严格排序，常用标号大小排序。即边权相同时，认为编号小的边短。这样处理是为了避免两个连通块互相连的时候出现环）

2. 全部找完后，将这些边加入最小生成树中，并查集合并

每次合并 $O(m)$，连通块个数至少减半，所以最多合并 $O(\log n)$ 次，重点就在第一步，复杂度是 $O(T\log n)$ 的，$O(T)$ 为第一步复杂度，这里就是 $O(m)$

## 模板

```cpp
const int N=5e3+10,M=2e5+10;
int n,m,u,v,w[M];
int p[N],cur[N];
bool used[M];
struct node{int u,v;}ed[M];

void Bka()
{
	for(int i=1;i<=n;i++) p[i]=i;
	int res=0,cnt=0;
	bool fl=1;
	while(fl)
	{
		memset(cur,0,sizeof cur);
		fl=0;
		
		for(int i=1;i<=m;i++)
		{
			if(used[i]) continue;
			int a=ed[i].u,b=ed[i].v;
			int x=find(a),y=find(b);
			if(x!=y)
			{
				if(!cur[x] || w[cur[x]]>w[i]) cur[x]=i;
				if(!cur[y] || w[cur[y]]>w[i]) cur[y]=i;
			}
		}
		
		for(int i=1;i<=n;i++)
		{
			if(cur[i] && !used[cur[i]])
			{
				int a=ed[cur[i]].u,b=ed[cur[i]].v;
				int x=find(a),y=find(b);
				if(x!=y)
				{
					fl=1;
					cnt++,res+=w[cur[i]];
					p[x]=y;
					used[cur[i]]=1;
				}
			}
		}
		if(cnt==n-1) break;
	}
	if(cnt==n-1) fw(res);
	else puts("orz");
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),w[i]=fr();
		ed[i]={u,v};
	}
	Bka();

	return 0;
}
```

----------

## problem

**CF Xor-MST**

考虑 $Boruvka$

每次对于一个连通块找到一个连通块外的异或最小的一个数，考虑用 $Trie$ 维护和查询，维护一个所有数构成的 $Trie$，以及每个连通块一个 Trie

每次查询连通块 $S$ 的答案时，把所有 $a_i \in S$ 从整颗 $Trie$ 里面删去，然后枚举每个 $a_i \in S$ 查询即可

合并时暴力合并两个 Trie，注意到总节点个数最多为 $n\log n$ ，合并时每到一个节点即删去一个节点，因此是均摊 $O(n\log n)$ 的

求第一步是 $O(n\log a)$ 的，总复杂度 $O(n\log a\log n)$

这题卡常，删除操作不要直接节点置 $0$，判断是否有即可，$ins/del$ 直接在该节点被遍历次数 $+-$ 即可

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,ans,cnt,inf=1e18;
int a[N],col[N];
vector<int> mem[N];

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

struct Edge{int u,v,w;}Ed[N];
struct Dsu
{
    int p[N];
    void init(){for(int i=1;i<=n;i++) p[i]=i;}
    int find(int x)
    {
        if(p[x]!=x) p[x]=find(p[x]);
        return p[x];
    }

    void merge(int x,int y)
    {
        int px=find(x),py=find(y);
        if(px^py) p[px]=py;
    }
}T;

struct Trie
{
    int tr[N*30][2],id[N*30],q[N*30],idx;
    Trie(){memset(tr,0,sizeof tr),idx=0;}
    void modify(int x,int name)
    {
        int now=0;
        for(int i=29;~i;i--)
        {
            int word=(x>>i)&1;
            if(!tr[now][word]) tr[now][word]=++idx;
            now=tr[now][word];
            q[now]++;
        }
        id[now]=name;
    }

    void ins(int x)
    {
        int now=0;
        for(int i=29;~i;i--)
        {
            int word=(x>>i)&1;
            now=tr[now][word];
            q[now]++;
        }
    }

    void del(int x)
    {
        int now=0;
        for(int i=29;~i;i--)
        {
            int word=(x>>i)&1;
            now=tr[now][word];
            q[now]--;
        }
    }

    int query(int x)
    {
        int now=0,res=0;
        for(int i=29;~i;i--)
        {
            int word=(x>>i)&1;
            if(q[tr[now][word]]) now=tr[now][word];
            else now=tr[now][word^1];
        }
        return id[now];
    }
}Tr;

signed main()
{
    n=fr();
    for(int i=1;i<=n;i++) a[i]=fr();
    sort(a+1,a+1+n);
    n=unique(a+1,a+1+n)-a-1;
    for(int i=1;i<=n;i++) Tr.modify(a[i],i);

    T.init();
    bool fl=1;
    while(fl)
    {
        fl=0;
        int cur=0;
        for(int i=1;i<=n;i++)
            if(T.find(i)==i) col[i]=++cur;
        if(cur==1) break;
        for(int i=1;i<=n;i++)
            mem[col[T.find(i)]].pb(i);
        for(int i=1;i<=cur;i++)
        {
            int res=inf;
            for(auto &v:mem[i]) Tr.del(a[v]);
            for(auto &v:mem[i]) 
            {
                int to=Tr.query(a[v]);
                if((a[v]^a[to])<res)
                    res=a[v]^a[to],Ed[i]={v,to,a[v]^a[to]};
            }
            for(auto &v:mem[i]) Tr.ins(a[v]);
            mem[i].clear();
        }
        for(int i=1;i<=cur;i++)
        {
            int u=Ed[i].u,v=Ed[i].v,w=Ed[i].w;
            int px=T.find(u),py=T.find(v);
            if(px^py) fl=1,ans+=w,T.p[px]=py,cnt++;
        }
        if(cnt==n-1) break;
    }
    fw(ans);
    return 0;
}
```

