---
title: Hdu-Summer-2026-5
date: 2026-08-05 20:45:25
tags:
- 计算几何
- 凸包
- 线性 Dp
mathjax: true
---





这场还是前面浪费太多时间了，本来可以四题的

D 式子推完没时间写完了，一堆变量在那里，应该有巨量细节错误，赛后重构过了



# C

[1003 括号凸包](https://acm.hdu.edu.cn/contest/problem?cid=1233&pid=1003)

首先关键性质多边形上面一定是 `()()()()()()()()` 这样交替的，首先一定是左括号开始并且右括号结束，这样推就不可能有两个连续的左括号，而合法条件是时刻左括号大于等于右括号，那么右括号肯定不会出现左右交替

一般的凸包构造方式是不断尝试加入新的点，从一个凸链变成一个凸包，每次加入新点并判断要不要把最后一条边删掉，那么我们也模仿这个过程做 dp，这个 dp 的状态就是模拟一个栈加上新加入点的过程，由于我们只需要选出一个全部点集合的子集，所以强制锁定最后一条边不被删除去限制新加入点的状态，这样就可以不用维护一个栈，而只用维护最后一条边

首先划分状态，按照 `(y,x)` 排序，遍历选择该点为最低点和起点进行 dp，并把该点及该点之后的所有点尝试构造凸链

设当前最低点为起点，凸链最后两个点为 $i$ $j$ 的方案数为 $f_{i,j}$ ，枚举 $k$ ，判定括号和凸性转移到 $f_{j,k}$

直接枚举是 $O(n^4)$ 的

但是我们可以对转移预处理，对所有点把剩下点按照对它的极角排序，设从 $f_{?,j} \rightarrow f_{j,k}$，$k$ 对 $j$ 角度为 $ang$，则可转移的 $?$ 满足角度$\in (ang,ang+\pi)$ ，如果超过 $\pi$ 则是一段后缀拼前缀，否则就是一段连续区间，不管怎么样都是一段或两端可以用前缀和计算出的区间

注意 `atan2l(y,x)` 返回值在 ，我们需要转成 $[0,2\pi]$ 区间，对所有角度也这样执行操作，这样就可以保证逆时针转半圆都是 $+\pi$

小技巧 $\pi$ 用 `acosl(-1.0L)` 表示，为了精度需要小数全部开 `long double`

$O(n^3)$

```cpp
const int N=510,Q=998244353;
const long double pi=acosl(-1.0L);
int n,x,y,t;
int f[N][N],pos[N][N],sum[N][N],rpos[N][N];

struct point{
    int x,y,t,id;
    point operator - (const point &a)const{return point({x-a.x,y-a.y});}
    bool operator<(const point &a)const{return y==a.y?x<a.x:y<a.y;}
}a[N],rec[N];

int cross(point a,point b){return a.x*b.y-a.y*b.x;}
int area(point a,point b,point c){return cross(b-a,c-a);} //为正代表第一个向量逆时针转向第二个向量
auto cmp(pair<int,ld> p,pair<int,ld> q){return p.second<q.second;}

void solve()
{
    n=fr();
    for(int i=1;i<=n;i++)
    {
        x=fr(),y=fr(),t=fr();
        a[i]={x,y,t,i};
    }

    sort(a+1,a+1+n);

    int ans=0;
    for(int i=1;i<=n;i++) //预处理
    {
        vector<pair<int,ld>> dot;
        for(int j=1;j<=n;j++)
        {
            if(i==j) continue;
            ld tmp=atan2l(a[j].y-a[i].y,a[j].x-a[i].x);
            if(tmp<0) tmp+=2*pi;
            dot.pb(pair<int,ld>{a[j].id,tmp});
        }
        sort(dot.begin(),dot.end(),cmp);
        for(int j=0;j<dot.size();j++)
            pos[a[i].id][dot[j].first]=j+1; //剩下点在排序中的位置
        
        for(int j=0;j<dot.size();j++)
        {
            ld ang=dot[j].second;
            ld r=ang+pi;
            if(r>2*pi)
            {
                r-=2*pi;
                int k=0;
                while(k<dot.size() && dot[k].second<r) k++;
                if(k==dot.size() || dot[k].second>=r) k--;
                sum[a[i].id][j+1]=k+1; //注意是 j+1 下标从1开始
            }
            else
            {
                int k=j;
                while(k<dot.size() && dot[k].second<r) k++;
                if(k>=dot.size() || dot[k].second>=r) k--;
                sum[a[i].id][j+1]=k+1;
            }
        }
    }

    for(int i=1;i<=n;i++)
    {
        for(int j=i+1;j<=n;j++)
            rec[j-i]=a[j];

        sort(rec+1,rec+1+n-i,[&](point p,point q){
            return cross(p-a[i],q-a[i])>0;
        });

        for(int j=0;j<=n;j++)
            for(int k=0;k<=n;k++)
                f[j][k]=0;

        rec[0]=a[i];
        for(int j=1;j<=n-i;j++)
        {
            if(rec[j].t^a[i].t) f[a[i].id][rec[j].id]=1;

            vector<int> pres(n+1,0);
            for(int k=0;k<=j-1;k++) //预处理前缀和，括号相反的 f 才有值，不用处理相反括号限制
                pres[pos[rec[j].id][rec[k].id]]=f[rec[k].id][rec[j].id];
            for(int k=1;k<=n-1;k++)
                pres[k]=(pres[k]+pres[k-1])%Q;

            for(int k=j+1;k<=n-i;k++)
                if(rec[j].t^rec[k].t)
                {
                    // f[?][j] -> f[j][k] [ang,ang+pi]
                    int tmp=pos[rec[j].id][rec[k].id],v=0;
                    if(sum[rec[j].id][tmp]>tmp) v=(pres[sum[rec[j].id][tmp]]-pres[tmp]+Q)%Q;
                    else v=(pres[n-1]-pres[tmp]+Q+pres[sum[rec[j].id][tmp]])%Q;
                    f[rec[j].id][rec[k].id]=(v+f[rec[j].id][rec[k].id])%Q;
                }
        }

        // i -> ... -> k -> j -> i
        for(int j=1;j<=n-i;j++)
            for(int k=1;k<=j-1;k++)
                if(cross(rec[j]-rec[k],a[i]-rec[j])>0 && rec[j].t^a[i].t)
                    ans=(ans+f[rec[k].id][rec[j].id])%Q;
    }

    fw(ans),nl;
}
```
