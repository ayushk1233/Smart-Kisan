"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  Download,
  Upload,
  Eye,
  MoreHorizontal,
  X,
  Crop,
  Leaf,
  Wrench
} from 'lucide-react'

// Mock data - in real app this would come from API/database
const mockProducts = [
  { id: 1, name: 'Wheat Seeds', category: 'Seeds', quantity: 150, unit: 'kg', price: 2500, supplier: 'Agro Supply Co.', status: 'in-stock', expirationDate: '2024-12-31', location: 'Warehouse A' },
  { id: 2, name: 'Fertilizer NPK', category: 'Fertilizers', quantity: 25, unit: 'bags', price: 1800, supplier: 'Fertilizer Ltd.', status: 'low-stock', expirationDate: '2024-06-30', location: 'Warehouse B' },
  { id: 3, name: 'Pesticides', category: 'Chemicals', quantity: 0, unit: 'liters', price: 1200, supplier: 'Crop Care Inc.', status: 'out-of-stock', expirationDate: '2024-08-15', location: 'Warehouse A' },
  { id: 4, name: 'Rice Seeds', category: 'Seeds', quantity: 200, unit: 'kg', price: 3000, supplier: 'Agro Supply Co.', status: 'in-stock', expirationDate: '2024-11-30', location: 'Warehouse C' },
  { id: 5, name: 'Organic Compost', category: 'Fertilizers', quantity: 15, unit: 'bags', price: 800, supplier: 'Nature\'s Best', status: 'low-stock', expirationDate: '2024-07-15', location: 'Warehouse B' },
  { id: 6, name: 'Garden Tools Set', category: 'Equipment', quantity: 8, unit: 'sets', price: 2500, supplier: 'Farm Tools Co', status: 'in-stock', expirationDate: '2025-12-31', location: 'Warehouse A' },
] as any[]

const categories = ['All Categories', 'Seeds', 'Fertilizers', 'Chemicals', 'Equipment', 'Tools']
const statuses = ['All Status', 'in-stock', 'low-stock', 'out-of-stock']

