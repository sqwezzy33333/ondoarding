const DATA = [
  {
    id: 5905,
    name: "Анимация номер 1",
    type: "animation",
    position: 1,
    answers: [],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "./animation/1.json",
    required: false,
    action: null,
  },
  {
    id: 5905,
    name: "Анимация номер 2",
    type: "animation",
    position: 1,
    answers: [],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "./animation/2.json",
    required: false,
    action: null,
  },
  {
    id: 5905,
    name: "Анимация номер 3",
    type: "animation",
    position: 1,
    answers: [],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "./animation/3.json",
    required: false,
    action: null,
  },
  {
    id: 5905,
    name: "Анимация номер 4",
    type: "animation",
    position: 1,
    answers: [],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "./animation/4.json",
    required: false,
    action: null,
  },
  {
    id: 5905,
    name: "<p>Категория продаваемых товаров</p>",
    type: "multiple_choice",
    position: 4,
    answers: [
      {
        id: 9102,
        name: "Одежда и обувь",
        type: "drop-down",
        action: null,
      },
      {
        id: 9103,
        name: "Красота и здоровье",
        type: "drop-down",
        action: null,
      },
      {
        id: 9104,
        name: "Аксессуары",
        type: "drop-down",
        action: null,
      },
      {
        id: 9105,
        name: "Бытовая техника",
        type: "drop-down",
        action: null,
      },
      {
        id: 9106,
        name: "Электроника",
        type: "drop-down",
        action: null,
      },
      {
        id: 9107,
        name: "Дом и сад",
        type: "drop-down",
        action: null,
      },
      {
        id: 9108,
        name: "Детские товары",
        type: "drop-down",
        action: null,
      },
      {
        id: 9109,
        name: "Товары для животных",
        type: "drop-down",
        action: null,
      },
      {
        id: 9110,
        name: "Спорт и отдых",
        type: "drop-down",
        action: null,
      },
      {
        id: 9111,
        name: "Хобби и творчество",
        type: "drop-down",
        action: null,
      },
      {
        id: 9112,
        name: "Строительство и ремонт",
        type: "drop-down",
        action: null,
      },
      {
        id: 9113,
        name: "Бытовая химия и гигиена",
        type: "drop-down",
        action: null,
      },
      {
        id: 9114,
        name: "B2B",
        type: "drop-down",
        action: null,
      },
    ],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "",
    required: false,
    action: null,
  },
  {
    id: 5907,
    name: "<p>​Кол-во артикулов<br></p>",
    type: "single_choice",
    position: 6,
    answers: [
      {
        id: 9115,
        name: "до 10",
        type: "object_chooser",
        action: null,
      },
      {
        id: 9116,
        name: "от 10 до 100",
        type: "object_chooser",
        action: null,
      },
      {
        id: 9117,
        name: "от 100 до 1000",
        type: "object_chooser",
        action: null,
      },
      {
        id: 9118,
        name: "от 1000 и более",
        type: "object_chooser",
        action: null,
      },
    ],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "",
    required: false,
    action: null,
  },
  {
    id: 5908,
    name: "<p>На каких площадках размещаете товары<br></p><p><br></p>",
    type: "multiple_choice",
    position: 7,
    answers: [
      {
        id: 9489,
        name: "Авито",
        type: "drop-down",
        action: null,
      },
      {
        id: 9490,
        name: "OZON",
        type: "drop-down",
        action: null,
      },
      {
        id: 9491,
        name: "WB",
        type: "drop-down",
        action: null,
      },
    ],
    questionnaireTemplate: {
      key: 5852,
      value: "Опрос для продавцов",
      additional: null,
    },
    additional: "",
    required: false,
    action: null,
  },
];

const title = "title";
const card = "card";
const description = "description";
const submitText = "Submit";
const animationElement = "lottie";

function init() {
  new CardController().start();
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
    this.drawCard(this.index);
  }

  drawCard(index) {
    const item = this.data[index];
    this.title.text(item.name, false);
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
    this.title.text("Завершено", false);
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

class Answer {
  static CLASS_NAME = "card answer__";
  data;
  value;
  container = h.fromId(card);
  parent;
  submitBtn = h.div("submit").cl("submit-btn").text(submitText, false);

  constructor(data, parent) {
    this.type = data.type;
    this.data = data;
    this.parent = parent;
    this.container.get().className = '';
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

    if (!_e(data.type, "single_choice")) {
      this.isMultiSelect = true;
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

    if (this.isMultiSelect) {
      this.submit();
    }
  }

  getIndexOfAnswer(el) {
    return Array.from(el.parent().childNodes()).indexOf(el.get());
  }

  getItemDiv(answer) {
    return h
      .div(Answer.CLASS_NAME + "choise-item")
      .text(answer.name, false)
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

    if (!this.isMultiSelect) {
      this.parent.submitCurrentCard();
    }
  };

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

const log = {
  trace() {},
};
