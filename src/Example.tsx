import { create, tsx } from "@dojo/framework/core/vdom";
import injector from "@dojo/framework/core/middleware/injector";
import has from "@dojo/framework/core/has";

import * as css from "./Example.m.css";

interface ExampleProperties {
  content?: string;
  widgetName: string;
  active: string;
}

const factory = create({ injector }).properties<ExampleProperties>();

export default factory(function Example({
  children,
  properties,
  middleware: { injector }
}) {
  const { content, widgetName, active } = properties();
  const tabNames = ["example"];

  if (content) {
    tabNames.push("code");
  }
  if (!has("docs")) {
    tabNames.push("tests");
  }
  const activeTab =
    tabNames.indexOf(active) === -1 ? 0 : tabNames.indexOf(active);
  const tabs = [
    <div>
      <h3>Demo</h3>
      {children()}
    </div>
  ];
  if (content) {
    tabs.push(
      <div>
        <h3>Code</h3>
        <pre classes={["language-ts"]}>
          <code classes={["language-ts"]} innerHTML={content} />
        </pre>
      </div>
    );
  }
  if (!has("docs")) {
    tabs.push(
      <div>
        {activeTab === tabNames.indexOf("tests") && (
          <iframe
            classes={css.iframe}
            src={`./intern?config=intern/intern.json&widget=${widgetName}`}
          />
        )}
      </div>
    );
  }
  return <div>{tabs}</div>;
});
