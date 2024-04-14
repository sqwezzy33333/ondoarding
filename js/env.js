class Environment {
  static scriptPath = "https://js.dennis.systems/magic/";
  static self = "self";
  static version = 1;
}

const SCRIPTS = [
  "magic.executor.v2.js",
  "magic.html.v2.js",
  "magic.utils.v1.js",
  "magic.page.v1.js",
  "magic.cache.v1.js",
  "magic.dom.v2.js"
];

setLanguage();
loadScripts();

function setLanguage() {
  const KEY = "____user_lang___";
  const LANG = navigator.language || navigator.userLanguage;
  localStorage.setItem(
    Environment.self + "_" + Environment.version + KEY, "en-EN"
  );
}

function loadScripts() {
  let scriptLoaded = 0;
  SCRIPTS.forEach((path) => {
    const script = createScript(path);

    script.onload = () => {
      scriptLoaded++;

      if (scriptLoaded == SCRIPTS.length) {
        init();
      }
    };
  });
}

function createScript(path) {
  const script = document.createElement("script");
  script.async = true;
  script.src = Environment.scriptPath + path;
  script.type = "text/javascript";
  document.head.prepend(script);
  return script;
}
