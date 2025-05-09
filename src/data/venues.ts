// Venue data with updated interface

export interface Venue {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  priceRange: string;
  capacity: {
    min: number;
    max: number;
  };
  location: string;
  address: string;
  rating: number;
  reviews: number;
  featuredImage: string;
  images: string[];
  features: string[];
  amenities: string[];
  availability: boolean;
}

export const venues: Venue[] = [
  {
    id: 1,
    uuid: 'e29c4a7e-9c0b-4996-a984-8649c5981b15',
    name: 'The Grand Ballroom',
    slug: 'grand-ballroom',
    description: 'An elegant and spacious ballroom with crystal chandeliers and marble floors, perfect for large wedding celebrations.',
    shortDescription: 'Elegant ballroom with crystal chandeliers and marble floors.',
    priceRange: '$5,000 - $10,000',
    capacity: {
      min: 100,
      max: 500
    },
    location: 'Downtown',
    address: '123 Main Street, Downtown',
    rating: 4.9,
    reviews: 124,
    featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521139174183-9c1018928cbb?q=80&w=1481&auto=format&fit=crop'
    ],
    features: ['Bridal Suite', 'Catering Services', 'Dance Floor', 'Lighting/Sound', 'Parking', 'Wheelchair Access'],
    amenities: ['Bridal Suite', 'Catering Services', 'Dance Floor', 'Lighting/Sound', 'Parking', 'Wheelchair Access'],
    availability: true
  },
  {
    id: 2,
    uuid: '5f9d1e6c-93e7-4d44-8d70-32b7a775c348',
    name: 'Seaside Terrace',
    slug: 'seaside-terrace',
    description: 'A beautiful outdoor venue with panoramic ocean views, perfect for sunset ceremonies and receptions.',
    shortDescription: 'Beautiful outdoor venue with panoramic ocean views.',
    priceRange: '$6,000 - $12,000',
    capacity: {
      min: 50,
      max: 200
    },
    location: 'Coastal Area',
    address: '456 Shore Drive, Coastal Area',
    rating: 4.8,
    reviews: 98,
    featuredImage: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?q=80&w=1470&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519671482248-7c6a3c66fecb?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544124499-58912edb4b6a?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517722014278-c256a91a6fba?q=80&w=1470&auto=format&fit=crop'
    ],
    features: ['Ocean View', 'Outdoor Ceremony Space', 'Covered Reception Area', 'In-house Catering', 'Bar Service', 'Setup & Cleanup'],
    amenities: ['Ocean View', 'Outdoor Ceremony Space', 'Covered Reception Area', 'In-house Catering', 'Bar Service', 'Setup & Cleanup'],
    availability: true
  },
  {
    id: 3,
    uuid: '7c538a02-d34d-4f9a-bd46-06a9315b20d9',
    name: 'Rustic Vineyard Estate',
    slug: 'rustic-vineyard',
    description: 'A charming vineyard setting with rustic barns, rolling hills, and beautiful gardens for an intimate countryside wedding.',
    priceRange: '$4,000 - $8,000',
    capacity: {
      min: 50,
      max: 150
    },
    location: 'Wine Country',
    address: '789 Vineyard Lane, Wine Country',
    rating: 4.7,
    reviews: 112,
    featuredImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1470&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1472&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505944428981-85149b2989e2?q=80&w=1470&auto=format&fit=crop'
    ],
    features: ['Vineyard Views', 'Indoor & Outdoor Spaces', 'Wine Tasting', 'Accommodation Available', 'Pet Friendly', 'Photo Opportunities'],
    amenities: ['Vineyard Views', 'Indoor & Outdoor Spaces', 'Wine Tasting', 'Accommodation Available', 'Pet Friendly', 'Photo Opportunities'],
    availability: true
  },
  {
    id: 4,
    uuid: 'bf45a24f-4b09-4c9c-91d2-7a7bcfb3b8a2',
    name: 'Historic Mansion',
    slug: 'historic-mansion',
    description: 'An elegant 19th-century mansion with manicured gardens, ornate architecture, and timeless charm for a sophisticated wedding.',
    priceRange: '$7,000 - $15,000',
    capacity: {
      min: 50,
      max: 250
    },
    location: 'Heritage District',
    address: '321 Mansion Avenue, Heritage District',
    rating: 4.9,
    reviews: 135,
    featuredImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502786129293-79981df4e689?q=80&w=1472&auto=format&fit=crop'
    ],
    features: ['Historic Architecture', 'Grand Staircase', 'Multiple Event Spaces', 'Bridal Suite', 'Gourmet Catering', 'Valet Parking'],
    amenities: ['Historic Architecture', 'Grand Staircase', 'Multiple Event Spaces', 'Bridal Suite', 'Gourmet Catering', 'Valet Parking'],
    availability: true
  },
  {
    id: 5,
    uuid: '9a208d5e-8c62-4958-954b-8f91d82c0837',
    name: 'Mountain Lodge Retreat',
    slug: 'mountain-lodge',
    description: 'A cozy mountain lodge with stunning natural surroundings, perfect for an intimate wedding with breathtaking views.',
    priceRange: '$3,500 - $7,000',
    capacity: {
      min: 50,
      max: 100
    },
    location: 'Mountain Range',
    address: '654 Lodge Road, Mountain Range',
    rating: 4.6,
    reviews: 102,
    featuredImage: 'https://images.unsplash.com/photo-1470290378973-039446646d34?q=80&w=1470&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1470290378973-039446646d34?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542592997-221a9e3d01c7?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508950914441-2165b1c63c8b?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542729114-128966940e1c?q=80&w=1470&auto=format&fit=crop'
    ],
    features: ['Mountain Views', 'Fireplace', 'Outdoor Ceremony Area', 'Indoor Reception', 'On-site Accommodations', 'Hiking Trails'],
    amenities: ['Mountain Views', 'Fireplace', 'Outdoor Ceremony Area', 'Indoor Reception', 'On-site Accommodations', 'Hiking Trails'],
    availability: true
  },
  {
    id: 6,
    uuid: '2c407b9d-67e9-4fc5-8c3c-89e4923ceaa4',
    name: 'Urban Rooftop Loft',
    slug: 'urban-rooftop',
    description: 'A modern, industrial-chic loft space with a rooftop terrace offering spectacular city views for a contemporary wedding.',
    priceRange: '$4,500 - $9,000',
    capacity: {
      min: 50,
      max: 180
    },
    location: 'City Center',
    address: '987 Loft Street, City Center',
    rating: 4.7,
    reviews: 120,
    featuredImage: 'https://images.unsplash.com/photo-1519671482248-7c6a3c66fecb?q=80&w=1470&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519671482248-7c6a3c66fecb?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1525&auto=format&fit=crop'
    ],
    features: ['City Skyline Views', 'Indoor/Outdoor Spaces', 'Modern Decor', 'Sound System', 'Customizable Lighting', 'Event Coordinator'],
    amenities: ['City Skyline Views', 'Indoor/Outdoor Spaces', 'Modern Decor', 'Sound System', 'Customizable Lighting', 'Event Coordinator'],
    availability: true
  }
];
