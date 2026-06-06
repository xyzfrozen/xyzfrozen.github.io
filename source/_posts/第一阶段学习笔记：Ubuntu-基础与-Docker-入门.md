---
title: 第一阶段学习笔记：Ubuntu 基础与 Docker 入门
date: 2026-06-06 14:13:55
tags:
- Linux
- Docker
- WSL2
- CMake
categories:
- note
mathjax: true
---

# 第一阶段学习笔记：Ubuntu 基础与 Docker 入门


## 1. 学习目标

第一阶段围绕后续机器人/ROS2/OpenCV 学习前的基础环境

- 安装并熟悉 WSL2 / Ubuntu 环境。
- 掌握基本 Linux 命令，能在终端中完成文件、目录、权限和软件安装操作。
- 了解 Git 的基础使用方式。
- 简要熟悉 Vim 的基本编辑流程。
- 理解 CMake 最小项目的构建流程。
- 重点学习 Docker，理解 image、container、端口映射、目录挂载等概念。


## 2. 学习资源

- [极简 Docker 入门笔记](https://www.dbkuaizi.com/archives/465.html)

- [Docker 相关学习视频](https://www.bilibili.com/video/BV1THKyzBER6/?spm_id_from=333.1387.favlist.content.click&vd_source=7be7c22c2703c0f97b1d6569df2c87da)


## 3. 环境搭建

第一阶段先完成 WSL2 和 Ubuntu 的安装。WSL2 提供了一个可以在 Windows 中运行 Linux 用户空间的环境，适合前期学习 Linux 命令、编译工具和 Docker 基础。

Ubuntu 内部安装基础工具：

```bash
sudo apt update
sudo apt install -y build-essential git vim cmake gdb python3 python3-pip curl wget unzip
```

含义：

- `sudo apt update`：更新软件源索引。
- `build-essential`：安装 GCC、G++、make 等基础编译工具。
- `git`：版本管理工具。
- `vim`：终端文本编辑器。
- `cmake`：跨平台构建系统生成工具。
- `gdb`：调试工具。
- `python3` / `python3-pip`：Python 运行环境和包管理器。
- `curl` / `wget`：命令行下载工具。
- `unzip`：解压 zip 文件。


## 4. Linux 基础

这一部分只需要掌握够用的命令，目标是能在终端中移动、创建文件、查看内容和处理权限。

常用命令：

```bash
pwd
ls
ls -la
cd path
mkdir name
mkdir -p a/b/c
touch file.txt
cat file.txt
cp a b
mv a b
rm file.txt
chmod +x script.sh
```

简要含义：

- `pwd`：显示当前所在目录。
- `ls`：列出当前目录内容。
- `ls -la`：显示隐藏文件和详细权限信息。
- `cd`：切换目录。
- `mkdir`：创建目录。
- `mkdir -p`：递归创建多级目录。
- `touch`：创建空文件或更新时间戳。
- `cat`：查看文件内容。
- `cp`：复制文件或目录。
- `mv`：移动或重命名。
- `rm`：删除文件。
- `chmod +x`：给脚本增加可执行权限。


## 5. Git

Git 部分主要掌握本地仓库的基本流程，能够记录学习文件的修改。

常用流程：

```bash
git init
git status
git add README.md
git commit -m "Initial commit"
git log --oneline
```

含义：

- `git init`：初始化本地仓库。
- `git status`：查看当前工作区状态。
- `git add`：把文件加入暂存区。
- `git commit -m`：提交一次版本记录。
- `git log --oneline`：用简短形式查看提交历史。

如果提交时缺少用户名和邮箱，可以设置：

```bash
git config --global user.name "your-name"
git config --global user.email "your-email@example.com"
```


## 6. Vim

```text
i      进入插入模式
Esc    回到普通模式
:w     保存
:q     退出
:wq    保存并退出
:q!    不保存强制退出
```



## 7. CMake

CMake 学习重点是理解两步：

```bash
cmake -S . -B build
cmake --build build
```

第一步：

```bash
cmake -S . -B build
```

含义：

- `-S .`：指定源码目录是当前目录。
- `-B build`：指定构建目录是 `build`。

这一步会读取当前目录中的 `CMakeLists.txt`，并在 `build` 目录中生成构建文件。

第二步：

```bash
cmake --build build
```

含义：

- `--build`：告诉 CMake 开始编译。
- `build`：指定使用哪个构建目录。

如果执行：

```bash
cmake -S . -B build
```

时出现：

```text
CMake Error: The source directory ".../linux-mini-practice" does not appear to contain CMakeLists.txt.
```

说明当前目录里没有 `CMakeLists.txt`。CMake 必须从包含 `CMakeLists.txt` 的目录开始配置项目。




## 8. Docker

Docker 是这一阶段的重点。它的作用是把应用和运行环境打包起来，让程序在相对一致的环境中运行。

### 8.1 image 和 container

Docker 中最核心的两个概念是：

- `image`：镜像，可以理解为容器的模板或快照。
- `container`：容器，是镜像运行起来之后的实例。

关系：

```text
image -> docker run -> container
```

一个镜像可以创建多个容器。镜像本身通常不运行，容器才是运行中的进程环境。

例如：

```bash
docker pull nginx
docker run nginx
```

`docker pull nginx` 下载 Nginx 镜像，`docker run nginx` 根据这个镜像创建并启动容器。

### 8.2 查看镜像

```bash
docker images
```

作用：查看本地已有镜像。

输出中常见字段：

- `REPOSITORY`：镜像名。
- `TAG`：标签，常见为 `latest`。
- `IMAGE ID`：镜像 ID。
- `SIZE`：镜像大小。

### 8.3 删除镜像

```bash
docker rmi IMAGE_ID
```

作用：删除指定镜像。

如果出现类似：

```text
conflict: unable to delete ... image is being used by stopped container
```

说明这个镜像仍然被某个停止状态的容器占用。需要先删除对应容器，再删除镜像。

常用处理顺序：

```bash
docker ps -a
docker rm CONTAINER_ID
docker rmi IMAGE_ID
```

如果确实确认不需要，也可以强制删除镜像：

```bash
docker rmi -f IMAGE_ID
```

但学习阶段更推荐先理解占用关系，不急着强制删除。

### 8.4 查看容器

```bash
docker ps
```

作用：查看正在运行的容器。

```bash
docker ps -a
```

作用：查看所有容器，包括已经停止的容器。

### 8.5 启动 Nginx 容器

```bash
docker run -d --name nginx-demo -p 8080:80 nginx
```

含义：

- `docker run`：用镜像创建并启动容器。
- `-d`：后台运行。
- `--name nginx-demo`：给容器起名，方便后续管理。
- `-p 8080:80`：端口映射。
- `nginx`：使用 Nginx 镜像。

端口映射：

```text
8080 = 主机端口
80   = 容器端口
```

访问：

```text
http://localhost:8080
```

会转发到容器内部的 `80` 端口。

### 8.6 停止和删除容器

```bash
docker stop nginx-demo
docker rm nginx-demo
```

含义：

- `docker stop`：停止运行中的容器。
- `docker rm`：删除已经停止的容器。

一般顺序是：

```text
先 stop，再 rm
```

### 8.7 目录挂载

学习过程中重点理解了这个命令：

```bash
docker run -d -p 8080:80 -v ./:/usr/share/nginx/html nginx
```

完整含义：启动一个 Nginx 容器，把当前目录作为网页目录挂进去，并把网页服务暴露到本机 `8080` 端口。

逐段解释：

```bash
docker run
```

用镜像创建并启动一个新容器。

```bash
-d
```

后台运行容器。

```bash
-p 8080:80
```

端口映射：

```text
访问主机 localhost:8080
转发到容器内部 80 端口
```

```bash
-v ./:/usr/share/nginx/html
```

目录挂载：

```text
./                      当前目录
/usr/share/nginx/html   容器里 Nginx 默认网页目录
```

也就是把当前目录挂载到容器里的网页目录。当前目录中的 `index.html` 会被 Nginx 当作网页展示。

```bash
nginx
```

指定使用 `nginx` 镜像。

测试流程：

```bash
mkdir -p ~/docker-nginx-demo
cd ~/docker-nginx-demo
echo "<h1>Hello Docker Nginx</h1>" > index.html
docker run -d --name nginx-demo -p 8080:80 -v ./:/usr/share/nginx/html nginx
```

然后访问：

```text
http://localhost:8080
```

如果看到 `Hello Docker Nginx`，说明挂载和端口映射都成功了。

### 8.8 进入容器

```bash
docker exec -it nginx-demo bash
```

作用：进入正在运行的容器内部。

参数含义：

- `exec`：在已有容器中执行命令。
- `-it`：提供交互式终端。
- `nginx-demo`：容器名。
- `bash`：进入容器后启动 bash。

如果镜像没有 bash，可以尝试：

```bash
docker exec -it nginx-demo sh
```

### 8.9 volume 的理解

Docker 中的挂载大致分为两类：

- bind mount：把主机上的某个具体目录挂进容器。
- volume：由 Docker 管理的数据卷。

本阶段主要使用的是 bind mount：

```bash
-v ./:/usr/share/nginx/html
```

它适合学习和开发，因为本地文件修改后，容器中能直接看到变化。

### 8.10 Dockerfile

Dockerfile 用来描述如何构建自己的镜像。

常见指令：

```dockerfile
FROM nginx
COPY . /usr/share/nginx/html
```

含义：

- `FROM nginx`：以 Nginx 镜像作为基础镜像。
- `COPY . /usr/share/nginx/html`：把当前目录内容复制到镜像中的网页目录。

构建镜像：

```bash
docker build -t my-nginx .
```

含义：

- `build`：构建镜像。
- `-t my-nginx`：给镜像命名。
- `.`：构建上下文是当前目录。

运行自定义镜像：

```bash
docker run -d -p 8080:80 my-nginx
```

### 8.11 Docker Compose

Docker Compose 用来管理多个容器服务。第一阶段只需要先理解它解决的问题：当项目有多个服务时，不想每次都手写很长的 `docker run` 命令，可以把配置写进 `docker-compose.yml`。

示例结构：

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./:/usr/share/nginx/html
```

启动：

```bash
docker compose up -d
```

停止：

```bash
docker compose down
```

含义：

- `up -d`：后台启动配置中的服务。
- `down`：停止并移除相关容器和网络。

