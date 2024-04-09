const title = "title";
const card = "card";
const animationElement = "lottie";
const SERVER_URL = "https://vote-api.dennis.systems/";
let PROGRESS = null;
let DATA = null;

function init() {
  getQuestions();
}

let ANSWERS_STATE = [];

class StorageAnswers {
  static ANSWERS_KEY = "onboard__answers__";
  static INDEX_KEY = "onboard__answer__index__";
  static ID_KEY = "onboard__answers__id__";

  static getAnswers() {
    return localStorage.getItem(StorageAnswers.ANSWERS_KEY);
  }

  static setId() {
    localStorage.setItem(StorageAnswers.ID_KEY, CardController.ID);
  }

  static getId() {
    return localStorage.getItem(StorageAnswers.ID_KEY);
  }

  static setIndex() {
    localStorage.setItem(StorageAnswers.INDEX_KEY, CardController.INDEX);
  }

  static getIndex() {
    return localStorage.getItem(StorageAnswers.INDEX_KEY);
  }

  static put() {
    localStorage.setItem(
      StorageAnswers.ANSWERS_KEY,
      JSON.stringify(ANSWERS_STATE)
    );
  }

  static clear() {
    localStorage.removeItem(StorageAnswers.ANSWERS_KEY);
    localStorage.removeItem(StorageAnswers.INDEX_KEY);
    localStorage.removeItem(StorageAnswers.ID_KEY);
  }
}

class CardController {
  static INDEX = StorageAnswers.getIndex();
  static ID = StorageAnswers.getId();
  static PRESET_ANSWERS = StorageAnswers.getAnswers();
  card = h.fromId(card);
  title = h.fromId(title);
  data = null;
  cardClass = null;
  progress = null;

  start() {
    this.data = [...DATA];
    this.presetValues();
    this.drawCard();
    this.backListener();
    this.toggleBackBtn();
    this.initProgress();
  }

  initProgress() {
    this.progress = new Progress(this.data, CardController.INDEX);
    PROGRESS = this.progress;
    this.progress.init();
  }

  toggleBackBtn() {
    if (CardController.INDEX === 0) {
      h.fromId("back-btn").hide();
    } else {
      h.fromId("back-btn").show();
    }
  }

  backListener() {
    h.fromId("back-btn").click(() => {
      if (CardController.INDEX - 1 < 0) {
        return;
      }
      CardController.INDEX--;
      this.clearCard();
      this.drawCard();
    });
  }

  presetValues() {
    const { INDEX, ID, PRESET_ANSWERS } = CardController;
    if (INDEX && ID && PRESET_ANSWERS) {
      ANSWERS_STATE = JSON.parse(PRESET_ANSWERS);
      CardController.INDEX = Number(StorageAnswers.getIndex());
      return;
    }
    CardController.INDEX = 0;
  }

  drawCard() {
    const item = this.data[CardController.INDEX];
    if (!item) {
      return;
    }
    this.drawClass = new CardFactory(item, this);
    this.toggleBackBtn();
    if (!this.progress) return;
    this.progress.change(CardController.INDEX);
  }

  createPayload() {
    return {
      answers: this.drawClass.data.answers,
      questionnaireTemplate: this.drawClass.data.questionnaireTemplate.key,
      question: this.drawClass.data.id,
    };
  }

  postAnswer() {
    const payload = this.createPayload();
    const index = ANSWERS_STATE.findIndex(
      (element) => element.question == payload.question
    );
    if (index !== -1) {
      ANSWERS_STATE[index] = payload;
    } else {
      ANSWERS_STATE.push(payload);
    }
    if (!CardController.ID) {
      this.postFirstAnswer();
      return;
    }
    this.postNewAnswer();
  }

  clearCard() {
    this.card.text(null);
    this.title.text(null);
  }

  changeCard() {
    this.clearCard();
    this.drawCard(++CardController.INDEX);
  }

  submitCurrentCard() {
    this.postAnswer(this.getRespondent);
  }

  end() {
    this.clearCard();
    this.title.text("global.success");
    StorageAnswers.clear();
  }

  postFirstAnswer() {
    const path =
      "https://vote-api.dennis.systems/api/v2/questionnaire/respondent_answer/vote";
    Executor.runPostWithPayload(
      path,
      (response) => {
        CardController.ID = response.r2q;
        this.successUpdate();
      },
      ANSWERS_STATE,
      () => {
        StorageAnswers.clear();
        location.reload();
      }
    );
  }

  successUpdate() {
    if (CardController.INDEX + 1 == this.data.length) {
      this.end();
      return;
    }
    this.changeCard();
    StorageAnswers.put();
    StorageAnswers.setId();
    StorageAnswers.setIndex();
  }

