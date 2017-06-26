# 我使用的 Docker ！！！
1. docker 下载镜像太慢 使用下面的命令加速
	> curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://b23047cd.m.daocloud.io

2. 安装 nginx 将配置文件 和 项目文件 放到宿主机系统
	> docker run --name nginx -d -p 80:80 -v /data/docker-nginx/nginx.d:/etc/nginx/conf.d/ -v /data/docker-nginx/www/:/var/www/ nginx

3. 停掉所有的 Docker 容器 
	> docker ps -q |xargs  docker stop
	> docker ps -q |xargs docker rm
4. 修改nginx后重新 load 配置文件
	> docker exec 2892f37d26cc nginx -s reload

5. Mysql 建议指定版本方便做迁移
  > docker pull mysql:5.7
	> docker run --name db-mysql -p 3306:3306 -v /data/mysql-db/:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:5.7
