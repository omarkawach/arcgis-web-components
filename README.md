# Build your own GIS web component library

> Disclaimer: The code in this repo are my own and don’t necessarily represent Esri’s position, strategies, or opinions.

The intent of this repo is to help you get started with creating your own web component library based on a GIS web mapping library. Although you could use any mapping library you'd prefer, we're going to use [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/) as an example. If you want to see this done with [MapLibre GL JS](https://maplibre.org/), check out [foss-gis-web-components](https://github.com/omarkawach/foss-gis-web-components/tree/main).

## Components

We only include one component as part of this component library / package. That is the `<arcgis-web-map></arcgis-web-map>` component which allows you to add a series of points to a map. There are no plans to include additional components.

You can view this component live [here](https://omarkawach.github.io/arcgis-web-components/) in a Storybook.

## Get started

### Install dependencies

```bash
npm install
```

### Dev

Start local server. This will serve `index.html`

```bash
npm run dev
```

### Build

Build the project to the specified output folder (`/dist`)

```bash
npm run build
```

### Preview

Start local server to serve the specified output folder. You must run `build` before `preview`

```bash
npm run preview
```

### Testing

We run an instance of Storybook to test the component API

```bash
npm run storybook
```

## FAQ

### How would I recreate a similar repo like this one but from scratch?

Since we're using Lit, the first thing you'd have to do is run `npm create vite@latest` in your terminal and select `lit` from the CLI options. Then you'd run `npm install` to generate a `/node_modules`. Next, running `npx storybook@latest init` will include Storybook in your project.

At this point you'll have a few unnecessary files. You can clear out stories you don't need. If you want to work with typescript you'll need to update your `tsconfig.json` and if you want to externalize any dependencies you would have to add or update your `vite.config.ts` file.

Now you can begin developing and testing your component(s).

### What kind of tech is being used?

- A library for mapping on the web
  - [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
- Build / development tools
  - [Lit](https://lit.dev/) for writing web components
    - [Stencil](https://stenciljs.com/), and [FAST](https://fast.design/) are potential alternatives
  - [Vite](https://vitejs.dev/) since Lit doesn't have its own compiler
  - [Typescript](https://www.typescriptlang.org/)
- Testing
  - [Storybook](https://storybook.js.org/) (@storybook/web-components-vite)
- Sample code for using the component in frameworks
  - [Vue](https://vuejs.org/)
  - [React 19](https://react.dev/) and [MDX](https://mdxjs.com/)

### What are web components?

> Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.
> Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

Source: https://www.webcomponents.org/introduction

### What is a library for mapping on the web?

To include maps in a web application, the easiest and most common way is through mapping libraries. Mapping libraries provides out-of-box support for visualizations and interactions in maps. Common choices are as follows:

- Open-source libraries: 
  - [Leaflet](https://leafletjs.com/)
  - [MapLibre GL JS](https://maplibre.org/)
  - [OpenLayers](https://openlayers.org/)
  - [turf.js](https://turfjs.org/)
- Commercial libraries: 
  - [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
  - [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
  - [MapBox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)

We are also seeing a growing number of mapping libraries as React, Angular, web, or Vue components. Some notable component libraries are:

- Open-source: 
  - [Nivo React](https://github.com/plouc/nivo) (built on top of D3)
  - [Vue 3.x components for CesiumJS](https://github.com/zouyaoji/vue-cesium)
  - [React Leaflet](https://react-leaflet.js.org/)
  - [ngx-leaflet](https://www.npmjs.com/package/@asymmetrik/ngx-leaflet)
  - [ngx-maplibre-gl](https://github.com/maplibre/ngx-maplibre-gl)
  - [@planet/maps](https://github.com/planetlabs/maps)
  - [leaflet-map](https://github.com/leaflet-extras/leaflet-map)
  - [openlayers-elements](https://github.com/openlayers-elements/openlayers-elements)
- Commericial libraries: 
  - [ArcGIS Maps SDK for JavaScript components](https://developers.arcgis.com/javascript/latest/components/)
  - [Google Maps JavaScript API Web Components](https://mapsplatform.google.com/resources/blog/build-maps-faster-web-components/#:~:text=Maps%20JavaScript%20API%20Web%20Components.%20Developers%20can%20access)

Choosing the best web mapping libraries that suit end user and developer needs is a crucial step for all web development involving maps and/or location services.

### How do you publish a component package to npm?

You can run `npm pack` for a preview of what an npm package of your components would look like. Additionally, Lit has documentation on [publishing your component package](https://lit.dev/docs/tools/publishing/) and if necessary, a [React 18 framework wrapper](https://lit.dev/docs/frameworks/react/) too. React 19 [seems to work fine](https://custom-elements-everywhere.com/) without a framework wrapper. This is demonstrated in one of the samples in this repo.

### What's the recommendation for documenting a component's API?

The [web components community](https://www.webcomponents.org/) recommends the [community standard custom-elements-manifest JSON](https://github.com/webcomponents/custom-elements-manifest).

### What challenges are there with creating a web component library?

If you're looking to write some truly "enterprise-ready" web components, you will face a series of challenges for consideration:

- Whether or not to include framework wrappers
  - E.g., React wrapper for React 18
- Publishing on npm
- How well a GIS web mapping library can work with web component technology (e.g., slots and Shadow DOM)
- Typings
  - Including HTML typings is basically a freebie. Typings for JSX would be an additional effort
- Documentation
  - How will you output and share documentation?
  - E.g., TypeDoc, JSON, MDX, etc. 
- Support module formats other than [ECMAScript Modules](https://nodejs.org/api/esm.html) (ESM), like [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
  - If we only support ESM applications then that means vanilla JavaScript script-tag users who prefer writing quick apps in an `index.html` file will struggle. The level of complexity for implementing this support can depend on how well your mapping library plays with certain module formats.
- How to handle styling (e.g., [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets), light DOM / shadow DOM, etc.)
- Asset management (if the component package requires assets)
  - Icons, translation files, etc.
- Support disconnected / self-contained environment setups
- Support [server-side rendering](https://www.debugbear.com/blog/server-side-rendering) (SSR)
- Development system for web components
  - Does it include a built-in compiler? How much can this compiler do for you?
  - Can it bundle components together if necessary?
  - Can it support lazy loading web components? Lazy loading prevents tree shaking and increases an app's bundle size
  - Can it externalize dependencies?
- Maintenance
  - Testing
  - Managing dependencies
  - Breaking changes

These are only some of the considerations, but ultimately, if you're aiming for a bare minimum component library you could probably ignore some of or all of the considerations.

### Why Lit?

Lit is a lightweight, un-opinionated, and customizable development system for writing web components. Since Lit doesn't have its own compiler, we use Vite for our development server and build tool. In comparison, Stencil has its own compiler but may not be flexible enough to adapt to the requirements of GIS web mapping libraries who want to be "enterprise-ready". Another comparison is that Stencil supports JSX, but Lit does not. FAST is also lightweight and doesn't include its own built-in compiler. Technically, you could write [web components with frameworks such as Vue](https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue), but then your component library might be less portable and become tightly coupled to that framework.

### How to debug?

The component relies on the JavaScript Maps SDK. You can look for core API errors in DevTools.

### What are some additional resources?

https://github.com/web-padawan/awesome-web-components

https://github.com/joewdavies/awesome-frontend-gis
