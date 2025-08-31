// System and configuration schemas
export interface SystemConfiguration {
  id: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  
  // Feature flags
  features: FeatureFlag[];
  
  // Integration settings
  integrations: IntegrationConfig[];
  
  // Business rules
  businessRules: BusinessRule[];
  
  // System limits and quotas
  limits: SystemLimits;
  
  // Security settings
  security: SecurityConfig;
  
  // Performance settings
  performance: PerformanceConfig;
  
  // Maintenance and health
  maintenance: MaintenanceConfig;
  
  updatedAt: Date;
  updatedBy: string;
}

export interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  environment: string[];
  userSegments?: string[];
  rolloutPercentage: number;
  conditions?: FeatureCondition[];
  expiresAt?: Date;
}

export interface FeatureCondition {
  field: string;
  operator: string;
  value: any;
}

export interface IntegrationConfig {
  name: string;
  type: IntegrationType;
  enabled: boolean;
  settings: IntegrationSettings;
  credentials: EncryptedCredentials;
  endpoints: IntegrationEndpoint[];
  healthCheck: HealthCheckConfig;
}

export type IntegrationType = 
  | 'payment_gateway' 
  | 'sms_provider' 
  | 'email_provider' 
  | 'analytics' 
  | 'crm' 
  | 'accounting' 
  | 'calendar' 
  | 'maps' 
  | 'weather' 
  | 'social_media';

export interface IntegrationSettings {
  timeout: number;
  retryAttempts: number;
  rateLimitPerMinute: number;
  enableLogging: boolean;
  enableCaching: boolean;
  cacheExpiryMinutes: number;
}

export interface EncryptedCredentials {
  apiKey?: string;
  secretKey?: string;
  accessToken?: string;
  refreshToken?: string;
  webhookSecret?: string;
  customFields?: Record<string, string>;
}

export interface IntegrationEndpoint {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  timeout: number;
  retryOnFailure: boolean;
}

export interface HealthCheckConfig {
  enabled: boolean;
  intervalMinutes: number;
  timeoutSeconds: number;
  failureThreshold: number;
  alertOnFailure: boolean;
  alertRecipients: string[];
}

export interface BusinessRule {
  id: string;
  name: string;
  category: BusinessRuleCategory;
  description: string;
  
  // Rule definition
  conditions: RuleCondition[];
  actions: RuleAction[];
  
  // Execution settings
  priority: number;
  isActive: boolean;
  executionMode: 'immediate' | 'batch' | 'scheduled';
  
  // Audit and tracking
  createdBy: string;
  createdAt: Date;
  lastExecuted?: Date;
  executionCount: number;
  successCount: number;
  failureCount: number;
}

export type BusinessRuleCategory = 
  | 'pricing' 
  | 'booking' 
  | 'payment' 
  | 'cancellation' 
  | 'notification' 
  | 'security' 
  | 'compliance' 
  | 'operational';

export interface RuleCondition {
  field: string;
  operator: string;
  value: any;
  dataType: 'string' | 'number' | 'boolean' | 'date' | 'array';
  logicalOperator?: 'AND' | 'OR';
}

export interface RuleAction {
  type: RuleActionType;
  parameters: Record<string, any>;
  errorHandling: 'continue' | 'stop' | 'retry';
  maxRetries?: number;
}

export type RuleActionType = 
  | 'send_notification' 
  | 'update_price' 
  | 'block_booking' 
  | 'apply_discount' 
  | 'log_event' 
  | 'call_webhook' 
  | 'update_status' 
  | 'create_task';

export interface SystemLimits {
  maxLocationsPerOwner: number;
  maxCourtsPerLocation: number;
  maxBookingsPerDay: number;
  maxParticipantsPerBooking: number;
  maxAdvanceBookingDays: number;
  maxCancellationHours: number;
  maxImageSizeMB: number;
  maxVideoSizeMB: number;
  maxImagesPerLocation: number;
  maxSessionDurationHours: number;
  rateLimit: RateLimitConfig;
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  windowSizeMinutes: number;
}

export interface SecurityConfig {
  authentication: AuthenticationConfig;
  authorization: AuthorizationConfig;
  encryption: EncryptionConfig;
  audit: AuditConfig;
  compliance: ComplianceConfig;
}

export interface AuthenticationConfig {
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  requireMFA: boolean;
  passwordPolicy: PasswordPolicy;
  jwtConfig: JWTConfig;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventReuse: number;
  expiryDays: number;
}

export interface JWTConfig {
  secretKey: string;
  expiryMinutes: number;
  refreshExpiryDays: number;
  issuer: string;
  audience: string[];
}

export interface AuthorizationConfig {
  rbacEnabled: boolean;
  defaultRole: string;
  roleHierarchy: RoleHierarchy[];
  resourcePermissions: ResourcePermission[];
}

