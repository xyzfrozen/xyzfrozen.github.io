---
title: DFA 全家桶
date: 2024-02-06 20:51:05
tags:
- AC自动机
- 序列自动机
- 后缀数组
- 后缀自动机
- 回文自动机
- 字符串
- DFA
categories:
- note
password: Violet Evergarden
mathjax: true
---

# DFA

有限状态自动机

$DFA$ 可以用一个 5 元组  $(Q,\Sigma,\sigma,q_0,F)$ 表示，其中 $Q$ 为状态集，$\Sigma$ 为字母表，$\sigma$ 为转移函数，$q_0$ 为起始状态，$F$ 为终态集

如何判断一个字符串是否能被一个 $DFA$ 接受呢？

一开始时，自动机在起始状态 $q_0$ ，每读入一个字符 $c$ 后，$q \to \sigma(q,c)$ ，其中 $q$ 为当前状态

当整 个字符串转移完成后，当且仅当 $q \in F$ ，DFA 接受这个字符串

自动机主要是为了类似一个图上 $dp$ 的计数或者最优化

## AC 自动机

$\text{Aho-Corasick Automaton}$

### Intro

主要是复习一下，从 $DFA$ 这个角度去理解

构造 $fail$ 指针的目的就是为了遍历利用递推的方式求出 $\sigma (q,c)$

所以除了传统的转移方式，我们再跑文本串 $target$ 的时候也可以直接 `j=tr[j][target[i]-'a']` 通过 $\sigma$ 完成

同时 $AC$ 自动机还有很好的性质，就是可以完成 `topsort` 但是 $top_i \not =i $ 一定要按照 $top_i$ 转移，是 `f[fail[ans[i]]] <- f[ans[i]]` 不是 `f[fail[i]] <- f[i]`



