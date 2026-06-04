---
title: P5978 [CEOI2018] Global warming
date: 2023-10-01 12:18:29
tags:
- 二分
- 线性 Dp
categories:
- problem
mathjax: true
---

考虑到答案的形成

![image-20231001124644215](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310011246855.png)

我们考虑枚举第一段的最右侧端点 $i$，前面的显然是以 $i$ 为结尾的 $LIS$，后面的我们考虑类似维护后缀 $LIS$ 的方式

这里用到了一个新技巧，传统的 $\text{lower bound}$ 只能做从小到大的

我们维护递减序列，然后用 $greater<int>()$ 

```
lower_bound(a+1,a+n+1,x,greater<int>()); //第一个小于等于x的值的编号
 
upper_bound(a+1,a+n+1,x,greater<int>()); //第一个小于x的值的编号
```

考虑到已经维护的后缀 $LIS$ 相对位置不变，我们二分出第一个 $\leq a_i -m$ 的位置，剩下的就是 $+m$ 可以 $\gt a_i$ 接到后面了

当然如果当前是后缀 $LIS$ 上最小的那个，就是 $len$

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e5+10;
int n,m,len,ans;
int a[N],f[N],g[N],s[N];

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

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	
	for(int i=1;i<=n;i++)
	{
		if(s[len]<a[i]) s[++len]=a[i],f[i]=len;
		else 
		{
			int k=lower_bound(s+1,s+1+len,a[i])-s;
			s[k]=a[i],f[i]=k;
		}
	}
	
	len=0;
	for(int i=n;i;i--) 
	{
		g[i]=lower_bound(s+1,s+1+len,a[i]-m,greater<int>())-s;
		if(a[i]<s[len] || !len) s[++len]=a[i],g[i]=len;
		else *lower_bound(s+1,s+1+len,a[i],greater<int>())=a[i];
	}
	
	for(int i=1;i<=n;i++) ans=max(ans,f[i]+g[i]-1);
	fw(ans);
	return 0;
}
```

