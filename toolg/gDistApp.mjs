import rollupVueToHtml from 'w-package-tools/src/rollupVueToHtml.mjs'


let opt = {
    title: `w-table-vue`,
    head: `

    <!-- rollupVueToHtml已自動添加@babel/polyfill與vue -->

    <!-- fontawesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/all.min.css" rel="stylesheet">

    <!-- mdi, 各組件使用mdi/js故不需引用 -->
    <link _href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css" rel="stylesheet">

    <!-- google, 各組件使用mdi/js故不需引用 -->
    <link _href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link _href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">

    <!-- xlsx, w-aggrid-vue的download與upload會使用 -->
    <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

    <!-- ag-grid, ag-grid-vue無法被rollup編譯, 須由cdn引入, 且其依賴window.agGrid -->
    <script src="https://cdn.jsdelivr.net/npm/ag-grid-community@31.3.4/dist/ag-grid-community.min.noStyle.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ag-grid-vue@31.3.4/dist/ag-grid-vue.umd.min.js"></script>

    `,
    globals: {
        'vue': 'Vue', //因動態加載組件, 現統一使用window內Vue, 故此處不打包進來, 若vue-cli則自動將Vue關聯至window內的Vue
        'ag-grid-vue': 'ag-grid-vue', //ag-grid-vue會再引用vue-class-component與vue-property-decorator, 無法被rollup編譯, 故不打包進來, 須由外部cdn引入, 其umd會掛於window['ag-grid-vue']
    },
    external: [
        'vue',
        'ag-grid-vue',
    ],
}
rollupVueToHtml('./src/App.vue', './docs/examples/app.html', opt)

