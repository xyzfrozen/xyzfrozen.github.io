---
title: Hdu-Summer-2026-3
date: 2026-07-31 22:29:38
tags:
mathjax: true
---





变成 6 题队了有感觉了，不过这场比赛都是小唐题罢了

过CDEFIJ，补BH

另外F有个 trick 就是把数分成 $x \times 2^k$ 按 $x$ 分组，每组选一个，不过我们直接大力迭代 $\log n$ 次创过去了



# H

[1008 FWT](https://acm.hdu.edu.cn/contest/problem?cid=1231&pid=1008)

赛时应该做这个题目而不是B的，太久没做数位 dp 了，没感觉了，哎哎

首先不管带修，我们直接考虑某一位

$x_i\, \& \,x_j =x_i$ 代表 $i$ 在每一位上面都是小于等于 $j$ 的，相当于建立了一个图，上面有一些单向关系，我们要给每一个 $x$ 选 $0$ or $1$  ，满足这个图的关系

设 $f_{i,0/1,0/1}$ 代表考虑到第 $i$ 位，$x_1$ 顶 $r$ 没有，$x_n$ 顶 $l$ 没有，就是数位 dp 的 $lim$ 

每一位有 $x_1=1$ $x_n=0$ 和 $x_1=x_n$ 两种情况，第二种贡献 $\times 1$ 第一种就是图上的方案数

图上的限制就是我们给 $[1,n]$ 随便分 $0$ $1$，所有前驱都比自己小的方案就是合法的

由于 $n$ 只有 20，大力用 bitset 记录前驱，然后直接枚举 $[0,2^n-1]$ 种情况，自己是 $1$ 就不用管，自己是 $0$ 前驱必须全是 $0$ 就行，用 $\&$ 判断一下

待修用线段树维护矩阵乘法就行，比较简单

$O(m^3n\log n),m=4$ 

神了，大半夜debug失败，让gpt给我看一眼，发现是直接 = '0' 而不是 0 了，noip再现有感觉吗

另外 l，r应该右对齐，因为是左侧最高位，肯定是高位补0

另外计算答案是别忘记数位dp默认初始全部顶界



```cpp
#include<bits/stdc++.h>
#define int long long
#define pt putchar(' ')
#define nl puts("")
#define pi pair<int,int>
#define pb push_back
#define go(it) for(auto &it:as[x])
using namespace std;

const int N=1e5+10,M=25,K=5,Q=998244353,len=1e5;
const int pos[2][2]={{{1},{2}},{{3},{4}}};
int n,m,t;
int l[N],r[N];
bitset<32> pre[M];

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

struct Mat{
    int a[K][K];
    void init(){memset(a,0,sizeof a);}
    Mat operator *(const Mat&p)const{
        Mat c;
        c.init();
        for(int i=1;i<=4;i++)
            for(int j=1;j<=4;j++)
                for(int k=1;k<=4;k++)
                    c.a[i][j]=(c.a[i][j]+a[i][k]*p.a[k][j]%Q)%Q;
        return c;
    }
}F[2][2];

struct node{
    int l,r;
    Mat v;
}tr[N<<2];

void chf(int idx){tr[idx].v=tr[idx<<1].v*tr[idx<<1|1].v;}
void build(int ql,int qr,int idx)
{
    tr[idx].l=ql,tr[idx].r=qr;
    if(ql==qr) return void(tr[idx].v=F[l[ql]][r[ql]]);

    int mid=(ql+qr)>>1;
    build(ql,mid,idx<<1);
    build(mid+1,qr,idx<<1|1);
    chf(idx);
}

void modify(int pos,int idx)
{
    node &t=tr[idx];
    if(pos==t.l && pos==t.r) return void(tr[idx].v=F[l[pos]][r[pos]]);

    int mid=(t.l+t.r)>>1;
    if(pos<=mid) modify(pos,idx<<1);
    else modify(pos,idx<<1|1);
    chf(idx);
}

void solve()
{
    n=fr(),m=fr(),t=fr();
    for(int i=1,a,b;i<=m;i++) a=fr(),b=fr(),pre[a][b]=1;
    for(int i=1;i<=n;i++) pre[1][i]=pre[i][n]=1;
    for(int k=1;k<=n;k++)
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                if(pre[i][k] && pre[k][j]) pre[i][j]=1;

    int cnt=0;
    for(int S=0;S<(1<<n);S++)
    {
        int ok=1;
        for(int i=0;i<n;i++)
            if(!((S>>i)&1))
                if((S<<1)&(int)pre[i+1].to_ullong()) ok=0;
        cnt+=ok; 
    }

    //(f[0][0],f[0][1],f[1][0],f[1][1])*F
    F[0][0].init(),F[0][1].init(),F[1][0].init(),F[1][1].init();
    for(int l=0;l<=1;l++)
        for(int r=0;r<=1;r++)
            for(int i=0;i<=1;i++)
                for(int j=0;j<=1;j++)
                    for(int x1=0;x1<=1;x1++)
                        for(int xn=0;xn<=1;xn++)
                        {
                            if(i && x1>r) continue;
                            if(j && xn<l) continue;
                            if(x1<xn) continue; 

                            //f[n][i&(x1==r)][j&(xn==l)]+=f[n-1][i][j]*v;
                            int v=(x1==xn)?1:cnt-2; //减去全0和全1
                            F[l][r].a[pos[i][j]][pos[i&(x1==r)][j&(xn==l)]]=(v+F[l][r].a[pos[i][j]][pos[i&(x1==r)][j&(xn==l)]])%Q;
                        }
    
    memset(l,0,sizeof l);
    memset(r,0,sizeof r);
    string _l,_r;
    cin>>_l>>_r;
    for(int i=1;i<=_l.size();i++) l[len-_l.size()+i]=_l[i-1]-'0'; //右对齐
    for(int i=1;i<=_r.size();i++) r[len-_r.size()+i]=_r[i-1]-'0';

    build(1,len,1);
    fw((tr[1].v.a[4][1]+tr[1].v.a[4][2]+tr[1].v.a[4][3]+tr[1].v.a[4][4])%Q),nl;

    while(t--)
    {
        int op=fr(),pos=fr();
        if(op) r[len-_r.size()+pos]^=1,modify(len-_r.size()+pos,1); //这里的pos也要改
        else l[len-_l.size()+pos]^=1,modify(len-_l.size()+pos,1);
        fw((tr[1].v.a[4][1]+tr[1].v.a[4][2]+tr[1].v.a[4][3]+tr[1].v.a[4][4])%Q),nl;
    }

    for(int i=1;i<=n;i++) pre[i]&=0;
}

signed main()
{
    int T=fr();
    while(T--) solve();

    return 0;
}
```



# B

[1002 The World Cup](https://acm.hdu.edu.cn/contest/problem?cid=1231&pid=1002)

抽象的线性规划，完全不会的题目哦

注：每个队都可以同时投赢和输，投的钱可以是小数，反正就想怎么投就可以怎么投

有两种思路，1块钱可以最多赚多少和赚1块钱最少需要多少，两种思路的转化都差别不大吧反正

考虑第二种，设每个队投夺冠回报是 $u_i$，输回报是 $v_i$

投入就是 $\frac {u_i}{x_i}=a_iu_i$ 和 $\frac {v_i}{\frac {x_i}{x_i-1}}=b_iv_i$

第 $k$ 队夺冠，回报 $u_k+\sum_{i \not = k} v_i \geq 1$

 转为线性规划
$$
\begin{aligned}
\min\quad&
\sum_{i=1}^n(a_i u_i+b_i v_i)\\
\text{s.t.}\quad&
u_k+\sum_{i\ne k}v_i\ge1,
\qquad k=1,2,\ldots,n,\\
&u_i,v_i\ge0.
\end{aligned}
$$
因为挺难做的，转成对偶问题

转对偶用 $\min\{c^Tx:Ax=b,\ x\ge0\} = \max\{b^Ty:A^Ty\le c\}$，对偶问题的最大值就是当前问题的最小值

首先第一步转成向量和矩阵形式
$$
令z=
\begin{pmatrix}
u_1\\
u_2\\
\vdots\\
u_n\\
v_1\\
v_2\\
\vdots\\
v_n
\end{pmatrix},

系数向量c=
\begin{pmatrix}
a_1\\
a_2\\
\vdots\\
a_n\\
b_1\\
b_2\\
\vdots\\
b_n
\end{pmatrix}.
\\
$$

设约束矩阵为 $B_{n \times 2n}=
\begin{pmatrix}
I_n & J_n-I_n
\end{pmatrix}$，$I_n$ 是 $n$ 阶单位矩阵，$J_n$ 是 $n$ 阶全 $1$ 矩阵

原问题变为
$$
\begin{aligned}
\min\quad&c^Tz\\
\text{s.t.}\quad&Bz\ge\mathbf 1,\\
&z\ge0.
\end{aligned}
\\
$$

然后转成等式
$$
引入剩余变量 s_{n \times 1}\ge0，得到

Bz-s=\mathbf 1.
\\
令
X_{3n \times 1}=
\begin{pmatrix}
z\\
s
\end{pmatrix},
\\

\\
A_{n \times 3n}=
\begin{pmatrix}
B&-I_n
\end{pmatrix},
\\

\\
C_{3n \times 1}=
\begin{pmatrix}
c\\
0
\end{pmatrix}.
\\
$$
于是原问题变为
$$
\\
\begin{aligned}
\min\quad&C^TX\\
\text{s.t.}\quad&AX=\mathbf 1_{n \times 1},\\
&X\ge0.
\end{aligned}
\\
$$

根据转置对偶公式，对偶问题为
$$
\\
\begin{aligned}
\max\quad&\mathbf 1^T_{1 \times n}y_{n\times 1}\\
\text{s.t.}\quad&A^T_{3n \times n}y_{n \times 1}\le C.
\end{aligned}
\\
$$

$$
\\
A_{n \times 3n}=
\begin{pmatrix}
B&-I_n
\end{pmatrix},
\\

\\
A^T_{3n \times n}=
\begin{pmatrix}
B^T\\
-I_n
\end{pmatrix}.
\\
$$

$\begin{pmatrix}
B^T_{2n \times n}\\
-I_n
\end{pmatrix}.y_{n \times 1}\le C=\begin{pmatrix}
c_{2n \times 1}\\
0
\end{pmatrix}.$ 等价于 $B^Ty\le c$，$-y\le0$

所以对偶问题为
$$
\begin{aligned}
\max\quad&\sum_{i=1}^ny_i\\
\text{s.t.}\quad&B^Ty\le c,\\
&y_i\ge0.
\end{aligned}
$$

$\begin{pmatrix} I_n\\ J_n-I_n \end{pmatrix}_{2n \times n}.y_{n \times 1} \leq \begin{pmatrix}
a_1\\
a_2\\
\vdots\\
a_n\\
b_1\\
b_2\\
\vdots\\
b_n
\end{pmatrix}_{2n \times 1}$  所以 $y_i \leq a_i$ ，$\sum_{k \not =i} y_k \leq b_i$ 

不妨设 $\sum y_i =s$，则 $\max (0,s-b_i) \leq y_i \leq a_i$，问题转化成是否存在这样一组 $y_i$ 和为 $s$

$\sum y_i =\sum \max (0,s-b_i) \leq s= \sum y_i \leq \sum a_i$，$\max (0,s-b_i) \leq a_i \Rightarrow s \leq a_i+b_i=1$ 

分别为确保上下界满足和任意区间非空，所以可行

观察到如果 $s$ 可行，更小的 $s'$ 也可行，所以可以二分

大力对它二分，则答案为 $\frac {w}{ans}$

代码很简单就不写了，懒