---
title: EXSTL-Rope
date: 2023-09-29 23:31:17
tags:
- 可持久化平衡树
- 可持久化并查集
- 可持久化线段树
categories:
- note
mathjax: true
---

# 奇淫巧技-Rope

$stl$ 的可持久化平衡树，无法做区间第 $k$ 大

内部为块状链表实现

```cpp
#include <ext/rope>
using namespace __gnu_cxx;

rope<int> rp;
rope<int> rp[N]

rp.push_back(x);
rp.insert(pos,x); 
//a[pos]=x 原来的 a[pos] 顶到后面去 也可以插入数组
rp.erase(pos,x); // 在 pos 处删除 x 个元素
rp.size();
rp.replace(pos,x);
rp.substr(pos,x); // 从 pos 处开始提取 x 个元素
rp.copy(pos,x,s); // 从 pos 处开始复制 x 个元素到 s 中
rp[x]/rp.at(x);
rp+=... //字符串类型支持+=
```

指针复制 $O(1)$，数组复制 $O(n)$，其它操作 $O(\log n)$

注意数组初始化，碰到 $0$ 停止，所以要保证用到的数组范围内没有元素 $0$ !!!!

它甚至可以 $lower$_$bound$

------------


[P3919 【模板】可持久化线段树 1（可持久化数组）](https://www.luogu.com.cn/problem/P3919 "P3919 【模板】可持久化线段树 1（可持久化数组）")

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

const int N=1e6+10;
int n,m,to,op,pos;
rope<int> a[N];

int main()
{
	n=fr(),m=fr();
	a[0].pb(0);
	for(int i=1;i<=n;i++) a[0].pb(fr());
	for(int i=1;i<=m;i++)
	{
		to=fr(),op=fr(),pos=fr();
		a[i]=a[to];
		if(op==1) a[i].replace(pos,fr());
		else fw(a[i][pos]),nl;
	}

	return 0;
}
```

------------


[P4008 [NOI2003] 文本编辑器](https://www.luogu.com.cn/problem/P4008 "P4008 [NOI2003] 文本编辑器")

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

int n,idx;
rope<char> a;
string op;

int main()
{
	n=fr();
	for(int i=1;i<=n;i++)
	{
		cin>>op;
		if(op[0]=='M') idx=fr();
		else if(op[0]=='I')
		{
			int cnt=fr(),pos=idx;
			while(cnt)
			{
				getline(cin,op);
				if(op=="\n") getline(cin,op);
				for(int i=0;i<op.size();i++)
					if((int)op[i]>=32 && (int)op[i]<=126) a.insert(pos++,op[i]),cnt--;
			}
		}
		else if(op[0]=='D') a.erase(idx,fr());
		else if(op[0]=='G') cout<<a.substr(idx,fr())<<endl;
		else if(op[0]=='P') idx--;
		else idx++;
	}

	return 0;
}
```

------------


[P3835 【模板】可持久化平衡树](https://www.luogu.com.cn/problem/P3835 "P3835 【模板】可持久化平衡树")

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

const int N=5e5+10;
int n,to,op,v;
rope<int> a[N];

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++)
	{
		to=fr(),op=fr(),v=fr();
		a[i]=a[to];
		int idx=lower_bound(a[i].begin(),a[i].end(),v)-a[i].begin(); //第一个>=v 的位置 从0开始
		if(op==1) a[i].insert(idx,v);
		else if(op==2)
		{
			if(a[i][idx]!=v) continue;
			a[i].erase(idx,1);
		}
		else if(op==3) fw(idx+1),nl;
		else if(op==4) fw(a[i][v-1]),nl;
		else if(op==5)
		{
			if(lower_bound(a[i].begin(),a[i].end(),v)==a[i].begin()) puts("-2147483647");
			else fw(a[i][idx-1]),nl;
		}
		else
		{
			if(upper_bound(a[i].begin(),a[i].end(),v)==a[i].end()) puts("2147483647");
			else fw(a[i][upper_bound(a[i].begin(),a[i].end(),v)-a[i].begin()]),nl;
		}
	}

	return 0;
}
```

------------

[P3402 可持久化并查集](https://www.luogu.com.cn/problem/P3402 "P3402 可持久化并查集")

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

const int N=2e5+10;
int n,m,op,a,b,now;
int base[N];
rope<int> p[N];
mt19937 Rand(time(0));

int get()
{
	unsigned r=Rand();
	if(r>2147384647) r-=2147384647;
	return r;
}
int find(int x)
{
	if(x==p[now][x]) return x;
	else return find(p[now][x]);
}
void merge(int a,int b)
{
	int pa=find(a),pb=find(b);
	if(pa==pb) return;
	if(base[pa]<base[pb]) p[now].replace(pa,pb);
	else p[now].replace(pb,pa);
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) base[i]=i;
	base[0]=1;
	p[0]=rope<int>(base); //可以直接插入数组，到第一个0停止，字符串就是到 '\0'
	for(int i=1;i<=n;i++) base[i]=get();
	
	for(now=1;now<=m;now++)
	{
		op=fr();
		if(op==1)
		{
			a=fr(),b=fr();
			p[now]=p[now-1];
			merge(a,b);
		}
		else if(op==2) p[now]=p[fr()];
		else
		{
			a=fr(),b=fr();
			p[now]=p[now-1];
			if(find(a)==find(b)) puts("1");
			else puts("0");
		}
	}

	return 0;
}
```

