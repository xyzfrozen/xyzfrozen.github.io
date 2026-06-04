---
title: Hash
date: 2023-10-13 23:09:44
tags:
- 字符串
- Hash
categories:
- note
mathjax: true
---

# Hash

![img](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132311740.png)

```cpp
ull get(int l,int r)
{
    return h[r]-h[l-1]*p[r-l+1];        //这步其实是将h[l-1]左移
}                                       //其目的事实上是为了将h[l-1]的高位与h[r]相对齐从而才可以未完成计算
int main()
{
    scanf("%d%d%s",&n,&m,str+1);

    p[0]=1;                         //注意这步千万不要忘了 最开始的权值必须赋值为1 否则接下来就会出错
    for(int i=1;i<=n;i++)
    {
        p[i]=p[i-1]*P;                  //计算每个位上的相应权值
        h[i]=h[i-1]*P+str[i]-'a'+1;     //计算字符串前缀值
    }
}
```

------------

已知一个字符串被称为 $k$-回文串的充要条件是它自身是回文串，并且它长为 $\lfloor \frac{n}{2} \rfloor$ 的前缀和后缀是 $(k-1)$-回文串

任意字符串 (包括空串) 都是 $0$-回文串

一个字符串的回文度数就是这个字符串的 $k$ 的最大值

对于一个给定的字符串，求所有前缀的回文度数之和

考虑 $hash$ 只要自己是回文串，就可以靠儿子 $[n>>1]$ 转移，因为自己回文，所以前/后缀相同，就不用判断后缀了

```cpp
const int N=5e6+10,P=131;
int n,ans,L,R; //前/后缀 hash 值
int p[N],f[N];
char s[N];

signed main() 
{
	scanf("%s",s+1);
	n=strlen(s+1);
	p[0]=1;
	for(int i=1;i<=n+1;i++) p[i]=p[i-1]*P;
	
	for(int i=1;i<=n;i++)
	{
		L=L+(s[i]-'a'+1)*p[i-1];
		R=R*P+(s[i]-'a'+1);
		if(L==R) f[i]=f[i>>1]+1;
		ans+=f[i];
	}
	
	printf("%llu",ans);
	return 0;
}
```
------------

双 $hash$

为了防止 $H(S_1)=H(S_2)$ 的字符串冲突

用两个 $hash$ 函数或更多算

------------

$hash$ 为什么模数取质数？

防止等差数列等具有特殊性质的序列，这样会浪费空间 $(Q,d)$

取质数能最小化浪费的空间

------------

