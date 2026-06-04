---
title: 杂题精选 Oct.2 数据结构萌萌题
date: 2023-10-28 21:29:31
tags:
- 线段树
- Trie
- 思维
- 分治
- 双指针
- 树形 Dp
- 线段树二分
- 数学
categories:
- problem
mathjax: true
---

[P4344 [SHOI2015\] 脑洞治疗仪](https://www.luogu.com.cn/problem/P4344)

操作

1. 区间赋值
2. 区间查询 $1$ 的个数，区间赋值
3. 区间最大区间 $0$ 值

操作 $3$ 可视为区间最大字段和，维护 $(vl,vr,v)$

操作 $2$ 需要维护区间 $0$ 的个数，并且我们需要线段树二分找到 $(l_2,r_2)$ 中第一个 $cnt_0 \geq one$ 的地方

综上维护 $0$ 的个数，类区间最大字段和，和 $assign$ 操作的 $Tag$

注意线段树二分的时候还要加上 $[1,l_2-1]$ 的 $cnt_0$，因为我们是在 $[1,n]$ 这个区间递归进去的

```cpp
modify(l2,find(l2,r2,1,one+((l2==1)?(0):sum(1,l2-1,1))),1,1);
```

```cpp
const int N=2e5+10;
int n,m,op,l,r;
struct node{
	int l,r;
	int vl,vr,v,cnt;
	int tag;
	node(){}
	node(int l,int r,int vl=0,int vr=0,int v=0,int cnt=0,int tag=-1):
		l(l),r(r),vl(vl),vr(vr),v(v),cnt(cnt),tag(tag){}
}tr[N*4];

void chf(int idx)
{
	node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
	t.vl=ls.vl+((ls.vl==ls.r-ls.l+1)?rs.vl:0);
	t.vr=rs.vr+((rs.vr==rs.r-rs.l+1)?ls.vr:0);
	t.cnt=ls.cnt+rs.cnt;
	t.v=max({ls.v,rs.v,ls.vr+rs.vl});
}

void chs(int idx)
{
	node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
	if(!(~t.tag)) return;
	if(t.tag) 
		ls.vl=ls.vr=ls.v=ls.cnt=0,
		rs.vl=rs.vr=rs.v=rs.cnt=0;
	if(!t.tag) 
		ls.vl=ls.vr=ls.v=ls.cnt=ls.r-ls.l+1,
		rs.vl=rs.vr=rs.v=rs.cnt=rs.r-rs.l+1;
	
	ls.tag=rs.tag=t.tag;
	t.tag=-1;
}

void build(int ql,int qr,int idx)
{
	tr[idx]=node(ql,qr);
	if(ql==qr) return;
	int mid=(ql+qr)>>1;
	build(ql,mid,idx<<1);
	build(mid+1,qr,idx<<1|1);
}

void modify(int ql,int qr,int idx,int x)
{
	node &t=tr[idx];
	if(ql<=t.l && qr>=t.r)
	{
		t.tag=x;
		x=(x!=0)?(0):(t.r-t.l+1);
		t.vl=t.vr=t.v=t.cnt=x;
		return;
	}
	
	chs(idx);
	int mid=(t.l+t.r)>>1;
	if(ql<=mid) modify(ql,qr,idx<<1,x);
	if(qr>mid) modify(ql,qr,idx<<1|1,x);
	chf(idx);
}

int sum(int ql,int qr,int idx)
{
	node &t=tr[idx];
	if(ql<=t.l && qr>=t.r)
		return t.cnt;
	
	chs(idx);
	int mid=(t.l+t.r)>>1,s=0;
	if(ql<=mid) s+=sum(ql,qr,idx<<1);
	if(qr>mid) s+=sum(ql,qr,idx<<1|1);
	return s;
}

int find(int ql,int qr,int idx,int x)
{
	node &t=tr[idx];
	if(t.r<ql || t.l>qr) return -1;
	if(t.cnt<x) return -1;
	if(t.l==t.r) return t.l;
	
	chs(idx);
	int res=find(ql,qr,idx<<1,x);
	if(~res) return res;
	return find(ql,qr,idx<<1|1,x-tr[idx<<1].cnt);
}

void move(int l1,int r1,int l2,int r2)
{
	int one=r1-l1+1-sum(l1,r1,1);
	if(!one) return;
	modify(l1,r1,1,0);
	if(one>=sum(l2,r2,1)) return void(modify(l2,r2,1,1));
	modify(l2,find(l2,r2,1,one+((l2==1)?(0):sum(1,l2-1,1))),1,1);
}

node query(int ql,int qr,int idx)
{
	node &t=tr[idx];
	if(ql<=t.l && qr>=t.r)
		return t;
	
	chs(idx);
	int mid=(t.l+t.r)>>1;
	if(qr<=mid) return query(ql,qr,idx<<1);
	if(ql>mid) return query(ql,qr,idx<<1|1);
	node ans=node(ql,qr),ls=query(ql,qr,idx<<1),rs=query(ql,qr,idx<<1|1);
	ans.vl=ls.vl+((ls.vl==ls.r-ls.l+1)?rs.vl:0);
	ans.vr=rs.vr+((rs.vr==rs.r-rs.l+1)?ls.vr:0);
	ans.v=max({ls.v,rs.v,ls.vr+rs.vl});
	return ans;
}

int main()
{
	n=fr(),m=fr();
	build(1,n,1);
	for(int i=1;i<=m;i++)
	{
		op=fr(),l=fr(),r=fr();
		if(!op) modify(l,r,1,0);
		else if(op&1)
		{
			int _l=fr(),_r=fr();
			move(l,r,_l,_r);
		}
		else fw(query(l,r,1).v),nl;
	}

	return 0;
}
```



[P5021 [NOIP2018 提高组\] 赛道修建](https://www.luogu.com.cn/problem/P5021)

说下部分分

$m=1$ 树的直径

链直接二分答案，区间 $sum\geq mid$，就划分，判断段数 $\geq m$ 即可

菊花图同理，把所有边加入 $set$，$\geq mid$ 单独做，否则二分找 $x-mid$ 匹配

正解同样二分 $mid$

设 $f_i$ 为当前子树内 $\geq mid$ 的路径，$g_i$ 为以 $i$ 为结尾的最长链（不一定要到叶子）

我们首要目标是最大化 $f_i$，因为一条链不管多长都只能贡献 $1$

则如果 $f_v +w \geq mid$ 直接成为路径，否则加入 `multiset` 维护链

在 `multiset` 里面两两匹配即可，匹配不了就算入 $g_i$

```cpp
const int N=5e4+10;
int n,m,u,v,w,s;
int f[N],g[N];
vector<pi> as[N];

void dfs(int x,int rt,int mid)
{
	multiset<int> s;
	go(it)
	{
		int v=it.first,w=it.second;
		if(v==rt) continue;
		dfs(v,x,mid);
		f[x]+=f[v];
		if(g[v]+w>=mid) f[x]++;
		else s.insert(g[v]+w);
	}
	
	if(!s.size()) return;
	while(s.size())
	{
		int L=*s.begin();
		s.erase(s.begin());
		auto i=s.lower_bound(mid-L);
		if(i==s.end()) g[x]=max(g[x],L);
		else s.erase(i),f[x]++;
	}
}

bool check(int x)
{
	memset(f,0,sizeof f);
	memset(g,0,sizeof g);
	dfs(1,-1,x);
	return f[1]>=m;
}
```



[DZY Loves Fibonacci Numbers](https://www.luogu.com.cn/problem/CF446C)

[CF446C线段树+斐波那契数列 - H0ndomach1 的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/H0ndomach1/cf446c-xian-duan-shu-fei-bo-nei-qie-shuo-lie)

刚开始的 $a$ 没啥用，算答案的时候加上就行了

性质：

1. 两个斐波那契数列相加仍是广义斐波那契数列
2. 设斐波那契数列为 $f$，则广义斐波那契数列 $F$ 通式 $F_i=F_1 \times f_{i-2} + F_2 \times f_{i-1}$
3. 广义斐波那契数列前缀和 $S_i=F_{i+2}-F_2$

区间赋值可以用性质 $1$ 解决，因为只关心区间 $sum$

如何下传标记？

我们观察到只需要记录 $F_1$ 和 $F_2$，就可以求出 $sum$ 加了多少，所以维护两个 $Tag$，分别记录 $F_1,F_2$ 加了多少即可

```cpp
#define len(idx) (tr[idx].r-tr[idx].l+1)
const int N=3e5+10,Q=1e9+9;
int n,m,op,l,r;
int a[N],f[N];
struct node{
	int l,r;
	int s,a,b;
	node(){}
	node(int l,int r,int s=0,int a=0,int b=0):
		l(l),r(r),s(s),a(a),b(b){}
}tr[N<<2];

int F(int i,int a,int b)
{
	if(i==1) return a;
	if(i==2) return b;
	return (a*f[i-2]%Q+b*f[i-1]%Q)%Q;
}
int S(int i,int a,int b){return (F(i+2,a,b)-b+Q)%Q;}

void Tag(int idx,int a,int b)
{
	node &t=tr[idx];
	mod(t.a,a),mod(t.b,b),mod(t.s,S(len(idx),a,b));
}
void chs(int idx)
{
	node &t=tr[idx];
	if(t.a || t.b)
	{
		Tag(idx<<1,t.a,t.b);
		Tag(idx<<1|1,F(len(idx<<1)+1,t.a,t.b),F(len(idx<<1)+2,t.a,t.b));
		t.a=t.b=0;
	}
}

void build(int ql,int qr,int idx)
{
	tr[idx]=node(ql,qr);
	if(ql==qr) return void(tr[idx].s=a[ql]);
	int mid=(ql+qr)>>1;
	build(ql,mid,idx<<1),build(mid+1,qr,idx<<1|1);
	mod(tr[idx].s,tr[idx<<1].s+tr[idx<<1|1].s);
}

void modify(int ql,int qr,int idx)
{
	node &t=tr[idx];
	if(ql<=t.l && qr>=t.r)
		return void(Tag(idx,f[t.l-ql+1],f[t.l-ql+2]));
	chs(idx);
	int mid=(t.l+t.r)>>1;
	if(ql<=mid) modify(ql,qr,idx<<1);
	if(qr>mid) modify(ql,qr,idx<<1|1);
	t.s=0,mod(t.s,tr[idx<<1].s+tr[idx<<1|1].s);
}

int query(int ql,int qr,int idx)
{
	node &t=tr[idx];
	if(ql<=t.l && qr>=t.r)
		return t.s;
	chs(idx);
	int mid=(t.l+t.r)>>1,s=0;
	if(ql<=mid) mod(s,query(ql,qr,idx<<1));
	if(qr>mid) mod(s,query(ql,qr,idx<<1|1));
	return s;
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	f[1]=f[2]=1;
	for(int i=3;i<N;i++) mod(f[i],f[i-1]+f[i-2]);
	
	build(1,n,1);
	while(m--)
	{
		op=fr(),l=fr(),r=fr();
		if(op&1) modify(l,r,1);
		else fw(query(l,r,1)),nl;
	}
	
	return 0;
}
```



接下来是 $Trie$ 树四连击

[P7537 [COCI2016-2017#4\] Rima](https://www.luogu.com.cn/problem/P7537)

建树，一个节点的所有儿子都相互押韵，节点和儿子都押韵

树形 $dp$ 即可，这是路径集问题，维护两类即可

设 $f_i$ 为最长链，$sz_x$ 为 $x$ 节点的字符串数量，则 $f_i=\max f_v+s-sz_v+sz_x$

把 $x$ 和所有其它儿子接在 $v$ 前面皆可

算答案就是 $\max f_x$ 或者 $sz_x+f_{maxv_1}+f_{maxv_2}+s-sz_{maxv_1}-sz_{maxv_2}$ 两条链拼起来

```cpp
void dfs(int x)
{
	int s=0,mx1=0,mx2=0,s1=0,s2=0;
	for(int i=0;i<=25;i++)
	{
		int v=tr[x][i];
		if(!v) continue;
		dfs(v);
		if(q[v])
		{
			if(f[v]>mx1) mx2=mx1,mx1=f[v],s2=s1,s1=q[v];
			else if(f[v]==mx1) mx2=f[v],s2=q[v];
			else if(f[v]>mx2) mx2=f[v],s2=q[v];
		}
		s+=q[v];
	}
	
	f[x]=q[x]+s;
	for(int i=0;i<=25;i++)
	{
		int v=tr[x][i];
		if(!v) continue;
		if(q[v]) f[x]=max(f[x],f[v]+s-q[v]+q[x]);
	}
	
	ans=max(ans,max(mx1+mx2-s1-s2,0)+s+q[x]);
}
```



[P6824 「EZEC-4」可乐](https://www.luogu.com.cn/problem/P6824)

对 $a$ 建树，在树上跑 $k$

分讨一下，假设前面位全部 $\oplus$ 相等

$k$ 这一位 $1$

$x$ 选 $1$，那所有 $a_i$ 这一位为 $1$ 的都可以

选 $0$ 同理，所以答案就是两棵子树较大的那个+另一边的递归答案（大小定义为 $a$ 的个数）

$k$ 这一位 $0$

$x$ 为 $0$，$a_i$ 只能填 $1$ ，递归即可

$x$ 为 $1$，同理，答案为递归的 $max$

```cpp
void ins(int x)
{
	int now=0;
	for(int i=22;~i;i--)
	{
		int word=(x>>i)&1;
		if(!tr[now][word]) tr[now][word]=++idx;
		now=tr[now][word];
	}
	q[now]++;
}

int dfs(int x)
{
	if(q[x]) s[x]+=q[x];
	if(tr[x][0]) s[x]+=dfs(tr[x][0]);
	if(tr[x][1]) s[x]+=dfs(tr[x][1]);
	return s[x];
}

int query(int x,int p)
{
	if(!~p) return 0;
	int word=(m>>p)&1,res=0;
	if(word)
	{
		if(tr[x][word] && tr[x][word^1])
			return max(s[tr[x][word]]+query(tr[x][word^1],p-1),s[tr[x][word^1]]+query(tr[x][word],p-1));
		else if(tr[x][word]) return s[tr[x][word]];
		else if(tr[x][word^1]) return s[tr[x][word^1]];
	}
	else
	{
		if(tr[x][word]) res=query(tr[x][word],p-1);
		if(tr[x][word^1]) res=max(res,query(tr[x][word^1],p-1));
		return res;
	}
}
```



[P7717 「EZEC-10」序列](https://www.luogu.com.cn/problem/P7717)

升级版

把有边的全部缩到一个连通块里面，确定连通块里面任意一个点的权值即可确定剩下点的所有值

直接跑 $bfs$ 确定每个点到连通块编号最小的那个点的异或路径和，问题转化为求多少个 $x \leq k$ 满足 $\forall i,d_i \oplus x \leq k$

 $d_i$ 放到 $Trie$ 上，考虑 $dp$ 求

$f_{x,mx,dep}$ 节点 $x$，当前最大值 $mx$，当前第 $dep$ 位

$dep=-1$ 说明找到一条可行路径，确定了一个可以的 $x$，返回 $1$

当前两个儿子，选什么都会在对面子树出现最大值，$mx \leftarrow mx+2^p$，递归选两个儿子大的那个

当前一个儿子，假设 $0$，如果 $x$ 填 $1$ 都可以加上 $2^p$，$mx \leftarrow mx+2^p$，递归 $0$ 儿子，否则直接递归 $0$ 儿子

```cpp
const int N=5e5+10,Q=1e9+7;
int n,m,k,l,r,v,idx,ans=1;
int d[N],tr[N*31][2];
vector<pi> as[N];

void ins(int x)
{
	int now=0;
	for(int i=30;~i;i--)
	{
		int word=(x>>i)&1;
		if(!tr[now][word]) tr[now][word]=++idx;
		now=tr[now][word];
	}
}

void bfs(int S)
{
	queue<int> q;
	q.push(S);
	
	while(q.size())
	{
		int x=q.front();;
		q.pop();
		ins(d[x]);
		
		go(it)
		{
			int v=it.first,w=it.second;
			if(!~d[v]) d[v]=d[x]^w,q.push(v);
			else if(d[v]!=(d[x]^w)) {puts("0");exit(0);}
		}
	}
}

int dfs(int x,int mx,int p)
{
	if(mx>k) return 0;
	if(!~p) return 1;
	if(tr[x][0] && tr[x][1])
		return mod(dfs(tr[x][0],mx+(1<<p),p-1),dfs(tr[x][1],mx+(1<<p),p-1));
	else
		return (mx+(1ll<<p)<=k)?mod(dfs(tr[x][0]|tr[x][1],mx+(1<<p),p-1),1<<p):dfs(tr[x][0]|tr[x][1],mx,p-1);
}

signed main()
{
	n=fr(),m=fr(),k=fr();
	for(int i=1;i<=m;i++)
	{
		l=fr(),r=fr(),v=fr();
		as[l].pb({r,v}),as[r].pb({l,v});
	}
	
	memset(d,-1,sizeof d);
	for(int i=1;i<=n;i++)
		if(!~d[i]) 
		{
			for(int i=0;i<=idx;i++)
				tr[i][0]=tr[i][1]=0;
			idx=0;
			d[i]=0,bfs(i);
			(ans*=dfs(0,0,30))%=Q;	
		}
		
	fw(ans);
	return 0;
}
```



[Xor-Subsequence (hard version)](https://www.luogu.com.cn/problem/CF1720D2)

暴力 $dp$，$f_{i} \leftarrow f_j+1 [i \oplus a_j \lt j \oplus a_i]$

维护 $(i,a_i)$ 的二元组

考虑对于每一位，将 $\left(i, a_i\right)$ 视为一个二元组，重新定义比较:
$$
\begin{aligned}
& (0,0)=(1,1),(0,1)=(1,0) \\
& (0,0)>(1,0),(0,1)>(0,0) \\
& (1,0)>(1,1),(1,1)>(0,1)
\end{aligned}
$$

 $i$ 能从 $j$ 转移，当且仅当从高到低若干位， $\left(i, a_i\right)=\left(j, a_j\right)$ ，且对于下一位， $\left(i, a_i\right)>\left(j, a_j\right)$

递归相等儿子，并在 $\gt$ 的状态算答案

这样四叉的复杂度并不对，我们考虑改成二叉

我们发现递归 $(0,0)$ 必然递归 $(1,1)$ 直接根据 $i \oplus a_i$ 建树即可，然后维护的时候还是维护二元组

```cpp
const int N=3e5+10;
int n,ans,idx;
int a[N],f[N],tr[N*30][4],q[N*30][4];
const int to[]={2,0,3,1};
int id(int x,int y){return (x<<1)+y;}

void ins(int i,int v)
{
	int now=0;
	for(int j=30;~j;j--)
	{
		int k=(i>>j)&1,l=(a[i]>>j)&1;
		int word=k^l;
		if(!tr[now][word]) tr[now][word]=++idx;
		q[now][(k<<1)+l]=max(q[now][(k<<1)+l],v);
		now=tr[now][word];
	}
}

int query(int now,int p,int dep)
{
	if(!~dep) return 0;
	int i=(p>>dep)&1,ai=(a[p]>>dep)&1;
	return max(q[now][to[(i<<1)+ai]],(tr[now][i^ai]!=0)?query(tr[now][i^ai],p,dep-1):0);
}

void solve()
{
	n=fr();
	for(int i=0;i<n;i++) a[i]=fr();
	
	for(int i=0;i<=idx;i++)
		for(int j=0;j<=1;j++)
			for(int k=0;k<=3;k++)
				tr[i][j]=0,q[i][k]=0;
	idx=ans=0;
	
	for(int i=0;i<n;i++)
	{
		ans=max(ans,f[i]=query(0,i,30)+1);
		ins(i,f[i]);
	}
	fw(ans),nl;
}

int main()
{
	int T=fr();
	while(T--) solve();

	return 0;
}
```



[P8868 [NOIP2022\] 比赛](https://www.luogu.com.cn/problem/P8868)

分治萌萌题

这里是 $O(qn\log n)$ 做法

设 $A，B$ 为该区间的 $a,b$ 最大值，我们考虑跨区间答案

讨论 $(A,B,mid),(A,mid,B),(B,mid,A),(mid,A,B)$ 四种情况即可

观察到最大值只增不降，我们可以枚举左端点/右端点，双指针算

具体来说

$al_i=\max_{[i,mid]} a$

$ar_i=max[mid+1,i] a$

$bl_i,br_i$ 同理

对于 $1$ 我们枚举端点 $i$，求最大的 $j$ 满足条件，贡献即为 $al_i \times bl_i \times (j-mid)$

对于 $2$，我们枚举左端点 $i$，满足条件的区间为 $[k,j]$，贡献为 $al_i \times br_{[k,j]}$

```cpp
ull solve(int l,int r)
{
	if(l>r) return 0ull;
	if(l==r) return 1ull*a[l]*b[l];
	int mid=(l+r)>>1;
	ull res=solve(l,mid)+solve(mid+1,r);
	
	al[mid]=a[mid],bl[mid]=b[mid];
	ar[mid+1]=a[mid+1],br[mid+1]=b[mid+1];
	for(int i=mid-1;i>=l;i--)
	{
		al[i]=max(al[i+1],a[i]);
		bl[i]=max(bl[i+1],b[i]);
	}
	for(int i=mid+2;i<=r;i++)
	{
		ar[i]=max(ar[i-1],a[i]);
		br[i]=max(br[i-1],b[i]);
	}
	
	//AB mid
	for(int i=mid,j=mid;i>=l;i--)
	{
		while(ar[j+1]<al[i] && br[j+1]<bl[i] && j+1<=r) j++;
		res+=1ull*al[i]*bl[i]*(j-mid);
	}
	//A mid B
	ull s=0;
	for(int i=mid,j=mid,k=mid+1;i>=l;i--)
	{
		while(ar[j+1]<al[i] && j+1<=r) s+=br[++j];
		while(br[k]<bl[i] && k<=j) s-=br[k++];
		res+=s*al[i];
	}
	//B mid A
	s=0;
	for(int i=mid+1,j=mid+1,k=mid;i<=r;i++)
	{
		while(al[j-1]<ar[i] && j-1>=l) s+=bl[--j];
		while(bl[k]<br[i] && k>=j) s-=bl[k--];
		res+=s*ar[i];
	}
	//mid AB
	for(int i=mid+1,j=mid+1;i<=r;i++)
	{
		while(al[j-1]<ar[i] && bl[j-1]<br[i] && j-1>=l) j--;
		res+=1ull*ar[i]*br[i]*(mid-j+1);
	}
	
	return res;
}
```

