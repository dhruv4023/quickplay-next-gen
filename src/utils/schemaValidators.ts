// Schema validation utilities
import { Location } from '../schemas/Location/OwnerLocation.schema';
import { SessionTemplate } from '../schemas/SessionTemplate/SessionTemplate';
import { Booking } from '../schemas/Booking/Booking.schema';
import { Owner, Player } from '../schemas/AuthUser/User.schema';

// Location validators
export const validateLocation = (data: any): Location => {
  const requiredFields = ['name', 'ownerId', 'address', 'contactInfo'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  return {
    _id: data._id || '',
    name: data.name,
    description: data.description || '',
    ownerId: data.ownerId,
    address: validateAddress(data.address),
    contactInfo: validateContactInfo(data.contactInfo),
    operatingHours: data.operatingHours || getDefaultOperatingHours(),
    sports: data.sports || [],
    amenities: data.amenities || [],
    courts: data.courts || [],
    images: data.images || [],
    videos: data.videos || [],
    virtualTour: data.virtualTour,
    pricing: data.pricing || getDefaultPricing(),
    policies: data.policies || getDefaultPolicies(),
    status: data.status || 'pending_approval',
    rating: data.rating || getDefaultRating(),
    tags: data.tags || [],
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
};

export const validateAddress = (data: any) => {
  return {
    area: data.area || '',
    addressLine1: data.addressLine1 || '',
    addressLine2: data.addressLine2 || '',
    city: data.city || '',
    state: data.state || '',
    pincode: data.pincode || '',
    country: data.country || 'India',
    coordinates: data.coordinates,
    mapLink: data.mapLink
  };
};

export const validateContactInfo = (data: any) => {
  return {
    phone: data.phone || '',
    email: data.email,
    website: data.website,
    socialMedia: data.socialMedia || {}
  };
};

// Session template validators
export const validateSessionTemplate = (data: any): SessionTemplate => {
  const requiredFields = ['ownerId', 'locationId', 'sportId', 'templateName'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return {
    _id: data._id || '',
    ownerId: data.ownerId,
    locationId: data.locationId,
    sportId: data.sportId,
    templateName: data.templateName,
    description: data.description,
    schedule: validateSessionSchedule(data.schedule),
    courts: data.courts || [],
    capacity: validateSessionCapacity(data.capacity),
    pricing: validateSessionPricing(data.pricing),
    rules: data.rules || [],
    isActive: data.isActive !== false,
    tags: data.tags || [],
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
};

export const validateSessionSchedule = (data: any) => {
  return {
    frequency: data.frequency || 'weekly',
    dayOfWeek: data.dayOfWeek || [],
    startTime: data.startTime || '09:00',
    endTime: data.endTime || '10:00',
    duration: data.duration || 60,
    dateRange: data.dateRange,
    excludeDates: data.excludeDates || [],
    maxAdvanceBooking: data.maxAdvanceBooking || 30,
    minAdvanceBooking: data.minAdvanceBooking || 1
  };
};

export const validateSessionCapacity = (data: any) => {
  return {
    minimum: data.minimum || 1,
    maximum: data.maximum || 10,
    optimal: data.optimal || 6,
    allowWaitlist: data.allowWaitlist !== false,
    waitlistCapacity: data.waitlistCapacity
  };
};

export const validateSessionPricing = (data: any) => {
  return {
    basePrice: data.basePrice || 0,
    currency: data.currency || 'INR',
    priceType: data.priceType || 'per_person',
    dynamicPricing: data.dynamicPricing,
    groupDiscounts: data.groupDiscounts || [],
    memberRate: data.memberRate,
    earlyBirdRate: data.earlyBirdRate,
    lastMinuteRate: data.lastMinuteRate
  };
};

// Booking validators
export const validateBooking = (data: any): Booking => {
  const requiredFields = ['playerId', 'locationId', 'bookingDate', 'startTime', 'endTime'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return {
    _id: data._id || '',
    bookingNumber: data.bookingNumber || generateBookingNumber(),
    playerId: data.playerId,
    playerInfo: validateBookingPlayerInfo(data.playerInfo),
    additionalPlayers: data.additionalPlayers || [],
    locationId: data.locationId,
    sessionId: data.sessionId,
    courtIds: data.courtIds || [],
    bookingDate: new Date(data.bookingDate),
    startTime: data.startTime,
    endTime: data.endTime,
    duration: data.duration || 60,
    timeZone: data.timeZone || 'Asia/Kolkata',
    pricing: validateBookingPricing(data.pricing),
    payment: validatePaymentInfo(data.payment),
    status: data.status || 'pending',
    confirmationMethod: data.confirmationMethod || 'auto',
    specialRequests: data.specialRequests,
    equipment: data.equipment || [],
    services: data.services || [],
    notifications: data.notifications || [],
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    confirmedAt: data.confirmedAt ? new Date(data.confirmedAt) : undefined,
    checkedInAt: data.checkedInAt ? new Date(data.checkedInAt) : undefined,
    completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
    cancelledAt: data.cancelledAt ? new Date(data.cancelledAt) : undefined
  };
};

export const validateBookingPlayerInfo = (data: any) => {
  return {
    name: data.name || '',
    phone: data.phone || '',
    email: data.email,
    emergencyContact: data.emergencyContact,
    medicalConditions: data.medicalConditions || [],
    skillLevel: data.skillLevel
  };
};

export const validateBookingPricing = (data: any) => {
  return {
    basePrice: data.basePrice || 0,
    currency: data.currency || 'INR',
    breakdown: data.breakdown || [],
    subtotal: data.subtotal || 0,
    discounts: data.discounts || [],
    taxes: data.taxes || [],
    total: data.total || 0,
    depositRequired: data.depositRequired,
    fullPaymentDue: data.fullPaymentDue ? new Date(data.fullPaymentDue) : undefined
  };
};

export const validatePaymentInfo = (data: any) => {
  return {
    totalAmount: data.totalAmount || 0,
    paidAmount: data.paidAmount || 0,
    pendingAmount: data.pendingAmount || 0,
    currency: data.currency || 'INR',
    transactions: data.transactions || [],
    paymentMethods: data.paymentMethods || [],
    selectedMethod: data.selectedMethod,
    refunds: data.refunds || [],
    refundableAmount: data.refundableAmount || 0
  };
};

// User validators
export const validateOwner = (data: any): Owner => {
  return {
    _id: data._id || '',
    name: data.name || '',
    email: data.email,
    phone: data.phone || '',
    avatar: data.avatar,
    isActive: data.isActive !== false,
    businessName: data.businessName,
    businessType: data.businessType,
    businessLicense: data.businessLicense,
    locations: data.locations || [],
    subscriptionPlan: data.subscriptionPlan || 'free',
    subscriptionExpiry: data.subscriptionExpiry ? new Date(data.subscriptionExpiry) : undefined,
    totalRevenue: data.totalRevenue || 0,
    isVerified: data.isVerified === true,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
};

export const validatePlayer = (data: any): Player => {
  return {
    _id: data._id || '',
    name: data.name || '',
    email: data.email,
    phone: data.phone || '',
    avatar: data.avatar,
    isActive: data.isActive !== false,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    favoriteSports: data.favoriteSports || [],
    skillLevel: data.skillLevel || 'beginner',
    preferredGameTime: data.preferredGameTime,
    totalGamesPlayed: data.totalGamesPlayed || 0,
    totalHoursPlayed: data.totalHoursPlayed || 0,
    achievements: data.achievements || [],
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  };
};

// Utility functions
const generateBookingNumber = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BK${timestamp}${random}`.toUpperCase();
};

const getDefaultOperatingHours = () => {
  const defaultDay = { isOpen: true, openTime: '06:00', closeTime: '22:00', breaks: [] };
  return {
    monday: defaultDay,
    tuesday: defaultDay,
    wednesday: defaultDay,
    thursday: defaultDay,
    friday: defaultDay,
    saturday: defaultDay,
    sunday: defaultDay,
    holidays: []
  };
};

const getDefaultPricing = () => ({
  currency: 'INR',
  defaultHourlyRate: 500,
  peakHours: [],
  peakHourMultiplier: 1.2,
  seasonalRates: [],
  discounts: [],
  membershipPlans: []
});

const getDefaultPolicies = () => ({
  cancellation: {
    allowCancellation: true,
    freeHours: 24,
    penaltyPercentage: 10,
    nonRefundableHours: 2
  },
  refund: {
    allowRefunds: true,
    processingTime: 5,
    conditions: []
  },
  rules: [],
  ageRestrictions: []
});

const getDefaultRating = () => ({
  overall: 0,
  totalReviews: 0,
  breakdown: {
    facilities: 0,
    cleanliness: 0,
    staff: 0,
    value: 0,
    accessibility: 0
  },
  recentReviews: []
});