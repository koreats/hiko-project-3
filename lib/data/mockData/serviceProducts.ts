import { ServiceProduct } from '../types';

export const serviceProducts: ServiceProduct[] = [
  {
    id: 'service-1',
    type: 'service-product',
    title: '30분 비자 관련 화상 상담',
    content: `복잡한 비자 문제, 전문가와 함께 정확하게 해결하세요!

**상담 내용:**
✅ 비자 변경 가능성 및 조건 검토
✅ 필요 서류 목록 및 준비 방법 안내
✅ 예상 소요 기간 및 처리 절차 설명
✅ 개인 상황에 맞는 맞춤형 조언

**상담 방식:**
- 화상 통화 (Zoom, Google Meet)
- 30분 집중 상담
- 한국어, 영어, 중국어 가능

**상담 후 제공:**
📄 상담 요약서 (PDF)
📄 체크리스트 및 일정표
📄 관련 법령 및 참고 자료

**주의사항:**
이 서비스는 순수한 자문 서비스입니다. 
서류 작성 대행은 포함되지 않으며, 별도 상품으로 제공됩니다.`,
    author: '김영민행정사',
    category: '전문가 서비스',
    businessId: 'business-1',
    serviceName: '비자 상담',
    price: 50000,
    currency: 'KRW',
    duration: '30분',
    serviceType: 'consultation',
    isOnline: true,
    isActive: true,
    requirements: ['현재 비자 상태', '변경 희망 비자 유형', '관련 서류 사본'],
    deliverables: ['상담 요약서', '체크리스트', '일정표'],
    createdAt: '2025-06-27T09:00:00Z',
    updatedAt: '2025-06-27T09:00:00Z',
    status: 'active'
  },
  {
    id: 'service-2',
    type: 'service-product',
    title: '학위증명서 영문 번역 및 공증',
    content: `해외 대학 진학이나 취업을 위한 공식 학위증명서 번역 서비스입니다.

**서비스 내용:**
📋 한국 대학 학위증명서 → 영문 번역
📋 외교부 또는 법원 공증 처리
📋 번역 품질 보증 (무료 1회 수정)
📋 아포스티유 신청 대행 (별도 요금)

**처리 절차:**
1. 원본 서류 접수 (방문 또는 우편)
2. 전문 번역사 번역 작업 (1-2일)
3. 원어민 검수 및 최종 검토
4. 공증 기관 제출 및 처리
5. 완성 서류 배송 또는 수령

**소요 기간:**
- 일반: 3-5 영업일
- 긴급: 1-2 영업일 (추가 요금)

**포함 사항:**
✅ 전문 번역 작업
✅ 원어민 감수
✅ 공증 수수료
✅ 전국 택배 발송

**추가 옵션:**
- 아포스티유 신청: +30,000원
- 긴급 처리: +20,000원
- 추가 부수: 10,000원/부`,
    author: '24시간번역센터',
    category: '전문가 서비스',
    businessId: 'business-4',
    serviceName: '학위증명서 번역',
    price: 80000,
    currency: 'KRW',
    duration: '3-5 영업일',
    serviceType: 'translation',
    isOnline: false,
    isActive: true,
    requirements: ['학위증명서 원본', '신분증 사본', '배송 정보'],
    deliverables: ['영문 번역본', '공증서', '원본 반환'],
    createdAt: '2025-06-27T10:00:00Z',
    updatedAt: '2025-06-27T10:00:00Z',
    status: 'active'
  },
  {
    id: 'service-3',
    type: 'service-product',
    title: '은행 대출 상담 동행 통역 (1시간)',
    content: `복잡한 금융 용어와 절차, 전문 통역사와 함께 안전하게 진행하세요!

**서비스 개요:**
🏦 은행 방문 동행 통역 서비스
🏦 대출 상담 전 과정 통역
🏦 계약서 내용 상세 설명
🏦 금융 용어 쉬운 설명

**통역 범위:**
- 대출 상담사와의 대화
- 대출 조건 및 금리 설명
- 필요 서류 안내
- 계약서 주요 조항 설명
- 상환 계획 및 주의사항

**포함 서비스:**
✅ 1시간 동행 통역
✅ 사전 브리핑 (15분)
✅ 상담 후 요약 정리
✅ 후속 질문 답변 (채팅)

**주요 은행:**
- 신한은행, 국민은행, 우리은행
- 하나은행, 기업은행 등
- 서울/경기 지역 지점

**통역 언어:**
한국어 ↔ 영어, 중국어, 베트남어

**예약 방법:**
최소 2일 전 예약 필요
원하는 날짜/시간/은행 지점 명시`,
    author: '글로벌통역센터',
    category: '전문가 서비스',
    businessId: 'business-6',
    serviceName: '은행 동행 통역',
    price: 100000,
    currency: 'KRW',
    duration: '1시간',
    serviceType: 'interpretation',
    isOnline: false,
    isActive: true,
    requirements: ['예약 날짜', '은행 지점', '대출 종류', '연락처'],
    deliverables: ['동행 통역', '상담 요약서', '후속 상담'],
    createdAt: '2025-06-27T11:00:00Z',
    updatedAt: '2025-06-27T11:00:00Z',
    status: 'active'
  },
  {
    id: 'service-4',
    type: 'service-product',
    title: 'TOPIK 6급 단기 집중 과외 (10회)',
    content: `TOPIK 6급 합격을 위한 단기 집중 1:1 맞춤 과외입니다!

**수업 구성:**
📚 총 10회 수업 (회당 2시간, 총 20시간)
📚 개인별 취약점 분석 및 맞춤 커리큘럼
📚 실전 문제 풀이 + 해설
📚 시험 전략 및 시간 관리 훈련

**주차별 계획:**
1-2주차: 기초 실력 점검 및 보완
3-4주차: 영역별 집중 훈련
5주차: 모의고사 및 최종 점검

**포함 서비스:**
✅ 개인 맞춤 교재 제공
✅ 매회 숙제 및 피드백
✅ 실전 모의고사 5회
✅ 시험 전 특별 보강 (무료)

**강사 프로필:**
- 한국어교원 2급 자격증
- TOPIK 강의 경력 5년
- 6급 합격률 95% 달성

**수업 방식:**
- 1:1 개별 지도
- 온라인/오프라인 선택 가능
- 유연한 시간 조정 가능

**성과 보장:**
목표 점수 미달성 시 추가 수업 2회 무료 제공`,
    author: '글로벌한국어학원',
    category: '전문가 서비스',
    businessId: 'business-5',
    serviceName: 'TOPIK 집중 과외',
    price: 600000,
    currency: 'KRW',
    duration: '5주 (10회 수업)',
    serviceType: 'consultation',
    isOnline: true,
    isActive: true,
    requirements: ['현재 한국어 실력', '목표 점수', '가능한 수업 시간'],
    deliverables: ['맞춤 교재', '모의고사', '성적 분석', '수료증'],
    createdAt: '2025-06-27T12:00:00Z',
    updatedAt: '2025-06-27T12:00:00Z',
    status: 'active'
  },
  {
    id: 'service-5',
    type: 'service-product',
    title: '전세 계약서 법률 검토 및 자문',
    content: `전세 계약 전 필수! 변호사가 직접 계약서를 검토해드립니다.

**검토 내용:**
⚖️ 계약서 조항별 법적 문제점 분석
⚖️ 불리한 조항 및 개선 방안 제시
⚖️ 전세금 보장 방안 검토
⚖️ 임대인 신용도 간접 확인 방법 안내

**제공 서비스:**
📋 계약서 상세 검토 보고서
📋 수정 제안서 (협상 포인트)
📋 체크리스트 제공
📋 전화 상담 (30분)

**검토 절차:**
1. 계약서 초안 접수
2. 전문 변호사 검토 (1-2일)
3. 검토 보고서 작성
4. 전화 상담으로 설명
5. 수정 계약서 재검토 (무료)

**추가 서비스:**
- 계약 현장 동행: +200,000원
- 분쟁 시 소송 대리: 별도 상담
- 긴급 검토 (당일): +50,000원

**검토 범위:**
✅ 전세 보증금 관련 조항
✅ 계약 기간 및 갱신 조건
✅ 수리 및 하자 책임
✅ 중도 해지 조건
✅ 보증보험 가입 관련`,
    author: '법무법인HiKo',
    category: '전문가 서비스',
    businessId: 'business-3',
    serviceName: '계약서 법률 검토',
    price: 150000,
    currency: 'KRW',
    duration: '1-2일',
    serviceType: 'consultation',
    isOnline: true,
    isActive: true,
    requirements: ['계약서 초안', '물건지 정보', '연락 가능 시간'],
    deliverables: ['검토 보고서', '수정 제안서', '전화 상담'],
    createdAt: '2025-06-27T13:00:00Z',
    updatedAt: '2025-06-27T13:00:00Z',
    status: 'active'
  },
  {
    id: 'service-6',
    type: 'service-product',
    title: '외국인 원룸 찾기 컨설팅 (3개월)',
    content: `외국인 친화적인 매물만 골라서 소개해드리는 프리미엄 서비스입니다!

**서비스 내용:**
🏠 개인 맞춤 매물 검색 및 추천
🏠 계약 조건 협상 대행
🏠 현장 동행 및 통역 서비스
🏠 계약서 작성 및 검토

**특화 서비스:**
✅ 외국인 임대 가능 매물만 선별
✅ 보증금 협상 및 분할 납부 상담
✅ 은행 대출 연계 서비스
✅ 입주 후 A/S 지원 (3개월)

**포함 서비스:**
- 무제한 매물 소개 (3개월간)
- 현장 동행 (최대 5회)
- 계약서 번역 및 검토
- 이사업체 할인 연결
- 생활 정보 가이드북

**대상 지역:**
서울 전 지역 (특히 외국인 밀집 지역)
- 홍대/신촌, 강남/역삼
- 이태원/용산, 성수/건대

**보장 서비스:**
3개월 내 계약 성사 시까지 지속 지원
미성사 시 50% 환불`,
    author: '글로벌부동산',
    category: '전문가 서비스',
    businessId: 'business-2',
    serviceName: '원룸 찾기 컨설팅',
    price: 300000,
    currency: 'KRW',
    duration: '3개월',
    serviceType: 'consultation',
    isOnline: false,
    isActive: true,
    requirements: ['예산 범위', '선호 지역', '입주 희망일', '비자 상태'],
    deliverables: ['매물 리스트', '계약서 검토', '동행 서비스', '가이드북'],
    createdAt: '2025-06-27T14:00:00Z',
    updatedAt: '2025-06-27T14:00:00Z',
    status: 'active'
  },
  {
    id: 'service-7',
    type: 'service-product',
    title: 'F-2-7 비자 서류 작성 대행',
    content: `복잡한 F-2-7 비자 신청, 전문가가 A부터 Z까지 도와드립니다!

**대행 서비스:**
📄 통합신청서 완벽 작성
📄 점수 계산 및 최적화
📄 첨부 서류 리스트 작성
📄 서류 검토 및 보완

**점수 최적화:**
✅ 학력, 경력, 소득 점수 최대화
✅ 가산점 항목 발굴 및 활용
✅ 부족한 점수 보완 방안 제시
✅ 제출 시기 최적화 상담

**포함 서비스:**
- 개인별 점수 분석
- 신청서 완벽 작성
- 서류 번역 (필요시)
- 출입국사무소 제출 대행
- 결과 확인 및 후속 조치

**성공 보장:**
점수 부족으로 인한 거절 시
재신청 대행 무료 제공

**추가 서비스:**
- 긴급 처리: +100,000원
- 영어 상담: 무료
- 결과 통지 후 후속 상담: 무료

**예상 소요 기간:**
서류 준비: 1-2주
신청서 작성: 3-5일
정부 심사: 4-6주`,
    author: '김영민행정사',
    category: '전문가 서비스',
    businessId: 'business-1',
    serviceName: 'F-2-7 서류 대행',
    price: 500000,
    currency: 'KRW',
    duration: '2-3주',
    serviceType: 'documentation',
    isOnline: false,
    isActive: true,
    requirements: ['기본 신상정보', '학력 서류', '경력 서류', '소득 증명'],
    deliverables: ['신청서 작성', '서류 검토', '제출 대행', '결과 확인'],
    createdAt: '2025-06-27T15:00:00Z',
    updatedAt: '2025-06-27T15:00:00Z',
    status: 'active'
  },
  {
    id: 'service-8',
    type: 'service-product',
    title: '의료 동행 통역 (병원 진료)',
    content: `언어 장벽 없이 안전하게 진료 받으세요!

**서비스 범위:**
🏥 병원 방문 전 과정 동행
🏥 의료진과의 의사소통 통역
🏥 진료 내용 및 처방 설명
🏥 수술/시술 동의서 번역

**통역 내용:**
- 증상 설명 및 병력 청취
- 의사 진단 및 치료 계획
- 처방전 및 복용법 설명
- 다음 진료 예약 및 주의사항

**지원 병원:**
✅ 대학병원 (서울대, 연세대, 삼성 등)
✅ 종합병원 (강남 세브란스, 서울아산 등)
✅ 전문병원 (성형외과, 치과 등)

**통역 언어:**
한국어 ↔ 영어, 중국어, 일본어, 베트남어

**포함 서비스:**
- 2시간 동행 통역
- 진료 전 증상 정리 도움
- 진료 후 처방 설명
- 의료 용어 설명서 제공

**추가 옵션:**
- 연장 통역: 50,000원/시간
- 응급실 동행: +50,000원
- 수술 동의서 번역: +30,000원`,
    author: '메디컬통역센터',
    category: '전문가 서비스',
    businessId: 'business-7',
    serviceName: '의료 동행 통역',
    price: 120000,
    currency: 'KRW',
    duration: '2시간',
    serviceType: 'interpretation',
    isOnline: false,
    isActive: true,
    requirements: ['예약 병원', '진료과', '증상 요약', '연락처'],
    deliverables: ['동행 통역', '진료 요약', '처방 설명', '용어집'],
    createdAt: '2025-06-27T16:00:00Z',
    updatedAt: '2025-06-27T16:00:00Z',
    status: 'active'
  }
];

export default serviceProducts;