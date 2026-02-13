import { db } from '../firebase/config.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Contact Information Data - Dynamic and Editable
export interface ContactInfo {
    icon: string;
    title: string;
    value: string;
    link: string | null;
}

export interface BusinessHours {
    day: string;
    hours: string;
}

export interface ContactData {
    title: string;
    subtitle: string;
    description: string;
    contactInfo: ContactInfo[];
    businessHours: BusinessHours[];
}

// Default contact data
export const defaultContactData: ContactData = {
    title: "Get in Touch",
    subtitle: "Contact Us",
    description: "Ready to start your export journey? Contact us for business inquiries, product information, or partnership opportunities.",
    contactInfo: [
        {
            icon: "Mail",
            title: "Email",
            value: "export@agreocology.com",
            link: "mailto:export@agreocology.com"
        },
        {
            icon: "Phone",
            title: "Phone",
            value: "+1 (555) 123-4567",
            link: "tel:+15551234567"
        },
        {
            icon: "MapPin",
            title: "Office",
            value: "Global Trade Center, Export Hub",
            link: null
        }
    ],
    businessHours: [
        { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" }
    ]
};

// Get contact data from Firestore
export const getContactData = async (): Promise<ContactData> => {
    try {
        const docRef = doc(db, 'contact', 'content');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as ContactData;
        } else {
            // Initialize with default data if no document exists
            await setDoc(docRef, defaultContactData);
            return defaultContactData;
        }
    } catch (error) {
        console.error('Error fetching contact data from Firestore:', error);
        return defaultContactData;
    }
};

// Save contact data to Firestore
export const saveContactData = async (data: ContactData): Promise<void> => {
    try {
        const docRef = doc(db, 'contact', 'content');
        await setDoc(docRef, data);
        console.log('Contact data saved to Firestore');
    } catch (error) {
        console.error('Error saving contact data to Firestore:', error);
        throw error;
    }
};
