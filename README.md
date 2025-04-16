# README

## 簡介

這是一個簡易食物點餐系統，包含以下主要功能

- 菜單
  - 顯示來自不同分類的餐點
  - 點選菜單可將想要的餐點加入購物車
  - 已選取到的餐點會有✔標記

- 購物車
  - 顯示使用者已選擇的餐點
  - 按「＋」、「―」鈕，或者輸入整數到輸入框可調整每項餐點的數量。若餐點數被改為0，會自動將餐點移出購物車
  - 按「垃圾桶」鈕可將將餐點移出購物車
  - 顯示目前選擇的餐點的總金額
  - 按「送出」鈕可送出訂單

- 訂單紀錄
  - 顯示所有已送出的訂單詳細內容
  - 按「刪除紀錄」鈕可以清除所有歷史紀錄
  - 按「再點一次」鈕可以把該紀錄的內容相同的餐點加進購物車

- 其他
  - 設有dark mode和light mode，調整瀏覽器主題可使用不同模式

## 環境需求

請確認你的電腦已具備以下條件，才能順利啟動與開發本專案

### 安裝 Node.js

- 未安裝前往 [Node.js 官方網站](https://nodejs.org/) 下載並安裝 >= v18 的版本
- 確認已安裝版本是否 >= v18，若否則使用以上連結下載新版

  ```bash
  node -v
  ```

### 安裝 pnpm

```bash
npm install -g pnpm
```

### 安裝VS Code推薦extension

本專案有安裝專案設訂的推薦VS Code extension後可用automatically format on save的功能

## 使用技術

### 開發

1. React 18
2. Typescript 5
3. Redux & Redux toolkit
4. Tanstack React Query
5. Axios
6. MUI 7
7. Tailwind 4

### 測試

1. Vitest
2. React Testing Library

### 其他工具

1. Vite 6
2. ESLint
3. Prettier

## 啟動專案

### 1. 安裝套件

```bash
pnpm i
```

### 2. 啟動mock api server

本專案使用json-server作為mock api server

```bash
pnpm db:dev
```

### 3. 啟動 vite dev server

```bash
pnpm vite
```

## 其他

1. 如果有修改MUI custom theme的色盤，可以使用指令`sync-palette`把顏色同步過去Tailwind的CSS變數，這樣就可以使用那些顏色

```js
// theme.ts

const primaryColors = {
  dark: {
    main: lime[500],
    light: lime[300],
    dark: lime[700],
    contrastText: pink[300],
  },
  light: {
    main: pink[500],
    light: pink[300],
    dark: pink[700],
    contrastText: lime[300],
  },
};

const theme = createTheme({
  palette: {
    mode,
    // 修改primary
    primary: primaryColors[mode],
  },
});
```

執行以下指令

```bash
pnpm sync-palette
```

得到新的CSS變數

```css
/* index.css */

@theme{
--color-primary-main: light-dark(#e91e63, #cddc39);
--color-primary-light: light-dark(#f06292, #dce775);
--color-primary-dark: light-dark(#c2185b, #afb42b);
--color-primary-contrastText: light-dark(#dce775, #f06292);
/* 下略 */
}
```

在需要的地方使用

```tsx
<p className="text-primary-main bg-primary-contrastText">Hello</p>
```