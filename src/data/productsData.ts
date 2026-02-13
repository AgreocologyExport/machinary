// Product Data - Dynamic and Editable with Firebase Realtime Database
import { ref, get, set, remove, child } from 'firebase/database';
import { database } from '../firebase/config';

export interface ProductVariety {
    name: string;
    grade: string;
    moisture: string;
}

export interface ProductSpecifications {
    [key: string]: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    varieties: ProductVariety[];
    specifications: ProductSpecifications;
    packaging: string[];
    moq: string;
    hsCode: string;
    countries: string[];
    shortDescription: string; // For products page card
    varietiesCount: string; // For products page card (e.g., "15+ varieties")
}

// Default products data
export const defaultProducts: Product[] = [
    {
        id: "pulses",
        title: "Pulses",
        shortDescription: "Premium quality lentils, chickpeas, kidney beans, and various pulses sourced from certified farms.",
        description: "Premium quality pulses sourced from certified farms, meeting international food safety standards.",
        image: "https://images.unsplash.com/photo-1612504258838-fbf14fe4437d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxzZXMlMjBsZW50aWxzJTIwYmVhbnN8ZW58MXx8fHwxNzYyNTI5MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        varietiesCount: "15+ varieties",
        varieties: [
            { name: "Red Lentils", grade: "Grade A", moisture: "12% max" },
            { name: "Green Lentils", grade: "Grade A", moisture: "12% max" },
            { name: "Chickpeas (Kabuli)", grade: "Grade A+", moisture: "11% max" },
            { name: "Chickpeas (Desi)", grade: "Grade A", moisture: "12% max" },
            { name: "Kidney Beans", grade: "Grade A", moisture: "13% max" },
            { name: "Black Beans", grade: "Grade A", moisture: "13% max" }
        ],
        specifications: {
            moisture: "11-13% (varies by variety)",
            purity: "99.5% minimum",
            admixture: "0.5% maximum",
            damaged: "1% maximum",
            foreignMatter: "0.1% maximum"
        },
        packaging: [
            "25 kg PP bags",
            "50 kg PP bags",
            "1000 kg bulk bags",
            "Custom packaging available"
        ],
        moq: "1 container (20 MT)",
        hsCode: "0713.xx.xx (varies by variety)",
        countries: ["USA", "Canada", "UK", "UAE", "Saudi Arabia", "Malaysia", "Singapore", "Australia"]
    },
    {
        id: "grains",
        title: "Grains",
        shortDescription: "High-quality wheat, rice, corn, and specialty grains meeting international standards.",
        description: "High-quality grains including wheat, rice, and corn, processed to meet global quality standards.",
        image: "https://images.unsplash.com/photo-1595360584848-6404da6fe097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWlucyUyMGhhcnZlc3R8ZW58MXx8fHwxNzYyNTI5MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        varietiesCount: "10+ varieties",
        varieties: [
            { name: "Basmati Rice", grade: "1121 Extra Long", moisture: "12% max" },
            { name: "Non-Basmati Rice", grade: "IR-64", moisture: "13% max" },
            { name: "Wheat", grade: "Durum", moisture: "12% max" },
            { name: "Corn (Maize)", grade: "Yellow #2", moisture: "14% max" }
        ],
        specifications: {
            moisture: "12-14% (varies by variety)",
            purity: "99% minimum",
            brokens: "2% maximum",
            damaged: "1% maximum",
            foreignMatter: "0.2% maximum"
        },
        packaging: [
            "25 kg PP bags",
            "50 kg PP bags",
            "1000 kg bulk bags",
            "Retail packing available"
        ],
        moq: "2 containers (40 MT)",
        hsCode: "1001-1008 (varies by grain type)",
        countries: ["UAE", "Kuwait", "Qatar", "Iraq", "Yemen", "Kenya", "Tanzania", "South Africa"]
    },
    {
        id: "spices",
        title: "Spices",
        shortDescription: "Authentic spices with rich aroma including turmeric, chili, cumin, cardamom, and more.",
        description: "Authentic spices with rich aroma and color, sourced from premium growing regions.",
        image: "https://images.unsplash.com/photo-1738680981649-3f81bdfe225d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBjb2xvcmZ1bCUyMG1hcmtldHxlbnwxfHx8fDE3NjI1MjkzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        varietiesCount: "25+ varieties",
        varieties: [
            { name: "Turmeric Powder", grade: "Curcumin 3%+", moisture: "10% max" },
            { name: "Red Chili Powder", grade: "Premium", moisture: "10% max" },
            { name: "Cumin Seeds", grade: "Singapore Quality", moisture: "9% max" },
            { name: "Cardamom", grade: "8mm Bold", moisture: "10% max" },
            { name: "Black Pepper", grade: "500 G/L", moisture: "12% max" },
            { name: "Coriander Seeds", grade: "Eagle Quality", moisture: "9% max" }
        ],
        specifications: {
            moisture: "9-12% (varies by spice)",
            purity: "99% minimum",
            color: "Natural, no added colors",
            aroma: "Strong and characteristic",
            packaging: "Food-grade materials"
        },
        packaging: [
            "5 kg PP bags",
            "10 kg cartons",
            "25 kg PP bags",
            "Retail packing (100g, 500g, 1kg)"
        ],
        moq: "500 kg",
        hsCode: "0904-0910 (varies by spice)",
        countries: ["USA", "UK", "Germany", "France", "UAE", "Singapore", "Malaysia", "Japan"]
    },
    {
        id: "oil-seeds",
        title: "Oil Seeds",
        shortDescription: "Nutrient-rich oil seeds including sesame, mustard, sunflower, and groundnut.",
        description: "Nutrient-rich oil seeds for extraction and cultivation, meeting international standards.",
        image: "https://images.unsplash.com/photo-1677887724347-a1c4636e402c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMG9pbCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2MjUyOTM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        varietiesCount: "8+ varieties",
        varieties: [
            { name: "Sesame Seeds (White)", grade: "99/1/1", moisture: "6% max" },
            { name: "Sesame Seeds (Black)", grade: "99/1/1", moisture: "6% max" },
            { name: "Mustard Seeds", grade: "Premium", moisture: "8% max" },
            { name: "Sunflower Seeds", grade: "Grade A", moisture: "9% max" },
            { name: "Groundnut", grade: "Bold/Medium", moisture: "8% max" }
        ],
        specifications: {
            moisture: "6-9% (varies by seed)",
            purity: "99% minimum",
            admixture: "1% maximum",
            oilContent: "As per natural standards",
            ffa: "2% maximum"
        },
        packaging: [
            "25 kg PP bags",
            "50 kg jute bags",
            "1000 kg bulk bags",
            "Vacuum packed available"
        ],
        moq: "1 container (20 MT)",
        hsCode: "1207-1208 (varies by seed type)",
        countries: ["China", "Japan", "South Korea", "Turkey", "Egypt", "UAE", "USA", "Netherlands"]
    },
    {
        id: "fresh-produce",
        title: "Fresh Produce",
        shortDescription: "Farm-fresh vegetables and fruits with optimal shelf life and quality preservation.",
        description: "Farm-fresh vegetables and fruits with optimal shelf life and quality preservation.",
        image: "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBwcm9kdWNlfGVufDF8fHx8MTc2MjQzMDcwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        varietiesCount: "20+ varieties",
        varieties: [
            { name: "Onions", grade: "Medium/Large", moisture: "Natural" },
            { name: "Potatoes", grade: "Premium", moisture: "Natural" },
            { name: "Tomatoes", grade: "Grade A", moisture: "Natural" },
            { name: "Mangoes", grade: "Alphonso/Kesar", moisture: "Natural" },
            { name: "Grapes", grade: "Thompson Seedless", moisture: "Natural" },
            { name: "Pomegranates", grade: "Aril Grade", moisture: "Natural" }
        ],
        specifications: {
            freshness: "Farm-fresh within 24-48 hours",
            size: "Uniform sizing",
            color: "Natural, no artificial ripening",
            shelfLife: "7-21 days (varies by product)",
            temperature: "Cold chain maintained"
        },
        packaging: [
            "Ventilated cartons",
            "Reefer containers",
            "Temperature-controlled packaging",
            "Custom export packing"
        ],
        moq: "Air freight - 1 ton",
        hsCode: "0702-0810 (varies by produce)",
        countries: ["UAE", "UK", "Germany", "Singapore", "Malaysia", "Kuwait", "Qatar", "Oman"]
    },
    {
        id: "agro-commodities",
        title: "Agro Commodities",
        shortDescription: "Diverse agricultural commodities including sugar, tea, coffee, and processed goods.",
        description: "Diverse agricultural commodities including processed and value-added products.",
        image: "https://images.unsplash.com/photo-1594968354688-e353e91a45f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBjb21tb2RpdGllc3xlbnwxfHx8fDE3NjI1MjkzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        varietiesCount: "30+ products",
        varieties: [
            { name: "Sugar (Refined)", grade: "S30/M30", moisture: "0.04% max" },
            { name: "Tea (Black)", grade: "CTC/Orthodox", moisture: "7% max" },
            { name: "Coffee Beans", grade: "Arabica/Robusta", moisture: "12% max" },
            { name: "Cashew Nuts", grade: "W320/W240", moisture: "5% max" },
            { name: "Almonds", grade: "California Type", moisture: "6% max" },
            { name: "Dried Fruits", grade: "Premium", moisture: "Variable" }
        ],
        specifications: {
            moisture: "Varies by product",
            purity: "99% minimum",
            processing: "International standards",
            certification: "HACCP, ISO certified",
            quality: "Export grade"
        },
        packaging: [
            "Product-specific packaging",
            "Retail packing available",
            "Bulk packing available",
            "Custom branding possible"
        ],
        moq: "Varies by product",
        hsCode: "Various (product dependent)",
        countries: ["Global - 50+ countries"]
    }
];

