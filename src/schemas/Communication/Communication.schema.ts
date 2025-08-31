// Notification and communication schemas
export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  
  // Content templates
  templates: NotificationContent[];
  
  // Delivery settings
  delivery: DeliverySettings;
  
  // Targeting and triggers
  triggers: NotificationTrigger[];
  audience: AudienceFilter;
  
  // Status and metadata
  isActive: boolean;
  priority: NotificationPriority;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationCategory = 
  | 'booking' 
  | 'payment' 
  | 'operational' 
  | 'marketing' 
  | 'emergency' 
  | 'system';

export interface NotificationContent {
  channel: 'sms' | 'email' | 'push' | 'whatsapp' | 'in_app';
  subject?: string;
  message: string;
  htmlContent?: string;
  variables: TemplateVariable[];
  language: string;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  description: string;
  required: boolean;
  defaultValue?: any;
}

export interface DeliverySettings {
  channels: NotificationChannel[];
  timing: DeliveryTiming;
  retryPolicy: RetryPolicy;
  throttling: ThrottlingSettings;
}

export interface NotificationChannel {
  type: 'sms' | 'email' | 'push' | 'whatsapp' | 'in_app';
  enabled: boolean;
  priority: number;
  fallback: boolean;
  provider?: string;
  settings: ChannelSettings;
}

export interface ChannelSettings {
  senderId?: string;
  replyTo?: string;
  template?: string;
  customHeaders?: Record<string, string>;
}

export interface DeliveryTiming {
  immediate: boolean;
  delay?: number; // minutes
  scheduledTime?: string; // HH:mm format
  timezone: string;
  respectQuietHours: boolean;
  quietHours?: {
    start: string;
    end: string;
  };
}

export interface RetryPolicy {
  enabled: boolean;
  maxAttempts: number;
  retryInterval: number; // minutes
  backoffMultiplier: number;
  failureThreshold: number;
}

export interface ThrottlingSettings {
  enabled: boolean;
  maxPerMinute: number;
  maxPerHour: number;
  maxPerDay: number;
}

export interface NotificationTrigger {
  event: TriggerEvent;
  conditions: TriggerCondition[];
  delay?: number; // minutes
}

export type TriggerEvent = 
  | 'booking_created' 
  | 'booking_confirmed' 
  | 'booking_cancelled' 
  | 'payment_received' 
  | 'payment_failed' 
  | 'session_reminder' 
  | 'check_in_reminder' 
  | 'session_completed' 
  | 'review_request' 
  | 'membership_expiry' 
  | 'court_maintenance' 
  | 'weather_alert'
  | 'system_maintenance';

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'not_in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface AudienceFilter {
  userType: 'owner' | 'player' | 'both';
  locationIds?: string[];
  customerSegments?: string[];
  demographics?: DemographicFilter;
  behavioralFilter?: BehavioralFilter;
}

export interface DemographicFilter {
  ageRange?: {
    min: number;
    max: number;
  };
  gender?: string[];
  location?: string[];
  language?: string[];
}

export interface BehavioralFilter {
  bookingFrequency?: 'low' | 'medium' | 'high';
  lastBookingDays?: number;
  totalSpent?: {
    min: number;
    max: number;
  };
  preferredSports?: string[];
  membershipStatus?: 'active' | 'expired' | 'none';
}

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

// Communication preferences
export interface CommunicationPreferences {
  userId: string;
  userType: 'owner' | 'player';
  
  // Channel preferences
  channels: ChannelPreference[];
  
  // Content preferences
  categories: CategoryPreference[];
  
  // Timing preferences
  timing: TimingPreference;
  
  // Privacy settings
  privacy: PrivacySettings;
  
  // Language and format
  language: string;
  timezone: string;
  dateFormat: string;
  
  updatedAt: Date;
}

export interface ChannelPreference {
  type: 'sms' | 'email' | 'push' | 'whatsapp' | 'in_app';
  enabled: boolean;
  verified: boolean;
  address: string; // phone, email, device token, etc.
  priority: number;
}

export interface CategoryPreference {
  category: NotificationCategory;
  enabled: boolean;
  channels: string[]; // preferred channels for this category
  frequency: 'immediate' | 'daily' | 'weekly' | 'monthly' | 'never';
}

export interface TimingPreference {
  allowedHours: {
    start: string;
    end: string;
  };
  allowedDays: string[];
  timezone: string;
  respectBusinessHours: boolean;
}

export interface PrivacySettings {
  shareDataWithPartners: boolean;
  allowMarketingCommunications: boolean;
  allowPersonalization: boolean;
  dataRetentionPeriod: number; // days
}

// Campaign management
export interface NotificationCampaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  
  // Content and targeting
  message: CampaignMessage;
  audience: CampaignAudience;
  
  // Scheduling
  schedule: CampaignSchedule;
  
  // Performance tracking
  metrics: CampaignMetrics;
  
  // Status
  status: CampaignStatus;
  createdBy: string;
  createdAt: Date;
  launchedAt?: Date;
  completedAt?: Date;
}

export type CampaignType = 
  | 'promotional' 
  | 'informational' 
  | 'transactional' 
  | 'reminder' 
  | 'emergency' 
  | 'survey';

export interface CampaignMessage {
  subject: string;
  content: string;
  cta?: CallToAction;
  attachments?: Attachment[];
  personalization: PersonalizationRule[];
}

export interface CallToAction {
  text: string;
  url: string;
  type: 'button' | 'link';
  tracking: boolean;
}

export interface Attachment {
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface PersonalizationRule {
  variable: string;
  defaultValue: string;
  conditions?: PersonalizationCondition[];
}

export interface PersonalizationCondition {
  field: string;
  operator: string;
  value: any;
  replacement: string;
}

export interface CampaignAudience {
  totalRecipients: number;
  filters: AudienceFilter;
  excludeList?: string[];
  testGroup?: {
    percentage: number;
    criteria: string;
  };
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'recurring';
  startDate?: Date;
  endDate?: Date;
  timezone: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  sendTime?: string;
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  bounced: number;
  unsubscribed: number;
  
  // Rates
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  
  // Revenue impact
  revenue: number;
  roi: number;
  
  // Engagement over time
  timeline: MetricTimeline[];
}

export interface MetricTimeline {
  timestamp: Date;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
}

export type CampaignStatus = 
  | 'draft' 
  | 'scheduled' 
  | 'sending' 
  | 'sent' 
  | 'paused' 
  | 'cancelled' 
  | 'completed';