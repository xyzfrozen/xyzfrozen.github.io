---
title: 杂题精选 Oct.1 The best People in life are free!
date: 2023-10-24 22:49:56
tags:
- 状压 Dp
- 图论
- 并查集
- 区间 Dp
- 最短路
- 思维
- 线段树二分
- MST
- Topsort
categories:
- problem
mathjax: true
---

太忙了，直接简写

[P8779 [蓝桥杯 2022 省 A\] 推导部分和 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8779)

并查集经典应用

图论建模，然后考虑到一个类似树上两点求距离的办法，钦定连通块的头，然后用带权并查集查询两点距离

```cpp
const int N=1e5+10;
int n,m,k,l,r,s;
int p[N],d[N];
vector<pi> as[N];

int find(int x)
{
	if(x!=p[x])
	{
		int rt=find(p[x]);
		d[x]+=d[p[x]];
		p[x]=rt;
	}
	return p[x];
}

signed main()
{
	n=fr(),m=fr(),k=fr();
	for(int i=1;i<=n;i++) p[i]=i;
	for(int i=1;i<=m;i++)
	{
		l=fr()-1,r=fr(),s=fr();
		int px=find(l),py=find(r);
		if(px^py)
		{
			p[px]=py;
			d[px]=d[r]-d[l]-s;
			//d[y]-d[px]-d[x]=s	
		}
	}
	
	while(k--)
	{
		l=fr()-1,r=fr();
		int px=find(l),py=find(r);
		if(px^py) puts("UNKNOWN");
		else fw(d[r]-d[l]),nl;
	}

	return 0;
}
```

[P9746 「KDOI-06-S」合并序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P9746)

关键性质就是 $[l,r]$ 剩下的点权一定是 $\oplus_{l \leq i \leq r} a_i$

