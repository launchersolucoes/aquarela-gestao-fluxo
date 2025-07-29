import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Package,
  Edit3,
  Trash2,
  Barcode,
  AlertTriangle
} from "lucide-react";

const products = [
  {
    id: 1,
    sku: "PROD-001",
    name: "Camiseta Básica Branca",
    category: "Roupas",
    stock: 25,
    minStock: 10,
    cost: 15.00,
    price: 39.90,
    status: "Ativo",
    supplier: "Fornecedor A",
    barcode: "7891234567890"
  },
  {
    id: 2,
    sku: "PROD-002", 
    name: "Calça Jeans Masculina",
    category: "Roupas",
    stock: 5,
    minStock: 8,
    cost: 45.00,
    price: 120.00,
    status: "Ativo",
    supplier: "Fornecedor B",
    barcode: "7891234567891"
  },
  {
    id: 3,
    sku: "PROD-003",
    name: "Tênis Esportivo",
    category: "Calçados",
    stock: 18,
    minStock: 5,
    cost: 80.00,
    price: 199.90,
    status: "Ativo", 
    supplier: "Fornecedor C",
    barcode: "7891234567892"
  },
];

const categories = ["Todos", "Roupas", "Calçados", "Acessórios"];
const statuses = ["Todos", "Ativo", "Inativo", "Sem Estoque"];

export default function Estoque() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "Todos" || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estoque</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e controle de estoque</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="clay-button flex items-center gap-2 px-4 py-2">
            <Upload className="h-4 w-4" />
            Importar
          </button>
          <button className="clay-button flex items-center gap-2 px-4 py-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
          <button className="clay-button flex items-center gap-2 px-4 py-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm text-muted-foreground">Total Produtos</p>
            </div>
          </div>
        </div>
        
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-warning" />
            <div>
              <p className="text-2xl font-bold">{lowStockProducts}</p>
              <p className="text-sm text-muted-foreground">Estoque Baixo</p>
            </div>
          </div>
        </div>
        
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-success font-bold">R$</span>
            </div>
            <div>
              <p className="text-2xl font-bold">142</p>
              <p className="text-sm text-muted-foreground">Produtos Ativos</p>
            </div>
          </div>
        </div>
        
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Barcode className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Categorias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="clay-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="clay-input w-full pl-10"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="clay-button flex items-center gap-2 px-4 py-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-muted/50 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="clay-input w-full"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="clay-input w-full"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Produto</th>
                <th className="text-left p-4 font-semibold">SKU</th>
                <th className="text-left p-4 font-semibold">Categoria</th>
                <th className="text-left p-4 font-semibold">Estoque</th>
                <th className="text-left p-4 font-semibold">Preço</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-border hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.supplier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm">{product.sku}</td>
                  <td className="p-4">
                    <span className="clay-card px-2 py-1 text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${
                        product.stock <= product.minStock ? 'text-warning' : 'text-foreground'
                      }`}>
                        {product.stock}
                      </span>
                      {product.stock <= product.minStock && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className={`clay-card px-2 py-1 text-xs font-medium ${
                      product.status === 'Ativo' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <Edit3 className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}