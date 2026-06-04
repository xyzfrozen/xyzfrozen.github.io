---
title: Extra 线段树-动态开点 && 权值线段树
date: 2023-10-01 12:59:13
tags:
- 线段树
- 线性 Dp
- 动态开点权值线段树
categories:
- note
password: Violet Evergarden
mathjax: true
---

貌似之前学过，但是忘干净了，被迫重学

参考博客：

[题解 P3369 【【模板】普通平衡树】 - -_- - 洛谷博客 (luogu.org)](https://chinesepikaync.blog.luogu.org/solution-p3369)

[浅谈权值线段树 - bf 的博客 - 洛谷博客 (luogu.com.cn)](https://www.luogu.com.cn/blog/bfqaq/qian-tan-quan-zhi-xian-duan-shu)

# 动态开点线段树

传统的线段树要建 $4N$ 节点，如果需要维护值域极大的权值线段树，显然就开不下了

动态开点线段树的核心思想就是：**结点只有在有需要的时候才被创建**

最初只建立一个根结点代表整个区间。当我们需要访问某个子区间时，才建立代表这个区间的子结点

一共有 $m\log W$ 节点，时空复杂度都是 $O(m\log W)$

# 权值线段树

维护值域上的点，而不是序列上的点

加上动态开点和普通平衡树本质上是一样的，并且常数更小

[模板题](https://www.luogu.com.cn/problem/P3369)

因为没有模板题，就拿平衡树凑个数

![image-20231001192639583](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310011926716.png)

只跑 $168ms$ 效率是 $fhq$ 的两倍

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10;
int m,op,x,rt,cnt,inf=1e7;
struct node{
	int ls,rs;
	int s;
}tr[N*27];

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

void chf(int idx)
{
	node &t=tr[idx],&ls=tr[t.ls],&rs=tr[t.rs];
	t.s=ls.s+rs.s;
}

void modify(int vl,int vr,int ql,int qr,int &idx,int x)
{
	if(!idx) idx=++cnt;
	node &t=tr[idx]; //注意在这里 上面idx是0就错了
	if(vl==vr)
	{
		t.s+=x;
		return;
	}
	
	int mid=(vl+vr)>>1;
	if(ql<=mid) modify(vl,mid,ql,qr,t.ls,x);
	if(qr>mid) modify(mid+1,vr,ql,qr,t.rs,x);
	chf(idx);
}

int query(int vl,int vr,int ql,int qr,int idx)
{
	if(!idx) return 0; //不存在这个节点
	node &t=tr[idx];
	if(ql<=vl && qr>=vr)
		return t.s;
	int mid=(vl+vr)>>1,s=0;
	if(ql<=mid) s+=query(vl,mid,ql,qr,t.ls);
	if(qr>mid) s+=query(mid+1,vr,ql,qr,t.rs);
	return s;
}

int kth(int vl,int vr,int idx,int k)
{
	if(!idx) return -1; //如果有一定找的到
	node &t=tr[idx];
	if(vl==vr) return vl;
	int mid=(vl+vr)>>1;
	if(k<=tr[t.ls].s) return kth(vl,mid,t.ls,k);
	else return kth(mid+1,vr,t.rs,k-tr[t.ls].s);
}

int main()
{
	m=fr();
	for(int i=1;i<=m;i++)
	{
		op=fr(),x=fr();
		if(op==1) modify(-inf,inf,x,x,rt,1);
		else if(op==2) modify(-inf,inf,x,x,rt,-1);
		else if(op==3) fw(query(-inf,inf,-inf,x-1,rt)+1),nl;
		else if(op==4) fw(kth(-inf,inf,rt,x)),nl;
		else if(op==5) fw(kth(-inf,inf,rt,query(-inf,inf,-inf,x-1,rt))),nl;
		else fw(kth(-inf,inf,rt,query(-inf,inf,-inf,x,rt)+1)),nl;
	}

	return 0;
}
```



## 权值树拓展

我们知道，对于一棵线段树而言，如果它的总长度不变，那么它的形态是不会改变的，权值树同理

即可以对权值树进行加减法操作

对于权值树 $A，B$，若 $A，B$ 形态相同，则我们可以直接合并这两棵权值树，合并的方式就是对应节点相加

![img](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310011930806.png)

