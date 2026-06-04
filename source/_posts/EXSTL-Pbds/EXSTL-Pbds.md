---
title: EXSTL-Pbds
date: 2023-09-29 23:31:28
tags:
- 平衡树
categories:
- note
mathjax: true
---

# 奇淫巧技-Pbds

$stl$ 的平衡树+ $hash$ 表

内部为平衡树

平衡树有红黑树，$Splay$，有序向量树

一般就用红黑树

```cpp
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
```

![image](https://cdn.jsdelivr.net/gh/xyzfrozen/Cdn/img/202310010106829.png)

一般就定义成

```cpp
tree<int,null_type,less<int>,rb_tree_tag,tree_order_ statistics_node_update>
```

由于 $null$_$type$ 是类似 $set$ 的结构，还要给每个值一个编号

```cpp
insert(x)
erase(x)
order_of_key(x) //严格小于 x 的个数
find_by_order(x) //排名所对应元素的迭代器 排名从 0 开始
lower_bound(x)：//返回迭代器
upper_bound(x)：//返回迭代器
join(x) //将 x 树并入当前树，两棵树的类型一样，x 树被删除 两颗树的 key 值范围无交集
split(x,b) // 以 Cmp_Fn 比较，小于等于 x 的属于当前树，其余的属于 b 树
size()
```

可以类似 $vector$ 的遍历

```cpp
for(auto v:a)
```

------------

[P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369 "P3369 【模板】普通平衡树")

```cpp
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

const int N=1e5+10;
int n,op,x,inf=2e9;
tree<pi,null_type,less<pi>,rb_tree_tag,tree_order_statistics_node_update> tr;

int main()
{
	n=fr();
	for(int i=1;i<=n;i++)
	{
		op=fr(),x=fr();
		if(op==1) tr.insert({x,i});
		else if(op==2) tr.erase(tr.upper_bound({x,0}));
		else if(op==3) fw((int)tr.order_of_key({x,0})+1),nl;
		else if(op==4) fw(tr.find_by_order(x-1)->first),nl;
		else if(op==5)
		{
			auto it=tr.upper_bound({x,0});
			it--,fw(it->first),nl;
		}
		else fw(tr.upper_bound({x,inf})->first),nl;
	}

	return 0;
}
```

------------

[P1486 [NOI2004] 郁闷的出纳员](https://www.luogu.com.cn/problem/P1486 "P1486 [NOI2004] 郁闷的出纳员")

```cpp
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

const int N=3e5+10;
int n,m,k,cnt,ans,idx,inf=2e9;
char op[2];
tree<pi,null_type,less<pi>,rb_tree_tag,tree_order_statistics_node_update> tr,y;

void ins(int x)
{
	if(x<m) return;
	x-=cnt;
	tr.insert({x,++idx});
}

void del()
{
	tr.split({m-cnt-1,inf},y);
	ans+=tr.size();
	tr=y;
}

int main()
{
	n=fr(),m=fr();
	for(int i=1;i<=n;i++)
	{
		scanf("%s",op),k=fr();
		if(op[0]=='I') ins(k);
		else if(op[0]=='A') cnt+=k;
		else if(op[0]=='S') cnt-=k,del();
		else fw((tr.size()>=k)?(tr.find_by_order(tr.size()-k)->first+cnt):-1),nl;
	}
	fw(ans);
	return 0;
}
```
