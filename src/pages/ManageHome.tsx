import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, X, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { getHomeData, saveHomeData, resetHomeData, defaultHomeData, type HomeData } from "../data/homeData";

export function ManageHome() {
    const [homeData, setHomeData] = useState<HomeData | null>(defaultHomeData);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Track which items are expanded
    const [expandedValue, setExpandedValue] = useState<number | null>(null);
    const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
    const [expandedStat, setExpandedStat] = useState<number | null>(null);
    const [expandedCert, setExpandedCert] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getHomeData();
            setHomeData(data);
        } catch (error) {
            console.error('Error loading home data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!homeData) return;

        try {
            setSaving(true);
            await saveHomeData(homeData);
            toast.success('Home page updated successfully!');
        } catch (error) {
            console.error('Error saving:', error);
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (confirm("Reset to default content? This cannot be undone.")) {
            try {
                await resetHomeData();
                await loadData();
                toast.success("Reset to defaults!");
            } catch (error) {
                console.error('Error resetting:', error);
                toast.error('Failed to reset');
            }
        }
    };

    const updateField = (field: keyof HomeData, value: any) => {
        if (homeData) {
            setHomeData({ ...homeData, [field]: value });
        }
    };

    // About Values
    const addValue = () => {
        if (homeData) {
            setHomeData({
                ...homeData,
                aboutValues: [...homeData.aboutValues, { title: "", description: "" }]
            });
        }
    };

    const removeValue = (index: number) => {
        if (homeData && homeData.aboutValues.length > 1) {
            setHomeData({
                ...homeData,
                aboutValues: homeData.aboutValues.filter((_, i) => i !== index)
            });
        }
    };

    const updateValue = (index: number, field: 'title' | 'description', value: string) => {
        if (homeData) {
            const newValues = [...homeData.aboutValues];
            newValues[index] = { ...newValues[index], [field]: value };
            setHomeData({ ...homeData, aboutValues: newValues });
        }
    };

    // Why Choose Us Features
    const addFeature = () => {
        if (homeData) {
            setHomeData({
                ...homeData,
                whyChooseUsFeatures: [...homeData.whyChooseUsFeatures, { title: "", description: "" }]
            });
        }
    };

    const removeFeature = (index: number) => {
        if (homeData && homeData.whyChooseUsFeatures.length > 1) {
            setHomeData({
                ...homeData,
                whyChooseUsFeatures: homeData.whyChooseUsFeatures.filter((_, i) => i !== index)
            });
        }
    };

    const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
        if (homeData) {
            const newFeatures = [...homeData.whyChooseUsFeatures];
            newFeatures[index] = { ...newFeatures[index], [field]: value };
            setHomeData({ ...homeData, whyChooseUsFeatures: newFeatures });
        }
    };

    // Why Choose Us Stats
    const addStat = () => {
        if (homeData) {
            setHomeData({
                ...homeData,
                whyChooseUsStats: [...homeData.whyChooseUsStats, { value: "", label: "" }]
            });
        }
    };

    const removeStat = (index: number) => {
        if (homeData && homeData.whyChooseUsStats.length > 1) {
            setHomeData({
                ...homeData,
                whyChooseUsStats: homeData.whyChooseUsStats.filter((_, i) => i !== index)
            });
        }
    };

    const updateStat = (index: number, field: 'value' | 'label', value: string) => {
        if (homeData) {
            const newStats = [...homeData.whyChooseUsStats];
            newStats[index] = { ...newStats[index], [field]: value };
            setHomeData({ ...homeData, whyChooseUsStats: newStats });
        }
    };

    // Certifications List
    const addCertification = () => {
        if (homeData) {
            setHomeData({
                ...homeData,
                certificationsList: [...homeData.certificationsList, { name: "", description: "" }]
            });
        }
    };

    const removeCertification = (index: number) => {
        if (homeData && homeData.certificationsList.length > 1) {
            setHomeData({
                ...homeData,
                certificationsList: homeData.certificationsList.filter((_, i) => i !== index)
            });
        }
    };

    const updateCertification = (index: number, field: 'name' | 'description', value: string) => {
        if (homeData) {
            const newList = [...homeData.certificationsList];
            newList[index] = { ...newList[index], [field]: value };
            setHomeData({ ...homeData, certificationsList: newList });
        }
    };

    if (!homeData) {
        return null;
    }

    return (
        <>
            <style>
                {`
                    .home-edit-page {
                        min-height: 100vh;
                        background: #f8fafc;
                        padding: 16px;
                    }
                    .home-header {
                        max-width: 1200px;
                        margin: 0 auto 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 16px;
                        flex-wrap: wrap;
                    }
                    .header-left h1 {
                        font-size: 1.75rem;
                        font-weight: 700;
                        color: #043F43;
                        margin-bottom: 4px;
                    }
                    .header-left p {
                        color: #64748b;
                        font-size: 0.95rem;
                    }
                    .header-actions {
                        display: flex;
                        gap: 10px;
                    }
                    .reset-btn, .save-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 10px 16px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                        border: none;
                        font-size: 0.9rem;
                    }
                    .reset-btn {
                        background: white;
                        color: #64748b;
                        border: 1px solid #e2e8f0;
                    }
                    .reset-btn:hover {
                        background: #f8fafc;
                    }
                    .save-btn {
                        background: #07D185;
                        color: white;
                    }
                    .save-btn:hover {
                        background: #059669;
                    }
                    .save-btn:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    .home-container {
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
                    .section:last-child {
                        border-bottom: none;
                    }
                    .section-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 16px;
                    }
                    .section-title {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #043F43;
                    }
                    .add-btn {
                        padding: 6px 10px;
                        background: #07D185;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
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
                    .form-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 12px;
                    }
                    .card {
                        padding: 12px;
                        border: 1px solid #e2e8f0;
                        border-radius: 10px;
                        margin-bottom: 12px;
                        background: #f9fafb;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .card:hover {
                        background: #ffffff;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        transform: translateY(-2px);
                        border-color: #07D185;
                    }
                    .card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        font-weight: 500;
                        color: #334155;
                        gap: 8px;
                    }
                    .card-header-content {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        flex: 1;
                    }
                    .card-header-actions {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .chevron-icon {
                        transition: transform 0.3s ease;
                        color: #07D185;
                    }
                    .chevron-icon.expanded {
                        transform: rotate(180deg);
                    }
                    .delete-btn {
                        padding: 6px;
                        background: #fef2f2;
                        color: #ef4444;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                    }
                    .delete-btn:hover {
                        background: #fee2e2;
                    }
                    @media (max-width: 640px) {
                        .home-edit-page {
                            padding: 12px;
                        }
                        .home-container {
                            padding: 16px;
                        }
                        .home-header {
                            flex-direction: column;
                        }
                        .header-left h1 {
                            font-size: 1.5rem;
                        }
                        .header-actions {
                            width: 100%;
                            flex-direction: column;
                        }
                        .reset-btn, .save-btn {
                            width: 100%;
                            justify-content: center;
                        }
                        .section-title {
                            font-size: 1.1rem;
                        }
                        .form-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}
            </style>

            <div className="home-edit-page">
                <div className="home-header">
                    <div className="header-left">
                        <h1>Manage Home Page</h1>
                        <p>Update your home page content</p>
                    </div>
                    <div className="header-actions">
                        <button className="reset-btn" onClick={handleReset}>
                            <RotateCcw size={18} />
                            <span>Reset</span>
                        </button>
                        <button className="save-btn" onClick={handleSave} disabled={saving}>
                            <Save size={18} />
                            <span>{saving ? 'Saving...' : 'Save'}</span>
                        </button>
                    </div>
                </div>

                <div className="home-container">
                    {/* Hero Section */}
                    <div className="section">
                        <h2 className="section-title">Hero Section</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={homeData.heroTitle} onChange={(e) => updateField('heroTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subtitle</label>
                            <Input value={homeData.heroSubtitle} onChange={(e) => updateField('heroSubtitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Background Image URL</label>
                            <Input value={homeData.heroBackgroundImage} onChange={(e) => updateField('heroBackgroundImage', e.target.value)} />
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="section">
                        <h2 className="section-title">About Section</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={homeData.aboutTitle} onChange={(e) => updateField('aboutTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description 1</label>
                            <Textarea value={homeData.aboutDescription1} onChange={(e) => updateField('aboutDescription1', e.target.value)} rows={3} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description 2</label>
                            <Textarea value={homeData.aboutDescription2} onChange={(e) => updateField('aboutDescription2', e.target.value)} rows={3} />
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label className="form-label">Values</label>
                                <button className="add-btn" onClick={addValue}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            {homeData.aboutValues.map((v, i) => (
                                <div
                                    key={i}
                                    className="card"
                                    onClick={() => setExpandedValue(expandedValue === i ? null : i)}
                                >
                                    <div className="card-header">
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                            <ChevronDown size={16} className={`chevron-icon ${expandedValue === i ? 'expanded' : ''}`} />
                                            Value #{i + 1}: {v.title || 'Untitled'}
                                        </span>
                                        {homeData.aboutValues.length > 1 && (
                                            <button
                                                className="delete-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeValue(i);
                                                }}
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                    {expandedValue === i && (
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <div className="form-group">
                                                <Input placeholder="Title" value={v.title} onChange={(e) => updateValue(i, 'title', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <Textarea placeholder="Description" value={v.description} onChange={(e) => updateValue(i, 'description', e.target.value)} rows={2} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="section">
                        <h2 className="section-title">Why Choose Us</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={homeData.whyChooseUsTitle} onChange={(e) => updateField('whyChooseUsTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <Textarea value={homeData.whyChooseUsDescription} onChange={(e) => updateField('whyChooseUsDescription', e.target.value)} rows={2} />
                        </div>

                        {/* Features */}
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label className="form-label">Features</label>
                                <button className="add-btn" onClick={addFeature}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            {homeData.whyChooseUsFeatures.map((f, i) => (
                                <div
                                    key={i}
                                    className="card"
                                    onClick={() => setExpandedFeature(expandedFeature === i ? null : i)}
                                >
                                    <div className="card-header">
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                            <ChevronDown size={16} className={`chevron-icon ${expandedFeature === i ? 'expanded' : ''}`} />
                                            Feature #{i + 1}: {f.title || 'Untitled'}
                                        </span>
                                        {homeData.whyChooseUsFeatures.length > 1 && (
                                            <button
                                                className="delete-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFeature(i);
                                                }}
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                    {expandedFeature === i && (
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <div className="form-group">
                                                <Input placeholder="Title" value={f.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <Textarea placeholder="Description" value={f.description} onChange={(e) => updateFeature(i, 'description', e.target.value)} rows={2} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label className="form-label">Stats</label>
                                <button className="add-btn" onClick={addStat}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="form-grid">
                                {homeData.whyChooseUsStats.map((s, i) => (
                                    <div
                                        key={i}
                                        className="card"
                                        onClick={() => setExpandedStat(expandedStat === i ? null : i)}
                                    >
                                        <div className="card-header">
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                <ChevronDown size={16} className={`chevron-icon ${expandedStat === i ? 'expanded' : ''}`} />
                                                Stat {i + 1}: {s.value} {s.label || 'Untitled'}
                                            </span>
                                            {homeData.whyChooseUsStats.length > 1 && (
                                                <button
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeStat(i);
                                                    }}
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                        {expandedStat === i && (
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <div className="form-group">
                                                    <Input placeholder="Value (e.g., 40+)" value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <Input placeholder="Label (e.g., Countries)" value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Certifications Section */}
                    <div className="section">
                        <h2 className="section-title">Certifications</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={homeData.certificationsTitle} onChange={(e) => updateField('certificationsTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <Textarea value={homeData.certificationsDescription} onChange={(e) => updateField('certificationsDescription', e.target.value)} rows={2} />
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label className="form-label">Certifications List</label>
                                <button className="add-btn" onClick={addCertification}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="form-grid">
                                {homeData.certificationsList.map((c, i) => (
                                    <div
                                        key={i}
                                        className="card"
                                        onClick={() => setExpandedCert(expandedCert === i ? null : i)}
                                    >
                                        <div className="card-header">
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                <ChevronDown size={16} className={`chevron-icon ${expandedCert === i ? 'expanded' : ''}`} />
                                                Cert {i + 1}: {c.name || 'Untitled'}
                                            </span>
                                            {homeData.certificationsList.length > 1 && (
                                                <button
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeCertification(i);
                                                    }}
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                        {expandedCert === i && (
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <div className="form-group">
                                                    <Input placeholder="Name" value={c.name} onChange={(e) => updateCertification(i, 'name', e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <Input placeholder="Description" value={c.description} onChange={(e) => updateCertification(i, 'description', e.target.value)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
