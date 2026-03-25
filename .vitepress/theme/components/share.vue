<template>
  <div class="share-component">
    <div class="share-title">分享这篇文章</div>
    <div class="share-buttons">
      <!-- 微信 -->
      <button class="share-btn wechat" @click="shareToWechat" title="分享到微信">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 2C6.48 2 2 5.69 2 10.5c0 2.5 1.5 4.7 3.8 6.2-.1.5-.4 1.4-.6 1.8-.2.4.2.8.6.6.4-.2 1.4-.7 1.8-.9.3.1.7.1 1 .1.5 0 1-.1 1.4-.2.4.1.9.2 1.4.2 5.52 0 10-3.69 10-8.5S17.52 2 12 2zm0 15c-.4 0-.8-.1-1.2-.2-.3-.1-.7-.1-1 0-.5.3-1.8.9-2.2 1.1.2-.5.6-1.5.7-2.1.1-.4-.1-.8-.5-1C5.5 13.7 4 12.2 4 10.5 4 6.9 7.5 4 12 4s8 2.9 8 6.5-3.5 6.5-8 6.5z"/>
        </svg>
      </button>
      
      <!-- 微博 -->
      <button class="share-btn weibo" @click="shareToWeibo" title="分享到微博">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.098 20.323c-.781.77-2.042.77-2.823 0-.77-.781-.77-2.042 0-2.823.781-.781 2.042-.781 2.823 0 .781.781.781 2.042 0 2.823zM7.905 14.822c-1.509.386-2.454 1.69-2.114 2.91.342 1.229 1.84 1.916 3.349 1.52 1.498-.386 2.443-1.69 2.103-2.91-.342-1.229-1.84-1.915-3.338-1.52zm10.674 1.725c-.489-.77-1.605-1.101-2.497-.781-.89.311-1.218 1.197-.728 1.968.489.77 1.605 1.112 2.497.791.891-.321 1.218-1.207.728-1.978zm-1.364-3.135c-.891.311-1.218 1.197-.728 1.968.489.77 1.605 1.112 2.497.791.891-.321 1.218-1.207.728-1.978-.489-.77-1.605-1.101-2.497-.781zm4.785-1.657c-.311-1.122-1.417-1.861-2.721-1.861-.111 0-.218.01-.321.021-.074-2.591-2.549-4.668-5.668-4.668-3.162 0-5.713 2.146-5.713 4.804 0 .28.031.549.084.812-.427-.115-.88-.178-1.354-.178-2.476 0-4.482 1.755-4.482 3.921 0 1.229.666 2.32 1.702 3.073-.063.354-.105.718-.105 1.092 0 3.203 3.328 5.802 7.437 5.802 3.475 0 6.406-1.916 7.187-4.51.517.105 1.055.168 1.605.168 2.476 0 4.482-1.755 4.482-3.921 0-.749-.238-1.448-.643-2.042.437-.643.696-1.386.696-2.188 0-.427-.074-.838-.207-1.229.041-.228.063-.468.063-.718 0-1.07-.386-2.063-1.039-2.865z"/>
        </svg>
      </button>
      
      <!-- Twitter -->
      <button class="share-btn twitter" @click="shareToTwitter" title="分享到 Twitter">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      
      <!-- LinkedIn -->
      <button class="share-btn linkedin" @click="shareToLinkedIn" title="分享到 LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>
      
      <!-- 复制链接 -->
      <button class="share-btn copy" @click="copyLink" title="复制链接">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
      </button>
    </div>
    
    <!-- 微信二维码弹窗 -->
    <div v-if="showWechatQR" class="wechat-qrcode-modal" @click="showWechatQR = false">
      <div class="wechat-qrcode-content" @click.stop>
        <div class="wechat-qrcode-title">微信扫一扫分享</div>
        <div class="wechat-qrcode" ref="qrCodeRef"></div>
      </div>
    </div>
    
    <!-- 复制成功提示 -->
    <div v-if="showCopyToast" class="copy-toast">链接已复制</div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useData } from 'vitepress'

const { site, page } = useData()
const showWechatQR = ref(false)
const showCopyToast = ref(false)
const qrCodeRef = ref(null)

// 获取当前页面 URL
const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return site.value.base + page.value.relativePath
})

// 获取页面标题
const pageTitle = computed(() => {
  return page.value.title + ' - ' + site.value.title
})

// 分享到微信
const shareToWechat = async () => {
  showWechatQR.value = true
  // 等待 DOM 更新后再生成二维码
  await nextTick()
  generateQRCode()
}

// 生成微信二维码
const generateQRCode = async () => {
  if (qrCodeRef.value) {
    // 使用 QRCode 库生成二维码
    const QRCode = (await import('qrcode')).default
    qrCodeRef.value.innerHTML = ''
    QRCode.toCanvas(qrCodeRef.value, currentUrl.value, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
  }
}

// 分享到微博
const shareToWeibo = () => {
  const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl.value)}&title=${encodeURIComponent(pageTitle.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// 分享到 Twitter
const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(pageTitle.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// 分享到 LinkedIn
const shareToLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// 复制链接
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    showCopyToast.value = true
    setTimeout(() => {
      showCopyToast.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

</script>

<style src="./share.css"></style>
