import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { getProductsData, defaultProducts, type Product } from "../data/productsData";

interface ProductsPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Load products from Firebase on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsFetching(true);
        const dataPromise = getProductsData();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Fetch timeout')), 3000)
        );

        const data = await Promise.race([dataPromise, timeoutPromise]) as Product[];
        setProducts(data);
      } catch (error) {
        console.warn('Products fetch slow/failed:', error);
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div ref={ref} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#043F43] to-[#043F43]/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">Our Products</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              A comprehensive range of premium agricultural products sourced from the finest farms and delivered to markets worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {isFetching && products.length > 0 && (
            <div className="mb-8 text-[#07D185] text-sm animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-[#07D185] rounded-full"></div>
              Refreshing products...
            </div>
          )}
          {loading && products.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-[#043F43] text-xl">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#043F43] text-xl">No products available.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => onNavigate("product-detail", product.id)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#043F43] via-[#043F43]/40 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                        <Package className="w-4 h-4" />
                        <span>{product.varietiesCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-[#043F43] mb-3">{product.title}</h3>
                    <p className="text-[#043F43] opacity-70 mb-4">
                      {product.shortDescription}
                    </p>
                    <div className="mb-4 pb-4 border-b border-[#07D185]/10">
                      <div className="text-sm text-[#043F43] opacity-60">Minimum Order</div>
                      <div className="text-[#043F43]">{product.moq}</div>
                    </div>
                    <div className="flex items-center text-[#07D185] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="mr-2">View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#07D185]/5 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#043F43] mb-6">Need a Custom Product?</h2>
            <p className="text-[#043F43] opacity-80 mb-8">
              We can source and supply custom agricultural products based on your specific requirements. Get in touch with our export team.
            </p>
            <Button
              size="lg"
              className="bg-[#07D185] hover:bg-[#06b872] text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigate("contact")}
            >
              Contact Export Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
