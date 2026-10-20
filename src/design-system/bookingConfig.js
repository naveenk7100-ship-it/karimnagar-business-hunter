/**
 * FLASH.Ai Universal Website Design System — Booking Configuration
 * Strict per-business WhatsApp booking configuration using verified numbers from data/discovered_leads.json.
 */

export const BUSINESS_BOOKING_REGISTRY = {
  'hair-lounge-salon-tattoos': {
    businessName: 'Hair Lounge Salon & Tattoo Studio',
    slug: 'hair-lounge-salon-tattoos',
    category: 'Salons, Spas & Tattoo Studios',
    phoneDisplay: '+91 98492 14389',
    waDigits: '919849214389',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Book',
    bookingType: 'Salon Appointment & Style Consultation',
    prefilledMessage: 'Hi Hair Lounge, I would like to book a salon appointment / style consultation in Karimnagar. Please share available time slots.',
    verified: true
  },

  'star-fitness-gym-karimnagar': {
    businessName: 'Star Fitness Gym AC',
    slug: 'star-fitness-gym-karimnagar',
    category: 'Gyms & Fitness Centres',
    phoneDisplay: '+91 79933 55445',
    waDigits: '917993355445',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Join',
    bookingType: 'Trial Pass & Membership Enquiry',
    prefilledMessage: 'Hi Star Fitness Gym, I would like to claim my free 1-day workout trial pass and inquire about AC gym membership packages in Karimnagar.',
    verified: true
  },

  'yashika-photography-karimnagar': {
    businessName: 'Yashika Photography Studio',
    slug: 'yashika-photography-karimnagar',
    category: 'Wedding & Event Photography',
    phoneDisplay: '+91 99894 37210',
    waDigits: '919989437210',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Enquire',
    bookingType: 'Muhurtham Wedding Coverage Availability',
    prefilledMessage: 'Hi Yashika Photography, I would like to check availability and package pricing for our upcoming wedding celebration in Telangana.',
    verified: true
  },

  'pavan-furniture-world': {
    businessName: 'Pavan Furniture World',
    slug: 'pavan-furniture-world',
    category: 'Furniture & Interior Stores',
    phoneDisplay: '+91 94401 22390',
    waDigits: '919440122390',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Quote',
    bookingType: 'Showroom Visit & Teak Catalogue Request',
    prefilledMessage: 'Hi Pavan Furniture World, I would like to request your full living & bedroom solid teak catalogue and showroom pricing in Karimnagar.',
    verified: true
  },

  'sri-chaitanya-coaching-karimnagar': {
    businessName: 'Sri Chaitanya Junior & Coaching College',
    slug: 'sri-chaitanya-coaching-karimnagar',
    category: 'Educational Coaching Centres & Junior Colleges',
    phoneDisplay: '+91 87822 41900',
    waDigits: '918782241900',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Admissions',
    bookingType: 'Academic Counseling & Admissions Enquiry',
    prefilledMessage: 'Hi Sri Chaitanya College, I would like to schedule an in-person academic counseling session regarding IIT-JEE / NEET integrated batches in Karimnagar.',
    verified: true
  },

  'peacock-restaurant-karimnagar': {
    businessName: 'Peacock Multi-Cuisine Family Restaurant',
    slug: 'peacock-restaurant-karimnagar',
    category: 'Restaurants & Dining',
    phoneDisplay: '+91 87822 65432',
    waDigits: '918782265432',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Reserve',
    bookingType: 'Family Table & Banquet Reservation',
    prefilledMessage: 'Hi Peacock Restaurant, I would like to request a family dining table reservation. Please confirm availability.',
    verified: true
  },

  'famous-tattoos-fathepura': {
    businessName: 'Famous Tattoos & Beauty Saloon',
    slug: 'famous-tattoos-fathepura',
    category: 'Salons, Spas & Tattoo Studios',
    phoneDisplay: '+91 99632 87114',
    waDigits: '919963287114',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Book',
    bookingType: 'Tattoo Artist Consultation & Studio Slot',
    prefilledMessage: 'Hi Famous Tattoos, I would like to send my reference tattoo design for a custom size and price estimate in Fathepura, Karimnagar.',
    verified: true
  },

  'sumasri-digital-photo-karimnagar': {
    businessName: 'Sumasri Digital Photo Studio',
    slug: 'sumasri-digital-photo-karimnagar',
    category: 'Wedding & Event Photography',
    phoneDisplay: '+91 98485 52190',
    waDigits: '919848552190',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Studio',
    bookingType: 'Studio Portrait & Photo Restoration Enquiry',
    prefilledMessage: 'Hi Sumasri Digital Studio, I would like to book a studio portrait session / enquire about damaged family photo restoration and framing in Karimnagar.',
    verified: true
  },

  'la-delicious-bakery-karimnagar': {
    businessName: 'La Delicious Bakery & Cafe',
    slug: 'la-delicious-bakery-karimnagar',
    category: 'Bakeries & Cafes',
    phoneDisplay: '+91 87822 34567',
    waDigits: '918782234567',
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Order',
    bookingType: 'Celebration Cake Order & Cafe Enquiry',
    prefilledMessage: 'Hi La Delicious Bakery, I would like to enquire about ordering a custom celebration cake / fresh party snacks in Karimnagar.',
    verified: true
  }
};

/**
 * Resolves the booking configuration for any given lead (existing or future)
 */
export function getBookingConfig(lead) {
  const slug = lead?.slug || '';
  if (BUSINESS_BOOKING_REGISTRY[slug]) {
    const config = BUSINESS_BOOKING_REGISTRY[slug];
    const encoded = encodeURIComponent(config.prefilledMessage);
    return {
      ...config,
      bookingUrl: `https://wa.me/${config.waDigits}?text=${encoded}`
    };
  }

  // Fallback / Generator path for future leads
  const rawPhone = (lead?.phone || '').replace(/[^0-9]/g, '');
  const waDigits = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone || '919849214389';
  const phoneDisplay = lead?.phoneDisplay || lead?.phone || `+${waDigits}`;
  const prefilledMessage = `Hi ${lead?.name || 'Store'}, I would like to enquire regarding your services in Karimnagar.`;
  const encoded = encodeURIComponent(prefilledMessage);

  return {
    businessName: lead?.name || 'Local Business',
    slug,
    category: lead?.category || 'Commercial Services',
    phoneDisplay,
    waDigits,
    bookingLabel: 'WhatsApp Booking',
    compactLabel: 'Book',
    bookingType: 'Direct Customer Enquiry',
    prefilledMessage,
    bookingUrl: `https://wa.me/${waDigits}?text=${encoded}`,
    verified: Boolean(rawPhone)
  };
}