  postNewAnswer() {
    Executor.runPostWithPayload(
      "https://vote-api.dennis.systems/api/v2/questionnaire/respondent_answer/change/" +
        CardController.ID,
      () => {
        this.successUpdate();
      },
      ANSWERS_STATE,
      () => {
        StorageAnswers.clear();
        location.reload();
      }
    );
  }
}

class CardFactory {
  constructor(data, parent) {
    const item = structuredClone(data);
    if (data.type == "multiple_choice") {
      return new ChoiseAnswer(item, parent);
    }

    if (data.type == "single_choice") {
      return new ChoiseAnswer(item, parent);
    }

    if (data.type == "open") {
      return new AnimationCard(item, parent);
    }
  }
}

const NONE_BTN = "button.none";
const CONTINUE_BTN = "button.continue";
class Answer {
  static CLASS_NAME = "card answer__";
  data;
  value;
  container = h.fromId(card);
  parent;
  submitBtn = h.tag("button").cl("submit submit-btn").text(CONTINUE_BTN);

  constructor(data, parent) {
    this.type = data.type;
    this.data = data;
    this.parent = parent;
    this.container.get().className = "";
    this.container.cl(Answer.CLASS_NAME + data.type);
  }

  getContainer() {
    return this.container;
  }

  getValue() {
    return this.data;
  }

  setTitle() {
    this.parent.title.text(stripHtml(this.data.name));
  }

  transformDate() {
    var d = this.data;

    this.data = {
      question: d.id,
      questionnaireTemplate: d.questionnaireTemplate.key,
    };
  }

  submit() {
    this.submitBtn.appendTo(this.container).click(() => {
      this.parent.submitCurrentCard();
    });

    if (this.isMultiSelect) {
      this.submitBtn.text(NONE_BTN);
    }
  }
}
class AnimationCard extends Answer {
  static lottieClassName = "lottie-element";
  static configuration = {
    background: "transparent",
    speed: "1",
    direction: "1",
    playMode: "normal",
    loop: "true",
    autoplay: "true",
    id: "lottie",
  };
  path;

  constructor(data, parent) {
    super(data, parent);
    this.path = this.fullPath;
    this.presetClass();
    this.setTitle();
    this.createAnimationElement();
    this.submit();
  }

  getFullPath(path = this.data.additional) {
    return `./lottie/${path}/anim.json`;
  }

  presetClass() {
    const splitName = this.data.name.split(".");
    const className = splitName[splitName.length - 1];
    this.container.cl("animation__" + className);
  }

  createAnimationElement() {
    const wrapper = h.div("anim-wrapper").appendTo(this.container);
    const params = {
      container: wrapper.get(),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: this.getFullPath(),
    };
    if (this.data) {
      // if (this.data.additional == '3') {
      //   params.path = undefined;
      //   params.animationData = lottie2;
      // }
      if (this.data.additional == '3') {
        params.path = this.getFullPath('1');
      }
      if (this.data.additional == '4') {
        params.path = this.getFullPath('2');
      }
      if (this.data.additional == '5') {
        params.path = this.getFullPath('1');
      }

    }
    lottie.loadAnimation(params);
  }

  setTitle() {
    const clearTitle = stripHtml(this.data.name);
    this.parent.title.text(clearTitle);
    h.fromId("sub-title")
      .show()
      .text(clearTitle + "_title");
  }
}

class ChoiseAnswer extends Answer {
  static selectClass = "__selected-choise";
  static ADD_ANSWER = "pages.vote.another_answer";

  chooser = h.div(Answer.CLASS_NAME + "coise");
  answers = [];
  isMultiSelect = false;

  constructor(data, parent) {
    super(data, parent);
    this.answers = data.answers;

    this.init(data);
    this.data.answers = [];
    this.setTitle();
  }

  init(data) {
    h.fromId("sub-title").hide();
    if (!_e(data.type, "single_choice")) {
      this.isMultiSelect = true;
    } else {
      this.submitBtn.hide();
    }
    this.build();
  }

  build() {
    this.chooser.appendTo(this.container);

    if (this.answers.length) {
      _.each(this.answers, (answer) => {
        this.getItemDiv(answer).appendTo(this.chooser);
      });
    }

    this.submit();
  }

  submit() {
    this.submitBtn.appendTo(this.container).click(() => {
      this.parent.submitCurrentCard();
    });

    if (this.isMultiSelect) {
      this.submitBtn.text(NONE_BTN);
    }
  }

  getIndexOfAnswer(el) {
    return Array.from(el.parent().childNodes()).indexOf(el.get());
  }

  getItemDiv(answer) {
    return h
      .div(Answer.CLASS_NAME + "choise-item")
      .text(answer.name)
      .pointer()
      .click(this.itemClick);
  }