[P4503 [CTSC2014] 企鹅 QQ](https://www.luogu.com.cn/problem/P4503 "P4503 [CTSC2014] 企鹅 QQ")

枚举不同的那个字符 $now$，考虑 $hash$ $[1,now-1]$ 和 $[now+1,n]$ 然后给后缀 $hash$ $\times p^{now-1}$

这样暴力比较还是 $O(n^2)$ 的

我们把刚才的 $hash$ 排个序，然后每个点往后找就行了

```cpp
const int N=3e4+10,M=210,P=131;
int n,m,z,ans;
ull hl[N][M],hr[N][M],p[M],h[N];
char s[N][M];
int calc(int x){return (x<2)?(0):(x*(x-1)/2);} //C_n^2

int main()
{
	n=fr(),m=fr(),z=fr();
	p[0]=1;
	for(int i=1;i<M;i++) p[i]=p[i-1]*P;
	for(int i=1;i<=n;i++)
	{
		scanf("%s",s[i]+1);
		for(int j=1,k=m;j<=m;j++,k--)
			hl[i][j]=hl[i][j-1]*P+s[i][j],hr[i][k]=hr[i][k+1]+s[i][k]*p[m-k];
	}
	
	for(int now=1;now<=m;now++) //不同的那个字符
	{
		for(int i=1;i<=n;i++)
			h[i]=hl[i][now-1]+hr[i][now+1]*p[now-1];
		sort(h+1,h+1+n);
		for(int i=1;i<=n;i++)
		{
			int j=i+1;
			while(j<=n && h[j]==h[i]) j++;
			ans+=calc(j-1-i+1);
			i=j-1;
		}
	}
	fw(ans);
	
	return 0;
}
```
----------

一个字符串

1. 修改字符 $a[x]=c$

2. 查询子串 $[l,r]$ 的 $hash$ 值

线段树维护，t.hl*p[qr-t.r];

$O((n+m)\log n)$

------

[#3520. 「JOI Open 2021」杂交 - 题目 - LibreOJ (loj.ac)](https://loj.ac/p/3520)

同一个字符串杂交两次，相邻等价于一次杂交，否则等价于不杂交

于是一个串的杂交次一定是 $0/1$，考虑顺序共有 $9$ 种，直接暴力维护 $Hash$，然后询问修改并线段树维护即可

```cpp
#include<bits/stdc++.h>
#define int long long
#define ins insert
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10,P=1331,Q=1e9+7;
int n,m,cnt,l,r;
int A[N],B[N],C[N],p[N],one[N],two[N],tmp[N];
char s[N];
map<char,int> cast{{'J',0},{'O',1},{'I',2}};
unordered_set<int> ok;
struct node{
    int l,r;
    int h,tag;
    node(){}
    node(int l,int r,int h=0,int tag=-1):
        l(l),r(r),h(h),tag(tag){}
}tr[N*4];

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
int mod(int x,int y){if((x+=y)>=Q) x-=Q;return x;}
int add(int x,int y){return (6-x-y)%3;}

void chf(int idx)
{
    node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
    int mid=(t.l+t.r)>>1;
    t.h=(ls.h*p[t.r-mid]%Q+rs.h)%Q;
}

void Tag(int idx,int x)
{
    node &t=tr[idx];
    if(!x) t.h=0;
    else if(x==1) t.h=one[t.r-t.l+1];
    else t.h=two[t.r-t.l+1];
    t.tag=x;
}

void chs(int idx)
{
    node &t=tr[idx];
    if(!~t.tag) return;
    Tag(idx<<1,t.tag),Tag(idx<<1|1,t.tag);
    t.tag=-1;
}

void build(int ql,int qr,int idx)
{
    tr[idx]=node(ql,qr);
    if(ql==qr) return void(tr[idx].h=cast[s[ql]]);
    int mid=(ql+qr)>>1;
    build(ql,mid,idx<<1),build(mid+1,qr,idx<<1|1);
    chf(idx);
}

void modify(int ql,int qr,int idx,int x)
{
    node &t=tr[idx];
    if(ql<=t.l && qr>=t.r)
        return void(Tag(idx,x));
    chs(idx);
    int mid=(t.l+t.r)>>1;
    if(ql<=mid) modify(ql,qr,idx<<1,x);
    if(qr>mid) modify(ql,qr,idx<<1|1,x);
    chf(idx);
}

int calc(int s[])
{
    int v=0;
    for(int i=1;i<=n;i++)
        v=(v*P%Q+s[i])%Q;
    return v;
}

signed main()
{
    n=fr();
    p[0]=1;
    for(int i=1;i<=n;i++) p[i]=p[i-1]*P%Q;
    for(int i=1;i<=n;i++) one[i]=mod(one[i-1]*P%Q,1);
    for(int i=1;i<=n;i++) two[i]=mod(two[i-1]*P%Q,2);
    scanf("%s",s+1);for(int i=1;i<=n;i++) A[i]=cast[s[i]];
    scanf("%s",s+1);for(int i=1;i<=n;i++) B[i]=cast[s[i]];
    scanf("%s",s+1);for(int i=1;i<=n;i++) C[i]=cast[s[i]];

    //A B C AB AC BC ABC ACB BCA
    ok.ins(calc(A));ok.ins(calc(B));ok.ins(calc(C));
    for(int i=1;i<=n;i++) tmp[i]=add(A[i],B[i]);ok.ins(calc(tmp));
    for(int i=1;i<=n;i++) tmp[i]=add(B[i],C[i]);ok.ins(calc(tmp));
    for(int i=1;i<=n;i++) tmp[i]=add(A[i],C[i]);ok.ins(calc(tmp));
    for(int i=1;i<=n;i++) tmp[i]=add(add(A[i],B[i]),C[i]);ok.ins(calc(tmp));
    for(int i=1;i<=n;i++) tmp[i]=add(add(A[i],C[i]),B[i]);ok.ins(calc(tmp));
    for(int i=1;i<=n;i++) tmp[i]=add(add(B[i],C[i]),A[i]);ok.ins(calc(tmp));

    m=fr(),scanf("%s",s+1);
    build(1,n,1);
    puts(ok.find(tr[1].h)!=ok.end()?"Yes":"No");
    while(m--)
    {
        l=fr(),r=fr();
        modify(l,r,1,cast[getchar()]);
        puts(ok.find(tr[1].h)!=ok.end()?"Yes":"No");
    }

    return 0;
}
```

------

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132310688.png)

Hash + 二分

首先这个最长回文子串是具有二分性的，可以二分

其次，要高效判断子串相等，就用到 $hash$ 判断了

答案子串可以分成两类，长度为奇数和长度为偶数

对于奇数，枚举中间那个字符，判断两侧即可

对于偶数，同样枚举，考虑如何变成奇数类

一个 $trick$ 将字符串中每两个字符之间加上一个特殊字符，假设加上一个'#'

对于奇数个的字符串，a#b#c#d#f，添加后还是奇数个。对于偶数个的字符串，a#b#c#d，添加后变成了奇数个

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132310803.png)

