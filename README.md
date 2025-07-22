# 🚀 Crypto Dashboard

Uma dashboard moderna e responsiva de criptomoedas construída com Next.js 15, TypeScript e Tailwind CSS. Acompanhe as principais 20 criptomoedas por capitalização de mercado, pesquise moedas específicas e visualize gráficos de preços detalhados com histórico de 7 dias.

![Crypto Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![React Query](https://img.shields.io/badge/React%20Query-5.0-FF4154?style=for-the-badge&logo=reactquery)

## ✨ Funcionalidades

### Funcionalidades Principais
- 📊 **Dashboard**: Visualize as principais 20 criptomoedas por capitalização de mercado
- 🔍 **Pesquisa**: Encontre criptomoedas específicas por nome ou símbolo
- 📈 **Gráficos de Preços**: Gráficos interativos de histórico de preços de 7 dias usando Recharts
- 📱 **Design Responsivo**: Design mobile-first que funciona em todos os dispositivos
- 🌙 **Tema Claro/Escuro**: Alterne entre modos escuro e claro
- ⚡ **Dados em Tempo Real**: Dados de criptomoedas ao vivo da API CoinGecko
- 🛡️ **Gerenciamento de Rate Limit**: Sistema inteligente de controle de taxa com retry automático
- 🔄 **Retry Inteligente**: Tentativas automáticas com contagem regressiva e notificações de usuário

### Funcionalidades Técnicas
- 🚀 **Next.js 15**: App Router, Componentes Server & Client, Otimização de Imagens
- 📦 **React Query v5**: Cache avançado, atualizações em background, tratamento de erros
- 🎨 **Tailwind CSS**: Sistema de design personalizado com variáveis CSS para temas
- 🧪 **Testes**: Testes unitários (Jest) e testes E2E (Playwright)
- 🐳 **Docker**: Containerização pronta para produção
- ♿ **Acessibilidade**: Conformidade WCAG 2.1 AA com HTML semântico
- 🔒 **Error Boundaries**: Tratamento e recuperação graceful de erros
- ⚡ **Otimização de Performance**: Cache inteligente e otimização de imagens

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript 5.7
- **Estilização**: Tailwind CSS 3.4 com sistema de design personalizado
- **Data Fetching**: React Query v5 (TanStack Query)
- **Gráficos**: Recharts para visualização de preços
- **API**: API CoinGecko para dados de criptomoedas
- **Tema**: next-themes para modo escuro/claro
- **Ícones**: Lucide React
- **Testes**: Jest + Testing Library + Playwright
- **Deploy**: Vercel + suporte Docker

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18.0+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd crypto-dashboard
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Abra seu navegador**
Navegue para [http://localhost:3000](http://localhost:3000)

## 🧪 Testes

### Testes Unitários
```bash
# Execute testes unitários
npm run test

# Execute testes em modo watch
npm run test:watch

# Execute testes com cobertura
npm run test -- --coverage
```

### Testes E2E
```bash
# Instale os navegadores do Playwright
npx playwright install

# Execute testes E2E
npm run test:e2e

# Execute testes E2E em modo UI
npx playwright test --ui
```

## 🐳 Docker

### Construir Imagem Docker
```bash
docker build -t crypto-dashboard .
```

### Executar Container Docker
```bash
docker run -p 3000:3000 crypto-dashboard
```

## 📚 Referência da API

### Integração com API CoinGecko

A aplicação usa a API CoinGecko v3 para dados de criptomoedas:

- **Top Moedas**: `/coins/markets` - Obter principais criptomoedas por capitalização de mercado
- **Pesquisa**: `/search` - Pesquisar criptomoedas por nome/símbolo  
- **Detalhes da Moeda**: `/coins/{id}` - Obter informações detalhadas sobre uma moeda específica
- **Histórico de Preços**: `/coins/{id}/market_chart` - Obter dados históricos de preços

### Rate Limits e Gerenciamento
- **API CoinGecko**: 10-50 requisições/minuto (plano gratuito)
- **Sistema Inteligente**: A aplicação implementa cache inteligente para minimizar chamadas da API
- **Retry Automático**: Sistema de retry com contagem regressiva e notificações de usuário
- **Tratamento de Erros**: Recuperação graceful com mensagens informativas

## 🏗️ Estrutura do Projeto

```
crypto-dashboard/
├── app/                    # Next.js App Router
│   ├── coin/[id]/         # Páginas dinâmicas de detalhes da moeda
│   ├── search/            # Página de pesquisa
│   ├── globals.css        # Estilos globais & variáveis CSS
│   ├── layout.tsx         # Layout raiz com providers
│   ├── loading.tsx        # UI de carregamento global
│   ├── not-found.tsx      # Página 404
│   └── page.tsx           # Página inicial (dashboard)
├── components/
│   ├── charts/            # Componentes de gráficos
│   ├── features/          # Componentes específicos de funcionalidades
│   └── ui/                # Componentes UI reutilizáveis
├── hooks/                 # Custom React hooks
│   ├── useCoins.ts        # Hook para dados de moedas com rate limiting
│   └── useRateLimit.ts    # Hook para gerenciamento de rate limit
├── lib/
│   ├── api/              # Camada de integração da API
│   ├── providers/        # React providers
│   ├── types/            # Definições TypeScript
│   └── utils/            # Funções utilitárias
├── __tests__/            # Testes unitários
├── e2e/                  # Testes E2E
└── public/               # Ativos estáticos
```

## 🎨 Sistema de Design

### Cores
A aplicação usa um sistema de cores abrangente com variáveis CSS para troca seamless de temas:

```css
/* Tema claro */
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--primary: 240 9% 83%;
--success: 142 76% 36%;
--destructive: 0 84.2% 60.2%;
--warning: 38 92% 50%;

/* Tema escuro */
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--primary: 0 0% 98%;
--success: 142 71% 45%;
--destructive: 0 62.8% 30.6%;
--warning: 48 96% 53%;
```

### Tipografia
- **Família de Fontes**: Inter (fallback para fontes do sistema)
- **Escala**: Escala de tipos padrão do Tailwind
- **Peso**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Espaçamento
- **Unidade Base**: 4px (0.25rem)
- **Escala**: Escala de espaçamento do Tailwind (4px, 8px, 12px, 16px, 24px, 32px...)

## 📱 Breakpoints Responsivos

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large**: 1024px - 1280px
- **XL**: > 1280px

## ♿ Acessibilidade

### Funcionalidades
- **Navegação por Teclado**: Suporte completo ao teclado com indicadores de foco visíveis
- **Leitores de Tela**: HTML semântico com labels ARIA apropriados
- **Contraste de Cores**: Razões de contraste compatíveis com WCAG 2.1 AA (mínimo 4.5:1)
- **Movimento Reduzido**: Respeita `prefers-reduced-motion` para animações
- **Gerenciamento de Foco**: Restauração de foco adequada e skip links

### Testes
```bash
# Execute testes de acessibilidade
npm run test:a11y
```

## 🔧 Configuração

### Variáveis de Ambiente
```bash
# Opcional: Chave da API CoinGecko para rate limits mais altos
NEXT_PUBLIC_COINGECKO_API_KEY=sua_chave_api_aqui
```

### Personalização
- **Cores do Tema**: Modifique as variáveis CSS em `app/globals.css`
- **Endpoints da API**: Atualize `lib/api/coingecko.ts`
- **Duração do Cache**: Configure as definições do React Query em `lib/providers/query-provider.tsx`
- **Rate Limits**: Ajuste configurações em `hooks/useRateLimit.ts`

## 🛡️ Sistema de Rate Limiting

### Funcionalidades Avançadas
- **Detecção Automática**: Identifica automaticamente erros 429 (Too Many Requests)
- **Retry Inteligente**: Sistema de retry com backoff exponencial
- **Interface de Usuário**: Componente dedicado com contagem regressiva visual
- **Tratamento de Erros**: Recuperação graceful com mensagens informativas em PT-BR
- **Cache Inteligente**: Minimiza chamadas desnecessárias da API

### Componentes
- `useRateLimit`: Hook personalizado para gerenciamento de estado de rate limit
- `RateLimitMessage`: Componente UI com contagem regressiva e retry manual
- `useCoins`: Hook integrado com tratamento automático de rate limiting

## 📈 Performance

### Funcionalidades de Otimização
- **Otimização de Imagens**: Otimização automática de imagens do Next.js
- **Code Splitting**: Divisão automática de código com Next.js
- **Cache**: Cache inteligente de respostas da API com React Query
- **Análise de Bundle**: Suporte integrado ao analisador de bundle
- **Lazy Loading**: Carregamento sob demanda de componentes

### Métricas de Performance
- **Pontuação Lighthouse**: 95+ (Performance, Acessibilidade, Melhores Práticas, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 2.5s

## 🚀 Deploy

### Vercel (Recomendado)
1. Envie o código para GitHub/GitLab
2. Conecte o repositório ao Vercel
3. Deploy automático

### Docker
```bash
# Construir e executar
docker build -t crypto-dashboard .
docker run -p 3000:3000 crypto-dashboard
```

### Deploy Manual
```bash
# Construir versão de produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch de funcionalidade (`git checkout -b feature/funcionalidade-incrivel`)
3. Faça suas alterações
4. Execute os testes (`npm test`)
5. Commit suas alterações (`git commit -m 'Adiciona funcionalidade incrível'`)
6. Envie para a branch (`git push origin feature/funcionalidade-incrivel`)
7. Abra um Pull Request

### Diretrizes de Contribuição
- Mantenha o código consistente com o estilo existente
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use mensagens de commit descritivas em português
- Teste em diferentes dispositivos e navegadores

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [CoinGecko](https://www.coingecko.com/api) por fornecer API gratuita de criptomoedas
- [Next.js](https://nextjs.org/) pelo framework React incrível
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS utility-first
- [React Query](https://tanstack.com/query) pelo poderoso data fetching
- [Recharts](https://recharts.org/) pelos gráficos bonitos
- Comunidade open source por suas contribuições

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:
1. Verifique a página [Issues](issues)
2. Crie uma nova issue com informações detalhadas
3. Forneça passos para reproduzir o problema
4. Inclua screenshots quando apropriado

## 🔄 Atualizações Recentes

### v0.1.0 - Funcionalidades Mais Recentes
- ✅ Sistema completo de rate limiting com retry automático
- ✅ Componente de mensagem de rate limit com contagem regressiva
- ✅ Otimização de imagens com Next.js Image component
- ✅ Melhorias na responsividade mobile
- ✅ Tratamento aprimorado de erros com recuperação graceful
- ✅ Interface bilíngue (PT-BR/EN) para componentes de rate limit

---

Feito com ❤️ por Vitor Pouza usando Next.js, TypeScript e Tailwind CSS