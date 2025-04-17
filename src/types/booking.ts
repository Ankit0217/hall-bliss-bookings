
export interface Booking {
  id: string;
  user_id: string;
  venue_id: string;
  event_date: string;
  start_time: string;
  end_time: string;
  guest_count: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  userEmail?: string;
  venueName?: string;
}
