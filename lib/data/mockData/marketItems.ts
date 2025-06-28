import { MarketItem } from '../types';

export const marketItems: MarketItem[] = [
  {
    id: 'market-1',
    type: 'market-item',
    title: '귀국 처분) 이케아 2인용 소파, 1년 사용했습니다',
    content: `1년 전에 구매한 이케아 클리판(KLIPPAN) 2인용 소파입니다. 귀국하게 되어 급하게 처분해요.

**상품 정보:**
- 브랜드: 이케아 KLIPPAN
- 색상: 베이지 (옅은 갈색)
- 크기: 180cm x 88cm
- 구매가: 149,000원

**상태:**
- 비흡연자, 반려동물 없음
- 사용감 있지만 깨끗한 편
- 쿠션 탄력 양호
- 얼룩이나 찢어진 곳 없음

**거래 조건:**
- 직접 가져가셔야 해요 (3층, 엘리베이터 없음)
- 위치: 신촌역 도보 5분
- 현금 거래만 가능

급하게 처분해야 해서 가격 협상 어느 정도 가능합니다!`,
    author: '귀국준비중',
    category: 'Hi-Market',
    price: 70000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 서대문구 신촌동',
    images: ['sofa1.jpg', 'sofa2.jpg', 'sofa3.jpg'],
    views: 89,
    likes: 12,
    isSold: false,
    negotiable: true,
    deliveryOption: '직거래',
    tags: ['이케아', '소파', '가구', '귀국처분'],
    createdAt: '2025-06-27T10:00:00Z',
    updatedAt: '2025-06-27T10:00:00Z',
    status: 'active'
  },
  {
    id: 'market-2',
    type: 'market-item',
    title: '(미개봉) 필립스 에어프라이어 5000 시리즈 팝니다',
    content: `선물 받았는데 이미 사용 중인 제품이 있어서 판매합니다.

**상품 정보:**
- 필립스 에어프라이어 HD9252/90
- 용량: 4.1L (3-4인분)
- 구매일: 2025년 6월 (1주일 전)
- 정가: 199,000원

**상태:**
- 완전 미개봉 새상품
- 박스 포장 그대로
- 영수증 있음
- 무료배송으로 받았음

**포함 구성품:**
- 에어프라이어 본체
- 바스켓
- 매뉴얼 (한국어)
- 레시피북

안전결제 가능하고, 직거래 원하시면 홍대입구역에서 만나요!`,
    author: '새상품판매',
    category: 'Hi-Market',
    price: 150000,
    currency: 'KRW',
    condition: '새상품',
    location: '서울 마포구 홍대',
    images: ['airfryer1.jpg', 'airfryer2.jpg'],
    views: 156,
    likes: 28,
    isSold: false,
    negotiable: false,
    deliveryOption: '둘다',
    tags: ['필립스', '에어프라이어', '미개봉', '새상품'],
    createdAt: '2025-06-27T11:30:00Z',
    updatedAt: '2025-06-27T11:30:00Z',
    status: 'active'
  },
  {
    id: 'market-3',
    type: 'market-item',
    title: '삼성 27인치 커브드 모니터 (C27R502) 판매',
    content: `재택근무용으로 썼던 모니터입니다. 더 큰 모니터로 바꾸게 되어 판매합니다.

**상품 정보:**
- 삼성 C27R502 27인치 커브드 모니터
- 해상도: 1920x1080 (FHD)
- 주사율: 75Hz
- 곡률: 1800R
- 연결포트: HDMI, VGA

**상태:**
- 구매일: 2023년 3월 (2년 사용)
- 화면 이상 없음
- 외관상 사용감 약간 있음
- 모든 기능 정상 작동

**포함품:**
- 모니터 본체
- 전원 케이블
- HDMI 케이블
- 설명서

박스는 없지만 안전하게 포장해서 드려요!`,
    author: '모니터업그레이드',
    category: 'Hi-Market',
    price: 120000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 강남구 역삼동',
    images: ['monitor1.jpg', 'monitor2.jpg', 'monitor3.jpg'],
    views: 203,
    likes: 15,
    isSold: false,
    negotiable: true,
    deliveryOption: '둘다',
    tags: ['삼성', '모니터', '27인치', '커브드'],
    createdAt: '2025-06-27T12:45:00Z',
    updatedAt: '2025-06-27T12:45:00Z',
    status: 'active'
  },
  {
    id: 'market-4',
    type: 'market-item',
    title: '한국어능력시험 TOPIK II 기출문제집',
    content: `TOPIK 6급 합격했어서 더 이상 필요 없어서 팔아요!

**교재 정보:**
- TOPIK II 기출문제집 (2023-2024)
- 출판사: 다락원
- 정가: 15,000원
- 36회~50회 기출문제 수록

**상태:**
- 전체적으로 깨끗한 편
- 연필로 답 표시한 부분 있음 (지우개로 지워짐)
- 해설집 모든 페이지 완전함
- 표지 약간 구겨짐

**추가 혜택:**
- 제가 정리한 단어 노트 (50페이지) 무료 증정
- TOPIK 시험 후기 및 공부법 상담 가능

TOPIK 준비하시는 분께 도움이 되었으면 좋겠어요! 🇰🇷`,
    author: 'TOPIK6급합격',
    category: 'Hi-Market',
    price: 8000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 동작구 노량진동',
    images: ['topik1.jpg', 'topik2.jpg'],
    views: 67,
    likes: 8,
    isSold: false,
    negotiable: false,
    deliveryOption: '둘다',
    tags: ['TOPIK', '한국어', '기출문제집', '시험'],
    createdAt: '2025-06-27T13:20:00Z',
    updatedAt: '2025-06-27T13:20:00Z',
    status: 'active'
  },
  {
    id: 'market-5',
    type: 'market-item',
    title: '(나눔) 220V -> 110V 변압기 (돼지코) 여러 개 나눔합니다',
    content: `미국에서 가져온 전자제품 쓰려고 샀던 변압기들입니다. 
이제 쓸 일이 없어서 필요하신 분께 무료로 드려요! 🎁

**나눔 품목:**
1. 100W 변압기 x 2개 (소형 가전용)
2. 300W 변압기 x 1개 (중형 가전용) 
3. 멀티탭형 변압기 x 1개

**상태:**
- 모두 정상 작동 확인
- 사용감 있지만 기능상 문제없음
- 설명서는 없음

**나눔 조건:**
- 직접 가져가실 분
- 진짜 필요하신 분만
- 위치: 이태원역 근처
- 댓글로 필요한 이유 간단히 적어주세요

같은 외국인으로서 서로 도움이 되었으면 좋겠어요! 
먼저 댓글 달아주시는 분 순서대로 드릴게요.`,
    author: '나눔러버',
    category: 'Hi-Market',
    price: 0,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 용산구 이태원동',
    images: ['transformer1.jpg', 'transformer2.jpg'],
    views: 145,
    likes: 34,
    isSold: false,
    negotiable: false,
    deliveryOption: '직거래',
    tags: ['나눔', '변압기', '110V', '무료'],
    createdAt: '2025-06-27T14:00:00Z',
    updatedAt: '2025-06-27T14:00:00Z',
    status: 'active'
  },
  {
    id: 'market-6',
    type: 'market-item',
    title: '닌텐도 스위치 라이트 옐로우 + 게임 2개',
    content: `거의 사용 안 해서 상태 최상급입니다!

**구성품:**
- 닌텐도 스위치 라이트 본체 (옐로우)
- 동물의 숲 게임 칩
- 젤다의 전설: 브레스 오브 더 와일드 게임 칩
- 정품 충전기
- 보호 파우치
- 화면 보호필름 (부착됨)

**상태:**
- 구매일: 2024년 12월 (6개월 사용)
- 총 플레이 시간: 약 20시간
- 외관: 거의 새것 수준
- 배터리: 문제없음
- 모든 기능 정상 작동

**판매 이유:**
학업 때문에 게임할 시간이 없어서요.
정말 아껴서 사용했습니다!

개별 구매가 총 35만원 정도였는데 합리적인 가격에 드려요.`,
    author: '게임포기자',
    category: 'Hi-Market',
    price: 180000,
    currency: 'KRW',
    condition: '거의새것',
    location: '서울 성북구 안암동',
    images: ['switch1.jpg', 'switch2.jpg', 'switch3.jpg', 'switch4.jpg'],
    views: 234,
    likes: 45,
    isSold: false,
    negotiable: true,
    deliveryOption: '둘다',
    tags: ['닌텐도', '스위치라이트', '게임', '옐로우'],
    createdAt: '2025-06-27T15:30:00Z',
    updatedAt: '2025-06-27T15:30:00Z',
    status: 'active'
  },
  {
    id: 'market-7',
    type: 'market-item',
    title: '1인용 전기밥솥 (쿠첸)',
    content: `자취생, 1인 가구에 딱 맞는 사이즈입니다!

**제품 정보:**
- 브랜드: 쿠첸
- 모델: CJE-A0301
- 용량: 3인분 (1.8L)
- 기능: 백미, 현미, 죽, 찜 등

**상태:**
- 구매일: 2024년 8월 (10개월 사용)
- 내솥 코팅 상태 양호
- 외관 약간 스크래치 있음
- 밥 잘 되고 기능 이상 없음

**포함품:**
- 전기밥솥 본체
- 내솥
- 주걱, 계량컵
- 설명서

**장점:**
- 1인 가구용으로 최적 사이즈
- 전기료 적게 나옴
- 간단한 원터치 조작

더 큰 용량으로 바꾸려고 판매합니다.`,
    author: '1인가구졸업',
    category: 'Hi-Market',
    price: 25000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 관악구 신림동',
    images: ['ricecooker1.jpg', 'ricecooker2.jpg'],
    views: 98,
    likes: 16,
    isSold: false,
    negotiable: true,
    deliveryOption: '직거래',
    tags: ['전기밥솥', '쿠첸', '1인용', '자취'],
    createdAt: '2025-06-27T16:15:00Z',
    updatedAt: '2025-06-27T16:15:00Z',
    status: 'active'
  },
  {
    id: 'market-8',
    type: 'market-item',
    title: '아이폰 13 Pro Max 128GB 실버 (배터리 89%)',
    content: `아이폰 14로 기기변경해서 판매합니다.

**기기 정보:**
- 아이폰 13 Pro Max 128GB 실버
- 구매일: 2022년 3월 (2년 3개월 사용)
- 배터리 상태: 89%
- iOS 최신 버전

**상태:**
- 케이스, 필름 항상 사용해서 깨끗함
- 화면, 뒷면 스크래치 없음
- 카메라 렌즈 깨끗함
- 모든 기능 정상 작동
- 진동, 스피커, 마이크 이상없음

**액세서리:**
- 정품 박스
- 미사용 USB-C 케이블
- 사용하던 케이스 2개 증정

**거래 조건:**
- 직거래 시 현장에서 초기화 진행
- 안전결제 가능
- A/S 이력 없는 깔끔한 기기입니다

관심 있으시면 채팅 주세요!`,
    author: 'iPhone업그레이드',
    category: 'Hi-Market',
    price: 450000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 송파구 잠실동',
    images: ['iphone1.jpg', 'iphone2.jpg', 'iphone3.jpg', 'iphone4.jpg'],
    views: 312,
    likes: 67,
    isSold: false,
    negotiable: true,
    deliveryOption: '둘다',
    tags: ['아이폰', '13ProMax', '128GB', '실버'],
    createdAt: '2025-06-27T17:00:00Z',
    updatedAt: '2025-06-27T17:00:00Z',
    status: 'active'
  },
  {
    id: 'market-9',
    type: 'market-item',
    title: '로지텍 MX Keys Mini 키보드 (영문 각인)',
    content: `한글 각인 없는 깔끔한 영문 버전입니다!

**제품 정보:**
- 로지텍 MX Keys Mini 무선 키보드
- 색상: 그라파이트 (차콜 그레이)
- 키 배열: 영문 (한글 각인 없음)
- 백라이트: 스마트 조명

**상태:**
- 구매일: 2024년 10월 (8개월 사용)
- 타건감 최상급 유지
- 키 인쇄 전혀 지워지지 않음
- 백라이트 모든 키 정상 작동

**특징:**
- 조용한 타이핑 (사무실, 카페 사용 좋음)
- 3개 기기 동시 연결 가능
- USB-C 충전 (배터리 오래 감)

**포함품:**
- 키보드 본체
- USB-C 충전 케이블
- 정품 박스
- 로지텍 Unifying 리시버

기계식 키보드에 빠져서 판매합니다. 
타건감 정말 좋은 제품이에요!`,
    author: '키보드수집가',
    category: 'Hi-Market',
    price: 85000,
    currency: 'KRW',
    condition: '거의새것',
    location: '서울 영등포구 여의도동',
    images: ['keyboard1.jpg', 'keyboard2.jpg', 'keyboard3.jpg'],
    views: 156,
    likes: 23,
    isSold: false,
    negotiable: false,
    deliveryOption: '둘다',
    tags: ['로지텍', 'MX키보드', '무선키보드', '영문각인'],
    createdAt: '2025-06-27T18:30:00Z',
    updatedAt: '2025-06-27T18:30:00Z',
    status: 'active'
  },
  {
    id: 'market-10',
    type: 'market-item',
    title: '2인용 식탁 세트 (의자 2개 포함)',
    content: `작은 원룸에 딱 맞는 사이즈의 식탁 세트입니다.

**제품 정보:**
- 크기: 80cm x 60cm (2인용)
- 재질: 원목 + 철제 다리
- 의자 2개 포함
- 색상: 내추럴 우드

**상태:**
- 구매일: 2023년 5월 (2년 사용)
- 생활기스 약간 있음 (사진 참고)
- 구조적으로 견고함
- 의자 쿠션 약간 눌림
- 사용하는 데 전혀 문제없음

**장점:**
- 공간 효율적인 사이즈
- 조립식이라 이사 시 편함
- 심플한 디자인

**주의사항:**
- 직접 가져가셔야 해요
- 분해 가능하지만 조립은 직접 하셔야 함

더 큰 집으로 이사 가서 업그레이드 예정입니다.`,
    author: '이사준비중',
    category: 'Hi-Market',
    price: 40000,
    currency: 'KRW',
    condition: '사용감많음',
    location: '서울 마포구 합정동',
    images: ['table1.jpg', 'table2.jpg', 'table3.jpg'],
    views: 89,
    likes: 11,
    isSold: false,
    negotiable: true,
    deliveryOption: '직거래',
    tags: ['식탁', '의자', '2인용', '원목'],
    createdAt: '2025-06-27T19:45:00Z',
    updatedAt: '2025-06-27T19:45:00Z',
    status: 'active'
  },
  // 추가 판매 게시물들
  {
    id: 'market-11',
    type: 'market-item',
    title: '다이슨 V10 무선청소기 (2년 사용)',
    content: `이사가면서 더 큰 청소기로 바꿔서 판매합니다.

**제품 정보:**
- 다이슨 V10 앱솔루트 (최상위 모델)
- 구매일: 2022년 8월 (2년 사용)
- 구매가: 699,000원
- 색상: 레드/아이언

**포함 구성품:**
- 본체 + 배터리
- 토르크 드라이브 브러시 (카펫용)
- 소프트 롤러 브러시 (마루용)
- 미니 모터 헤드 (침구용)
- 틈새 노즐, 브러시 노즐
- 충전거치대 + 전용 충전기

**상태:**
- 정기적으로 필터 청소함
- 배터리 성능 양호 (약 20-25분 사용 가능)
- 본체 약간의 스크래치 있음
- 모든 브러시 정상 작동

**장점:**
- 선 없어서 계단, 차량 청소 편함
- 흡입력 만족스러움
- A/S 기간 1년 남음

정말 깨끗하게 관리해서 사용했어요!`,
    author: '청소마니아',
    category: 'Hi-Market',
    price: 280000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 강서구 화곡동',
    images: ['dyson1.jpg', 'dyson2.jpg', 'dyson3.jpg'],
    views: 189,
    likes: 34,
    isSold: false,
    negotiable: true,
    deliveryOption: '둘다',
    tags: ['다이슨', '무선청소기', 'V10', '가전'],
    createdAt: '2025-06-26T09:00:00Z',
    updatedAt: '2025-06-26T09:00:00Z',
    status: 'active'
  },
  {
    id: 'market-12',
    type: 'market-item',
    title: '맥북 프로 13인치 M1 (256GB, 실버)',
    content: `회사에서 맥북을 지급받아서 개인용은 판매합니다.

**제품 정보:**
- MacBook Pro 13인치 (M1 칩, 2020년 말 출시)
- 색상: 실버
- 용량: SSD 256GB
- 메모리: 8GB 통합 메모리
- 배터리 사이클: 245회

**상태:**
- 구매일: 2021년 2월 (3년 사용)
- 케이스 항상 씌우고 사용
- 화면 무점등, 스크래치 없음
- 키보드, 트랙패드 정상
- 충전 및 모든 포트 정상 작동

**포함품:**
- 맥북 본체
- 정품 61W USB-C 충전기
- USB-C 충전 케이블
- 정품 박스 및 매뉴얼
- 사용하던 하드케이스 증정

**특징:**
- M1 칩으로 성능 우수
- 배터리 하루 종일 사용 가능
- 발열 거의 없음
- 개발, 디자인 작업 최적

macOS 최신 버전 설치된 상태로 드려요!`,
    author: '맥북판매자',
    category: 'Hi-Market',
    price: 850000,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 서초구 잠원동',
    images: ['macbook1.jpg', 'macbook2.jpg', 'macbook3.jpg', 'macbook4.jpg'],
    views: 445,
    likes: 89,
    isSold: false,
    negotiable: true,
    deliveryOption: '둘다',
    tags: ['맥북', '맥북프로', 'M1', '노트북'],
    createdAt: '2025-06-25T14:30:00Z',
    updatedAt: '2025-06-25T14:30:00Z',
    status: 'active'
  },
  // 구매 게시물들 (구인구직)
  {
    id: 'market-13',
    type: 'market-item',
    title: '[구해요] 중고 자전거 (26인치, 변속기 있는 것)',
    content: `출퇴근용 자전거를 찾고 있습니다!

**찾는 조건:**
- 크기: 26인치 (키 170cm 여성)
- 변속기: 있었으면 좋겠어요
- 가격: 10-15만원 사이
- 상태: 타고 다니는 데 문제없는 정도

**용도:**
- 주로 출퇴근용 (왕복 6km)
- 가끔 한강 라이딩
- 실내 보관 가능

**희망 사항:**
- 바구니나 짐받이 있으면 더 좋음
- 안장 높이 조절 가능한 것
- 브레이크 잘 작동하는 것

**거래 희망 지역:**
- 강남, 서초, 송파 지역
- 직접 확인 후 거래하고 싶어요

자전거 점검해서 안전하게 탈 수 있는 상태면
가격 협상 가능합니다!

자전거 사진이랑 간단한 상태 설명 부탁드려요 🚴‍♀️`,
    author: '자전거찾아요',
    category: 'Hi-Market',
    postType: '구해요',
    price: 120000,
    priceType: '희망가격',
    currency: 'KRW',
    location: '서울 강남구',
    views: 78,
    likes: 12,
    isSold: false,
    tags: ['자전거', '구해요', '26인치', '변속기'],
    createdAt: '2025-06-24T16:20:00Z',
    updatedAt: '2025-06-24T16:20:00Z',
    status: 'active'
  },
  {
    id: 'market-14',
    type: 'market-item',
    title: '[구해요] 강아지 산책 도우미 (한남동 거주)',
    content: `강아지를 도와서 산책시켜주실 분을 찾습니다 🐕

**강아지 정보:**
- 품종: 골든 리트리버 (2살, 수컷)
- 이름: 코코
- 성격: 온순하고 사람 좋아함
- 무게: 약 25kg

**요청사항:**
- 주 3회 (화, 목, 토) 오후 6-7시
- 1회당 30-40분 산책
- 용산구 한남동 일대
- 강아지 케어 경험 있으신 분 우대

**제공사항:**
- 시간당 15,000원
- 목줄, 배변봉투 등 용품 제공
- 강아지 간식 제공
- 유연한 스케줄 조정 가능

**지원 자격:**
- 개를 좋아하시는 분
- 책임감 있으신 분
- 한남동 근처 거주하시는 분
- 장기간 도와주실 분 환영

반려동물 키우신 경험이나 관련 자격증 있으시면
더욱 좋겠지만 필수는 아니에요.

코코와 잘 맞으시는 분을 찾고 있어요! 🐾`,
    author: '코코맘',
    category: 'Hi-Market',
    postType: '구해요',
    serviceType: '펫시팅',
    price: 15000,
    priceType: '시급',
    currency: 'KRW',
    location: '서울 용산구 한남동',
    views: 234,
    likes: 45,
    isUrgent: true,
    tags: ['펫시팅', '강아지산책', '구해요', '한남동'],
    createdAt: '2025-06-23T11:45:00Z',
    updatedAt: '2025-06-23T11:45:00Z',
    status: 'active'
  },
  // 나눔 게시물들
  {
    id: 'market-15',
    type: 'market-item',
    title: '[나눔] 유아용품 일괄 나눔 (6-12개월용)',
    content: `아이가 커서 더 이상 사용하지 않는 유아용품들을 나눔합니다 👶

**나눔 품목:**
1. **유아 의류 (6-12개월)**
   - 바디슈트 5벌
   - 우주복 3벌  
   - 원피스 2벌
   - 모자, 양말 여러 개

2. **이유식 관련**
   - 이유식 보관용기 10개
   - 이유식 스푼 5개
   - 빨대컵 2개
   - 물병 1개

3. **장난감**
   - 딸랑이 3개
   - 치발기 2개
   - 헝겊 책 5권
   - 아기 체육관 (접이식)

**상태:**
- 모두 깨끗하게 세탁함
- 사용감 있지만 기능상 문제없음
- 비싸게 산 브랜드 제품들 포함

**나눔 조건:**
- 정말 필요하신 분만 (아기 키우시는 분)
- 전체 일괄로만 드려요 (개별 X)
- 직접 가져가실 분
- 댓글로 간단한 자기소개 부탁드려요

**픽업 장소:**
강남구 대치동 (대치역 근처)
평일 저녁, 주말 언제든 연락주세요!

같은 육아맘으로서 도움이 되었으면 좋겠어요 💕`,
    author: '육아맘나눔',
    category: 'Hi-Market',
    postType: '나눔',
    price: 0,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 강남구 대치동',
    images: ['baby1.jpg', 'baby2.jpg', 'baby3.jpg'],
    views: 167,
    likes: 67,
    isSold: false,
    deliveryOption: '직거래',
    tags: ['나눔', '유아용품', '육아', '대치동'],
    createdAt: '2025-06-22T13:20:00Z',
    updatedAt: '2025-06-22T13:20:00Z',
    status: 'active'
  },
  {
    id: 'market-16',
    type: 'market-item',
    title: '[나눔] 프로그래밍 서적 20권 일괄 나눔',
    content: `개발 공부하시는 분들께 도움이 되었으면 해서 나눔합니다! 📚

**나눔 서적 목록:**

**웹 개발**
- HTML/CSS 완벽 가이드
- 자바스크립트 완벽 가이드 (7판)
- React 완벽 가이드
- Node.js 교과서

**백엔드**
- 스프링 부트와 AWS로 혼자 구현하는 웹 서비스
- 자바 ORM 표준 JPA 프로그래밍
- 클린 코드
- 효과적인 자바 (3판)

**데이터베이스**
- SQL 첫걸음
- 리얼 MySQL 8.0

**기타**
- 객체지향의 사실과 오해
- 컴퓨터 과학이 여는 세계
- 알고리즘 (로버트 세지윅)
- 이산수학
- 기타 CS 관련 서적들...

**상태:**
- 대부분 밑줄, 필기 있음
- 일부 귀접기 있는 책도 있음
- 내용상 문제없음
- 2019-2023년 사이 구매한 책들

**나눔 조건:**
- 개발 공부하시는 분 (학생/직장인 무관)
- 전체 일괄로만 드려요
- 직접 가져가실 분 (무거워요!)
- 정말 공부에 활용하실 분

취업 성공해서 이제 필요 없어졌어요.
후배 개발자분들께 도움이 되었으면 합니다! 💪`,
    author: '개발자선배',
    category: 'Hi-Market',
    postType: '나눔',
    price: 0,
    currency: 'KRW',
    condition: '사용감적음',
    location: '서울 구로구 신도림동',
    images: ['books1.jpg', 'books2.jpg'],
    views: 289,
    likes: 123,
    isSold: false,
    deliveryOption: '직거래',
    tags: ['나눔', '프로그래밍', '개발서적', '공부'],
    createdAt: '2025-06-21T10:30:00Z',
    updatedAt: '2025-06-21T10:30:00Z',
    status: 'active'
  },
  // 교환 게시물들
  {
    id: 'market-17',
    type: 'market-item',
    title: '[교환] 아이패드 에어 4 ↔ 아이패드 프로 11인치',
    content: `아이패드 프로로 교환하고 싶습니다!

**제가 드릴 것:**
- 아이패드 에어 4세대 (64GB, 스페이스그레이)
- 구매일: 2023년 1월 (1년 6개월 사용)
- 정품 박스, 충전기 포함
- 정품 스마트 커버 (네이비) 증정
- 강화유리 필름 부착됨

**상태:**
- 외관 깨끗함 (케이스 항상 사용)
- 화면 무점등, 스크래치 없음
- 배터리 성능 정상
- 모든 기능 이상 없음

**교환 희망 제품:**
- 아이패드 프로 11인치 (2세대 또는 3세대)
- 용량: 128GB 이상
- 색상: 무관
- 상태: 정상 작동하는 제품

**교환 이유:**
그림 그리는 취미가 생겨서 애플펜슬 2세대 호환되는
프로 모델이 필요해졌어요.

차액 지불 가능하고, 직접 만나서
서로 제품 확인 후 교환하고 싶습니다.

비슷한 가격대 다른 태블릿도 고려해볼게요! 📱`,
    author: '아이패드교환',
    category: 'Hi-Market',
    postType: '교환',
    price: 0,
    currency: 'KRW',
    exchangeFrom: '아이패드 에어 4 (64GB)',
    exchangeTo: '아이패드 프로 11인치',
    location: '서울 노원구 상계동',
    images: ['ipad1.jpg', 'ipad2.jpg', 'ipad3.jpg'],
    views: 134,
    likes: 23,
    isSold: false,
    deliveryOption: '직거래',
    tags: ['교환', '아이패드', '아이패드프로', '태블릿'],
    createdAt: '2025-06-20T15:45:00Z',
    updatedAt: '2025-06-20T15:45:00Z',
    status: 'active'
  },
  {
    id: 'market-18',
    type: 'market-item',
    title: '[교환] 국산 쌀 20kg ↔ 수입 쌀 (태국미, 인디카)',
    content: `한국 쌀이 체질에 안 맞아서 교환 희망합니다.

**교환 제공:**
- 경기미 추청 20kg (새 포장)
- 구매일: 어제 (미개봉)
- 구매가: 7만원
- 2025년산 햅쌀

**교환 희망:**
- 태국 쌀 (재스민 라이스) 또는
- 인도 바스마티 쌀 또는
- 기타 인디카 계열 쌀
- 양: 15-20kg

**교환 이유:**
동남아시아에서 오래 살아서
찰기 있는 한국 쌀이 잘 안 맞아요.
부모님이 사주신 건데 드릴 수가 없어서...

**희망 지역:**
- 안산, 시흥 지역 (차 있어서 이동 가능)
- 아시안 마트 근처면 더 좋음

같은 고민 있으신 분 계시면
서로 윈윈하는 교환이었으면 좋겠어요!

쌀 종류나 브랜드는 상관없고
먹을 수 있는 상태면 OK입니다 🍚`,
    author: '쌀교환해요',
    category: 'Hi-Market',
    postType: '교환',
    price: 0,
    currency: 'KRW',
    exchangeFrom: '경기미 추청 20kg',
    exchangeTo: '태국미/인디카쌀 15-20kg',
    location: '경기 안산시',
    views: 67,
    likes: 15,
    isSold: false,
    deliveryOption: '직거래',
    tags: ['교환', '쌀', '태국미', '인디카'],
    createdAt: '2025-06-19T12:15:00Z',
    updatedAt: '2025-06-19T12:15:00Z',
    status: 'active'
  },
  // 서비스 게시물들
  {
    id: 'market-19',
    type: 'market-item',
    title: '[과외] 영어 회화 1:1 과외 (네이티브 스피커)',
    content: `미국에서 온 영어 과외 선생님입니다! 🇺🇸

**자기소개:**
- 이름: Sarah Johnson
- 나이: 28세
- 출신: 캘리포니아, 미국
- 한국 거주: 2년 (E-2 비자)
- 한국어 수준: 중급

**경력:**
- 미국 UC Berkeley 영문학 학사
- TESOL 자격증 보유
- 한국에서 영어 과외 2년 경험
- 성인, 학생 수업 모두 가능

**수업 내용:**
- 일상 영어 회화
- 비즈니스 영어
- 토익/토플 스피킹
- 발음 교정
- 영어 에세이 작성

**수업 방식:**
- 1:1 개인 과외
- 온라인/오프라인 모두 가능
- 학생 수준에 맞춤 수업
- 매 수업 후 피드백 제공

**가격:**
- 1시간: 50,000원
- 2시간: 90,000원 (할인가)
- 월 8회: 360,000원 (10% 할인)

**가능 시간:**
평일 오후 2시-8시, 주말 오전 10시-오후 6시

**수업 가능 지역:**
강남, 서초, 송파 (오프라인)
전국 어디든 (온라인)

영어 실력 향상하고 싶으신 분 연락주세요! 📚`,
    author: 'SarahEnglish',
    category: 'Hi-Market',
    postType: '서비스',
    serviceType: '과외/교육',
    price: 50000,
    priceType: '시간당',
    currency: 'KRW',
    location: '서울 강남구',
    views: 345,
    likes: 67,
    tags: ['과외', '영어', '회화', '네이티브'],
    createdAt: '2025-06-18T09:30:00Z',
    updatedAt: '2025-06-18T09:30:00Z',
    status: 'active'
  },
  {
    id: 'market-20',
    type: 'market-item',
    title: '[번역] 한국어↔영어 전문 번역 서비스',
    content: `정확하고 자연스러운 번역 서비스를 제공합니다.

**번역사 소개:**
- 한국외대 통번역학과 졸업
- 영어 번역 경력 5년
- TEPS 990점 (만점)
- 현재 번역회사 근무

**번역 가능 분야:**
📄 **일반 문서**
- 이력서, 자기소개서
- 계약서, 증명서
- 논문, 리포트
- 이메일, 편지

🏢 **비즈니스**
- 프레젠테이션 자료
- 제품 카탈로그
- 웹사이트 콘텐츠
- 마케팅 자료

📚 **기술/전문**
- IT, 의료, 법률 문서
- 매뉴얼, 가이드
- 학술 논문

**가격 (한국어 기준):**
- 일반 문서: 장당 25,000원 (A4 기준)
- 급한 문서: 장당 35,000원 (24시간 내)
- 기술 문서: 장당 30,000원
- 검토/교정: 장당 15,000원

**서비스 특징:**
✅ 원어민 수준의 자연스러운 번역
✅ 무제한 수정 서비스
✅ 빠른 작업 (통상 2-3일)
✅ 기밀유지 철저

**포트폴리오:** 
요청하시면 샘플 번역문 제공 가능합니다.

정확한 견적은 문서 확인 후 안내드려요! 📝`,
    author: '번역전문가',
    category: 'Hi-Market',
    postType: '서비스',
    serviceType: '번역/통역',
    price: 25000,
    priceType: '장당',
    currency: 'KRW',
    location: '온라인',
    views: 156,
    likes: 34,
    tags: ['번역', '영어', '전문번역', '온라인'],
    createdAt: '2025-06-17T14:20:00Z',
    updatedAt: '2025-06-17T14:20:00Z',
    status: 'active'
  }
];

export default marketItems;