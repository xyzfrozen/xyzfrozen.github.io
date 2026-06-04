---
title: P5426 [USACO19OPEN] Balancing Inversions G
date: 2023-10-09 21:53:39
tags:
- 逆序对
- 思维
categories:
- problem
mathjax: true
---

考虑到答案的上界为逆序对的数量

证明：考虑每一次操作都是有效操作$(i,i+1)\,[a_i \gt a_{i+1}]$，否则数组必然已经不减

也可以考虑先将最大数交换到最后，由于是相邻两个数交换，需要交换的次数为最大数后面的数的个数（可以看做是最大数的逆序数），然后，交换过后，去除最大数，再考虑当前最大数也需要其逆序数次交换

则每个数都需要交换其逆序数次操作，则总最少交换次数为序列总体的逆序数

------

注：考虑无序数组交换任意两个元素，最少交换次数

对于每个元素, 我们将该元素和它的正确位置建边，最后一定是 $1\sim n$ 个环（自环也算）
对于有 $k$ 个元素的环，最少交换次数为 $k-1$

假设共有 $p$ 个环，对于第 $i$ 个环，有 $k_{i}$ 个元素，则它的最少交换次数为 $k_{i}-1$ 
$$
ans=\sum_{i=1}^p (k_i-1)=\sum_{i=1}^p k_i-p=n-p
$$
由于我们要知道正确位置，所以要排序好的数组记录正确位置,，时间复杂度 $O(n\log  n)$

直接 $dfs$ 找环即可

------

回到正题，设前半部分为 $L$，后半部分为 $R$

考虑到每部分内部交换不能减少逆序对数量之差，我们只能通过把左边的 $1$ 换成右边的 $0$，或者把左边的 $0$ 换成右边的 $1$ 来减少逆序对数量之差

具体来说我们可以枚举这样操作的次数，比如

1. 把左边最右的 $1$ 移动到末尾
2. 把右边最左的 $0$ 移动到开头
3. 交换

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,vl,vr;
int L[N],R[N],l0[N],r0[N],l1[N];

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

int solve(int a[])
{
	int res=0;
	for(int i=n,t=0;i;i--)
	{
		if(a[i]) res+=t;
		else t++;
	}
	return res;
}

void work()
{
	for(int i=1;i<=n;i++) l0[i]=l0[i-1]+(!L[i]);
	for(int i=1;i<=n;i++) r0[i]=r0[i-1]+(!R[i]);
	for(int i=1;i<=n;i++) l1[i]=l1[i-1]+L[i];
	
	int ans=abs(vl-vr),res=0;
	int l=n,r=1,tl=vl,tr=vr;
	while(l>0 && r<n+1) //(L1,R0)
	{
		int p=l,q=r;
		while(!L[p] && p) p--;
		if(!p) break;
		while(R[q] && q<=n) q++;
		if(q>n) break;
		res+=n-p+q;
		tl-=n-p;
		tl+=l1[p-1];
		tr+=r0[n]-r0[q];
		tr-=(q-1);
		ans=min(ans,abs(tl-tr)+res);
		l=p-1,r=q+1;
	}
	
	l=n,r=1,res=0,tl=vl,tr=vr;
	while(l>0 && r<n+1) //(L0,R1)
	{
		int p=l,q=r;
		while(L[p] && p) p--;
		if(!p) break;
		while(!R[q] && q<=n) q++;
		if(q>n) break;
		res+=n-p+q;
		tl-=l1[p];
		tr-=r0[n]-r0[q];
		ans=min(ans,abs(tl-tr)+res);
		l=p-1,r=q+1;
	}
	
	fw(ans),nl;
}

signed main()
{
	n=fr();
	for(int i=1;i<=n;i++) L[i]=fr();
	for(int i=1;i<=n;i++) R[i]=fr();
	vl=solve(L),vr=solve(R);
	work();

	return 0;
}
```