基本按这篇 [题解](https://www.luogu.com.cn/blog/YunQian/solution-p9746) 写的 $O(n^4)$ 方法，注意 $map$ 的排序！！！

$f_{l,r}$ $[l,r]$ 是否可以缩成一个点，$g_{l,r,v}$ $[l,r]$ 是否有一个子区间可以缩成权值为 $v$ 的点，`biset` 优化一下

输出方案稍微有点不同

```cpp
const int N=510,M=512+16;
int n;
bitset<M> f[N],g[N][N],vf[N],vg[N][N];
int a[N],s[N];
vector<pi> pos[M];
struct node{int x,y,z;};
vector<node> ans;
pi pre[N][N];
map<tuple<int,int,int>,pi> Gp;

void init()
{
	for(int i=0;i<=n+1;i++)
	{
		f[i].reset(),vf[i].reset();
		for(int j=i;j<=n+1;j++)
		{
			g[i][j].reset(),vg[i][j].reset();
			pre[i][j]={0,0};
		}
	}
	for(int i=0;i<=512;i++) pos[i].clear();
	for(int i=1;i<=n;i++)
		for(int j=i;j<=n;j++)
			pos[s[j]^s[i-1]].pb({i,j});
	for(int i=0;i<=512;i++)
		if(pos[i].size())
			sort(pos[i].begin(),pos[i].end());
	Gp.clear(),ans.clear();
}

bool F(int l,int r);
bool G(int l,int r,int v);

bool G(int l,int r,int v)
{
	if(l==r)
	{
		if(v==a[l]) Gp[{l,r,v}]={l,l};
		return (v==a[l]);
	}
	if(vg[l][r][v]) return g[l][r][v];
	vg[l][r][v]=1;
	
	auto it=pos[v].begin();
	while(it!=pos[v].end())
	{
		int L=it->first,R=it->second;
		if(L>=l && R<=r && F(L,R))
		{
			Gp[{l,r,v}]={L,R};
			return g[l][r][v]=1;
		}
		it++;
	}
	return g[l][r][v]=0;
}

bool F(int l,int r)
{
	if(l==r) return 1;
	if(vf[l][r]) return f[l][r];
	vf[l][r]=1;
	
	for(int p=l;p<r-1;p++)
	{
		if(!F(l,p)) continue;
		for(int q=r;q>=p+2;q--)
		{
			if(!F(q,r)) continue;
			if(!G(p+1,q-1,(s[p]^s[l-1])^(s[r]^s[q-1]))) continue;
			pre[l][r]={p,q};
			return f[l][r]=1;
		}
	}
	return f[l][r]=0;
}

void dfs(int l,int r)
{
	if(l>=r) return;
	int p=pre[l][r].fi,q=pre[l][r].se;
	tuple<int,int,int> t={p+1,q-1,(s[p]^s[l-1])^(s[r]^s[q-1])};
	int L=Gp[t].fi,R=Gp[t].se;
//	fw(l),pt,fw(L),pt,fw(R),pt,fw(r),pt,fw(p),pt,fw(q),nl;
//	if(L>r) return;
	dfs(l,p),dfs(L,R),dfs(q,r);
	ans.push_back({l,L,r});
}

void solve()
{
	n=fr();
	for(int i=1;i<=n;i++)
		a[i]=fr(),s[i]=s[i-1]^a[i];
	init();
	if(!F(1,n)) {puts("Shuiniao");return;}
	puts("Huoyu");
	dfs(1,n);
	fw(ans.size()),nl;
	vector<int> t(0);
	for(int i=0;i<=n;i++) t.pb(i);
	for(auto it:ans)
	{
		auto x=lower_bound(t.begin(),t.end(),it.x);
		auto y=lower_bound(t.begin(),t.end(),it.y);
		auto z=lower_bound(t.begin(),t.end(),it.z);
		fw(x-t.begin()),pt,fw(y-t.begin()),pt,fw(z-t.begin()),nl;
		t.erase(x,z);
	}
}

int main()
{
	int T=fr();
	while(T--) solve();

	return 0;
}
```

[P4996 咕咕咕 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4996)

子集问题拆贡献就行了，设 $f_i$ 为选出 $i$ 个 $1$ 的路径方案数
$$
f_i =\Sigma_{j=0}^{i-1} C_{i,i-j} \times f_j
$$


组合数是因为可以做一个子集

```cpp
const int N=22,M=(1<<20)+10,Q=998244353;
int n,m,ans;
int w[M],f[N],C[N][N],sz[M];

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		int S=0;char c;
		for(int j=0;j<n;j++)
			cin>>c,S|=((c-'0')<<j);
		w[S]=fr();
	}
	for(int S=1;S<=(1<<n)-1;S++)
		sz[S]=sz[S>>1]+(S&1);
	for(int i=0;i<=n;i++)
		for(int j=0;j<=i;j++)
		{
			if(!j) C[i][j]=1;
			else C[i][j]=(C[i-1][j]+C[i-1][j-1])%Q;
		}
	f[0]=1;
	for(int i=1;i<=n;i++)
		for(int j=0;j<i;j++)
			mod(f[i],f[j]*C[i][j]%Q);
	for(int S=0;S<=(1<<n)-1;S++)
		mod(ans,w[S]*f[sz[S]]%Q*f[n-sz[S]]%Q);
	fw(ans);
	return 0;
}
```

[P6239 [JXOI2012\] 奇怪的道路 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P6239)

类似[P2157 [学校食堂](https://www.luogu.com.cn/problem/P2157) 这个题，考虑到每个点只关心度数的奇偶性，$i$ 最多印象到 $i-k$，直接设 $f_{i,j,S}$ 表示考虑前 $i$ 个点，用了 $j$ 条边，$[i-k,i]$ 的度数奇偶状态为 $S$ 的方案数

我们为了无后效性，按照 $i-k \sim i-1$ 的顺序连边，这样**按顺序枚举**保证**不重不漏**！！

[? (cnblogs.com)](https://www.cnblogs.com/-OMA-/p/14825580.html)

```cpp
const int N=32,Q=1e9+7,M=1<<9;
int n,m,k;
int f[N][N][M];

int main()
{
	n=fr(),m=fr(),k=fr();
	f[1][0][0]=1;
	for(int i=1;i<=n;i++)
	{
		for(int l=max(1,i-k);l<=i-1;l++)
			for(int j=1;j<=m;j++)
				for(int S=0;S<=(1<<k+1)-1;S++)
					mod(f[i][j][S],f[i][j-1][S^1^(1<<i-l)]);
		for(int j=0;j<=m;j++)
			for(int S=0;S<=(1<<k)-1;S++)
				f[i+1][j][S<<1]=f[i][j][S];
	}
				
	fw(f[n][m][0]);
	return 0;
}
```

[P8186 [USACO22FEB\] Redistributing Gifts S - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P8186)

传递闭包！！！

$f_{i,j}$ 表示 $(i,j)$ 可以交换礼物

```cpp
const int N=510;
int n;
int gft[N][N];
bitset<512> f[N];
vector<int> as[N];

int main()
{
	n=fr();
	for(int i=1;i<=n;i++)
		for(int j=1;j<=n;j++)
			gft[i][j]=fr();
	for(int i=1;i<=n;i++)
		for(int j=1;j<=n;j++)
		{
			f[i][gft[i][j]]=1;
			if(gft[i][j]==i) break;
		}
	for(int k=1;k<=n;k++)
		for(int i=1;i<=n;i++)
			for(int j=1;j<=n;j++)
			{
				bool g=f[i][j];
				g|=f[i][k]&f[k][j];
				f[i][j]=g;
			}
	for(int i=1;i<=n;i++)
		for(int j=1;j<=n;j++)
			if(f[i][gft[i][j]] && f[gft[i][j]][i])
				{fw(gft[i][j]),nl;break;}
	return 0;
}
```

[P5837 [USACO19DEC\] Milk Pumping G - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5837)

不好算 $\min f$ 直接枚举！！！！

最多 $m$ 种，然后按照 $c$ 跑 $dij$ 即可

```cpp
const int N=1e3+10;
int n,m,u,v,c,f,ans;
int d[N],p[N];
struct node{int v,c,f;};
vector<node> as[N];
vector<int> w;

int dij(int F)
{
	priority_queue<pi,vector<pi>,greater<pi>> q;
	memset(d,0x3f,sizeof d);
	memset(p,0,sizeof p);
	d[1]=0;
	q.push({0,1});
	
	while(q.size())
	{
		auto t=q.top();
		q.pop();
		
		int x=t.second;
		if(p[x]) continue;
		p[x]=1;
		
		go(it)
		{
			int v=it.v,f=it.f,c=it.c;
			if(f>=F && d[v]>d[x]+c)
			{
				d[v]=d[x]+c;
				q.push({d[v],v});
			}
		}
	}
	return d[n];
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),c=fr(),w.pb(f=fr());
		as[u].pb({v,c,f}),as[v].pb({u,c,f});
	}
	sort(w.begin(),w.end());
	w.erase(unique(w.begin(),w.end()),w.end());
	for(auto f:w)
	{
		int t=dij(f);
		if(t!=0x3f3f3f3f) ans=max(ans,1.0*f/t*1000000);
	}
	fw(ans);
	return 0;
}
```

[Keshi in Search of AmShZ - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1693C)

先考虑是一个 $DAG$ 怎么做，我们从 $1$ 走到 $n$ 不好走，就从 $n$ 走到 $1$ !!!

设 $d_x$ 为

$x$ 的后驱 $(v_1,v_2,\cdots,v_k)$ 我们按照 $d$ 对他们升序排序，则选择 $v_i$ 的代价是 $d_{v_i}+k-i$，因为随机走等价于走最坏的一条

考虑到 `dij` 的算法恰好就是按照升序取出来节点的，我们直接建反图跑即可

```cpp
const int N=2e5+10;
int n,m,u,v;
int d[N],out[N],p[N];
vector<int> as[N];

void dij()
{
	priority_queue<pi,vector<pi>,greater<pi>> q;
	q.push({0,n});
	memset(d,0x3f,sizeof d);
	d[n]=0;
	
	while(q.size())
	{
		auto t=q.top();
		q.pop();
		
		int x=t.second;
		if(p[x]) continue;
		p[x]=1;
		
		go(v)
		{
			if(d[v]>d[x]+out[v])
			{
				d[v]=d[x]+out[v];
				q.push({d[v],v});
			}
			out[v]--;
		}
	}
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr();
		as[v].pb(u);
		out[u]++;
	}
	
	dij();
	fw(d[1]);
	return 0;
}
```



[Range Sorting (Hard Version) - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/CF1827B2)

[codeforces.com/blog/entry/116109](https://codeforces.com/blog/entry/116109)

[cf1827B2 - liuzhaoxu - 博客园 (cnblogs.com)](https://www.cnblogs.com/Lour688/p/17403276.html)

```cpp
const int N=3e5+10;
int n,top,ans,inf=1e18;
int a[N],Lmn[N],Rmn[N],ak[N];
struct node{
	int l,r;
	int v;
}tr[N*4];

void build(int ql,int qr,int idx)
{
	tr[idx]={ql,qr};
	if(ql==qr)
	{
		tr[idx].v=a[ql];
		return;
	}
	
	int mid=(ql+qr)>>1;
	build(ql,mid,idx<<1);
	build(mid+1,qr,idx<<1|1);
	tr[idx].v=max(tr[idx<<1].v,tr[idx<<1|1].v);
}

int find(int ql,int qr,int idx,int x)
{
    node &t=tr[idx];
    if(t.r<ql || t.l>qr) return inf;
    if(t.v<x) return inf;
    if(t.l==t.r) return t.l;
    
    int res=find(ql,qr,idx<<1|1,x);
    if(res!=inf) return res;
    return find(ql,qr,idx<<1,x);
}

void solve()
{
	n=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	
	ak[top=0]=0;
	for(int i=1;i<=n;i++)
	{
		while(top && a[ak[top]]>=a[i]) top--;
		Lmn[i]=ak[top];
		ak[++top]=i;
	}
	
	ak[top=0]=n+1;
	for(int i=n;i;i--)
	{
		while(top && a[ak[top]]>=a[i]) top--;
		Rmn[i]=ak[top];
		ak[++top]=i;
	}
	
	ans=0;
	for(int i=1;i<=n;i++)
		ans+=(i-1)*(n-i+1);
	
	a[0]=2e9;
	build(0,n,1);
	for(int i=1;i<=n;i++)
	{
		if(!Lmn[i]) continue;
		ans-=(Lmn[i]-find(0,Lmn[i]-1,1,a[i]))*(Rmn[i]-i);
	}
	fw(ans),nl;
}

signed main()
{
	int T=fr();
	while(T--) solve();

	return 0;
}
```

[P2573 [SCOI2012\] 滑雪 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2573)

先从 $1$ 开始搜出连通块，然后按高度跑 $kru$ 即可，这样保证了连通性，同时保证了最优

```cpp
const int N=1e5+10,M=2e6+10;
int n,m,u,v,w,cnt,idx,ans;
int h[N],p[N],vis[N];
vector<pi> as[N];
struct node{
	int u,v,w;
	bool operator<(const node&Q)const{
		return (h[v]==h[Q.v])?(w<Q.w):(h[v]>h[Q.v]);
	}
}ed[M];

void dfs(int x)
{
	vis[x]=1;
	cnt++;
	go(it)
	{
		ed[++idx]={x,it.first,it.second};
		if(!vis[it.first]) dfs(it.first);
	}
}

int find(int x)
{
	if(x!=p[x]) p[x]=find(p[x]);
	return p[x];
}

void solve()
{
	for(int i=1;i<=n;i++) p[i]=i;
	m=idx;
	sort(ed+1,ed+1+m);
	for(int i=1;i<=m;i++)
	{
		u=ed[i].u,v=ed[i].v,w=ed[i].w;
		int px=find(u),py=find(v);
		if(px^py)
		{
			p[px]=py;
			ans+=w;
		}
	}
	
	fw(cnt),pt,fw(ans);
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) h[i]=fr();
	for(int i=1;i<=m;i++)
	{
		u=fr(),v=fr(),w=fr();
		if(h[u]>=h[v]) as[u].pb({v,w});
		if(h[v]>=h[u]) as[v].pb({u,w});
	}
	dfs(1);
	solve();
	return 0;
}
```

[P6286 [COCI2016-2017#1\] Cezar - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P6286)

按照最后的排名比较相邻的两个字符串的**第一个不同字符**，这样就可以就可以得到两个字符的字典序关系

根据关系图论建模，`Topsort` 即可

注意判断下面这种情况

```
ddd rank5 
dddd rank4
```

```cpp
const int N=110;
int n,cnt;
int a[N],in[27],ans[27];
char res[27];
char s[N][N];
vector<int> as[27];

void topsort()
{
	queue<int> q;
	for(int i=1;i<=26;i++)
		if(!in[i]) q.push(i);
	
	while(q.size())
	{
		int x=q.front();
		q.pop();
		
		ans[++cnt]=x;
		go(v)
			if(!(--in[v]))
				q.push(v);
	}
	
	if(cnt<26) puts("NE");
	else
	{
		puts("DA");
		for(int i=1;i<=26;i++)
			res[ans[i]]=i;
		for(int i=1;i<=26;i++)
			putchar(res[i]-1+'a');
	}
}

int main()
{
	n=fr();
	for(int i=1;i<=n;i++) scanf("%s",s[i]);
	for(int i=1;i<=n;i++) a[i]=fr();
	
	for(int i=1;i<n;i++)
	{
		int p=a[i],q=a[i+1];
		bool fl=0;
		for(int k=0;s[p][k] && s[q][k];k++)	
			if(s[p][k]!=s[q][k])
			{
				as[s[p][k]-'a'+1].pb(s[q][k]-'a'+1);
				fl=1;break;
			}
		if(!fl && strlen(s[p])>strlen(s[q])) {puts("NE");return 0;}
	}
	for(int i=1;i<=26;i++)
	{
		sort(as[i].begin(),as[i].end());
		as[i].erase(unique(as[i].begin(),as[i].end()),as[i].end());
		for(auto v:as[i]) in[v]++;
	}
	
	topsort();
	return 0;
}
```

