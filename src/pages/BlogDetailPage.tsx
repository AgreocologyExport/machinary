// src/pages/BlogDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";

interface BlogData {
  title?: string;
  description?: string;
  authorEmail?: string;
  authorName?: string;
  createdAt?: string;
  createdAtReadable?: string;
  imageUrl?: string;
  content?: string;
  category?: string;
}

interface RelatedBlog {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  readTime: string;
}

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          setError("No blog ID provided");
          setLoading(false);
          return;
        }

        let blogRef = ref(database, `blogs/${id}`);
        let snapshot = await get(blogRef);

        if (!snapshot.exists()) {
          blogRef = ref(database, `machine_blogs/${id}`);
          snapshot = await get(blogRef);
        }

        if (snapshot.exists()) {
          const blogData = snapshot.val() as BlogData;
          setBlog(blogData);

          const sourcePath = snapshot.ref.parent?.key || "blogs";
          const blogsRef = ref(database, sourcePath);
          const blogsSnapshot = await get(blogsRef);

          if (blogsSnapshot.exists()) {
            const allBlogs = blogsSnapshot.val() as Record<string, BlogData>;
            const related = Object.entries(allBlogs)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, value]) => ({
                id: key,
                title: value.title || "Untitled",
                description: value.description || "",
                imageUrl: value.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80",
                readTime: `${Math.max(3, Math.ceil((value.content?.length || 0) / 1000))} min read`,
              }));
            setRelatedBlogs(related);
          }
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#00D084]/20 border-t-[#00D084] rounded-full animate-spin"></div>
      </div>
    );
  }

  const backPath = location.pathname.includes("/Agreocology") ? "/Agreocology/blogs" : "/agro-products/blogs";

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Poppins']">
        <div className="text-center">
          <h2 className="text-xl font-medium text-[#043F43] mb-4">Error Loading Blog</h2>
          <button onClick={() => navigate(backPath)} className="text-[#00D084] font-medium flex items-center gap-2 mx-auto hover:text-[#00b975]">
            <ArrowLeft size={20} /> Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={blog.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80"}
            alt={blog.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#043F43]/90 via-[#043F43]/40 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto w-full">
          {/* Top navigation */}
          <div>
            <button
              onClick={() => navigate(backPath)}
              className="flex items-center gap-2 text-white/90 hover:text-white hover:translate-x-[-4px] transition-all duration-300 font-medium text-sm"
            >
              <ArrowLeft size={18} /> Back to Blog
            </button>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 bg-[#00D084] text-white text-xs font-bold rounded-full uppercase tracking-wider mb-6 shadow-lg shadow-[#00D084]/20">
              {blog.category || "Industry Insights"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#00D084]" />
                <span>{blog.authorName || "Priya Sharma"}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#00D084]" />
                <span>{blog.createdAtReadable?.split(',')[0] || "November 2, 2025"}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#00D084]" />
                <span>{Math.max(3, Math.ceil((blog.content?.length || 0) / 1000))} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Social Share / Placeholder - Optional */}

            <article className="prose prose-lg max-w-none prose-headings:text-[#043F43] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#00D084] prose-strong:text-[#043F43] prose-img:rounded-2xl prose-img:shadow-lg">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Author Widget */}
            <div className="bg-[#ecfdf5] rounded-3xl p-8 border border-[#00D084]/10">
              <h3 className="text-[#043F43] text-2xl font-normal mb-6">About the <br /><span className="font-semibold">Author</span></h3>
              <div className="mb-4">
                {/* Placeholder Avatar if no author image */}
                <div className="w-16 h-16 rounded-full bg-[#00D084]/20 flex items-center justify-center text-[#00D084] font-bold text-xl mb-4">
                  {(blog.authorName || "PS").charAt(0)}
                </div>
              </div>
              <p className="text-[#043F43] text-sm leading-relaxed opacity-80 mb-4">
                {blog.authorName || "Priya Sharma"} is an expert in agricultural exports and international trade with over 10 years of experience in the industry.
              </p>
            </div>

            {/* Related Articles */}
            <div>
              <h3 className="text-[#043F43] text-2xl font-semibold mb-6">Related Articles</h3>
              <div className="space-y-6">
                {relatedBlogs.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => {
                      navigate(`${backPath}/${related.id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <h4 className="text-[#043F43] text-lg font-medium leading-tight group-hover:text-[#00D084] transition-colors">
                      {related.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Style Override for Content */}
      <style>{`
        article p { margin-bottom: 1.5rem; }
        article h2 { font-size: 1.75rem; margin-top: 2.5rem; margin-bottom: 1rem; }
        article h3 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 0.75rem; }
        article ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        article li { margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}

export default BlogDetailPage;
