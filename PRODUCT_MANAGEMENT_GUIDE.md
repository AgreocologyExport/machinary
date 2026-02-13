# Product Management System - User Guide

## Overview
Your Agreocology website now has a complete dynamic product management system. Products are stored in Firebase Firestore and can be managed through an admin interface.

## Features

### 1. **Admin Product Management** (`/admin/products/manage`)
   - **Add New Products**: Click "Add New Product" button
   - **Edit Products**: Click "Edit" button on any product card
   - **Delete Products**: Click trash icon to remove products
   - **Real-time Updates**: Changes reflect immediately on the public pages

### 2. **Product Data Structure**
Each product includes:
- **Basic Info**: ID, Title, Descriptions (short and long)
- **Media**: Image URL
- **Varieties**: Multiple product varieties with grade and moisture info
- **Specifications**: Technical specifications (moisture, purity, etc.)
- **Packaging Options**: Different packaging available
- **Export Info**: MOQ, HS Code, Target countries

### 3. **Public Pages**
Products automatically display on:
- **Homepage** (`/`): Products section with dynamic loading
- **Products Page** (`/products`): Full product catalog
- **Product Detail Pages** (`/products/:id`): Individual product pages

## How to Use

### Adding a New Product

1. Navigate to `/admin/products/manage`
2. Click "Add New Product" button
3. Fill in the required fields:
   - **Product ID** (required, unique, lowercase with hyphens, e.g., "organic-tea")
   - **Title** (required, e.g., "Organic Tea")
   - **Short Description** (shown on product cards)
   - **Full Description** (shown on detail page)
   - **Image URL** (product image)
   - **Varieties Count** (e.g., "10+ varieties")
   - **MOQ** (Minimum Order Quantity)
   - **HS Code** (customs code)

4. Add Varieties:
   - Click "+ Add Variety"
   - Enter Name, Grade, and Moisture for each

5. Add Specifications:
   - Click "+ Add Specification"
- Enter key name (e.g., "moisture", "purity")
   - Enter value in the input field

6. Add Packaging Options:
   - Click "+ Add Packaging"
   - Enter packaging description

7. Add Export Countries:
   - Enter comma-separated list (e.g., "USA, UK, UAE")

8. Click "Save Product"

### Editing a Product

1. Navigate to `/admin/products/manage`
2. Find the product you want to edit
3. Click "Edit" button on the product card
4. Modify any fields (Product ID cannot be changed)
5. Click "Save Product"

### Deleting a Product

1. Navigate to `/admin/products/manage`
2. Find the product you want to delete
3. Click the trash icon
4. Confirm deletion in the popup

## Files Modified

### Created Files:
- `src/pages/ManageProducts.tsx` - Admin product management interface

### Updated Files:
- `src/components/Products.tsx` - Now fetches from Firebase
- `src/pages/ProductsPage.tsx` - Already using Firebase
- `src/pages/ProductDetailPage.tsx` - Already using Firebase

### Existing Files (No Changes Needed):
- `src/data/productsData.ts` - Firebase integration already implemented
- `src/App.tsx` - Routes already configured

## Default Products

The system includes 6 default products:
1. Pulses
2. Grains
3. Spices
4. Oil Seeds
5. Fresh Produce
6. Agro Commodities

These will be automatically initialized in Firebase on first run.

## Important Notes

1. **Product IDs**: Must be unique, lowercase, use hyphens for spaces (e.g., "fresh-produce")
2. **Images**: Use full URLs (consider using a CDN or image hosting service like Unsplash, Cloudinary, etc.)
3. **Firebase**: Products are stored in the `products` collection in Firestore
4. **Design**: The existing design is preserved - no visual changes to public pages
5. **Authentication**: Product management requires admin login

## Accessing Product Management

1. Log in to admin area
2. Navigate to: `http://localhost:3000/admin/products/manage`
3. Or use the route map with: `onNavigate("products-manage")`

## Technical Details

### Firebase Integration
- **Collection**: `products`
- **Functions**: 
  - `getProductsData()` - Fetch all products
  - `getProductById(id)` - Fetch single product
  - `addProduct(product)` - Add new product
  - `updateProduct(id, product)` - Update product
  - `deleteProduct(id)` - Delete product

### Component Architecture
```
ManageProducts (Admin)
  ├── Product List Grid
  ├── Add/Edit Form
  └── Firebase Integration

Products Component (Homepage)
  └── Dynamic Product Grid

ProductsPage (Public)
  └── Full Product Catalog

ProductDetailPage (Public)
  └── Individual Product View
```

## Troubleshooting

**Products not showing?**
- Check Firebase connection
- Verify default products are initialized
- Check browser console for errors

**Can't save product?**
- Ensure Product ID and Title are filled
- Check Firebase permissions
- Verify you're logged in as admin

**Images not loading?**
- Verify image URLs are valid and accessible
- Use HTTPS URLs
- Check CORS settings if using external images

## Next Steps

You now have a fully functional dynamic product management system! You can:
1. Add your actual products
2. Update product information anytime
3. Remove outdated products
4. Manage everything from the admin panel

All changes will automatically reflect on your public website.
