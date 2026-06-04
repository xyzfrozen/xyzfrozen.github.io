---
title: P5835 [USACO19DEC] Meetings S
date: 2023-10-05 22:45:52
tags:
- 思维
- 碰撞
categories:
- problem
mathjax: true
---

先看一道前置题

[P1367 蚂蚁 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1367)

这类题的套路就是不把它看成碰撞反弹，而是穿过，并交换属性

这里的属性就是编号，同时他们的相对位置不改变

因为 $A \rightarrow \leftarrow B \Leftrightarrow\,\leftarrow A\,B \rightarrow$

我们先排序得到相对位置，然后按穿过算每个蚂蚁爬到哪里

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10;
int n,m;
int pos[N];
struct node{
	int x,v,id;
	bool operator<(const node&Q)const{
		return x<Q.x;
	}
}a[N];

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
	for(int i=1;i<=n;i++)
		a[i].x=fr(),a[i].v=fr(),a[i].id=i;
	sort(a+1,a+1+n);
	for(int i=1;i<=n;i++)
	{
		pos[a[i].id]=i; //这只蚂蚁的相对位置是 i
		a[i].x+=a[i].v*m;
	}
	sort(a+1,a+1+n);
	for(int i=1;i<n;i++)
		if(a[i].x==a[i+1].x) a[i].v=a[i+1].v=0;
	for(int i=1;i<=n;i++)
		fw(a[pos[i]].x),pt,fw(a[pos[i]].v),nl;

	return 0;
}
```

------

显然二分时间转换成上面的问题

如何统计穿过了多少次？我们只考虑向右走的牛，然后算它离它的排名的距离即可

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=5e4+10;
int n,m,s,ans=1e9;
int pos[N],w[N];
struct node{
	int x,w,v,id;
	bool operator<(const node&Q)const{
		return (x==Q.x)?(v<Q.v):(x<Q.x);
	}
}a[N],b[N];

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

bool check(int x)
{
	int res=0;
	for(int i=1;i<=n;i++)
	{
		b[i]=a[i];
		pos[i]=b[i].id; //第 i 名是第 b[i].id 头牛
		b[i].x+=b[i].v*x;
	}
	sort(b+1,b+1+n);
	for(int i=1;i<=n;i++)
		res+=(b[i].x<=0 || b[i].x>=m)*w[pos[i]]; //相对位置不变 属性为 pos[i] 的
   	//注意这里不是 a[pos[i]].w 这里 a 已经排序了，我们需要的是第 i 头牛，要存下来 w_i
	return res*2ll>=s;
}

void calc()
{
	for(int i=1;i<=n;i++)
	{
		pos[a[i].id]=i; //第 a[i].id 头牛排名 i
		a[i].x+=a[i].v*ans;
	}
	sort(a+1,a+1+n);
	ans=0;
	for(int i=1;i<=n;i++)
		if(a[i].v==1) ans+=i-pos[a[i].id]; //穿过了多少
	fw(ans);
}

signed main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
		s+=(w[i]=a[i].w=fr()),a[i].x=fr(),a[i].v=fr(),a[i].id=i;
	sort(a+1,a+1+n);
	int l=0,r=1e9;
	while(l<=r)
	{
		int mid=(l+r)>>1;
		if(check(mid)) r=mid-1,ans=mid;
		else l=mid+1;
	}
	calc();
	return 0;
}
```

