// src/pages/MachineUpload.jsx
import { useState, useEffect } from "react";
import { ref as dbRef, push, set, get, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function MachineUpload({ onNavigate, machineId }) {
    const { currentUser } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [capacity, setCapacity] = useState("");
    const [power, setPower] = useState("");
    const [moq, setMoq] = useState("");
    const [hsCode, setHsCode] = useState("");
    const [warranty, setWarranty] = useState("");
    const [exportDestinations, setExportDestinations] = useState("");
    const [category, setCategory] = useState("Agricultural Machinery");
    const [imageFile, setImageFile] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const categories = [
        "Agricultural Machinery",
        "Food Processing Machines",
        "Packaging Machines"
    ];

    useEffect(() => {
        const loadMachineData = async () => {
            if (machineId) {
                setIsEditMode(true);
                setLoading(true);
                try {
                    const mRef = dbRef(database, `machines/${machineId}`);
                    const snapshot = await get(mRef);

                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setTitle(data.title || "");
                        setDescription(data.description || "");
                        setCapacity(data.capacity || "");
                        setPower(data.power || "");
                        setMoq(data.moq || "");
                        setHsCode(data.hsCode || "");
                        setWarranty(data.warranty || "");
                        setExportDestinations(data.exportDestinations || "");
                        setContent(data.content || "");
                        setCategory(data.category || "Agricultural Machinery");
                        setExistingImageUrl(data.imageUrl || "");
                    } else {
                        setError("Machine not found");
                    }
                } catch (err) {
                    console.error("Error loading machine:", err);
                    setError("Failed to load machine data");
                } finally {
                    setLoading(false);
                }
            }
        };

        loadMachineData();
    }, [machineId]);

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setImageFile(file || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim() || !description.trim()) {
            setError("Title and description are required.");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = existingImageUrl;

            if (imageFile) {
                const filename = `${Date.now()}_${imageFile.name}`;
                const sRef = storageRef(storage, `machines/${filename}`);
                await uploadBytes(sRef, imageFile);
                imageUrl = await getDownloadURL(sRef);
            }

            const machineData = {
                title: title.trim(),
                description: description.trim(),
                capacity: capacity.trim(),
                power: power.trim(),
                moq: moq.trim(),
                hsCode: hsCode.trim(),
                warranty: warranty.trim(),
                exportDestinations: exportDestinations.trim(),
                content: content.trim(),
                category: category,
                imageUrl: imageUrl || null,
                authorUid: currentUser?.uid || null,
                authorEmail: currentUser?.email || null,
            };

            if (isEditMode && machineId) {
                machineData.updatedAt = new Date().toISOString();
                machineData.updatedAtReadable = new Date().toLocaleString();
                const mRef = dbRef(database, `machines/${machineId}`);
                await update(mRef, machineData);
                setSuccess("Machine updated successfully.");
            } else {
                machineData.createdAt = new Date().toISOString();
                machineData.createdAtReadable = new Date().toLocaleString();
                const mRef = dbRef(database, "machines");
                const newMRef = push(mRef);
                await set(newMRef, machineData);
                setSuccess("Machine uploaded successfully.");
            }

            setTimeout(() => {
                if (onNavigate) {
                    onNavigate("admin-machines");
                }
            }, 1500);
        } catch (err) {
            console.error("Machine save error:", err);
            setError(err.message || "Failed to save machine information.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-['Helvetica']">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-[#043F43] mb-8">
                    {isEditMode ? "Edit Machine Information" : "Add New Machinery"}
                </h1>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}
                {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 border border-green-100">{success}</div>}

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Machine Title</label>
                            <input
                                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]" required
                                placeholder="e.g. Multi-Crop Combine Harvester"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Category</label>
                            <select
                                value={category} onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Capacity (e.g. 5-7 acres/hour)</label>
                            <input
                                type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                                placeholder="e.g. 5-7 acres/hour"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Power Rating (e.g. 180-220 HP)</label>
                            <input
                                type="text" value={power} onChange={(e) => setPower(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                                placeholder="e.g. 180-220 HP"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Min Order Quantity</label>
                            <input
                                type="text" value={moq} onChange={(e) => setMoq(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                                placeholder="e.g. 1 Unit"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">HS Code</label>
                            <input
                                type="text" value={hsCode} onChange={(e) => setHsCode(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                                placeholder="e.g. 8433.51"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Warranty</label>
                            <input
                                type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                                placeholder="e.g. 2 Years"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Export Destinations (Comma separated)</label>
                        <input
                            type="text" value={exportDestinations} onChange={(e) => setExportDestinations(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00D084]"
                            placeholder="e.g. Africa, Middle East, Southeast Asia"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Short Description</label>
                        <textarea
                            value={description} onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border rounded-lg h-24" maxLength={200} required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Detailed Specifications / More Info (Optional)</label>
                        <textarea
                            value={content} onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 border rounded-lg h-40 font-mono text-sm"
                            placeholder="Additional details that will show on the detail page..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Featured Image</label>
                        <input type="file" onChange={handleFileChange} className="w-full" accept="image/*" />
                        {(imageFile || existingImageUrl) && (
                            <div className="mt-4 rounded-lg overflow-hidden h-40 w-60">
                                <img src={imageFile ? URL.createObjectURL(imageFile) : existingImageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                        <button type="button" onClick={() => onNavigate('admin-machines')} className="px-6 py-3 text-gray-600 font-semibold">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-[#00D084] text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-[#00D084]/20 transition-all">
                            {loading ? "Saving..." : (isEditMode ? "Update Machine" : "Add Machine")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
