import * as React from "react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/config";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
}

export function MachineryBlog() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsRef = ref(database, "machine_blogs");
                const snapshot = await get(blogsRef);

                if (snapshot.exists()) {
                    const blogsObj = snapshot.val();
                    const transformed = Object.entries(blogsObj).map(([key, value]: [string, any]) => ({
                        id: key,
                        title: value.title || "Untitled",
                        excerpt: value.description || "No description available",
                        author: value.authorName || "Admin",
                        date: value.createdAtReadable ? value.createdAtReadable.split(',')[0] : "Recently",
                        readTime: `${Math.max(3, Math.ceil((value.content?.length || 0) / 1000))} min read`,
                        category: value.category || "General",
                        image: value.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80",
                    }));
                    setBlogs(transformed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                }
            } catch (error) {
                console.error("Error fetching machine blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Blog */}
            <section className="bg-[#043F43] py-28 text-left">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">
                            Machinery Blog
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl font-light max-w-2xl">
                            Latest updates and insights from the machinery industry
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-10 h-10 border-4 border-[#00D084]/20 border-t-[#00D084] rounded-full animate-spin"></div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                            <p className="text-gray-400">No blog posts found yet.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog: BlogPost, idx: number) => (
                                <motion.article
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group"
                                >
                                    {/* Compact Image */}
                                    <div
                                        className="h-56 overflow-hidden cursor-pointer relative"
                                        onClick={() => navigate(`/Agreocology/blogs/${blog.id}`)}
                                    >
                                        <img
                                            src={blog.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            alt={blog.title}
                                        />
                                    </div>

                                    {/* Card Content - Compacted */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* Category Badge - Exactly like Image 1 */}
                                        <div className="mb-3">
                                            <span className="px-3 py-1.5 bg-[#00D084] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider inline-block">
                                                {blog.category}
                                            </span>
                                        </div>

                                        {/* Title - Bold Green from Image 1 */}
                                        <h3
                                            className="text-[#00D084] text-xl font-bold mb-1 hover:underline transition-all cursor-pointer line-clamp-2"
                                            onClick={() => navigate(`/Agreocology/blogs/${blog.id}`)}
                                        >
                                            {blog.title}
                                        </h3>

                                        {/* Author - Gray from Image 1 */}
                                        <p className="text-gray-400 text-xs mb-4">
                                            {blog.author}
                                        </p>

                                        {/* Minimal Separation & Footer */}
                                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-gray-300 text-[10px]">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {blog.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={12} />
                                                    admin
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => navigate(`/Agreocology/blogs/${blog.id}`)}
                                                className="flex items-center gap-1 text-[#00D084] font-bold text-[11px] hover:translate-x-1 transition-transform"
                                            >
                                                Read More <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default MachineryBlog;
