// src/pages/BlogPage.tsx
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  fullContent?: string;
}

interface BlogData {
  title?: string;
  description?: string;
  authorEmail?: string;
  createdAt?: string;
  createdAtReadable?: string;
  imageUrl?: string;
  content?: string;
  category?: string;
}

export function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = ref(database, "blogs");
        const snapshot = await get(blogsRef);

        if (snapshot.exists()) {
          const blogsObj = snapshot.val() as Record<string, BlogData>;
          const blogsArray = Object.entries(blogsObj).map(([key, value]) => ({
            key,
            ...(value || {}),
          }));

          const sortedBlogs = blogsArray.sort(
            (a, b) =>
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime()
          );

          const truncateText = (text: string, maxLength: number = 150): string => {
            if (!text || text.length <= maxLength) return text;
            return text.substring(0, maxLength).trim() + '...';
          };

          const transformedBlogs: BlogPost[] = sortedBlogs.map((blog) => ({
            id: blog.key,
            title: blog.title || "Untitled Blog",
            excerpt: truncateText(blog.description || "No description available", 150),
            author: blog.authorEmail?.split("@")[0] || "Admin",
            date:
              blog.createdAtReadable ||
              new Date(blog.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            readTime: `${Math.max(3, Math.floor((blog.content?.length || 0) / 1000))} min read`,
            category: blog.category || "Industry Insights",
            image:
              blog.imageUrl ||
              "https://images.unsplash.com/photo-1702896781457-1d4f69aebf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            fullContent: blog.content,
          }));

          setBlogPosts(transformedBlogs);
        } else {
          setBlogPosts(fallbackBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogPosts(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id: string) => {
    navigate(`/agro-products/blogs/${id}`);
  };

  const fallbackBlogs: BlogPost[] = [
    {
      id: "fallback-1",
      title: "The Future of Agricultural Exports: Trends to Watch in 2025",
      excerpt: "Explore the emerging trends shaping global agricultural trade, from sustainable farming practices to digital supply chains and changing consumer demands.",
      author: "Priya Sharma",
      date: "November 2, 2025",
      readTime: "8 min read",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1702896781457-1d4f69aebf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "fallback-2",
      title: "Understanding HS Codes: A Complete Guide for Agricultural Exporters",
      excerpt: "Navigate the complex world of Harmonized System codes with our comprehensive guide tailored for agricultural product exports.",
      author: "Amit Patel",
      date: "October 28, 2025",
      readTime: "12 min read",
      category: "Export Guide",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "fallback-3",
      title: "Organic Certification: Why It Matters for Global Markets",
      excerpt: "Learn how organic certification opens doors to premium markets and builds consumer trust in an increasingly conscious global marketplace.",
      author: "Sarah Williams",
      date: "October 20, 2025",
      readTime: "6 min read",
      category: "Certifications",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Helvetica']">
      {/* Top Section / Hero */}
      <section className="relative py-32 bg-[#043F43] text-center overflow-hidden">
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #ffffff 1.5px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-normal mb-8 tracking-tight">
              Export Insights & Resources
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Expert insights, industry trends, and practical guides for agricultural export professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 font-['Helvetica']">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-[#00D084]/20 border-t-[#00D084] rounded-full animate-spin mb-4"></div>
              <p className="text-[#517a79] font-medium">Syncing data...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full border border-gray-100 group"
                >
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-5 py-1.5 bg-[#00D084] text-white text-[11px] font-bold rounded-full uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h2
                      onClick={() => handleBlogClick(post.id)}
                      className="text-[#00D084] group-hover:text-[#043F43] text-2xl font-normal mb-5 line-clamp-2 leading-tight transition-colors duration-300 cursor-pointer"
                    >
                      {post.title}
                    </h2>

                    <p className="text-[#517a79] text-[15px] leading-relaxed mb-10 line-clamp-3 font-light">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto">
                      {/* Author and Read Time Metadata */}
                      <div className="flex items-center gap-6 text-[#517a79] text-[13px] font-medium mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#00D084]" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#00D084]" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Date and Read More Button */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-[#517a79] text-[13px]">
                          <Calendar className="w-4 h-4 text-[#00D084]" />
                          <span>{post.date}</span>
                        </div>

                        <button
                          onClick={() => handleBlogClick(post.id)}
                          className="flex items-center gap-2 text-[#00D084] font-semibold text-[13px] hover:translate-x-1 transition-all duration-300"
                        >
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modern Newsletter Section */}
      <section className="py-24 bg-[#f2faf9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#043F43] text-3xl font-medium mb-6">Stay Ahead of Global Trends</h2>
            <p className="text-[#517a79] mb-10 text-[17px] font-light">
              Get our monthly export brief with market analysis and regulatory updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-8 py-4 rounded-full bg-white border border-gray-100 text-[#043F43] focus:outline-none focus:ring-2 focus:ring-[#00D084] transition-all font-['Helvetica']"
                required
              />
              <button
                type="submit"
                className="px-10 py-4 bg-[#00D084] hover:bg-[#043F43] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#00D084]/20"
              >
                Subscribe Now
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
