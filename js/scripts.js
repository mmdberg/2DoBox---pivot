$('.save-button').on('click', makeIdea);
$('.idea-title').on('keyup', buttonDisable)
$('.idea-description').on('keyup', buttonDisable)
$('.search-field').on('keyup', search);
$('#idea-list').on('click', 'h2', editContentTitle);
$("#idea-list").on("keyup", "h2", enterKey);
$('#idea-list').on('click', 'p', editContentBody);
$('#idea-list').on('keyup', 'p', enterKey);
$('#idea-list').on('click', '.remove', removeIdea);
$('#idea-list').on('click', '#quality-up', upQuality);
$('#idea-list').on('click', '#quality-down', downQuality);
$('#idea-list').on('click', '#importance-up', upImportance);
$('#idea-list').on('click', '#importance-down', downImportance);

$(document).ready(pageLoad);
$('.save-button').prop('disabled', true)

function pageLoad() {
  Object.keys(localStorage).forEach(function (value) {
    prependIdea(JSON.parse(localStorage.getItem(value)));
  });
};

function makeIdea(event) {
  var idea = new Idea(Date.now(), $('.idea-title').val(), $('.idea-description').val(), 'Swill', 0, 'Normal', 2);
  event.preventDefault();
  prependIdea(idea);
  toLocalStorage(idea.id, idea);
  inputReset();
  $('.save-button').prop('disabled', true);
};

function Idea(id, title, body, quality, qualityCount, importance, importanceCount) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.qualityCount = qualityCount || 0;
  this.importance = importance;
  this.importanceCount = importanceCount || 0;
}

function prependIdea(idea) {
  $('#idea-list').prepend(
    `<article id="${idea.id}">
      <h2 contenteditable="true">${idea.title}</h2>
      <button class="remove button"></button>
      <p class="idea-body" contenteditable="true">${idea.body}</p>
      <button class="vote-up arrow button" id="quality-up"></button>
      <button class="vote-down arrow button" id="quality-down"></button>
      <p class="vote-label">quality: <span id="quality">${idea.quality}</span></p>
      <button class="vote-up arrow button" id="importance-up"></button>
      <button class="vote-down arrow button" id="importance-down"></button>
      <p class="vote-label">importance: <span id="importance">${idea.importance}</span></p>
    </article>`
  );
};

function toLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function search() {
  var searchRequest = $('.search-field').val();
  $('article').each(function () {
    var searchResult = $(this).text().indexOf(searchRequest);
    this.style.display = searchResult > -1 ? "" : "none";
  })
};

function inputReset() {
  $('.idea-title').val('');
  $('.idea-description').val('');
  $('.idea-title').focus();
};

function buttonDisable() {
  if (($('.idea-title').val() == "" || $('.idea-description').val() == "")) {
    $('.save-button').prop('disabled', true)
  } else {
    $('.save-button').prop('disabled', false)
  }
}

function editContentTitle() {
  $(this).focusout(function () {
    var key = $(this).closest('article').attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(key));
    parsedIdea['title'] = $(this).html();
    toLocalStorage(key, parsedIdea);
  })
};

function editContentBody() {
  $(this).focusout(function () {
    var key = $(this).closest('article').attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(key));
    parsedIdea['body'] = $(this).html();
    toLocalStorage(key, parsedIdea);
  })
};

function enterKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
}

function removeIdea() {
  var article = $(this).closest('article');
  article.fadeOut(function () {
    $(this).remove();
  })
  localStorage.removeItem(article.attr('id'));
};

function upQuality() {
  var article = $(this).closest('article');
  var key = $(this).closest('article').attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(key));
  if (parsedIdea.qualityCount < 2) {
    increaseQuality(parsedIdea, article)
  }
  localStorage.setItem(key, JSON.stringify(parsedIdea));
  toLocalStorage(key, parsedIdea);
};

function downQuality() {
  var article = $(this).closest('article');
  var key = $(this).closest('article').attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(key));
  if (parsedIdea.qualityCount > 0) {
    decreaseQuality(parsedIdea, article)
  }
  toLocalStorage(key, parsedIdea);
};

var arrayQuality = ["Swill", "Plausible", "Genius"];

function increaseQuality(parse, article) {
  parse.qualityCount++;
  parse.quality = arrayQuality[parse.qualityCount];
  article.find('#quality').text(arrayQuality[parse.qualityCount]);
}

function decreaseQuality(parse, article) {
  parse.qualityCount--;
  parse.quality = arrayQuality[parse.qualityCount];
  article.find('#quality').text(arrayQuality[parse.qualityCount]);
}


function upImportance() {
  var article = $(this).closest('article');
  var key = $(this).closest('article').attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(key));
  if (parsedIdea.importanceCount < 4) {
    increaseImportance(parsedIdea, article)
  }
  localStorage.setItem(key, JSON.stringify(parsedIdea));
  toLocalStorage(key, parsedIdea);
};

function downImportance() {
  var article = $(this).closest('article');
  var key = $(this).closest('article').attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(key));
  if (parsedIdea.importanceCount > 0) {
    decreaseImportance(parsedIdea, article)
  }
  toLocalStorage(key, parsedIdea);
};

var arrayImportance = ["None", "Low", "Normal", "High", "Critical"];

function increaseImportance(parse, article) {
  parse.importanceCount++;
  parse.importance = arrayImportance[parse.importanceCount];
  article.find('#importance').text(arrayImportance[parse.importanceCount]);
}

function decreaseImportance(parse, article) {
  parse.importanceCount--;
  parse.importance = arrayImportance[parse.importanceCount];
  article.find('#importance').text(arrayImportance[parse.importanceCount]);
}