import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    outDir: "dist",
    lib: {
      entry: {
        "arcgis-web-map": "src/components/arcgis-web-map/arcgis-web-map.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      /**
       * Lit will not be included in the bundle so the components remain standalone.
       * Instead, lit must be provided by the consuming project as a dep.
       * This is also useful in case you use another library that depends on lit.
       * Similarly, @arcgis/core must be provided by the consuming project.
       * Externalizing @arcgis/core can significantly reduce bundle size and build time.
       * If an application is running in an environment where @arcgis/core is already loaded
       * (e.g., a larger application that includes @arcgis/core), externalizing it can avoid redundant loading
       */
      external: [
        // "lit-html" and "lit-element" are indirect dependencies that should be excluded
        // In addition, externalize all @lit/ and @lit-labs/ packages
        /^lit$/u,
        /^lit[-/]/u,
        /^@lit[-/]/u,
        // Externalize @arcgis/core
        /^@arcgis\/core/,
      ],
      // Could also use https://www.npmjs.com/package/rollup-plugin-node-externals to simplify externalizing deps
    },
  },
  server: {
    open: false,
  },
});
