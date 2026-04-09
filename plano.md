# plano.md — Contexto do projeto (calendar-react-2025)

## Instruções (requisitos do projeto)
- Objetivo: permitir preencher, todo mês, informações relacionadas a **arranjos do Salão do Reino**.
- Deve ter opções em **select** para o **campo no sábado e na terça**, pois nesses dias **não podem existir dirigentes fixos**.
- O projeto foi pensado para ser **bem visualizado no celular** (layout responsivo/uso confortável em telas pequenas).

Gerado em: **08/04/2026**

## 1) Visão geral
Este repositório é um app **React + Vite** (bem pequeno, sem rotas) que renderiza um **calendário mensal** para organizar e preencher **arranjos do Salão do Reino**.

A tela principal permite:
- Selecionar **mês** e **ano**.
- Ver um grid de calendário com, para cada dia:
  - **Horário** (por dia da semana)
  - **Local** (por dia da semana)
  - **Dirigente** (fixo por dia da semana, exceto terça/sábado)
  - Em **terça e sábado**: **select** para definir o dirigente por **data** (esses dias não têm dirigente fixo)
- Exibir um bloco de **anotações** no topo, incluindo:
  - Um aviso “Campo Rural com duas saídas” com a **data do último domingo** do mês selecionado (formato **DD/MM**)
  - Um resumo em **duas colunas** listando os dirigentes selecionados (terça e sábado), também em **DD/MM**

O layout foi ajustado para ficar em **proporção de tela de celular (9:16)** no desktop (ideal para tirar “print” e visualizar no celular), mas **pode crescer na vertical** em meses com 6 semanas.

Há também uma preocupação explícita com **impressão** (print), preservando cores.

## 2) Stack e dependências
- **React 19** + **react-dom 19**
- **Vite 6** (dev server, build e preview)
- **styled-components 6** (estilização e `createGlobalStyle`)
- ESLint configurado para JS/JSX + regras de hooks e compatibilidade com React Refresh.

## 3) Scripts (package.json)
- `npm run dev`: roda o Vite em desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: preview do build
- `npm run lint`: ESLint no projeto

## 4) Estrutura de pastas
Estrutura relevante (fora `node_modules/`):
- `index.html`: HTML base, fonte e favicon
- `vite.config.js`: config padrão do Vite com plugin React
- `eslint.config.js`: regras de lint
- `src/main.jsx`: bootstrap do React
- `src/App.jsx`: injeta estilos globais e renderiza a página
- `src/pages/calendar.jsx`: componente principal (Calendar)
- `src/anotações/Revezamento.txt`: anotações de revezamento/escala (conteúdo manual)
- `src/assets/images/jw-logo.svg.png`: favicon usado no `index.html`

## 5) Fluxo de renderização (entrada do app)
- `index.html` cria o `<div id="root"/>` e aponta para `src/main.jsx`.
- `src/main.jsx` usa `createRoot(...).render(<StrictMode><App/></StrictMode>)`.
- `src/App.jsx` aplica um `GlobalStyle` (reset básico + ajuste para impressão) e renderiza `<Calendar />`.

Não existe roteamento (React Router etc.). O app é **uma única tela**.

## 6) O componente Calendar (src/pages/calendar.jsx)
### 6.1 Estado e controles
- Usa `useState` para:
  - `selectedYear` (inicia com `new Date().getFullYear()`)
  - `selectedMonth` (inicia em 0 = Janeiro)
- O seletor de ano usa um array fixo: `years = ["2025", "2026", "2027", "2028", "2029", "2030"]`.
- O seletor de mês usa nomes em PT-BR: Janeiro…Dezembro.

### 6.2 Cálculos de calendário
- `daysInMonth`: último dia do mês via `new Date(selectedYear, selectedMonth + 1, 0).getDate()`
- `firstDay`: dia da semana do 1º dia do mês via `new Date(selectedYear, selectedMonth, 1).getDay()`
- Para cada dia do mês, calcula `weekDay` (0..6) e mapeia para abreviações: `Dom, Seg, Ter, Qua, Qui, Sex, Sáb`.

O layout:
- Primeira linha: cabeçalho com os nomes dos dias.
- Depois: insere “células vazias” para alinhar o dia 1 (offset pelo `firstDay`).
- Depois: renderiza um `DayBox` por dia do mês.

