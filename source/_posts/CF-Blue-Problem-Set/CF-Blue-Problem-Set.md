---
title: CF Blue Problem Set
date: 2025-10-07 16:19:00
tags:
- 线性Dp
- 数学
- 思维
mathjax: true
---



# CF2119D

[CF2119D Token Removing - 洛谷](https://www.luogu.com.cn/problem/CF2119D)

看到数据范围容易想到是 $n^2$ 的 $dp$ 

反向考虑每次删除的那个数是什么，对这样的序列称为 $b$

我们优化就是把不同的序列但是答案相同的统一，考虑 $f(a)$ 和序列 $b$ 的关系

$f(a)=\prod_{i} b_i [a_i \not = 0]$ ，因为相当于 $b_i$ 对应了这个位置 $a_i$ 可以取 $1 \sim b_i$

当然这个 $b$ 序列必须要合法才可以，$b_i \leq i \,\and\, |b| \leq n \,\and\, b_i \not = b_j$

https://www.luogu.com.cn/article/uj1xurtc

$f_{i,j}$ 表示第 $b_k=i \sim n$ 放了 $j$ 个 $b_k$ 的答案，考虑从 $i+1$ 转移

$f_{i,j}=f_{i+1,j}+f_{i+1,j-1} \times (n-i+1-(j-1)) \times i$

$ans= \sum_{0}^n f(1,i)$



# CF2152E

[CF2152E Monotone Subsequence - 洛谷](https://www.luogu.com.cn/problem/CF2152E)

首先是题目中的结论，根据 $Dilworth$ 定理，最长下降子序列的长度等于最小上升划分组数

如果不存在任意一组上升长度 $\geq n+1$，则至少有 $n+1$ 组，所以最长下降子序列长度 $\geq n+1$

每次询问所有，然后删掉给出的子序列，如果任意一组大小 $\geq n+1$ ，直接结束

如果不存在，那么至少有 $n+1$ 组上升子序列，根据 $Dilworth$ 定理，最长下降一定大于等于 $n+1$，我们找最长下降

我们考虑按组一组组找，从最后一组开始，去最后一组最后一个数，不断往前一组找前继

为这么这样一定可以走 $n+1$ 组呢，它在第 $i$ 组，如果第 $i-1$ 组没有它的前继，说明 $i-1$ 组的第一个数在他后面，它显然比第 $i-1$ 组的所有数小，但它却不在第 $i-1$ 组，矛盾 

```cpp
for(v=n*n+1;v;v--)
    if(a[v]==n+1) break;
while(a[v])
{
    ans.push_back(v);
    for(int j=v-1;j>=0;j--)
    	if(a[j]==a[v]-1)
    	{
        	v=j;
        	break;
    	}
}
```
