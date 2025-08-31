// Booking and reservation schemas
export interface Booking {
  _id: string;
  bookingNumber: string;
  
  // Participants
  playerId: string;
  playerInfo: BookingPlayerInfo;
  additionalPlayers?: AdditionalPlayer[];
  
  // Location and session details
  locationId: string;
  sessionId?: string; // for template-based bookings
  courtIds: string[];
  
  // Timing
  bookingDate: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  timeZone: string;
  
  // Pricing and payment
  pricing: BookingPricing;
  payment: PaymentInfo;
  
  // Status and lifecycle
  status: BookingStatus;
  confirmationMethod: 'auto' | 'manual' | 'pending';
  
  // Special requirements
  specialRequests?: string;
  equipment?: BookedEquipment[];
  services?: BookedService[];
  
  // Communication
  notifications: NotificationHistory[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  checkedInAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed' 
  | 'checked_in' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show'
  | 'refunded';

export interface BookingPlayerInfo {
  name: string;
  phone: string;
  email?: string;
  emergencyContact?: EmergencyContact;
  medicalConditions?: string[];
  skillLevel?: string;
}

export interface AdditionalPlayer {
  name: string;
  phone?: string;
  email?: string;
  relationship: 'friend' | 'family' | 'colleague' | 'team_member';
  skillLevel?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// Pricing breakdown
export interface BookingPricing {
  basePrice: number;
  currency: string;
  
  // Detailed breakdown
  breakdown: PriceBreakdown[];
  
  // Totals
  subtotal: number;
  discounts: AppliedDiscount[];
  taxes: TaxBreakdown[];
  total: number;
  
  // Payment terms
  depositRequired?: number;
  fullPaymentDue?: Date;
}

export interface PriceBreakdown {
  item: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'court' | 'equipment' | 'service' | 'fee';
}

export interface AppliedDiscount {
  code?: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  amount: number;
  reason: string;
}

export interface TaxBreakdown {
  name: string;
  rate: number;
  amount: number;
  included: boolean;
}

// Payment information
export interface PaymentInfo {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  currency: string;
  
  // Payment methods and transactions
  transactions: PaymentTransaction[];
  
  // Payment options
  paymentMethods: PaymentMethod[];
  selectedMethod?: string;
  
  // Refund information
  refunds: RefundTransaction[];
  refundableAmount: number;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  gateway: string;
  gatewayTransactionId?: string;
  failureReason?: string;
  processedAt?: Date;
  settledAt?: Date;
}

export type PaymentMethod = 
  | 'credit_card' 
  | 'debit_card' 
  | 'net_banking' 
  | 'upi' 
  | 'wallet' 
  | 'cash' 
  | 'bank_transfer';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'cancelled' 
  | 'refunded' 
  | 'partially_refunded';

export interface RefundTransaction {
  id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'processed' | 'failed';
  initiatedBy: string;
  processedAt?: Date;
  gatewayRefundId?: string;
}

// Equipment and services
export interface BookedEquipment {
  equipmentId: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  condition?: string;
  specialInstructions?: string;
}

export interface BookedService {
  serviceId: string;
  name: string;
  description: string;
  price: number;
  provider?: string;
  scheduledTime?: string;
}

// Notifications and communication
export interface NotificationHistory {
  type: NotificationType;
  method: 'sms' | 'email' | 'push' | 'whatsapp';
  recipient: string;
  content: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  sentAt: Date;
  deliveredAt?: Date;
  errorMessage?: string;
}

export type NotificationType = 
  | 'booking_confirmation'
  | 'booking_reminder' 
  | 'payment_reminder' 
  | 'check_in_reminder' 
  | 'cancellation' 
  | 'modification' 
  | 'completion' 
  | 'feedback_request';

// Booking modifications and cancellations
export interface BookingModification {
  id: string;
  bookingId: string;
  type: 'time_change' | 'court_change' | 'participant_change' | 'service_change';
  requestedBy: string;
  requestedAt: Date;
  
  // Change details
  originalDetails: any;
  requestedDetails: any;
  
  // Status and approval
  status: 'pending' | 'approved' | 'rejected' | 'auto_approved';
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  
  // Pricing impact
  priceChange?: number;
  additionalCharges?: PriceBreakdown[];
}

export interface BookingCancellation {
  bookingId: string;
  reason: string;
  cancelledBy: string;
  cancellationType: 'player' | 'owner' | 'system' | 'weather' | 'maintenance';
  cancellationPolicy: CancellationPolicyApplied;
  refundAmount: number;
  penaltyAmount: number;
  cancellationFee: number;
  processingTime: number; // days
  cancelledAt: Date;
}

export interface CancellationPolicyApplied {
  hoursBeforeBooking: number;
  policyTier: string;
  refundPercentage: number;
  penaltyPercentage: number;
  flatFee: number;
}