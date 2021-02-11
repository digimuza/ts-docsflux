import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/Documentation";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import "./themes/index.scss";
import * as P from "ts-prime";
import { DocsManipulation } from "./helpers";

const getDeps = async () => {
  const basePath = await P.waitUntilDefined(
    () =>
      document.getElementsByName("basePath")?.item(0)?.getAttribute("content"),
    3000
  );

    const [docs, config] = await Promise.all([
    axios.get(`${basePath}/data/data.json`).then((data) => {
      return data.data as {
        docs: DocsManipulation.DocumentationMembers;
        articles: {
          readme: string;
        };
      };
    }),
    axios
      .get(`${basePath}/data/config.json`)
      .then((q) => q.data as { repositoryUrl: string }),
  ]);

  return {
    docs,
    config,
    basePath
  }
};


export type PromiseValueOf<O> = O extends Promise<infer T> ? T : never
type Deps = PromiseValueOf<ReturnType<typeof getDeps>>

const DepsContext = createContext(undefined as unknown as Deps);

export function useDeps() {
  return useContext(DepsContext);
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
  const data = usePromise(() => getDeps());

  if (data == null) return null;

  return (
    <DepsContext.Provider
      value={data}
    >
      <App
        key={"app"}
        documentation={data.docs.docs}
        readme={data.docs.articles.readme}
      ></App>
    </DepsContext.Provider>
  );
};

ReactDOM.render(<Load />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
