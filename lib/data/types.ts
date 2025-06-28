// HiKo 플랫폼 콘텐츠 타입 정의

export interface BaseContent {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  status: 'active' | 'draft' | 'hidden' | 'deleted';
}

// A. 시스템 및 관리자 생성 콘텐츠

export interface HiFeedPost extends BaseContent {
  type: 'hi-feed';
  subcategory: '핫딜' | '꿀팁' | '정보' | '유머';
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  hikoCommentary?: string; // HiKo's Commentary
  externalLinks?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Notice extends BaseContent {
  type: 'notice';
  subcategory: '안내' | '업데이트' | '정책' | '점검' | '이벤트' | '오류';
  urgent: boolean;
  effectiveDate?: string;
  expiryDate?: string;
  targetUsers?: string[];
}

export interface FAQ extends BaseContent {
  type: 'faq';
  question: string;
  answer: string;
  subcategory: '회원가입' | '포인트' | '거래' | '비자' | '기술지원' | '기타';
  helpfulCount: number;
  relatedFAQs?: string[];
}

export interface AIKoResponse extends BaseContent {
  type: 'ai-ko';
  userQuestion: string;
  confidence: number;
  sources?: string[];
  feedback?: 'helpful' | 'not_helpful';
  relatedContent?: string[];
}

export interface SystemNotification extends BaseContent {
  type: 'system-notification';
  notificationType: 'welcome' | 'booking' | 'settlement' | 'level_up' | 'reminder' | 'warning';
  userId: string;
  isRead: boolean;
  actionRequired?: boolean;
  actionUrl?: string;
}

export interface PolicyDocument extends BaseContent {
  type: 'policy';
  subcategory: '이용약관' | '개인정보처리방침' | '운영정책' | '광고정책';
  version: string;
  effectiveDate: string;
  language: string;
}

// B. 일반 사용자 생성 콘텐츠 - B-1. 공개/커뮤니티형

export interface CommunityPost extends BaseContent {
  type: 'community-post';
  communityType: 'global' | 'country-specific';
  country?: string;
  subcategory: '질문' | '정보공유' | '잡담' | '거래후기' | '모집' | '모임' | '공지';
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  solved?: boolean; // 질문글의 경우
  // 추가 속성들
  eventDate?: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  isUrgent?: boolean;
  isPinned?: boolean;
  isImportant?: boolean;
}

export interface GroupPost extends BaseContent {
  type: 'group-post';
  groupId: string;
  groupName: string;
  subcategory: '공지' | '모임' | '후기' | '정보' | '잡담';
  isAnnouncement: boolean;
  likes: number;
  comments: number;
}

export interface Comment extends BaseContent {
  type: 'comment';
  parentId: string; // 원본 게시물 ID
  parentType: string; // 'hi-feed', 'community-post', 'market-item' 등
  isReply: boolean;
  replyToCommentId?: string;
  likes: number;
  isReported: boolean;
}

export interface UserProfile extends BaseContent {
  type: 'user-profile';
  nickname: string;
  profileImage?: string;
  introduction: string;
  country: string;
  city?: string;
  interests: string[];
  level: number;
  mannerScore: number;
  joinDate: string;
  isVerified: boolean;
}

export interface TipSubmission extends Omit<BaseContent, 'status'> {
  type: 'tip-submission';
  sourceUrl?: string;
  submissionReason: string;
  status: 'pending' | 'approved' | 'rejected';
  adminFeedback?: string;
  priority: 'low' | 'medium' | 'high';
}

// B-2. 거래/상호작용형

export interface MarketItem extends BaseContent {
  type: 'market-item';
  price?: number;
  currency?: string;
  condition?: '새상품' | '거의새것' | '사용감적음' | '사용감많음' | '고장/파손';
  location: string;
  images?: string[];
  views?: number;
  likes?: number;
  isSold?: boolean;
  negotiable?: boolean;
  deliveryOption?: '직거래' | '택배' | '둘다';
  tags: string[];
  // 추가된 속성들
  postType?: '판매' | '구해요' | '나눔' | '교환' | '서비스';
  priceType?: '정가' | '희망가격' | '시급' | '시간당' | '장당';
  serviceType?: string;
  exchangeFrom?: string;
  exchangeTo?: string;
  isUrgent?: boolean;
  eventDate?: string;
  maxParticipants?: number;
  currentParticipants?: number;
}

export interface TradeReview extends BaseContent {
  type: 'trade-review';
  revieweeId: string;
  revieweeName: string;
  tradeType: 'market' | 'service';
  tradeItemId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  pros?: string[];
  cons?: string[];
}

export interface ServiceRequest extends Omit<BaseContent, 'status'> {
  type: 'service-request';
  expertId: string;
  expertName: string;
  serviceType: string;
  urgency: 'low' | 'medium' | 'high';
  preferredDate?: string;
  budget?: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  questions: string[];
}

export interface UserReport extends Omit<BaseContent, 'status'> {
  type: 'user-report';
  reportedUserId?: string;
  reportedContentId?: string;
  reportedContentType?: string;
  reason: string;
  evidence?: string[];
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
}

// B-3. 비공개/개인형

export interface ChatMessage extends BaseContent {
  type: 'chat-message';
  chatRoomId: string;
  recipientId: string;
  messageType: 'text' | 'image' | 'file' | 'system';
  isRead: boolean;
  isGroupChat: boolean;
  replyToMessageId?: string;
}

export interface CustomerInquiry extends Omit<BaseContent, 'status'> {
  type: 'customer-inquiry';
  inquiryType: '계정' | '결제' | '기술지원' | '신고' | '제안' | '기타';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  adminResponse?: string;
  attachments?: string[];
}

// C. 비즈니스 회원 생성 콘텐츠

export interface BusinessPromotion extends BaseContent {
  type: 'business-promotion';
  businessType: string;
  serviceArea: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
  };
  certifications?: string[];
  isVerifiedBusiness: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface ServiceProduct extends BaseContent {
  type: 'service-product';
  businessId: string;
  serviceName: string;
  price: number;
  currency: string;
  duration: string;
  serviceType: 'consultation' | 'translation' | 'interpretation' | 'documentation' | 'other';
  isOnline: boolean;
  isActive: boolean;
  requirements?: string[];
  deliverables?: string[];
}

export interface AdCampaign extends BaseContent {
  type: 'ad-campaign';
  businessId: string;
  campaignType: 'banner' | 'sponsored_post' | 'featured_listing';
  targetAudience: string[];
  budget: number;
  startDate: string;
  endDate: string;
  adImage?: string;
  clickThroughUrl: string;
  isActive: boolean;
  performance?: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

// 공통 유틸리티 타입
export type ContentType = 
  | 'hi-feed'
  | 'notice'
  | 'faq'
  | 'ai-ko'
  | 'system-notification'
  | 'policy'
  | 'community-post'
  | 'group-post'
  | 'comment'
  | 'user-profile'
  | 'tip-submission'
  | 'market-item'
  | 'trade-review'
  | 'service-request'
  | 'user-report'
  | 'chat-message'
  | 'customer-inquiry'
  | 'business-promotion'
  | 'service-product'
  | 'ad-campaign';

export type AllContent = 
  | HiFeedPost
  | Notice
  | FAQ
  | AIKoResponse
  | SystemNotification
  | PolicyDocument
  | CommunityPost
  | GroupPost
  | Comment
  | UserProfile
  | TipSubmission
  | MarketItem
  | TradeReview
  | ServiceRequest
  | UserReport
  | ChatMessage
  | CustomerInquiry
  | BusinessPromotion
  | ServiceProduct
  | AdCampaign;