---
title: 浅谈集合选数前 k 大
date: 2023-11-01 23:24:17
tags:
- 堆
- 贪心
categories:
- note
mathjax: true
---

# 集合选数前 $k$ 大

利用堆维护当前状态，然后删除当前状态，加入后继状态

原理是如果当前状态合法，则前驱一定合法

初始要排序

例题 $1$

给定序列 $a$，求第 $k$ 大子集的和，子集的大小定义为所有元素相加

$n \leq 1e5,k\leq 1e5$

序列先降序排序

钦定一个子集的前驱是：如果子集只有一个数，那么它的前驱是它前面的数，如果子集有大于一个数，那么考虑它最靠后的两个数，如果这两个数在原序列相邻相邻，那么前驱是删去最后一个数，否则前驱是删去这个数再加入它在原序列中的前驱

这样一个状态可以只用两个数描述：一个是当前子集和，一个是最后一个数的位置

扩展有两种，一种是加入下一个数，一种是删掉这个数再加入下一个数

例题 $2$

[#6254. 最优卡组 - 题目 - LibreOJ (loj.ac)](https://loj.ac/p/6254)

把所有 $c_i=1$ 的先加入 $sum$，然后删除，这样所有 $c_i \geq 2$

把卡牌内部从大到小排序

初始状态显然是全部都选第一个数，我们从前往后考虑修改选择的卡牌

钦定一个状态的前驱是，考虑当前卡组，如果当前不是第一个数，则前驱为当前这个数的所在卡组的前一个数

如果当前是该卡组第一个数，则当前的前驱为

状态所需：当前和，考虑到第几个卡组，当前卡组考虑到第几个数

卡组按照最大值和次大值的差值升序排序

扩展三种

1. 加入当前卡组下一个数
2. 当前卡组不改，直接去下一个卡组的第二个数
3. 当前卡组如果选择了第二个数，并且当前不是第一个卡组，则把当前卡组改成第一个数，去下一个卡组的第二个数

判断当前不是第一个卡组且必须是第二个数，是因为不满足这个两个条件相当于重新回到了之前的某个状态并执行操作 $2$

```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=3e5+10;
int n,m,sum;
int id[N];
vector<int> good[N];
struct node{
	int s,i,j;
	bool operator<(const node&Q)const{
		return s<Q.s;
	}
};
priority_queue<node> q;

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
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
	{
		int cnt=fr();
		while(cnt--)
			good[i].pb(fr());
		
		sort(good[i].begin(),good[i].end(),greater<int>());
		sum+=good[i][0];
		if(good[i].size()==1) good[i--].clear(),n--;
		id[i]=i;
	}
	
	auto tmp=[=](const int &a,const int &b){return good[a][0]-good[a][1]<good[b][0]-good[b][1];};
	sort(id+1,id+1+n,tmp);
	
	q.push({sum,1,0});
	while(m--)
	{
		auto t=q.top();
		q.pop();
		
		int i=t.i,j=t.j,s=t.s;
		fw(s),pt;
		
		if(j+1<good[id[i]].size()) q.push({s-good[id[i]][j]+good[id[i]][j+1],i,j+1});
		if(i<n) q.push({s-good[id[i+1]][0]+good[id[i+1]][1],i+1,1});
		if(i<n && j==1 && i!=1) q.push({s+good[id[i]][0]-good[id[i]][1]-good[id[i+1]][0]+good[id[i+1]][1],i+1,1});
	}

	return 0;
}
```
