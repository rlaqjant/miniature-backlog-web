# PaintLater 디자인 가이드

## 1. 디자인 철학

PaintLater는 **자연주의적 프리미엄** 디자인을 추구합니다. 미니어처 도색이라는 창작 활동의 따뜻하고 수공예적인 본질을 반영하며, 사용자가 편안하고 집중된 환경에서 백로그를 관리할 수 있도록 합니다.

### 핵심 가치
- **자연스러움**: 유기적인 색상과 부드러운 곡선
- **고급스러움**: 넓은 여백과 세련된 타이포그래피
- **따뜻함**: 웜톤 팔레트로 친근하고 편안한 느낌
- **집중**: 미니멀한 UI로 콘텐츠에 집중

---

## 2. 색상 시스템

### 2.1 프라이머리 팔레트

| 이름 | HEX | RGB | 용도 |
|------|-----|-----|------|
| Forest Deep | `#2d3f2e` | 45, 63, 46 | 주요 배경, 헤더 |
| Forest | `#3d5f3f` | 61, 95, 63 | 버튼, 강조 |
| Forest Light | `#5a7f5c` | 90, 127, 92 | 호버 상태 |
| Sage | `#8fa88e` | 143, 168, 142 | 보조 텍스트 |

### 2.2 뉴트럴 팔레트

| 이름 | HEX | RGB | 용도 |
|------|-----|-----|------|
| Cream | `#faf8f5` | 250, 248, 245 | 페이지 배경 |
| Cream Dark | `#f0ebe4` | 240, 235, 228 | 카드 배경 |
| Warm Gray | `#e5ddd3` | 229, 221, 211 | 테두리 |
| Stone | `#9a928a` | 154, 146, 138 | 비활성 텍스트 |
| Charcoal | `#3d3832` | 61, 56, 50 | 본문 텍스트 |
| Dark | `#1f1c18` | 31, 28, 24 | 제목 텍스트 |

### 2.3 액센트 팔레트

| 이름 | HEX | RGB | 용도 |
|------|-----|-----|------|
| Gold | `#c9a962` | 201, 169, 98 | 하이라이트, 배지 |
| Gold Dark | `#a8893f` | 168, 137, 63 | 호버 상태 |
| Terracotta | `#c17f59` | 193, 127, 89 | 경고, 진행 중 |
| Amber | `#e6a23c` | 230, 162, 60 | 알림 |

### 2.4 시맨틱 팔레트

| 이름 | HEX | 용도 |
|------|-----|------|
| Success | `#5a7f5c` | 완료 상태 |
| Warning | `#c17f59` | 경고 상태 |
| Error | `#c75f5f` | 에러 상태 |
| Info | `#5f8fa8` | 정보 표시 |

### 2.5 다크 모드

| 이름 | HEX | 용도 |
|------|-----|------|
| Dark BG | `#1a1814` | 페이지 배경 |
| Dark Card | `#252219` | 카드 배경 |
| Dark Border | `#3d3832` | 테두리 |
| Dark Text | `#e5ddd3` | 본문 텍스트 |

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

```css
/* 헤드라인 - 세리프 */
--font-display: 'Playfair Display', 'Noto Serif KR', Georgia, serif;

/* 본문 - 산세리프 */
--font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

/* 코드/숫자 - 모노스페이스 */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### 3.2 타입 스케일

| 이름 | 크기 | 행간 | 용도 |
|------|------|------|------|
| Display | 48px / 3rem | 1.1 | 히어로 제목 |
| H1 | 36px / 2.25rem | 1.2 | 페이지 제목 |
| H2 | 28px / 1.75rem | 1.3 | 섹션 제목 |
| H3 | 22px / 1.375rem | 1.4 | 카드 제목 |
| H4 | 18px / 1.125rem | 1.4 | 소제목 |
| Body | 16px / 1rem | 1.6 | 본문 |
| Small | 14px / 0.875rem | 1.5 | 보조 텍스트 |
| Caption | 12px / 0.75rem | 1.4 | 캡션, 레이블 |

### 3.3 폰트 굵기

| 이름 | 값 | 용도 |
|------|-----|------|
| Regular | 400 | 본문 |
| Medium | 500 | 강조 텍스트 |
| Semibold | 600 | 버튼, 레이블 |
| Bold | 700 | 제목 |

---

## 4. 간격 시스템

8px 기반 간격 시스템을 사용합니다.

| 토큰 | 값 | 용도 |
|------|-----|------|
| xs | 4px | 아이콘 간격 |
| sm | 8px | 컴팩트 간격 |
| md | 16px | 기본 간격 |
| lg | 24px | 섹션 내부 |
| xl | 32px | 섹션 간 |
| 2xl | 48px | 큰 섹션 간 |
| 3xl | 64px | 페이지 섹션 |
| 4xl | 96px | 히어로 섹션 |

---

## 5. 컴포넌트 스타일

### 5.1 버튼

```
기본 스타일:
- 라운딩: 8px (rounded-lg)
- 패딩: 12px 24px
- 폰트: 16px, semibold
- 트랜지션: 200ms ease

