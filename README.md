#这是一个基于angularjs1.5搭建的webapp
> version 0.0.1

##本地项目搭建
```bash
git clone git@github.com:lynhao/webapp_angularjs.git my-proj
cd my-proj
```
###删除git初始化文件
```bash
rm -rf .git  # non-Windows
rd .git /S/Q # windows
```
###创建你自己的git prop
 ```
 如果你觉得些代码符合你生产需求就拿去吧，但别忘了fork一下下```
 ```
 
 ```bash
	git init
	git add .
	git commit -m "Initial commit"
 ```
> 这里默认相信你的本地已经有了node环境，没有的话请自行解决~
> > *如果没有vpn的话可以使用淘宝镜 ```npm i -g install```

###安装bower环境
```bash
npm i -g bower 
```
###在当前目录下安装配置文件
```bash
bower init 
```
- mac系统有可能遭遇权限问题，但bower却不能sudo，这样解决
```bash
bower init --allow-root
```

###安装angular1.5
```bash
bower install --save angular#1.5.8
```
>如果目录是bower__components,在gulpfile.js目录下将src/改为相对应的目录名 例如：“bower_components/**/*.js”

###安装gulp
```bash
npm i -g gulp
```
###安装node模块(查看package.json)
```bash
npm init
npm i --save-dev gulp gulp-clean gulp-concat gulp-cssmin gulp-imagemin gulp-less gulp-load-plugins gulp-plumber gulp-uglify open

```
###安装路由,cookies
```bash
bower install --save ui-router
bower install --save angular-cookies
```

###运行项目
```bash
 gulp serve
```
##截图
![screen1](https://github.com/lynhao/ImageStorage/blob/master/picture/1.png?raw=true)
![screen2](https://github.com/lynhao/ImageStorage/blob/master/picture/2.png?raw=true)
![screen3](https://github.com/lynhao/ImageStorage/blob/master/picture/3.png?raw=true)
![screen4](https://github.com/lynhao/ImageStorage/blob/master/picture/4.png?raw=true)
