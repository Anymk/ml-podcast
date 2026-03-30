"use client";

import { useState } from "react";

type CodePlaygroundProps = {
  title: string;
  description: string;
  code: string;
};

export function CodePlayground({ title, description, code }: CodePlaygroundProps) {
  const [source, setSource] = useState(code);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");

  const runCode = () => {
    setStatus("running");

    const logs: string[] = [];
    const consoleProxy = {
      log: (...args: unknown[]) => {
        logs.push(args.map(formatValue).join(" "));
      }
    };

    try {
      const runner = new Function("console", `${source}\nreturn null;`);
      runner(consoleProxy);
      setOutput(logs.join("\n") || "No output.");
      setStatus("done");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Unknown error");
      setStatus("error");
    }
  };

  const resetCode = () => {
    setSource(code);
    setOutput("");
    setStatus("idle");
  };

  return (
    <section className="code-playground">
      <div className="code-playground__header">
        <div>
          <p className="eyebrow">Run Code</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="code-playground__actions">
          <button className="ghost-button" onClick={resetCode} type="button">
            Reset
          </button>
          <button className="cta-button" onClick={runCode} type="button">
            {status === "running" ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      <label className="code-playground__label" htmlFor={title}>
        Editable JavaScript
      </label>
      <textarea
        className="code-playground__editor"
        id={title}
        onChange={(event) => setSource(event.target.value)}
        spellCheck={false}
        value={source}
      />

      <div className="code-playground__output">
        <div className="code-playground__output-header">
          <strong>Output</strong>
          <span className={`code-playground__status ${status}`}>{status === "idle" ? "Ready" : status}</span>
        </div>
        <pre>{output || "Click Run Code to see the prediction result."}</pre>
      </div>
    </section>
  );
}

function formatValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value, null, 2);
}