export interface RoleHierarchy {
  role: string;
  inheritsFrom: string[];
  permissions: string[];
}

export interface ResourcePermission {
  resource: string;
  actions: string[];
  roles: string[];
  conditions?: PermissionCondition[];
}

export interface PermissionCondition {
  field: string;
  operator: string;
  value: any;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  encryptPII: boolean;
  encryptPaymentData: boolean;
  keyRotationDays: number;
  backupKeys: number;
}

export interface AuditConfig {
  enabled: boolean;
  logLevel: 'minimal' | 'standard' | 'detailed' | 'verbose';
  retentionDays: number;
  compressOldLogs: boolean;
  encryptLogs: boolean;
  realTimeAlerting: boolean;
  alertThresholds: AlertThreshold[];
}

export interface AlertThreshold {
  metric: string;
  threshold: number;
  timeWindowMinutes: number;
  alertLevel: 'info' | 'warning' | 'error' | 'critical';
  recipients: string[];
}

export interface ComplianceConfig {
  gdprEnabled: boolean;
  ccpaEnabled: boolean;
  dataRetentionDays: number;
  rightToErasure: boolean;
  dataPortability: boolean;
  consentManagement: ConsentConfig;
  privacyPolicyVersion: string;
  termsOfServiceVersion: string;
}

export interface ConsentConfig {
  requiredConsents: ConsentType[];
  granularConsents: ConsentType[];
  consentExpiryDays: number;
  reconfirmationRequired: boolean;
}

export interface ConsentType {
  type: string;
  purpose: string;
  required: boolean;
  defaultValue: boolean;
  description: string;
}

export interface PerformanceConfig {
  caching: CachingConfig;
  database: DatabaseConfig;
  monitoring: MonitoringConfig;
  optimization: OptimizationConfig;
}

export interface CachingConfig {
  enabled: boolean;
  defaultTTLMinutes: number;
  maxCacheSize: string;
  cacheStrategy: 'LRU' | 'LFU' | 'FIFO';
  distributedCache: boolean;
  cacheWarmup: boolean;
}

export interface DatabaseConfig {
  maxConnections: number;
  connectionTimeoutSeconds: number;
  queryTimeoutSeconds: number;
  enableQueryOptimization: boolean;
  enableIndexHints: boolean;
  readReplicaEnabled: boolean;
}

export interface MonitoringConfig {
  enabled: boolean;
  metricsRetentionDays: number;
  performanceThresholds: PerformanceThreshold[];
  alerting: MonitoringAlerting;
}

export interface PerformanceThreshold {
  metric: string;
  warningThreshold: number;
  criticalThreshold: number;
  unit: string;
}

export interface MonitoringAlerting {
  emailAlerts: boolean;
  smsAlerts: boolean;
  webhookAlerts: boolean;
  slackIntegration: boolean;
  alertRecipients: string[];
}

export interface OptimizationConfig {
  autoScaling: AutoScalingConfig;
  loadBalancing: LoadBalancingConfig;
  compression: CompressionConfig;
}

export interface AutoScalingConfig {
  enabled: boolean;
  minInstances: number;
  maxInstances: number;
  targetCPUUtilization: number;
  targetMemoryUtilization: number;
  scaleUpCooldownMinutes: number;
  scaleDownCooldownMinutes: number;
}

export interface LoadBalancingConfig {
  algorithm: 'round_robin' | 'least_connections' | 'ip_hash' | 'weighted';
  healthCheckPath: string;
  healthCheckIntervalSeconds: number;
  unhealthyThreshold: number;
}

export interface CompressionConfig {
  enabled: boolean;
  minSize: number;
  compressionLevel: number;
  compressImages: boolean;
  compressAPI: boolean;
}

export interface MaintenanceConfig {
  scheduledMaintenance: ScheduledMaintenance[];
  emergencyMode: EmergencyModeConfig;
  backupConfig: BackupConfig;
  healthChecks: HealthCheck[];
}

export interface ScheduledMaintenance {
  id: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: 'database' | 'application' | 'infrastructure' | 'security';
  affectedServices: string[];
  maintenanceMode: boolean;
  notifyUsers: boolean;
  rollbackPlan: string;
}

export interface EmergencyModeConfig {
  enabled: boolean;
  readOnlyMode: boolean;
  disableNonEssentialFeatures: boolean;
  maintenancePageUrl: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  primary: boolean;
}

export interface BackupConfig {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  retentionDays: number;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  offSiteBackup: boolean;
  backupVerification: boolean;
  restoreTestingSchedule: string;
}

export interface HealthCheck {
  name: string;
  endpoint: string;
  method: string;
  expectedStatus: number;
  timeoutSeconds: number;
  intervalMinutes: number;
  failureThreshold: number;
  alertOnFailure: boolean;
  dependencies: string[];
}