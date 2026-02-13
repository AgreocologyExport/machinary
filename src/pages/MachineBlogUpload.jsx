import { useState, useEffect } from "react";
import { ref as dbRef, push, set, get, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function MachineBlogUpload({ onNavigate, blogId }) {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Technology");
    const [authorName, setAuthorName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const categories = [
        "Technology",
        "Export Insights",
        "Agricultural Machinery",
        "Processing Equipment",
        "Industrial Trends",
        "Automation",
    ];

    // Load blog data if editing
    useEffect(() => {
        const loadBlogData = async () => {
            if (blogId) {
                setIsEditMode(true);
                setLoading(true);
                try {
                    const blogRef = dbRef(database, `machine_blogs/${blogId}`);
                    const snapshot = await get(blogRef);

                    if (snapshot.exists()) {
                        const blogData = snapshot.val();
                        setTitle(blogData.title || "");
                        setDescription(blogData.description || "");
                        setContent(blogData.content || "");
                        setCategory(blogData.category || "Technology");
                        setAuthorName(blogData.authorName || "");
                        setExistingImageUrl(blogData.imageUrl || "");
                    } else {
                        setError("Machine blog not found");
                    }
                } catch (err) {
                    console.error("Error loading machine blog:", err);
                    setError("Failed to load blog data");
                } finally {
                    setLoading(false);
                }
            } else {
                // Reset form for new blog
                setIsEditMode(false);
                setTitle("");
                setDescription("");
                setContent("");
                setCategory("Technology");
                setAuthorName("");
                setImageFile(null);
                setExistingImageUrl("");
            }
        };

        loadBlogData();
    }, [blogId]);

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setImageFile(file || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim() || !description.trim() || !content.trim()) {
            setError("Title, description, and content are required.");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = existingImageUrl;

            // Upload new image if provided
            if (imageFile) {
                const filename = `machine_blogs/${Date.now()}_${imageFile.name}`;
                const sRef = storageRef(storage, filename);
                await uploadBytes(sRef, imageFile);
                imageUrl = await getDownloadURL(sRef);
            }

            const blogData = {
                title: title.trim(),
                description: description.trim(),
                content: content.trim(),
                category: category,
                authorName: authorName.trim() || "Admin",
                imageUrl: imageUrl || null,
                authorUid: currentUser?.uid || null,
                authorEmail: currentUser?.email || null,
            };

            if (isEditMode && blogId) {
                // Update existing blog
                blogData.updatedAt = new Date().toISOString();
                blogData.updatedAtReadable = new Date().toLocaleString();

                const blogRef = dbRef(database, `machine_blogs/${blogId}`);
                await update(blogRef, blogData);
                setSuccess("Machine blog updated successfully.");
            } else {
                // Create new blog
                blogData.createdAt = new Date().toISOString();
                blogData.createdAtReadable = new Date().toLocaleString();

                const blogsRef = dbRef(database, "machine_blogs");
                const newBlogRef = push(blogsRef);
                await set(newBlogRef, blogData);
                setSuccess("Machine blog uploaded successfully.");
            }

            // Reset form on success if not editing
            if (!isEditMode) {
                setTitle("");
                setDescription("");
                setContent("");
                setCategory("Technology");
                setAuthorName("");
                setImageFile(null);
                setExistingImageUrl("");
            }

            // Navigate back to blog list after a short delay
            setTimeout(() => {
                if (onNavigate) {
                    onNavigate("admin-machine-blogs");
                }
            }, 1500);
        } catch (err) {
            console.error("Machine blog save error:", err);
            setError(err.message || "Failed to save blog.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>
                {`
          .blog-upload-container {
            min-height: 100vh;
            background: #f9fafb;
            padding: 20px 16px;
          }
          .blog-upload-inner {
            max-width: 1000px;
            margin: 0 auto;
          }
          .blog-upload-header {
            margin-bottom: 24px;
          }
          .blog-upload-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #043F43;
            margin-bottom: 8px;
          }
          .blog-upload-subtitle {
            font-size: 0.95rem;
            color: #64748b;
          }
          .blog-upload-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: 24px;
            margin-bottom: 20px;
          }
          .blog-alert {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            font-weight: 500;
          }
          .blog-alert-error {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
          }
          .blog-alert-success {
            background: #d1fae5;
            color: #059669;
            border: 1px solid #6ee7b7;
          }
          .blog-form-group {
            margin-bottom: 20px;
          }
          .blog-label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 6px;
          }
          .blog-label-required {
            color: #dc2626;
            margin-left: 2px;
          }
          .blog-input, .blog-select, .blog-textarea {
            width: 100%;
            padding: 10px 14px;
            border: 1.5px solid #e5e7eb;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.2s;
            background: white;
            box-sizing: border-box;
          }
          .blog-input:focus, .blog-select:focus, .blog-textarea:focus {
            outline: none;
            border-color: #07D185;
            box-shadow: 0 0 0 3px rgba(7, 209, 133, 0.1);
          }
          .blog-textarea {
            resize: vertical;
            font-family: inherit;
            line-height: 1.6;
          }
          .blog-textarea-small {
            min-height: 80px;
          }
          .blog-textarea-large {
            min-height: 300px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
          }
          .blog-hint {
            font-size: 0.85rem;
            color: #64748b;
            margin-top: 6px;
          }
          .blog-char-count {
            font-size: 0.8rem;
            color: #94a3b8;
            text-align: right;
            margin-top: 4px;
          }
          .blog-image-section {
            background: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 32px 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
          }
          .blog-image-section:hover {
            border-color: #07D185;
            background: #f0fdf4;
          }
          .blog-image-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 12px;
            color: #94a3b8;
          }
          .blog-image-text {
            font-size: 0.95rem;
            color: #475569;
            font-weight: 500;
            margin-bottom: 4px;
          }
          .blog-image-hint {
            font-size: 0.85rem;
            color: #94a3b8;
          }
          .blog-image-preview {
            margin-top: 16px;
            border-radius: 8px;
            overflow: hidden;
          }
          .blog-image-preview img {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            display: block;
          }
          .blog-selected-name {
            font-size: 0.9rem;
            color: #07D185;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .blog-actions {
            display: flex;
            gap: 12px;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 24px;
          }
          .blog-btn {
            padding: 12px 32px;
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
          }
          .blog-btn-primary {
            background: linear-gradient(135deg, #07D185 0%, #05b872 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(7, 209, 133, 0.3);
          }
          .blog-btn-primary:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(7, 209, 133, 0.4);
          }
          .blog-btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .blog-date-info {
            font-size: 0.85rem;
            color: #94a3b8;
          }
        `}
            </style>

            <div className="blog-upload-container">
                <div className="blog-upload-inner">
                    {/* Header */}
                    <div className="blog-upload-header">
                        <h1 className="blog-upload-title">
                            {isEditMode ? "Edit Machine Blog Post" : "Create New Machine Blog Post"}
                        </h1>
                        <p className="blog-upload-subtitle">
                            {isEditMode
                                ? "Update your industrial insight details below"
                                : "Share your machinery expertise with the world"}
                        </p>
                    </div>

                    {/* Alerts */}
                    {error && <div className="blog-alert blog-alert-error">{error}</div>}
                    {success && <div className="blog-alert blog-alert-success">{success}</div>}

                    {/* Main Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="blog-upload-card">
                            {/* Title */}
                            <div className="blog-form-group">
                                <label className="blog-label">
                                    Blog Title<span className="blog-label-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="blog-input"
                                    placeholder="e.g., Exporting Food Processing Equipment: A Complete Guide"
                                    required
                                />
                            </div>

                            {/* Author */}
                            <div className="blog-form-group">
                                <label className="blog-label">
                                    Author Name
                                </label>
                                <input
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    className="blog-input"
                                    placeholder="Enter name (e.g., Suresh Reddy)"
                                />
                            </div>

                            {/* Category */}
                            <div className="blog-form-group">
                                <label className="blog-label">
                                    Category<span className="blog-label-required">*</span>
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="blog-select blog-input"
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="blog-form-group">
                                <label className="blog-label">
                                    Short Excerpt<span className="blog-label-required">*</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="blog-textarea blog-textarea-small"
                                    placeholder="A brief teaser for the blog card..."
                                    required
                                    maxLength={250}
                                />
                                <div className="blog-char-count">
                                    {description.length}/250 characters
                                </div>
                            </div>

                            {/* Content */}
                            <div className="blog-form-group">
                                <label className="blog-label">
                                    Article Content<span className="blog-label-required">*</span>
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="blog-textarea blog-textarea-large"
                                    placeholder="The full article body goes here..."
                                    required
                                />
                                <div className="blog-hint">
                                    💡 Tip: You can use HTML tags for rich formatting
                                </div>
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="blog-upload-card">
                            <label className="blog-label" style={{ marginBottom: '12px' }}>
                                Featured Image (Recommended)
                            </label>
                            <div
                                className="blog-image-section"
                                onClick={() => document.getElementById("blog-image-input").click()}
                            >
                                <input
                                    type="file"
                                    id="blog-image-input"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                                {imageFile ? (
                                    <>
                                        <div className="blog-selected-name">✓ {imageFile.name}</div>
                                        <div className="blog-image-text">Click to change image</div>
                                    </>
                                ) : existingImageUrl ? (
                                    <>
                                        <div className="blog-image-text">Current image uploaded</div>
                                        <div className="blog-image-hint">Click to upload a new image</div>
                                    </>
                                ) : (
                                    <>
                                        <svg className="blog-image-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div className="blog-image-text">Click to upload image</div>
                                        <div className="blog-image-hint">PNG, JPG, GIF up to 10MB</div>
                                    </>
                                )}
                            </div>

                            {(imageFile || existingImageUrl) && (
                                <div className="blog-image-preview">
                                    <img
                                        src={imageFile ? URL.createObjectURL(imageFile) : existingImageUrl}
                                        alt="Preview"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="blog-actions">
                            <div className="blog-date-info">
                                📅 {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="blog-btn blog-btn-primary"
                            >
                                {loading
                                    ? (isEditMode ? "Updating..." : "Publishing...")
                                    : (isEditMode ? "Update Machine Blog" : "Publish Machine Blog")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
