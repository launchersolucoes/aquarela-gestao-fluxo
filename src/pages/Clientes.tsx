import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Eye,
  Tag,
  ShoppingBag
} from "lucide-react";

const clients = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    document: "123.456.789-00",
    address: "Rua das Flores, 123 - São Paulo, SP",
    registeredAt: "2024-01-15",
    totalPurchases: 2450.00,
    lastPurchase: "2024-07-10",
    tags: ["VIP", "Fidelizado"],
    status: "Ativo"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com", 
    phone: "(11) 88888-8888",
    document: "987.654.321-00",
    address: "Av. Paulista, 456 - São Paulo, SP",
    registeredAt: "2024-02-20",
    totalPurchases: 890.50,
    lastPurchase: "2024-07-12",
    tags: ["Regular"],
    status: "Ativo"
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    phone: "(11) 77777-7777", 
    document: "456.789.123-00",
    address: "Rua Augusta, 789 - São Paulo, SP",
    registeredAt: "2024-03-10",
    totalPurchases: 156.80,
    lastPurchase: "2024-06-28",
    tags: ["Novo"],
    status: "Ativo"
  },
];

const tags = ["Todos", "VIP", "Fidelizado", "Regular", "Novo"];
const statuses = ["Todos", "Ativo", "Inativo"];

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.document.includes(searchTerm);
    const matchesTag = selectedTag === "Todos" || client.tags.includes(selectedTag);
    const matchesStatus = selectedStatus === "Todos" || client.status === selectedStatus;
    
    return matchesSearch && matchesTag && matchesStatus;
  });

  const totalRevenue = clients.reduce((sum, client) => sum + client.totalPurchases, 0);
  const avgTicket = totalRevenue / clients.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie seus clientes e histórico de compras</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="clay-button flex items-center gap-2 px-4 py-2">
            <Plus className="h-4 w-4" />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{clients.length}</p>
              <p className="text-sm text-muted-foreground">Total Clientes</p>
            </div>
          </div>
        </div>
        
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-success" />
            <div>
              <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Receita Total</p>
            </div>
          </div>
        </div>
        
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <Tag className="h-8 w-8 text-warning" />
            <div>
              <p className="text-2xl font-bold">R$ {avgTicket.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Ticket Médio</p>
            </div>
          </div>
        </div>
        
        <div className="clay-card p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-info" />
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Novos (30d)</p>
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
              placeholder="Buscar clientes..."
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
              <label className="block text-sm font-medium mb-2">Tag</label>
              <select 
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="clay-input w-full"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
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

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="clay-card p-6 hover:scale-105 transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.document}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <Edit3 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{client.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{client.phone}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">{client.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Compras</span>
                <span className="font-semibold text-success">
                  R$ {client.totalPurchases.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Última Compra</span>
                <span className="text-sm text-foreground">{client.lastPurchase}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {client.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="clay-card px-2 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <span className={`clay-card px-2 py-1 text-xs font-medium ${
                  client.status === 'Ativo' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}