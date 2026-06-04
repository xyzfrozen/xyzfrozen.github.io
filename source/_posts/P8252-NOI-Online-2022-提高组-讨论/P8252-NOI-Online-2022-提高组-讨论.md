---
title: P8252 [NOI Online 2022 提高组] 讨论
date: 2023-11-05 23:44:27
tags:
- 思维
categories:
- problem
mathjax: true
---

问题等价于，给定 $n$ 个集合，是否存在两个集合相交且互不包含，设满足条件 $S_x \operatorname{·} S_y$

我们考虑小集合对大集合的贡献，所以把所有集合按照大小从小到大排序

这样做是任意元素的，我们经典套路，只考虑最近元素

对每道题维护一个颜色，如果 $S_x · S_y$ 当且仅当 $\forall i \in S_x$，$y$ 出现次数 $\gt 0 \operatorname{and} \lt |S_y|$

我们考虑一个集合什么时候没用了

$S_x · S_y \land S_x \in S_z \land |S_z| \leq |S_y| \Leftrightarrow S_z · S_y$

1. $S_x \in S_z \land S_x \cap S_y \not = \empty \rightarrow S_z \cap S_y \not = \empty$
2. $S_x \in S_z \land S_x \not \in S_y \rightarrow S_z \not \in S_y$
3. 若 $S_y \in S_z$，则 $|S_z| \geq |S_x|+|S_y|-|S_x \cap S_y|$，又 $|S_z| \leq |S_y|$，得 $|S_x \cap S_y| \geq |S_x|$ 矛盾

直接把所有 $i \in S_x$ 的题目在判断完后染色成 $x$ 即可

```cpp
#include<bits/stdc++.h>
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=2e6+10;
int n;
int id[N],col[N],t[N];
vector<int> per[N];

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

void solve()
{
    n=fr();
    for(int i=1;i<=n;i++) per[i].clear();
    for(int i=1;i<=n;i++)
    {
        int cnt=fr();
        while(cnt--) per[i].pb(fr());
        id[i]=i;
    }

    memset(col,0,sizeof col);
    memset(t,0,sizeof t);
    auto tmp=[](int &a,int &b){return per[a].size()<per[b].size();};
    sort(id+1,id+1+n,tmp);
    for(int i=1;i<=n;i++)
    {
        int x=id[i];
        for(auto v:per[x])
            if(col[v]) t[col[v]]++;
        for(auto v:per[x])
            if(col[v])
            {
                int y=col[v];
                if(t[col[v]]>0 && t[col[v]]<per[y].size())
                    {puts("YES");fw(x),pt,fw(y),nl;return;}
                t[col[v]]=0;
            }
        for(auto v:per[x])
            col[v]=x;
    }
    puts("NO");
}

int main()
{
    int T=fr();
    while(T--) solve();

    return 0;
}
```



 
