import { AIKoResponse } from '../types';

export const aiKoResponses: AIKoResponse[] = [
  {
    id: 'ai-ko-1',
    type: 'ai-ko',
    title: '따릉이 이용 방법',
    userQuestion: '따릉이 어떻게 타요?',
    content: `서울시 공공자전거 '따릉이'는 전용 앱을 통해 쉽게 이용할 수 있어요. 

**이용 방법:**
1. 'SeoulBike 따릉이' 앱 다운로드
2. 회원가입 후 이용권 구매
3. 근처 대여소에서 QR코드 스캔하여 대여
4. 이용 후 아무 대여소에나 반납

**이용권 종류:**
• 1일권: 1,000원 (1시간씩 5회 이용 가능)
• 7일권: 3,000원 
• 30일권: 5,000원

단기 여행객을 위한 1일권도 있답니다. 자세한 내용은 아래 Hi-Feed 게시물을 참고해보세요!

[링크: 서울시 공공자전거 '따릉이' 이용 가이드]

※ AI 답변은 참고용이며, 정확한 정보는 공식 사이트를 확인해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.92,
    sources: ['따릉이 공식 홈페이지', 'Hi-Feed 게시물'],
    relatedContent: ['hi-feed-12'],
    createdAt: '2025-06-27T10:30:00Z',
    updatedAt: '2025-06-27T10:30:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-2',
    type: 'ai-ko',
    title: '한국 택배 발송 방법',
    userQuestion: '한국에서 택배 보내려면?',
    content: `한국에서는 보통 편의점 택배나 우체국 택배를 많이 이용해요.

**편의점 택배 (CU, GS25, 세븐일레븐):**
• 24시간 접수 가능
• 기본 요금: 3,000원~4,000원 (크기별)
• 익일 배송 가능

**우체국 택배:**
• 더 안전하고 저렴
• 기본 요금: 3,800원~
• 전국 어디든 배송

**이용 방법:**
1. 편의점 방문
2. 택배 발송 신청
3. 받는 사람 정보 작성
4. 요금 결제
5. 송장번호 받기

**포장 팁:**
• 깨지기 쉬운 물건은 뽁뽁이로 포장
• 박스 크기에 맞게 포장하면 요금 절약

두 방법의 가격과 특징은 아래 글에 잘 정리되어 있어요.

[링크: 초보자를 위한 한국 택배 발송 완벽 비교]

※ AI 답변은 참고용이며, 정확한 정보는 공식 사이트를 확인해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.89,
    sources: ['택배업체 공식 정보', '편의점 택배 가이드'],
    feedback: 'helpful',
    createdAt: '2025-06-27T11:15:00Z',
    updatedAt: '2025-06-27T11:15:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-3',
    type: 'ai-ko',
    title: 'E-7 비자 연장 서류',
    userQuestion: 'E-7 비자 연장 서류 알려줘',
    content: `E-7 비자 연장 시에는 보통 다음 서류들이 필요합니다:

**기본 서류:**
• 통합신청서
• 여권 및 외국인등록증
• 고용계약서 또는 재직증명서
• 사업자등록증 사본
• 법인등기부등본
• 납세증명서

**추가 서류 (상황에 따라):**
• 학위증명서 (최초 발급 시 제출한 경우)
• 경력증명서
• 건강보험 가입확인서

하지만 개인의 상황이나 고용 형태에 따라 추가 서류가 필요할 수 있으니, 반드시 관할 출입국사무소에 문의하거나 비자 전문 행정사와 상담하는 것을 추천드려요.

**중요한 점:**
비자 만료 4개월 전부터 연장 신청 가능하니 미리 준비하세요!

※ AI 답변은 참고용이며, 정확한 정보는 출입국사무소 또는 전문가에게 문의해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.85,
    sources: ['출입국·외국인정책본부', '비자 전문가 가이드'],
    relatedContent: ['hi-feed-6'],
    createdAt: '2025-06-27T12:00:00Z',
    updatedAt: '2025-06-27T12:00:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-4',
    type: 'ai-ko',
    title: '전문적 답변 제한',
    userQuestion: '교통사고 합의금 얼마가 적당한가요?',
    content: `죄송하지만, 저는 인공지능 챗봇으로 법률 자문이나 의료 진단과 같은 전문적인 답변은 드릴 수 없어요.

교통사고 합의금은 사고의 경중, 과실 비율, 피해 정도 등 여러 요소를 종합적으로 고려해야 하는 복잡한 문제입니다.

**전문가 상담을 권합니다:**
• HiKo의 법률 전문가 서비스 이용
• 교통사고 전문 변호사 상담
• 보험회사 손해사정사와 협의

**HiKo에서 법률 전문가 찾기:**
커뮤니티 → 정보게시판 → 법률 카테고리에서 교통사고 전문 변호사를 찾아보세요.

안전하고 정확한 해결을 위해 꼭 전문가와 상담해주세요.

※ AI는 일반적인 정보만 제공할 수 있으며, 구체적인 법률 문제는 전문가 상담이 필요합니다.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.95,
    sources: ['AI 안전 가이드라인'],
    createdAt: '2025-06-27T13:20:00Z',
    updatedAt: '2025-06-27T13:20:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-5',
    type: 'ai-ko',
    title: '한국 전압 정보',
    userQuestion: '한국 전압이 몇 볼트예요?',
    content: `네, 한국의 표준 전압은 220V, 60Hz입니다.

**한국 전력 정보:**
• 전압: 220V
• 주파수: 60Hz  
• 플러그 타입: C형, F형 (유럽형 플러그)

**외국 전자제품 사용 시:**
본국에서 가져오신 전자제품의 전압이 다르다면 변압기(어댑터)가 필요해요.

**전압별 대응:**
• 110V 제품 → 220V로 승압 변압기 필요
• 100V 제품 (일본) → 220V 변압기 필요
• 230V 제품 (유럽) → 대부분 그대로 사용 가능

**구매 장소:**
용산전자상가, 동대문 전자시장, 온라인 쇼핑몰에서 변압기를 쉽게 구할 수 있어요.

**주의사항:**
고전력 제품(드라이어, 전자레인지 등)은 변압기보다 한국용 제품 구매를 권장합니다.

※ AI 답변은 참고용이며, 전기 관련 작업은 전문가와 상담해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.98,
    sources: ['한국전력공사', '전기안전공단'],
    createdAt: '2025-06-27T14:00:00Z',
    updatedAt: '2025-06-27T14:00:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-6',
    type: 'ai-ko',
    title: '지하철역 찾기',
    userQuestion: '가장 가까운 지하철역 어떻게 찾아요?',
    content: `가장 가까운 지하철역을 찾으시려면, '네이버지도'나 '카카오맵' 앱을 이용하시는 것이 가장 정확하고 편리합니다.

**추천 앱:**
1. **네이버지도**
   • 실시간 위치 기반 검색
   • 대중교통 경로 안내
   • 지하철 실시간 도착 정보

2. **카카오맵**
   • 정확한 도보 경로 안내
   • 지하철 출구 정보 제공
   • 주변 편의시설 정보

**사용 방법:**
1. 앱 실행 후 현재 위치 허용
2. 검색창에 '지하철역' 입력
3. 가까운 순서로 지하철역 표시
4. 원하는 역 선택하여 경로 확인

**추가 팁:**
• '지하철 종결자' 앱: 지하철 정보 전문 앱
• '서울버스' 앱: 버스와 지하철 통합 정보

현재 계신 위치가 어디신지 알려주시면 더 구체적으로 도움드릴 수 있어요!

※ AI 답변은 참고용이며, 정확한 정보는 공식 지도 앱을 확인해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.94,
    sources: ['네이버지도', '카카오맵', '서울교통공사'],
    createdAt: '2025-06-27T15:30:00Z',
    updatedAt: '2025-06-27T15:30:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-7',
    type: 'ai-ko',
    title: '한국 환전 방법',
    userQuestion: '어디서 환전하는게 좋아요?',
    content: `환전은 시중 은행이나 공항 환전소, 또는 명동과 같은 지역의 사설 환전소에서 가능해요.

**환전 장소별 특징:**

1. **은행**
   • 안전하고 신뢰성 높음
   • 대기시간 있을 수 있음
   • 환율: 보통 수준

2. **공항 환전소**
   • 24시간 운영 (인천공항)
   • 편리하지만 환율이 다소 불리
   • 소액 환전에 적합

3. **사설 환전소 (명동, 홍대, 동대문)**
   • 일반적으로 환율이 가장 좋음
   • 영업시간 확인 필요
   • 대량 환전 시 추천

**환전 시 필요한 것:**
• 여권 (신분증)
• 현금 (외화)

**환율 확인:**
네이버에서 '환율'을 검색하면 실시간 환율을 확인할 수 있어요.

**팁:**
환율이 계속 변하니 여러 곳을 비교해보시고, 한 번에 많은 금액보다는 필요한 만큼만 환전하는 것을 추천드려요.

※ AI 답변은 참고용이며, 환전 전 각 업체의 환율을 직접 확인해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.91,
    sources: ['한국은행', '환전소 정보'],
    createdAt: '2025-06-27T16:15:00Z',
    updatedAt: '2025-06-27T16:15:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-8',
    type: 'ai-ko',
    title: '한국 무료 Wi-Fi',
    userQuestion: '한국에서 무료 와이파이 많이 있나요?',
    content: `네, 한국에서는 대부분의 식당과 카페에서 무료 Wi-Fi를 제공합니다.

**무료 Wi-Fi 이용 가능한 곳:**
• 카페 (스타벅스, 이디야, 카페베네 등)
• 식당 (대부분의 체인점)
• 지하철역 (Seoul_WiFi)
• 버스 (Seoul_Bus)
• 공공장소 (도서관, 시청, 공원)
• 편의점 (일부)
• 대형마트 (롯데마트, 이마트 등)

**이용 방법:**
1. Wi-Fi 설정에서 네트워크 선택
2. 비밀번호는 보통 영수증이나 벽에 게시
3. 카페에서는 직원에게 "와이파이 비밀번호 주세요" 요청

**공공 Wi-Fi:**
• Seoul_WiFi: 서울시 공공 Wi-Fi
• 휴대폰 번호 인증 후 이용 가능
• 일일 5GB 제한

**주의사항:**
공공 Wi-Fi 사용 시 개인정보 보호를 위해 중요한 거래는 피해주세요.

한국의 인터넷 속도는 세계 최고 수준이라 쾌적하게 이용하실 수 있을 거예요!

※ AI 답변은 참고용이며, 각 업체의 정책에 따라 차이가 있을 수 있습니다.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.93,
    sources: ['서울시', '통신업체 정보'],
    createdAt: '2025-06-27T17:00:00Z',
    updatedAt: '2025-06-27T17:00:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-9',
    type: 'ai-ko',
    title: '주휴수당 설명',
    userQuestion: '주휴수당이 뭐예요?',
    content: `'주휴수당'은 1주일에 15시간 이상 일하고, 계약된 근무일을 모두 채운 근로자에게 지급되는 유급 휴일 수당을 의미합니다.

**주휴수당 조건:**
1. 주 15시간 이상 근무
2. 일주일 동안 정해진 근무일에 모두 출근
3. 지각, 조퇴, 결근 없이 개근

**계산 방법:**
(1주일 총 근무시간 ÷ 근무일수) × 시급

**예시:**
• 주 3일, 하루 6시간 근무 (총 18시간)
• 시급 10,030원 (2025년 최저시급)
• 주휴수당: (18시간 ÷ 3일) × 10,030원 = 60,180원

**주의사항:**
• 한 번이라도 지각하면 그 주의 주휴수당은 없어져요
• 근무일수가 적어도 15시간 이상이면 받을 수 있어요
• 외국인도 한국인과 동일하게 적용됩니다

자세한 내용은 아래 Hi-Feed 게시물을 참고해보세요!

[링크: 2025년 한국 최저시급 및 주휴수당 계산법]

※ AI 답변은 참고용이며, 구체적인 문제는 노무사와 상담해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.88,
    sources: ['고용노동부', '근로기준법'],
    relatedContent: ['hi-feed-9'],
    createdAt: '2025-06-27T18:00:00Z',
    updatedAt: '2025-06-27T18:00:00Z',
    status: 'active'
  },
  {
    id: 'ai-ko-10',
    type: 'ai-ko',
    title: '올리브영 설명',
    userQuestion: '올리브영이 뭐예요?',
    content: `'올리브영'은 한국의 대표적인 드럭스토어로, 화장품, 건강식품, 간식 등을 판매하는 곳이에요.

**올리브영 특징:**
• 화장품: 국내외 브랜드 다양하게 취급
• 건강식품: 비타민, 건강보조식품
• 생활용품: 샴푸, 바디워시, 구강용품
• 간식: 과자, 음료 등

**외국인들이 많이 찾는 이유:**
1. **한국 화장품**: K-뷰티 제품 한곳에서 쇼핑
2. **면세점보다 저렴**: 세일 기간 활용 시
3. **편리한 위치**: 지하철역, 대학가 등 접근성 좋음
4. **멤버십 혜택**: 적립금, 할인 쿠폰

**쇼핑 팁:**
• 세일 기간을 노리면 30-50% 할인 가능
• 온라인몰과 오프라인 매장 가격 비교
• 5만원 이상 구매 시 무료배송

**유명 브랜드:**
에뛰드, 이니스프리, 더페이스샵, 메디힐 등

한국 여행의 필수 쇼핑 코스 중 하나예요!

※ AI 답변은 참고용이며, 정확한 정보는 올리브영 공식 사이트를 확인해주세요.`,
    author: 'AI-Ko',
    category: 'AI 상담',
    confidence: 0.96,
    sources: ['올리브영 공식 정보'],
    relatedContent: ['hi-feed-1'],
    feedback: 'helpful',
    createdAt: '2025-06-27T19:00:00Z',
    updatedAt: '2025-06-27T19:00:00Z',
    status: 'active'
  }
];

export default aiKoResponses;