Primary:
- 배경: Forest (#3d5f3f)
- 텍스트: Cream (#faf8f5)
- 호버: Forest Light (#5a7f5c)
- 액티브: Forest Deep (#2d3f2e)

Secondary:
- 배경: transparent
- 테두리: 2px Warm Gray
- 텍스트: Charcoal
- 호버: Cream Dark 배경

Ghost:
- 배경: transparent
- 텍스트: Forest
- 호버: Cream Dark 배경

Accent:
- 배경: Gold (#c9a962)
- 텍스트: Dark (#1f1c18)
- 호버: Gold Dark (#a8893f)
```

### 5.2 카드

```
기본 스타일:
- 배경: Cream Dark (#f0ebe4)
- 테두리: 1px Warm Gray (#e5ddd3)
- 라운딩: 16px (rounded-2xl)
- 그림자: 0 1px 3px rgba(61, 56, 50, 0.05)
- 패딩: 24px

호버 시:
- 그림자: 0 4px 12px rgba(61, 56, 50, 0.08)
- 트랜지션: 300ms ease
```

### 5.3 인풋

```
기본 스타일:
- 배경: white
- 테두리: 1px Warm Gray
- 라운딩: 8px
- 패딩: 12px 16px
- 폰트: 16px

포커스:
- 테두리: 2px Forest
- 아웃라인: none
- 박스 섀도우: 0 0 0 3px rgba(61, 95, 63, 0.1)

에러:
- 테두리: 2px Error (#c75f5f)
- 박스 섀도우: 0 0 0 3px rgba(199, 95, 95, 0.1)
```

### 5.4 배지

```
기본 스타일:
- 라운딩: 6px
- 패딩: 4px 10px
- 폰트: 12px, medium

변형:
- 시작 전: Stone 배경, Charcoal 텍스트
- 진행 중: Gold/20% 배경, Gold Dark 텍스트
- 완료: Forest/10% 배경, Forest 텍스트
```

### 5.5 진행률 바

```
배경: Warm Gray (#e5ddd3)
라운딩: 999px (pill)
높이: 8px

진행률 색상:
- 0-30%: Terracotta (#c17f59)
- 31-70%: Gold (#c9a962)
- 71-99%: Forest Light (#5a7f5c)
- 100%: Forest (#3d5f3f)
```

---

## 6. 레이아웃

### 6.1 컨테이너

```
최대 너비: 1280px
패딩: 좌우 24px (모바일: 16px)
```

### 6.2 그리드

```
기본 그리드: 12컬럼
거터: 24px (모바일: 16px)

카드 그리드:
- 모바일: 1컬럼
- 태블릿 (768px): 2컬럼
- 데스크탑 (1024px): 3컬럼
- 와이드 (1280px): 4컬럼
```

### 6.3 헤더

```
높이: 72px
배경: 반투명 Forest Deep + backdrop-blur
위치: sticky top-0
z-index: 50
```

### 6.4 푸터

```
배경: Forest Deep (#2d3f2e)
텍스트: Sage (#8fa88e)
패딩: 48px 0
```

---

## 7. 애니메이션

### 7.1 트랜지션

```css
/* 기본 */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;

/* 스프링 */
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 7.2 호버 효과

```
카드:
- transform: translateY(-2px)
- box-shadow 증가

버튼:
- 밝기 변화
- scale(1.02) 선택적

링크:
- 밑줄 애니메이션
```

---

## 8. 아이콘

### 8.1 아이콘 스타일

- 스타일: Outline (기본), Solid (강조)
- 크기: 16px, 20px, 24px
- 색상: 텍스트 색상 상속 또는 Forest 계열

### 8.2 권장 아이콘 세트

- Heroicons (Tailwind 공식)
- Lucide Icons

---

## 9. 반응형 브레이크포인트

| 이름 | 값 | 설명 |
|------|-----|------|
| sm | 640px | 모바일 가로 |
| md | 768px | 태블릿 |
| lg | 1024px | 데스크탑 |
| xl | 1280px | 와이드 |
| 2xl | 1536px | 울트라와이드 |

---

## 10. 접근성

### 10.1 색상 대비

- 텍스트와 배경 대비: 최소 4.5:1 (AA)
- 대형 텍스트: 최소 3:1
- UI 컴포넌트: 최소 3:1

### 10.2 포커스 상태

모든 인터랙티브 요소에 명확한 포커스 링 제공:
```css
:focus-visible {
  outline: 2px solid #3d5f3f;
  outline-offset: 2px;
}
```

### 10.3 터치 타겟

- 최소 터치 영역: 44px × 44px
- 버튼 간 최소 간격: 8px

---

## 11. Tailwind CSS 커스텀 설정

```javascript
// tailwind.config.js 또는 CSS 변수
theme: {
  extend: {
    colors: {
      forest: {
        50: '#f3f6f3',
        100: '#e2ebe2',
        200: '#c5d8c6',
        300: '#9bb99d',
        400: '#6d966f',
        500: '#3d5f3f',  // Primary
        600: '#2d3f2e',  // Deep
        700: '#243225',
        800: '#1e281f',
        900: '#18201a',
      },
      cream: {
        50: '#faf8f5',   // Background
        100: '#f0ebe4',  // Card
        200: '#e5ddd3',  // Border
        300: '#d4c8b8',
        400: '#bba98f',
      },
      gold: {
        400: '#d4b872',
        500: '#c9a962',  // Primary
        600: '#a8893f',  // Hover
      },
      terracotta: {
        500: '#c17f59',
      }
    },
    fontFamily: {
      display: ['Playfair Display', 'Noto Serif KR', 'Georgia', 'serif'],
      body: ['Pretendard', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      'xl': '12px',
      '2xl': '16px',
      '3xl': '24px',
    }
  }
}
```

---

## 12. 컴포넌트 예시

### 12.1 히어로 섹션

```jsx
<section className="bg-forest-600 text-cream-50 py-24">
  <div className="container mx-auto px-6">
    <h1 className="font-display text-5xl font-bold mb-6">
      당신의 미니어처 여정을<br />기록하세요.
    </h1>
    <p className="text-cream-200 text-lg mb-8 max-w-xl">
      도색 백로그를 체계적으로 관리하고,
      완성의 기쁨을 기록하세요.
    </p>
    <button className="bg-gold-500 text-forest-600 px-8 py-3 rounded-lg font-semibold">
      시작하기
    </button>
  </div>
</section>
```

### 12.2 미니어처 카드

```jsx
<article className="bg-cream-100 border border-cream-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
  <div className="flex justify-between items-start mb-4">
    <h3 className="font-display text-xl text-dark">
      스페이스 마린 인터세서
    </h3>
    <span className="bg-gold-500/20 text-gold-600 text-xs px-2.5 py-1 rounded">
      진행 중
    </span>
  </div>

  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-stone">진행률</span>
      <span className="text-charcoal font-medium">65%</span>
    </div>
    <div className="h-2 bg-cream-200 rounded-full">
      <div className="h-full bg-gold-500 rounded-full" style={{width: '65%'}} />
    </div>
  </div>

  <p className="text-stone text-sm">
    2024년 1월 15일 수정
  </p>
</article>
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0 | 2024-01-24 | 초기 디자인 가이드 작성 |
