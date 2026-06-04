---
title: IDA* 拯救世界
date: 2023-09-30 00:07:26
tags:
- 搜索
- IDA*
categories:
- note
mathjax: true
---

# IDA* 是神！

$BFS$ 缺点：状态数无法计算，队列自带常数

$BFS$ 转 $DFS$ 就是利用 $IDA*$ 实现 $BFS$ 框架，并且利用 $DFS$ 的剪枝完成优化

优点：好写，不用计算状态数

缺点：常数稍微有点大

## 例题 归途游吟

有一个名为「浅塘」的游戏

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010106107.png)

给定「浅塘」的某一个局面，求通关的最快步骤

**输入**

输入一个 $6\times 6$ 的矩阵 $\{a_{i,j}\}$

其中 $a_{i,j}=0$ 表示位置为空，$a_{i,j}=1
$ 表示小红鱼，否则所有相同的 $a_{i,j}$ 表示一个木块。

如【题目背景】图中的初始局面可以表示为：

```plain
0 2 2 2 0 0
0 0 0 3 3 4
1 1 0 5 0 4
0 6 0 5 0 4
0 6 0 5 0 0
0 0 7 7 7 0
```

**输出**

第一行一个正整数 $k$，表示操作次数

接下来 $k$ 行，每行的格式如下：

- `p L x`：表示将编号为 $p$ 的小红鱼/木块向左移动 $x$ 格
- `p R x`：表示将编号为 $p$ 的小红鱼/木块向右移动 $x$ 格
- `p D x`：表示将编号为 $p$ 的木块向下移动 $x$ 格
- `p U x`：表示将编号为 $p$ 的木块向上移动 $x$ 格

如【题目背景】图中的游戏过程可以表示为：

```plain
4
7 L 2
5 D 1
4 D 2
1 R 4
```

你需要保证每一步操作均合法，且所有操作结束后小红鱼位于 $(3,5)$ 与 $(3,6)$ 的位置

**样例 #1**

```
0 2 2 2 0 0
0 0 0 3 3 4
1 1 0 5 0 4
0 6 0 5 0 4
0 6 0 5 0 0
0 0 7 7 7 0
```

```
4
7 L 2
5 D 1
4 D 2
1 R 4
```

**样例 #2**

```
0 0 2 2 2 0
0 0 0 3 4 4
5 1 1 3 0 0
5 6 0 3 7 0
0 6 0 0 7 0
0 0 0 0 0 0
```

```
2
3 D 2
1 R 3
```

**样例 #3**

```
0 0 0 0 0 2
0 0 3 4 0 2
1 1 3 4 0 5
0 0 3 0 0 5
0 0 6 6 0 5
0 0 0 0 0 0
```

```
5
6 L 2
3 D 2
4 U 1
5 D 1
1 R 4
```

**样例 #4**

```
2 2 2 0 0 3
0 0 0 0 4 3
0 1 1 0 4 3
5 5 6 0 4 0
0 0 6 7 7 0
0 0 6 0 0 0
```

```
7
1 L 1
6 U 2
7 L 3
6 D 2
4 D 2
3 D 3
1 R 4
```

**样例 #5**

```
0 0 0 2 3 0
4 0 0 2 3 0
4 1 1 2 3 0
0 0 5 0 6 6
0 0 5 0 0 0
7 7 5 0 0 0
```

```
8
4 U 1
1 L 1
5 U 3
6 L 4
5 D 3
2 D 3
3 D 3
1 R 4
```


本题共 $10$ 个测试点，全部来自于「浅塘」中【专家模式】的前 $40$ 关

对于 $40\%$ 的测试数据，保证最少的操作次数不超过 $15$

对于所有数据，保证输入中木块的编号为从 $2$ 开始的连续自然数


------------

## Solution

$BFS$ 要素：状态，步数

我们用 $IDA*$ 代替队列，同时维护了最小步数的优势

状态可以把它压成一个 $1331$ 进制的 $\text{unsigned long long}$ 数/$string$ 字符串，然后用 $\text{unordered map}$ 存

```cpp
if(a[3][5]==1 && a[3][6]==1) 
{
	fw(step),nl;
	for(int i=1;i<=step;i++)
		fw(res[i].id),pt,putchar(res[i].op),pt,fw(res[i].v),nl;
	exit(0);
}
if(step>=20 || step>=D) return;
	
ull now=calc();
if(vis.count(now) && vis[now]<=step) return;
vis[now]=step;
```

$IDA$ 现在需要修改一下基本的结构

