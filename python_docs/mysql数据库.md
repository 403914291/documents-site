

# 					mysql备份方案

 数据库配置信息：

```
   url: jdbc:mysql://121.237.176.223:13049/llk?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8&autoReconnect=true&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
          username: qo0gph8uffrsdh7zx2fbk
          password: ZdLiu871202#_
```

## 一、数据库备份前准备

1. **迁移前准备**

   - **版本与字符集检查**：确保本地MySQL版本不低于远程版本，字符集设置一致，避免乱码和兼容性问题。

   - **权限检查**：确认远程和本地数据库用户拥有相应的导出、导入权限。

   - **业务低峰期操作**：建议在业务低峰期进行，减少对线上服务的影响。

   - **本地创建空数据库**：导入前，务必在本地先创建好目标数据库。

2. **迁移后验证**

   - **基本验证**：登录本地MySQL，检查数据库、表是否存在，抽样查询数据。

   - **数据核对**：对比关键表的记录数，或使用 `CHECKSUM TABLE` 命令校验数据一致性。

   - **应用测试**：将你的应用程序连接至本地数据库，进行完整的功能测试。

## 二、数据库备份

**步骤1：在远程服务器上备份数据库**

通过SSH连接到远程服务器，使用 `mysqldump` 命令导出数据。下面是一个完整命令示例：

```mysql
# 命令模板
mysqldump -h [远程主机地址] -P [端口，默认3306可省略] -u [用户名] -p --databases [要导出的数据库名] \
--single-transaction --triggers --routines --events > backup.sql

#正式命令
mysqldump -h 121.237.176.223 -P 13049 -u qo0gph8uffrsdh7zx2fbk -p --skip-lock-tables --single-transaction --no-tablespaces --databases llk --triggers --routines --events > backup.sql
```

**步骤2：在本地MySQL中导入数据**

```mysql
#命令模板
mysql -h localhost -u root -p [本地数据库名] < /本地/存放/路径/backup.sql

#正式命令
mysql -h localhost -u root -p llk < backup.sql
```

**注意**：在导入前，**必须先在本地MySQL中创建同名数据库**