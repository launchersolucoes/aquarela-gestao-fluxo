import { useState } from "react";
import { 
  Settings, 
  Building, 
  Users, 
  Printer, 
  Receipt, 
  Shield,
  Bell,
  Palette,
  Save,
  FileText,
  Zap,
  Globe
} from "lucide-react";

const tabs = [
  { id: "empresa", name: "Empresa", icon: Building },
  { id: "usuarios", name: "Usuários", icon: Users },
  { id: "impressao", name: "Impressão", icon: Printer },
  { id: "fiscal", name: "Fiscal", icon: FileText },
  { id: "integracoes", name: "Integrações", icon: Zap },
  { id: "sistema", name: "Sistema", icon: Settings },
];

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("empresa");

  const renderTabContent = () => {
    switch (activeTab) {
      case "empresa":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Dados da Empresa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Razão Social</label>
                <input className="clay-input w-full" defaultValue="Empresa LTDA" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nome Fantasia</label>
                <input className="clay-input w-full" defaultValue="Loja Virtual" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CNPJ</label>
                <input className="clay-input w-full" defaultValue="12.345.678/0001-90" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Inscrição Estadual</label>
                <input className="clay-input w-full" defaultValue="123456789" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">CEP</label>
                <input className="clay-input w-full" defaultValue="01234-567" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Endereço</label>
                <input className="clay-input w-full" defaultValue="Rua das Flores, 123" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cidade</label>
                <input className="clay-input w-full" defaultValue="São Paulo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select className="clay-input w-full">
                  <option>SP</option>
                  <option>RJ</option>
                  <option>MG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefone</label>
                <input className="clay-input w-full" defaultValue="(11) 9999-9999" />
              </div>
            </div>
          </div>
        );

      case "usuarios":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Usuários do Sistema</h2>
              <button className="clay-button flex items-center gap-2 px-4 py-2">
                <Users className="h-4 w-4" />
                Novo Usuário
              </button>
            </div>

            <div className="clay-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4">Nome</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Perfil</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4">Admin Sistema</td>
                    <td className="p-4">admin@empresa.com</td>
                    <td className="p-4">
                      <span className="clay-card px-2 py-1 text-xs font-medium">
                        Administrador
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="clay-card px-2 py-1 text-xs font-medium text-success">
                        Ativo
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="clay-button px-3 py-1 text-xs">
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "impressao":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Configurações de Impressão</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="clay-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Printer className="h-5 w-5" />
                  Impressora Térmica
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Impressora</label>
                    <select className="clay-input w-full">
                      <option>Epson TM-T20</option>
                      <option>Bematech MP-4200</option>
                      <option>Elgin i9</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Largura do Papel</label>
                    <select className="clay-input w-full">
                      <option>80mm</option>
                      <option>58mm</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="clay-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Layout do Cupom
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Logo da Empresa</label>
                    <button className="clay-button w-full">
                      Selecionar Imagem
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mensagem Rodapé</label>
                    <textarea 
                      className="clay-input w-full h-20 resize-none"
                      defaultValue="Obrigado pela preferência!"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "fiscal":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Configurações Fiscais</h2>
            
            <div className="clay-card p-6">
              <h3 className="font-semibold mb-4">Nota Fiscal Eletrônica (NFe/NFCe)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ambiente</label>
                  <select className="clay-input w-full">
                    <option>Homologação</option>
                    <option>Produção</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Regime Tributário</label>
                  <select className="clay-input w-full">
                    <option>Simples Nacional</option>
                    <option>Lucro Presumido</option>
                    <option>Lucro Real</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Série NFe</label>
                  <input className="clay-input w-full" defaultValue="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Série NFCe</label>
                  <input className="clay-input w-full" defaultValue="1" />
                </div>
              </div>
            </div>

            <div className="clay-card p-6">
              <h3 className="font-semibold mb-4">Certificado Digital</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Arquivo do Certificado (.pfx)</label>
                  <button className="clay-button w-full">
                    Selecionar Certificado
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Senha do Certificado</label>
                  <input type="password" className="clay-input w-full" />
                </div>
              </div>
            </div>
          </div>
        );

      case "integracoes":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Integrações</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="clay-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  API Externa
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">URL da API</label>
                    <input className="clay-input w-full" placeholder="https://api.exemplo.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Token de Acesso</label>
                    <input type="password" className="clay-input w-full" />
                  </div>
                  <button className="clay-button w-full">
                    Testar Conexão
                  </button>
                </div>
              </div>

              <div className="clay-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Marketplace
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span>Mercado Livre</span>
                    <button className="clay-button px-3 py-1 text-xs">
                      Configurar
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span>Shopee</span>
                    <button className="clay-button px-3 py-1 text-xs">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "sistema":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Configurações do Sistema</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="clay-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Estoque baixo</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Novas vendas</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Relatórios diários</span>
                  </label>
                </div>
              </div>

              <div className="clay-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Aparência
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tema</label>
                    <select className="clay-input w-full">
                      <option>Claro</option>
                      <option>Escuro</option>
                      <option>Automático</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cor Principal</label>
                    <input type="color" className="w-full h-10 rounded-lg border border-border" defaultValue="#6366f1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>
        <button className="clay-button flex items-center gap-2 px-4 py-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="clay-card p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                    ${activeTab === tab.id 
                      ? 'clay-button text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="clay-card p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}