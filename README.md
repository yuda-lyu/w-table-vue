# w-table-vue
A table component for vue(vue2).

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![language](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue) 
[![npm version](http://img.shields.io/npm/v/w-table-vue.svg?style=flat)](https://npmjs.org/package/w-table-vue) 
[![license](https://img.shields.io/npm/l/w-table-vue.svg?style=flat)](https://npmjs.org/package/w-table-vue) 
[![npm download](https://img.shields.io/npm/dt/w-table-vue.svg)](https://npmjs.org/package/w-table-vue) 
[![npm download](https://img.shields.io/npm/dm/w-table-vue.svg)](https://npmjs.org/package/w-table-vue) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-table-vue.svg)](https://www.jsdelivr.com/package/npm/w-table-vue)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-table-vue/global.html).

## Example
To view some examples for more understanding, visit examples:

> **all components:** [web](//yuda-lyu.github.io/w-table-vue/examples/app.html) [[source code](https://github.com/yuda-lyu/w-table-vue/blob/master/docs/examples/app.html)]

## Installation

### Using npm(ES6 module):
```alias
npm i w-table-vue
```
Import all components:
```alias
//choose component
<w-table-edit
    ...
></w-table-edit>

//import
import WTableVue from 'w-table-vue'

//use
Vue.use(WTableVue)
```
Import one component:
```alias
//choose component
<w-table-edit
    ...
></w-table-edit>

//import
import WTableEdit from 'w-table-vue/src/components/WTableEdit.vue'

//component
Vue.component('w-table-edit',WTableEdit)
//or
export default {
    components: {
        WTableEdit,
        //or
        'w-table-edit': WTableEdit,
    },
    ...
}
```

### In a browser(UMD module):

Add scripts for ag-grid(w-table-vue is based on w-aggrid-vue, ag-grid-vue and ag-grid-community can not be bundled, so they have to be loaded from cdn), xlsx(for download and upload Excel file) and w-table-vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ag-grid-community@31.3.4/dist/ag-grid-community.min.noStyle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ag-grid-vue@31.3.4/dist/ag-grid-vue.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/w-table-vue@1.0.0/dist/w-table-vue.umd.js"></script>
```

Directly use:
```alias
//app and component
<div id="app">
    <w-table-edit
        style="width:600px; height:400px;"
        :name="name"
        :description="description"
        :opt="opt"
        :editable="true"
    ></w-table-edit>
</div>

//use
Vue.use(window['w-table-vue'])

//new
new Vue({
    el: '#app',
    data: {
        name: 'Car Price',
        description: 'The relationship between different car types and prices',
        opt: {
            keys: ['make', 'model', 'price'],
            kpHeadFilterType: { //default: num (num,text,time,set)
                'make': 'text',
                'model': 'text',
                'price': 'num',
            },
            rows: [
                { make: 'Toyota', model: 'Celica', price: 35000 },
                { make: 'Ford', model: 'Mondeo', price: 32000 },
                { make: 'Porsche', model: 'Boxter', price: 72000 },
            ],
        },
    }
})
```