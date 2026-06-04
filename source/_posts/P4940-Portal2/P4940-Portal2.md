---
title: P4940 Portal2
date: 2023-10-03 22:46:15
tags:
- 启发式合并
- 双端队列
categories:
- problem
mathjax: true
---

主要麻烦的操作就是清空，我们不妨考虑启发式合并

但是我们发现交换了指针之后，栈整个相当于翻转了，所以我们还需要用一个翻转标记记录是否翻转

同时翻转后就是取栈底了，这是栈做不到的，我们需要的是一个前后都能访问的数据结构，可以想到 $deque$

这里还有一个 $trick$ 就是用 $q_1,q_2$ 表示两个 $deque$，而不是 $a,b$，这样穿入 $x$，的时候直接写 $q_x$ 就行了，简化代码

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define pf push_front
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e6+10;
deque<int> q[2];
string s;
int x,y,tag;

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

signed main()
{
	while(cin>>s)
	{
		if(s=="PUSH")
		{
			x=fr();
			if(tag) q[x].pf(fr());
			else q[x].pb(fr());
			puts("SUCCESS");
		}
		else if(s=="POP")
		{
			x=fr();
			if(!q[x].size()) puts("UNSUCCESS");
			else
			{
				if(tag) q[x].pop_front();
				else q[x].pop_back();
				puts("SUCCESS");
			}
		}
		else if(s=="ADD")
		{
			x=fr();
			if(!q[0].size() || !q[1].size()) puts("UNSUCCESS");
			else
			{
				if(tag)
				{
					int a=q[0].front(),b=q[1].front();
					q[0].pop_front(),q[1].pop_front();
					q[x].pf(a+b);
				}
				else
				{	
					int a=q[0].back(),b=q[1].back();
					q[0].pop_back(),q[1].pop_back();
					q[x].pb(a+b);
				}
				puts("SUCCESS");
			}
			
		}
		else if(s=="SUB")
		{
			x=fr();
			if(!q[0].size() || !q[1].size()) puts("UNSUCCESS");
			else
			{
				if(tag)
				{
					int a=q[0].front(),b=q[1].front();
					q[0].pop_front(),q[1].pop_front();
					q[x].pf(abs(a-b));
				}
				else
				{	
					int a=q[0].back(),b=q[1].back();
					q[0].pop_back(),q[1].pop_back();
					q[x].pb(abs(a-b));
				}
				puts("SUCCESS");
			}
		}
		else if(s=="DEL")
		{
			puts("SUCCESS");
			x=fr();
			deque<int>().swap(q[x]);
		}
		else if(s=="MOVE")
		{
			x=fr(),y=fr();
			puts("SUCCESS");
			int fl=0;
			if(q[x].size()<q[y].size())
				fl=1,swap(q[x],q[y]);
			if(tag)
			{
				while(q[y].size())
					q[x].pf(q[y].front()),q[y].pop_front();
			}
			else
			{
				while(q[y].size())
					q[x].pb(q[y].back()),q[y].pop_back();
			}
			tag^=fl;
		}
		else if(s=="SWAP")
		{
			swap(q[0],q[1]);
			puts("SUCCESS");
		} 
		else if(s=="END")
		{
			puts("SUCCESS");
			if(!q[0].size()) puts("NONE");
			else
			{
				if(tag)
				{
					while(q[0].size())
						fw(q[0].front()),pt,q[0].pop_front();
				}
				else
				{
					while(q[0].size())
						fw(q[0].back()),pt,q[0].pop_back();
				}
				nl;
			}
			
			if(!q[1].size()) puts("NONE");
			else
			{
				if(tag)
				{
					while(q[1].size())
						fw(q[1].front()),pt,q[1].pop_front();
				}
				else
				{
					while(q[1].size())
						fw(q[1].back()),pt,q[1].pop_back();
				}
			}
			return 0;
		}
	}

	return 0;
}
```

