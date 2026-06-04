---
title: P3668 [USACO17OPEN] Modern Art 2 G
date: 2023-10-05 22:45:45
tags:
- 栈
- 思维
categories:
- problem
mathjax: true
---

注意是每种颜色只能用一次，不是每次染色都只能用一次

考虑每种颜色一定是染色成一种区间，而且区间之间要么不交，要么包含，一旦交错一定无解

比如 $\{1,2,1,2\}$ $[1,3] \land [2,4] =[2,3]$

所以染色的最多次数一定是嵌套的最多层数，我们考虑用栈模拟，栈的高度就是答案

注意算颜色区间的时候要特判 $0$，这样嵌套中间出现一个 $0$，才能输出 $-1$

比如 $\{1,0,1\}$

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10;
int n,ans,top;
int a[N],s[N],t[N],ak[N];
unordered_map<int,bool> vis;

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
	n=fr();
	for(int i=1;i<=n;i++) a[i]=fr();
	for(int i=n;i;i--) if(a[i]) s[a[i]]=i;
	for(int i=1;i<=n;i++) if(a[i]) t[a[i]]=i;
	for(int i=1;i<=n;i++)
	{
		if(s[a[i]]==i) ak[++top]=a[i],ans=max(ans,top);
		if(a[i]!=ak[top]) {puts("-1");return 0;}
		if(t[a[i]]==i) top--;
	}
	fw(ans);

	return 0;
}
```

