import { useState } from "react";
import { 
  ShoppingCart, 
  Barcode, 
  Plus, 
  Minus, 
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  Calculator,
  User,
  Search
} from "lucide-react";

const products = [
  { id: 1, name: "Camiseta Básica", price: 39.90, stock: 25, barcode: "7891234567890" },
  { id: 2, name: "Calça Jeans", price: 120.00, stock: 5, barcode: "7891234567891" },
  { id: 3, name: "Tênis Esportivo", price: 199.90, stock: 18, barcode: "7891234567892" },
  { id: 4, name: "Boné Aba Reta", price: 45.00, stock: 12, barcode: "7891234567893" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function PDV() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<"money" | "card" | "pix">("money");
  const [customerName, setCustomerName] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const finalizeSale = () => {
    if (cart.length > 0) {
      alert(`Venda finalizada!\nTotal: R$ ${total.toFixed(2)}\nPagamento: ${selectedPayment}`);
      setCart([]);
      setCustomerName("");
      setShowPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
        {/* Products Section */}
        <div className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Ponto de Venda</h1>
            <div className="clay-card px-4 py-2 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Caixa 01 - Admin</span>
            </div>
          </div>

          {/* Search */}
          <div className="clay-card p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou código de barras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="clay-input w-full pl-10"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Barcode className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="clay-card p-4 text-left hover:scale-105 transition-transform"
              >
                <div className="w-full h-24 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-primary mb-1">
                  R$ {product.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Estoque: {product.stock}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-muted/30 p-6 flex flex-col">
          <div className="clay-card p-4 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Carrinho</h2>
              <div className="clay-card px-3 py-1">
                <span className="text-sm font-medium">{itemCount} itens</span>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="clay-card p-4 mb-4">
            <label className="block text-sm font-medium mb-2">Cliente (Opcional)</label>
            <input
              type="text"
              placeholder="Nome do cliente..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="clay-input w-full"
            />
          </div>

          {/* Cart Items */}
          <div className="flex-1 space-y-3 mb-6">
            {cart.length === 0 ? (
              <div className="clay-card p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Carrinho vazio</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="clay-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-muted hover:bg-accent flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-muted hover:bg-accent flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        R$ {item.price.toFixed(2)} cada
                      </p>
                      <p className="font-bold text-primary">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total */}
          <div className="clay-card p-4 mb-4">
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          {cart.length > 0 && !showPayment && (
            <button
              onClick={() => setShowPayment(true)}
              className="clay-button w-full flex items-center justify-center gap-2 py-4 text-lg font-semibold"
            >
              <Calculator className="h-5 w-5" />
              Finalizar Venda
            </button>
          )}

          {showPayment && (
            <div className="space-y-4">
              <div className="clay-card p-4">
                <h3 className="font-semibold mb-3">Forma de Pagamento</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedPayment("money")}
                    className={`clay-button p-3 flex flex-col items-center gap-2 ${
                      selectedPayment === "money" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Banknote className="h-5 w-5" />
                    <span className="text-xs">Dinheiro</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedPayment("card")}
                    className={`clay-button p-3 flex flex-col items-center gap-2 ${
                      selectedPayment === "card" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Cartão</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedPayment("pix")}
                    className={`clay-button p-3 flex flex-col items-center gap-2 ${
                      selectedPayment === "pix" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs">PIX</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowPayment(false)}
                  className="clay-card px-4 py-3 text-center hover:bg-accent/50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={finalizeSale}
                  className="clay-button px-4 py-3 flex items-center justify-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}