[P3808 AC 自动机（简单版）](https://www.luogu.com.cn/problem/P3808)

[P3796 AC 自动机（简单版 II）](https://www.luogu.com.cn/problem/P3796)

[P5357 【模板】AC 自动机](https://www.luogu.com.cn/problem/P5357)



### Problem

一个基本的题目 [P4045 [JSOI2009\] 密码 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4045)

$dp$ 是显然的，$f_{i,j,S}$ 表示构造到第 $i$ 位，在自动机上 $j$ 节点，当前拥有了 $S$ 状态的字符串，但是构造方案比较巧妙，我们还是可以按照 $dp$ 的方式直接暴力用 $(i,j,S,now)$ 的四元组转移，$now$ 为当前字符串

但是这样的话得减个枝，先把可能的状态 $dp$ 出来，就是可以到 $F$ 的状态 $dp$ 出来，打个标记，这个用记忆化搜索就行

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=110,M=12;
int n,m,idx,ans;
int tr[N][26],f[30][N][(1<<10)+10],st[N],fail[N];
int vis[30][N][(1<<10)+10],g[30][N][(1<<10)+10];
char s[N];
string op[N];
map<string,bool> apr;
vector<string> str;

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

void ins(char *s,int id)
{
    int now=0;
    for(int i=1;s[i];i++)
    {
        int word=s[i]-'a';
        if(!tr[now][word]) tr[now][word]=++idx;
        now=tr[now][word];
    }
    st[now]|=1<<id-1;
}

void build()
{
    queue<int> q;
    for(int i=0;i<=25;i++)
        if(tr[0][i]) q.push(tr[0][i]);
    
    while(q.size())
    {
        int x=q.front();
        q.pop();

        for(int i=0;i<=25;i++)
        {
            int &now=tr[x][i];
            if(!now) now=tr[fail[x]][i];
            else fail[now]=tr[fail[x]][i],q.push(now),st[now]|=st[fail[now]];
        }
    }
}

bool get(int i,int j,int S)
{
    if(vis[i][j][S]) return g[i][j][S];
    vis[i][j][S]=1;
    if(i==m) return g[i][j][S];
    for(int v=0;v<=25;v++)
        g[i][j][S]|=get(i+1,tr[j][v],S|st[tr[j][v]]);
    return g[i][j][S];
}

void dfs(int i,int j,int S,string now)
{
    if(!g[i][j][S]) return;
    if(i==m)
    {
        if(S==(1<<n)-1 && !apr.count(now)) str.pb(now),apr[now]=1;
        return;
    }

    for(int v=0;v<=25;v++)
        dfs(i+1,tr[j][v],S|st[tr[j][v]],now+char('a'+v));
}

//f[i][j][S] len=i now=j S
signed main()
{
    m=fr(),n=fr();
    for(int i=1;i<=n;i++)
    {
        scanf("%s",s+1),ins(s,i);
        for(int j=1;s[j];j++) op[i].pb(s[j]);
    }
    build();
    f[0][0][0]=1;
    for(int i=0;i<m;i++)
        for(int j=0;j<=idx;j++)
            for(int S=0;S<=(1<<n)-1;S++)
                for(int v=0;v<=25;v++)
                    f[i+1][tr[j][v]][S|st[tr[j][v]]]+=f[i][j][S];
    for(int i=0;i<=idx;i++) ans+=f[m][i][(1<<n)-1],g[m][i][(1<<n)-1]=f[m][i][(1<<n)-1];
    fw(ans),nl;
    if(ans<=42) 
    {
        get(0,0,0);
        dfs(0,0,0,"");
        sort(str.begin(),str.end());
        for(string &v:str)
            printf("%s\n",v.c_str());
    }
    return 0;
}
```



## 序列自动机

$\text{Sequence Automaton}$

### Intro

接受且仅接受一个字符串的子序列的自动机

我们把一个子序列拆成一个个字符，只考虑本质不同的子序列（位置不同的不算，只统计最早的），我们只需要记录子序列的起始位置和它的转移函数就可以在自动机上面跑

具体来说，设 $\sigma (u,c)=\{i|i \gt u,s_i=c\}$ 这样就可以只统计最前的子序列，理论上一个自动机有 $O((n+1)|\Sigma|)$ 个状态



[P5826 【模板】子序列自动机](https://www.luogu.com.cn/problem/P5826)

一般来说可以在 $O(n|\Sigma|)$ 的时间倒着转移出 $\sigma$ ，但是字符集在 $10^6$ 级别的时候直接 $O(n\log n)$ ，用 $set$ 维护值域暴力二分即可



例题

求 $A$ 的最短子串不是 $B$ 的子序列

直接枚举 $O(n^2)$ 在 $B$ 的自动机上面跑，不接受 $q \to m+1$ 则计入答案

求 $A$ 的最短子序列不是 $B$ 的子序列

$f_{i,j}$ 表示在 $A$ 的自动机 $i$ 状态，$B$ 的自动机 $j$ 状态还需要多少个字母能满足条件

初始设 $f_{i,null}=0$ 即可，$f_{i,j} \leftarrow \min f_{\sigma(i,c),\sigma(j,c) }+1 [\sigma (i,c) \not = null]$



### Problem

[P3856 [TJOI2008\] 公共子串 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3856)

对三个序列建自动机，$f_{i,j,k}$ 表示在 $A_i,B_j,C_k$ 开头的所有合法子串，因为自动机会匹配最前面的，所以不会算重

$f_{i,j,k} \leftarrow \sum_{c\in \Sigma}  f_{\sigma(i,c),\sigma(j,c),\sigma(k,c)}[\sigma(i,c),\sigma(j,c),\sigma(k,c)\not = 0]+[i,j,k\not =0]$

直接向后面枚举字符转移然后加上当前的贡献即可



```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=110;
int null=2e9;
int f[N][N][N];
char a[N],b[N],c[N];

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

struct Seq_Auto
{
    int n,nxt[N][26];
    void init(char *s)
    {
        n=strlen(s+1);
        for(int i=0;i<=25;i++) nxt[n][i]=0;
        for(int i=n-1;~i;i--)
            for(int c=0;c<=25;c++)
                nxt[i][c]=s[i+1]==char(c+'a')?i+1:nxt[i+1][c]; 
    }
}A,B,C;

int dfs(int i,int j,int k)
{
	
	if(~f[i][j][k]) return f[i][j][k];
	int ans=i*j*k!=0;
	for(int c=0;c<=25;c++)
		if(A.nxt[i][c]*B.nxt[j][c]*C.nxt[k][c])
			ans+=dfs(A.nxt[i][c],B.nxt[j][c],C.nxt[k][c]);
	return f[i][j][k]=ans;
}

signed main()
{
    scanf("%s%s%s",a+1,b+1,c+1);
    A.init(a),B.init(b),C.init(c);
    memset(f,-1,sizeof f);
    fw(dfs(0,0,0));

    return 0;
}
```



## SA

$\text{Suffix Array}$

### Intro

$O(n\log n)$ 倍增法求出

$sa_i$ ：排名为 $i$ 的后缀是什么

$rk_i$ ：第 $i$ 个后缀的排名

$height_i$ ：$Lcp(sa_i,sa_{i-1})$

还有 $O(n)$ 的 $DC3,SA-IS$

建议打 SA 的时候把所有数组的含义写在函数上面



首先介绍一下基数排序，可以在 $O(V+n)$ 的时间内排序，桶排序的进阶版

同时如果倒着排序是稳定排序，还可以先倒着排序第二关键字，再排序第一关键字在 $O(V+n)$ 的时间内完成二元组排序



$sa_i$

倍增的思想就是先按排序 $k$ 个字符排序，然后利用上一次排序的结果拼出来 $2k$ 这样实现倍增，最后每个后缀按前 $k$ 个字符作为第一关键字，第 $k+1 \sim 2k$ 个字符作为第二关键字排序

至多进行 $\log n$ 次，$O(n\log n)$，注意虽然一开始值域大小是 $|\Sigma|$ 但是后面就变成至多 $O(n)$ 了

特判一下 `m==n` 即所有字符都排好序直接 `break` 优化一下

```cpp
//sa[i] 排名为 i 的后缀是什么
//fir[i] 第 i 个后缀的第一关键字
//sec[i] 按第二关键字排名为 i 的后缀是什么
void Radix_sort(int V)
{
	memset(ct,0,(V+1)<<2);
	for(int i=1;i<=n;i++) ct[fir[i]]++;
	for(int i=1;i<=V;i++) ct[i]+=ct[i-1];
	//倒着做是稳定排序
	//先将排好序的后缀变成后缀第一关键字的值 fir[sec[i]]
	//剩下的等价于 sa[ct[a[i]]--]=i
	for(int i=n;i;i--) sa[ct[fir[sec[i]]]--]=sec[i];
}

void SA()
{
	//1 只按第一关键字排序
	//第一关键字就是开头字母，第二关键字是编号，当然排名为 i 的就是 i
	for(int i=1;i<=n;i++) fir[i]=s[i],sec[i]=i;
	m=150,Radix_sort(m);
	
	//2 倍增
	for(int k=1;k<=n;k<<=1)
	{
		int cnt=0;
		for(int i=n-k+1;i<=n;i++) sec[++cnt]=i; //没有第二关键字的后缀 [n-k+1,n]
		
		//j=i+k 利用前一次的第一关键字求这一次的第二关键字
		//按照排序好的sa遍历这样第二关键字也是排好的，把后缀 [1,n-k] 加进去
		for(int j=1;j<=n;j++)
			if(sa[j]>k) sec[++cnt]=sa[j]-k;
		
		//排序+离散化
		Radix_sort(m);
		swap(fir,sec);
		fir[sa[1]]=m=1;
		for(int i=2;i<=n;i++) //注意现在 sec 存的是第一关键字了
			fir[sa[i]]=(sec[sa[i]]==sec[sa[i-1]] && sec[sa[i]+k]==sec[sa[i-1]+k])?m:++m;
		if(m==n) break;
	}
}
```



$height_i$

先介绍一个 $lcp$ 的性质

在 $sa$ 中，排好序后，$lcp(i,j)=\forall k \in [i,j]\,\min (lcp(i,k),lcp(k,j))$，$i$ 代指后缀 $sa_i$，其余同理

画两个图就知道了，设 $p=\min (lcp(i,k),lcp(k,j))$  ，则至少 $i,j$ 有 $p$ 的公共部分，则 $lcp(i,j) \geq p$

同时我们反证，如果 $lcp(i,j)=q \gt p$，则 $q \geq p+1 \Rightarrow s_{i+p}=s_{j+p} \Rightarrow s_{i+p}=s_{k+p} \operatorname{or} s_{j+p}=s_{k+p}$ 

如果两个都是 $p$ 那么 $lcp(i,j)$ 一定是 $p$ 传递一下即可，因为 $s_{j+k} \gt s_{k+p} \gt s_{i+p}$ 

否则较小的那个必然扩展一个，则可推出上面的结论，与较小的那个 $lcp$ 不符

这样还有一个推论，$lcp(i,j) =\min_{k=i}^{j-1} lcp(k,k+1)$，如果问任意两个后缀，可以做到 $O(n\log n)-O(1)$ 的 `Rmq`

我们进而推出，随着 $|rk_i-rk_j|$ 递增，$lcp(i,j)$ 不增



设 $h_i=height_{rk_i}$，则有 $h_i  \geq h_{i-1}-1$

首先判掉 $rk_i=1$ 的情况，不妨设后缀 $i-1$ 在 $i$ 前面，$i-1$ 前面的是后缀 $k$，则推得 $k+1$ 一定在 $i$ 前面，又知道 $lcp(k+1,i)=lcp(i-1,k)-1$

根据 $lcp(k+1,i)=\min (lcp(k+1,k),lcp(j,i))$，则 $lcp(j,i) \geq lcp(k+1,i) = lcp(i-1,k)-1$

也就是 $h_i \geq h_{i-1}-1$

```
      k+1
k    | |   |
i-1  | |   |
       i
k+1  |    |
j    |    |
i    |    |
```



每次暴力增，考虑指针相当于从 $-n \to +n$，复杂度 $O(n)$

```cpp
void Height()
{
	for(int i=1;i<=n;i++) rk[sa[i]]=i;
	for(int i=1,k=0;i<=n;i++)
	{
		if(rk[i]==1) continue;
		if(k) k--;
		int j=sa[rk[i]-1];
		while(i+k<=n && j+k<=n && s[i+k]==s[j+k]) k++;
		hgt[rk[i]]=k;
	}
}
```



完整代码

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int n,m;
int ct[N],fir[N],sec[N],sa[N],rk[N],hgt[N];
char s[N];

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

//sa[i] 排名为 i 的后缀是什么
//fir[i] 第 i 个后缀的第一关键字
//sec[i] 按第二关键字排名为 i 的后缀是什么
void Radix_sort(int V)
{
	memset(ct,0,(V+1)*sizeof ct[0]);
	for(int i=1;i<=n;i++) ct[fir[i]]++;
	for(int i=1;i<=V;i++) ct[i]+=ct[i-1];
	//倒着做是稳定排序
	//先将排好序的后缀变成后缀第一关键字的值 fir[sec[i]]
	//剩下的等价于 sa[ct[a[i]]--]=i
	for(int i=n;i;i--) sa[ct[fir[sec[i]]]--]=sec[i];
}

void SA()
{
	//1 只按第一关键字排序
	//第一关键字就是开头字母，第二关键字是编号，当然排名为 i 的就是 i
	for(int i=1;i<=n;i++) fir[i]=s[i],sec[i]=i;
	m=150,Radix_sort(m);
	
	//2 倍增
	for(int k=1;k<=n;k<<=1)
	{
		int cnt=0;
		for(int i=n-k+1;i<=n;i++) sec[++cnt]=i; //没有第二关键字的后缀 [n-k+1,n]
		
		//j=i+k 利用前一次的第一关键字求这一次的第二关键字
		//按照排序好的sa遍历这样第二关键字也是排好的，把后缀 [1,n-k] 加进去
		for(int j=1;j<=n;j++)
			if(sa[j]>k) sec[++cnt]=sa[j]-k;
		
		//排序+离散化
		Radix_sort(m);
		swap(fir,sec);
		fir[sa[1]]=m=1;
		for(int i=2;i<=n;i++) //注意现在 sec 存的是第一关键字了
			fir[sa[i]]=(sec[sa[i]]==sec[sa[i-1]] && sec[sa[i]+k]==sec[sa[i-1]+k])?m:++m;
		if(m==n) break;
	}
}

void Height()
{
	for(int i=1;i<=n;i++) rk[sa[i]]=i;
	for(int i=1,k=0;i<=n;i++)
	{
		if(rk[i]==1) continue;
		if(k) k--;
		int j=sa[rk[i]-1];
		while(i+k<=n && j+k<=n && s[i+k]==s[j+k]) k++;
		hgt[rk[i]]=k;
	}
}

int main()
{
	scanf("%s",s+1);
	n=strlen(s+1);
	SA(),Height();
	for(int i=1;i<=n;i++) fw(sa[i]),pt;
	nl;for(int i=1;i<=n;i++) fw(hgt[i]),pt;

	return 0;
}
```



### Problem

需要认识到一点，所有子串都是某个后缀的前缀，而相同子串一定出现在排序后的连续后缀中

0x00 [P2852 [USACO06DEC\] Milk Patterns G](https://www.luogu.com.cn/problem/P2852)

问题等价于，在 $height_i$ 形成的序列上找一段 $len \geq k-1$，且最小值最大的区间，单调队列维护即可，$O(n\log n)$ 

注意为了方便处理 $SA$ 的字符集不要出现 $0$



0x01 求 $[l,r]$ 的出现次数

在 $[l,n]$ 这个后缀左右的 $hgt$ 左右扫，二分 $hgt \geq r-l+1$ 的长度即可



0x02 本质不同的子串个数

后缀 $sa_i$ 的长度为 $n-sa_i+1$，这就是要统计的子串，但是有一些子串算重了，有 $hgt_i$ 个前缀一定在上一个 $sa_{i−1}$ 计算过了

答案即为 $\sum (n-sa_i+1-hgt_i)$



0x03 $S,T$ 的最长公共子串

设 `R=S+'#'+T` ，直接求出 $SA$，然后求来自**不同串**的最大 $hgt_i$，就是 $sa_i$ 和 $sa_{i-1}$ 分别属于 $S,T$



0x04 [P1117 [NOI2016\] 优秀的拆分](https://www.luogu.com.cn/problem/P1117)

$O(n\log n)$ 算法

本质上是统计 $AA$ 和 $BB$ 的数量再乘，我们不难想到枚举长度

这时候就有一个非常经典的做法，每隔 `len` 就放一个观察点，然后长度为 `len` 的 $AA$ 必然跨过 $2$ 个观察点，我们只需要求出多少个是合法的，用 $lcp+lcs$ 一拼就可以，可以用 SA 做到 $O(n\log n)-O(1)$

合法当且仅当 `lcp+lcs>=len` ，合法的一共有 $lcp+lcs-len+1$ 个，算一下起点和终点然后大力差分即可

注意这里的 $lcp$ 和 $len$ 要取 $\min$，$lcs$ 和 $len-1$ 要取 $\min$

这是因为如果 $lcs$ 取到 $len$ 了，就变成了上一个关键点和当前关键点了，而不是当前关键点和下一个关键点，算重了

$lcp$ 取到 $len$ 敲好卡在两个关键点之间

```
...i-1 i....j-1 j.... [i=k*len,j=(k+1)*len]
   lcs lcp  lcs lcp
```

```cpp
#include<bits/stdc++.h>
#define int long long
#define il inline
#define mem(a,v) memset(a,v,sizeof a)
#define pt putchar(' ')
#define nl puts("")
#define pb push_back
#define pi pair<int,int>
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=3e4+10,Q=998244353,P=131;
int n,m;
int f[N],g[N],lg[N];
char s[N];

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
il int max(int a,int b){return a>b?a:b;}
il int min(int a,int b){return a<b?a:b;}

struct Suffix_Auto
{
	int sa[N],rk[N],hgt[N],ct[N],fir[N],sec[N],Min[16][N];
	
	void init()
	{
		mem(sa,0),mem(rk,0),mem(hgt,0);
		mem(ct,0),mem(fir,0),mem(sec,0);
	}
	
	//sa[i] 排名 i 的后缀是什么
	//fir[i] 第 i 个后缀的第一关键字
	//sec[i] 按照第二关键字排序后排名为 i 的后缀是什么
	void Radix_sort(int V)
	{
		memset(ct,0,(V+1)*sizeof ct[0]);
		for(int i=1;i<=n;i++) ct[fir[i]]++;
		for(int i=1;i<=V;i++) ct[i]+=ct[i-1];
		for(int i=n;i;i--) sa[ct[fir[sec[i]]]--]=sec[i];
	}
	
	void SA()
	{
		//1 only first key sort
		for(int i=1;i<=n;i++) fir[i]=s[i],sec[i]=i;
		m=122,Radix_sort(m);
		
		for(int k=1;k<=n;k<<=1)
		{
			//2 sort by second key
			int cnt=0;
			for(int i=n-k+1;i<=n;i++) sec[++cnt]=i;
			for(int j=1;j<=n;j++)
				if(sa[j]>k) sec[++cnt]=sa[j]-k;
			
			Radix_sort(m);
			swap(fir,sec);
			fir[sa[1]]=m=1;
			for(int i=2;i<=n;i++)
				fir[sa[i]]=(sec[sa[i]]==sec[sa[i-1]] && sec[sa[i]+k]==sec[sa[i-1]+k])?m:++m;
			if(m==n) break;
		}
	}
	
	void Height()
	{
		for(int i=1;i<=n;i++) rk[sa[i]]=i;
		for(int i=1,k=0;i<=n;i++)
		{
			if(rk[i]==1) continue;
			if(k) k--;
			int j=sa[rk[i]-1];
			while(i+k<=n && j+k<=n && s[i+k]==s[j+k]) k++;
			hgt[rk[i]]=k;
		}
	}
	
	void RMQ()
	{
		for(int i=1;i<=n;i++) Min[0][i]=hgt[i];
		for(int k=1;(1<<k)<=n;k++)
			for(int i=1;i+(1<<k)-1<=n;i++)
				Min[k][i]=min(Min[k-1][i],Min[k-1][i+(1<<k-1)]);
	}
	
	int lcp(int i,int j)
	{
		if((i=rk[i])>(j=rk[j])) swap(i,j);
		int k=lg[j-i++];
		return min(Min[k][i],Min[k][j-(1<<k)+1]);
	}
	
	void work(){init(),SA(),Height(),RMQ();}
}S,T;

void solve()
{
	scanf("%s",s+1);
	n=strlen(s+1);
	S.work();
	reverse(s+1,s+n+1);
	T.work();
	
	mem(f,0),mem(g,0);
	int ans=0;
	for(int len=1;(len<<1)<=n-2;len++)
		for(int i=len,j=(len<<1);j<=n;i+=len,j+=len)
		{
			int lcp=min(S.lcp(i,j),len),lcs=min(T.lcp(n-(i-1)+1,n-(j-1)+1),len-1);
            if(lcp+lcs<len) continue;
            int seg=lcp+lcs-len+1;
            g[i-lcs]++,g[i-lcs+seg]--;
            f[j+lcp-seg]++,f[j+lcp]--;
		}
	for(int i=1;i<=n;i++) f[i]+=f[i-1],g[i]+=g[i-1];
    for(int i=1;i<n;i++) ans+=f[i]*g[i+1];
	fw(ans),nl;
}

signed main()
{
	lg[0]=-1;
	for(int i=1;i<=3e4;i++) lg[i]=lg[i>>1]+1;
	 
	int T=fr();
	while(T--) solve();
}
```



0x05 冰茶姬应用

本质上 SA 最重要的东西就是 `Height` 数组，利用好 `lcp` 的性质就可以大大简化问题，在 `sa` 意义下考虑，即在 `height` 数组上考虑问题会简单很多

[P2178 [NOI2015\] 品酒大会](https://www.luogu.com.cn/problem/P2178)

这种题目都可以做一种扫描线的事情，我们倒着扫

首先我们发现因为 `height` 随距离不升的性质，满足条件的一组后缀一定是相邻的，$lcp \geq r$ 的一些段

而随着 $r$ 的减小，本来一些 $heigh_i=r'$ 的后缀卡住了自己所在段和别的段，现在这个限制就满足了

我们从大到小做 $height$ 的扫描线，每次用并查集合并两个段，合并时更新答案，我们需要维护每个段的 $\max \operatorname{and} \min$，每次增加的方案是 $sz_x \times sz_y$ 

```cpp 
const int N=3e5+10;
int n,m,ans=-1e18,cnt;
int sa[N],rk[N],hgt[N],ct[N],fir[N],sec[N];
int p[N],sz[N],mx[N],mn[N];
char s[N];
vector<int> add[N];
pi res[N];

int find(int x)
{
    if(x^p[x]) p[x]=find(p[x]);
    return p[x];
}

void merge(int x,int y)
{
    int px=find(x),py=find(y);
    if(sz[px]<sz[py]) swap(px,py); 
    cnt+=sz[px]*sz[py],sz[px]+=sz[py];
    ans=max({ans,mx[px]*mx[py],mn[px]*mn[py]});
    mx[px]=max(mx[px],mx[py]),mn[px]=min(mn[px],mn[py]);
    p[py]=px;
}

signed main()
{
    scanf("%lld%s",&n,s+1);
    SA(),Height();
	for(int i=2;i<=n;i++) add[hgt[i]].pb(i);
    for(int i=1;i<=n;i++) mx[rk[i]]=mn[rk[i]]=fr();
    iota(p+1,p+1+n,1),fill(sz+1,sz+1+n,1);

    for(int r=n-1;~r;r--)
    {
        for(int &pos:add[r])
            merge(pos,pos-1);
        if(cnt) res[r]={cnt,ans};
    }
    for(int i=0;i<=n-1;i++)
        fw(res[i].first),pt,fw(res[i].second),nl;
    
    return 0;
}
```



[P6793 [SNOI2020\] 字符串](https://www.luogu.com.cn/problem/P6793)

差不多的题目，我们看成后缀匹配的话，问题等价于求一个匹配序列最小化 $\sum (k-lcp(a_i,b_i))$，即最大化 $k \times (n-k+1)-\sum lcp(a_i,b_i)$ 后半部分

我们首先经典造 `R=S+'#'+T` 建 SA，然后给每个满足条件的 `S` 后缀和 `T` 后缀一个权值，`S` 给 $1$，`T` 给 $-1$，还是按照 $height$ 扫描线，然后暴力合并集合，合并时更新答案，每次合并的贡献是，两个集合可匹配的数量 $\times \min(k,lcp)$ 

```cpp
const int N=3e5+10; //数组开两倍
int n,m,k,ans;
int sa[N],rk[N],hgt[N],ct[N],fir[N],sec[N];
int p[N],w[N];
char s[N];
vector<int> add[N];

int merge(int x,int y)
{
    int px=find(x),py=find(y);
    int res=w[px]*w[py]>0?0:min(abs(w[px]),abs(w[py])); //同号说明是集合还没匹配的都是来自同一个串不能匹配
    p[py]=px,w[px]+=w[py];
    return res;
}

signed main()
{
    freopen("data.in","r",stdin);
    n=fr(),k=fr();
    scanf("%s",s+1);
    s[n+1]='#',scanf("%s",s+n+2);

    int tot=n;
    (n<<=1)|=1;
    SA(),Height();
	for(int i=2;i<=n;i++) add[hgt[i]].pb(i);
    for(int i=1;i<=n;i++)
    {
        if(sa[i]<=tot-k+1) w[i]=1; //合法 S 后缀
        else if(sa[i]>=tot+2 && sa[i]<=n-k+1) w[i]=-1; //合法 T 后缀
    }
    iota(p+1,p+1+n,1);

    n>>=1;
    ans=(n-k+1)*k;
    for(int i=n;~i;i--)
        for(int &pos:add[i])
            ans-=merge(pos-1,pos)*min(i,k);
    fw(ans);
    return 0;
}
```



## SAM

$\text{Suffix Automaton}$

### Intro

#### 基本介绍

字符串 $S$ 的 SAM 是一个可以接受 $S$ 的所有后缀的 **最小** $DFA$

如果我们从 $q_0$ 出发，通过若干次转移到达了一个 $F$，则路径上的所有边（转移）所标记的字母连接起来所形成的字符串必定是原串 $S$ 的一个后缀，字符串 $S$ 的每一个后缀均可以表示成 $DAG$ 中一条从 $q_0$ 出发到 $F$ 的路径

SAM 最常用的功能是储存 **每一个子串**，而空间复杂度为 $O(n)$，也就是 $DAG$ 的边数点数都是 $O(n)$

在构造部分有具体复杂度讨论



Eg:

$q_0$ 为节点 $1$ ，终止节点为红色节点

`qwqaqwq` 

![image-20240206204325170](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202402062043606.png)

给 SAM`wqaqwq` 

![](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202402062043214.png)

最后走到了终止结点 $8$ ，这说明 `wqaqwq` 是原串后缀

查询串 `qaq` 和 `qwq` 

![](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202402062053220.png)

但是我们注意到 $5 \to 6 \to 7 \to 8$ 也是同样的子串，这样就浪费了



以下理论及证明见 理论部分详见

 [后缀自动机(SAM)奶妈式教程 - ZTer - 博客园 (cnblogs.com)](https://www.cnblogs.com/zaza-zt/p/15419181.html)

[史上最通俗的后缀自动机详解 - KesdiaelKen 的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/Kesdiael3/hou-zhui-zi-dong-ji-yang-xie)



#### Endpos

记 $endpos(s)$ 为 $s$ 在字符串 $S$ 中每次出现的结束位置

$endpos(s)$ 我们 $s$ 在哪里出现了，以及出现了几次

```
S="abab"
        s =  "a"  "b","ab"  "aba","ba"  "abab","bab"  
endpos(s) = {1,3}  {2,4}        {3}          {4}
```



每个等价类 $E$ 是一个**字符串构成的集合**，同一个等价类中包含的所有字符串的 $endpos$ 相同

SAM 的 `DAG/Tree` 中 **每一个结点 $x$ 对应了一个 $endpos$ 等价类**

结论

以下设 $|s_1| \leq |s_2|$，$E$ 为等价类，记 $s_1 * s_2$ 表示 $s_1$ 是 $s_2$ 的后缀

设 $l(E),r(E)$ 分别为 $E$ 中字符串的最短最长长度，设最长子串 $R(E)$，最短子串 $L(E)$

1. 如果 $s_1,s_2 \in E$，则 $s_1 *s_2$

2. 若 $s_1*s_2$，则 $E(s_2) \subseteq E(s_1)$ 

	若 $s_1 \not * s_2$ ，则 $E(s_1)\,\cap\,E(s_2)=\varnothing$

3. 如果 $s_1,s_2 \in E$，且 $s_1,s_2$ 本质不同，则 $|s_1| \not = |s_2|$

4. $E$ 内的所有子串长度可以不重不漏覆盖 $[l(E),r(E)]$

5. 等价类个数为 $O(n)$



证明 $4$

不妨设 $Q=\{x|l(E) \leq x \leq r(E)\}$，只需要证明 $Q\subseteq E\,\land\,E\subseteq Q$，当然这里的 $E$ 就是指所有 $E$ 内字符串模的并集

首先所有 $E$ 中的字符串 $s_i * R$ 

$E \subseteq Q$ 这是显然的，而我们反证，假设存在 $s_i \in Q,s_i \not \in E$，设 $s_i \in E'$，因为 $L * s_i,s_i *R$，则由引理二 $E \subseteq E' \subseteq E \Rightarrow E=E'$，矛盾



证明 $5$

不断在 $L(E)$ 前面增加字母就会产生新的 $edpos$ 集合，设新集合为 $E'$，$E' \subseteq E$，我们可以认为是把 $E$ 分割了，最初只有 $\{1,2,\ldots,n\}$ ，最差的分割就是线段树分割，我们知道是 $O(n)$ 级别的



#### Parent Tree

增量构造，初始根节点代表所有空串

$endpos$ 之间的包含关系画成一棵树就是 $\text{Parent Tree}$

设当前节点为 $x$，则有 $r(fa_x)=l(fa_x)-1$

$fa_x$ 的含义是，我们从空节点 $\varnothing$ 开始在 $R(E)$ 上增加字母得到 $E'$ 即新节点，直至无法增加字母，$fa(E')=E$

从某个等价类 $E$ 不断跳 $fa$ 到初始结点 $q_0$ 就可以访问 $E$ 中最长子串 $R(E)$ 的每一个后缀，即从当前节点跳到根节点的路径的含义

~~节点数是 $O(n)$ 的，当然边数是 $O(n)$ 的~~

两个 $naive$ 结论

1. 父结点的 $endpos$ 包含子结点的 $endpos$
2. 父结点等价类中的所有子串都是当前等价类中任意子串的后缀



#### 构造算法

只要构造一个含有所有后缀的自动机，其就含有所有子串。

我们把目前**新产生的所有后缀都加入自动机**即可，新产生的后缀，无非就是在所有旧后缀(包括空)后面再加上一个新字符

SAM 中的节点是和 `Parent Tree` 中的节点一样的，还需要补上的就是自动机的 $\sigma (q,c)$ 函数，完成 `DAG` 的构建

Step 1

希望找到 $s+c$ 对应的节点的后缀链接，这个点的字符串是 $s+c$ 的后缀，且在所有这些点中满足 $R$ 是最长的一个

满足是 $s+c$ 后缀的节点，必然是由一个 $s$ 的后缀节点通过出边 $c$ 连过来的。$s$ 的后缀节点都是 `Parent Tree` 中 $last$ 的祖先，而前面已经把 $last$ 的 `fa` 连好了，所以只要顺着 $last$ 的 `fa` 往上走就能遍历所有可能满足条件的点了

把这些遍地到的后缀全部 $+c$ 进行转移，就可以造出来新后缀了

注意我们是可以遍历到 $s$ 的全部后缀的，因为一个等价类里面的长度连续，$lt$ 又是 $[1,i-1]$ 的后缀，而顺着 `Parent Tree` 我们是可以直接跳完全部 $lt$ 的后缀的，就是 $s$ 的全部后缀

Step 2

假设找到了那个节点 `p`，设 $\sigma (p,c)=q$，设当前 $s+c$ 的等价类编号为 $now$

1. $R(q)=R(p)+1$

​	我们此时发现首先 $R(q)*(s+c)$ ，又是最长的，符合定义所以 $fa(now)=q$

2. $R(q) \not =R(p)+1$

	此时 $len \in [L(q),R(p)+1]$ 的字符串是 $now$ 的后缀，但剩下的不是，否则它去掉 $c$ 也是 $s$ 的后缀，应该比 $p$ 更先跳到

	也就是此时 $q$ 的 $endpos$ 并不合法，存在两种 $endpos$，多了 $|S|+1$ 这个 $pos$

	我们可以直接裂掉 $q$，变成两个点 $q,q'$，这样回到情况 $1$，同时需要给这两个点的边修改一下，出边拷贝一份

	入边需要讨论一下，原来到 $q$ 的入边现在变成 $q'$ 的边即可

	而我们知道此时 $q'$ 的 $endpos$ 是完全包含 $q,now$ 的，又是最长的，直接挂上去 $fa$

向上跳的复杂度是建立 $\sigma (q,c)$ 的复杂度，$O(n|\Sigma|)$

裂点的复杂度相当于遍历一个点的入边，搞不捣



SAM 复杂度线性，是在字符集大小 $|\Sigma |$ 为常数的情况下

如果字符集过大，每个节点维护 `unordered_map` 即可，时间复杂度约 ？$O(n \log⁡ |\Sigma |)$ ，空间复杂度 $O(n)$

如果字符集足够小（例如 26 个英文字母），时间复杂度为 $O(n)$ ，空间复杂度升至 $O(n|\Sigma |)$ 



```cpp
void ins(int c)
{
	int p=lt,now=lt=++idx;
	f[now]=1,R[now]=R[p]+1; //代表 s[1,i-1] 的节点，只能+c到达当前等价类 s[1,i]
	
	//给当前等价类挂父亲
	while(~p && !E[p][c]) E[p][c]=now,p=fa[p]; //DAG 建图
	if(!~p) return void(fa[now]=0); //挂到根节点
	
	int q=E[p][c];
	if(R[q]==R[p]+1) return void(fa[now]=q);
	
	int cy=++idx;
	R[cy]=R[p]+1,fa[cy]=fa[q];
	memcpy(E[cy],E[q],sizeof E[cy]); //修改出边
	while(~p && E[p][c]==q) E[p][c]=cy,p=fa[p]; //重定向入边
	fa[q]=fa[now]=cy;
}
```



### Problem

0x00 **判断子串**

SAM 匹配

0x01 [P3804 【模板】后缀自动机(SAM)](https://www.luogu.com.cn/problem/P3804) **子串出现个数**

$SAM$ 比较厉害的地方在于我们还同时造出来原串的每个前缀，所有前缀的后缀就是所有子串，给所有前缀节点打个标记，然后这些前缀到根路径上的所有节点就是后缀，相当于给所有这些节点贡献 $+1$，树形 `dp` 即可

还可以从一个角度理解，首先需要清除对于一个 $E$，它拥有的**本质不同子串**是 $R(E)-R(fa(E))$，而 $endpos$ 这个等价类是难以构造的，但大小比较容易构造，因为 $endpos$ 是通过不断分裂集合得到的，所有前缀的 $|E|=1$，我们只用不断**合并** $E$ 就可以得到当前的大小

如果不想写常数太大的树形 `dp` 还有常数小的 `top` 序更新方法，给 `Parent Tree` 定向后也是 `DAG`，但是注意 `SAM` 因为裂点这个操作，一个节点的父亲节点编号不一定比它小，不能直接倒着做，但是一个节点的 `R` 的一定大于父亲，我们直接基数排序，按长度倒着做就行了

```cpp
#include<bits/stdc++.h>
#define ll long long
#define il inline
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e6+10;
int n,idx,lt;ll ans;
int E[N][26],fa[N],R[N],f[N],ct[N],rk[N];
char s[N];

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
il int max(int a,int b){return a>b?a:b;}
il int min(int a,int b){return a<b?a:b;}

void ins(int c)
{
	int p=lt,now=lt=++idx;
	f[now]=1,R[now]=R[p]+1;
	
	while(~p && !E[p][c]) E[p][c]=now,p=fa[p];
	if(!~p) return void(fa[now]=0);
	
	int q=E[p][c];
	if(R[q]==R[p]+1) return void(fa[now]=q);
	
	int cy=++idx;
	R[cy]=R[p]+1,fa[cy]=fa[q];
	memcpy(E[cy],E[q],sizeof E[cy]);
	while(~p && E[p][c]==q) E[p][c]=cy,p=fa[p];
	fa[q]=fa[now]=cy;
}

signed main()
{
	scanf("%s",s+1);
	n=strlen(s+1),fa[0]=-1;
	for(int i=1;i<=n;i++) ins(s[i]-'a');
	for(int i=1;i<=idx;i++) ct[R[i]]++;
	for(int i=1;i<=n;i++) ct[i]+=ct[i-1];
	for(int i=idx;i;i--) rk[ct[R[i]]--]=i;
	for(int i=idx;i;i--)
	{
		f[fa[rk[i]]]+=f[rk[i]];
		if(f[rk[i]]>1) ans=max(ans,1ll*f[rk[i]]*R[rk[i]]);
	}
	printf("%lld",ans);

	return 0;
}
```



0x02 **不同子串个数**

**SAM 上每一条路径对应唯一子串**，`DAG` $dp$ 路径数量即可 [P2408 不同子串个数](https://www.luogu.com.cn/problem/P2408)

如果需要在线，我们只需要统计每次 $now$ 带来的贡献，$R(now)-R(fa(now))$ 累加即可 [P4070 [SDOI2016\] 生成魔咒](https://www.luogu.com.cn/problem/P4070)



0x03 **最长公共后缀**

原串 S 的两个子串的最长公共后缀是这两个子串所属 $endpos$ 等价类对应结点在后缀树上 LCA 结点对应等价类中包含的最长的字符串

跳后缀链接可以访问后缀，那么两条链的公共节点就是公共后缀

找任意子串的 $E$ 位置可以先记录下每个前缀的所属节点，然后倍增往上跳到 $R(E) \leq r-l+1$，$O(n\log n)-O(\log n)$，然后就是树上两点 $lca$，$O(n\log n)-O(\log n)/O(1)$



0x04 **字典序第 k 大子串** [P3975 [TJOI2015\] 弦论](https://www.luogu.com.cn/problem/P3975)

$dp$ 经过每个子串的路径数量，每个点如果是算本质不同子串，给初始化为 $1$，否则初始化为 $|E|$，在 $DAG$ 上面跑贪心按字符顺序跑即可



0x05 **最小表示法**

对 $ss$ 建 SAM，$DAG$ 跑字典序最小的即可



0x06 **子串第一次出现的位置**

每个节点维护 $firpos(q)$，新建节点 $firpos(q)=R(p)+1$，赋值节点 $firpos(q')=firpos(q)$



0x07 **endpos 显式 ** [P4770 [NOI2018\] 你的名字](https://www.luogu.com.cn/problem/P4770)

求出 $endpos$ 集合，还是给每个前缀打标记，线段树合并即可，注意每次都要新建节点，因为还要访问合并前的节点不能复用



0x08 **最长公共子串** [#171. 最长公共子串](https://loj.ac/p/171)

类似 kmp/AC自动机，将一个字符串在另一个字符串的 SAM 上匹配，如果能转移则直接转移，否则遍历跳树，直到能转移或者遇到起始状态，过程中维护当前匹配的最长长度

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pb push_back
#define pi pair<int,int>
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int n,m,idx,lt;
int E[N][26],fa[N],R[N],rk[N],ct[N],f[N],ans[N];
char s[N];

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

void ins(int c)
{
	int p=lt,now=lt=++idx;
	R[now]=R[p]+1;
	while(~p && !E[p][c]) E[p][c]=now,p=fa[p];
	if(!~p) return void(fa[now]=0);
	
	int q=E[p][c];
	if(R[q]==R[p]+1) return void(fa[now]=q);
	int cy=++idx;
	R[cy]=R[p]+1,fa[cy]=fa[q];
	memcpy(E[cy],E[q],sizeof E[cy]);
	while(~p && E[p][c]==q) E[p][c]=cy,p=fa[p];
	fa[now]=fa[q]=cy;
}

void Radix_sort()
{
	for(int i=1;i<=idx;i++) ct[R[i]]++;
	for(int i=1;i<=n;i++) ct[i]+=ct[i-1];
	for(int i=idx;i;i--) rk[ct[R[i]]--]=i;
}

int main()
{
	m=fr()-1;
	scanf("%s",s+1);
	n=strlen(s+1),fa[0]=-1;
	for(int i=1;i<=n;i++) ins(s[i]-'a');
	Radix_sort();
	
	memset(ans,0x3f,sizeof ans);
	while(m--)
	{
		memset(f,0,(idx+1)*sizeof f[0]);
		scanf("%s",s+1);
		n=strlen(s+1);
		for(int i=1,now=0,len=0;i<=n;i++)
		{
			int c=s[i]-'a';
			while(~now && !E[now][c]) now=fa[now],len=R[now];
			if(!~now) len=0,now=0;
			if(E[now][c]) now=E[now][c],len++;
			f[now]=max(f[now],len);
		}
		
		for(int i=idx;i;i--)
		{
			f[fa[rk[i]]]=max(f[fa[rk[i]]],min(R[fa[rk[i]]],f[rk[i]]));
			ans[rk[i]]=min(ans[rk[i]],f[rk[i]]);
		}
	}
	
	int res=0;
	for(int i=1;i<=idx;i++) res=max(res,ans[i]);
	fw(res);
}
```





## PAM

$\text{Palindrome Automanton}$

### Intro

回文自动机，解决回文串问题

和 SAM 一样， SAM 是插入所有后缀，PAM 是插入所有回文串

节省空间的办法就是把回文串的一半挂在根节点上，再利用长回文串去掉收尾还是回文串的特点，只统计本质不同子串

回文串分奇偶两种，加分隔符很麻烦因此把 PAM 的状态分成两棵树，奇根为 1，偶根为 $0$，分别存奇偶串，PAM 上的一个点到根的路径上的字符串表示它所代表的回文串的其中一半

`abaabc`

![img](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202402062053948.png)



引入 $fail$ 指针，表示每个回文串的最长回文后缀，因为是回文串，所以同时也是原串的 $border$，可以理解为 kmp 的 $border$ 但是回文

偶根的 $fail(0)=1$ 指向奇根，奇根的 $fail$ 无需指定，任意一个长度为 $1$ 的字符串都是回文串，奇根不可能失配

每个节点维护回文串长度 $len$，$len(now)=len(fa)+2$，初始为了方便设 $len(1)=-1$



构造算法

增量构造

构造完了前 $n$ 个字符，现在要加入 $c$

上次次构造到了 $lt$，我们顺着 $lt$ 的 $fail$ 向上跳，直到能在头尾各 $+c$ 

判定即为 `s[pos-len[x]-1]==s[pos]` ，令此时满足条件的节点为 $p$

这样就找到了最长串，而还差一个 $\sigma (p,c)$，我们连上这条边

如果存在 $\sigma (p,c)$ 直接令 $now=\sigma (p,c)$，说明之前出现了这个子串

否则先挂上去 $now$ 的 $fail$，我们从 $fail(p)$ 往上跳，找 $now$ 的最长回文 $border$ 满足两侧都可以 $+c$

然后新建 $\sigma (p,c)$，修改 $len(now)=len(p)+2$

```
|   | |           | |
    c |<-len[p]->|n c
```

```
|          | |             | |
           c  |<-border->| n c
       |<-     len[p]    ->|
```



$O(n)/O(n\log |\Sigma|)$

```cpp
int find(int x,int pos)
{
	while(pos-len[x]-1<=0 || s[pos-len[x]-1]^s[pos]) x=fail[x];
	return x;
}

void ins(int i)
{
	int p=find(lt,i),c=id[s[i]];
	if(E[p][c]) return void(lt=E[p][c]);
	int now=lt=++cnt;
	fail[now]=E[find(fail[p],i)][c];
	E[p][c]=now,len[now]=len[p]+2;
}
```



### Problem

0x00 **以 $i$ 为结尾的回文子串个数** [P5496 【模板】回文自动机（PAM）](https://www.luogu.com.cn/problem/P5496)

我们知道加入 $s_i$ 的时候找到了最长回文串，而跳 $fail$ 就可以找到所有回文后缀，所求即为它在 $fail$ 树上的深度



0x01 [P4762 [CERC2014\] Virus synthesis](https://www.luogu.com.cn/problem/P4762)

PAM 还可以维护一个指向长度小于等于当前节点一半的最长回文 $border$

具体来说如果当前节点 $len(now) \leq 2$，$lnk(now)=fail(now)$

否则我们暴力从 $lnk(p)$ 开始跳 $fail$，直到 `s[i-len[p]-1]==s[i] && len[p]+2<=len[now]>>1`

这时 $lnk(now)=\sigma (p,c)$

回到题目，设 $f_i$ 表示仅构造出 PAM 上节点 i 代表串的最小操作次数，$ans=\min_{i} f_i+n-len_i$

$dp$ 一般都是跑 DAG，这里因为奇串只可能是偶串折了加几个字符来的，只考虑偶串即可，$f_{v} \leftarrow f_{x}+1 [\sigma (x,c)=v]$，让它在折之前先加个字符即可，所以我们初始要设偶根 $f(0)=1$，表示折一次

然后就是可以然后先构造 $border$，然后拼一下剩下的再折，这样就把 $border$ 省下来了

$f_x \leftarrow f_{lnk_x}+ \frac {len_x}{2}-len_{lnk_x}+1$，就是把剩下的造出来，然后再折一次

这里不用怕折多了，首先长度为 $2$ 的可以构造到下限 $2$，然后由于我们强制钦定只在偶树转移，长度 $\gt 2$ 的，我们这个 $f_{lnk_x}$ 一定是被折过的

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,lt,cnt=1;
int E[N][4],fail[N],len[N],lnk[N],f[N];
char s[N];
unordered_map<char,int> id={{'A',0},{'T',1},{'C',2},{'G',3}};

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

int find(int x,int pos)
{
	while(pos-len[x]-1<=0 || s[pos-len[x]-1]^s[pos]) x=fail[x];
	return x;
}

void ins(int i)
{
	int p=find(lt,i),c=id[s[i]];
	if(E[p][c]) return void(lt=E[p][c]);
	int now=lt=++cnt;
	fail[now]=E[find(fail[p],i)][c];
	E[p][c]=now,len[now]=len[p]+2;
	if(len[now]<=2) return void(lnk[now]=fail[now]);
	p=lnk[p];
	while(i-len[p]-1<=0 || s[i-len[p]-1]^s[i] || len[p]+2>len[now]>>1) p=fail[p];
	lnk[now]=E[p][c];
}

void solve()
{
	scanf("%s",s+1);
	n=strlen(s+1);
	for(int i=0;i<=cnt;i++)
		memset(E[i],fail[i]=len[i]=lnk[i]=0,sizeof E[i]);
	fail[0]=1,len[1]=-1,cnt=1,lt=0;
	for(int i=1;i<=n;i++) ins(i);
	
	int ans=n;
	memset(f,0x3f,(cnt+1)*sizeof f[0]);
	f[0]=len[0]=1;
	for(int x=0;x<=cnt;x++)
	{
		if(len[x]&1) continue;
		f[x]=min({f[x],len[x],f[lnk[x]]+1+(len[x]>>1)-len[lnk[x]]});
		for(int j=0;j<=3;j++)
			if(E[x][j]) f[E[x][j]]=min(f[E[x][j]],f[x]+1);
		if(x>=2) ans=min(ans,f[x]+n-len[x]);
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



0x02 **双向 PAM** [#141. 回文子串 - 题目 - LibreOJ (loj.ac)](https://loj.ac/p/141)

这个玩意有点神秘啊，反正就是因为是增量算法，方向并不重要，维护两个指针 $llt,rlt$ 即可，注意当整个字符串变成回文串的时候，要把两个指针变成一样的，比如这次是在右侧加字符变成了回文串，就把 $llt=rlt$
