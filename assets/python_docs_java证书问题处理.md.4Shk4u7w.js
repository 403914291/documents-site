import{_ as s,c as n,o as e,ag as t}from"./chunks/framework.B0bJk-gD.js";const _=JSON.parse('{"title":"java 相关证书问题处理","description":"","frontmatter":{},"headers":[],"relativePath":"python_docs/java证书问题处理.md","filePath":"python_docs/java证书问题处理.md"}'),p={name:"python_docs/java证书问题处理.md"};function i(l,a,o,c,r,d){return e(),n("div",null,[...a[0]||(a[0]=[t(`<h1 id="java-相关证书问题处理" tabindex="-1">java 相关证书问题处理 <a class="header-anchor" href="#java-相关证书问题处理" aria-label="Permalink to &quot;java 相关证书问题处理&quot;">​</a></h1><h2 id="javax-net-ssl-sslhandshakeexception" tabindex="-1">javax.net.ssl.SSLHandshakeException <a class="header-anchor" href="#javax-net-ssl-sslhandshakeexception" aria-label="Permalink to &quot;javax.net.ssl.SSLHandshakeException&quot;">​</a></h2><h3 id="问题描述及报错信息" tabindex="-1">问题描述及报错信息 <a class="header-anchor" href="#问题描述及报错信息" aria-label="Permalink to &quot;问题描述及报错信息&quot;">​</a></h3><p>通过微信扫码登录时微信无法回调系统提供地址，后台报错信息为：</p><p>javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorEx ception: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested ta rge</p><h3 id="问题分析" tabindex="-1">问题分析 <a class="header-anchor" href="#问题分析" aria-label="Permalink to &quot;问题分析&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>微信服务器证书更新：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果微信更换了 SSL 证书颁发机构（CA）或中间证书（例如从旧的根证书切换到 Let&#39;s Encrypt 等新 CA），而 JDK 1.7.0_80 的默认信任库（cacerts）未包含这些新证书，就会触发 PKIX path building failed 错误。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例如：Let&#39;s Encrypt 的根证书 ISRG Root X1 在较新的 Java 版本（如 JDK 8u101+）中才被默认信任，旧版本需手动导入。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>中间证书过期或变更：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果微信的 SSL 证书链中某个中间证书过期或被替换，旧版 Java 可能无法自动识别。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Java 7 的根证书库过时：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>JDK 1.7.0_80 发布于 2015 年，其默认信任库中的根证书已严重过时，无法兼容近年新颁发的证</span></span></code></pre></div>`,7)])])}const u=s(p,[["render",i]]);export{_ as __pageData,u as default};
