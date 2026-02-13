import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Package, Truck, FileText, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { getProductById, type Product } from "../data/productsData";

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, id?: any) => void;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const dataPromise = getProductById(productId);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Fetch timeout')), 3000)
        );

        const data = await Promise.race([dataPromise, timeoutPromise]) as Product | undefined;
        setProduct(data || null);
      } catch (error) {
        console.warn('Product detail fetch slow/failed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#043F43] text-xl">Loading product details...</div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#043F43] mb-4">Product Not Found</h2>
          <p className="text-[#043F43] opacity-70 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => onNavigate("products")} className="bg-[#07D185] hover:bg-[#06b872]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => onNavigate("products")}
            className="flex items-center gap-2 text-[#043F43] hover:text-[#07D185] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#043F43]/90 to-[#043F43]/70" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-white mb-6">{product.title}</h1>
              <p className="text-white/90 text-xl max-w-2xl">{product.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Varieties */}
              {product.varieties && product.varieties.length > 0 && (
                <div>
                  <h2 className="text-[#043F43] mb-6">Available Varieties</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.varieties.map((variety: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-[#07D185]/5 border border-[#07D185]/10 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <h4 className="text-[#043F43] mb-2">{variety.name}</h4>
                        <div className="space-y-1 text-sm text-[#043F43] opacity-70">
                          <div>Grade: {variety.grade}</div>
                          <div>Moisture: {variety.moisture}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h2 className="text-[#043F43] mb-6">Technical Specifications</h2>
                  <div className="bg-white border border-[#07D185]/10 rounded-2xl p-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-[#043F43] opacity-60 text-sm mb-1 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="text-[#043F43]">{value as string}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Packaging Options */}
              {product.packaging && product.packaging.length > 0 && (
                <div>
                  <h2 className="text-[#043F43] mb-6">Packaging Options</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.packaging.map((pack: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-gradient-to-br from-white to-[#07D185]/5 border border-[#07D185]/10 rounded-xl p-4"
                      >
                        <Package className="w-5 h-5 text-[#07D185] flex-shrink-0" />
                        <span className="text-[#043F43]">{pack}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Export Markets */}
              {product.countries && product.countries.length > 0 && (
                <div>
                  <h2 className="text-[#043F43] mb-6">Export Markets</h2>
                  <div className="bg-gradient-to-br from-[#07D185]/5 to-[#043F43]/5 rounded-2xl p-8">
                    <div className="flex flex-wrap gap-3">
                      {product.countries.map((country: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white rounded-full text-[#043F43] text-sm border border-[#07D185]/20"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-6">
              <div className="bg-[#043F43] rounded-2xl p-8 text-white sticky top-24">
                <h3 className="text-white mb-6">Export Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#07D185] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm mb-1">Minimum Order</div>
                      <div className="text-white">{product.moq}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#07D185] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm mb-1">HS Code</div>
                      <div className="text-white">{product.hsCode}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe2 className="w-5 h-5 text-[#07D185] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm mb-1">Export Markets</div>
                      <div className="text-white">{product.countries?.length || 0}+ Countries</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#07D185] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white/70 text-sm mb-1">Certifications</div>
                      <div className="text-white">ISO, HACCP, FSSAI</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Button
                    className="w-full bg-[#07D185] hover:bg-[#06b872] text-white rounded-full"
                    onClick={() => onNavigate("contact")}
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
