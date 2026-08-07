// Shared data types for blog components
export interface BlogSection {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPostContent {
  intro: string;
  sections: BlogSection[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content?: BlogPostContent;
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
    slug: "building-a-greener-future-through-effective-waste-management",
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    category: "waste management",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/project1.webp",
    content: {
      intro:
        "Every day, we throw away tons of waste — from food scraps to packaging material — without thinking where it all ends up. Most of it finds its way into landfills, releasing harmful gases and polluting our soil and water. The truth is, how we handle waste today will define the kind of planet we leave behind tomorrow. That's why Waste Management isn't just an environmental practice anymore — it's a collective responsibility, and a path toward a greener, more sustainable future.",
      sections: [
        {
          title: "UNDERSTANDING WASTE MANAGEMENT",
          paragraphs: [
            "At its core, Waste Management is about handling waste in a way that minimizes harm and maximizes value. It starts with small, conscious choices — reducing what we throw away, reusing whatever possible, and recycling effectively.",
            "The well-known waste management hierarchy — Reduce, Reuse, Recycle, Recover, Dispose — serves as the backbone of sustainability. When communities and organizations follow this approach, waste ceases to be more than a problem; it becomes an opportunity for innovation and renewal.",
          ],
        },
        {
          title: "UNDERSTANDING ORGANIC WASTE AND ITS IMPACT",
          subtitle: "WHAT IS ORGANIC WASTE?",
          paragraphs: [
            "Organic waste refers to biodegradable materials such as kitchen food, garden trimmings, and paper. It might seem harmless, but when this waste decomposes in landfills, it becomes a serious environmental concern.",
          ],
        },
        {
          subtitle: "THE HIDDEN ENVIRONMENTAL CHALLENGE",
          paragraphs: [
            "In landfills, organic waste decomposes without oxygen, emitting methane gas — a greenhouse gas that is 28 times more potent than carbon dioxide. Methane contributes significantly to global warming, while leachate from decomposing waste contaminates groundwater and damages soil health.",
            "When organic waste is managed properly, however, it transforms from a pollutant into a powerful resource — enriching soil, producing clean energy, and closing the loop of sustainability.",
          ],
        },
        {
          title: "THE URGENT NEED FOR SUSTAINABLE WASTE SOLUTIONS",
          subtitle: "STARTLING STATISTICS",
          bullets: [
            "India produces over 62 million tonnes of organic waste each year, according to the Ministry of Environment, Forest and Climate Change.",
            "Yet less than 30% of this waste is processed scientifically or recycled.",
            "Globally, food and organic waste are responsible for 8–10% of total greenhouse gas emissions, as reported by the United Nations Environment Programme (UNEP).",
            "These numbers make it clear: adopting efficient Waste Management systems isn't optional anymore — it's essential for both environmental protection and public health.",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    slug: "the-impact-of-food-waste-on-global-warming-and-climate-change",
    title: "THE IMPACT OF FOOD WASTE ON GLOBAL WARMING AND CLIMATE CHANGE",
    category: "sustainability",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/project2.webp",
    content: {
      intro:
        "Food waste is one of the most critical yet overlooked drivers of climate change. Every year, millions of tonnes of edible food are wasted, straining natural resources and generating high levels of greenhouse gases.",
      sections: [
        {
          title: "THE LINK BETWEEN FOOD WASTE AND EMISSIONS",
          paragraphs: [
            "When food decomposes anaerobically in landfills, it releases methane, a potent greenhouse gas. Furthermore, resources used to grow, transport, and package that food are completely squandered.",
          ],
        },
        {
          title: "STRATEGIES FOR MITIGATION",
          paragraphs: [
            "By implementing decentralized composting and smart food distribution networks, communities can reduce carbon footprints significantly.",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "the-7r-of-waste-management-a-visionary-framework",
    title: "THE 7R OF WASTE MANAGEMENT: A VISIONARY FRAMEWORK FOR REGENERATIVE LEADERSHIP READ NOW",
    category: "waste management",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/project3.webp",
    content: {
      intro:
        "Beyond the traditional 3Rs (Reduce, Reuse, Recycle), standard sustainability frameworks now embrace 7 Rs: Refuse, Reduce, Reuse, Repurpose, Recycle, Rot, and Rethink.",
      sections: [
        {
          title: "REDEFINING WASTE IN A CIRCULAR ECONOMY",
          paragraphs: [
            "Regenerative leadership requires rethinking how materials circulate within our economic systems. Every waste stream is a raw material for another industry.",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    slug: "7-powerful-compost-benefits-why-compost-is-truly-garden-gold",
    title: "7 POWERFUL COMPOST BENEFITS: WHY COMPOST IS TRULY GARDEN GOLD",
    category: "Composting",
    date: "May 14, 2026",
    readTime: "5 Min Read",
    image: "/tree.webp",
    content: {
      intro:
        "Compost is rich in organic nutrients, microbial life, and structural elements that enrich soil health and improve water retention capacity naturally.",
      sections: [
        {
          title: "WHY COMPOST MATTERS FOR SOIL REGENERATION",
          paragraphs: [
            "Using organic compost restores microbial diversity in soil, reduces dependence on chemical fertilizers, and sequesters carbon effectively.",
          ],
        },
      ],
    },
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
    image: "/project1.webp",
  },
  {
    id: 102,
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    date: "May 14, 2026",
    image: "/project2.webp",
  },
  {
    id: 103,
    title: "BUILDING A GREENER FUTURE THROUGH EFFECTIVE WASTE MANAGEMENT",
    date: "May 14, 2026",
    image: "/project3.webp",
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

// Helper functions for post lookup
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  return BLOG_POSTS.find(
    (post) =>
      post.slug.toLowerCase() === normalizedSlug ||
      String(post.id) === normalizedSlug
  );
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  const filtered = BLOG_POSTS.filter(
    (post) => post.slug !== currentPost?.slug && post.id !== currentPost?.id
  );
  if (filtered.length >= count) {
    return filtered.slice(0, count);
  }
  // Fill from BLOG_POSTS if fewer than count
  return BLOG_POSTS.slice(0, count);
}