1. 判断是否合法，并且计算答案
2. 剪枝，并完成 $IDA*$ 的步数控制
3. 计算当前状态，并用 $umap$ 存，每次需要在 $IDA*$ $\text{dep++}$ 时清空

注意第一步和第二步一定不能换顺序，换顺序的写法是传统的 $D+1$，这样会多搜一层，节点数指数级增加

第三步的进制数不要太小，然后注意 $calc$ 函数的返回值和里面的计算值

------------

## code

剪枝：

1. 预处理木块的方向，不要在 $dfs$ 内判断

2. 可以把这个 $now$ 传下去，然后改成 $string$ 写法直接改，这样就不用每次 $calc$ 了

注意：$Move$ 函数里面要先清空然后染色，不能采用那种

```cpp
for(int i=sy+d;i<sy;i++) a[sx][i]=c;
for(int i=ny+d+1;i<=ny;i++) a[nx][i]=0;
```

的移动木块染色，这样可能会染错

```cpp
#include<bits/stdc++.h>
#define ull unsigned long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define fi first
#define se second
#define pb push_back
#define go(it) for(auto &it:as[x]) //注意加了&
using namespace std;

const int N=9,M=40;
int n=6,cnt,D=1;
int a[N][N],dir[M];
pi pos1[M],pos2[M];
ull P=1331;
unordered_map<ull,int> vis;
struct node{int id;char op;int v;}res[N*N*N];

int fr(){ //double 不能快读！！！！
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

void prework()
{
	for(int i=n;i;i--)
		for(int j=n;j;j--)
			pos1[a[i][j]]={i,j};
	for(int i=1;i<=n;i++)
		for(int j=1;j<=n;j++)	
			pos2[a[i][j]]={i,j};
	for(int i=1;i<=cnt;i++)
		dir[i]=(pos1[i].fi==pos2[i].fi);
}

//向左/向上为 - 向右/向下为 +
void move(int c,int d)
{
	int sx=pos1[c].fi,sy=pos1[c].se;
	int nx=pos2[c].fi,ny=pos2[c].se;
	if(dir[c]) //横着
	{
		for(int i=sy;i<=ny;i++) a[sx][i]=0;
		for(int i=sy+d;i<=ny+d;i++) a[sx][i]=c;
		pos1[c]={sx,sy+d},pos2[c]={nx,ny+d};
	}
	else
	{
		for(int i=sx;i<=nx;i++) a[i][sy]=0;
		for(int i=sx+d;i<=nx+d;i++) a[i][sy]=c;
		pos1[c]={sx+d,sy},pos2[c]={nx+d,ny};
	}
}

ull calc()
{
	ull res=0;
	for(int i=1;i<=6;i++)
		for(int j=1;j<=6;j++)
			res=res*P+a[i][j]+1;
	return res;
}

void dfs(int step)
{
	if(a[3][5]==1 && a[3][6]==1) 
	{
		fw(step),nl;
		for(int i=1;i<=step;i++)
			fw(res[i].id),pt,putchar(res[i].op),pt,fw(res[i].v),nl;
		exit(0);
	}
	if(step>=20 || step>=D) return;
	
	ull now=calc();
	if(vis.count(now) && vis[now]<=step) return;
	vis[now]=step;
	
	for(int i=1;i<=cnt;i++)
	{
		int sx=pos1[i].fi,sy=pos1[i].se;
		int nx=pos2[i].fi,ny=pos2[i].se;
		if(dir[i]) //横着
		{
			for(int q=1;sy-q>=1 && !a[sx][sy-q];q++)
			{
				res[step+1]={i,'L',q};
				move(i,-q);
				dfs(step+1);
				move(i,q);
			}
			
			for(int q=1;ny+q<=n && !a[nx][ny+q];q++)
			{
				res[step+1]={i,'R',q};
				move(i,q);
				dfs(step+1);
				move(i,-q);
			}
		}
		else
		{
			for(int q=1;sx-q>=1 && !a[sx-q][sy];q++)
			{
				res[step+1]={i,'U',q};
				move(i,-q);
				dfs(step+1);
				move(i,q);
			}

			for(int q=1;nx+q<=n && !a[nx+q][ny];q++)
			{
				res[step+1]={i,'D',q};
				move(i,q);
				dfs(step+1);
				move(i,-q);
			}
		}
	}
}

int main()
{
	for(int i=1;i<=6;i++)
		for(int j=1;j<=6;j++)	
			a[i][j]=fr(),cnt=max(cnt,a[i][j]);
	
	prework();
	while(D++)
		dfs(0),vis.clear();

	return 0;
}
```
