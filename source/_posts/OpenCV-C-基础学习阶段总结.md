---
title: OpenCV C++ 基础学习阶段总结
date: 2026-08-17 10:06:33
tags:
- OpenCV
- 计算机视觉
categories:
- note
mathjax: true
---

## Learning Resources

### Web Pages

- [Computer Vision Zone - OpenCV C++ Course](https://www.computervision.zone/courses/opencv-cv/)

### Videos

- [4h 上手 C++ 版 OpenCV](https://www.bilibili.com/video/BV11A411T7rL/)

## Raw Notes

### 1. 图片、视频与摄像头输入

```cpp
Mat img=imread(path);
imshow("Image",img);
waitKey(0);
```

`imread` 把磁盘图片读取为 `Mat`，`imshow` 提交窗口显示内容，`waitKey` 等待按键并处理窗口事件

视频和摄像头通过 `VideoCapture` 读取：

```cpp
VideoCapture cap(path);

while(1)
{
    Mat img;
    cap.read(img);
    if(img.empty())break;
    imshow("Video",img);
    waitKey(20);
}
```

USB 摄像头在 Ubuntu 中通常表现为 `/dev/video0`、`/dev/video1` 等设备一个摄像头可能暴露多个视频节点，因此程序打不开时要依次确认设备编号、`cap.isOpened()`、空帧和用户的 `video` 组权限

### 2. 基础图像处理

```text
原图 → 灰度图 → 高斯模糊 → Canny 边缘 → 膨胀/腐蚀
```

```cpp
cvtColor(img,imggray,COLOR_BGR2GRAY);
GaussianBlur(img,imgblur,Size(5,5),0);
Canny(img,imgcanny,25,75);

Mat kernel=getStructuringElement(MORPH_RECT,Size(3,3));
dilate(imgcanny,imgdil,kernel);
erode(imgcanny,imgero,kernel);
```

当前练习代码虽然生成了 `imggray` 和 `imgblur`，但 `Canny` 仍然传入 `img`，如果要让灰度化和高斯模糊真正参与边缘检测，应该写成 `Canny(imgblur,imgcanny,25,75)`

- `cvtColor`：转换颜色空间，例如 BGR 转灰度或 HSV
- `GaussianBlur`：平滑图像并抑制噪声，避免边缘检测产生过多碎边

- `Canny`：检测灰度变化明显的位置，输出二值边缘图
- `dilate`：扩大白色区域，可连接断裂边缘
- `erode`：缩小白色区域，可去除小噪点

使用 `Size(1,1)` 核时，膨胀和腐蚀几乎不会产生变化

### 3. 缩放、裁剪与 ROI

`resize` 用于调整图像尺寸：

```cpp
resize(img,imageresize,Size(),0.5,0.5);
```

当 `Size()` 为空时，后面的 `fx`、`fy` 表示横向和纵向缩放倍率

裁剪通过 ROI 完成：

```cpp
Rect cut(200,100,300,300);
Mat imgcut=img(cut);
```

`Rect(x,y,width,height)` 中，`x`、`y` 是左上角坐标，坐标原点位于图像左上角，向右为 `x` 正方向，向下为 `y` 正方向

```cpp
Mat view=img(rect);         // 与原图共享像素数据
Mat copy=img(rect).clone(); // 独立复制像素数据
```

### 4. 绘图与文字

OpenCV 可以创建空白画布并绘制图形：

```cpp
Mat img(512,512,CV_8UC3,Scalar(255,255,255));
circle(img,Point(256,256),155,Scalar(0,69,255),FILLED);
rectangle(img,Point(130,226),Point(382,286),Scalar(255,255,255),FILLED);
line(img,Point(130,296),Point(382,296),Scalar(255,255,255),2);
putText(img,"xyzfrozen",Point(145,266),FONT_HERSHEY_DUPLEX,1.45,Scalar(0,69,255),2);
```

 `Point`、`Scalar`、线宽和填充方式， 默认颜色顺序是 BGR

### 5. 透视变换

透视变换可以把倾斜的平面区域拉正，常用于文档扫描、卡片矫正、车道鸟瞰图等任务

```cpp
Point2f src[4]={{529,142},{771,190},{405,395},{674,457}};
Point2f dst[4]={{0.0,0.0},{w,0.0},{0.0,h},{w,h}};

Mat matrix=getPerspectiveTransform(src,dst);
warpPerspective(img,imgWarp,matrix,Size(w,h));
```

`getPerspectiveTransform` 根据四组对应点计算 `3×3` 透视矩阵，`warpPerspective` 再根据矩阵重新采样整张图像

四个点必须一一对应，并保持一致顺序，左上、右上、左下、右下

### 6. HSV 颜色检测与滑动条

颜色检测先把 BGR 图像转换为 HSV：

```cpp
cvtColor(img,imgHSV,COLOR_BGR2HSV);
```

HSV 将颜色、饱和度和亮度分开：

- H：色相，OpenCV 中范围为 `0~179`
- S：饱和度，范围为 `0~255`
- V：明度，范围为 `0~255`

`inRange` 对每个像素进行范围判断：

```cpp
Scalar lower(hmin,smin,vmin);
Scalar upper(hmax,smax,vmax);
inRange(imgHSV,lower,upper,mask);
```

三个通道全部位于上下界之间时，输出 mask 的对应像素为 `255`；否则为 `0`因此 mask 是一张用于表达“保留哪些区域”的单通道二值图

`namedWindow` 创建窗口，`createTrackbar` 把滑动条位置与变量绑定：

```cpp
namedWindow("Trackbars",WINDOW_NORMAL);
resizeWindow("Trackbars",640,200);
createTrackbar("Hue Min","Trackbars",&hmin,179);
```

`lower` 和 `upper` 放在循环内部，是为了每一轮都读取滑动条更新后的值这里不是程序显式创建了两个线程，而是主循环交替完成：

```text
读取当前变量 → inRange → imshow → waitKey 处理窗口事件 → 下一轮
```

`waitKey(1)` 不只是等待按键，还会让 OpenCV 处理窗口重绘、鼠标、键盘和滑动条事件

### 7. 轮廓与形状识别

完整流程为：

```text
灰度化 → 模糊 → Canny → 膨胀 → findContours → 面积过滤 → 多边形近似 → 外接矩形 → 形状分类
```

`findContours` 从二值图中提取白色区域的边界：

```cpp
vector<vector<Point>> contours;
vector<Vec4i> hierarchy;
findContours(imgdil,contours,hierarchy,RETR_EXTERNAL,CHAIN_APPROX_SIMPLE);
```

- `contours[i]` 表示第 `i` 个轮廓
- 每个轮廓是按边界顺序排列的一组 `Point`
- `RETR_EXTERNAL` 只取最外层轮廓
- `CHAIN_APPROX_SIMPLE` 压缩共线点，只保留关键点

`contourArea` 把轮廓点视为闭合多边形，计算几何面积：$\frac12\times\left|\sum(x_iy_{i+1}-x_{i+1}y_i)\right|$

形状识别部分使用：

```cpp
float peri=arcLength(contours[i],true);
approxPolyDP(contours[i],conPoly[i],0.02*peri,true);
boundRect[i]=boundingRect(conPoly[i]);
```

- `arcLength`：计算轮廓周长，`true` 代表闭合曲线
- `approxPolyDP`：用较少顶点近似轮廓
- `boundingRect`：返回能够包围指定点集或非零像素的最小水平外接矩形
- 顶点为 3 个时判断为三角形
- 顶点为 4 个时通过宽高比区分正方形和矩形
- 顶点多于 4 个时粗略判断为圆

### 8. Haar 级联分类器

使用预训练 XML 分类器完成人脸检测：

```cpp
CascadeClassifier faceCascade;
faceCascade.load("Resources/haarcascade_frontalface_default.xml");

vector<Rect> faces;
faceCascade.detectMultiScale(img,faces,1.1,10);

for (int i=0;i<faces.size();i++)
    rectangle(img,faces[i].tl(),faces[i].br(),Scalar(255,0,255),3);
```

`detectMultiScale` 会在不同尺度上搜索目标，结果以 `vector<Rect>` 返回，每个 `Rect` 都是一个检测框之后使用 `rectangle` 把结果画到原图上

`1.1`：缩放比例检测器会把图片按不同比例缩放来找不同大小的人脸

- 越接近 `1.0`，检测更细，可能更准，但更慢
-  `1.1` 是常用值

`10`：邻近框数量阈值

- 数值越大，要求越严格，误检少，但可能漏检
- 数值越小，容易检测出更多框，但误检也可能变多



## Projects

### Project 1：虚拟画板

项目处理链路：

```text
摄像头画面
   ↓
BGR 转 HSV
   ↓
根据多组 HSV 上下界生成 mask
   ↓
查找轮廓并过滤小面积噪声
   ↓
求外接矩形顶部中心点
   ↓
把历史点保存到 newPoints
   ↓
按颜色索引在画面上连续画圆
```

这个项目把输入、颜色分割、轮廓定位和结果绘制组合成了一个实时系统`newPoints` 持续保存检测点，所以物体移动后会留下轨迹

当前实现可以继续加强：检查摄像头是否打开、优先选择最大有效轮廓、对 mask 做形态学去噪，并限制历史点数量

```cpp
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <iostream>

using namespace cv;
using namespace std;

Mat img;
VideoCapture cap(0);
vector<vector<int>> newPoints;  // to store all points

// hmin, smin, vmin hmax, smax, vmax
vector<vector<int>> myColors{ {124,48,117,143,170,255}, // Purple
								{68,72,156,102,126,255} };// Green
vector<Scalar> myColorValues{ {255,0,255},		// Purple
								{0,255,0} };// Green

Point getContours(Mat image)
{
	vector<vector<Point>> contours;
	vector<Vec4i> hierarchy;

	findContours(image, contours, hierarchy, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
	//drawContours(img, contours, -1, Scalar(255, 0, 255), 2);
	vector<vector<Point>> conPoly(contours.size());
	vector<Rect> boundRect(contours.size());

	Point myPoint(0, 0);

	for (int i = 0; i < contours.size(); i++)
	{
		int area = contourArea(contours[i]);
		cout << area << endl;

		string objectType;

		if (area > 1000)
		{
			float peri = arcLength(contours[i], true);
			approxPolyDP(contours[i], conPoly[i], 0.02 * peri, true);

			cout << conPoly[i].size() << endl;
			boundRect[i] = boundingRect(conPoly[i]);
			myPoint.x = boundRect[i].x + boundRect[i].width / 2;
			myPoint.y = boundRect[i].y;

			//drawContours(img, conPoly, i, Scalar(255, 0, 255), 2);
			//rectangle(img, boundRect[i].tl(), boundRect[i].br(), Scalar(0, 255, 0), 5);
		}
	}
	return myPoint;
}

vector<vector<int>> findColor(Mat img)
{
	Mat imgHSV;
	cvtColor(img, imgHSV, COLOR_BGR2HSV);

	for (int i = 0; i < myColors.size(); i++)
	{
		Scalar lower(myColors[i][0], myColors[i][1], myColors[i][2]);
		Scalar upper(myColors[i][3], myColors[i][4], myColors[i][5]);
		Mat mask;
		inRange(imgHSV, lower, upper, mask);
		//imshow(to_string(i), mask);
		Point myPoint = getContours(mask);
		if(myPoint.x)
			newPoints.push_back({ myPoint.x,myPoint.y,i });
	}
	return newPoints;
}

void drawOnCanvas(vector<vector<int>> newPoints, vector<Scalar> myColorValues)
{
	for (int i = 0; i < newPoints.size(); i++)
		circle(img, Point(newPoints[i][0],newPoints[i][1]), 10, myColorValues[newPoints[i][2]], FILLED);
}

int main()
{
	while (1)
    {
		cap.read(img);
		newPoints = findColor(img);
		drawOnCanvas(newPoints, myColorValues);

		imshow("Image", img);
		waitKey(1);
	}
    return 0;
}
```



### Project 2：文档扫描器

项目处理链路：

```text
读取纸张图片
   ↓
灰度、模糊、Canny、膨胀
   ↓
寻找面积最大的四边形轮廓
   ↓
按照左上、右上、左下、右下重排角点
   ↓
透视变换为固定大小
   ↓
通过 ROI 裁掉边缘
```

`reorder` 使用坐标和与坐标差判断四个角点：

- `x+y` 最小：左上角
- `x+y` 最大：右下角
- `x-y` 最大：右上角
- `x-y` 最小：左下角

这个项目把轮廓提取、几何判断、透视变换和 ROI 串成了一条完整的传统视觉流水线

需要补充的边界保护是：没有找到四边形时，不能直接调用 `reorder`；ROI 的宽高也必须为正并位于图像内部

```cpp
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <bits/stdc++.h>

using namespace cv;
using namespace std;

Mat imgorigin,imgWarp;
vector<Point> initPoints,docs;

Mat preprocess(Mat img)
{
    Mat imggray,imgblur,imgcanny;
    cvtColor(img,imggray,COLOR_BGR2GRAY);
    GaussianBlur(img,imgblur,Size(5,5),0);
    Canny(img,imgcanny,25,75);

    Mat imgdil,imgero;
    Mat kernel=getStructuringElement(MORPH_RECT,Size(1,1));
    dilate(imgcanny,imgdil,kernel);
    return imgdil;
}

vector<Point> getContours(Mat image)
{
	vector<vector<Point>> contours;
	vector<Vec4i> hierarchy;

	findContours(image, contours, hierarchy, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
	//drawContours(img, contours, -1, Scalar(255, 0, 255), 2);
	vector<vector<Point>> conPoly(contours.size());
	vector<Rect> boundRect(contours.size());

	vector<Point> biggest;

    int mxArea=0;
	for (int i=0;i<contours.size();i++)
	{
		int area=contourArea(contours[i]);
		cout<<area<<endl;

		string objectType;

		if (area>1000)
		{
			float peri = arcLength(contours[i], true);
			approxPolyDP(contours[i], conPoly[i], 0.02 * peri, true);

			if(area>mxArea && conPoly[i].size()==4)
            {
                mxArea=area;
                biggest={conPoly[i][0],conPoly[i][1],conPoly[i][2],conPoly[i][3]};
                drawContours(imgorigin, conPoly, i, Scalar(255, 0, 255), 2);
            }

			//rectangle(img, boundRect[i].tl(), boundRect[i].br(), Scalar(0, 255, 0), 5);
		}
	}
	return biggest;
}

void drawPoints(vector<Point> points,Scalar color)
{
    for(int i=0;i<points.size();i++)
    {
        circle(imgorigin,points[i],5,color,FILLED);
        putText(imgorigin,to_string(i),points[i],FONT_HERSHEY_PLAIN,5,color,5);
    }
}

vector<Point> reorder(vector<Point> points)
{
    vector<int> sumPoints,subPoints;
    for(int i=0;i<4;i++)
    {
        sumPoints.push_back(points[i].x+points[i].y);
        subPoints.push_back(points[i].x-points[i].y);
    }

    return vector<Point>{
        {points[min_element(sumPoints.begin(),sumPoints.end())-sumPoints.begin()]},
        {points[max_element(subPoints.begin(),subPoints.end())-subPoints.begin()]},
        {points[min_element(subPoints.begin(),subPoints.end())-subPoints.begin()]},
        {points[max_element(sumPoints.begin(),sumPoints.end())-sumPoints.begin()]}
    };
}

float w=420,h=596;
Mat getWarp(Mat img,vector<Point> points,float w,float h)
{
    Point2f src[4]={points[0],points[1],points[2],points[3]};
    Point2f dst[4]={{0.0,0.0},{w,0.0},{0.0,h},{w,h}};

    Mat matrix=getPerspectiveTransform(src,dst);
    warpPerspective(img,imgWarp,matrix,Point(w,h));
    return imgWarp;
}

int main()
{
    string path="Resources/paper.jpg";
    imgorigin=imread(path);
    // resize(imgorigin,imgorigin,Size(),0.5,0.5);

    Mat img=preprocess(imgorigin);
    initPoints=getContours(img);
    // drawPoints(initPoints,Scalar(0,0,255));
    docs=reorder(initPoints);
    // drawPoints(docs,Scalar(0,0,255));

    imgWarp=getWarp(imgorigin,docs,w,h);
    int cropv=5;
    Rect roi(cropv,cropv,w-(cropv<<1),h-(cropv<<1));
    Mat imgcrop=imgWarp(roi);

    imshow("imgorigin",imgorigin);
    imshow("Image",img);
    imshow("Image",imgWarp);
    imshow("Image",imgcrop);
    waitKey(0);
    return 0;
}
```



### Project 3：车牌检测与裁剪

项目处理链路：

```text
摄像头画面
   ↓
Haar 级联分类器检测车牌
   ↓
得到 vector<Rect> 检测框
   ↓
img(plates[i]) 获取车牌 ROI
   ↓
显示并保存裁剪结果
   ↓
在原图上绘制检测框
```

裁剪：

```cpp
Mat imgCrop=img(plates[i]);
```

`plates[i]` 是 `Rect(x,y,width,height)`这行代码创建的是原图对应区域的视图，通常不复制像素如果裁剪图需要脱离原图长期保存或单独修改，可以使用：

```cpp
Mat imgCrop=img(plates[i]).clone();
```
写入文件
```cpp
imwrite("Resources/Plates/"+to_string(i)+".png",imgCrop);
```

```cpp
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/objdetect.hpp>
#include <bits/stdc++.h>

using namespace cv;
using namespace std;

void plate_detection(Mat img)
{
	CascadeClassifier plateCascade;
	plateCascade.load("Resources/haarcascade_russian_plate_number.xml");

	vector<Rect> plates;
	plateCascade.detectMultiScale(img,plates,1.1,10);

	for (int i=0;i<plates.size();i++)
	{
        Mat imgCrop=img(plates[i]);
        imshow(to_string(i),imgCrop);
        imwrite("Resources/Plates/"+to_string(i)+".png",imgCrop);
        rectangle(img,plates[i].tl(),plates[i].br(),Scalar(255,0,255),3);
    }

    imshow("Image",img);
}

int main()
{
    VideoCapture cap(0);

    while(1)
    {
        Mat img;
        cap.read(img);
        if(img.empty()) break;
        plate_detection(img);
        waitKey(1);
    }
    return 0;
}
```





## OpenCV 函数功能说明

### 图片、视频与窗口

- `imread`：从磁盘读取图片并返回一个 `Mat`

```cpp
cv::Mat cv::imread(const cv::String& filename,int flags=cv::IMREAD_COLOR);
```

- `filename`：图片路径，支持由文件扩展名识别的常见图片格式
- `flags`：读取模式，`IMREAD_COLOR` 读取 BGR 彩色图，`IMREAD_GRAYSCALE` 读取灰度图，`IMREAD_UNCHANGED` 保留原始通道
- 返回值：读取成功时返回图像矩阵，失败时返回空 `Mat`，可以使用 `empty()` 检查

- `imshow`：把图像提交到指定窗口显示

```cpp
void cv::imshow(const cv::String& winname,cv::InputArray mat);
```

- `winname`：窗口名称，同名窗口会复用
- `mat`：需要显示的图像
- `imshow` 负责提交画面，窗口刷新和事件响应通常还需要配合 `waitKey`

- `waitKey`：等待键盘输入并处理 OpenCV 窗口事件

```cpp
int cv::waitKey(int delay=0);
```

- `delay`：等待时间，单位为毫秒，传 `0` 表示一直等待，传正数表示至少等待对应时间
- 返回值：检测到按键时返回按键码，没有按键时通常返回 `-1`
- 除了读取键盘，它还负责窗口重绘、鼠标和 trackbar 等 HighGUI 事件

- `VideoCapture`：打开摄像头或视频文件

```cpp
cv::VideoCapture cap(index,apiPreference);
cv::VideoCapture cap(filename,apiPreference);
```

- `index`：摄像头编号，`0` 通常对应 `/dev/video0`
- `filename`：视频文件路径
- `apiPreference`：视频后端，Ubuntu 下可以指定 `cv::CAP_V4L2`，省略时由 OpenCV 自动选择
- 一个 USB 摄像头可能对应多个 `/dev/video*`，需要确认哪个节点能输出正常图像流

- `VideoCapture::isOpened`：检查摄像头或视频是否成功打开

```cpp
bool cv::VideoCapture::isOpened() const;
```

- 返回 `true` 表示输入源已经打开
- 返回 `false` 时不能继续假设后续帧有效

- `VideoCapture::read`：从视频或摄像头读取下一帧

```cpp
bool cv::VideoCapture::read(cv::OutputArray image);
```

- `image`：用于接收当前帧的 `Mat`
- 返回值：成功读取一帧时返回 `true`，读取失败或视频结束时返回 `false`
- 即使返回值未被使用，也应该用 `img.empty()` 保护后续图像处理

- `Mat::empty`：判断 `Mat` 是否没有有效图像数据

```cpp
bool cv::Mat::empty() const;
```

- 返回 `true` 表示矩阵没有元素或没有绑定有效数据
- 常用于检查 `imread`、摄像头帧和视频帧是否有效

- `Mat::size`：获取图像宽高

```cpp
cv::Size size=img.size();
```

- 返回的 `Size` 中，`width` 对应列数，`height` 对应行数

### 基础图像处理

- `cvtColor`：在不同颜色空间之间转换图像

```cpp
void cv::cvtColor(cv::InputArray src,cv::OutputArray dst,int code,int dstCn=0);
```

- `src`：输入图像
- `dst`：转换后的输出图像
- `code`：转换方式，例如 `COLOR_BGR2GRAY`、`COLOR_BGR2HSV`
- `dstCn`：输出通道数，传 `0` 时由 `code` 自动决定

- `GaussianBlur`：使用高斯核平滑图像并抑制噪声

```cpp
void cv::GaussianBlur(cv::InputArray src,cv::OutputArray dst,cv::Size ksize,double sigmaX,double sigmaY=0,int borderType=cv::BORDER_DEFAULT);
```

- `src`：输入图像
- `dst`：模糊后的图像
- `ksize`：高斯核大小，宽高通常使用正奇数，例如 `(3,3)`、`(5,5)`、`(7,7)`
- `sigmaX`：X 方向高斯标准差，传 `0` 时由 `ksize` 自动计算
- `sigmaY`：Y 方向高斯标准差，传 `0` 时使用 `sigmaX`
- `borderType`：计算图像边缘时的像素补齐方式，通常使用 `BORDER_DEFAULT`

- `Canny`：检测灰度变化明显的边缘并输出二值边缘图

```cpp
void cv::Canny(cv::InputArray image,cv::OutputArray edges,double threshold1,double threshold2,int apertureSize=3,bool L2gradient=false);
```

- `image`：输入图像，通常先灰度化和模糊
- `edges`：输出的单通道二值边缘图
- `threshold1`：低阈值，低于该值的梯度通常被舍弃
- `threshold2`：高阈值，高于该值的梯度被视为强边缘
- `apertureSize`：Sobel 算子的孔径大小，通常为 `3`
- `L2gradient`：是否使用更精确的 L2 梯度计算，默认使用较快的 L1 近似

- `getStructuringElement`：创建膨胀和腐蚀使用的结构元素

```cpp
cv::Mat cv::getStructuringElement(int shape,cv::Size ksize,cv::Point anchor=cv::Point(-1,-1));
```

- `shape`：核形状，常用 `MORPH_RECT`、`MORPH_CROSS`、`MORPH_ELLIPSE`
- `ksize`：核的宽和高，`Size(1,1)` 基本不会改变图像，常用 `Size(3,3)` 或 `Size(5,5)`
- `anchor`：锚点位置，`Point(-1,-1)` 表示使用核中心

- `dilate`：扩大二值图中的白色区域

```cpp
void cv::dilate(cv::InputArray src,cv::OutputArray dst,cv::InputArray kernel,cv::Point anchor=cv::Point(-1,-1),int iterations=1,int borderType=cv::BORDER_CONSTANT,const cv::Scalar& borderValue=cv::morphologyDefaultBorderValue());
```

- `src`：输入图像
- `dst`：膨胀结果
- `kernel`：结构元素
- `anchor`：核的锚点，默认使用中心
- `iterations`：膨胀次数，次数越多白色区域扩张越明显
- `borderType`：图像边界的像素扩展方式
- `borderValue`：固定边界模式使用的填充值
- 常用于连接断裂边缘和填补小空隙

- `erode`：缩小二值图中的白色区域

```cpp
void cv::erode(cv::InputArray src,cv::OutputArray dst,cv::InputArray kernel,cv::Point anchor=cv::Point(-1,-1),int iterations=1,int borderType=cv::BORDER_CONSTANT,const cv::Scalar& borderValue=cv::morphologyDefaultBorderValue());
```

- `src`：输入图像
- `dst`：腐蚀结果
- `kernel`：结构元素
- `iterations`：腐蚀次数，次数越多白色区域缩小越明显
- `borderType`：图像边界的像素扩展方式
- `borderValue`：固定边界模式使用的填充值
- 常用于去除小白点和分离粘连区域

- `resize`：把图像缩放到指定大小或指定比例

```cpp
void cv::resize(cv::InputArray src,cv::OutputArray dst,cv::Size dsize,double fx=0,double fy=0,int interpolation=cv::INTER_LINEAR);
```

- `src`：输入图像
- `dst`：缩放后的图像
- `dsize`：目标尺寸，传空 `Size()` 时由 `fx`、`fy` 计算
- `fx`：水平方向缩放倍率
- `fy`：垂直方向缩放倍率
- `interpolation`：插值方式，缩小时常用 `INTER_AREA`，放大时常用 `INTER_LINEAR` 或 `INTER_CUBIC`

### ROI、复制与绘图

- `Mat::operator()(Rect)`：创建指定矩形区域的 ROI 视图

```cpp
cv::Mat roi=img(cv::Rect(x,y,width,height));
```

- `x`、`y`：ROI 左上角坐标
- `width`、`height`：ROI 宽度和高度
- 返回的 `Mat` 默认与原图共享像素数据，修改 ROI 会影响原图对应区域
- ROI 必须完整位于图像范围内，否则会触发断言错误

- `Mat::clone`：复制一份独立的图像数据

```cpp
cv::Mat copy=roi.clone();
```

- 返回值：与原图内容相同但拥有独立存储空间的新 `Mat`
- 当裁剪结果需要长期保存、单独修改或原图即将释放时使用

- `circle`：在图像上绘制圆或实心圆

```cpp
void cv::circle(cv::InputOutputArray img,cv::Point center,int radius,const cv::Scalar& color,int thickness=1,int lineType=cv::LINE_8,int shift=0);
```

- `img`：被绘制的图像
- `center`：圆心坐标
- `radius`：半径
- `color`：BGR 颜色
- `thickness`：线宽，传 `FILLED` 或负数表示填充
- `lineType`：线型，`LINE_AA` 可以获得抗锯齿效果

- `rectangle`：在图像上绘制矩形

```cpp
void cv::rectangle(cv::InputOutputArray img,cv::Point pt1,cv::Point pt2,const cv::Scalar& color,int thickness=1,int lineType=cv::LINE_8,int shift=0);
```

- `pt1`：矩形左上角
- `pt2`：矩形右下角
- `color`：BGR 颜色
- `thickness`：线宽，传 `FILLED` 表示填充矩形
- 也可以直接把 `Rect` 作为矩形参数

- `line`：在两个点之间绘制线段

```cpp
void cv::line(cv::InputOutputArray img,cv::Point pt1,cv::Point pt2,const cv::Scalar& color,int thickness=1,int lineType=cv::LINE_8,int shift=0);
```

- `pt1`、`pt2`：线段起点和终点
- `color`：BGR 颜色
- `thickness`：线宽
- `lineType`：线型

- `putText`：把英文、数字和 OpenCV Hershey 字体字符绘制到图像上

```cpp
void cv::putText(cv::InputOutputArray img,const cv::String& text,cv::Point org,int fontFace,double fontScale,cv::Scalar color,int thickness=1,int lineType=cv::LINE_8,bool bottomLeftOrigin=false);
```

- `text`：要绘制的字符串
- `org`：文本基线左下角坐标
- `fontFace`：字体，例如 `FONT_HERSHEY_PLAIN`、`FONT_HERSHEY_DUPLEX`
- `fontScale`：字体缩放比例
- `color`：BGR 颜色
- `thickness`：笔画宽度
- 默认 `putText` 不直接支持中文字体

### 透视变换

- `getPerspectiveTransform`：根据四组对应点计算 `3×3` 透视变换矩阵

```cpp
cv::Mat cv::getPerspectiveTransform(const cv::Point2f src[],const cv::Point2f dst[],int solveMethod=cv::DECOMP_LU);
```

- `src`：原图中的四个点
- `dst`：目标图中的四个对应点
- `solveMethod`：求解线性方程组的方法，通常使用默认值
- 四个源点和目标点必须顺序对应
- 用户当前代码使用 `Point2f[4]` 静态数组，接口类型必须匹配 `Point2f`

- `warpPerspective`：根据透视矩阵把整张图像映射到新视角

```cpp
void cv::warpPerspective(cv::InputArray src,cv::OutputArray dst,cv::InputArray M,cv::Size dsize,int flags=cv::INTER_LINEAR,int borderMode=cv::BORDER_CONSTANT,const cv::Scalar& borderValue=cv::Scalar());
```

- `src`：输入图像
- `dst`：透视变换后的输出图像
- `M`：`3×3` 透视矩阵
- `dsize`：输出图像尺寸
- `flags`：插值方式，默认使用双线性插值
- `borderMode`：映射到原图范围外时的边界处理方式
- `borderValue`：使用固定边界时的填充值，默认是黑色

### HSV、掩膜与交互控件

- `inRange`：判断每个像素的所有通道是否位于指定上下界之间

```cpp
void cv::inRange(cv::InputArray src,cv::InputArray lowerb,cv::InputArray upperb,cv::OutputArray dst);
```

- `src`：输入图像，颜色检测时通常使用 HSV 图
- `lowerb`：每个通道的下界
- `upperb`：每个通道的上界
- `dst`：单通道二值 mask，符合全部范围条件时为 `255`，否则为 `0`

- `namedWindow`：创建一个用于显示图像或放置 trackbar 的窗口

```cpp
void cv::namedWindow(const cv::String& winname,int flags=cv::WINDOW_AUTOSIZE);
```

- `winname`：窗口名称
- `flags`：窗口模式，`WINDOW_AUTOSIZE` 自动匹配图像大小，`WINDOW_NORMAL` 允许调整窗口尺寸
- `(640,200)` 在 C++ 中是逗号表达式，不是窗口尺寸

- `resizeWindow`：设置 `WINDOW_NORMAL` 窗口的大小

```cpp
void cv::resizeWindow(const cv::String& winname,int width,int height);
```

- `winname`：已经创建的窗口名称
- `width`、`height`：目标窗口宽度和高度

- `createTrackbar`：在窗口中创建滑动条并绑定整数值

```cpp
int cv::createTrackbar(const cv::String& trackbarname,const cv::String& winname,int* value,int count,cv::TrackbarCallback onChange=0,void* userdata=0);
```

- `trackbarname`：滑动条名称
- `winname`：滑动条所在窗口
- `value`：与滑动条绑定的整数变量地址
- `count`：滑动条最大值，最小值默认为 `0`
- `onChange`：数值变化时调用的回调函数，传 `0` 表示不使用回调
- `userdata`：传给回调函数的自定义数据
- 当前代码没有使用回调，而是在循环中不断读取被 trackbar 更新的变量

### 轮廓与形状分析

- `findContours`：从二值图中提取轮廓点集合

```cpp
void cv::findContours(cv::InputArray image,cv::OutputArrayOfArrays contours,cv::OutputArray hierarchy,int mode,int method,cv::Point offset=cv::Point());
```

- `image`：输入二值图，通常由阈值、`inRange` 或 `Canny` 得到
- `contours`：输出轮廓集合，每个轮廓都是一个 `vector<Point>`
- `hierarchy`：输出轮廓层级，每项记录相邻、子轮廓和父轮廓索引
- `mode`：轮廓检索方式，`RETR_EXTERNAL` 只保留最外层轮廓
- `method`：点保存方式，`CHAIN_APPROX_SIMPLE` 会压缩共线点
- `offset`：给所有轮廓点增加的坐标偏移量

- `drawContours`：把一个或多个轮廓绘制到图像上

```cpp
void cv::drawContours(cv::InputOutputArray image,cv::InputArrayOfArrays contours,int contourIdx,const cv::Scalar& color,int thickness=1,int lineType=cv::LINE_8,cv::InputArray hierarchy=cv::noArray(),int maxLevel=INT_MAX,cv::Point offset=cv::Point());
```

- `image`：被绘制的图像
- `contours`：轮廓集合
- `contourIdx`：需要绘制的轮廓索引，传 `-1` 表示绘制全部
- `color`：BGR 颜色
- `thickness`：线宽，传负数可以填充轮廓内部
- `hierarchy`、`maxLevel`：控制按层级绘制的范围

- `contourArea`：计算轮廓围成的几何面积

```cpp
double cv::contourArea(cv::InputArray contour,bool oriented=false);
```

- `contour`：轮廓点集合
- `oriented`：传 `false` 返回绝对面积，传 `true` 返回带方向符号的面积
- 内部根据轮廓点形成的闭合多边形计算面积，不等同于简单统计白色像素数量

- `arcLength`：计算曲线长度或闭合轮廓周长

```cpp
double cv::arcLength(cv::InputArray curve,bool closed);
```

- `curve`：输入点集
- `closed`：传 `true` 时把最后一个点和第一个点连接，按闭合轮廓计算
- 返回值：曲线长度

- `approxPolyDP`：使用 Douglas-Peucker 算法减少轮廓点并得到多边形近似

```cpp
void cv::approxPolyDP(cv::InputArray curve,cv::OutputArray approxCurve,double epsilon,bool closed);
```

- `curve`：原始轮廓
- `approxCurve`：近似后的点集
- `epsilon`：允许的最大近似误差，常写成轮廓周长的某个比例，例如 `0.02*peri`
- `closed`：是否把曲线视为闭合轮廓
- `epsilon` 越大，近似越粗，保留的顶点通常越少

- `boundingRect`：计算能够包围点集或非零像素的最小水平外接矩形

```cpp
cv::Rect cv::boundingRect(cv::InputArray array);
```

- `array`：二维点集或单通道非零像素图
- 返回值：`Rect(x,y,width,height)`
- 水平外接矩形不会随物体角度旋转

- `Rect::tl` 和 `Rect::br`：获取矩形左上角和右下角

```cpp
cv::Point topLeft=rect.tl();
cv::Point bottomRight=rect.br();
```

- `tl()` 返回 `(x,y)`
- `br()` 返回 `(x+width,y+height)`
- 常与 `rectangle` 配合绘制检测框

### 级联检测与图片保存

- `CascadeClassifier::load`：从 XML 文件加载 Haar 或 LBP 级联分类器

```cpp
bool cv::CascadeClassifier::load(const cv::String& filename);
```

- `filename`：分类器 XML 文件路径
- 返回值：加载成功返回 `true`，失败返回 `false`
- 分类器加载失败时不能继续调用检测逻辑

- `CascadeClassifier::detectMultiScale`：在多个缩放尺度上检测目标

```cpp
void cv::CascadeClassifier::detectMultiScale(cv::InputArray image,std::vector<cv::Rect>& objects,double scaleFactor=1.1,int minNeighbors=3,int flags=0,cv::Size minSize=cv::Size(),cv::Size maxSize=cv::Size());
```

- `image`：输入图像
- `objects`：输出检测框集合
- `scaleFactor`：相邻尺度之间的缩放比例，越接近 `1.0` 搜索越细但速度越慢
- `minNeighbors`：候选框需要获得的邻近支持数量，越大越严格，误检通常越少
- `flags`：旧版兼容参数，通常传 `0`
- `minSize`：允许检测的最小目标尺寸
- `maxSize`：允许检测的最大目标尺寸

- `imwrite`：把图像编码并保存到磁盘

```cpp
bool cv::imwrite(const cv::String& filename,cv::InputArray img,const std::vector<int>& params=std::vector<int>());
```

- `filename`：输出路径，文件扩展名决定编码格式
- `img`：需要保存的图像
- `params`：可选编码参数，例如 JPEG 质量或 PNG 压缩级别
- 返回值：保存成功返回 `true`，失败返回 `false`
- 连续视频帧使用相同文件名时会不断覆盖旧图片

## API Map

| 任务 | 主要 API | 输出 |
|---|---|---|
| 读取图片 | `imread` | `Mat` |
| 读取视频/摄像头 | `VideoCapture`、`read` | 连续图像帧 |
| 颜色空间转换 | `cvtColor` | 灰度图或 HSV 图 |
| 平滑去噪 | `GaussianBlur` | 模糊图 |
| 边缘检测 | `Canny` | 二值边缘图 |
| 形态学处理 | `dilate`、`erode` | 修整后的二值图 |
| 颜色范围筛选 | `inRange` | mask |
| 查找轮廓 | `findContours` | `vector<vector<Point>>` |
| 轮廓分析 | `contourArea`、`arcLength`、`approxPolyDP` | 面积、周长、近似多边形 |
| 定位区域 | `boundingRect`、ROI | 检测框或裁剪图 |
| 透视矫正 | `getPerspectiveTransform`、`warpPerspective` | 拉正后的图像 |
| 传统目标检测 | `CascadeClassifier`、`detectMultiScale` | `vector<Rect>` |

## Stage Summary

- 使用 `Mat` 表示图像，读取和显示图片、视频与摄像头画面
- 使用灰度、模糊、Canny、膨胀和腐蚀进行基础预处理
- 使用 HSV、`inRange` 和 trackbar 交互式寻找颜色阈值
- 使用轮廓面积、周长、多边形近似和外接矩形分析形状
- 使用四点透视变换完成卡片和文档矫正
- 使用 Haar 级联分类器完成人脸或车牌区域检测
- 使用 ROI 裁剪目标区域
- 将多个基础 API 组合成虚拟画板、文档扫描器和车牌检测项目
