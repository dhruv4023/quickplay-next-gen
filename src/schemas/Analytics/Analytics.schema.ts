// Analytics and reporting schemas
export interface DashboardMetrics {
  ownerId: string;
  period: AnalyticsPeriod;
  generatedAt: Date;
  
  // Key Performance Indicators
  kpis: KPIMetrics;
  
  // Revenue analytics
  revenue: RevenueAnalytics;
  
  // Booking analytics
  bookings: BookingAnalytics;
  
  // Operational analytics
  operations: OperationalAnalytics;
  
  // Customer analytics
  customers: CustomerAnalytics;
  
  // Comparative data
  comparisons: ComparativeAnalytics;
}

export interface AnalyticsPeriod {
  startDate: Date;
  endDate: Date;
  type: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
}

// Key Performance Indicators
export interface KPIMetrics {
  totalRevenue: MetricValue;
  totalBookings: MetricValue;
  averageBookingValue: MetricValue;
  courtUtilization: MetricValue;
  customerSatisfaction: MetricValue;
  repeatCustomerRate: MetricValue;
  cancellationRate: MetricValue;
  noShowRate: MetricValue;
}

export interface MetricValue {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  target?: number;
}

// Revenue Analytics
export interface RevenueAnalytics {
  total: RevenueBreakdown;
  byTimeOfDay: TimeBasedRevenue[];
  byDayOfWeek: DayBasedRevenue[];
  bySport: SportRevenue[];
  byCourt: CourtRevenue[];
  byBookingType: BookingTypeRevenue[];
  projections: RevenueProjection;
}

export interface RevenueBreakdown {
  gross: number;
  net: number;
  refunds: number;
  discounts: number;
  taxes: number;
  fees: number;
}

export interface TimeBasedRevenue {
  hour: number;
  revenue: number;
  bookings: number;
  averageValue: number;
}

export interface DayBasedRevenue {
  day: string;
  revenue: number;
  bookings: number;
  utilization: number;
}

export interface SportRevenue {
  sportId: string;
  sportName: string;
  revenue: number;
  bookings: number;
  averageValue: number;
  growth: number;
}

export interface CourtRevenue {
  courtId: string;
  courtName: string;
  revenue: number;
  bookings: number;
  utilization: number;
  averageValue: number;
}

export interface BookingTypeRevenue {
  type: 'individual' | 'group' | 'tournament' | 'membership';
  revenue: number;
  count: number;
  averageValue: number;
}

export interface RevenueProjection {
  nextMonth: number;
  nextQuarter: number;
  confidence: number;
  factors: ProjectionFactor[];
}

export interface ProjectionFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
}

// Booking Analytics
export interface BookingAnalytics {
  total: BookingMetrics;
  byStatus: BookingStatusMetrics[];
  byTimeSlot: TimeSlotMetrics[];
  byAdvanceBooking: AdvanceBookingMetrics[];
  seasonal: SeasonalBookingMetrics[];
  cancellations: CancellationAnalytics;
}

export interface BookingMetrics {
  totalBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  noShows: number;
  averageBookingValue: number;
  averageDuration: number;
}

export interface BookingStatusMetrics {
  status: BookingStatus;
  count: number;
  percentage: number;
  revenue: number;
}

export interface TimeSlotMetrics {
  timeSlot: string;
  bookings: number;
  revenue: number;
  utilization: number;
  averageOccupancy: number;
}

export interface AdvanceBookingMetrics {
  daysInAdvance: number;
  bookings: number;
  percentage: number;
  averageValue: number;
}

export interface SeasonalBookingMetrics {
  month: number;
  year: number;
  bookings: number;
  revenue: number;
  growth: number;
}

export interface CancellationAnalytics {
  totalCancellations: number;
  cancellationRate: number;
  reasonBreakdown: CancellationReasonMetrics[];
  timingAnalysis: CancellationTimingMetrics[];
  financialImpact: CancellationFinancialImpact;
}

export interface CancellationReasonMetrics {
  reason: string;
  count: number;
  percentage: number;
  averageRefund: number;
}

export interface CancellationTimingMetrics {
  hoursBeforeBooking: number;
  count: number;
  refundAmount: number;
  penaltyAmount: number;
}

export interface CancellationFinancialImpact {
  totalLostRevenue: number;
  totalRefunds: number;
  totalPenalties: number;
  netLoss: number;
}

// Operational Analytics
export interface OperationalAnalytics {
  courtUtilization: CourtUtilizationMetrics;
  staffProductivity: StaffProductivityMetrics;
  maintenanceMetrics: MaintenanceMetrics;
  energyConsumption: EnergyMetrics;
  customerFlow: CustomerFlowMetrics;
}

export interface CourtUtilizationMetrics {
  overall: number;
  byCourt: CourtSpecificUtilization[];
  byTimeOfDay: HourlyUtilization[];
  peakHours: string[];
  offPeakHours: string[];
  recommendations: UtilizationRecommendation[];
}

export interface CourtSpecificUtilization {
  courtId: string;
  courtName: string;
  utilization: number;
  revenue: number;
  maintenanceHours: number;
  issues: string[];
}

