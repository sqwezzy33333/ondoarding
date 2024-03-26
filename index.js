const title = "title";
const card = "card";
const description = "description";
const animationElement = "lottie";
const SERVER_URL = "https://vote-api.dennis.systems/";
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
  description = h.fromId(description);
  data = null;
  cardClass = null;

  start() {
    this.data = [...DATA];
    this.presetValues();
    this.drawCard();
    this.backListener();
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
    this.drawClass = new CardFactory(item, this);
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
    this.description.text(null);
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
      ANSWERS_STATE
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
      ANSWERS_STATE
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
  static lottieClassName = "t=lottie-element";
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
  animationElement = h
    .tag("dotlottie-player")
    .cl(AnimationCard.lottieClassName);

  constructor(data, parent) {
    super(data, parent);
    this.path = data.additional;
    this.presetClass();
    this.setTitle();
    this.createAnimationElement();
    this.submit();
  }

  presetClass() {
    const splitName = this.data.name.split(".");
    const className = splitName[splitName.length - 1];
    this.container.cl("animation__" + className);
  }

  createAnimationElement() {
    this.animationElement.appendTo(this.container);
    Object.entries(AnimationCard.configuration).forEach(([key, value]) => {
      this.animationElement.setA(key, value);
    });
    this.animationElement.style().width(500).height(600);
    this.animationElement.setA("src", this.path);
  }

  setTitle() {
    this.parent.title.text(this.data.name);
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
    if (!_e(data.type, "single_choice")) {
      this.isMultiSelect = true;
    } else {
      this.submitBtn.setA("disabled", true);
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
    if (!this.isMultiSelect) {
      this.checkSelectedItems();
    }
    h.from(element).toggle(ChoiseAnswer.selectClass);
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

class CheckboxAnswer extends Answer {
  id;
  checkbox = h.input("checkbox").id("answer-checkbox");

  constructor(data, index) {
    super(data, index);

    this.id = "answer-checkbox" + CardController.INDEX;
    this.build();
  }

  build() {
    this.checkbox.id(this.id).appendTo(this.container);
    this.label = h.label(this.id).appendTo(this.container);

    this.data.answers = [
      {
        type: "checkbox",
        name: this.checkbox.checked(),
      },
    ];
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
