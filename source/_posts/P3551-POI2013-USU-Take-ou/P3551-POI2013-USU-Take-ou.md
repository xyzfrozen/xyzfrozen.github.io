---
title: P3551 [POI2013] USU-Take-ou
date: 2023-10-03 22:45:27
tags:
- 栈
- 前缀和
categories:
- problem
mathjax: true
---

考虑最后一段一定是连续的，我们如果删掉这一段，那么倒数第二段也是连续的

这是一个相同的问题，我们考虑删 $\frac {n}{k+1}$ 次

如何判断当前有连续的 $k$ 个 $white$ 和 $1$ 个 $black$，显然可以想到前缀和

具体来说，我们维护一个栈，满足前缀条件直接暴力弹栈

注意！！！用前缀和和输入字符串的时候 $s$ 数组不能共用！！！

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int n,k,top;
int ak[N],s[N];
char c;
vector<int> ans;

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
	n=fr(),k=fr();
	for(int i=1;i<=n;i++)
	{
		cin>>c;
		ak[++top]=i;
		s[top]=s[top-1]+(c=='c');
		if(top>=k+1 && s[top]-s[top-k-1]==1)
		{
			for(int j=top;j>=top-k;j--)
				ans.pb(ak[j]);
			top-=k+1;
		}
	}
	
	reverse(ans.begin(),ans.end());
	for(int i=1;i<=n;i++)
	{
		fw(ans[i-1]),pt;
		if(!(i%(k+1))) nl;
	}

	return 0;
}
```

