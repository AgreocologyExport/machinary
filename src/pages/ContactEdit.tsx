import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Save, Plus, Trash2, ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import {
    getContactData,
    saveContactData,
    defaultContactData,
    type ContactData,
    type ContactInfo,
    type BusinessHours
} from "../data/contactData";

export function ContactEdit() {
    const [contactData, setContactData] = useState<ContactData>(defaultContactData);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadContactData = async () => {
            try {
                const data = await getContactData();
                setContactData(data);
            } catch (error) {
                console.error('Error loading contact data:', error);
                toast.error('Failed to load contact data');
            }
        };
        loadContactData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveContactData(contactData);
            toast.success("Contact information updated successfully!");
        } catch (error) {
            console.error('Error saving contact data:', error);
            toast.error('Failed to save contact data');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        setSaving(true);
        try {
            setContactData(defaultContactData);
            await saveContactData(defaultContactData);
            toast.success("Contact information reset to default!");
        } catch (error) {
            console.error('Error resetting contact data:', error);
            toast.error('Failed to reset contact data');
        } finally {
            setSaving(false);
        }
    };

    const updateContactInfo = (index: number, field: keyof ContactInfo, value: string) => {
        const newContactInfo = [...contactData.contactInfo];
        newContactInfo[index] = { ...newContactInfo[index], [field]: value };
        setContactData({ ...contactData, contactInfo: newContactInfo });
    };

    const addContactInfo = () => {
        const newContactInfo = [...contactData.contactInfo, {
            icon: "Mail",
            title: "New Contact",
            value: "",
            link: null
        }];
        setContactData({ ...contactData, contactInfo: newContactInfo });
    };

    const removeContactInfo = (index: number) => {
        const newContactInfo = contactData.contactInfo.filter((_, i) => i !== index);
        setContactData({ ...contactData, contactInfo: newContactInfo });
    };

    const updateBusinessHours = (index: number, field: keyof BusinessHours, value: string) => {
        const newBusinessHours = [...contactData.businessHours];
        newBusinessHours[index] = { ...newBusinessHours[index], [field]: value };
        setContactData({ ...contactData, businessHours: newBusinessHours });
    };

    const addBusinessHours = () => {
        const newBusinessHours = [...contactData.businessHours, {
            day: "New Day",
            hours: "9:00 AM - 5:00 PM"
        }];
        setContactData({ ...contactData, businessHours: newBusinessHours });
    };

    const removeBusinessHours = (index: number) => {
        const newBusinessHours = contactData.businessHours.filter((_, i) => i !== index);
        setContactData({ ...contactData, businessHours: newBusinessHours });
    };

    return (
        <>
            <style>
                {`
                    .contact-edit-page {
                        min-height: 100vh;
                        background: #f8fafc;
                        padding: 16px;
                    }

                    .contact-header {
                        max-width: 1200px;
                        margin: 0 auto 20px;
                    }

                    .back-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 16px;
                        background: white;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        color: #334155;
                        font-weight: 600;
                        cursor: pointer;
                        margin-bottom: 16px;
                        transition: all 0.2s;
                    }

                    .back-btn:hover {
                        background: #f1f5f9;
                        border-color: #cbd5e1;
                    }

                    .page-title {
                        font-size: 1.75rem;
                        font-weight: 700;
                        color: #043F43;
                        margin-bottom: 8px;
                    }

                    .page-subtitle {
                        color: #64748b;
                        font-size: 0.95rem;
                    }

                    .contact-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                        padding: 20px;
                    }

                    .section {
                        padding-bottom: 20px;
                        border-bottom: 1px solid #e2e8f0;
                        margin-bottom: 20px;
                    }

                    .section:last-of-type {
                        border-bottom: none;
                    }

                    .section-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 16px;
                        gap: 12px;
                        flex-wrap: wrap;
                    }

                    .section-title {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #043F43;
                    }

                    .add-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 8px 16px;
                        background: #07D185;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .add-btn:hover {
                        background: #059669;
                    }

                    .form-group {
                        margin-bottom: 16px;
                    }

                    .form-label {
                        display: block;
                        color: #043F43;
                        font-weight: 500;
                        margin-bottom: 8px;
                        font-size: 0.9rem;
                    }

                    .card {
                        padding: 16px;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        margin-bottom: 12px;
                    }

                    .card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 12px;
                    }

                    .card-title {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #043F43;
                    }

                    .delete-btn {
                        padding: 6px 10px;
                        background: #fef2f2;
                        color: #ef4444;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .delete-btn:hover {
                        background: #fee2e2;
                    }

                    .form-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 12px;
                    }

                    .action-buttons {
                        display: flex;
                        gap: 12px;
                        padding-top: 20px;
                        border-top: 1px solid #e2e8f0;
                    }

                    .save-btn {
                        flex: 1;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        padding: 12px 20px;
                        background: #07D185;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .save-btn:hover:not(:disabled) {
                        background: #059669;
                    }

                    .save-btn:disabled {
                        background: #94a3b8;
                        cursor: not-allowed;
                        opacity: 0.6;
                    }

                    .reset-btn {
                        flex: 1;
                        padding: 12px 20px;
                        background: white;
                        color: #64748b;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .reset-btn:hover:not(:disabled) {
                        background: #f8fafc;
                        border-color: #cbd5e1;
                    }

                    .reset-btn:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }

                    @media (max-width: 640px) {
                        .contact-edit-page {
                            padding: 12px;
                        }

                        .contact-container {
                            padding: 16px;
                            border-radius: 12px;
                        }

                        .page-title {
                            font-size: 1.5rem;
                        }

                        .section-title {
                            font-size: 1.1rem;
                        }

                        .section-header {
                            flex-direction: column;
                            align-items: flex-start;
                        }

                        .add-btn {
                            width: 100%;
                            justify-content: center;
                        }

                        .form-grid {
                            grid-template-columns: 1fr;
                        }

                        .action-buttons {
                            flex-direction: column;
                        }

                        .card {
                            padding: 12px;
                        }
                    }
                `}
            </style>

            <div className="contact-edit-page">
                <div className="contact-header">
                    <button className="back-btn" onClick={() => window.history.back()}>
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </button>
                    <h1 className="page-title">Edit Contact Information</h1>
                    <p className="page-subtitle">Update the contact information displayed on your website</p>
                </div>

                <div className="contact-container">
                    {/* Page Header Section */}
                    <div className="section">
                        <h2 className="section-title">Page Header</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input
                                value={contactData.title}
                                onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                                placeholder="Get in Touch"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <Textarea
                                value={contactData.description}
                                onChange={(e) => setContactData({ ...contactData, description: e.target.value })}
                                rows={3}
                                placeholder="Ready to start your export journey?"
                            />
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="section">
                        <div className="section-header">
                            <h2 className="section-title">Contact Information</h2>
                            <button className="add-btn" onClick={addContactInfo}>
                                <Plus size={18} />
                                <span>Add Contact</span>
                            </button>
                        </div>
                        {contactData.contactInfo.map((info, index) => (
                            <div key={index} className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Contact #{index + 1}</h3>
                                    {contactData.contactInfo.length > 1 && (
                                        <button className="delete-btn" onClick={() => removeContactInfo(index)}>
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Icon</label>
                                        <select
                                            value={info.icon}
                                            onChange={(e) => updateContactInfo(index, 'icon', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            <option value="Mail">Mail</option>
                                            <option value="Phone">Phone</option>
                                            <option value="MapPin">Map Pin</option>
                                            <option value="MessageCircle">Message Circle</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Title</label>
                                        <Input
                                            value={info.title}
                                            onChange={(e) => updateContactInfo(index, 'title', e.target.value)}
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Value</label>
                                        <Input
                                            value={info.value}
                                            onChange={(e) => updateContactInfo(index, 'value', e.target.value)}
                                            placeholder="contact@example.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Link (optional)</label>
                                        <Input
                                            value={info.link || ''}
                                            onChange={(e) => updateContactInfo(index, 'link', e.target.value || null)}
                                            placeholder="mailto:contact@example.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Business Hours Section */}
                    <div className="section">
                        <div className="section-header">
                            <h2 className="section-title">Business Hours</h2>
                            <button className="add-btn" onClick={addBusinessHours}>
                                <Plus size={18} />
                                <span>Add Hours</span>
                            </button>
                        </div>
                        {contactData.businessHours.map((hours, index) => (
                            <div key={index} className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Hours #{index + 1}</h3>
                                    {contactData.businessHours.length > 1 && (
                                        <button className="delete-btn" onClick={() => removeBusinessHours(index)}>
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Day(s)</label>
                                        <Input
                                            value={hours.day}
                                            onChange={(e) => updateBusinessHours(index, 'day', e.target.value)}
                                            placeholder="Monday - Friday"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Hours</label>
                                        <Input
                                            value={hours.hours}
                                            onChange={(e) => updateBusinessHours(index, 'hours', e.target.value)}
                                            placeholder="9:00 AM - 6:00 PM"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="save-btn" onClick={handleSave} disabled={saving}>
                            <Save size={20} />
                            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                        <button className="reset-btn" onClick={handleReset} disabled={saving}>
                            {saving ? 'Resetting...' : 'Reset to Default'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
