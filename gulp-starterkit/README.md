# gulp-experiments

for gulp-starterkit yeoman generator:

clone the repository

```
cd gulp-starterkit
```

```
npm link //(to add generator to yeoman)
```

to see if works:

```
yo --help
```

and will appear the gulp-starterkit generator

to generate an project:

```
yo starterkit:app
```

to generate a page:

```
yo starterkit:page
```

to generate a component:

```
yo starterkit:component
```

begin with project (app)

```
npm install
gulp serve
```

make a build
```
gulp build
```

#Specific changes for layouts and pages

Layouts
We will use: 
```
{% body %}
```
instead of
```
{{> body }}
```

Pages
We will use:
```
---
layout: default //remove all .hbs extention for layout
---
```
instead of
```
---
layout: default.hbs
---
```


