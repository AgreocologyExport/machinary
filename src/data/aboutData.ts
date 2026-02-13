// About Page Data - Dynamic and Editable with Firebase Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';

export interface TimelineItem {
    year: string;
    event: string;
    description: string;
}

export interface ValueItem {
    title: string;
    description: string;
}

export interface TeamMember {
    name: string;
    role: string;
}

export interface ProcessStep {
    step: string;
    title: string;
    description: string;
}

export interface Stats {
    yearsExperience: string;
    countriesServed: string;
    globalPartners: string;
    tonsExported: string;
}

export interface SustainabilityStats {
    traceableSupplyChain: string;
    organicCertified: string;
    partnerFarmers: string;
}

export interface AboutData {
    heroTitle: string;
    heroDescription: string;

    storyTitle: string;
    storyParagraph1: string;
    storyParagraph2: string;
    storyParagraph3: string;

    stats: Stats;

    values: ValueItem[];

    exportProcessTitle: string;
    exportProcessDescription: string;
    process: ProcessStep[];

    team: TeamMember[];

    timeline: TimelineItem[];

    sustainabilityTitle: string;
    sustainabilityDescription: string;
    sustainabilityPoints: string[];
    sustainabilityStats: SustainabilityStats;
}

// Default about data
export const defaultAboutData: AboutData = {
    heroTitle: "About Agreocology",
    heroDescription: "Building bridges between farmers and global markets through sustainable practices and unwavering commitment to quality.",

    storyTitle: "Our Story",
    storyParagraph1: "Founded in 2008, Agreocology began with a simple yet powerful vision: to create a sustainable bridge between traditional agriculture and modern global markets. What started as a small export operation has grown into a trusted partner for businesses across 50+ countries.",
    storyParagraph2: "Our journey has been driven by our commitment to three core principles: unwavering quality standards, ethical sourcing practices, and building genuine partnerships. We work directly with farming communities, ensuring fair practices while maintaining the highest international standards.",
    storyParagraph3: "Today, we export over 50,000 tons of premium agricultural products annually, but our focus remains unchanged—delivering excellence in every shipment while contributing to sustainable agricultural practices worldwide.",

    stats: {
        yearsExperience: "15+",
        countriesServed: "50+",
        globalPartners: "500+",
        tonsExported: "50K+"
    },

    values: [
        {
            title: "Our Mission",
            description: "To deliver premium agricultural products to global markets while supporting sustainable farming practices and building long-term partnerships based on trust and excellence."
        },
        {
            title: "Our Vision",
            description: "To become the world's most trusted agricultural export partner, known for quality, reliability, and commitment to sustainable practices that benefit farmers and consumers alike."
        },
        {
            title: "Our Values",
            description: "Integrity, sustainability, excellence, transparency, and partnership. We believe in creating value for all stakeholders through ethical business practices."
        }
    ],

    exportProcessTitle: "Our Export Process",
    exportProcessDescription: "A streamlined, quality-focused process ensuring excellence from farm to destination.",
    process: [
        { step: "1", title: "Sourcing", description: "Direct partnerships with certified farms" },
        { step: "2", title: "Quality Check", description: "Rigorous testing and grading" },
        { step: "3", title: "Processing", description: "Clean, sort, and package to standards" },
        { step: "4", title: "Documentation", description: "Complete export paperwork and certifications" },
        { step: "5", title: "Logistics", description: "Temperature-controlled shipping" },
        { step: "6", title: "Delivery", description: "On-time delivery to destination" }
    ],

    team: [
        { name: "Rajesh Kumar", role: "Founder & CEO" },
        { name: "Priya Sharma", role: "Head of Export Operations" },
        { name: "Amit Patel", role: "Quality Assurance Director" },
        { name: "Sarah Williams", role: "International Relations" }
    ],

    timeline: [
        { year: "2008", event: "Company Founded", description: "Started with a vision to connect global markets" },
        { year: "2012", event: "International Expansion", description: "Expanded to 15+ countries across 3 continents" },
        { year: "2016", event: "ISO Certification", description: "Achieved ISO 9001:2015 certification" },
        { year: "2020", event: "Organic Certification", description: "Received USDA and EU organic certifications" },
        { year: "2023", event: "50+ Countries", description: "Serving clients in over 50 countries worldwide" },
        { year: "2025", event: "Sustainable Future", description: "Leading the way in sustainable agriculture exports" }
    ],

    sustainabilityTitle: "Ethical & Sustainable Sourcing",
    sustainabilityDescription: "Sustainability isn't just a buzzword for us—it's at the core of everything we do. We work directly with farming communities to ensure fair wages, safe working conditions, and environmentally responsible practices.",
    sustainabilityPoints: [
        "Direct partnerships with certified organic farms",
        "Fair trade practices and transparent pricing",
        "Water conservation and soil health programs",
        "Zero-waste packaging initiatives",
        "Carbon-neutral shipping options"
    ],
    sustainabilityStats: {
        traceableSupplyChain: "100%",
        organicCertified: "85%",
        partnerFarmers: "2,000+"
    }
};

const ABOUT_DOC = 'about/content';

// Get about data from Firestore
export const getAboutData = async (): Promise<AboutData> => {
    try {
        const docRef = doc(db, 'about', 'content');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as AboutData;
        } else {
            // Initialize with default data
            await setDoc(docRef, defaultAboutData);
            return defaultAboutData;
        }
    } catch (error) {
        console.error('Error fetching about data:', error);
        return defaultAboutData;
    }
};

// Save about data to Firestore
export const saveAboutData = async (data: AboutData): Promise<void> => {
    try {
        const docRef = doc(db, 'about', 'content');
        await setDoc(docRef, data);
        console.log('About data saved successfully');
    } catch (error) {
        console.error('Error saving about data:', error);
        throw error;
    }
};

// Reset to default
export const resetAboutData = async (): Promise<void> => {
    try {
        await saveAboutData(defaultAboutData);
    } catch (error) {
        console.error('Error resetting about data:', error);
        throw error;
    }
};