------------

[P4567 [AHOI2006]文本编辑器](https://www.luogu.com.cn/problem/P4567 "P4567 [AHOI2006]文本编辑器")

不好做的就是这个翻转

我们直接暴力维护两个 $rope$ 一个正的一个逆的，用 $substr$ 进行凭借完成

$Trick$ 因为 $rope$ 支持插入数组，我们直接用个字符输出存插入的更方便，就不用每次算指针了，注意在数组末尾要加上一个 '\0'

注意每次修改的时候两个 $rope$ 都要变

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

const int N=(1<<22)+10;
int n,idx;
char x[N],y[N];
rope<char> a,b,base;
string s;

int main()
{
	n=fr();
	while(n--)
	{
		cin>>s;
		if(s=="Move") idx=fr();
		else if(s=="Insert")
		{
			int cnt=fr(),len=a.size();
			for(int i=0;i<cnt;i++) x[i]=y[cnt-i-1]=getchar();
			x[cnt]=y[cnt]='\0';
			a.insert(idx,x),b.insert(len-idx,y);
		}
		else if(s=="Delete")
		{
			int cnt=fr(),len=a.size();
			a.erase(idx,cnt);
			b.erase(len-idx-cnt,cnt);
		}
		else if(s=="Rotate")
		{
			int cnt=fr(),len=a.size();
			base=a.substr(idx,cnt);
			a=a.substr(0,idx)+b.substr(len-idx-cnt,cnt)+a.substr(idx+cnt,len-idx-cnt);
			b=b.substr(0,len-idx-cnt)+base+b.substr(len-idx,idx);
		}
		else if(s=="Get")
		{
			putchar(a[idx]);
			if(a[idx]!='\n') nl;
		}
		else if(s=="Prev") idx--;
		else if(s=="Next") idx++;
	}

	return 0;
}
```

------------

[P4309 [TJOI2013]最长上升子序列](https://www.luogu.com.cn/problem/P4309 "P4309 [TJOI2013]最长上升子序列")

$Sol1$

考虑加入 $i$ 的影响

有一个很强的性质就是它是当前序列中最大的元素

我们显然分段考虑，假设 $i$ 加入到 $pos$

设 $i$ 表示当前序列到位置 $i$ 的最长上升子序列

新的答案就是原来的 $ans$ 和 

$$\max_{0\leq j \leq pos-1} f_j+1$$

比较一下

我们要维护每个点的 $f_x$ 和 $maxt_x$

$Sol2$

考虑直接离线，用 $rope$ 把整个序列造出来

还有一个很强的性质就是影响的状态只会到 $pos$ 所以考虑在它之前的就行了

重新设 $f_i$ 表示值在 $[1,i]$ 且最终位置在 $i$ 之前的最长上升子序列

然后 $f_i$ 考虑所有 $f_j[j \lt i]$，用值域来算

既考虑在它前面的，且值比它小的

区间查+单点改 $\to$ 树状数组即可

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

const int N=1e5+10;
int n;
int s[N],ans[N];
rope<int> a;

void ins(int i,int x) {for(;i<=n;i+=i&(-i)) s[i]=max(s[i],x);}
int query(int i)
{
	int res=0;
	for(;i;i-=i&(-i)) res=max(res,s[i]);
	return res;
}

int main()
{
	n=fr();
	for(int i=1;i<=n;i++) a.insert(fr(),i);
	for(int i=0;i<n;i++)
	{
		int v=a[i];
		ins(v,ans[v]=(query(v-1)+1)); 
		//max f_[1,v-1]+1 并且更新 f_[v+1,n]
	}
	for(int i=1;i<=n;i++) fw(ans[i]=max(ans[i],ans[i-1])),nl;
	return 0;
}
```

------------

[P3960 [NOIP2017 提高组] 列队](https://www.luogu.com.cn/problem/P3960 "P3960 [NOIP2017 提高组] 列队")

$Sub 1\to 2$

虽然 $n,m$ 很大，但是 $q$ 很小，我们考虑离线询问

操作只有 $erase\;pushback$ 和访问，这些都可以用 $rope$ 用 $O(\sqrt n)$ 的时间完成

我们队每一行的 $m-1$ 个元素开一个 $rope$，再单独对最后一列开一个 $rope$ 这样就不用每次向前看齐的时候每一行都要修改

$Sub 3 \to 5$

我们只用维护第一行和最后一列，开两个 $rope$ 即可

```cpp
#include<ext/rope>
using namespace __gnu_cxx;

const int N=5e4+10,M=510;
int n,m,q;
bool vis[N];
pi Query[M];
rope<int> tr[N],a,b;

void solve1()
{
	for(int i=1;i<=q;i++) Query[i]={fr(),fr()},vis[Query[i].fi]=1;
	for(int i=1;i<=n;i++)
		if(vis[i]) {for(int j=0;j<m;j++) tr[i].pb((i-1)*m+j);}
	for(int i=0;i<=n;i++) tr[0].pb(i*m);
	for(int i=1;i<=q;i++)
	{
		int x=Query[i].fi,y=Query[i].se;
		if(y==m)
		{
			int t=tr[0][x];
			fw(t),nl;
			tr[0].erase(x,1),tr[0].pb(t);
		}
		else
		{
			int t=tr[x][y];
			fw(t),nl;
			tr[x].erase(y,1),tr[x].push_back(tr[0][x]);
			tr[0].erase(x,1),tr[0].push_back(t);
		}
	}
}

void solve2()
{
	for(int i=0;i<m;i++) a.pb(i);
	for(int i=0;i<=n;i++) b.pb(i*m);
	for(int i=1;i<=q;i++)
	{
		int x=fr(),y=fr();
		if(y==m)
		{
			fw(b[1]),nl;
			b.pb(b[1]),b.erase(1,1);
		}
		else
		{
			int t=a[y];
			fw(t),nl;
			a.erase(y,1),a.pb(b[1]);
			b.erase(1,1),b.pb(t);
		}
	}
}

signed main()
{
	n=fr(),m=fr(),q=fr();
	if(q<=500) solve1();
	else solve2();

	return 0;
}
```

------------

[P5459 [BJOI2016]回转寿司](https://www.luogu.com.cn/problem/P5459 "P5459 [BJOI2016]回转寿司")

显然的 $rope$ 优化求

但是前缀和可能会出现 $0$，所以不能用数组初始化，要用 $pb$ ！！！！

```cpp
const int N=2e5+10;
int n,l,r,ans;
int a[N],S[N],b[N];
rope<int> s;

signed main()
{
	n=fr(),l=fr(),r=fr();
	for(int i=1;i<=n;i++) a[i]=fr(),b[i]=S[i]=S[i-1]+a[i];
	sort(b+1,b+1+n);
	b[0]=-1e18,b[n+1]=1e18;
	for(int i=0;i<=n+1;i++) s.pb(b[i]); //!!!!
	
	for(int i=1;i<=n;i++)
	{
		//l<=s[j]-s[i-1]<=r
		int L=lower_bound(s.begin(),s.end(),l+S[i-1])-s.begin();
		int R=upper_bound(s.begin(),s.end(),r+S[i-1])-s.begin()-1;
		ans+=max(R-L+1,0);
		s.erase(lower_bound(s.begin(),s.end(),S[i])-s.begin(),1);
	}
	
	fw(ans);
	
	return 0;
}
```
