
export interface Venue {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  capacity: {
    min: number;
    max: number;
  };
  priceRange: string;
  images: string[];
  features: string[];
  address: string;
  location: string;
  rating: number;
  reviews: number;
}

export const venues: Venue[] = [
  {
    id: 1,
    name: "The Grand Ballroom",
    slug: "grand-ballroom",
    description: "The Grand Ballroom is our most opulent and spacious venue, featuring crystal chandeliers, marble flooring, and floor-to-ceiling windows that bathe the space in natural light. The elegant decor and high ceilings create a sense of grandeur perfect for couples seeking a lavish wedding celebration. The venue includes a separate cocktail area, bridal suite, and access to our manicured gardens for photos.",
    shortDescription: "An opulent ballroom with crystal chandeliers and marble flooring, perfect for grand celebrations.",
    capacity: {
      min: 150,
      max: 500
    },
    priceRange: "$10,000 - $20,000",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741347686-c1e331bd7f18?q=80&w=1169&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=1170&auto=format&fit=crop"
    ],
    features: [
      "Crystal chandeliers",
      "Marble dance floor",
      "State-of-the-art sound system",
      "Bridal suite",
      "Outdoor garden access",
      "Full-service bar",
      "Customizable lighting",
      "Grand staircase"
    ],
    address: "123 Elegance Way, Beverly Hills, CA 90210",
    location: "Beverly Hills",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: "Seaside Terrace",
    slug: "seaside-terrace",
    description: "Exchange vows with the sound of waves and breathtaking ocean views as your backdrop. Our Seaside Terrace offers an intimate open-air setting perched on coastal cliffs, with a covered reception area featuring retractable glass walls to bring the outside in. This venue is perfect for couples who dream of a beach wedding without getting sand between their toes. The terrace can be transformed from a ceremony space to a reception area, allowing your guests to enjoy the coastal beauty throughout your celebration.",
    shortDescription: "A breathtaking oceanfront venue with panoramic sea views and fresh coastal breezes.",
    capacity: {
      min: 50,
      max: 180
    },
    priceRange: "$8,000 - $15,000",
    images: [
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1168&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527722123791-52e8f7713321?q=80&w=1915&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1173&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?q=80&w=1170&auto=format&fit=crop"
    ],
    features: [
      "Panoramic ocean views",
      "Outdoor ceremony space",
      "Covered reception area",
      "Retractable glass walls",
      "Private beach access",
      "Sunset photo opportunities",
      "Cooling sea breeze",
      "In-house catering"
    ],
    address: "789 Ocean View Drive, Malibu, CA 90265",
    location: "Malibu",
    rating: 4.9,
    reviews: 128
  },
  {
    id: 3,
    name: "Vineyard Estate",
    slug: "vineyard-estate",
    description: "Nestled among rolling hills and rows of grapevines, our Vineyard Estate offers rustic elegance in a picturesque countryside setting. The renovated 19th-century barn features exposed wooden beams, wrought iron chandeliers, and large barn doors that open to reveal stunning vineyard views. This venue includes a ceremony site in the heart of the vineyard, a spacious reception barn, and access to our wine cellar for unique photo opportunities. The Vineyard Estate is ideal for couples seeking a charming, rustic-chic atmosphere with the warmth of wine country hospitality.",
    shortDescription: "A rustic-elegant estate surrounded by vineyards and rolling hills, perfect for wine lovers.",
    capacity: {
      min: 80,
      max: 250
    },
    priceRange: "$7,500 - $14,000",
    images: [
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1472&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1974&auto=format&fit=crop"
    ],
    features: [
      "Vineyard ceremony site",
      "Renovated historic barn",
      "Wine tasting option",
      "Exclusive wine bottles for guests",
      "Outdoor fire pits",
      "Vineyard tours",
      "Farm-to-table dining options",
      "On-site lodging available"
    ],
    address: "456 Vineyard Lane, Napa, CA 94558",
    location: "Napa Valley",
    rating: 4.7,
    reviews: 94
  },
  {
    id: 4,
    name: "Garden Pavilion",
    slug: "garden-pavilion",
    description: "Our Garden Pavilion is a botanical paradise featuring lush gardens, colorful flowerbeds, and a stunning glass-walled pavilion. This venue offers the beauty of an outdoor wedding with the comfort and security of an indoor space. The transparent walls and ceiling allow natural light to flood the space while providing protection from the elements. Surrounded by meticulously landscaped gardens with fountains and pathways, this venue creates a magical setting for both ceremonies and receptions. The Garden Pavilion is perfect for couples who want to be immersed in natural beauty without worrying about weather conditions.",
    shortDescription: "A glass pavilion surrounded by lush gardens, fountains and blooming flowers.",
    capacity: {
      min: 60,
      max: 200
    },
    priceRange: "$6,000 - $12,000",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503789146722-cf137a3c0fea?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1667923158465-0d2e9fb24d57?q=80&w=2002&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508901129611-5a5e65c50f18?q=80&w=987&auto=format&fit=crop"
    ],
    features: [
      "Glass-walled pavilion",
      "Botanical gardens",
      "Water features",
      "Garden path lighting",
      "Climate controlled",
      "Indoor/outdoor flexibility",
      "Butterfly garden",
      "Photography spots throughout"
    ],
    address: "321 Botanical Avenue, Pasadena, CA 91105",
    location: "Pasadena",
    rating: 4.6,
    reviews: 82
  }
];
