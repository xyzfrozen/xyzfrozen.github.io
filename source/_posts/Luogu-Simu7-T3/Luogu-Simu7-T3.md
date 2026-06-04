---
title: Luogu Simu7 T3
date: 2023-10-19 23:44:22
tags:
- 字符串
- LCP
- 思维
- Trie
categories:
- problem
password: Violet Evergarden
mathjax: true
---

### 题目描述

给定 $n$ 个仅由小写英文字母构成的字符串，第 $i$ 个字符串记为 $S_i$。

若干个字符串的匹配度定义为：他们的最长公共前缀与最长公共后缀的长度的较小值的平方。特别地，单独一个字符串的匹配度为 $0$。

你需要将所有字符串分为若干组，最大化每组字符串的匹配度之和。

### 输入格式

第一行一个正整数 $n$。

接下来 $n$ 行，第 $i$ 行为一个字符串 $S_i$。

### 输出格式

一行一个整数，表示答案。

### 样例 #1

```
4
ioi
noi
iaknoi
iakioi
```

```
4
```

### 样例 #2

```
3
woruoshengrikuaile
woruoshengrikuaile
woruoshengrikuaile
```

```
324
```

### 样例 #3

```
6
hello
world
problem
hehello
word
poem
```

```
6
```

### 提示

#### 样例解释 1

一种最优方案是：

- `ioi` 单独一组，匹配度为 $0$。
- `noi` 单独一组，匹配度为 $0$。
- 将 `iaknoi` 与 `iakioi` 分为一组，匹配度为 $4$。

于是输出 $4$。

#### 样例解释 2

一种最优方案是：

- 将全部 $3$ 个字符串分为一组，匹配度为 $18^2 = 324$。

于是输出 $324$。

#### 数据范围与约定

- 对于 $16 \%$ 的测试数据，有 $2 \leq n \leq 16$，单个字符串长度不超过 $10$。
- 对于另外 $24 \%$ 的测试数据，本质不同字符串的数量不超过 $16$。
- 对于 $100 \%$ 的测试数据，有 $2 \leq n \leq 10^5$，所有字符串长度之和不超过 $2 \cdot 10^5$。
- 有 $28 \%$ 的测试数据中，所有字符串都是回文串。

保证输入字符串仅包含小写英文字母。

------

每一组至多两个字符串

一个 $Trick$：将 $\min(LCP,LCS)$ 转化为 $LCP$

比如字符串 `abcdef`，我们给它重构成 `(a,f)(b,e)(c,d)(d,c)(e,b)(f,a)` 这个新字符串 

这样 $min(LCP(S,T),LCS(S,T)) \Leftrightarrow LCP(S',T')$

统计前缀贡献问题，直接上 $Trie$ 树，考虑一个前缀的贡献是当前节点的数量 $\lfloor \frac {q[now]}{2} \rfloor \times |pre|^2$ ，但是一个前缀的贡献可能被算重，比如答案中的某一组的 $|LCP|=len$，当我们在遍历 $[1,len-1]$ 就会算重

所以我们每次只加入 $\Delta$ ，$val=|p|^2-|p-1|^2=2\times p-1$

注意字符集大小是 $25 \times 27$

```cpp  
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10,M=25*27+5;
int n,idx,ans;
int tr[N][M],q[N];
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

void insert()
{
	int now=0,m=strlen(s);
	for(int i=0;s[i];i++)
	{
		int word=(s[i]-'a')*26+(s[m-i-1]-'a');
		if(!tr[now][word]) tr[now][word]=++idx;
		now=tr[now][word];
		q[now]++;
	}
}

void dfs(int x,int len)
{
	ans+=q[x]/2*(2*len-1);
	for(int i=0;i<=25*27;i++)
		if(tr[x][i])
			dfs(tr[x][i],len+1);
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++)
	{
		scanf("%s",s);
		insert();
	}
	
	dfs(0,0);
	fw(ans);
	return 0;
}
```

