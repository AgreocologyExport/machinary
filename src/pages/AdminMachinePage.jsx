// src/pages/AdminMachinePage.jsx
import { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database";
import { database } from "../firebase/config";
import { Edit, Trash2, Plus, ArrowLeft, Settings, Calendar, User } from "lucide-react";

export function AdminMachinePage({ onNavigate }) {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const machinesRef = ref(database, 'machines');
                const snapshot = await get(machinesRef);

                if (snapshot.exists()) {
                    const machinesData = Object.entries(snapshot.val()).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                    const sortedMachines = machinesData.sort((a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setMachines(sortedMachines);
                } else {
                    setMachines([]);
                }
            } catch (error) {
                console.error("Error fetching machines:", error);
                setError("Failed to load machinery data");
            } finally {
                setLoading(false);
            }
        };

        fetchMachines();
    }, []);

    const handleDelete = async (machineId) => {
        if (window.confirm("Are you sure you want to delete this machine?")) {
            try {
                const machineRef = ref(database, `machines/${machineId}`);
                await remove(machineRef);
                setMachines(machines.filter(m => m.id !== machineId));
            } catch (error) {
                console.error("Error deleting machine:", error);
                setError("Failed to delete machine");
            }
        }
    };

    return (
        <>
            <style>
                {`
          .machines-admin-page {
            min-height: 100vh;
            background: #f8fafc;
            padding-bottom: 20px;
          }
          .machines-header {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }
          .machines-header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
          }
          .back-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: #f1f5f9;
            border: none;
            border-radius: 8px;
            color: #334155;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
          }
          .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .page-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #18181b;
          }
          .add-machine-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 16px;
            background: linear-gradient(135deg, #07D185 0%, #059669 100%);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(7, 209, 133, 0.25);
          }
          .machines-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
          }
          .machine-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
          }
          .machine-card-content {
            display: flex;
          }
          .machine-img-preview {
            width: 120px;
            height: 120px;
            object-fit: cover;
          }
          .machine-info {
            flex: 1;
            padding: 12px 16px;
          }
          .machine-title {
            font-weight: 700;
            margin-bottom: 4px;
          }
          .machine-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            font-size: 0.8rem;
            color: #94a3b8;
          }
          .action-btn {
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .edit-btn { background: #eff6ff; color: #3b82f6; border: none; }
          .delete-btn { background: #fef2f2; color: #ef4444; border: none; }
        `}
            </style>

            <div className="machines-admin-page">
                <div className="machines-header">
                    <div className="machines-header-content">
                        <button onClick={() => onNavigate('admin-dashboard')} className="back-button">
                            <ArrowLeft size={18} />
                            <span>Dashboard</span>
                        </button>
                        <div className="header-right">
                            <h1 className="page-title">Manage Machinery</h1>
                            <button onClick={() => onNavigate('machineupload')} className="add-machine-button">
                                <Plus size={18} />
                                <span>Add Machine</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="machines-container">
                    {machines.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                            <Settings size={48} className="mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500">No machinery data found.</p>
                        </div>
                    ) : (
                        <div className="machines-grid">
                            {machines.map((machine) => (
                                <div key={machine.id} className="machine-card">
                                    <div className="machine-card-content">
                                        <img src={machine.imageUrl || "https://placehold.co/120x120?text=No+Image"} alt="" className="machine-img-preview" />
                                        <div className="machine-info">
                                            <div className="machine-title">{machine.title}</div>
                                            <div className="text-sm text-gray-500 line-clamp-1">{machine.description}</div>
                                            <div className="flex flex-col gap-1 mb-2">
                                                <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Specs</div>
                                                <div className="flex gap-4 text-xs font-medium text-[#043F43]">
                                                    <span>Cap: {machine.capacity || "N/A"}</span>
                                                    <span>Pwr: {machine.power || "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="machine-meta">
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-1"><User size={12} /> {machine.authorEmail?.split('@')[0]}</div>
                                                    <div className="flex items-center gap-1"><Calendar size={12} /> {machine.createdAtReadable}</div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => onNavigate('machineupload', machine.id)} className="action-btn edit-btn"><Edit size={14} /> Edit</button>
                                                    <button onClick={() => handleDelete(machine.id)} className="action-btn delete-btn"><Trash2 size={14} /> Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminMachinePage;
