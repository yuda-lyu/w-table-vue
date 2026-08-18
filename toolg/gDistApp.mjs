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

    `,
    globals: {
        'vue': 'Vue',
        'ag-grid-vue': 'ag-grid-vue', //ag-grid-vue會再引用vue-class-component與vue-property-decorator, 無法被rollup編譯, 故不打包進來, 須由外部cdn引入, 其umd會掛於window['ag-grid-vue']
    },
    external: [
        'vue',
        'ag-grid-vue',
    ],
}
rollupVueToHtml('./src/App.vue', './docs/examples/app.html', opt)

