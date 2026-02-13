import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import { Navigation } from "./components/Navigation";
// import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminPageWrapper } from "./components/AdminPageWrapper";
import { AgroNavigation } from "./components/AgroNavigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ExportsPage } from "./pages/ExportsPage";
import { CertificationsPage } from "./pages/CertificationsPage";
import { ContactPage } from "./pages/ContactPage";
import { ContactEdit } from "./pages/ContactEdit";
import { ManageProducts } from "./pages/ManageProducts";
import { ManageAbout } from "./pages/ManageAbout";
import { ManageHome } from "./pages/ManageHome";
import { AdminBlogPage } from "./pages/AdminBlogPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BlogUpload from "./pages/BlogUpload";
import { AdminMachinePage } from "./pages/AdminMachinePage";
import MachineUpload from "./pages/MachineUpload";
import { MachinePage } from "./pages/MachinePage";
import { MachineDetailPage } from "./pages/MachineDetailPage";
import { Toaster } from "./components/ui/sonner";
import Inquiries from "./pages/admin/Inquiries";
import { AdminMachineBlogPage } from "./pages/AdminMachineBlogPage";
import MachineBlogUpload from "./pages/MachineBlogUpload";

// Machinery Pages
import { MachineryHome } from "./pages/machinery/MachineryHome";
import { MachineryAbout } from "./pages/machinery/MachineryAbout";
import { MachineryProducts } from "./pages/machinery/MachineryProducts";
import { MachineryExports } from "./pages/machinery/MachineryExports";
import { MachineryCertifications } from "./pages/machinery/MachineryCertifications";
import { MachineryBlog } from "./pages/machinery/MachineryBlog";
import { MachineryContact } from "./pages/machinery/MachineryContact";

// Wrapper component to handle navigation
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string, id?: string) => {
    console.log("Navigating to:", page, "with ID:", id);
    const routeMap: { [key: string]: string } = {
      // Agro Products Side
      "home": "/home",
      "about": "/agro-products/about",
      "products": "/agro-products/products",
      "product-detail": id ? `/agro-products/products/${id}` : "/agro-products/products",
      "exports": "/agro-products/exports",
      "certifications": "/agro-products/certifications",
      "contact": "/agro-products/contact",

      // Machinery Side
      "machinery-home": "/Agreocology",
      "machinery-about": "/Agreocology/about",
      "machinery-products": "/Agreocology/products",
      "machinery-product-detail": id ? `/Agreocology/products/${id}` : "/Agreocology/products",
      "machinery-exports": "/Agreocology/exports",
      "machinery-certifications": "/Agreocology/certifications",
      "machinery-blogs": "/Agreocology/blogs",
      "machinery-contact": "/Agreocology/contact",

      // Admin & Shared
      "admin": "/admin/dashboard",
      "contact-edit": "/admin/contact/edit",
      "products-manage": "/admin/products/manage",
      "about-manage": "/admin/about/manage",
      "home-manage": "/admin/home/manage",
      "blogs": "/agro-products/blogs",
      "blog": "/admin/blogs",
      "blogupload": id ? `/admin/blogs/edit/${id}` : "/admin/blogs/new",
      "login": "/login",
      "signup": "/signup",
      "admin-dashboard": "/admin/dashboard",
      "admin-inquiries": "/admin/inquiries",
      "admin-machines": "/admin/machines",
      "machineupload": id ? `/admin/machines/edit/${id}` : "/admin/machines/new",
      "admin-machine-blogs": "/admin/machine-blogs",
      "machineblogupload": id ? `/admin/machine-blogs/edit/${id}` : "/admin/machine-blogs/new",
    };

    const route = routeMap[page] || "/home";
    console.log("Resolved route:", route);
    navigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <main className="min-h-screen bg-white">
      {!isAuthPage && !isAdminPage && (
        <AgroNavigation onNavigate={handleNavigate} />
      )}

      <Routes>
        {/* Default Redirect to Agro Products Side */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Admin base redirect */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Machinery Side Routes */}
        <Route path="/Agreocology/products" element={<MachineryProducts />} />
        <Route path="/Agreocology/products/:id" element={<MachineDetailPage />} />

        {/* Other Machinery Side Routes (Hidden) */}
        {/* 
        <Route path="/Agreocology" element={<MachineryHome />} />
        <Route path="/Agreocology/about" element={<MachineryAbout />} />
        <Route path="/Agreocology/exports" element={<MachineryExports />} />
        <Route path="/Agreocology/certifications" element={<MachineryCertifications />} />
        <Route path="/Agreocology/blogs" element={<MachineryBlog />} />
        <Route path="/Agreocology/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/Agreocology/contact" element={<MachineryContact />} />
        */}

        {/* Agro Products Side Routes */}
        <Route path="/home" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/agro-products" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/agro-products/about" element={<AboutPage />} />
        <Route path="/agro-products/products" element={<ProductsPage onNavigate={handleNavigate} />} />
        <Route path="/agro-products/products/:productId" element={<ProductDetailWrapper onNavigate={handleNavigate} />} />
        <Route path="/agro-products/exports" element={<ExportsPage />} />
        <Route path="/agro-products/certifications" element={<CertificationsPage />} />
        <Route path="/agro-products/blogs" element={<BlogPage />} />
        <Route path="/agro-products/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/agro-products/contact" element={<ContactPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage onNavigate={handleNavigate} />} />
        <Route path="/signup" element={<SignupPage onNavigate={handleNavigate} />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <AdminDashboard onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/blogs" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <AdminBlogPage onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/blogs/new" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <BlogUpload onNavigate={handleNavigate} blogId={null} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/blogs/edit/:blogId" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <BlogEditWrapper onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/contact/edit" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <ContactEdit />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/products/manage" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <ManageProducts />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/about/manage" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <ManageAbout />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/home/manage" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <ManageHome />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/inquiries" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <Inquiries />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/machines" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <AdminMachinePage onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/machines/new" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <MachineUpload onNavigate={handleNavigate} machineId={null} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/machines/edit/:machineId" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <MachineEditWrapper onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/machine-blogs" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <AdminMachineBlogPage onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/machine-blogs/new" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <MachineBlogUpload onNavigate={handleNavigate} blogId={null} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        <Route path="/admin/machine-blogs/edit/:blogId" element={
          <ProtectedRoute onNavigate={handleNavigate}>
            <AdminPageWrapper onNavigate={handleNavigate}>
              <MachineBlogEditWrapper onNavigate={handleNavigate} />
            </AdminPageWrapper>
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to Agro Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {!isAuthPage && !isAdminPage && (
        <Footer onNavigate={handleNavigate} />
      )}
      <Toaster position="top-right" />
    </main>
  );
}

// Wrapper to get productId from URL params
function ProductDetailWrapper({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const { productId } = useParams<{ productId: string }>();
  return <ProductDetailPage productId={productId || "pulses"} onNavigate={onNavigate} />;
}

// Wrapper to get blogId from URL params
function BlogEditWrapper({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const { blogId } = useParams<{ blogId: string }>();
  return <BlogUpload onNavigate={onNavigate} blogId={blogId || null} />;
}

// Wrapper to get machineId from URL params
function MachineEditWrapper({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const { machineId } = useParams<{ machineId: string }>();
  return <MachineUpload onNavigate={onNavigate} machineId={machineId || null} />;
}

// Wrapper to get machine blogId from URL params
function MachineBlogEditWrapper({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const { blogId } = useParams<{ blogId: string }>();
  return <MachineBlogUpload onNavigate={onNavigate} blogId={blogId || null} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
