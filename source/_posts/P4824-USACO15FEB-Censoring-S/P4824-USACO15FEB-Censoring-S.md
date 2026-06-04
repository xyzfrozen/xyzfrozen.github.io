---
title: P4824 [USACO15FEB] Censoring S
date: 2023-10-03 22:46:03
tags:
- KMP
- 栈
categories:
- problem
mathjax: true
---

暴力

```cpp
string S,T;

int main()
{
	cin>>S>>T;
	while(1)
	{
		int pos=S.find(T);
		if(!(~pos)) break;
		S.erase(pos,T.size());
	}
	cout<<S;

	return 0;
}
```



考虑优化，可以上 $KMP$

但是这样可能会有原来没有匹配不成功的数现在匹配成功了

但是这样的数只可能是最后一个没有匹配成功的数，我们直接把指针挪到那个数继续匹配就行

这里是形式上移动指针，实际上我们只需要知道它最多匹配了几个就行，把 $j$ 修改成它，然后主串接着动

所以我们匹配主串的时候，还需要记录下每个 $i$ 匹配到的 $j$

那么最后剩下的就是扫一遍还没匹配成功的数

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
int la,lb,top;
int ak[N],kmp[N],f[N];
char a[N],b[N];

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
	scanf("%s%s",a+1,b+1);
	la=strlen(a+1),lb=strlen(b+1);
	
	for(int i=2,k=0;i<=lb;i++) //k 当前最长相同前后缀
	{
		while(k && b[i]!=b[k+1]) k=kmp[k];
		if(b[i]==b[k+1]) k++;
		kmp[i]=k;
	}	
	
	for(int i=1,j=0;i<=la;i++)
	{
		while(j && a[i]!=b[j+1]) j=kmp[j];
		if(a[i]==b[j+1]) j++;
		f[i]=j,ak[++top]=i; //记录下当前
		if(j==lb)
		{
			top-=lb;
			j=f[ak[top]];
		}
	}
	
	for(int i=1;i<=top;i++)
		putchar(a[ak[i]]);
    
	return 0;
}
```

