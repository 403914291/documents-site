# java 相关证书问题处理

## javax.net.ssl.SSLHandshakeException

### 问题描述及报错信息

通过微信扫码登录时微信无法回调系统提供地址，后台报错信息为：

javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorEx
	ception: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested ta
	rge

### 问题分析

```text
微信服务器证书更新：

如果微信更换了 SSL 证书颁发机构（CA）或中间证书（例如从旧的根证书切换到 Let's Encrypt 等新 CA），而 JDK 1.7.0_80 的默认信任库（cacerts）未包含这些新证书，就会触发 PKIX path building failed 错误。

例如：Let's Encrypt 的根证书 ISRG Root X1 在较新的 Java 版本（如 JDK 8u101+）中才被默认信任，旧版本需手动导入。

中间证书过期或变更：

如果微信的 SSL 证书链中某个中间证书过期或被替换，旧版 Java 可能无法自动识别。

Java 7 的根证书库过时：

JDK 1.7.0_80 发布于 2015 年，其默认信任库中的根证书已严重过时，无法兼容近年新颁发的证
```