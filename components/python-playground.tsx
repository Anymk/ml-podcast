"use client";

import { useEffect, useMemo, useState } from "react";

type PythonPlaygroundProps = {
  title: string;
  description: string;
  code: string;
};

type PyodideWindow = Window & {
  loadPyodide?: (options?: { indexURL?: string }) => Promise<PyodideInstance>;
  __mlPodcastPyodide?: Promise<PyodideInstance>;
};

type PyodideInstance = {
  globals: {
    set: (name: string, value: unknown) => void;
    delete: (name: string) => void;
  };
  runPythonAsync: (code: string) => Promise<string>;
};

const PYODIDE_SCRIPT_ID = "pyodide-cdn-script";
const PYODIDE_INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/";

export function PythonPlayground({ title, description, code }: PythonPlaygroundProps) {
  const [source, setSource] = useState(code);
  const [output, setOutput] = useState("");
  const [runtimeStatus, setRuntimeStatus] = useState<"loading" | "ready" | "error">("loading");
  const [runStatus, setRunStatus] = useState<"idle" | "running" | "done" | "error">("idle");

  const editorId = useMemo(() => title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), [title]);

  useEffect(() => {
    let cancelled = false;

    loadPyodideRuntime()
      .then(() => {
        if (!cancelled) {
          setRuntimeStatus("ready");
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setRuntimeStatus("error");
          setOutput(error instanceof Error ? error.message : "Failed to load Python runtime.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const runCode = async () => {
    setRunStatus("running");

    try {
      const pyodide = await loadPyodideRuntime();
      pyodide.globals.set("user_code", source);

      const result = await pyodide.runPythonAsync(`
import contextlib
import io

_buffer = io.StringIO()
_scope = {}

with contextlib.redirect_stdout(_buffer):
    exec(user_code, _scope)

_buffer.getvalue()
      `);

      pyodide.globals.delete("user_code");
      setOutput(result || "No output.");
      setRunStatus("done");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Python execution failed.");
      setRunStatus("error");
    }
  };

  const resetCode = () => {
    setSource(code);
    setOutput("");
    setRunStatus("idle");
  };

  return (
    <section className="code-playground">
      <div className="code-playground__header">
        <div>
          <p className="eyebrow">Python Lab</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="code-playground__actions">
          <button className="ghost-button" onClick={resetCode} type="button">
            Reset
          </button>
          <button
            className="cta-button"
            disabled={runtimeStatus !== "ready" || runStatus === "running"}
            onClick={() => {
              void runCode();
            }}
            type="button"
          >
            {runtimeStatus === "loading" ? "Loading Python..." : runStatus === "running" ? "Running..." : "Run Python"}
          </button>
        </div>
      </div>

      <label className="code-playground__label" htmlFor={editorId}>
        Editable Python
      </label>
      <textarea
        className="code-playground__editor"
        id={editorId}
        onChange={(event) => setSource(event.target.value)}
        spellCheck={false}
        value={source}
      />

      <div className="code-playground__output">
        <div className="code-playground__output-header">
          <strong>Output</strong>
          <span className={`code-playground__status ${runStatus === "idle" ? runtimeStatus : runStatus}`}>
            {runtimeStatus === "loading"
              ? "loading"
              : runtimeStatus === "error"
                ? "runtime error"
                : runStatus === "idle"
                  ? "ready"
                  : runStatus}
          </span>
        </div>
        <pre>{output || "Click Run Python to see the prediction result."}</pre>
      </div>
    </section>
  );
}

async function loadPyodideRuntime() {
  if (typeof window === "undefined") {
    throw new Error("Python runtime is only available in the browser.");
  }

  const runtimeWindow = window as PyodideWindow;

  if (!runtimeWindow.__mlPodcastPyodide) {
    runtimeWindow.__mlPodcastPyodide = (async () => {
      await ensurePyodideScript(runtimeWindow);

      if (!runtimeWindow.loadPyodide) {
        throw new Error("Pyodide loader is not available.");
      }

      return runtimeWindow.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
    })();
  }

  return runtimeWindow.__mlPodcastPyodide;
}

function ensurePyodideScript(runtimeWindow: PyodideWindow) {
  if (runtimeWindow.loadPyodide) {
    return Promise.resolve();
  }

  const existing = document.getElementById(PYODIDE_SCRIPT_ID) as HTMLScriptElement | null;

  if (existing?.dataset.loaded === "true") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = existing ?? document.createElement("script");

    script.id = PYODIDE_SCRIPT_ID;
    script.src = `${PYODIDE_INDEX_URL}pyodide.js`;
    script.async = true;

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Unable to load Pyodide from CDN."));
    };

    if (!existing) {
      document.head.appendChild(script);
    }
  });
}
