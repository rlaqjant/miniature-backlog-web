/**
 * Cloudflare Pages Functions - API 프록시
 * 모든 /api/* 요청을 백엔드로 프록시하여 크로스 도메인 쿠키 문제 해결
 */

interface Env {
  BACKEND_URL: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url)

  // 환경 변수에서 백엔드 URL 가져오기 (기본값: Render 배포 URL)
  const backendUrl = context.env.BACKEND_URL || 'https://miniature-backlog-api.onrender.com'

  // /api/xxx → backendUrl/xxx
  const targetPath = url.pathname.replace(/^\/api/, '')
  const targetUrl = `${backendUrl}${targetPath}${url.search}`

  // 요청 헤더 복사 (Host 제외)
  const headers = new Headers(context.request.headers)
  headers.delete('host')

  try {
    const response = await fetch(targetUrl, {
      method: context.request.method,
      headers,
      body: context.request.method !== 'GET' && context.request.method !== 'HEAD'
        ? context.request.body
        : undefined,
    })

    // 응답 헤더 복사
    const responseHeaders = new Headers(response.headers)

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
