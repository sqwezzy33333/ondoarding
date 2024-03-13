let DATA = null;
const title = "title";
const card = "card";
const description = "description";
const animationElement = "lottie";

function init() {
  getQuestions();
}

class CardController {
  card = h.fromId(card);
  title = h.fromId(title);
  description = h.fromId(description);
  data = null;
  cardClass = null;
  index = 0;

  start() {
    this.data = DATA;
    console.log(DATA);
    this.drawCard(this.index);
  }

  drawCard(index) {
    const item = this.data[index];
    this.title.text(removeSubStr(item.name));
    this.drawClass = new CardFactory(item, this);
  }

  clearCard() {
    this.card.text(null);
    this.title.text(null);
    this.description.text(null);
  }

  submitCurrentCard() {
    this.clearCard();
    if (this.index + 1 == this.data.length) {
      this.end();
      return;
    }
    this.drawCard(++this.index);
  }

  end() {
    this.title.text("global.success");
  }
}

class CardFactory {
  constructor(data, parent) {
    if (data.type == "single_choice") {
      return new ChoiseAnswer(data, parent);
    }

    if (data.type == "multiple_choice") {
      return new ChoiseAnswer(data, parent);
    }

    if (data.type == "animation") {
      return new AnimationCard(data, parent);
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
  submitBtn = h
    .tag("button")
    .cl("submit submit-btn")
    .text(CONTINUE_BTN)
    .setA("disabled", true);

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
  animationElement = h
    .tag("dotlottie-player")
    .cl(AnimationCard.lottieClassName);

  constructor(data, parent) {
    super(data, parent);
    this.createAnimationElement();
    this.submit();
  }

  createAnimationElement() {
    this.animationElement.appendTo(this.container);
    Object.entries(AnimationCard.configuration).forEach(([key, value]) => {
      this.animationElement.setA(key, value);
    });
    this.animationElement.style().width(500).height(600);
    this.animationElement.setA("src", this.data.additional);
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
  }

  init(data) {
    if (!_e(data.type, "single_choice")) {
      this.isMultiSelect = true;
    }
    this.build();

    if (this.isMultiSelect) {
      this.submitBtn.get().removeAttribute("disabled");
      return;
    }
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
    this.changeBtn();
    this.changeBtnText();
  };

  changeBtn() {
    if (this.isMultiSelect) {
      return;
    }

    if (this.data.answers.length) {
      this.submitBtn.get().removeAttribute("disabled");
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

    this.id = "answer-checkbox" + this.index;
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
  h.fromId("init-btn").text("button.continue").click(() => {
    h.fromId("initial-card").hide()
    h.fromId("container").show();
  })
  const PATH =
    "https://vote-api.dennis.systems/api/v2/questionnaire/question/template/9552";
  Executor.runGet(PATH, (data) => {
    DATA = data.content;

    new CardController().start();
  });
}

function removeSubStr(str) {
  return str.replace("<p>", "").replace("</p>", "").replace("<br>", "");
}
