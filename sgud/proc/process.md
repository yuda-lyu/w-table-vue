# 處理要點（w-table-vue）

本檔記本套件特有之處理流程與使用者裁示。

> 2026-11-22 自 Claude Code 自動記憶提取（記憶依資料夾路徑存放，套件層級改變後失聯；原記於 2026-09-04～2026-10-07）。本套件當時尚無 `CLAUDE.md` 與 `sgud/`，本檔為首份指引要求文件。

## 1. 與上游 w-aggrid-vue 之關係與驗證範圍

- **dist 內嵌上游**：`WTableEdit.vue` 以原始碼 `import WAggridVue from 'w-aggrid-vue/src/components/WAggridVue.vue'`，`toolg/gDistRollupComps.mjs` 之 `external` 只有 `vue`，故 **dist 內嵌 w-aggrid-vue**。上游修正發布後，本套件須升 `w-aggrid-vue` 相依並重建 `dist`、發版，使用端才取得修正。
- **層層轉發之中間層**：`WTableEdit` 之包裝、轉發（例：`cell-render`、`cell-tooltip`、`head-render`、`head-tooltip` 之 slot 轉發須加 `v-if` 守衛，否則呼叫端未給 slot 時儲存格與表頭被渲染成空白，`WTableEdit.vue:234` 註解）、錯誤分流屬本套件之責任。
- **測試現況（2026-11-22 驗）**：`test/` 只有占位之 `all.test.mjs`，舊 `test-action/*.action.json` 抽查為空陣列、無人消費（且 `test-action/` 在 `.gitignore`）。上游 w-aggrid-vue 自 2.1.6（2026-10-07）有自己之 e2e（`test/e2e-*.test.mjs`：下載、上傳、過濾、生命週期、範例頁等），上游行為可參考其 e2e 與 JSDoc；但 WTableEdit 之包裝、轉發、錯誤分流不在其涵蓋內，**整合行為仍須自跑探針**，不要以「w-aggrid-vue 無 e2e」為前提。

## 2. 實測探針之既定作法（2026-10-07 記載，2026-11-22 依現況修訂）

三個套件層層轉發（w-component-vue → w-table-vue → w-aggrid-vue），上游每次發版都要重跑同一組實測；探針落 `./tmp/`（gitignored）並跨輪重用，不重寫。

- **瀏覽器來源**：本套件不宣告 playwright 相依，依自有套件慣例經 `w-playwright` 取得（各套件 2026-11-13 起遷移，規則見 w-component-vue 規則帳本四）。原作法「自 w-aggrid-vue 之 `node_modules` 動態 import playwright、`channel: 'chrome'` 用系統 Chrome」已失效（該處已無 `playwright`）。
- **in-DOM template 之 camelCase props**：瀏覽器把屬性名小寫化，`:formatWhenDownload` 綁不上；要傳 camelCase props 用 `v-bind="{ formatWhenDownload: false, ... }"` 物件語法。
- **ag-grid 列之 DOM 順序 ≠ 畫面順序**：讀欄值依 `.ag-row[row-index]` 排序（欄順序則依表頭格 `getBoundingClientRect().left`，見 w-aggrid-vue 之 sgud）。
- **下載驗證**：傳 `funGetLtdtHookWhenDownload`（`WTableEdit.vue` JSDoc 第 305 行）把 ltdt 存到 `window.__dl`，再 `vm.downloadData('raw')`，`page.on('download')` 直接 cancel。
- **上傳探針**：點 `path[d=<mdiUpload>]` → 彈窗 `:text-is("Replace"):visible`（`uploadModeTextForReplace` 預設值）→ `page.waitForEvent('filechooser')`；取消用 `fc.element().evaluate(e => e.dispatchEvent(new Event('cancel', { bubbles: true })))`（`element()` 是同步回傳，不可 `.then`）；xlsx 夾具在 node 以 wsemi `getExcelU8ArrFromData` 產。
- **上傳後驗證數據一律讀畫面列**：WTableEdit 上傳後，呼叫端之 `opt.rows` 不會被寫回（w-aggrid-vue 之 `set` 寫的是 WTableEdit 內部 useOpt）。
- **ag-grid 浮動過濾列之格沒有 `col-id`**：先取表頭格 `.ag-header-cell[col-id=<key>]` 之 `aria-colindex`，再填 `.ag-floating-filter[aria-colindex=<ci>] input:not([type="checkbox"]):not([disabled])`。
- **驗證「修法」又不想動 repo**：把 `src/components/*.vue` 複製到 `./tmp/<案>/src-fix/` 套補丁，用 `w-package-tools/src/rollupFiles.mjs` 指定 `fdSrc`／`fdTar` 建另一份 dist（bare import 會往上找到 repo 之 `node_modules`）。
- **重建 dist 供實測**：`./tmp/build-*-umd.mjs` 以 `process.chdir` 包 `toolg/gDistRollupComps.mjs` 後呼叫，不用 `cd`。

## 3. 改碼與發布之分工（使用者 2026-09-04 之約定；現由主控依 `script.txt` 執行）

- 使用者 2026-09-04：「我看完程式碼，就會發布，發布完再請你更新與確認」。主責 agent 只改 `src`、重建 `dist` 供真瀏覽器實測；**不 bump 版號、不 commit、不 publish**；版號、README CDN 行、jsdoc／docs／examples 產製、commit、publish 依 `script.txt` 由使用者（現為主控）執行。改完只回報 diff 與實測結果，並提醒「發布前要升版號」。
- 給上游之建議文件（`建議w-aggrid-vue修正.md`）由使用者（現為主控）複製進上游 repo 處理後刪除；上游發版後，逐項對照採納情況並實測，下游 repo 那份即成過期文件（發布前刪除）。
