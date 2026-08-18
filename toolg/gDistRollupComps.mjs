import _ from 'lodash-es'
import rollupFiles from 'w-package-tools/src/rollupFiles.mjs'


let fdSrc = './src/components/'
let fdTar = './dist'


rollupFiles({
    fns: 'WTableVue.vue',
    fdSrc,
    fdTar,
    nameDistType: 'kebabCase',
    globals: {
        'vue': 'Vue', //因動態加載組件, 現統一使用window內Vue, 故此處不打包進來, 若vue-cli則自動將Vue關聯至window內的Vue
        'ag-grid-vue': 'ag-grid-vue', //ag-grid-vue會再引用vue-class-component與vue-property-decorator, 無法被rollup編譯, 故不打包進來, 須由外部cdn引入, 其umd會掛於window['ag-grid-vue']
    },
    external: [
        'vue',
        'ag-grid-vue',
    ],
})

