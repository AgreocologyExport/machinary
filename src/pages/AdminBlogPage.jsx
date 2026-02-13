import { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database";
import { database } from "../firebase/config";
import { Edit, Trash2, Plus, ArrowLeft, FileText, Calendar, User } from "lucide-react";

export function AdminBlogPage({ onNavigate }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = ref(database, 'blogs');
        const snapshot = await get(blogsRef);

        if (snapshot.exists()) {
          const blogsData = Object.entries(snapshot.val()).map(([key, value]) => ({
            id: key,
            ...value
          }));
          // Sort by creation date (newest first)
          const sortedBlogs = blogsData.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBlogs(sortedBlogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const blogRef = ref(database, `blogs/${blogId}`);
        await remove(blogRef);
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } catch (error) {
        console.error("Error deleting blog:", error);
        setError("Failed to delete blog");
      }
    }
  };

  return (
    <>
      <style>
        {`
          .blogs-page {
            min-height: 100vh;
            background: #f8fafc;
            padding-bottom: 20px;
          }

          /* Page Header */
          .blogs-header {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .blogs-header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
          }

          .back-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: #f1f5f9;
            border: none;
            border-radius: 8px;
            color: #334155;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .back-button:hover {
            background: #e2e8f0;
            color: #1e293b;
          }

          .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .page-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #18181b;
          }

          .add-blog-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 16px;
            background: linear-gradient(135deg, #07D185 0%, #059669 100%);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(7, 209, 133, 0.25);
          }

          .add-blog-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(7, 209, 133, 0.35);
          }

          /* Main Content */
          .blogs-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
          }

          .error-message {
            background: #fee2e2;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-weight: 500;
            font-size: 0.9rem;
          }

          .loading-state {
            text-align: center;
            padding: 40px 16px;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e2e8f0;
            border-top-color: #07D185;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .empty-state {
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .empty-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 16px;
            color: #94a3b8;
          }

          .empty-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #334155;
            margin-bottom: 8px;
          }

          .empty-subtitle {
            font-size: 0.95rem;
            color: #64748b;
            margin-bottom: 20px;
          }

          /* Blog Cards */
          .blogs-grid {
            display: grid;
            gap: 16px;
          }

          .blog-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: all 0.2s;
            border: 1px solid #e2e8f0;
          }

          .blog-card:hover {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
          }

          .blog-card-content {
            display: flex;
            gap: 0;
          }

          .blog-image-wrapper {
            width: 120px;
            height: 120px;
            flex-shrink: 0;
            background: linear-gradient(135deg, #07D185 0%, #059669 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .blog-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .blog-image-placeholder {
            color: white;
          }

          .blog-info {
            flex: 1;
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .blog-title {
            font-size: 1rem;
            font-weight: 700;
            color: #18181b;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .blog-description {
            font-size: 0.875rem;
            color: #64748b;
            margin-bottom: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            flex: 1;
          }

          .blog-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: auto;
          }

          .blog-meta-info {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.8rem;
            color: #94a3b8;
            flex-wrap: wrap;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .blog-actions {
            display: flex;
            gap: 6px;
          }

          .action-button {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 6px 10px;
            border: none;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .edit-button {
            background: #eff6ff;
            color: #3b82f6;
          }

          .edit-button:hover {
            background: #dbeafe;
            color: #2563eb;
          }

          .delete-button {
            background: #fef2f2;
            color: #ef4444;
          }

          .delete-button:hover {
            background: #fee2e2;
            color: #dc2626;
          }

          /* Mobile Responsive */
          @media (max-width: 640px) {
            .blogs-header {
              padding: 12px;
            }

            .blogs-header-content {
              gap: 8px;
            }

            .back-button {
              padding: 6px 10px;
              font-size: 0.85rem;
            }

            .back-button span {
              display: none;
            }

            .page-title {
              font-size: 1.1rem;
            }

            .add-blog-button {
              padding: 8px 12px;
              font-size: 0.85rem;
            }

            .add-blog-button span {
              display: none;
            }

            .blogs-container {
              padding: 0 12px;
            }

            .blog-card-content {
              flex-direction: column;
            }

            .blog-image-wrapper {
              width: 100%;
              height: 160px;
            }

            .blog-info {
              padding: 12px;
            }

            .blog-title {
              font-size: 0.95rem;
            }

            .blog-description {
              font-size: 0.8rem;
              -webkit-line-clamp: 2;
            }

            .blog-meta {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }

            .blog-meta-info {
              font-size: 0.75rem;
              width: 100%;
            }

            .blog-actions {
              width: 100%;
            }

            .action-button {
              flex: 1;
              justify-content: center;
              padding: 8px;
              font-size: 0.8rem;
            }
          }

          @media (min-width: 768px) {
            .blogs-header {
              padding: 20px;
            }

            .blog-image-wrapper {
              width: 200px;
              height: 140px;
            }

            .blog-info {
              padding: 16px 20px;
            }

            .blog-title {
              font-size: 1.1rem;
            }
          }
        `}
      </style>

      <div className="blogs-page">
        {/* Header */}
        <div className="blogs-header">
          <div className="blogs-header-content">
            <button onClick={() => onNavigate('admin-dashboard')} className="back-button">
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </button>
            <div className="header-right">
              <h1 className="page-title">Manage Blogs</h1>
              <button onClick={() => onNavigate('blogupload')} className="add-blog-button">
                <Plus size={18} />
                <span>Add New Blog</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="blogs-container">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <div style={{ color: '#64748b' }}>Loading blogs...</div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="empty-state">
              <FileText className="empty-icon" size={64} />
              <div className="empty-title">No blog posts yet</div>
              <div className="empty-subtitle">Get started by creating your first blog post</div>
              <button onClick={() => onNavigate('blogupload')} className="add-blog-button">
                <Plus size={18} />
                <span>Create Your First Blog</span>
              </button>
            </div>
          ) : (
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                  <div className="blog-card-content">
                    <div className="blog-image-wrapper">
                      {blog.imageUrl ? (
                        <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                      ) : (
                        <FileText className="blog-image-placeholder" size={48} />
                      )}
                    </div>
                    <div className="blog-info">
                      <div className="blog-title">{blog.title}</div>
                      <div className="blog-description">
                        {blog.description?.length > 150
                          ? `${blog.description.slice(0, 150)}...`
                          : blog.description}
                      </div>
                      <div className="blog-meta">
                        <div className="blog-meta-info">
                          <div className="meta-item">
                            <User size={14} />
                            <span>{blog.authorEmail?.split('@')[0] || 'Admin'}</span>
                          </div>
                          <div className="meta-item">
                            <Calendar size={14} />
                            <span>{blog.createdAtReadable || new Date(blog.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="blog-actions">
                          <button
                            onClick={() => onNavigate('blogupload', blog.id)}
                            className="action-button edit-button"
                            title="Edit blog"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="action-button delete-button"
                            title="Delete blog"
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminBlogPage;
