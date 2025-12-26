export interface Project {
  id: string;
  name: string;
  location: string;
  price: string;
  description: string;
  features: string[];
  mockup3dType: 'tower' | 'villa' | 'penthouse';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "The Meridian Tower",
    location: "Downtown Manhattan, NY",
    price: "$4,500,000",
    description: "An architectural masterpiece rising 45 stories above the Manhattan skyline. Floor-to-ceiling windows offer panoramic views of Central Park and the Hudson River.",
    features: ["Smart Home Integration", "Private Elevator", "Rooftop Terrace", "Concierge Service"],
    mockup3dType: "tower",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3800,
  },
  {
    id: "2",
    name: "Villa Serenità",
    location: "Beverly Hills, CA",
    price: "$12,800,000",
    description: "A Mediterranean-inspired estate nestled in the prestigious hills of Beverly Hills. Lush gardens, infinity pool, and unparalleled privacy define this sanctuary.",
    features: ["Wine Cellar", "Home Theater", "Guest House", "Olympic Pool"],
    mockup3dType: "villa",
    bedrooms: 7,
    bathrooms: 9,
    sqft: 12500,
  },
  {
    id: "3",
    name: "Azure Penthouse",
    location: "Miami Beach, FL",
    price: "$8,200,000",
    description: "The crown jewel of Miami's oceanfront living. This tri-level penthouse offers 360-degree views of the Atlantic, private beach access, and world-class amenities.",
    features: ["Helipad Access", "Private Marina", "Spa & Wellness", "24/7 Security"],
    mockup3dType: "penthouse",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6200,
  },
];
