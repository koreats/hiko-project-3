// HiKo 플랫폼 Mock 데이터 통합 Export

// 시스템 및 관리자 생성 콘텐츠
export { default as hiFeedPosts } from './hiFeedPosts';
export { default as notices } from './notices';
export { default as faqs } from './faqs';
export { default as aiKoResponses } from './aiKoResponses';
export { default as systemNotifications } from './systemNotifications';
export { default as policyDocuments } from './policyDocuments';

// 일반 사용자 생성 콘텐츠
export { default as communityPosts } from './communityPosts';
export { default as marketItems } from './marketItems';

// 비즈니스 회원 생성 콘텐츠
export { default as businessPromotions } from './businessPromotions';
export { default as serviceProducts } from './serviceProducts';

// 모든 콘텐츠를 하나의 객체로 Export
export const allMockData = {
  // 시스템 및 관리자 생성 콘텐츠 (6개 카테고리)
  hiFeedPosts: require('./hiFeedPosts').default,
  notices: require('./notices').default,
  faqs: require('./faqs').default,
  aiKoResponses: require('./aiKoResponses').default,
  systemNotifications: require('./systemNotifications').default,
  policyDocuments: require('./policyDocuments').default,
  
  // 일반 사용자 생성 콘텐츠 (주요 카테고리만)
  communityPosts: require('./communityPosts').default,
  marketItems: require('./marketItems').default,
  
  // 비즈니스 회원 생성 콘텐츠 (3개 카테고리)
  businessPromotions: require('./businessPromotions').default,
  serviceProducts: require('./serviceProducts').default,
};

// 콘텐츠 타입별 개수 통계
export const contentStats = {
  systemAndAdmin: {
    hiFeedPosts: 20, // 핫딜6 + 꿀팁6 + 유머4 + 정보4 = 20개
    notices: 10,
    faqs: 10,
    aiKoResponses: 10,
    systemNotifications: 20,
    policyDocuments: 10,
    total: 80
  },
  userGenerated: {
    communityPosts: 20, // 질문4 + 정보공유4 + 모임2 + 잡담6 + 공지4 = 20개
    marketItems: 20, // 판매12 + 구해요2 + 나눔3 + 교환2 + 서비스2 = 20개
    // 다른 카테고리들은 시간 관계상 일부만 구현
    total: 40
  },
  business: {
    businessPromotions: 5,
    serviceProducts: 8,
    total: 13
  },
  grandTotal: 133
};

// 카테고리별 데이터 검색 헬퍼 함수
export const getContentByType = (type: string) => {
  switch (type) {
    case 'hi-feed':
      return require('./hiFeedPosts').default;
    case 'notice':
      return require('./notices').default;
    case 'faq':
      return require('./faqs').default;
    case 'ai-ko':
      return require('./aiKoResponses').default;
    case 'system-notification':
      return require('./systemNotifications').default;
    case 'policy':
      return require('./policyDocuments').default;
    case 'community-post':
      return require('./communityPosts').default;
    case 'market-item':
      return require('./marketItems').default;
    case 'business-promotion':
      return require('./businessPromotions').default;
    case 'service-product':
      return require('./serviceProducts').default;
    default:
      return [];
  }
};

// 특정 카테고리의 최신 콘텐츠 가져오기
export const getLatestContent = (type: string, limit: number = 5) => {
  const content = getContentByType(type);
  return content
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

// 인기 콘텐츠 가져오기 (조회수 기준)
export const getPopularContent = (type: string, limit: number = 5) => {
  const content = getContentByType(type);
  return content
    .filter((item: any) => item.views)
    .sort((a: any, b: any) => b.views - a.views)
    .slice(0, limit);
};