---
title: P9715 「QFOI R1」头
date: 2023-10-05 22:46:07
tags:
- 思维
categories:
- problem
mathjax: true
---

前置题：

[P9117 [春季测试 2023] 涂色游戏 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P9117)

对于这种大段覆盖的问题，都考虑调整操作顺序来优化

考虑每个点，它的颜色一定是 $i$ 行/$j$ 列的颜色中操作较晚的那个

```cpp
const int N=1e5+10;
int n,m,q,op,x,c;
int cx[N],tx[N],cy[N],ty[N];

void solve()
{
	n=fr(),m=fr(),q=fr();
	for(int i=1;i<=n;i++) cx[i]=tx[i]=0;
	for(int i=1;i<=m;i++) cy[i]=ty[i]=0;
	for(int i=1;i<=q;i++)
	{
		op=fr(),x=fr(),c=fr();
		if(!op) cx[x]=c,tx[x]=i;
		else cy[x]=c,ty[x]=i;
	}
	
	for(int i=1;i<=n;i++,nl)
		for(int j=1;j<=m;j++,pt)
			fw((tx[i]>ty[j])?cx[i]:cy[j]);
}

int main()
{
	int T=fr();
	while(T--) solve(); 

	return 0;
}
```

------

我们考虑调整操作顺序，我们可以先从后往前进行完所有 $t=1$ 的操作，再从前往后进行完所有 $t=0$ 的操作

因为 $t=1$ 的优先级更高，所以倒着做可以保证一定强制覆盖，同时 $t=1$ 不会覆盖前面，我们就正着覆盖那些 $t=1$ 剩下的地方

具体来说，我们维护两个 $vector$ 存 $1,2,\ldots,n$ 和 $1,2,\ldots ,m$，每次覆盖一个区间就把这个对应的区间从 $vector$ 里面删掉，可以认为是均摊 $O(n)$ 带一个比较小的常数，当然要用 $erase(it1,it2)$ 这样的删除方式

然后一次染色的贡献就是在行/列 $[l,r]$ 内还没有被染色的长度 $\times$ 列/行剩下的数量

```cpp 
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e6+10;
int n,m,k,q;
int op,l,r,c,t;
int ans[N];
struct node{int op,l,r,c,t;}d[N];
vector<int> vec[2];

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

signed main()
{
	n=fr(),m=fr(),k=fr(),q=fr();
	for(int i=1;i<=n;i++) vec[0].pb(i);
	for(int i=1;i<=m;i++) vec[1].pb(i);
	for(int i=1;i<=q;i++)
		d[i]={fr(),fr(),fr(),fr(),fr()};
	for(int i=q;i;i--)
	{
		if(!vec[0].size() || !vec[1].size()) break;
		if(d[i].t)
		{
			if(d[i].op&1)
			{
				auto p1=lower_bound(vec[0].begin(),vec[0].end(),d[i].l);
				auto p2=upper_bound(vec[0].begin(),vec[0].end(),d[i].r);
				ans[d[i].c]+=(p2-p1)*vec[1].size(); //p2-1-p1+1=p2-p1 这样写还可以防越界
				vec[0].erase(p1,p2);
			}
			else
			{
				auto p1=lower_bound(vec[1].begin(),vec[1].end(),d[i].l);
				auto p2=upper_bound(vec[1].begin(),vec[1].end(),d[i].r);
				ans[d[i].c]+=(p2-p1)*vec[0].size();
				vec[1].erase(p1,p2);
			}
		}
	}
	
	for(int i=1;i<=q;i++)
	{
		if(!vec[0].size() || !vec[1].size()) break;
		if(!d[i].t)
		{
			if(d[i].op&1)
			{
				auto p1=lower_bound(vec[0].begin(),vec[0].end(),d[i].l);
				auto p2=upper_bound(vec[0].begin(),vec[0].end(),d[i].r);
				ans[d[i].c]+=(p2-p1)*vec[1].size();
				vec[0].erase(p1,p2);
			}
			else
			{
				auto p1=lower_bound(vec[1].begin(),vec[1].end(),d[i].l);
				auto p2=upper_bound(vec[1].begin(),vec[1].end(),d[i].r);
				ans[d[i].c]+=(p2-p1)*vec[0].size();
				vec[1].erase(p1,p2);
			}
		}
	}
	for(int i=1;i<=k;i++) fw(ans[i]),pt;
	return 0;
}
```