  putNewAnswerDiv = () => {
    if (this.anotherField.val()) {
      this.anotherField.cl(ChoiseAnswer.selectClass).click(this.itemClick);

      this.setValue();

      dom.editableDiv(this.anotherField, false);
    } else {
      this.anotherField.text(ChoiseAnswer.ADD_ANSWER);
      this.wasNewAnswerApply = false;
    }
  };

  itemClick = (element) => {
    h.from(element).toggle(ChoiseAnswer.selectClass);
    if (!this.isMultiSelect) {
      this.setValue();
      this.parent.submitCurrentCard();
      return;
    }
    this.setValue();
    this.changeBtnText();
    this.changeDisabledBtn();
  };

  changeDisabledBtn() {
    if (this.isMultiSelect) {
      return;
    }
    if (this.data.answers.length) {
      this.submitBtn.setA("disabled", null);
    } else {
      this.submitBtn.setA("disabled", true);
    }
  }

  changeBtnText() {
    if (!this.isMultiSelect) {
      return;
    }

    if (this.data.answers.length) {
      this.submitBtn.text(CONTINUE_BTN);
    } else {
      this.submitBtn.text(NONE_BTN);
    }
  }

  checkSelectedItems() {
    this.chooser.eachOf((div) => {
      h.from(div).rcl(ChoiseAnswer.selectClass);
    });
  }

  setValue() {
    let answers = [];

    this.chooser.eachOf((div) => {
      if (h.from(div).ccl(ChoiseAnswer.selectClass)) {
        var index = this.getIndexOfAnswer(h.from(div));
        var obj;

        if (this.answers[index]) {
          obj = {
            name: this.answers[index].id,
            type: this.answers[index].type,
          };
        } else {
          this.data.answerText = div.textContent;
        }

        if (obj) answers.push(obj);
      }
    });

    this.data.answers = [];
    this.data.answers = answers;
  }
}

class Node {
  static VISITED = "visited-node";
  static LAST_NODE_CLASS = "big-node";
  line;
  node;

  constructor(line, node) {
    this.line = line;
    this.node = node;
  }

  setVisited() {
    this.line.cl(Node.VISITED);
    this.node.cl(Node.VISITED);
  }

  removeVisited() {
    this.line.rcl(Node.VISITED);
    this.node.rcl(Node.VISITED);
  }

  getRect() {
    return this.node.getRect();
  }

  setLast() {
    this.node.cl(Node.LAST_NODE_CLASS);
  }
}

class Progress {
  static LINE = "progress-line-connection";
  static NODE = "progress-line-node";
  static CONTAINER = "progress-container";
  static PLANE = "plane-node";

  toNode = null;
  container = null;
  plane = null;

  state = [];

  constructor(data, presetIndex) {
    this.data = data;
    this.presetIndex = presetIndex;
  }

  init() {
    this.initPlane();
    this.createNodes();
    this.presetFlight();
  }

  initPlane() {
    this.plane = h.fromId(Progress.PLANE);
  }

  createNodes() {
    this.data.forEach((e, i) => {
      const node = h.div(Progress.NODE);
      const line = h.div(Progress.LINE);
      this.container = h.fromId(Progress.CONTAINER);
      this.container.add(line);
      this.container.add(node);
      this.state.push(new Node(line, node));
      if (i === this.data.length - 1) {
        node.cl(Node.LAST_NODE_CLASS);
      }
    });
  }

  presetFlight() {
    this.toNode = this.state[this.presetIndex];
    for (let i = 0; i < this.data.length; i++) {
      const node = this.state[i];
      if (i > this.presetIndex) {
        node.removeVisited();
      } else {
        node.setVisited();
      }

      if (i === this.data.length - 1) {
        node.setLast();
      }
    }
  }

  replace() {
    const childRect = this.toNode.getRect();
    const parentRect = this.container.getRect();
    const left = childRect.left - parentRect.left;
    this.plane.style().left(left);
  }

  change(index) {
    this.presetIndex = index;
    this.presetFlight();
    this.replace();
  }
}

function verifyResponse() {
  return true;
}

function getQuestions() {
  waitForElm("init-btn").then((elem) => {
    h.from(elem)
      .text("button.continue")
      .click(() => {
        h.fromId("initial-card").hide();
        h.fromId("container").show();
        if (PROGRESS) {
          PROGRESS.replace();
        }
      });
  });

  const PATH =
    "https://vote-api.dennis.systems/api/v2/questionnaire/question/template/9552";
  Executor.runGet(PATH, (data) => {
    DATA = data.content;
    MagicPage.translatePage();
    new CardController().start();
  });
}

function stripHtml(html) {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.getElementById(selector)) {
      return resolve(document.getElementById(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.getElementById(selector)) {
        observer.disconnect();
        resolve(document.getElementById(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