### 6.3 Dados fixos (hard-coded)
O preenchimento do calendário é por **dia da semana**, não por data específica.

Existem 3 mapas principais:
- `customHours`: hora de saída por dia (inclui chaves extras como `TerNoite`, `QuaNoite`, `QuiNoite`)
- `customLocal`: local por dia (também com `...Noite`)
- `customDriver`: dirigente/motorista(?) por dia (também com `...Noite`)

Além disso:
- `customAnnotations`: bloco de texto no topo com campos como `data`, `localPrimario`, `dirigentePrimario`, `gruposPrimario`, etc.
- `driverSaturday`: lista de opções exibida em um `<select>` nos sábados
- `driverTuesday`: lista de opções exibida em um `<select>` nas terças

Observações importantes (estado atual):
- Os `<select>` de terça/sábado são **controlados por state**, armazenando o dirigente selecionado por **dia do mês** (`tuesdayDriversByDay` e `saturdayDriversByDay`).
- Ao trocar mês/ano, as seleções de terça/sábado são **limpas** (reset) para evitar vazamento de dados entre meses.
- A data exibida no aviso “Campo Rural…” **não usa** `customAnnotations.data`; ela é **calculada** como o **último domingo do mês selecionado**.

### 6.4 Regras de exibição
- Para qualquer dia: mostra horário, local e dirigente do dia da semana.
- Para **terça**: mostra um `<select>` (lista `driverTuesday`) e o campo **Dirigente** passa a refletir a seleção (por data).
- Para **sábado**: mostra um `<select>` (lista `driverSaturday`) e o campo **Dirigente** passa a refletir a seleção (por data).
- Para **terça e quarta**: renderiza um segundo bloco “Noite” usando chaves `TerNoite` e `QuaNoite`.

Observação:
- Apesar de existirem chaves `QuiNoite` nos objetos, o componente atualmente **não renderiza** “Noite” para quinta-feira (apenas terça e quarta).

## 7) Estilos e impressão
- Fonte “Ubuntu” é carregada via Google Fonts no `index.html`.
- `styled-components` define toda a UI do calendário.
- Há um `@media print` no `GlobalStyle` para garantir ajuste de cores ao imprimir:
  - `-webkit-print-color-adjust: exact;`
  - `print-color-adjust: exact;`

A identidade visual é **monocromática**, usando um **cinza escuro** (ex.: `#4a4a4a`) e mantendo **texto branco** sobre áreas de fundo cinza. Esse tom é aplicado em:
- Fundo de cabeçalho dos dias
- Bordas do calendário
- Fundo do bloco de anotações
- Fundo dos selects de terça/sábado

## 8) Arquivo de anotações (Revezamento.txt)
`src/anotações/Revezamento.txt` contém uma escala manual com:
- Lista de nomes (ex.: motoristas/dirigentes)
- Regras de sequência/revezamento
- “Visita nos grupos” (grupo, responsável e local)
- Um rascunho mensal (2026) indicando composição de grupos, dirigente e visita

Esse arquivo não é importado pelo app; ele funciona como **referência humana** para alimentar/ajustar os dados hard-coded do calendário.

## 9) Estado atual do projeto (o que dá para afirmar pelo código)
- App funcional e simples: 1 tela, dados fixos, pronto para visualizar/printar.
- Não há persistência (sem localStorage/arquivo/DB).
- Os dados do calendário são editados diretamente no código em `src/pages/calendar.jsx`.
- Terças e sábados permitem escolher dirigentes por data; o resumo aparece automaticamente em duas colunas no bloco de anotações.
- Lint: há script `npm run lint` configurado e o projeto está estruturado como um template padrão do Vite.

## 10) Próximos passos (opcionais, se você quiser evoluir)
Sem mudar o UX geral (mês/ano + grid), as evoluções mais diretas seriam:
- Transformar `customHours/customLocal/customDriver/customAnnotations` em um “config” externo (ex.: JSON) para facilitar manutenção.
- Adicionar persistência das seleções (ex.: `localStorage`) para não perder escolhas ao recarregar/trocar mês.
- Revisar a regra de “Noite” (se quinta também deve aparecer, já que existe `QuiNoite`).
- Ajustar detalhes de acessibilidade/semântica (labels para selects, etc.).
