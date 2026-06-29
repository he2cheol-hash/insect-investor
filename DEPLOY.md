# 배포 & 운영 연결 가이드

투자 멘탈 곤충 테스트 — Vercel 배포와 운영 도구(GA4/AdSense/카카오) 연결 절차.

---

## 0. 사전 체크 (로컬)

```bash
npm install
npm run test     # 채점 검증 7개 통과해야 함
npm run lint
npm run build    # SSG/OG 생성 성공 확인
```

> 캐릭터 원본은 `design-source/originals/`(미서빙)에 있고, 실제 사용 이미지는
> `public/characters/`입니다. 원본을 교체하면 `npm run characters`로 재가공하세요.

---

## 1. 환경변수

`.env.example` 참고. **모두 선택값**이며, 미설정 시 해당 기능만 비활성(빌드는 정상).
배포 시 Vercel 프로젝트의 **Settings → Environment Variables**에 등록합니다.

| 변수 | 용도 | 예시 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | OG·canonical·sitemap의 절대 URL. **배포 후 반드시 설정** (미설정 시 localhost로 출력됨) | `https://your-domain.com` |
| `NEXT_PUBLIC_GA_ID` | GA4 측정 ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense 퍼블리셔 ID | `ca-pub-0000000000000000` |
| `NEXT_PUBLIC_ADSENSE_SLOT_RESULT` | 결과 화면 광고 슬롯 ID | `1234567890` |
| `NEXT_PUBLIC_KAKAO_KEY` | 카카오 JavaScript 키(공유 SDK). 미설정 시 공유는 링크복사로 대체 | `xxxxxxxxxxxxxxxx` |

> 모두 `NEXT_PUBLIC_` 접두사 → 클라이언트 노출 값입니다(비밀키 아님). 변경 후 재배포 필요.

---

## 2. 배포 방법 A — Git + Vercel 대시보드 (권장)

1. 깃 저장소에 푸시 (현재 작업이 미커밋 상태이니 먼저 커밋):
   - 기본 브랜치는 `main`인데 현재 로컬은 `master`입니다. 팀 컨벤션에 맞춰 정리하세요.
2. [vercel.com](https://vercel.com) → **Add New → Project** → 저장소 임포트.
3. Framework는 **Next.js** 자동 인식. 빌드 설정 기본값 그대로.
4. **Environment Variables**에 위 1번 표의 값 입력 → **Deploy**.
5. 배포 후 발급된 URL을 `NEXT_PUBLIC_SITE_URL`에 넣고 **재배포**(OG/canonical 절대경로 확정).

## 2. 배포 방법 B — Vercel CLI

CLI 로그인은 인터랙티브이므로 이 세션 입력창에 `!` 를 붙여 직접 실행하세요:

```
! npx vercel login
! npx vercel           # 미리보기 배포
! npx vercel --prod    # 프로덕션 배포
```

환경변수는 `! npx vercel env add NEXT_PUBLIC_SITE_URL` 형태로 추가하거나 대시보드에서 설정.

---

## 3. 커스텀 도메인 (AdSense에 사실상 필수)

- Vercel **Settings → Domains**에서 도메인 연결(DNS A/CNAME 안내대로).
- 도메인 연결 후 `NEXT_PUBLIC_SITE_URL`을 해당 도메인으로 갱신 → 재배포.

---

## 4. 배포 후 검증 체크리스트

- [ ] `/`, `/test`, `/result/firefly`(8종), `/articles/*`, `/privacy`, `/terms` 정상 로드
- [ ] `/sitemap.xml`, `/robots.txt`가 **실제 도메인** URL로 출력 (localhost 아님)
- [ ] **OG 카드**: 결과 URL을 [OpenGraph 디버거](https://www.opengraph.xyz/) 또는 카카오톡 채팅창에 붙여 캐릭터 카드가 뜨는지
- [ ] **GA4**: 실시간 보고서에서 `start_click`/`result_generated`/`result_view` 이벤트 수신
- [ ] 결과 분포 로깅(8종 고르게 나오는지) — 초기 튜닝 데이터
- [ ] **AdSense**: 슬롯 자리 예약(CLS 0) 유지, 승인 후 광고 노출
- [ ] 모바일 실기기에서 전체 플로우(랜딩→테스트→결과→공유) 깨짐 없음

---

## 5. AdSense 승인 전제 (스펙 13장)

커스텀 도메인 + 양질의 콘텐츠(결과 8종 + 교육 글) + 개인정보처리방침/이용약관(완비) +
정책 준수. 무효 트래픽·인위적 클릭 유도 금지. 출시 후 2~3개월은 트래픽 축적 기간.
