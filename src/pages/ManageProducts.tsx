import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
    getProductsData,
    addProduct,
    updateProduct,
    deleteProduct,
    defaultProducts,
    type Product,
    type ProductVariety
} from '../data/productsData';
import { toast } from 'sonner';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { Upload, Loader2, ImageIcon } from 'lucide-react';

export function ManageProducts() {
    const [products, setProducts] = useState<Product[]>(defaultProducts);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');

    // Form state for editing/adding
    const [formData, setFormData] = useState<Product>({
        id: '',
        title: '',
        description: '',
        image: '',
        varieties: [],
        specifications: {},
        packaging: [],
        moq: '',
        hsCode: '',
        countries: [],
        shortDescription: '',
        varietiesCount: ''
    });

    // Load products on mount
    useEffect(() => {
        loadProducts();
    }, []);

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
            console.warn('Products fetch slow/failed in manage page:', error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        // Ensure all array/object fields are initialized
        setFormData({
            ...product,
            varieties: product.varieties || [],
            specifications: product.specifications || {},
            packaging: product.packaging || [],
            countries: product.countries || [],
            shortDescription: product.shortDescription || '',
            varietiesCount: product.varietiesCount || ''
        });
        setIsAddingNew(false);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setFormData({
            id: '',
            title: '',
            description: '',
            image: '',
            varieties: [],
            specifications: {},
            packaging: [],
            moq: '',
            hsCode: '',
            countries: [],
            shortDescription: '',
            varietiesCount: ''
        });
        setIsAddingNew(true);
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setIsAddingNew(false);
        setImageFile(null);
        setImagePreview('');
        setFormData({
            id: '',
            title: '',
            description: '',
            image: '',
            varieties: [],
            specifications: {},
            packaging: [],
            moq: '',
            hsCode: '',
            countries: [],
            shortDescription: '',
            varietiesCount: ''
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size should be less than 2MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (id: string): Promise<string> => {
        if (!imageFile) return formData.image;

        setIsUploading(true);
        try {
            const path = `agro-products/${id}_${Date.now()}`;
            const fileRef = storageRef(storage, path);
            const snapshot = await uploadBytes(fileRef, imageFile);
            const url = await getDownloadURL(snapshot.ref);
            return url;
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (!formData.id || !formData.title) {
                toast.error('Product ID and Title are required');
                return;
            }

            let finalImageUrl = formData.image;
            if (imageFile) {
                finalImageUrl = await uploadImage(formData.id);
            }

            const productToSave = { ...formData, image: finalImageUrl };

            if (isAddingNew) {
                await addProduct(productToSave);
                toast.success('Product added successfully');
            } else if (editingProduct) {
                await updateProduct(editingProduct.id, productToSave);
                toast.success('Product updated successfully');
            }

            await loadProducts();
            handleCancel();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Failed to save product');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await deleteProduct(id);
            toast.success('Product deleted successfully');
            await loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    // Helper functions for array fields
    const addVariety = () => {
        setFormData({
            ...formData,
            varieties: [...formData.varieties, { name: '', grade: '', moisture: '' }]
        });
    };

    const updateVariety = (index: number, field: keyof ProductVariety, value: string) => {
        const newVarieties = [...formData.varieties];
        newVarieties[index] = { ...newVarieties[index], [field]: value };
        setFormData({ ...formData, varieties: newVarieties });
    };

    const removeVariety = (index: number) => {
        const newVarieties = formData.varieties.filter((_, i) => i !== index);
        setFormData({ ...formData, varieties: newVarieties });
    };

    const addSpecification = () => {
        const key = prompt('Enter specification key (e.g., moisture, purity):');
        if (key) {
            setFormData({
                ...formData,
                specifications: { ...formData.specifications, [key]: '' }
            });
        }
    };

    const updateSpecification = (key: string, value: string) => {
        setFormData({
            ...formData,
            specifications: { ...formData.specifications, [key]: value }
        });
    };

    const removeSpecification = (key: string) => {
        const newSpecs = { ...formData.specifications };
        delete newSpecs[key];
        setFormData({ ...formData, specifications: newSpecs });
    };

    const addPackaging = () => {
        setFormData({
            ...formData,
            packaging: [...formData.packaging, '']
        });
    };

    const updatePackaging = (index: number, value: string) => {
        const newPackaging = [...formData.packaging];
        newPackaging[index] = value;
        setFormData({ ...formData, packaging: newPackaging });
    };

    const removePackaging = (index: number) => {
        const newPackaging = formData.packaging.filter((_, i) => i !== index);
        setFormData({ ...formData, packaging: newPackaging });
    };

    const updateCountries = (value: string) => {
        // Split by comma and trim
        const countriesArray = value.split(',').map(c => c.trim()).filter(c => c);
        setFormData({ ...formData, countries: countriesArray });
    };

    // Non-blocking loading
    const showLoadingOverlay = loading && products.length === 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#043F43] mb-2">Manage Products</h1>
                        <p className="text-[#043F43] opacity-70">Add, edit, or remove products from your catalog</p>
                    </div>
                    <Button
                        onClick={handleAddNew}
                        className="bg-[#07D185] hover:bg-[#06b872] text-white"
                        disabled={isAddingNew || editingProduct !== null}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Product
                    </Button>
                </div>

                {isFetching && products.length > 0 && (
                    <div className="mb-4 text-[#07D185] text-sm animate-pulse">
                        Refreshing product list...
                    </div>
                )}

                {/* Edit/Add Form */}
                {(editingProduct || isAddingNew) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#043F43]">
                                {isAddingNew ? 'Add New Product' : 'Edit Product'}
                            </h2>
                            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#043F43] mb-2">
                                        Product ID *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        disabled={!isAddingNew}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                        placeholder="e.g., pulses"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#043F43] mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                        placeholder="e.g., Pulses"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#043F43] mb-2">
                                    Short Description (for product card)
                                </label>
                                <textarea
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                    rows={2}
                                    placeholder="Brief description for product cards"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#043F43] mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                    rows={3}
                                    placeholder="Detailed description for product detail page"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#043F43] mb-2">
                                        Product Image
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        <div className="relative group w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex items-center justify-center transition-all hover:border-[#07D185]">
                                            {(imagePreview || formData.image) ? (
                                                <>
                                                    <img
                                                        src={imagePreview || formData.image}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => document.getElementById('image-upload')?.click()}
                                                            disabled={isUploading}
                                                        >
                                                            Change Image
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('image-upload')?.click()}
                                                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#07D185] transition-colors"
                                                    disabled={isUploading}
                                                >
                                                    <Upload className="w-8 h-8" />
                                                    <span className="text-sm">Click to upload image</span>
                                                </button>
                                            )}
                                            {isUploading && (
                                                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                                    <Loader2 className="w-8 h-8 text-[#07D185] animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                                placeholder="Or paste image URL here..."
                                            />
                                            {(imagePreview || formData.image) && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-200 text-red-500 hover:bg-red-50"
                                                    onClick={() => {
                                                        setImageFile(null);
                                                        setImagePreview('');
                                                        setFormData({ ...formData, image: '' });
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-400 italic">Recommended: 800x600px, Max 2MB</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#043F43] mb-2">
                                            Varieties Count
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.varietiesCount}
                                            onChange={(e) => setFormData({ ...formData, varietiesCount: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                            placeholder="e.g., 15+ varieties"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#043F43] mb-2">
                                            Minimum Order Quantity (MOQ)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.moq}
                                            onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                            placeholder="e.g., 1 container (20 MT)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#043F43] mb-2">
                                            HS Code
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.hsCode}
                                            onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                            placeholder="e.g., 0713.xx.xx"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Varieties */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-medium text-[#043F43]">
                                        Varieties
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addVariety}
                                        className="text-[#07D185] hover:text-[#06b872] text-sm font-medium"
                                    >
                                        + Add Variety
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {(formData.varieties || []).map((variety, index) => (
                                        <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                                            <input
                                                type="text"
                                                value={variety.name}
                                                onChange={(e) => updateVariety(index, 'name', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                placeholder="Name"
                                            />
                                            <input
                                                type="text"
                                                value={variety.grade}
                                                onChange={(e) => updateVariety(index, 'grade', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                placeholder="Grade"
                                            />
                                            <input
                                                type="text"
                                                value={variety.moisture}
                                                onChange={(e) => updateVariety(index, 'moisture', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                placeholder="Moisture"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeVariety(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Specifications */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-medium text-[#043F43]">
                                        Specifications
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addSpecification}
                                        className="text-[#07D185] hover:text-[#06b872] text-sm font-medium"
                                    >
                                        + Add Specification
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {Object.entries(formData.specifications || {}).map(([key, value]) => (
                                        <div key={key} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg">
                                            <div className="w-1/3 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-[#043F43]">
                                                {key}
                                            </div>
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => updateSpecification(key, e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                placeholder="Value"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeSpecification(key)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Packaging */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-medium text-[#043F43]">
                                        Packaging Options
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addPackaging}
                                        className="text-[#07D185] hover:text-[#06b872] text-sm font-medium"
                                    >
                                        + Add Packaging
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {(formData.packaging || []).map((pack, index) => (
                                        <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg">
                                            <input
                                                type="text"
                                                value={pack}
                                                onChange={(e) => updatePackaging(index, e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                placeholder="Packaging option"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePackaging(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Countries */}
                            <div>
                                <label className="block text-sm font-medium text-[#043F43] mb-2">
                                    Export Countries (comma-separated)
                                </label>
                                <textarea
                                    value={formData.countries.join(', ')}
                                    onChange={(e) => updateCountries(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07D185]"
                                    rows={2}
                                    placeholder="USA, UK, UAE, etc."
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#07D185] hover:bg-[#06b872] text-white min-w-[120px]"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Product
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                    disabled={isUploading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Products List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative h-48">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${product.image}')` }}
                                >
                                    <img
                                        src={product.image}
                                        loading="lazy"
                                        className="sr-only"
                                        alt={product.title}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#043F43]/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-xl">{product.title}</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-[#043F43] opacity-70 text-sm mb-4 line-clamp-2">
                                    {product.shortDescription || product.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-[#043F43] opacity-60 mb-4">
                                    <Package className="w-4 h-4" />
                                    <span>{product.varietiesCount || `${product.varieties?.length || 0} varieties`}</span>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => handleEdit(product)}
                                        className="flex-1 bg-[#043F43] hover:bg-[#032d30] text-white"
                                        disabled={editingProduct !== null || isAddingNew}
                                    >
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(product.id)}
                                        variant="outline"
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {products.length === 0 && !isAddingNew && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#043F43] mb-2">No Products Yet</h3>
                        <p className="text-[#043F43] opacity-70 mb-6">Get started by adding your first product</p>
                        <Button
                            onClick={handleAddNew}
                            className="bg-[#07D185] hover:bg-[#06b872] text-white"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add New Product
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
