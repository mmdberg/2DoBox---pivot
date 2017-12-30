$('.save-button').click(makeIdea);
$('.search-field').on('keyup', search);
$('#idea-list').on('click', 'h2', editContentTitle);
$('#idea-list').on('click', 'p', editContentBody);
$('#idea-list').on('click', '.remove', removeIdea);
$('#idea-list').on('click', '.quality-up', upVote);
$('#idea-list').on('click', '.quality-down', downVote);

$(document).ready(pageLoad);

function pageLoad() {
  Object.keys(localStorage).forEach(function (value) {
    prependIdea(JSON.parse(localStorage.getItem(value)));
  });
};

function makeIdea(event) {
  var $ideaTitle = $('.idea-title');
  var $ideaDescription = $('.idea-description');
  var idea = new Idea(Date.now(), $ideaTitle.val(), $ideaDescription.val(), 'Swill');

  if (`${$ideaTitle.val()}` == "" || `${$ideaDescription.val()}` == "") {
    return false;
  } else {

    event.preventDefault();
    prependIdea(idea);
    toLocalStorage(idea);
    inputReset();
  }
};

function Idea(id, title, body, quality, count) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.count = count || 0;
}

function prependIdea(idea) {
  $('#idea-list').prepend(
    `<article id="${idea.id}">
      <h2 contenteditable="true">${idea.title}</h2>
      <button class="remove button"></button>
      <p class="idea-body" contenteditable="true">${idea.body}</p>
      <button class="quality-up arrow button"></button>
      <button class="quality-down arrow button"></button>
      <p class="quality">${idea.quality}</p>
    </article>`
  );
};

function search() {
  var searchRequest = $('.search-field').val();
  $('article').each(function () {
    var searchResult = $(this).text().indexOf(searchRequest);
    this.style.display = searchResult > -1 ? "" : "none";
  })
};

function inputReset() {
  var $ideaTitle = $('.idea-title');
  var $ideaDescription = $('.idea-description');
  $ideaTitle.val('');
  $ideaDescription.val('');
  $ideaTitle.focus();
};

function toLocalStorage(idea) {
  localStorage.setItem(idea.id, JSON.stringify(idea));
};

function editContentTitle() {
  $(this).focusout(function () {
    var key = $(this).closest('article').attr('id');
    var retrievedIdea = localStorage.getItem(key);
    var parsedIdea = JSON.parse(retrievedIdea);
    parsedIdea['title'] = $(this).html();
    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
  })
};

function editContentBody() {
  $(this).focusout(function () {
    var key = $(this).closest('article').attr('id');
    var retrievedIdea = localStorage.getItem(key);
    var parsedIdea = JSON.parse(retrievedIdea);
    parsedIdea['body'] = $(this).html();
    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
  })
};

function removeIdea() {
  $(this).closest('article').fadeOut(function () {
    $(this).remove();
  })
  localStorage.removeItem($(this).closest('article').attr('id'));
};

var arrayQuality = ["Swill", "Plausible", "Genius"];

function upVote() {
  var article = $(this).closest("article");
  var ideaID = $(this).closest('article').attr("id");
  var parsedIdea = JSON.parse(localStorage.getItem(ideaID));

  if (parsedIdea.count < 2) {
    parsedIdea.count++;
    parsedIdea.quality = arrayQuality[parsedIdea.count];
    article.find('.quality').text(arrayQuality[parsedIdea.count]);
  }
  localStorage.setItem(ideaID, JSON.stringify(parsedIdea));
};

function downVote() {
  var article = $(this).closest("article");
  var ideaID = $(this).closest('article').attr("id");
  var parsedIdea = JSON.parse(localStorage.getItem(ideaID));

  if (parsedIdea.count > 0) {
    parsedIdea.count--;
    parsedIdea.quality = arrayQuality[parsedIdea.count];
    article.find('.quality').text(arrayQuality[parsedIdea.count]);
  }
  localStorage.setItem(ideaID, JSON.stringify(parsedIdea));
};