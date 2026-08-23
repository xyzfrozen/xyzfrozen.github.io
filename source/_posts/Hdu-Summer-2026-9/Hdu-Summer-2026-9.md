---
title: Hdu-Summer-2026-9
date: 2026-08-23 17:13:23
tags:
- 构造
- 笛卡尔树
- kmp
---



赛时5题，补EJ，本质想的不够仔细浪费了太多时间，后面直接开摆去集了



# J

赛时想的是把一堆括号左右移动凑出来层数，但是这样没法从最小覆盖到最大，所以是不行的，应该只考虑右括号，挪动右括号就可以从最小到最大

下面是题解的稍微改动了一下

设连续的 `?` 区间长度为 $q$，其中需要填入 $x$ 个左括号和 $y$ 个右括号（由于最终必须是合法括号串，左右括号总数均为 $\frac n2$，因此 $x,y$ 是唯一确定的），同时记进入 `?` 区间前，栈中尚未匹配的左括号数量为 $H$

把贡献绑在右括号上面，对于区间中的第 $j$ 个右括号，设其前面出现了 $a_j$ 个左括号。此时前面已经出现了 $j-1$ 个右括号，因此该右括号出现时的栈深度为 $H+a_j-(j-1)$，于是整个 `?` 区间对总层数的贡献为
$$
\sum_{j=1}^{y}\left(H+a_j-(j-1)\right)=yH+\sum_{j=1}^{y}a_j-\frac{y(y-1)}2.
$$
区间外的括号贡献是固定的：无论如何排列这 $x$ 个左括号和 $y$ 个右括号，离开区间时的栈深度始终为 $H+x-y$，因此不会影响后缀中括号的层数，所以只关心 $\sum a_j$

同时我们猜测对于所有合法的 $a$，都存在合法的括号放置方案，因此我们先考虑 $a$ 序列的限制：那么我们只需要由于 $a_j$ 表示第 $j$ 个右括号之前出现的左括号数量，显然有
$$
0\le a_1\le a_2\le\cdots\le a_y\le x
$$
此外，第 $j$ 个右括号必须能够匹配某个左括号，因此 $H+a_j-(j-1)\ge 1$，即 $a_j\ge j-H$

结合 $a_j\ge 0$，得到完整限制
$$
\boxed{\max(0,j-H)\le a_j\le x}.
$$
并且我们可以看出来 $\sum a_i \in [\sum_{j=1}^{y}\max(0,j-H),xy]$ （从最小到最大方案全覆盖了）且能取遍区间内的每一个数，因此问题转化为：

> 构造一个非降整数序列 $a_1,a_2,\ldots,a_y$，满足 $\max(0,j-H)\le a_j\le x$，并使 $\sum a_j$ 等于指定值，再构造出满足 $a$ 序列的一个括号序列

可以这么构造 $\sum_j a_j$：

* 首先令每个数都取到下界：$a_j=\max(0,j-H)$。

* 因为序列 $a$ 非降，我们从后往前尽可能地增加 $a_i$ 至 $x$ 即可

得到 $a_1,\ldots,a_y$ 后，可以这么构造括号序列：

- 先填 $a_1$ 个左括号，再填一个右括号；
- 对于 $2\le j\le y$，填入 $a_j-a_{j-1}$ 个左括号，再填一个右括号；
- 最后填入剩余的 $x-a_y$ 个左括号

这样得到的括号排列恰好满足每个右括号前有 $a_j$ 个左括号

 $O(n)$



最主要的还是把贡献写成一个形式化的内容，有式子就很好推进了，首先要发现只需要考虑右括号，然后对右括号计算贡献构造就比较简单了

另外题目没有保证一定有 `?` 所以得特判一下

```cpp
const int N=2e5+10;
int n,m;
string s;
int a[N];

void solve()
{
    n=fr(),m=fr(),s=" "+rd();
    int l=1,r=n,cntl=0,cntr=0,rest=0;
    while(l<=n && s[l]!='?') cntl+=(s[l]=='('),cntr+=(s[l]==')'),l++;
    rest=cntl-cntr;
    while(r>=1 && s[r]!='?') cntl+=(s[r]=='('),cntr+=(s[r]==')'),r--;
    
    if(l>r)
    {
        s=s.substr(1);
        for(auto c:s) putchar(c);
        nl;
        return;
    }

    // a
    int x=(n>>1)-cntl,y=(n>>1)-cntr;
    m-=y*rest-y*(y-1)/2;
    int k=rest+x-y;
    for(int i=r+1;i<=n;i++)
    {
        if(s[i]=='(') k++;
        else m-=k,k--;
    }
    k=0;
    for(int i=1;i<l;i++)
    {
        if(s[i]=='(') k++;
        else m-=k,k--;
    }

    for(int i=1;i<=y;i++) a[i]=max(0,i-rest),m-=a[i];
    int lt=y;
    while(m>0)
    {
        while(a[lt]==x) lt--;
        a[lt]++,m--;
    }   

    for(int i=1,lt=0;i<=y;i++)
    {
        lt+=a[i]-a[i-1]+1;
        s[l+lt-1]=')';
    }

    for(int i=l;i<=r;i++) if(s[i]=='?') s[i]='(';
    s=s.substr(1);
    for(auto c:s) putchar(c);
    nl;
}
```



# E

首先这个题和 `kmp` 基本上一样，我们搞清楚怎么判定 `==` 和 `!=` 

笛卡尔树的构建是这样的，在栈内维护右链，不停弹栈直到栈顶小于等于自己，弹出部分是自己的左子树，栈非空自己接在栈顶右儿子，然后入栈

所以我们发现树的形态和栈的变化一一对应，而栈的变化和每次弹出的个数又等价，所以维护每个点弹完后的栈顶就维护了树

现在判定相等，设 $pre_i$ 表示栈顶

设 $f_i$ 表示位置 $i$ 的答案。已知当前匹配长度为 $j$，现在尝试用 $a_i$ 与前缀的第 $j+1$ 个位置匹配，记 $k=j+1$。

- 若 $pre_k=0$，说明前缀中 $a_k$ 左侧没有不大于它的元素。于是目标后缀中 $a_i$ 的前驱也必须在后缀外，即 $pre_i<i-j$。

- 若 $pre_k>0$，则两边前驱的相对位置必须相同，即 $i-pre_i=k-pre_k$。

本质上笛卡尔树是右侧可加的，所以从某个位置砍掉一段不影响

```cpp
const int N=1e6+10;
int n,top;
int a[N],pre[N],kmp[N],ak[N];

void solve()
{
    n=fr(),top=0;
    for(int i=1;i<=n;i++) a[i]=fr(),kmp[i]=0;
    for(int i=1;i<=n;i++)
    {
        while(top && a[ak[top]]>a[i]) top--;
        pre[i]=ak[top];
        ak[++top]=i;
    }

    fw(0),pt;
    auto check=[&](int k,int i){return (!pre[k])?(pre[i]<=i-k):(k-pre[k]==i-pre[i]);};
    for(int i=2,k=0;i<=n;i++)
    {
        while(k && !check(k+1,i)) k=kmp[k];
        if(check(k+1,i)) k++;
        fw(kmp[i]=k),pt;
    }
    nl;
}
```