export default function InventoryManagement() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showAddMultipleModal, setShowAddMultipleModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [viewingProduct, setViewingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Seeds',
    quantity: '',
    unit: 'kg',
    price: '',
    supplier: '',
    location: 'Warehouse A',
    expirationDate: ''
  })

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'All Status' || product.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50 border-green-200'
      case 'low-stock': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'out-of-stock': return 'text-orange-600 bg-orange-50 border-orange-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="w-4 h-4" />
      case 'low-stock': return <AlertTriangle className="w-4 h-4" />
      case 'out-of-stock': return <XCircle className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString))
  }

  const handleAddProduct = () => {
    if (!formData.name || !formData.quantity || !formData.price || !formData.supplier) {
      alert('Please fill in all required fields')
      return
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      price: parseInt(formData.price),
      supplier: formData.supplier,
      location: formData.location,
      status: 'in-stock',
      expirationDate: formData.expirationDate || null
    }

    setProducts([...products, newProduct])
    setFormData({
      name: '',
      category: 'Seeds',
      quantity: '',
      unit: 'kg',
      price: '',
      supplier: '',
      location: 'Warehouse A',
      expirationDate: ''
    })
    setShowAddForm(false)
    alert('Product added successfully!')
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity.toString(),
      unit: product.unit,
      price: product.price.toString(),
      supplier: product.supplier,
      location: product.location,
      expirationDate: product.expirationDate || ''
    })
    setShowAddForm(true)
  }

  const handleUpdateProduct = () => {
    if (!formData.name || !formData.quantity || !formData.price || !formData.supplier) {
      alert('Please fill in all required fields')
      return
    }

    const updatedProducts = products.map(product => 
      product.id === editingProduct.id 
        ? {
            ...product,
            name: formData.name,
            category: formData.category,
            quantity: parseInt(formData.quantity),
            unit: formData.unit,
            price: parseInt(formData.price),
            supplier: formData.supplier,
            location: formData.location,
            expirationDate: formData.expirationDate || null
          }
        : product
    )

    setProducts(updatedProducts)
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Seeds',
      quantity: '',
      unit: 'kg',
      price: '',
      supplier: '',
      location: 'Warehouse A',
      expirationDate: ''
    })
    setShowAddForm(false)
    alert('Product updated successfully!')
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId))
      alert('Product deleted successfully!')
    }
  }

  const handleViewProduct = (product: any) => {
    setViewingProduct(product)
    setShowViewModal(true)
  }

  const handleAddMultiple = () => {
    setShowAddMultipleModal(true)
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Category,Quantity,Unit,Price,Supplier,Location,Status,Expiration Date\n" +
      products.map(product => 
        `${product.name},${product.category},${product.quantity},${product.unit},${product.price},${product.supplier},${product.location},${product.status},${product.expirationDate || ''}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "inventory.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert('Inventory exported successfully!')
  }

  const stats = [
    { title: 'Total Products', value: products.length.toString(), icon: Package, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Low Stock Items', value: products.filter(p => p.status === 'low-stock').length.toString(), icon: AlertTriangle, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { title: 'Out of Stock', value: products.filter(p => p.status === 'out-of-stock').length.toString(), icon: XCircle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Total Value', value: formatCurrency(products.reduce((sum, p) => sum + (p.price * p.quantity), 0)), icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Inventory Management</h1>
            <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>Track and manage your farm supplies efficiently</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse"
          >
            <Plus className="w-5 h-5 mr-2 animate-bounce" />
            Add Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--card)' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>{stat.title}</p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="border-0 shadow-lg mb-8" style={{ backgroundColor: 'var(--card)' }}>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <Input
                  placeholder="Search products, suppliers, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 text-lg border-2 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl transition-all duration-300"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 text-lg border-2 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl appearance-none pr-10 cursor-pointer transition-all duration-300"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-12 px-4 text-lg border-2 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl appearance-none pr-10 cursor-pointer transition-all duration-300"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "default" : "outline"}
                              className={`h-12 px-6 text-lg rounded-xl transition-all duration-300 ${
                showFilters 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'border-2 hover:bg-slate-50'
              }`}
                style={!showFilters ? { borderColor: 'var(--border)', color: 'var(--foreground)' } : {}}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Price Range</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Min" className="h-10" />
                    <Input placeholder="Max" className="h-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Quantity Range</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Min" className="h-10" />
                    <Input placeholder="Max" className="h-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Expiry Date</label>
                  <Input type="date" className="h-10" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
                         <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1" style={{ backgroundColor: 'var(--card)', animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              {/* Product Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 text-sm rounded-full font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                      {product.category}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(product.status)}`}>
                      {getStatusIcon(product.status)}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Product Details */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                    <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Quantity:</span>
                    <div className="font-semibold" style={{ color: 'var(--foreground)' }}>{product.quantity} {product.unit}</div>
                  </div>
                                     <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                     <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Price:</span>
                     <div className="font-semibold" style={{ color: 'var(--foreground)' }}>{formatCurrency(product.price)}</div>
                   </div>
                </div>
                
                                 <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                   <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Supplier:</span>
                   <div className="font-medium" style={{ color: 'var(--foreground)' }}>{product.supplier}</div>
                 </div>

                <div className="grid grid-cols-2 gap-3">
                                     <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                     <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Location:</span>
                     <div className="font-medium" style={{ color: 'var(--foreground)' }}>{product.location}</div>
                   </div>
                  {product.expirationDate && (
                                         <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--muted)' }}>
                       <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Expires:</span>
                       <div className="font-medium" style={{ color: 'var(--foreground)' }}>{formatDate(product.expirationDate)}</div>
                     </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="flex-1 hover:bg-slate-50"
                   style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                   onClick={() => handleEditProduct(product)}
                 >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="flex-1 hover:bg-slate-50"
                   style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                   onClick={() => handleViewProduct(product)}
                 >
                   <Eye className="w-4 h-4 mr-2" />
                   View
                 </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-rose-300 text-rose-700 hover:bg-rose-50"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
                 <div className="text-center py-20">
           <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--muted)' }}>
             <Package className="w-12 h-12" style={{ color: 'var(--muted-foreground)' }} />
           </div>
           <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>No products found</h3>
           <p className="mb-6" style={{ color: 'var(--muted-foreground)' }}>Try adjusting your search or filters to find what you're looking for.</p>
                     <Button 
             onClick={() => {
               setSearchTerm('')
               setSelectedCategory('All Categories')
               setSelectedStatus('All Status')
             }}
             variant="outline"
             className="hover:bg-slate-50"
             style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
           >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Bulk Actions */}
      {filteredProducts.length > 0 && (
                 <div className="mt-8 p-6 rounded-xl border shadow-lg" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
                             <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                 {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} selected
               </span>
            </div>
            <div className="flex space-x-3">
                             <Button 
                 variant="outline" 
                 className="hover:bg-slate-50"
                 style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                 onClick={handleExport}
               >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
                             <Button 
                 variant="outline" 
                 className="hover:bg-slate-50"
                 style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                 onClick={() => alert('Import functionality coming soon!')}
               >
                 <Upload className="w-4 h-4 mr-2" />
                 Import
               </Button>
               <Button 
                 className="bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                 onClick={handleAddMultiple}
               >
                 <Plus className="w-4 h-4 mr-2 animate-bounce" />
                 Add Multiple
               </Button>
            </div>
          </div>
        </div>
      )}

             {/* Add/Edit Product Modal */}
       {showAddForm && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                         <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
               <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                   {editingProduct ? 'Edit Product' : 'Add New Product'}
                 </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProduct(null)
                    setFormData({
                      name: '',
                      category: 'Seeds',
                      quantity: '',
                      unit: 'kg',
                      price: '',
                      supplier: '',
                      location: 'Warehouse A',
                      expirationDate: ''
                    })
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                                     <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Product Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter product name"
                    className="h-12"
                    style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
                  />
                </div>
                <div>
                                     <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Category *</label>
                                     <select
                     value={formData.category}
                     onChange={(e) => setFormData({...formData, category: e.target.value})}
                     className="w-full h-12 px-4 border-2 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                     style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                   >
                    <option value="Seeds">Seeds</option>
                    <option value="Fertilizers">Fertilizers</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
                <div>
                                     <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Quantity *</label>
                   <Input
                     type="number"
                     value={formData.quantity}
                     onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                     placeholder="Enter quantity"
                     className="h-12"
                     style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
                   />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Unit</label>
                                     <select
                     value={formData.unit}
                     onChange={(e) => setFormData({...formData, unit: e.target.value})}
                     className="w-full h-12 px-4 border-2 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                     style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                   >
                    <option value="kg">kg</option>
                    <option value="bags">bags</option>
                    <option value="liters">liters</option>
                    <option value="sets">sets</option>
                    <option value="pieces">pieces</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Price (₹) *</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Enter price"
                    className="h-12"
                    style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Supplier *</label>
                  <Input
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    placeholder="Enter supplier name"
                    className="h-12"
                    style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Location</label>
                                     <select
                     value={formData.location}
                     onChange={(e) => setFormData({...formData, location: e.target.value})}
                     className="w-full h-12 px-4 border-2 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                     style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                   >
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Warehouse C">Warehouse C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Expiration Date</label>
                  <Input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                    className="h-12"
                    style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)', borderColor: 'var(--border)' }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end space-x-3" style={{ borderColor: 'var(--border)' }}>
              <Button
                variant="outline"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                onClick={() => {
                  setShowAddForm(false)
                  setEditingProduct(null)
                  setFormData({
                    name: '',
                    category: 'Seeds',
                    quantity: '',
                    unit: 'kg',
                    price: '',
                    supplier: '',
                    location: 'Warehouse A',
                    expirationDate: ''
                  })
                }}
              >
                Cancel
              </Button>
                             <Button
                 className="bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                 onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
               >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
                     </div>
         </div>
       )}

       {/* View Product Modal */}
       {showViewModal && viewingProduct && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                           <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Product Details
                  </h2>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => setShowViewModal(false)}
                 >
                   <X className="w-5 h-5" />
                 </Button>
               </div>
             </div>

             <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                                       <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Product Name</label>
                    <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                     {viewingProduct.name}
                   </div>
                 </div>
                 <div>
                                       <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Category</label>
                    <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                     {viewingProduct.category}
                   </div>
                 </div>
                 <div>
                                       <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Quantity</label>
                    <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                      {viewingProduct.quantity} {viewingProduct.unit}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Price</label>
                    <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                      {formatCurrency(viewingProduct.price)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Supplier</label>
                    <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                      {viewingProduct.supplier}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Location</label>
                    <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                      {viewingProduct.location}
                    </div>
                 </div>
                 <div>
                                       <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Status</label>
                    <div className={`p-3 rounded-lg font-medium ${getStatusColor(viewingProduct.status)}`}>
                      {viewingProduct.status.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </div>
                  </div>
                  {viewingProduct.expirationDate && (
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Expiration Date</label>
                      <div className="p-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                        {formatDate(viewingProduct.expirationDate)}
                      </div>
                    </div>
                  )}
               </div>
             </div>

                           <div className="p-6 border-t flex justify-end space-x-3" style={{ borderColor: 'var(--border)' }}>
                <Button
                  variant="outline"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </Button>
               <Button
                 className="bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                 onClick={() => {
                   setShowViewModal(false)
                   handleEditProduct(viewingProduct)
                 }}
               >
                 Edit Product
               </Button>
             </div>
           </div>
         </div>
       )}

       {/* Add Multiple Products Modal */}
       {showAddMultipleModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                       <div className="rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--card)' }}>
              <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Add Multiple Products
                  </h2>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => setShowAddMultipleModal(false)}
                 >
                   <X className="w-5 h-5" />
                 </Button>
               </div>
             </div>

             <div className="p-6">
               <div className="mb-6">
                                   <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Quick Add Templates</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <Button
                     variant="outline"
                     className="h-20 flex flex-col items-center justify-center space-y-2"
                     onClick={() => alert('Seed template coming soon!')}
                   >
                     <Crop className="w-6 h-6 text-green-600" />
                     <span className="text-sm">Seeds Template</span>
                   </Button>
                   <Button
                     variant="outline"
                     className="h-20 flex flex-col items-center justify-center space-y-2"
                     onClick={() => alert('Fertilizer template coming soon!')}
                   >
                     <Leaf className="w-6 h-6 text-emerald-600" />
                     <span className="text-sm">Fertilizers Template</span>
                   </Button>
                   <Button
                     variant="outline"
                     className="h-20 flex flex-col items-center justify-center space-y-2"
                     onClick={() => alert('Tools template coming soon!')}
                   >
                     <Wrench className="w-6 h-6 text-orange-600" />
                     <span className="text-sm">Tools Template</span>
                   </Button>
                 </div>
               </div>

                               <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Bulk Import</h3>
                 <div className="space-y-4">
                                       <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: 'var(--border)' }}>
                      <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted-foreground)' }} />
                      <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>Upload CSV File</h4>
                      <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>Drag and drop your CSV file here or click to browse</p>
                                           <Button variant="outline" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }} onClick={() => alert('CSV upload coming soon!')}>
                        Choose File
                      </Button>
                   </div>
                   <div className="text-center">
                                           <Button
                        variant="outline"
                        style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                        onClick={() => alert('Download template coming soon!')}
                        className="text-sm"
                      >
                       <Download className="w-4 h-4 mr-2" />
                       Download CSV Template
                     </Button>
                   </div>
                 </div>
               </div>
             </div>

                           <div className="p-6 border-t flex justify-end space-x-3" style={{ borderColor: 'var(--border)' }}>
                <Button
                  variant="outline"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  onClick={() => setShowAddMultipleModal(false)}
                >
                  Cancel
                </Button>
               <Button
                 className="bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                 onClick={() => {
                   alert('Bulk import functionality coming soon!')
                   setShowAddMultipleModal(false)
                 }}
               >
                 Import Products
               </Button>
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }
