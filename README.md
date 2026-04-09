# Calendário de Arranjos (Salão do Reino)

App em **React + Vite** para preencher, todo mês, informações relacionadas a **arranjos do Salão do Reino** e gerar uma visualização fácil de compartilhar.

## Objetivo
- Você seleciona **mês** e **ano**.
- Preenche/ajusta os arranjos do mês (horários, locais e dirigentes).
- Em **terça** e **sábado**, o dirigente não é fixo: o app permite escolher por **data** via **select**.
- O layout fica em **proporção de tela de celular (9:16)** no desktop para facilitar tirar um **print** e visualizar no celular.

## Funcionalidades principais
- Calendário mensal em grid (Dom–Sáb).
- Bloco de anotações no topo:
	- Mostra a data do **último domingo** do mês selecionado antes de “Campo Rural com duas saídas” (formato **DD/MM**).
	- Mostra duas colunas com os dirigentes selecionados:
		- **Terça**: lista `DD/MM → Nome`
		- **Sábado**: lista `DD/MM → Nome`
- Tema **monocromático** (cinza escuro) com texto branco nas áreas em cinza.
- Ajuste para impressão (`@media print` + preservação de cores).

## Tecnologias
- React 19
- Vite 6
- styled-components
- ESLint

## Como instalar e rodar no seu ambiente

### Pré-requisitos
- **Node.js** (recomendado: versão LTS / Node >= 18)
- **npm**

### Passos
1) Instale as dependências:
```bash
npm install
```

2) Rode em modo desenvolvimento:
```bash
npm run dev
```

3) Build de produção (opcional):
```bash
npm run build
```

4) Preview do build (opcional):
```bash
npm run preview
```

5) Lint (opcional):
```bash
npm run lint
```

## Onde editar os dados
O “miolo” do projeto está em `src/pages/calendar.jsx`. Lá você encontra:
- `customHours`, `customLocal`, `customDriver`: padrões por **dia da semana**.
- `driverTuesday`, `driverSaturday`: listas de opções dos **selects**.
- `customAnnotations`: textos/itens do bloco de anotações.

## Limitações atuais
- As seleções de terça/sábado não são persistidas (ao recarregar ou trocar mês/ano, elas são limpas).
- A data do aviso “Campo Rural…” é calculada automaticamente (último domingo do mês) e não vem de um campo editável.
