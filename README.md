# brite-core

## How to use data table component ?
import component in vue file
```
import DataTable from '@/components/DataTable.vue';
```
define component in script section
```
components: {
    DataTable
  }
``` 



In Template section of vue file, add tag like this:
```
<template>
  <div>
    <DataTable />
  </div>
</template>
```

# Project setup
project is created using [vue-cli](https://cli.vuejs.org/). install vue-cli.
```
npm install -g @vue/cli
``` 
run vue-cli GUI by
```
vue ui
```
through this GUI load project and manage dependies, run tasks like serve build test. This is an easy and recomended way.

or

through command line


```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

## Deployment setup
1st build the project through vue-cli GUI or through command line
```
npm run build
```
this will place all build files in /dist folder at root of the project. Copy all files and folders to deployment server. index.html file is included so accessing server will run the project in browser.

### Time Spent
* 24 hours

### Improvements
* for editing, different input types can be used based on column types. e.g select, dates, textarea
* paging could be added

### favorite modern Javascript feature
*Template Literals*

no need to concat strings, write in single or multiple lines

### favorite third-party Vue.js library
*axios*

almost used in every project.

### Learn any new css property
`box-sizing: border-box;` width you set is the width you get  
