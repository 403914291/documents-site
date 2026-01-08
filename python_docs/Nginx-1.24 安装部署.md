# Nginx-1.24 安装部署

1、安装PCRE库

https://mirrors.aliyun.com/exim/pcre/载最新的 PCRE 源码包，使用下面命令下载编译和安装 PCRE 包：

```bash
cd /usr/local/src
tar -zxvf pcre-8.34.tar.gz
cd pcre-8.34
./configure
make
make install
```

2、安装zlib库

```bash
cd /usr/local/src

wget http://zlib.net/zlib-1.2.8.tar.gz
tar -zxvf zlib-1.2.8.tar.gz
cd zlib-1.2.8
./configure
make
make install
```

3、安装ssl（某些vps默认没装ssl)

```bash
cd /usr/local/src
wget http://www.openssl.org/source/openssl-1.0.1c.tar.gz
tar -zxvf openssl-1.0.1c.tar.gz
```

4、安装Nginx

Nginx 一般有两个版本，分别是稳定版和开发版，您可以根据您的目的来选择这两个版本的其中一个，下面是把 Nginx 安装到 /usr/local/nginx 目录下的详细步骤：

```base
cd /usr/local/src
wget http://nginx.org/download/nginx-1.4.2.tar.gz
tar -zxvf nginx-1.4.2.tar.gz
cd nginx-1.4.2
# 指定解压目录
# tar -xzvf 文件名.tar.gz -C /目标/目录

./configure --sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--with-http_ssl_module \
--with-pcre=/usr/local/src/pcre-8.34 \
--with-zlib=/usr/local/src/zlib-1.3.1 \
--with-openssl=/usr/local/src/openssl-1.0.1c

make
make install
```

安装成功后 /usr/local/nginx 目录下如下

```tex
fastcgi.conf            koi-win             nginx.conf.default
fastcgi.conf.default    logs                scgi_params
fastcgi_params          mime.types          scgi_params.default
fastcgi_params.default  mime.types.default  uwsgi_params
html                    nginx               uwsgi_params.default
koi-utf                 nginx.conf          win-utf
```

5、启动

确保系统的 80 端口没被其他程序占用，运行/usr/local/nginx/nginx 命令来启动 Nginx，

```bash
netstat -ano|grep 80
```

如果查不到结果后执行以下命令，有结果则忽略此步骤（ubuntu下必须用sudo启动，不然只能在前台运行）

```bash
sudo /usr/local/nginx/nginx
```

打开浏览器访问此机器的 IP，如果浏览器出现 Welcome to nginx! 则表示 Nginx 已经安装并运行成功。



**附：可能遇到的错误和一些帮助信息**

**1.1编译pcre错误**

```tex
libtool: compile: unrecognized option `-DHAVE_CONFIG_H'
libtool: compile: Try `libtool --help' for more information.
make[1]: *** [pcrecpp.lo] Error 1
make[1]: Leaving directory `/usr/local/src/pcre-8.34'
make: *** [all] Error 2
```

解决办法：安装g++,别忘了重新configure

```tex
apt-get install g++
apt-get install build-essential
make clean
./configure
make
```

**1.2 make出错**

```tex
make: *** No rule to make target `build', needed by `default'.  Stop.
./configure: error: SSL modules require the OpenSSL library.
You can either do not enable the modules, or install the OpenSSL library
into the system, or build the OpenSSL library statically from the source
with nginx by using --with-openssl=

```





















