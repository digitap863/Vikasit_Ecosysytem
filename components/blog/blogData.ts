// Shared data types for blog components
export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export interface SidebarCategory {
  name: string;
  count: number;
}

export interface PopularPost {
  id: number;
  title: string;
  date: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    category: "waste management",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/project1.png",
  },
  {
    id: 2,
    title: "THE IMPACT OF FOOD WASTE ON GLOBAL WARMING AND CLIMATE CHANGE",
    category: "sustainability",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/project2.png",
  },
  {
    id: 3,
    title: "THE 7R OF WASTE MANAGEMENT: A VISIONARY FRAMEWORK FOR REGENERATIVE LEADERSHIP READ NOW",
    category: "waste management",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/project3.png",
  },
  {
    id: 4,
    title: "7 POWERFUL COMPOST BENEFITS: WHY COMPOST IS TRULY GARDEN GOLD",
    category: "Composting",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/tree.png",
  },
];

export const SIDEBAR_CATEGORIES: SidebarCategory[] = [
  { name: "Solar Energy", count: 3 },
  { name: "Technology", count: 5 },
  { name: "Tips & Guides", count: 10 },
  { name: "Company News", count: 10 },
];

export const POPULAR_POSTS: PopularPost[] = [
  {
    id: 101,
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    date: "May 14, 2026",
    image: "/project1.png",
  },
  {
    id: 102,
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    date: "May 14, 2026",
    image: "/project2.png",
  },
  {
    id: 103,
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    date: "May 14, 2026",
    image: "/project3.png",
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "waste management",
  "Composting",
  "sustainability",
  "Carbon credits",
  "News & Updates",
];
