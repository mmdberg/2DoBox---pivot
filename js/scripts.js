$('.save-button').on('click', makeIdea);
$('.idea-title').on('keyup', buttonDisable)
$('.idea-description').on('keyup', buttonDisable)
$('.search-field').on('keyup', search);
$('#critical').on('click', filterCritical);
$('#high').on('click', filterHigh);
$('#normal').on('click', filterNormal);
$('#low').on('click', filterLow);
$('#none').on('click', filterNone);
$('#idea-list').on('click', 'h2', editContentTitle);
$("#idea-list").on("keyup", "h2", enterKey);
$('#idea-list').on('click', 'p', editContentBody);
$('#idea-list').on('keyup', 'p', enterKey);
$('#idea-list').on('click', '.remove', removeIdea);
$('#idea-list').on('click', '#quality-up', upQuality);
$('#idea-list').on('click', '#quality-down', downQuality);
$('#idea-list').on('click', '#importance-up', upImportance);
$('#idea-list').on('click', '#importance-down', downImportance);
$('#idea-list').on('click', '.completed-button', taskComplete);
$('.show-completed').on('click', showComplete);

$(document).ready(pageLoad);
$('.save-button').prop('disabled', true)

function pageLoad() {
 var inStorage = JSON.parse(Object.values(localStorage).length);
 console.log(inStorage);
  for (var i = 0; i < inStorage; i++) {
  if ((JSON.parse(Object.values(localStorage)[i]).completed) === true) {
    prependIdea(JSON.parse(Object.values(localStorage)[i]));
  }}

 };

function buttonDisable() {
  if ($(this).val() == '') {
    $('.save-button').prop('disabled', true)
  } else {
    $('.save-button').prop('disabled', false)
  }
};

function makeIdea(event) {
  var idea = new Idea(Date.now(), $('.idea-title').val(), $('.idea-description').val(), 'Swill', 0, 'Normal', 2);
  event.preventDefault();
  prependIdea(idea);
  toLocalStorage(idea.id, idea);
  inputReset();
  $('.save-button').prop('disabled', true);
};

function Idea(id, title, body, quality, qualityCount, importance, importanceCount, completed) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.qualityCount = qualityCount || 0;
  this.importance = importance;
  this.importanceCount = importanceCount || 0;
  this.completed = completed || false;
}

function prependIdea(idea) {
  $('#idea-list').prepend(
    `<article id="${idea.id}" class="${idea.completed}">
      <h2 contenteditable="true">${idea.title}</h2>
      <button class="remove button"></button>
      <p class="idea-body" contenteditable="true">${idea.body}</p>
      <button class="vote-up arrow button" id="quality-up"></button>
      <button class="vote-down arrow button" id="quality-down"></button>
      <p class="vote-label">quality: <span id="quality">${idea.quality}</span></p>
      <button class="vote-up arrow button" id="importance-up"></button>
      <button class="vote-down arrow button" id="importance-down"></button>
      <p class="vote-label">importance: <span id="importance">${idea.importance}</span></p>
      <button class="completed-button">Task Completed</button>
    </article>`
  );
};

function toLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
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

function showComplete () {
 console.log('buttonworking');
 var inStorage = JSON.parse(Object.values(localStorage).length);
 console.log(inStorage);
for (var i = 0; i < inStorage; i++) {
 prependIdea(JSON.parse(Object.values(localStorage)[i]));
};
//   var parsedIdea = JSON.parse(localStorage.getItem(value));
//     if (parsedIdea['completed'] === true) {

// }
};


// function pageLoad() {
//   Object.keys(localStorage).forEach(function (value, i) {
//     prependIdea(JSON.parse(localStorage.getItem(value)));
//     var parsedIdea = JSON.parse(localStorage.getItem(value));
//     console.log(parsedIdea)
//   if (parsedIdea['completed'] === true) {

//       // var article = $(this).closest('article');
//       // $('article').hide();
//       // // $($('h2')[value]).parent().hide();
//       // console.log(value);
//           // $($('h2')[i]).parent().hide();
//     }
//   });
// };

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

function search() {
  var searchRequest = $('.search-field').val();
  $('article').each(function () {
    var searchResult = $(this).text().indexOf(searchRequest);
    this.style.display = searchResult > -1 ? "" : "none";
  })
};

function filterCritical() {
  $('#idea-list').html("");
  Object.values(localStorage).forEach(function (value, index, array) {
    var parsedImportanceCount = JSON.parse(value).importanceCount;
    if (parsedImportanceCount == 4) {
      prependIdea(JSON.parse(value));
    };
  })
}

function filterHigh() {
  $('#idea-list').html("");
  Object.values(localStorage).forEach(function (value, index, array) {
    var parsedImportanceCount = JSON.parse(value).importanceCount;
    if (parsedImportanceCount == 3) {
      prependIdea(JSON.parse(value));
    };
  })
}

function filterNormal() {
  $('#idea-list').html("");
  Object.values(localStorage).forEach(function (value, index, array) {
    var parsedImportanceCount = JSON.parse(value).importanceCount;
    if (parsedImportanceCount == 2) {
      prependIdea(JSON.parse(value));
    };
  })
}

function filterLow() {
  $('#idea-list').html("");
  Object.values(localStorage).forEach(function (value, index, array) {
    var parsedImportanceCount = JSON.parse(value).importanceCount;
    if (parsedImportanceCount == 1) {
      prependIdea(JSON.parse(value));
    };
  })
}

function filterNone() {
  $('#idea-list').html("");
  Object.values(localStorage).forEach(function (value, index, array) {
    var parsedImportanceCount = JSON.parse(value).importanceCount;
    if (parsedImportanceCount == 0) {
      prependIdea(JSON.parse(value));
    };
  })
};

function taskComplete() {
  $(this).closest('article').children('h2').toggleClass('complete');
  var ideaID = $(this).closest('article').attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(ideaID));
  if (parsedIdea['completed'] === true) {
    parsedIdea['completed'] = false;
    console.log(false);
  } else if (parsedIdea['completed'] === false){
    parsedIdea['completed'] = true;
    console.log(true);
  };
  var stringifiedObject = JSON.stringify(parsedIdea);
  localStorage.setItem(ideaID, stringifiedObject);

}