export interface HourlyUtilization {
  hour: number;
  utilization: number;
  bookings: number;
  revenue: number;
}

export interface UtilizationRecommendation {
  type: 'pricing' | 'promotion' | 'scheduling' | 'maintenance';
  description: string;
  expectedImpact: string;
  priority: 'low' | 'medium' | 'high';
}

export interface StaffProductivityMetrics {
  totalStaff: number;
  hoursWorked: number;
  customersServed: number;
  averageServiceTime: number;
  customerSatisfaction: number;
  incidentCount: number;
}

export interface MaintenanceMetrics {
  scheduledMaintenance: number;
  emergencyRepairs: number;
  totalDowntime: number;
  maintenanceCost: number;
  equipmentReliability: number;
  preventiveMaintenanceRatio: number;
}

export interface EnergyMetrics {
  totalConsumption: number;
  costPerHour: number;
  peakUsageHours: string[];
  efficiency: number;
  costSavings: number;
}

export interface CustomerFlowMetrics {
  peakHours: string[];
  averageWaitTime: number;
  checkInTime: number;
  serviceTime: number;
  totalVisitDuration: number;
  customerSatisfaction: number;
}

// Customer Analytics
export interface CustomerAnalytics {
  demographics: CustomerDemographics;
  behavior: CustomerBehavior;
  retention: RetentionMetrics;
  satisfaction: SatisfactionMetrics;
  segmentation: CustomerSegmentation[];
}

export interface CustomerDemographics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  ageDistribution: AgeDistribution[];
  genderDistribution: GenderDistribution;
  locationDistribution: LocationDistribution[];
}

export interface AgeDistribution {
  ageRange: string;
  count: number;
  percentage: number;
  averageSpend: number;
}

export interface GenderDistribution {
  male: number;
  female: number;
  other: number;
  notSpecified: number;
}

export interface LocationDistribution {
  area: string;
  customerCount: number;
  averageDistance: number;
  averageSpend: number;
}

export interface CustomerBehavior {
  averageBookingsPerCustomer: number;
  averageSpendPerCustomer: number;
  preferredTimeSlots: string[];
  preferredSports: string[];
  bookingPatterns: BookingPattern[];
  loyaltyMetrics: LoyaltyMetrics;
}

export interface BookingPattern {
  pattern: string;
  customerCount: number;
  averageValue: number;
  frequency: string;
}

export interface LoyaltyMetrics {
  averageLifetime: number;
  lifetimeValue: number;
  referralRate: number;
  membershipConversionRate: number;
}

export interface RetentionMetrics {
  overallRetentionRate: number;
  newCustomerRetention: number;
  churnRate: number;
  winbackRate: number;
  cohortAnalysis: CohortRetention[];
}

export interface CohortRetention {
  cohort: string;
  month1: number;
  month3: number;
  month6: number;
  month12: number;
}

export interface SatisfactionMetrics {
  overallScore: number;
  npsScore: number;
  reviewStats: ReviewStats;
  complaintAnalysis: ComplaintAnalysis;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: RatingDistribution[];
  responseRate: number;
  averageResponseTime: number;
}

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

export interface ComplaintAnalysis {
  totalComplaints: number;
  categoryBreakdown: ComplaintCategory[];
  resolutionTime: number;
  resolutionRate: number;
}

export interface ComplaintCategory {
  category: string;
  count: number;
  averageResolutionTime: number;
  satisfactionScore: number;
}

export interface CustomerSegmentation {
  segmentName: string;
  customerCount: number;
  characteristics: string[];
  averageValue: number;
  retentionRate: number;
  recommendations: string[];
}

// Comparative Analytics
export interface ComparativeAnalytics {
  periodComparison: PeriodComparison;
  industryBenchmark: IndustryBenchmark;
  competitorAnalysis: CompetitorAnalysis;
  locationComparison: LocationComparison[];
}

export interface PeriodComparison {
  metric: string;
  currentPeriod: number;
  previousPeriod: number;
  change: number;
  changePercentage: number;
  significance: 'significant' | 'minor' | 'negligible';
}

export interface IndustryBenchmark {
  metric: string;
  yourValue: number;
  industryAverage: number;
  topQuartile: number;
  position: 'top' | 'above_average' | 'average' | 'below_average';
}

export interface CompetitorAnalysis {
  competitorName: string;
  pricing: PricingComparison;
  services: ServiceComparison;
  ratings: RatingComparison;
  marketShare: number;
}

export interface PricingComparison {
  yourPrice: number;
  competitorPrice: number;
  difference: number;
  position: 'higher' | 'competitive' | 'lower';
}

export interface ServiceComparison {
  serviceType: string;
  youOffer: boolean;
  competitorOffers: boolean;
  advantage: 'yours' | 'competitors' | 'equal';
}

export interface RatingComparison {
  yourRating: number;
  competitorRating: number;
  difference: number;
  reviewCount: number;
}

export interface LocationComparison {
  locationId: string;
  locationName: string;
  revenue: number;
  bookings: number;
  utilization: number;
  rating: number;
  rank: number;
}