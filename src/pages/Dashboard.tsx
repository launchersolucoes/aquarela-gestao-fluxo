import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  Eye,
  Calendar
} from "lucide-react";

const stats = [
  {
    name: "Vendas Hoje",
    value: "R$ 12.450",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    name: "Produtos em Estoque",
    value: "1.234",
    change: "-2.3%",
    changeType: "negative",
    icon: Package,
  },
  {
    name: "Clientes Ativos",
    value: "256",
    change: "+5.7%",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Pedidos Hoje",
    value: "42",
    change: "+8.1%",
    changeType: "positive",
    icon: ShoppingCart,
  },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Estoque Baixo",
    message: "5 produtos com estoque abaixo do mínimo",
    time: "2h atrás",
  },
  {
    id: 2,
    type: "info", 
    title: "Nova Venda",
    message: "Pedido #1234 finalizado - R$ 245,00",
    time: "10min atrás",
  },
  {
    id: 3,
    type: "warning",
    title: "NFe Pendente",
    message: "3 notas fiscais aguardando emissão",
    time: "1h atrás",
  },
];

const recentSales = [
  {
    id: "1234",
    client: "João Silva",
    value: "R$ 245,00",
    items: 3,
    time: "10:30",
  },
  {
    id: "1235",
    client: "Maria Santos",
    value: "R$ 89,50",
    items: 1,
    time: "10:15",
  },
  {
    id: "1236",
    client: "Pedro Costa",
    value: "R$ 156,80",
    items: 2,
    time: "09:45",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>
        <div className="clay-card px-4 py-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Hoje, 15 Jul 2024</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="clay-card p-6 animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 flex items-center gap-1 ${
                  stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                }`}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </p>
              </div>
              <div className="clay-card p-3 animate-float">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendas Recentes */}
        <div className="lg:col-span-2">
          <div className="clay-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Vendas Recentes
              </h2>
              <button className="text-primary hover:text-primary-light transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">
                      Pedido #{sale.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.client} • {sale.items} item{sale.items > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {sale.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div>
          <div className="clay-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">
                Alertas
              </h2>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-xl border border-border bg-background/50">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-warning' : 'bg-info'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {alert.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="clay-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="clay-button flex flex-col items-center gap-3 p-6">
            <Package className="h-8 w-8" />
            <span className="font-medium">Novo Produto</span>
          </button>
          <button className="clay-button flex flex-col items-center gap-3 p-6">
            <Users className="h-8 w-8" />
            <span className="font-medium">Novo Cliente</span>
          </button>
          <button className="clay-button flex flex-col items-center gap-3 p-6">
            <ShoppingCart className="h-8 w-8" />
            <span className="font-medium">Nova Venda</span>
          </button>
          <button className="clay-button flex flex-col items-center gap-3 p-6">
            <TrendingUp className="h-8 w-8" />
            <span className="font-medium">Relatórios</span>
          </button>
        </div>
      </div>
    </div>
  );
}