var $ideaTitle = $('[name=idea-title]');
var $ideaDescription = $('[name=idea-description');

$('#save-button').click(function (event) {
  var idea = new Idea(Date.now(), $ideaTitle.val(), $ideaDescription.val());

  if (`${$ideaTitle.val()}` == "" || `${$ideaDescription.val()}` == "") {
    return false;
  } else {
    event.preventDefault();
    prependIdea(idea);
    toLocalStorage(idea);
    inputReset();
  }
});

function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'quality: swill';
}

function prependIdea(idea) {
  $('#idea-list').prepend(
    `<article id="${idea.id}">
      <h2>${idea.title}</h2>
      <label for="remove-button">
        <button class="remove button"></button>
      </label>
      <p>${idea.body}</p>
      <label for="quality-up-button" class="upL">
        <button class="quality-up button" name="quality-up-button"></button>
      </label>
      <label for="quality-down-button" class="downL">
        <button class="quality-down button" name="quality-down-button"></button>
      </label>
      <h3>${idea.quality}</h3>
    </article>`
  );
};

$('[name=search-field]').on('keyup', function () {
  var searchRequest = $('[name=search-field]').val();
  $('article').each(function () {
    var searchResult = $(this).text().indexOf(searchRequest);
    this.style.display = searchResult > -1 ? "" : "none";
  })
})

function inputReset() {
  $ideaTitle.val('');
  $ideaDescription.val('');
  $ideaTitle.focus();
};

function toLocalStorage(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, JSON.stringify(idea));
};

function pageLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var returnIdea = localStorage.getItem(localStorage.key(i));
    var parseIdea = JSON.parse(returnIdea);
    prependIdea(parseIdea);
  };
};

window.onload = function () {
  pageLoad();
};

$('#idea-list').on('click', 'h2', function () {
  $(this).prop('contenteditable', true).focus();
  $(this).focusout(function () {
    var key = $(this).closest('article').attr('id')
    var retrievedIdea = localStorage.getItem(key);
    var parsedIdea = JSON.parse(retrievedIdea);
    parsedIdea['title'] = $(this).html();
    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
  })
});

$('#idea-list').on('click', 'p', function () {
  $(this).prop('contenteditable', true).focus();
  $(this).focusout(function () {
    var key = $(this).closest('article').attr('id')
    var retrievedIdea = localStorage.getItem(key);
    var parsedIdea = JSON.parse(retrievedIdea);
    parsedIdea['body'] = $(this).html();
    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
  })
});

$('#idea-list').on('click', '.remove', function () {
  $(this).closest('article').fadeOut(function () {
    $(this).remove();
  })
  localStorage.removeItem($(this).closest('article').attr('id'));
});

$('#idea-list').on('click', '.quality-up', function () {

  var key = $(this).closest('article').attr('id')
  var retrievedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(retrievedIdea);

  if (parsedIdea['quality'] === ('quality: swill')) {
    $(this).closest('label').siblings('h3').text('quality: plausible');
    parsedIdea['quality'] = 'quality: plausible';

    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);

  } else if (parsedIdea['quality'] === ('quality: plausible')) {
    $(this).closest('label').siblings('h3').text('quality: genius');
    parsedIdea['quality'] = 'quality: genius';

    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
  }
});

$('#idea-list').on('click', '.quality-down', function () {
  var key = $(this).closest('article').attr('id')
  var retrievedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(retrievedIdea);

  if (parsedIdea['quality'] === ('quality: genius')) {
    $(this).closest('label').siblings('h3').text('quality: plausible');
    parsedIdea['quality'] = 'quality: plausible';

    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);

  } else if (parsedIdea['quality'] === ('quality: plausible')) {
    $(this).closest('label').siblings('h3').text('quality: swill');
    parsedIdea['quality'] = 'quality: swill'

    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
  }
});