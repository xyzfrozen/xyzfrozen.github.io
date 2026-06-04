---
title: P7249 [BalticOI 2012 Day1] 移动网络
date: 2023-10-10 23:55:21
tags:
- 二分
- 思维
categories:
- problem
mathjax: true
---

> 离最近的点最远的距离

考虑二分答案，问题转化为线段是是否有一个点到每个点的距离都 $\geq mid$

但是我们肯定不能枚举线段只能枚举点，我们考虑怎么把问题转化到点上面

每个点相当于画了一个 $r=mid$ 的圆，问题等价于是否存在于一个线段上的点没有被任何圆覆盖到

由于已经排好序了，我们从 $1 \sim n$ 考虑即可

每个点可覆盖的范围是 $[x-\sqrt {mid^2-y^2},x+\sqrt {mid^2-y^2}]$ 直接区间做并即可

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
struct Dot{double x,y;}a[N];

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

bool check(double x)
{
	double R=0;
	for(int i=1;i<=n;i++)
	{
		double dy=abs(a[i].y);
		if(dy>x) continue;
		double dx=sqrt(x*x-dy*dy);
		double l=a[i].x-dx,r=a[i].x+dx;
		if(l<=R && r>=R) R=r;
	}
	return R<1.0*m;
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
		scanf("%lf%lf",&a[i].x,&a[i].y);
	
	double l=0,r=2e9;
	while(r-l>1e-5) //50
	{
		double mid=(l+r)/2;
		if(check(mid)) l=mid;
		else r=mid;
	}
	printf("%.5lf",l);
	return 0;
}
```