// Path for Realtime Database
const PRODUCTS_PATH = 'agro-products';

// Get products data from Realtime Database or return default
export const getProductsData = async (): Promise<Product[]> => {
    try {
        const productsRef = ref(database, PRODUCTS_PATH);
        const snapshot = await get(productsRef);

        if (!snapshot.exists()) {
            // If no products in database, initialize with defaults
            await initializeDefaultProducts();
            return defaultProducts;
        }

        const data = snapshot.val();
        // data will be an object where keys are product IDs
        const products: Product[] = Object.values(data);

        return products;
    } catch (error) {
        console.error('Error fetching products from Realtime Database:', error);
        return defaultProducts;  // Return defaults on error
    }
};

// Initialize Realtime Database with default products
export const initializeDefaultProducts = async (): Promise<void> => {
    try {
        const productsRef = ref(database, PRODUCTS_PATH);
        const productsMap: { [key: string]: Product } = {};
        for (const product of defaultProducts) {
            productsMap[product.id] = product;
        }
        await set(productsRef, productsMap);
        console.log('Default products initialized in Realtime Database');
    } catch (error) {
        console.error('Error initializing default products:', error);
    }
};

// Save products data to Realtime Database
export const saveProductsData = async (products: Product[]): Promise<void> => {
    try {
        const productsRef = ref(database, PRODUCTS_PATH);
        const productsMap: { [key: string]: Product } = {};
        for (const product of products) {
            productsMap[product.id] = product;
        }
        await set(productsRef, productsMap);
        console.log('Products saved to Realtime Database successfully');
    } catch (error) {
        console.error('Error saving products to Realtime Database:', error);
        throw error;
    }
};

// Get single product by ID from Realtime Database
export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const productRef = ref(database, `${PRODUCTS_PATH}/${id}`);
        const snapshot = await get(productRef);

        if (snapshot.exists()) {
            return snapshot.val() as Product;
        }

        // If not found in database, check defaults
        return defaultProducts.find(p => p.id === id);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return defaultProducts.find(p => p.id === id);
    }
};

// Add new product to Realtime Database
export const addProduct = async (product: Product): Promise<void> => {
    try {
        const productRef = ref(database, `${PRODUCTS_PATH}/${product.id}`);
        await set(productRef, product);
        console.log('Product added to Realtime Database');
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Update existing product in Realtime Database
export const updateProduct = async (id: string, updatedProduct: Product): Promise<void> => {
    try {
        const productRef = ref(database, `${PRODUCTS_PATH}/${id}`);
        await set(productRef, updatedProduct);
        console.log('Product updated in Realtime Database');
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete product from Realtime Database
export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const productRef = ref(database, `${PRODUCTS_PATH}/${id}`);
        await remove(productRef);
        console.log('Product deleted from Realtime Database');
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
