import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/arcgis-web-map/arcgis-web-map";

type StoryProps = {
  itemId: string;
};

// Meta configuration for all arcgis-web-map stories
const meta: Meta<StoryProps> = {
  title: "ArcGIS Web Map",
  component: "arcgis-web-map",
  decorators: [
    (story: () => unknown) => {
      return html`
        <style>
          .story-content {
            height: 100vh;
          }
        </style>
        <div class="story-content">${story()}</div>
      `;
    },
  ],
};
export default meta;

export const Default: StoryObj<StoryProps> = {
  args: {
    // Another test itemId d5dda743788a4b0688fe48f43ae7beb9
    itemId: "05e015c5f0314db9a487a9b46cb37eca",
  },
  argTypes: {
    itemId: {
      control: {
        type: "text",
      },
    },
  },
  render: (args) =>
    html`<arcgis-web-map item-id=${args.itemId}></arcgis-web-map>`,
};
