class Environment {
  static scriptPath = "https://js.flaw.space/magic/";
}

const SCRIPTS = ["magic.executor.v2.js", "magic.html.v2.js", "magic.utils.v1.js"];

loadScripts();

function loadScripts() {
  SCRIPTS.forEach((path, index) => {
    const script = createScript(path);
    const lastIndex = SCRIPTS.length - 1;

    if (index == lastIndex) {
      script.onload = () => {
        init();
      };
    }
  });
}

function createScript(path) {
  const script = document.createElement("script");
  script.src = Environment.scriptPath + path;
  script.type = "text/javascript";
  document.head.append(script);
  return script;
}
