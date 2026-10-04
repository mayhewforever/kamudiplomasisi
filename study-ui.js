(function () {
  "use strict";

  var app = window.CourseApp;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function shuffled(items) {
    var copy = items.slice();
    for (var index = copy.length - 1; index > 0; index -= 1) {
      var random = Math.floor(Math.random() * (index + 1));
      var temporary = copy[index];
      copy[index] = copy[random];
      copy[random] = temporary;
    }
    return copy;
  }

  function studyFor(week) {
    var source = (window.COURSE_STUDY || {})[week] || {};
    return app.state.language === "en" && source.en ? source.en : source;
  }

  function lessonMarkup(study, week) {
    var sections = (study.sections || []).map(function (section, index) {
      var paragraphs = (section.paragraphs || []).map(function (paragraph) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      }).join("");
      return [
        "<details class=\"lesson-section\" id=\"week-" + week + "-section-" + (index + 1) + "\"" + (index === 0 ? " open" : "") + ">",
        "<summary><span class=\"lesson-index\">" + String(index + 1).padStart(2, "0") + "</span><span>" + escapeHtml(section.heading) + "</span><span class=\"lesson-toggle\" aria-hidden=\"true\">+</span></summary>",
        "<div class=\"lesson-copy\">" + paragraphs + "</div>",
        "</details>"
      ].join("");
    }).join("");
    var takeaways = (study.keyTakeaways || []).map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("");
    var questions = (study.discussionQuestions || []).map(function (item, index) {
      return "<li><span>" + String(index + 1).padStart(2, "0") + "</span><p>" + escapeHtml(item) + "</p></li>";
    }).join("");
    return [
      "<section class=\"study-panel lesson-panel\" id=\"week-" + week + "-lesson\" role=\"tabpanel\" aria-labelledby=\"week-" + week + "-lesson-tab\">",
      "<div class=\"lesson-intro\"><div><p class=\"study-kicker\">" + escapeHtml(app.t("week") + " " + week + " · " + app.t("lessonNarrative")) + "</p><h3>" + escapeHtml(study.lead || app.t("detailedTopic")) + "</h3></div><span class=\"study-time\">" + escapeHtml(app.t("readingTime")) + "</span></div>",
      "<div class=\"lesson-sections\">" + sections + "</div>",
      "<div class=\"learning-summary\"><article class=\"takeaway-box\"><p class=\"study-kicker\">" + escapeHtml(app.t("fiveTakeaways")) + "</p><ul>" + takeaways + "</ul></article><article class=\"discussion-box\"><p class=\"study-kicker\">" + escapeHtml(app.t("discussInClass")) + "</p><ol>" + questions + "</ol></article></div>",
      "</section>"
    ].join("");
  }

  function cardsMarkup(study, week) {
    var total = (study.flashcards || []).length;
    return [
      "<section class=\"study-panel cards-panel\" id=\"week-" + week + "-flashcards\" role=\"tabpanel\" aria-labelledby=\"week-" + week + "-flashcards-tab\" hidden>",
      "<div class=\"panel-heading-row\"><div><p class=\"study-kicker\">" + escapeHtml(app.t("activeRecall")) + "</p><h3>" + escapeHtml(app.t("flashcardHeading")) + "</h3></div><p>" + escapeHtml(app.t("flashcardInstruction")) + "</p></div>",
      "<div class=\"flashcard-stage\"><button class=\"flashcard\" type=\"button\" aria-pressed=\"false\"><span class=\"flashcard-inner\" aria-hidden=\"true\"><span class=\"flash-face flash-front\"><span class=\"flash-tag\"></span><strong></strong><small>" + escapeHtml(app.t("tapForAnswer")) + "</small></span><span class=\"flash-face flash-back\"><span class=\"flash-tag\">" + escapeHtml(app.t("answer")) + "</span><span class=\"flashcard-answer\"></span><small>" + escapeHtml(app.t("tapForQuestion")) + "</small></span></span></button></div>",
      "<div class=\"flashcard-controls\"><button class=\"previous-card\" type=\"button\">← " + escapeHtml(app.t("previousCard")) + "</button><span class=\"card-position\" aria-live=\"polite\"></span><button class=\"next-card\" type=\"button\">" + escapeHtml(app.t("nextCard")) + " →</button><button class=\"shuffle-cards\" type=\"button\">" + escapeHtml(app.t("shuffleCards")) + "</button></div>",
      "<div class=\"flash-progress\" aria-live=\"polite\"><div><strong data-flash-count>" + escapeHtml(app.t("cardsSeen", { seen: 0, total: total })) + "</strong><progress max=\"" + total + "\" value=\"0\"></progress></div><button class=\"reset-cards\" type=\"button\">" + escapeHtml(app.t("resetCards")) + "</button></div>",
      "</section>"
    ].join("");
  }

  function quizMarkup(study, week) {
    var letters = ["A", "B", "C", "D"];
    var quizzes = study.quiz || [];
    var questions = quizzes.map(function (quiz, questionIndex) {
      var options = (quiz.options || []).map(function (option, optionIndex) {
        return "<label class=\"quiz-option\" data-option=\"" + optionIndex + "\"><input type=\"radio\" name=\"week-" + week + "-question-" + questionIndex + "\" value=\"" + optionIndex + "\"><span class=\"option-letter\" aria-hidden=\"true\">" + letters[optionIndex] + "</span><span>" + escapeHtml(option) + "</span></label>";
      }).join("");
      return [
        "<fieldset class=\"quiz-question\" data-question=\"" + questionIndex + "\"" + (questionIndex === 0 ? "" : " hidden") + ">",
        "<legend><span>" + String(questionIndex + 1).padStart(2, "0") + "</span>" + escapeHtml(quiz.question) + "</legend>",
        "<div class=\"quiz-options\">" + options + "</div>",
        "<p class=\"quiz-explanation\" hidden><strong>" + escapeHtml(app.t("correctAnswer") + " " + (quiz.options[quiz.answerIndex] || "")) + "</strong><span>" + escapeHtml(quiz.explanation) + "</span></p>",
        "</fieldset>"
      ].join("");
    }).join("");
    return [
      "<section class=\"study-panel quiz-panel\" id=\"week-" + week + "-quiz\" role=\"tabpanel\" aria-labelledby=\"week-" + week + "-quiz-tab\" hidden>",
      "<div class=\"panel-heading-row\"><div><p class=\"study-kicker\">" + escapeHtml(app.t("selfCheck")) + "</p><h3>" + escapeHtml(app.t("quizHeading")) + "</h3></div><p>" + escapeHtml(app.t("quizInstruction")) + "</p></div>",
      "<form class=\"quiz-form\" data-week=\"" + week + "\">" + questions,
      "<div class=\"quiz-navigation\"><button class=\"previous-question\" type=\"button\">← " + escapeHtml(app.t("previousQuestion")) + "</button><strong class=\"question-progress\"></strong><button class=\"next-question\" type=\"button\">" + escapeHtml(app.t("nextQuestion")) + " →</button></div>",
      "<div class=\"quiz-actions\"><button class=\"check-question\" type=\"button\">" + escapeHtml(app.t("checkAnswers")) + "</button><button class=\"reset-quiz\" type=\"reset\">" + escapeHtml(app.t("solveAgain")) + "</button><p class=\"quiz-result\" tabindex=\"-1\" aria-live=\"polite\"></p></div>",
      "</form></section>"
    ].join("");
  }

  function gameMarkup(study, week) {
    var pairs = (study.flashcards || []).slice(0, 4).map(function (card, index) { return { pair: index, term: card.front, definition: card.back }; });
    var gameState = app.state.games[String(week)] || {};
    var order = Array.isArray(gameState.order) && gameState.order.length === pairs.length ? gameState.order : shuffled(pairs.map(function (pair) { return pair.pair; }));
    gameState.order = order;
    app.state.games[String(week)] = gameState;
    var terms = pairs.map(function (pair) { return "<button class=\"match-item match-term\" type=\"button\" data-pair=\"" + pair.pair + "\" aria-pressed=\"false\">" + escapeHtml(pair.term) + "</button>"; }).join("");
    var definitions = order.map(function (pairIndex) {
      var pair = pairs[pairIndex];
      return "<button class=\"match-item match-definition\" type=\"button\" data-pair=\"" + pair.pair + "\" aria-pressed=\"false\">" + escapeHtml(pair.definition) + "</button>";
    }).join("");
    return [
      "<section class=\"study-panel game-panel\" id=\"week-" + week + "-game\" role=\"tabpanel\" aria-labelledby=\"week-" + week + "-game-tab\" hidden>",
      "<div class=\"panel-heading-row\"><div><p class=\"study-kicker\">" + escapeHtml(app.t("weeklyGame")) + "</p><h3>" + escapeHtml(app.t("matchingGame")) + "</h3></div><p>" + escapeHtml(app.t("matchingInstruction")) + "</p></div>",
      "<div class=\"match-board\"><div class=\"match-column\" role=\"group\" aria-label=\"" + escapeHtml(app.t("concepts")) + "\"><h4>" + escapeHtml(app.t("concepts")) + "</h4>" + terms + "</div><div class=\"match-column definitions\" role=\"group\" aria-label=\"" + escapeHtml(app.t("mixedDefinitions")) + "\"><h4>" + escapeHtml(app.t("mixedDefinitions")) + "</h4>" + definitions + "</div></div>",
      "<div class=\"game-status-row\"><p class=\"game-status\" tabindex=\"-1\" aria-live=\"polite\"></p><button class=\"reset-game\" type=\"button\">" + escapeHtml(app.t("restartGame")) + "</button></div>",
      "</section>"
    ].join("");
  }

  function tabMarkup(week) {
    return [
      "<div class=\"study-tabs\" role=\"tablist\" aria-label=\"" + escapeHtml(app.t("tabListLabel", { week: week })) + "\">",
      "<button type=\"button\" role=\"tab\" id=\"week-" + week + "-lesson-tab\" aria-controls=\"week-" + week + "-lesson\" aria-selected=\"false\" data-panel=\"lesson\"><span aria-hidden=\"true\">01</span>" + escapeHtml(app.t("lessonTab")) + "</button>",
      "<button type=\"button\" role=\"tab\" id=\"week-" + week + "-flashcards-tab\" aria-controls=\"week-" + week + "-flashcards\" aria-selected=\"false\" tabindex=\"-1\" data-panel=\"flashcards\"><span aria-hidden=\"true\">02</span>" + escapeHtml(app.t("flashcardsTab")) + "</button>",
      "<button type=\"button\" role=\"tab\" id=\"week-" + week + "-quiz-tab\" aria-controls=\"week-" + week + "-quiz\" aria-selected=\"false\" tabindex=\"-1\" data-panel=\"quiz\"><span aria-hidden=\"true\">03</span>" + escapeHtml(app.t("quizTab")) + "</button>",
      "<button type=\"button\" role=\"tab\" id=\"week-" + week + "-game-tab\" aria-controls=\"week-" + week + "-game\" aria-selected=\"false\" tabindex=\"-1\" data-panel=\"game\"><span aria-hidden=\"true\">04</span>" + escapeHtml(app.t("gameTab")) + "</button>",
      "<button type=\"button\" role=\"tab\" id=\"week-" + week + "-resources-tab\" aria-controls=\"week-" + week + "-resources\" aria-selected=\"false\" tabindex=\"-1\" data-panel=\"resources\"><span aria-hidden=\"true\">05</span>" + escapeHtml(app.t("resourcesTab")) + "</button>",
      "</div>"
    ].join("");
  }

  function activateTab(workspace, targetButton, moveFocus, updateLocation) {
    if (!workspace || !targetButton) return;
    var buttons = Array.from(workspace.querySelectorAll('[role="tab"]'));
    var panels = Array.from(workspace.querySelectorAll('[role="tabpanel"]'));
    buttons.forEach(function (button) {
      var selected = button === targetButton;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) { panel.hidden = panel.id !== targetButton.getAttribute("aria-controls"); });
    var week = Number(workspace.dataset.week);
    var tab = targetButton.dataset.panel;
    app.state.activeTabs[String(week)] = tab;
    if (updateLocation) app.setView(week, tab, { push: true });
    else app.persist();
    if (moveFocus) targetButton.focus();
  }

  function bindTabs(workspace) {
    var tablist = workspace.querySelector('[role="tablist"]');
    var buttons = Array.from(tablist.querySelectorAll('[role="tab"]'));
    tablist.addEventListener("click", function (event) {
      var button = event.target.closest('[role="tab"]');
      if (button) activateTab(workspace, button, false, true);
    });
    tablist.addEventListener("keydown", function (event) {
      var current = event.target.closest('[role="tab"]');
      if (!current) return;
      var index = buttons.indexOf(current);
      var nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex !== index) {
        event.preventDefault();
        activateTab(workspace, buttons[nextIndex], true, true);
      }
    });
    var selected = app.state.activeTabs[String(workspace.dataset.week)] || "lesson";
    activateTab(workspace, workspace.querySelector('[data-panel="' + selected + '"]') || buttons[0], false, false);
  }

  function bindFlashcards(workspace, study, week) {
    var panel = workspace.querySelector(".cards-panel");
    var cards = study.flashcards || [];
    if (!panel || !cards.length) return;
    var key = String(week);
    var saved = app.state.flashcards[key] || {};
    if (!Array.isArray(saved.order) || saved.order.length !== cards.length) saved.order = cards.map(function (_card, index) { return index; });
    saved.current = Math.min(Math.max(Number(saved.current) || 0, 0), cards.length - 1);
    saved.seen = Array.isArray(saved.seen) ? saved.seen.filter(function (index) { return index >= 0 && index < cards.length; }) : [];
    saved.flipped = Boolean(saved.flipped);
    app.state.flashcards[key] = saved;

    var button = panel.querySelector(".flashcard");
    var tag = panel.querySelector(".flash-front .flash-tag");
    var question = panel.querySelector(".flash-front strong");
    var answer = panel.querySelector(".flashcard-answer");
    var position = panel.querySelector(".card-position");
    var count = panel.querySelector("[data-flash-count]");
    var progress = panel.querySelector("progress");

    function renderCard() {
      var cardIndex = saved.order[saved.current];
      var card = cards[cardIndex];
      tag.textContent = card.tag;
      question.textContent = card.front;
      answer.textContent = card.back;
      button.classList.toggle("is-flipped", saved.flipped);
      button.setAttribute("aria-pressed", String(saved.flipped));
      button.setAttribute("aria-label", saved.flipped ? app.t("answer") + ": " + card.back + ". " + app.t("tapForQuestion") : card.front + ". " + app.t("tapForAnswer"));
      position.textContent = (saved.current + 1) + " / " + cards.length;
      count.textContent = app.t("cardsSeen", { seen: saved.seen.length, total: cards.length });
      progress.value = saved.seen.length;
      app.persist();
    }

    button.addEventListener("click", function () {
      saved.flipped = !saved.flipped;
      var cardIndex = saved.order[saved.current];
      if (saved.flipped && saved.seen.indexOf(cardIndex) < 0) saved.seen.push(cardIndex);
      renderCard();
    });
    panel.querySelector(".previous-card").addEventListener("click", function () { saved.current = (saved.current - 1 + cards.length) % cards.length; saved.flipped = false; renderCard(); button.focus(); });
    panel.querySelector(".next-card").addEventListener("click", function () { saved.current = (saved.current + 1) % cards.length; saved.flipped = false; renderCard(); button.focus(); });
    panel.querySelector(".shuffle-cards").addEventListener("click", function () { saved.order = shuffled(saved.order); saved.current = 0; saved.flipped = false; renderCard(); button.focus(); });
    panel.querySelector(".reset-cards").addEventListener("click", function () { saved.order = cards.map(function (_card, index) { return index; }); saved.current = 0; saved.seen = []; saved.flipped = false; renderCard(); button.focus(); });
    renderCard();
  }

  function bindQuiz(workspace, study, week) {
    var form = workspace.querySelector(".quiz-form");
    var quizzes = study.quiz || [];
    if (!form || !quizzes.length) return;
    var key = String(week);
    var saved = app.state.quizzes[key] || {};
    saved.answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
    saved.checked = Array.isArray(saved.checked) ? saved.checked : [];
    saved.current = Math.min(Math.max(Number(saved.current) || 0, 0), quizzes.length - 1);
    app.state.quizzes[key] = saved;
    var result = form.querySelector(".quiz-result");

    function renderQuestion() {
      form.querySelectorAll(".quiz-question").forEach(function (fieldset, index) {
        fieldset.hidden = index !== saved.current;
        var answerValue = saved.answers[String(index)];
        fieldset.querySelectorAll('input[type="radio"]').forEach(function (input) { input.checked = String(input.value) === String(answerValue); });
        var wasChecked = saved.checked.indexOf(index) >= 0;
        fieldset.querySelectorAll(".quiz-option").forEach(function (option) {
          option.classList.remove("is-correct", "is-incorrect");
          if (wasChecked && Number(option.dataset.option) === quizzes[index].answerIndex) option.classList.add("is-correct");
          if (wasChecked && String(option.dataset.option) === String(answerValue) && Number(answerValue) !== quizzes[index].answerIndex) option.classList.add("is-incorrect");
        });
        fieldset.querySelector(".quiz-explanation").hidden = !wasChecked;
      });
      form.querySelector(".question-progress").textContent = app.t("questionProgress", { current: saved.current + 1, total: quizzes.length });
      form.querySelector(".previous-question").disabled = saved.current === 0;
      form.querySelector(".next-question").disabled = saved.current === quizzes.length - 1;
      var correct = quizzes.filter(function (quiz, index) { return saved.checked.indexOf(index) >= 0 && Number(saved.answers[String(index)]) === quiz.answerIndex; }).length;
      if (saved.checked.length === quizzes.length) {
        result.textContent = app.t("completeResult", { total: quizzes.length, correct: correct });
        result.classList.add("is-visible");
        if (saved.reported !== correct + "/" + quizzes.length) {
          saved.reported = correct + "/" + quizzes.length;
          document.dispatchEvent(new CustomEvent("course:quiz-result", { detail: { week: week, correct: correct, total: quizzes.length } }));
        }
      } else {
        result.textContent = "";
        result.classList.remove("is-visible");
      }
      app.persist();
    }

    form.addEventListener("change", function (event) {
      if (!event.target.matches('input[type="radio"]')) return;
      saved.answers[String(saved.current)] = Number(event.target.value);
      var checkedIndex = saved.checked.indexOf(saved.current);
      if (checkedIndex >= 0) {
        saved.checked.splice(checkedIndex, 1);
        renderQuestion();
      } else {
        app.persist();
      }
    });
    form.querySelector(".check-question").addEventListener("click", function () {
      var value = saved.answers[String(saved.current)];
      if (value == null) {
        result.textContent = app.t("selectAnswer");
        result.classList.add("is-visible");
        result.focus();
        return;
      }
      if (saved.checked.indexOf(saved.current) < 0) saved.checked.push(saved.current);
      renderQuestion();
      if (saved.checked.length < quizzes.length) {
        result.textContent = Number(value) === quizzes[saved.current].answerIndex ? app.t("correctFeedback") : app.t("incorrectFeedback");
        result.classList.add("is-visible");
      }
      result.focus();
    });
    form.querySelector(".previous-question").addEventListener("click", function () { saved.current -= 1; renderQuestion(); });
    form.querySelector(".next-question").addEventListener("click", function () { saved.current += 1; renderQuestion(); });
    form.addEventListener("reset", function () {
      window.setTimeout(function () { saved.answers = {}; saved.checked = []; saved.current = 0; saved.reported = ""; renderQuestion(); }, 0);
    });
    renderQuestion();
  }

  function bindGame(workspace, week) {
    var panel = workspace.querySelector(".game-panel");
    if (!panel) return;
    var key = String(week);
    var saved = app.state.games[key] || { matched: [], attempts: 0 };
    saved.matched = Array.isArray(saved.matched) ? saved.matched : [];
    saved.attempts = Number(saved.attempts) || 0;
    app.state.games[key] = saved;
    var status = panel.querySelector(".game-status");
    var total = panel.querySelectorAll(".match-term").length;

    function selectedItem(selector) { return panel.querySelector(selector + ".is-selected"); }
    function clearSelections() {
      panel.querySelectorAll(".match-item.is-selected").forEach(function (item) { item.classList.remove("is-selected"); item.setAttribute("aria-pressed", "false"); });
    }
    function updateStatus(message) {
      status.textContent = message || app.t("gameStatus", { matches: saved.matched.length, total: total, attempts: saved.attempts });
      status.classList.toggle("is-complete", saved.matched.length === total);
      app.persist();
    }
    function restoreMatches() {
      panel.querySelectorAll(".match-item").forEach(function (item) {
        var matched = saved.matched.indexOf(Number(item.dataset.pair)) >= 0;
        item.disabled = matched;
        item.classList.toggle("is-matched", matched);
      });
      updateStatus();
    }

    panel.querySelector(".match-board").addEventListener("click", function (event) {
      var item = event.target.closest(".match-item");
      if (!item || item.disabled || panel.dataset.locked === "true") return;
      var typeSelector = item.classList.contains("match-term") ? ".match-term" : ".match-definition";
      panel.querySelectorAll(typeSelector + ".is-selected").forEach(function (other) { other.classList.remove("is-selected"); other.setAttribute("aria-pressed", "false"); });
      item.classList.add("is-selected");
      item.setAttribute("aria-pressed", "true");
      var term = selectedItem(".match-term");
      var definition = selectedItem(".match-definition");
      if (!term || !definition) return;
      saved.attempts += 1;
      if (term.dataset.pair === definition.dataset.pair) {
        var pair = Number(term.dataset.pair);
        if (saved.matched.indexOf(pair) < 0) saved.matched.push(pair);
        [term, definition].forEach(function (matched) { matched.classList.remove("is-selected"); matched.classList.add("is-matched"); matched.setAttribute("aria-pressed", "false"); matched.disabled = true; });
        updateStatus(saved.matched.length === total ? app.t("gameComplete", { attempts: saved.attempts }) : app.t("correctMatch", { matches: saved.matched.length, total: total, attempts: saved.attempts }));
        var nextTerm = panel.querySelector(".match-term:not(:disabled)");
        if (nextTerm) nextTerm.focus(); else status.focus();
      } else {
        panel.dataset.locked = "true";
        term.classList.add("is-wrong");
        definition.classList.add("is-wrong");
        updateStatus(app.t("wrongMatch", { matches: saved.matched.length, total: total, attempts: saved.attempts }));
        var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.setTimeout(function () { term.classList.remove("is-wrong"); definition.classList.remove("is-wrong"); clearSelections(); panel.dataset.locked = "false"; term.focus(); }, reduced ? 0 : 520);
      }
    });

    panel.querySelector(".reset-game").addEventListener("click", function () {
      saved.matched = [];
      saved.attempts = 0;
      saved.order = shuffled(Array.from({ length: total }, function (_value, index) { return index; }));
      panel.dataset.locked = "false";
      panel.querySelectorAll(".match-item").forEach(function (item) { item.disabled = false; item.classList.remove("is-selected", "is-matched", "is-wrong"); item.setAttribute("aria-pressed", "false"); });
      var column = panel.querySelector(".match-column.definitions");
      saved.order.forEach(function (pair) { var item = column.querySelector('[data-pair="' + pair + '"]'); if (item) column.appendChild(item); });
      updateStatus();
      panel.querySelector(".match-term").focus();
    });
    restoreMatches();
  }

  function enhanceCard(card) {
    if (!card || card.dataset.enhanced === "true") return;
    var week = Number(card.dataset.week);
    var study = studyFor(week);
    var originalBody = card.querySelector(":scope > .week-body");
    if (!study || !originalBody) return;
    var workspace = document.createElement("div");
    workspace.className = "study-workspace";
    workspace.dataset.week = String(week);
    workspace.innerHTML = tabMarkup(week) + lessonMarkup(study, week) + cardsMarkup(study, week) + quizMarkup(study, week) + gameMarkup(study, week);
    originalBody.id = "week-" + week + "-resources";
    originalBody.classList.add("study-panel", "resources-panel");
    originalBody.setAttribute("role", "tabpanel");
    originalBody.setAttribute("aria-labelledby", "week-" + week + "-resources-tab");
    originalBody.hidden = true;
    workspace.appendChild(originalBody);
    card.appendChild(workspace);
    card.dataset.enhanced = "true";
    bindTabs(workspace);
    bindFlashcards(workspace, study, week);
    bindQuiz(workspace, study, week);
    bindGame(workspace, week);
  }

  function enhanceAll() {
    document.querySelectorAll(".week-card").forEach(enhanceCard);
  }

  function activateWeekTab(week, tab) {
    var workspace = document.querySelector('.study-workspace[data-week="' + Number(week) + '"]');
    if (!workspace) return;
    var button = workspace.querySelector('[data-panel="' + tab + '"]') || workspace.querySelector('[data-panel="lesson"]');
    activateTab(workspace, button, false, false);
  }

  window.CourseStudyUI = { enhanceAll: enhanceAll, activateWeekTab: activateWeekTab };
  enhanceAll();
})();
