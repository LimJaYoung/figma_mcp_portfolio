# 프로젝트 버전 히스토리

## v1.0.0 - 2024-09-17 (초기 버전)
- Figma 플러그인 프로젝트 초기 설정
- Next.js 기반 웹 애플리케이션
- HTML, CSS, JavaScript 기본 구조

### 파일 구조:
- `app/` - Next.js 앱 디렉토리
- `jy_test_1차코딩/` - 테스트 코드
- `index.html` - 메인 HTML 파일
- `script.js` - 메인 JavaScript 파일
- `style.css` - 메인 스타일시트

## v2.0.0 - 2024-09-23 (완전한 애니메이션 시스템)
- **SVG 라인 애니메이션 완성**
  - `vis_line1.svg`: 페이지 로드 시 자동 그리기 애니메이션
  - `vis_line2.svg`, `vis_line3.svg`: 스크롤 기반 순차적 라인 그리기
  - `ab_line1.svg`, `ab_line2.svg`, `ab_line3.svg`: 양방향 스크롤 라인 애니메이션
  - GSAP ScrollTrigger를 활용한 부드러운 라인 드로잉 효과

- **글자 점프 애니메이션 시스템**
  - `.title-text`, `.ab-me-text`, `.project-title`, `.contact-title` 낱글자 애니메이션
  - ScrollTrigger.create()를 사용한 무한 반복 가능한 애니메이션
  - 되감기 없이 스크롤 진입 시에만 실행되는 안정적인 시스템
  - back.out(1.7) easing으로 자연스러운 점프 효과

- **비주얼 텍스트 애니메이션**
  - `.visual-des` 3줄 슬라이드업 애니메이션 (페이지 로드)
  - 순차적 라인별 나타남 효과

- **기술적 개선사항**
  - CSS stroke-dasharray/stroke-dashoffset를 활용한 SVG 애니메이션
  - GSAP fromTo() 및 ScrollTrigger.create() 조합으로 완벽한 반복 애니메이션
  - 폰트 로딩 대기 후 애니메이션 실행으로 안정성 향상

### 다음 버전 계획:
- GitHub을 통한 정식 버전 관리 시스템 도입
- 커밋 히스토리를 통한 체계적인 개발 과정 기록

