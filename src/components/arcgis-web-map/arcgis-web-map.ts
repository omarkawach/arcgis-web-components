import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

/**
 * A custom element that displays a web map using the ArcGIS Maps SDK for JavaScript Core API.
 * LitElement extends HTMLElement.
 * @csspart viewDiv- - The container for the map view
 */
@customElement("arcgis-web-map")
export class ArcgisWebMap extends LitElement {
  /**
   * The item ID of the web map to display.
   * Can be passed to the component as an attribute or property.
   * Updating a reactive property causes the component to update
   */
  @property({ attribute: "item-id" })
  itemId: string = "";

  /**
   * A reference to the viewDiv child element in the component's shadow DOM
   */
  @query("#viewDiv")
  private viewDiv!: HTMLDivElement;

  /**
   * The map view that displays the web map.
   * Kept private to prevent direct access to the view
   */
  private mapView: MapView | null = null;

  // For enabling or disabled the shadow DOM
  createRenderRoot() {
    // Create a shadow root
    // const shadowRoot = this.attachShadow({ mode: "open" });

    // Add global styles to the shadow root
    // Useful in cases where you have multiple components in a package and want to include <link> for @arcgis/core styles
    // addGlobalStylesToShadowRoot(shadowRoot);

    // return shadowRoot;

    // Disable shadow DOM
    return this;
  }

  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text
  render() {
    return html`
      <link rel="stylesheet" href="https://js.arcgis.com/4.30/esri/themes/light/main.css">
      <style>
        #viewDiv {
          height: 100%;
          width: 100%;
        }
      </style>
      <div id="viewDiv" part="viewDiv"></div>
    `;
  }

  /**
   * Initialize the map view when the component is first updated
   */
  firstUpdated() {
    this.initializeMap();
  }

  /**
   *
   * @param changedProperties A Map of properties that have changed. Unrelated to core's Map.
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("itemId")) {
      this.initializeMap();
    }
  }

  /**
   * Create a new WebMap and MapView, and set the map view to display the web map
   */
  private initializeMap() {
    if (this.itemId) {
      const webMap = new WebMap({
        portalItem: {
          id: this.itemId,
        },
      });

      if (this.mapView) {
        this.mapView.map = webMap;
      } else {
        this.mapView = new MapView({
          container: this.viewDiv,
          map: webMap,
        });
      }
    }
  }

  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components
  // TODO: Can't seem to get this to work when shadow DOM enabled
  // static styles = css`
  //   :host {
  //     display: block;
  //     height: 100%;
  //     width: 100%;
  //   }
  //   #viewDiv {
  //     height: 100%;
  //     width: 100%;
  //   }
  // `;
}

declare global {
  interface HTMLElementTagNameMap {
    "arcgis-web-map": ArcgisWebMap;
  }
}
