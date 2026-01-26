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

  // 요청 헤더 복사 (Host, CF 관련 헤더 제외)
  const headers = new Headers()
  for (const [key, value] of context.request.headers.entries()) {
    if (
      !key.toLowerCase().startsWith('cf-') &&
      key.toLowerCase() !== 'host' &&
      key.toLowerCase() !== 'x-forwarded-proto'
    ) {
      headers.set(key, value)
    }
  }

  try {
    // body 처리: GET/HEAD가 아닌 경우 body 읽어서 전달
    let body: string | null = null
    if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
      body = await context.request.text()
    }

    const response = await fetch(targetUrl, {
      method: context.request.method,
      headers,
      body,
    })

    // 응답 헤더 복사
    const responseHeaders = new Headers()
    for (const [key, value] of response.headers.entries()) {
      responseHeaders.set(key, value)
    }

    // 응답 body 읽기
    const responseBody = await response.text()

    return new Response(responseBody, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    // 디버깅용 상세 에러
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({
        error: 'Proxy error',
        message: errorMessage,
        targetUrl,
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
