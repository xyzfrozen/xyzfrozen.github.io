---
title: Luogu Simu4 T2
date: 2023-10-01 17:29:37
tags:
- 线性 Dp
- 线段树
categories:
- problem
password: Violet Evergarden
mathjax: true
---

## 题目描述

青蛙和胡子叔叔打算合作送快递！

街道可以抽象成一条数轴，一开始青蛙和胡子叔叔都在原点。
一共有 $n$ 个时刻的快递任务，只有完成了前一个送快递任务才可以去完成下一个。

第 $i$ 个时刻，青蛙和胡子叔叔中的一个人要将快递送往位置 $k_i$，送完快递后，那个人将停留在位置 $k_i$。

请问如何分配二人送快递的任务才能使得两人送快递走过的总路程之和最小？

### 输入格式

第一行一个 $n$ 表示任务个数。

接下来一行 $n$ 个整数表示 $k_1$，$k_2$，$\cdots$，$k_n$。

### 输出格式

输出一行一个整数表示答案。

```
5
4 6 3 4 7
```

```
11
```

```
10
10 16 20 17 8 7 14 12 19 6
```

```
45
```

### 提示

### 样例解释

对于第一个样例，可以安排青蛙去送第 $1，2，5$ 个时刻的任务，走过的总路程为
$|4−0|+|6−4|+|7−6| = 7$；

剩下的安排胡子叔叔去送，走过的总路程为 $|3−0|+|4−3| = 4$。

二人走过的总路程为 $11$，可以证明这是最小的总路程。

### 数据范围

|  测试点编号   | $n ≤$  |    特殊性质    |
| :-----------: | :----: | :------------: |
|   $1,2,3,4$   |  $20$  |       /        |
|     $5,6$     | $100$  |       /        |
|  $7,8,9,10$   | $1000$ |       /        |
| $11,12,13,14$ | $10^5$ |       /        |
|    $15,16$    | $10^6$ | $1 ≤ k_i ≤ 50$ |
| $17,18,19,20$ | $10^6$ |       /        |

对于所有测试点，满足 $1 ≤ n ≤ 10^6, 1 ≤ k_i ≤ 10^9$。

------

## Sol

首先可以想到每次操作完之后一定有一个人在上一次到达的点上

因此我们可以设 $f_{i, j}$ 表示当前执行完了 1 到 $i$ 次操作，有一个人在点 $a_j$ ，并且另外一个人在 点 $a_i$ 上，每次枚举当前点谁做即可

考虑一个人的行动轨迹，一定是一段 $A$+ 一段 $B$ +$\ldots+$ 一段 $A$ 的形式，因此我们可以考虑枚举断点

设 $f_i$ 表示做完前 $i$ 次的最小代价，可以推出以下转移式:
$$
f_i=\min _{j=1}^{i-1} f_j+\sum_{k=j+1}^{i-1}\left|a_k-a_{k-1}\right|+\left|a_{j-1}-a_i\right|
$$
上一个人从 $j$ 做到 $i-1$ 然后换人，就是枚举最后一段 

$\Sigma_{k=j+1}^{i-1} |a_k-a_{k-1}|=s_{i-1}-s_{j}$
$$
f_i=\min _{j=1}^{i-1} f_j+s_{i-1}-s_j+\left|a_{j-1}-a_i\right|
$$
发现上述转移方程式可以分离成只与 $i$ 和 $j$ 独立相关，并且遇到绝对值显然就分类讨论

因此分类开两棵值域线段树维护区间最小值和单点修改即可

------

暴力 50 $pts$ 注意这种线性 $Dp$ 都需要在最后算 $ans$，而不是直接 $f_n$，这里是因为最后一段显然可能不止 $len=1$

相当于做了 $ABABABA_1$ 我们枚举做了 $BA_1$ 然后 $s_n-s_i$ 就是做完了 $B_2\ldots B_k\,[B_k=n]$ 

```cpp
const int N=1e6+10;
int n,ans=1e18;
int a[N],s[N],f[N];

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	for(int i=1;i<=n;i++) s[i]=abs(a[i]-a[i-1])+s[i-1];
	
	memset(f,0x3f,sizeof f);
	f[1]=a[1];
	for(int i=2;i<=n;i++)
		for(int j=1;j<i;j++)
			f[i]=min(f[i],f[j]+s[i-1]-s[j]+abs(a[j-1]-a[i]));
	for(int i=1;i<=n;i++) ans=min(ans,f[i]+s[n]-s[i]);
	fw(ans);
	return 0;
}
```



动态开点线段树，空间是 $O(2\times n\log W)$ 的开不下，同时注意值域的 $inf$ 和赋值的 $inf$ 不能混用！！

就离散化，用一个普通线段是代替，空间是 $O(2\times n \times 4)$ 的可以开下

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int n,ans=1e18,inf=1e18;
int a[N],b[N],c[N],s[N],f[N];

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

struct Seg
{
	struct node{
		int l,r;
		int v;
	}tr[N*4];
	
	void chf(int idx)
	{
		node &t=tr[idx],&ls=tr[idx<<1],&rs=tr[idx<<1|1];
		t.v=min(ls.v,rs.v);
	}
	
	void build(int ql,int qr,int idx)
	{
		tr[idx]={ql,qr};
		if(ql==qr)
		{
			tr[idx].v=inf;
			return;
		}
		int mid=(ql+qr)>>1;
		build(ql,mid,idx<<1);
		build(mid+1,qr,idx<<1|1);
		chf(idx);
	}
	
	void modify(int ql,int qr,int idx,int x)
	{
		node &t=tr[idx];
		if(t.l==t.r)
		{
			t.v=min(t.v,x);
			return;
		}
		
		int mid=(t.l+t.r)>>1;
		if(ql<=mid) modify(ql,qr,idx<<1,x);
		if(qr>mid) modify(ql,qr,idx<<1|1,x);
		chf(idx);
	}
	
	int query(int ql,int qr,int idx)
	{
		node &t=tr[idx];
		if(ql<=t.l && qr>=t.r)
			return t.v;
		int mid=(t.l+t.r)>>1,s=inf;
		if(ql<=mid) s=min(s,query(ql,qr,idx<<1));
		if(qr>mid) s=min(s,query(ql,qr,idx<<1|1));
		return s;
	}
}A,B;

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) a[i]=fr(),b[i]=a[i-1];
	for(int i=1;i<=n;i++) s[i]=abs(a[i]-a[i-1])+s[i-1];
	b[n+1]=a[n];
	sort(b+1,b+1+n+1);
	int len=unique(b+1,b+1+n+1)-b-1;
	for(int i=0;i<=n;i++)
		c[i]=lower_bound(b+1,b+1+len,a[i])-b;
		
	A.build(1,len,1),B.build(1,len,1);
	f[1]=a[1];
	A.modify(c[0],c[0],1,f[1]-s[1]-a[0]);
	B.modify(c[0],c[0],1,f[1]-s[1]+a[0]);
	for(int i=2;i<=n;i++)
	{
		f[i]=min(A.query(1,c[i],1)+a[i],B.query(c[i],len,1)-a[i])+s[i-1];
		A.modify(c[i-1],c[i-1],1,f[i]-s[i]-a[i-1]);
		B.modify(c[i-1],c[i-1],1,f[i]-s[i]+a[i-1]);
	}

	for(int i=1;i<=n;i++) ans=min(ans,f[i]+s[n]-s[i]);
	fw(ans);
	return 0;
}
```

