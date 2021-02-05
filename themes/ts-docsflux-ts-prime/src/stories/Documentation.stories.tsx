import React from "react";
import App from "../components/Documentation";
import { DocsManipulation } from "../helpers";
import data from "./mock/data.json";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "App",
  component: App,
};

const getMock = () => {
  return data as {
    docs: DocsManipulation.DocumentationMembers;
    articles: {
      readme: string;
    };
  };
};
const mock = getMock()
export const Empty = () => (
  <App documentation={mock.docs} readme={mock.articles.readme}></App>
);