$O(n\log n)$

```cpp
const int N=2e6+10,P=131;
int hl[N],hr[N],p[N],T=0;
char s[N];

int getl(int l,int r) {return hl[r]-hl[l-1]*p[r-l+1];}
int getr(int l,int r) {return hr[l]-hr[r+1]*p[r-l+1];}

signed main()
{
    p[0]=1;for(int i=1;i<N;i++) p[i]=p[i-1]*P;
    
    while(scanf("%s",s+1),strcmp(s+1,"END"))
    {
        int n=strlen(s+1)*2,ans=1;
        for(int i=n;i;i-=2)
        {
            s[i]=s[i/2];
            s[i-1]='#';
        }
        
        for(int i=1,j=n;i<=n;i++,j--)
        {
            hl[i]=hl[i-1]*P+s[i]-'a'+1;
            hr[j]=hr[j+1]*P+s[j]-'a'+1;
        }
        
        for(int i=1;i<=n;i++)
        {
            int l=0,r=min(i-1,n-i),res=0; //二分扩展的半径 mid-c-mid
            while(l<=r)
            {
                int mid=(l+r)>>1;
                if(getl(i-mid,i-1)==getr(i+1,i+mid)) l=mid+1,res=mid;
                else r=mid-1;
            }
            ans=max(ans,res+(s[i-res]!='#'));
            //这里加的是半径相当于去除了'#'
            //然后本来是还要加上这个中心字符 ch 的，如果边界的字符是'#'的话，半径还减一，抵消了，不是'#'就得补回来
        }
        printf("Case %llu: %llu\n",++T,ans);
    }

    return 0;
}
```

$O(n)$ 解法

设 $f_i$ 表示以 $i$ 结尾的最长回文串长度

有一个显然的性质是 $f_i \leq f_{i-1}+2$

我们从 $f_{i-1}+2$ 开始，每次暴力 $-1$，直到找到回文串或者减到 $0$

复杂度分析

每次 $i-1 \to i$ 可以看做往栈里加入两个数，每次 $-1$ 相当于取数，根据势能分析，可得是线性的，可看复杂度分析一章

------------

给定 $s,p$，求 $s$ 中有多少子串 $s'$，满足 $|s'|=|p|$，$s'$ 和 $p$ 最多 $k$ 个字符不同

$|s|，|p| \leq 1e5$，$0 \leq k \leq 5$

考虑 $hash$ $s\;p$，暴力枚举 $s'$ 起点，然后二分第一个不同字符的位置，直接暴力跳，最多跳 $k$ 次

$O(|s|+|p|+k|s|\log |p|)$

------------

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132310834.png)

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132310700.png)

首先我们需要排序，最坏的时间复杂度 $O(nlogn \times n)$ 每次比较的时间复杂度最坏是 $O(n)$
考虑如何把这个 $O(n)$ 降下来，考虑维护最长公共前缀，二分+hash，实现是 $O(logn)$，然后比较后面一个字符
总体时间复杂度 $O(n^2logn+nlogn)$

一个小 trick，存后缀不需要真正存子串，存下当前后缀的第一个字符在原串的下标 $sa[i]=i \to s[i \to n]$

```cpp
const int N=6e5+10,P=131;
int sa[N],p[N],h[N],n;
char s[N];

int get(int l,int r){return h[r]-h[l-1]*p[r-l+1];}

int solve(int a,int b)
{
    int l=0,r=min(n-(a-1),n-(b-1)),res=0;
    while(l<=r)
    {
        int mid=(l+r)>>1;
        if(get(a,a+mid-1)==get(b,b+mid-1)) l=mid+1,res=mid;
        else r=mid-1;
    }
    return res;
}

bool cop(int a,int b)
{
    int res=solve(a,b);
    return s[a+res]<s[b+res];
}

int main()
{
    scanf("%s",s+1);
    n=strlen(s+1),p[0]=1;
    for(int i=1;i<=n;i++)
    {
        p[i]=p[i-1]*P;
        h[i]=h[i-1]*P+s[i]-'a'+1;
        sa[i]=i;
    }
    
    s[n+1]='#';
    sort(sa+1,sa+1+n,cop);
    for(int i=1;i<=n;i++) fw(sa[i]-1),pt;
    nl;
    for(int i=1;i<=n;i++) fw(solve(sa[i],sa[i-1])),pt;

    return 0;
}
```

