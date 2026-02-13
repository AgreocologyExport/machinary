import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";
import { Users, FileText, Package, TrendingUp, Clock, Eye } from "lucide-react";

export const AdminDashboardPage = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ users: 0, blogs: 0, products: 0, views: 0 });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        // profile
        const userRef = ref(database, `Agreocology/users/${currentUser.uid}`);
        const userSnap = await get(userRef);
        setProfile(userSnap.exists() ? userSnap.val() : null);

        // users count
        const usersRef = ref(database, `Agreocology/users`);
        const usersSnap = await get(usersRef);
        const usersCount = usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0;

        // blogs
        const blogsRef = ref(database, `blogs`);
        const blogsSnap = await get(blogsRef);

        // Map with Firebase keys as IDs
        const blogsArr = blogsSnap.exists()
          ? Object.entries(blogsSnap.val()).map(([key, value]) => ({ id: key, ...value }))
          : [];

        const sorted = blogsArr
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setRecentBlogs(sorted.slice(0, 5));

        setStats({
          users: usersCount,
          blogs: blogsArr.length,
          products: 0,
          views: Math.floor(Math.random() * 1000)
        });
      } catch (err) {
        console.error("Admin dashboard fetch error:", err);
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon" style={{ background: bgColor }}>
        <Icon size={24} color={color} />
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .dashboard-container {
            width: 100%;
            max-width: 100%;
            padding: 16px;
          }

          /* Welcome Card */
          .welcome-card {
            background: linear-gradient(135deg, #043F43 0%, #065f63 100%);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            color: white;
            box-shadow: 0 4px 12px rgba(4, 63, 67, 0.15);
          }

          .welcome-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 12px;
          }

          .welcome-info h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 4px 0;
          }

          .welcome-subtitle {
            opacity: 0.9;
            font-size: 0.95rem;
          }

          .time-display {
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.15);
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
          }

          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
          }

          .stat-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          }

          .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .stat-content {
            flex: 1;
            min-width: 0;
          }

          .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #18181b;
            line-height: 1.2;
          }

          .stat-label {
            font-size: 0.85rem;
            color: #64748b;
            margin-top: 2px;
          }

          /* Quick Actions */
          .quick-actions {
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .quick-actions h2 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #18181b;
            margin: 0 0 12px 0;
          }

          .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 10px;
          }

          .action-btn {
            background: linear-gradient(135deg, #07D185 0%, #059669 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(7, 209, 133, 0.25);
          }

          .action-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(7, 209, 133, 0.35);
          }

          .action-btn:active {
            transform: translateY(0);
          }

          /* Recent Blogs */
          .blogs-section {
            background: white;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }

          .section-header h2 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #18181b;
            margin: 0;
          }

          .view-all-btn {
            color: #07D185;
            font-size: 0.9rem;
            font-weight: 600;
            background: none;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: color 0.2s;
          }

          .view-all-btn:hover {
            color: #059669;
            text-decoration: underline;
          }

          .blog-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .blog-item {
            display: flex;
            gap: 12px;
            padding: 12px;
            background: #f8fafc;
            border-radius: 10px;
            transition: background 0.2s;
            cursor: pointer;
          }

          .blog-item:hover {
            background: #f1f5f9;
          }

          .blog-image {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            flex-shrink: 0;
            background: linear-gradient(135deg, #07D185 0%, #059669 100%);
          }

          .blog-image-placeholder {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            background: linear-gradient(135deg, #07D185 0%, #059669 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .blog-content {
            flex: 1;
            min-width: 0;
          }

          .blog-title {
            font-weight: 600;
            font-size: 0.95rem;
            color: #18181b;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .blog-desc {
            font-size: 0.85rem;
            color: #64748b;
            margin-bottom: 6px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .blog-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #94a3b8;
          }

          .no-blogs {
            text-align: center;
            padding: 32px 16px;
            color: #64748b;
          }

          .no-blogs-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            gap: 12px;
          }

          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #e2e8f0;
            border-top-color: #07D185;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
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

          /* Mobile Responsive */
          @media (max-width: 640px) {
            .dashboard-container {
              padding: 12px;
            }

            .welcome-card {
              padding: 16px;
            }

            .welcome-info h1 {
              font-size: 1.25rem;
            }

            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }

            .stat-card {
              padding: 12px;
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }

            .stat-icon {
              width: 40px;
              height: 40px;
            }

            .stat-value {
              font-size: 1.25rem;
            }

            .actions-grid {
              grid-template-columns: 1fr;
            }

            .blog-image,
            .blog-image-placeholder {
              width: 50px;
              height: 50px;
            }

            .blog-title {
              font-size: 0.9rem;
            }

            .blog-desc {
              font-size: 0.8rem;
              -webkit-line-clamp: 1;
            }
          }

          @media (min-width: 768px) {
            .dashboard-container {
              padding: 24px;
            }

            .stats-grid {
              grid-template-columns: repeat(4, 1fr);
            }

            .actions-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="welcome-header">
            <div className="welcome-info">
              <h1>Welcome back! 👋</h1>
              <div className="welcome-subtitle">
                {profile?.name || currentUser?.email || 'Admin'}
              </div>
            </div>
            <div className="time-display">
              <Clock size={16} />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <span>Loading dashboard...</span>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="stats-grid">
              <StatCard
                icon={Users}
                title="Total Users"
                value={stats.users}
                color="#3b82f6"
                bgColor="#eff6ff"
              />
              <StatCard
                icon={FileText}
                title="Blog Posts"
                value={stats.blogs}
                color="#8b5cf6"
                bgColor="#f5f3ff"
              />
              <StatCard
                icon={Package}
                title="Products"
                value={stats.products}
                color="#f97316"
                bgColor="#fff7ed"
              />
              <StatCard
                icon={TrendingUp}
                title="Total Views"
                value={stats.views}
                color="#07D185"
                bgColor="#f0fdf4"
              />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-btn" onClick={() => onNavigate('blogupload')}>
                  + New Blog Post
                </button>
                <button className="action-btn" onClick={() => onNavigate('products-manage')}>
                  Manage Products
                </button>
                <button className="action-btn" onClick={() => onNavigate('about-manage')}>
                  Edit About Page
                </button>
                <button className="action-btn" onClick={() => onNavigate('home-manage')}>
                  Edit Home Page
                </button>
                <button className="action-btn" onClick={() => onNavigate('contact-edit')}>
                  Edit Contact Info
                </button>
                <button className="action-btn" onClick={() => onNavigate('blog')}>
                  View All Blogs
                </button>
                <button className="action-btn" onClick={() => onNavigate('machineupload')}>
                  + New Machine
                </button>
                <button className="action-btn" onClick={() => onNavigate('admin-machines')}>
                  Manage Machinery
                </button>
                <button className="action-btn" onClick={() => onNavigate('machineblogupload')}>
                  + New Machine Blog
                </button>
                <button className="action-btn" onClick={() => onNavigate('admin-machine-blogs')}>
                  Manage Machine Blogs
                </button>
              </div>
            </div>

            {/* Recent Blogs */}
            <div className="blogs-section">
              <div className="section-header">
                <h2>Recent Blog Posts</h2>
                <button className="view-all-btn" onClick={() => onNavigate('blog')}>
                  View all →
                </button>
              </div>

              {recentBlogs.length === 0 ? (
                <div className="no-blogs">
                  <div className="no-blogs-title">No blog posts yet</div>
                  <button className="action-btn" style={{ marginTop: '12px' }} onClick={() => onNavigate('blogupload')}>
                    Create your first blog post
                  </button>
                </div>
              ) : (
                <div className="blog-list">
                  {recentBlogs.map((blog, idx) => (
                    <div className="blog-item" key={idx} onClick={() => onNavigate('blogupload', blog.id)}>
                      {blog.imageUrl ? (
                        <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                      ) : (
                        <div className="blog-image-placeholder">
                          <FileText size={24} color="white" />
                        </div>
                      )}
                      <div className="blog-content">
                        <div className="blog-title">{blog.title}</div>
                        <div className="blog-desc">
                          {blog.description?.slice(0, 80)}{blog.description?.length > 80 ? "..." : ""}
                        </div>
                        <div className="blog-meta">
                          <span>{blog.authorEmail || 'Admin'}</span>
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
