import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, X, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { getAboutData, saveAboutData, resetAboutData, type AboutData } from "../data/aboutData";

export function ManageAbout() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await getAboutData();
            setAboutData(data);
        } catch (error) {
            console.error('Error loading about data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!aboutData) return;

        try {
            setSaving(true);
            await saveAboutData(aboutData);
            toast.success('About page updated successfully!');
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
                await resetAboutData();
                await loadData();
                toast.success("Reset to defaults!");
            } catch (error) {
                console.error('Error resetting:', error);
                toast.error('Failed to reset');
            }
        }
    };

    const updateField = (field: keyof AboutData, value: any) => {
        if (aboutData) {
            setAboutData({ ...aboutData, [field]: value });
        }
    };

    const addValue = () => {
        if (aboutData) {
            setAboutData({
                ...aboutData,
                values: [...aboutData.values, { title: "", description: "" }]
            });
        }
    };

    const removeValue = (index: number) => {
        if (aboutData && aboutData.values.length > 1) {
            setAboutData({
                ...aboutData,
                values: aboutData.values.filter((_, i) => i !== index)
            });
        }
    };

    const updateValue = (index: number, field: 'title' | 'description', value: string) => {
        if (aboutData) {
            const newValues = [...aboutData.values];
            newValues[index] = { ...newValues[index], [field]: value };
            setAboutData({ ...aboutData, values: newValues });
        }
    };

    const addProcessStep = () => {
        if (aboutData) {
            const nextStep = (aboutData.process.length + 1).toString();
            setAboutData({
                ...aboutData,
                process: [...aboutData.process, { step: nextStep, title: "", description: "" }]
            });
        }
    };

    const removeProcessStep = (index: number) => {
        if (aboutData && aboutData.process.length > 1) {
            setAboutData({
                ...aboutData,
                process: aboutData.process.filter((_, i) => i !== index)
            });
        }
    };

    const updateProcess = (index: number, field: 'title' | 'description', value: string) => {
        if (aboutData) {
            const newProcess = [...aboutData.process];
            newProcess[index] = { ...newProcess[index], [field]: value };
            setAboutData({ ...aboutData, process: newProcess });
        }
    };

    const addTeamMember = () => {
        if (aboutData) {
            setAboutData({
                ...aboutData,
                team: [...aboutData.team, { name: "", role: "" }]
            });
        }
    };

    const removeTeamMember = (index: number) => {
        if (aboutData && aboutData.team.length > 1) {
            setAboutData({
                ...aboutData,
                team: aboutData.team.filter((_, i) => i !== index)
            });
        }
    };

    const updateTeam = (index: number, field: 'name' | 'role', value: string) => {
        if (aboutData) {
            const newTeam = [...aboutData.team];
            newTeam[index] = { ...newTeam[index], [field]: value };
            setAboutData({ ...aboutData, team: newTeam });
        }
    };

    const addTimeline = () => {
        if (aboutData) {
            setAboutData({
                ...aboutData,
                timeline: [...aboutData.timeline, { year: "", event: "", description: "" }]
            });
        }
    };

    const removeTimeline = (index: number) => {
        if (aboutData && aboutData.timeline.length > 1) {
            setAboutData({
                ...aboutData,
                timeline: aboutData.timeline.filter((_, i) => i !== index)
            });
        }
    };

    const updateTimeline = (index: number, field: 'year' | 'event' | 'description', value: string) => {
        if (aboutData) {
            const newTimeline = [...aboutData.timeline];
            newTimeline[index] = { ...newTimeline[index], [field]: value };
            setAboutData({ ...aboutData, timeline: newTimeline });
        }
    };

    const addSustainabilityPoint = () => {
        if (aboutData) {
            setAboutData({
                ...aboutData,
                sustainabilityPoints: [...aboutData.sustainabilityPoints, ""]
            });
        }
    };

    const removeSustainabilityPoint = (index: number) => {
        if (aboutData && aboutData.sustainabilityPoints.length > 1) {
            setAboutData({
                ...aboutData,
                sustainabilityPoints: aboutData.sustainabilityPoints.filter((_, i) => i !== index)
            });
        }
    };

    const updateSustainabilityPoint = (index: number, value: string) => {
        if (aboutData) {
            const newPoints = [...aboutData.sustainabilityPoints];
            newPoints[index] = value;
            setAboutData({ ...aboutData, sustainabilityPoints: newPoints });
        }
    };

    if (loading || !aboutData) {
        return (
            <>
                <style>
                    {`
                        .loading-screen {
                            min-height: 100vh;
                            background: #f8fafc;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            gap: 16px;
                        }
                        .spinner {
                            width: 40px;
                            height: 40px;
                            border: 3px solid #e2e8f0;
                            border-top-color: #07D185;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                        }
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <div className="loading-screen">
                    <div className="spinner"></div>
                    <div style={{ color: '#64748b' }}>Loading...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>
                {`
                    .about-edit-page {
                        min-height: 100vh;
                        background: #f8fafc;
                        padding: 16px;
                    }
                    .about-header {
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
                    .about-container {
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
                    }
                    .card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        font-weight: 500;
                        color: #334155;
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
                        .about-edit-page {
                            padding: 12px;
                        }
                        .about-container {
                            padding: 16px;
                        }
                        .about-header {
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

            <div className="about-edit-page">
                <div className="about-header">
                    <div className="header-left">
                        <h1>Manage About Page</h1>
                        <p>Update your company information</p>
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

                <div className="about-container">
                    {/* Hero Section */}
                    <div className="section">
                        <h2 className="section-title">Hero Section</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={aboutData.heroTitle} onChange={(e) => updateField('heroTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <Textarea value={aboutData.heroDescription} onChange={(e) => updateField('heroDescription', e.target.value)} rows={2} />
                        </div>
                    </div>

                    {/* Story Section */}
                    <div className="section">
                        <h2 className="section-title">Our Story</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={aboutData.storyTitle} onChange={(e) => updateField('storyTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Paragraph 1</label>
                            <Textarea value={aboutData.storyParagraph1} onChange={(e) => updateField('storyParagraph1', e.target.value)} rows={3} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Paragraph 2</label>
                            <Textarea value={aboutData.storyParagraph2} onChange={(e) => updateField('storyParagraph2', e.target.value)} rows={3} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Paragraph 3</label>
                            <Textarea value={aboutData.storyParagraph3} onChange={(e) => updateField('storyParagraph3', e.target.value)} rows={3} />
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="section">
                        <h2 className="section-title">Statistics</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Years Experience</label>
                                <Input value={aboutData.stats.yearsExperience} onChange={(e) => setAboutData({ ...aboutData, stats: { ...aboutData.stats, yearsExperience: e.target.value } })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Countries Served</label>
                                <Input value={aboutData.stats.countriesServed} onChange={(e) => setAboutData({ ...aboutData, stats: { ...aboutData.stats, countriesServed: e.target.value } })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Global Partners</label>
                                <Input value={aboutData.stats.globalPartners} onChange={(e) => setAboutData({ ...aboutData, stats: { ...aboutData.stats, globalPartners: e.target.value } })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tons Exported</label>
                                <Input value={aboutData.stats.tonsExported} onChange={(e) => setAboutData({ ...aboutData, stats: { ...aboutData.stats, tonsExported: e.target.value } })} />
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="section">
                        <div className="section-header">
                            <h2 className="section-title">Mission, Vision & Values</h2>
                            <button className="add-btn" onClick={addValue}>
                                <Plus size={16} />
                            </button>
                        </div>
                        {aboutData.values.map((v, i) => (
                            <div key={i} className="card">
                                <div className="card-header">
                                    <span>#{i + 1}</span>
                                    {aboutData.values.length > 1 && (
                                        <button className="delete-btn" onClick={() => removeValue(i)}>
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                                <div className="form-group">
                                    <Input placeholder="Title (e.g., Our Mission)" value={v.title} onChange={(e) => updateValue(i, 'title', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <Textarea placeholder="Description" value={v.description} onChange={(e) => updateValue(i, 'description', e.target.value)} rows={3} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Export Process */}
                    <div className="section">
                        <div className="section-header">
                            <h2 className="section-title">Export Process</h2>
                            <button className="add-btn" onClick={addProcessStep}>
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="form-group">
                            <Input placeholder="Section Title" value={aboutData.exportProcessTitle} onChange={(e) => updateField('exportProcessTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <Input placeholder="Section Description" value={aboutData.exportProcessDescription} onChange={(e) => updateField('exportProcessDescription', e.target.value)} />
                        </div>
                        {aboutData.process.map((p, i) => (
                            <div key={i} className="card">
                                <div className="card-header">
                                    <span>Step {p.step}</span>
                                    {aboutData.process.length > 1 && (
                                        <button className="delete-btn" onClick={() => removeProcessStep(i)}>
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                                <div className="form-group">
                                    <Input placeholder="Title" value={p.title} onChange={(e) => updateProcess(i, 'title', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <Input placeholder="Description" value={p.description} onChange={(e) => updateProcess(i, 'description', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Team */}
                    <div className="section">
                        <div className="section-header">
                            <h2 className="section-title">Leadership Team</h2>
                            <button className="add-btn" onClick={addTeamMember}>
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="form-grid">
                            {aboutData.team.map((m, i) => (
                                <div key={i} className="card">
                                    <div className="card-header">
                                        <span>Member {i + 1}</span>
                                        {aboutData.team.length > 1 && (
                                            <button className="delete-btn" onClick={() => removeTeamMember(i)}>
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <Input placeholder="Name" value={m.name} onChange={(e) => updateTeam(i, 'name', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <Input placeholder="Role" value={m.role} onChange={(e) => updateTeam(i, 'role', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="section">
                        <div className="section-header">
                            <h2 className="section-title">Our Journey (Timeline)</h2>
                            <button className="add-btn" onClick={addTimeline}>
                                <Plus size={16} />
                            </button>
                        </div>
                        {aboutData.timeline.map((t, i) => (
                            <div key={i} className="card">
                                <div className="card-header">
                                    <span>Event {i + 1}</span>
                                    {aboutData.timeline.length > 1 && (
                                        <button className="delete-btn" onClick={() => removeTimeline(i)}>
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                                <div className="form-grid">
                                    <Input placeholder="Year" value={t.year} onChange={(e) => updateTimeline(i, 'year', e.target.value)} />
                                    <Input placeholder="Event" value={t.event} onChange={(e) => updateTimeline(i, 'event', e.target.value)} />
                                    <Input placeholder="Description" value={t.description} onChange={(e) => updateTimeline(i, 'description', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sustainability */}
                    <div className="section">
                        <h2 className="section-title">Sustainability</h2>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <Input value={aboutData.sustainabilityTitle} onChange={(e) => updateField('sustainabilityTitle', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <Textarea value={aboutData.sustainabilityDescription} onChange={(e) => updateField('sustainabilityDescription', e.target.value)} rows={3} />
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <label className="form-label">Key Points</label>
                                <button className="add-btn" onClick={addSustainabilityPoint}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            {aboutData.sustainabilityPoints.map((p, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <Input value={p} onChange={(e) => updateSustainabilityPoint(i, e.target.value)} style={{ flex: 1 }} />
                                    {aboutData.sustainabilityPoints.length > 1 && (
                                        <button className="delete-btn" onClick={() => removeSustainabilityPoint(i)}>
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Traceable Supply Chain</label>
                                <Input value={aboutData.sustainabilityStats.traceableSupplyChain} onChange={(e) => setAboutData({ ...aboutData, sustainabilityStats: { ...aboutData.sustainabilityStats, traceableSupplyChain: e.target.value } })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Organic Certified</label>
                                <Input value={aboutData.sustainabilityStats.organicCertified} onChange={(e) => setAboutData({ ...aboutData, sustainabilityStats: { ...aboutData.sustainabilityStats, organicCertified: e.target.value } })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Partner Farmers</label>
                                <Input value={aboutData.sustainabilityStats.partnerFarmers} onChange={(e) => setAboutData({ ...aboutData, sustainabilityStats: { ...aboutData.sustainabilityStats, partnerFarmers: e.target.value } })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