------------

![img](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310132312095.png)

由于每次查询的矩阵大小都是固定的，是 $a \times b$，因此我们可以预处理所有 $a \times b$ 的矩阵的哈希值，然后查表即可

现在的问题是如何处理一个二维矩阵的哈希值，其实是一样的，从第二行开始，将每一行移到上一行的末尾，最终就会变成一行字符串

每一个矩阵都对应这样唯一的哈希值。如果要将第 $i+1$ 行加入到第 $i$ 行的末尾，哈希值应该是 $h_i \times p_b + h_{i+1}$

```cpp
const int N=1010,P=131;
int n,m,a,b,q;
int h[N][N],p[N*N]={1};
char str[N];
unordered_set<int> s;

int get(int h[],int l,int r)
{
    return h[r]-h[l-1]*p[r-l+1];
}

signed main()
{
    n=fr(),m=fr(),a=fr(),b=fr();
    for(int i=1;i<=n*m;i++) p[i]=p[i-1]*P;
    for(int i=1;i<=n;i++)
    {
        scanf("%s",str+1);
        for(int j=1;j<=m;j++) h[i][j]=h[i][j-1]*P+str[j]-'0'+1;
    }
    for(int i=b;i<=m;i++)
    {
        int sum=0;
        for(int j=1;j<=n;j++)
        {
            //如果j > a，说明当前的哈希值是一个a+1 * b的矩阵
            //需要将上面多出来的一行删去，类似一个滑动窗口
            sum=sum*p[b]+get(h[j],i-b+1,i);//矩阵下移
            if(j>a) sum-=get(h[j-a],i-b+1,i)*p[a*b];//矩阵去掉最上面一行
            if(j>=a) s.insert(sum);
        }
    }
    
    q=fr();
    while(q--)
    {
        int sum=0;
        for(int i=1;i<=a;i++)
        {
            scanf("%s",str+1);
            for(int j=1;j<=b;j++) sum=sum*P+str[j]-'0'+1;
        }
        if(s.count(sum)) puts("1");
        else puts("0");
    }

    return 0;
}
```

------------

[树同构模板](https://www.luogu.com.cn/problem/P5043 "树同构模板")

考虑有根树

从根开始，设计 $hash$ 函数

$$H(x)=\sum_{v \in S} H(v) \times P^{\sum sz_v}$$

$P=13331\;Q=99994919$

```cpp
const int N=60,G=13331,Q=99994919;
int n,m,u,v;
int P[N],sz[N],d[N],h[N],H[N][2];
pi S[N];
vector<int> as[N];
vector<int> r;

void get_w(int x,int rt)
{
	sz[x]=1;
	int mx=0;
	go(v)
	{
		if(v==rt) continue;
		get_w(v,x);
		sz[x]+=sz[v],mx=max(mx,sz[v]);
	}
	mx=max(mx,n-sz[x]);
	if(mx<=(n>>1)) r.pb(x);
}

void dfs(int x,int rt)
{
	h[x]=d[x]*P[1]%Q,sz[x]=1;
	go(v) {if(v!=rt) d[v]=d[x]+1,dfs(v,x);}
	int cnt=0;
	go(v) {if(v!=rt) S[++cnt]={h[v],sz[v]};}
	sort(S+1,S+1+cnt);
	for(int i=1;i<=cnt;i++)
		(h[x]+=S[i].fi*P[sz[x]])%=Q,sz[x]+=S[i].se;
}

void insert(int now)
{
	n=fr();
	for(int i=1;i<=n;i++) as[i].clear();
	for(int i=1;i<=n;i++)
	{
		int p=fr();
		if(p) as[p].pb(i),as[i].pb(p);
	}
	
	r.clear();
	get_w(1,-1);
	for(int i=0;i<r.size();i++)
	{
		d[r[i]]=1,dfs(r[i],-1);
		H[now][i]=h[r[i]];
	}
	if(H[now][0]>H[now][1]) swap(H[now][0],H[now][1]);
}

signed main()
{
	P[0]=1;
	for(int i=1;i<=55;i++) P[i]=P[i-1]*G%Q;
	m=fr();
	for(int i=1;i<=m;i++) insert(i);
	for(int i=1;i<=m;i++)
		for(int j=1;j<=i;j++)
			if(H[i][0]==H[j][0] && H[i][1]==H[j][1]) {fw(j),nl;break;}
	return 0;
}
```
