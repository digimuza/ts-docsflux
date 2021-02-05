import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/Documentation";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import "./themes/index.scss"
import * as P from "ts-prime";
import { DocsManipulation } from "./helpers";


const getData = async () => {
  const basePath = await P.waitUntilDefined(
    () =>
      document.getElementsByName("basePath")?.item(0)?.getAttribute("content"),
    3000
  );
  const result = await axios.get(`${basePath}/data/data.json`);
  return result.data as {
    docs: DocsManipulation.DocumentationMembers;
    articles: {
      readme: string;
    };
  };
};

const BasePathContext = createContext("");

export function useBasePath() {
  return useContext(BasePathContext);
}

function usePromise<T>(fn: () => Promise<T>, deps?: any[]): T | undefined {
  const [state, setState] = useState<T | undefined>(undefined);
  useEffect(() => {
    fn().then((q) => {
      setState(q);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || [])]);

  return state;
}

const Load = () => {
  const data = usePromise(() => getData());
  const basePath = usePromise(() =>
    P.waitUntilDefined(
      () =>
        document
          .getElementsByName("basePath")
          ?.item(0)
          ?.getAttribute("content"),
      3000
    )
  );

  if (basePath == null) return null;
  if (data == null) return null;

  return (
    <BasePathContext.Provider value={basePath}>
      <App
        key={"app"}
        documentation={data.docs}
        readme={data.articles.readme}
      ></App>
    </BasePathContext.Provider>
  );
};

ReactDOM.render(<Load />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
