---
title: Hdu-Summer-2026-10
date: 2026-08-23 17:13:30
tags:
- 数学
- 莫队
- 分块
---



赛时五题，神秘比赛疑似巨量板子

补DG



# D

[1004 大户爱的干草堆](https://acm.hdu.edu.cn/contest/problem?cid=1238&pid=1004)

$\sum_{i=l}^{r} \gcd ^2(a_i,k)$

首先不管 $l$ $r$ 限制，先推后面的式子
$$
\begin{aligned}
\sum_{i} {\gcd} ^2(a_i,k)&=\sum_{g} g^2 \sum_{i} [\gcd(a_i,k)=g]\\
&=\sum_{g} g^2 \sum_{i} [gcd(\frac {a_i}{g},\frac kg)=1]\\
&=\sum_{g \mid k} g^2 \sum_{i} \sum_{d\mid \frac {a_i}{g},d\mid \frac kg} \mu(d)\\
&=\sum_{gd=t \mid k} \sum_{d \mid t}\mu(d)g^2 \sum_{i} [t \mid a_i]\\
&=\sum_{t \mid k}\sum_{d \mid t} \mu(d)(\frac {t}{d})^2\sum_{i}[t \mid a_i]\\
&=\sum_{t \mid k} f(t) \times (s(t,r)-s(t,l-1))
\end{aligned}
$$
最关键的就是要想到把 $gd$ 绑在一起看成一个新变量处理

前面的 $f_t$ $O(V\sqrt V)$ 预处理，$s(t)$ 枚举序列每个数的约数放入 `vector` ，可以 $O(\log n)$ 查询

总复杂度 $O(V\sqrt V + m\sqrt V \log n)$

```cpp
#include<iostream>
#include<cstdio>
#include<vector>
#define int long long
using namespace std;

const int N=100002;
int T,n,m,cnt;
int a[N],pri[N],miu[N],val[N];
bool tag[N];
vector<int> pos[N];

int get(int x,int t)
{
	if(!pos[t].size()) return 0;
    int l=0,r=pos[t].size()-1,ans=-1;
    while(l<=r)
    {
        int mid=(l+r)>>1;
        if(pos[t][mid]<=x) l=mid+1,ans=mid;
        else r=mid-1;
    }
    return ans+1;
}

signed main()
{
	n=100000;
	miu[1]=1;
	for(int i=2;i<=n;i++)
	{
		if(!tag[i])
		{
			pri[++cnt]=i;
			miu[i]=-1;
		}
		for(int j=1;j<=cnt&&pri[j]*i<=n;j++)
		{
			tag[pri[j]*i]=1;
			if(i%pri[j]==0)
			{
				miu[pri[j]*i]=0;
				break;
			}
			miu[pri[j]*i]=miu[i]*(-1);
		}
	}
	for(int t=1;t<=n;t++)
		for(int d=1;d*d<=t;d++) if(t%d==0)
		{
			val[t]+=miu[d]*(t/d)*(t/d);
			if(d*d!=t)
				val[t]+=miu[t/d]*d*d;
		}
	cin>>T;
	while(T--)
	{
		cin>>n>>m;
		for(int i=1;i<=100000;i++) pos[i].clear();
		for(int i=1;i<=n;i++)
		{
			cin>>a[i];		
			for(int x=1;x*x<=a[i];x++) if(a[i]%x==0)
			{
				pos[x].push_back(i);
				if(x*x!=a[i]) pos[a[i]/x].push_back(i); 
			}
		}
		for(int i=1;i<=m;i++)
		{
			int l,r,k;
			cin>>l>>r>>k;
			int ans=0;
			for(int t=1;t*t<=k;t++) if(k%t==0)
			{
				ans+=val[t]*(get(r,t)-get(l-1,t));
				if(t*t!=k) 
					ans+=val[k/t]*(get(r,k/t)-get(l-1,k/t));
			}
			cout<<ans<<"\n";
		}	
	}
	return 0;
}
```



# G

观察到莫队是容易的，问题转化成维护一个长度为 $m$ 的序列，每次对序列上的某个值 $+ 1 -1$ ，求最小的值 $\leq k$ 的位置，要求 $O(1)$ 修改，查询不能超过根号

我们再次大力分块，考察每次加减的影响

对 $1\sim m$ 分块，每个块维护两个信息：

- `mn`：块内所有 $w_d$ 的最小值
- `cnt[v]`：块内有多少个位置的值等于 $v$

查询时从左到右枚举块。如果 $mn>k$ 那么这个块一定没有答案，直接跳过。找到第一个满足 $mn\le k$ 的块后，再暴力扫描块内的位置，找到第一个 $w_d\le k$ 的 $d$，因此一次查询复杂度为 $O(\sqrt m)$

关键在于如何用 $O(1)$ 时间修改 `mn`。由于每次修改一定是 $+1$ 或 $-1$：

- 如果某个值从 $x$ 变成 $x-1$，直接令 $mn\leftarrow\min(mn,x-1)$

- 如果某个值从 $x$ 变成 $x+1$，只有当 $x=mn$，并且修改后已没有任何位置的值等于 $x$ 时，最小值才会改变，此时新最小值一定是 $x+1$，所以直接令 $mn\leftarrow mn+1$

`cnt` 就是用来判断原来的最小值是否已经全部消失。由于 $w_d$ 可能为负数，所以还需要将所有值统一加上一定偏移量

莫队端点每移动一次的复杂度为 $O(1)$，每个询问寻找答案的复杂度为 $O(\sqrt m)$，总时间复杂度为 $O((n+q)\sqrt n+q\sqrt m)$

```cpp
const int N=1e5+10,M=320;
int n,m,q,l,r,k,len;
int t[N],a[N],val[N],mn[M],res[N],id[N],L[N],R[N];
unordered_map<int,int> cnt[M];
struct node{int l,r,k,id;}query[N];
int C(int x){return (x-1)/len+1;};

//m +1 -1 <=k
//val 记录的是对 ti 的区间和
//cnt 记录的是每个块内，每个val的个数
void add(int x)
{
    cnt[id[t[x]]][val[t[x]]]--;
    val[t[x]]+=a[x];
    cnt[id[t[x]]][val[t[x]]]++;

    if(a[x]<0) mn[id[t[x]]]=min(mn[id[t[x]]],val[t[x]]);
    else if(mn[id[t[x]]]==val[t[x]]-1 && !cnt[id[t[x]]][val[t[x]]-1]) mn[id[t[x]]]=val[t[x]];
}
void del(int x)
{
    cnt[id[t[x]]][val[t[x]]]--;
    val[t[x]]-=a[x];
    cnt[id[t[x]]][val[t[x]]]++;

    if(a[x]>0) mn[id[t[x]]]=min(mn[id[t[x]]],val[t[x]]);
    else if(mn[id[t[x]]]==val[t[x]]-1 && !cnt[id[t[x]]][val[t[x]]-1]) mn[id[t[x]]]=val[t[x]];
}

int get(int k)
{
    for(int i=1;i<=id[m];i++)
    {
        if(mn[i]>k) continue;
        for(int j=L[i];j<=R[i];j++)
            if(val[j]<=k) return j;
    }
    return -1;
}

void solve()
{
    n=fr(),m=fr(),q=fr();
    for(int i=1;i<=n;i++) t[i]=fr();
    for(int i=1;i<=n;i++) a[i]=fr();
    for(int i=1;i<=q;i++)
    {
        l=fr(),r=fr(),k=fr();
        query[i]={l,r,k,i};
    }

    len=350;
    for(int i=1;i<=m;i++) id[i]=C(i);
    for(int i=1;i<=id[m];i++) L[i]=m+1,R[i]=0;
    for(int i=1;i<=m;i++) L[id[i]]=min(L[id[i]],i),R[id[i]]=max(R[id[i]],i);
    auto tmp=[&](node a,node b){return C(a.l)!=C(b.l)?C(a.l)<C(b.l):(C(a.l)&1?a.r<b.r:a.r>b.r);};
    sort(query+1,query+1+q,tmp);
    
	for(int i=0;i<=id[m];i++) cnt[i].clear();
	for(int i=0;i<=id[m];i++) mn[i]=0;
	for(int i=1;i<=m;i++) val[i]=0;
    
    int j=1,i=0;
    for(int g=1;g<=q;g++)
    {
        int l=query[g].l,r=query[g].r;
        while(i<r) add(++i);
        while(i>r) del(i--);
        while(j<l) del(j++);
        while(j>l) add(--j);
        res[query[g].id]=get(query[g].k);
    }
    for(int i=1;i<=q;i++) fw(res[i]),nl;
}
```

