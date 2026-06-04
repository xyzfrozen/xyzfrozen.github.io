---
title: 连续段 Dp
date: 2023-09-30 00:04:57
tags:
- 连续段 Dp
categories:
- note
mathjax: true
---

# 连续段 Dp

## 简介

求个满足条件的排列数个数，存在一些例如 $a_i \lt a_j$ 的限制条件

假如我们记录哪些数出现过，那么显然状态会爆炸，无法记录

我们可以从大到小，或从小到大来填数

状态转移的过程可能与相邻的已插入元素的具体信息相关，如插入一个新元素时，需要知道与其插入位置相邻的两个元素的值是多少

[推荐文章](https://www.cnblogs.com/chroneZ/p/17299874.html "推荐文章")

## 基本操作

它的元素插入操作只会在连续段的两端进行，通过新建连续段，插入至已有连续段的两端，合并两连续段三类转移方式来进行状态转移

每一段内部都保证合法，相当于是 $[1,n]$ 这个问题的子问题，也可以认为是考虑这个小区间的答案，扩展到 $[1,n]$ 大区间

$f_{i,j}$ 表示考虑前 $i$ 个元素，分为 $j$ 个连续段的方案数

1. 新建连续段

元素 $i$ 构成的新段可以放在 $j-1$ 个段中间的任意位置和最前面最后面

$$f_{i,j} \leftarrow f_{i-1,j-1} \times j$$

2. 插入到已有段两端

元素 $i$ 个进入任意段

$$f_{i,j} \leftarrow f_{i-1,j} \times j$$

3. 合并两连续段

$$f_{i,j} \leftarrow f_{i-1,j+1} \times j$$

连续段的合并等操作均在连续段的两端进行，由于我们是按特定顺序依次插入元素的，因此端点的信息是便于维护的

考考虑仅对于一个连续段，其在端点处的插入操作

考虑对于两个连续段，其合并操作是怎样的

最后用数学归纳法汇总

## 例题

[P5999 [CEOI2016] kangaroo](https://www.luogu.com.cn/problem/P5999 "P5999 [CEOI2016] kangaroo")

转化题目意思

求满足 $p_1 \lt p_2 \gt p_3 \lt p_4...$，$p_1=s，p_n=t$ 的排列数

考虑连续段 $dp$，从小到大填数，即当前填的数比任意填好的数大

分类讨论

当前数 $\not=s，\not=t$

1. 新建连续段

后加入的数一定大于当前数，注意判断 $i\gt s$，和 $i\gt t$，$s，t$ 如果之前在，这两个的位置是不能动的

2. 插入到已有段两端

它因为不是第一个数或者最后一个数一定有一段是比它小的，而另一端又比它大，不满足

3. 合并两连续段

当前数两端的都比小，满足条件

否则 $$f_{i,j} \leftarrow f_{i-1,j-1}+f_{i-1,j}$$

新建连续段，只有一个位置合法 $f_{i-1,j-1} \times 1$，因为它一定是最前面或者最后面，可以完成操作 $2$ 插入，但是只有一个位置合法

最后答案即为 $f_{n,1}$

```cpp
const int N=2e3+10,Q=1e9+7;
int n,S,T;
int f[N][N];

signed main()
{
	n=fr(),S=fr(),T=fr();
	f[0][0]=1;
	for(int i=1;i<=n;i++)
		for(int j=1;j<=i;j++)
		{
			if(i==S || i==T) f[i][j]=(f[i-1][j-1]+f[i-1][j])%Q;
			else f[i][j]=((j-(i>S)-(i>T))*f[i-1][j-1]%Q+j*f[i-1][j+1]%Q)%Q;
		}
	fw(f[n][1]);
	return 0;
}
```

## 变式

[P2467 [SDOI2010\] 地精部落 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2467)

分奇偶讨论一下 $n$ 即可，强心钦定 $S,T$，考虑到 $S,T$ 可以互换，方案数还要 $\times 2$

```cpp
const int N=4210;
int n,Q,S,T;
int f[N][N];

int main()
{
	n=fr()+2,Q=fr();
	if(n&1) S=1,T=2;
	else S=1,T=n;
	
	f[0][0]=1;
	for(int i=1;i<=n;i++)
		for(int j=1;j<=i;j++)
		{
			if(i==S || i==T) f[i][j]=(f[i-1][j-1]+f[i-1][j])%Q;
			else f[i][j]=(1ll*(j-(i>S)-(i>T))*f[i-1][j-1]%Q+1ll*j*f[i-1][j+1]%Q)%Q;
		}
	
	fw(f[n][1]*2%Q);
	return 0;
}
```



## 推荐题目

[Phoenix and Computers](https://www.luogu.com.cn/problem/CF1515E "Phoenix and Computers")

[P7967 [COCI2021-2022#2] Magneti](https://www.luogu.com.cn/problem/P7967 "P7967 [COCI2021-2022#2] Magneti")

[#2743. 「JOI Open 2016」摩天大楼](https://loj.ac/p/2743 "#2743. 「JOI Open 2016」摩天大楼")

[ CF704B](https://www.luogu.com.cn/problem/CF704B " CF704B")
