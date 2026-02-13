import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface HomeData {
    // Hero Section
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;

    // About Section
    aboutTitle: string;
    aboutDescription1: string;
    aboutDescription2: string;
    aboutValues: {
        title: string;
        description: string;
    }[];

    // Why Choose Us
    whyChooseUsTitle: string;
    whyChooseUsDescription: string;
    whyChooseUsFeatures: {
        title: string;
        description: string;
    }[];
    whyChooseUsStats: {
        value: string;
        label: string;
    }[];

    // Certifications
    certificationsTitle: string;
    certificationsDescription: string;
    certificationsList: {
        name: string;
        description: string;
    }[];
}

export const defaultHomeData: HomeData = {
    // Hero Section
    heroTitle: "Agreocology",
    heroSubtitle: "Beyond Agriculture. Beyond Boundaries.",
    heroBackgroundImage: "https://plus.unsplash.com/premium_photo-1661881416333-f75746261454",

    // About Section
    aboutTitle: "About Agreocology",
    aboutDescription1: "Agreocology stands at the forefront of global agricultural exports, bridging farmers and markets across continents. We are committed to delivering excellence in every shipment, ensuring that quality agricultural products reach their destinations with integrity and care.",
    aboutDescription2: "With deep roots in agricultural communities and a global network spanning multiple continents, we understand both the land and the logistics. Our expertise encompasses the entire export value chain—from sourcing and quality control to documentation and timely delivery.",
    aboutValues: [
        {
            title: "Global Vision",
            description: "Connecting continents through sustainable agriculture and reliable export networks."
        },
        {
            title: "Quality Mission",
            description: "Delivering premium agricultural products that meet international standards."
        },
        {
            title: "Ethical Values",
            description: "Building partnerships based on trust, transparency, and shared growth."
        }
    ],

    // Why Choose Us
    whyChooseUsTitle: "Why Choose Agreocology",
    whyChooseUsDescription: "Trusted by partners worldwide for our commitment to excellence, reliability, and sustainable practices.",
    whyChooseUsFeatures: [
        {
            title: "Global Reach",
            description: "Established export networks spanning across 40+ countries on 5 continents."
        },
        {
            title: "Quality Control",
            description: "Rigorous testing and certification ensuring products meet international standards."
        },
        {
            title: "Fast Logistics",
            description: "Efficient supply chain management with temperature-controlled shipping solutions."
        },
        {
            title: "Ethical Sourcing",
            description: "Direct partnerships with farmers ensuring fair practices and sustainability."
        },
        {
            title: "Consistent Supply",
            description: "Reliable year-round availability through strategic sourcing and storage."
        }
    ],
    whyChooseUsStats: [
        { value: "40+", label: "Countries" },
        { value: "500+", label: "Partners" },
        { value: "50K+", label: "Tons Exported" },
        { value: "15+", label: "Years Experience" }
    ],

    // Certifications
    certificationsTitle: "Certifications & Compliance",
    certificationsDescription: "Our commitment to quality and safety is validated by leading international certifications and compliance standards.",
    certificationsList: [
        {
            name: "ISO 9001:2015",
            description: "Quality Management System"
        },
        {
            name: "HACCP",
            description: "Food Safety Standards"
        },
        {
            name: "Organic Certified",
            description: "USDA & EU Organic"
        },
        {
            name: "FSSAI",
            description: "Food Safety Compliance"
        }
    ]
};

// Get home data from Firestore with timeout
export const getHomeData = async (): Promise<HomeData> => {
    try {
        // Create a timeout promise
        const timeoutPromise = new Promise<HomeData>((resolve) => {
            setTimeout(() => {
                console.warn('Firestore fetch timeout, using default data');
                resolve(defaultHomeData);
            }, 2000); // 2 second timeout
        });

        // Create the fetch promise
        const fetchPromise = (async () => {
            const docRef = doc(db, 'home', 'content');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as HomeData;
            } else {
                // Initialize with default data in background
                setDoc(docRef, defaultHomeData).catch(err =>
                    console.error('Error initializing home data:', err)
                );
                return defaultHomeData;
            }
        })();

        // Race between timeout and fetch
        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error('Error fetching home data:', error);
        return defaultHomeData;
    }
};

// Save home data to Firestore
export const saveHomeData = async (data: HomeData): Promise<void> => {
    try {
        const docRef = doc(db, 'home', 'content');
        await setDoc(docRef, data);
        console.log('Home data saved successfully');
    } catch (error) {
        console.error('Error saving home data:', error);
        throw error;
    }
};

// Reset to default
export const resetHomeData = async (): Promise<void> => {
    try {
        await saveHomeData(defaultHomeData);
    } catch (error) {
        console.error('Error resetting home data:', error);
        throw error;
    }
};
