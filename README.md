# 🌐 RENOB Site

Este é o site do projeto **RENOB**, desenvolvido com [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [Tailwind CSS](https://tailwindcss.com/) e [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript), com os dados higienizados via [Python](https://www.python.org/), e publicado automaticamente com [GitHub Pages](https://pages.github.com/) via GitHub Actions. Feito em parceria com **[@goanalytics05](https://github.com/goanalytics05)**.

---

## 🖥️ Visualização

Acesse o site em:  
🔗 [https://matheuscalbqq.github.io/renob-site](https://matheuscalbqq.github.io/renob-site)

---

## 🧱 Tecnologias utilizadas

- [Tailwind CSS](https://tailwindcss.com/) — Utilitário CSS para criação rápida de interfaces responsivas
- [PostCSS](https://postcss.org/) — Utilizado para compilar o CSS com Tailwind
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Utilizado para filtrar e calcular dados, além de renderizar gráficos via d3.js
- [Python](https://www.python.org/) — Utilizado para higienizar e padronizar as bases de dados via Pandas
- [GitHub Actions](https://github.com/features/actions) — Automatização do processo de build e deploy
- [GitHub Pages](https://pages.github.com/) — Hospedagem gratuita do site

---

## 🛠️ Estrutura do projeto

```
renob-site/
├── src/
│   └── input.css                 # Arquivo de entrada do Tailwind
├── public/
│   └── index.html                # Página HTML principal
|   └── dist/
│       └── output.css            # CSS gerado automaticamente
|   └── data/
│       └── db_final.csv          # Database principal
│       └── db_region.csv         # Database de relações federativas e regiões de saúde
│       └── geojson/
│           └── br_cities/        # Geojsons de visualização municipal
│           └── by_states/        # Geojsons de visualização regiões de saúde
│           └── br_states.json    # Geojson de visualização estadual
│           └── brazil.json       # Geojson de visualização nacional
|   └── images/
│       └── logo-renob-vet        # logo no header
|   └── js/
│       └── analise_temporal.js   # Script do gráfico de análise temporal
│       └── global.js             # Centralização de variáveis globais
│       └── mapeamento.js         # Script do gráfico de barras
│       └── regional.js           # Script do gráfico de mapas regionais
├── .github/
│   └── workflows/
│       └── deploy.yml            # Pipeline de build e deploy
├── tailwind.config.js            # Configuração do Tailwind
├── postcss.config.js             # Configuração do PostCSS
└── package.json                  # Dependências e scripts
```

---

## 🧪 Como rodar localmente

1. **Clone o repositório**

```bash
git clone https://github.com/matheuscalbqq/renob-site.git
cd renob-site
```

2. **Instale as dependências**

```bash
npm install
```

3. **Gere o CSS com Tailwind**

```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

4. **Abra \`public/index.html\` em seu navegador**

---

## ⚙️ Build e Deploy automático

Toda vez que você fizer um \`push\` na branch \`main\`, o GitHub Actions irá:

1. Compilar o Tailwind CSS
2. Copiar os arquivos da pasta \`public/\`
3. Publicar automaticamente no GitHub Pages (branch \`gh-pages\`)

