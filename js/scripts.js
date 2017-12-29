// pageLoad();

$('#save-button').on('click', makeIdea);
$('.search-field').on('keyup', search);
$('#idea-list').on('click', '.remove', removeIdea);
$('#idea-list').on('click', 'h2', editContent);
$('#idea-list').on('click', 'p', editContent);
$('#idea-list').on('click', '.quality-down', downVote);
$('#idea-list').on('click', '.quality-up', upVote);

function makeIdea(event) {
  var $ideaTitle = $('.idea-title]');
  var $ideaDescription = $('.idea-description');
  var idea = new Idea (Date.now(), $ideaTitle.val(), $ideaDescription.val());
  if (`${$ideaTitle.val()}` == "" || `${$ideaDescription.val()}` == ""){
    return false;
  } else {
  event.preventDefault();
  prependIdea(idea);
  toLocalStorage(idea);
  inputReset();
 }};

function Idea (id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'quality: swill';
}

function prependIdea(idea) {
  $('#idea-list').prepend(
    `<article id="${idea.id}">
      <h2>${idea.title}</h2>
      <button class="remove button"></button>
      <p class="idea-body">${idea.body}</p>
      <button class="quality-up button"></button>
      <button class="quality-down button"></button>
      <p class="quality">${idea.quality}</p>
    </article>`
  );
};

function search() {
  var searchRequest = $('.search-field').val();
  $('article').each(function(){
    var searchResult = $(this).text().indexOf(searchRequest);
    this.style.display = (searchResult > -1) ? "" : "none";
  });
};

function inputReset() {
  $('.idea-title').val('');
  $('.idea-description').val('');
  $('.idea-title').focus();
};

function toLocalStorage(idea) {
 localStorage.setItem(idea.id, JSON.stringify(idea));
};

////////Fix key argument
// function pageLoad() {
//   var returnIdea = localStorage.getItem(localStorage.key(id));
//   var parseIdea = JSON.parse(returnIdea);
//   parseIdea.forEach(function(val, i){
//     prependIdea(val);
//   })
// };

function editContent () {
  $(this).prop('contenteditable', true).focus();
  $(this).focusout(function() {
    var key = $(this).closest('article').attr('id')
    var retrievedIdea = localStorage.getItem(key);
    var parsedIdea = JSON.parse(retrievedIdea);
    parsedIdea['title'] = $(this).html();
    parsedIdea['body'] = $(this).html();
    var stringifiedObject = JSON.stringify(parsedIdea);
    localStorage.setItem(key, stringifiedObject);
    })
  };

function removeIdea() {
 $(this).closest('article').fadeOut(function() {
   $(this).remove();
 });
 localStorage.removeItem($(this).closest('article').attr('id'));
};

function upVote() {
  var key = $(this).closest('article').attr('id')
  var retrievedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(retrievedIdea);
  if (parsedIdea['quality'] === ('quality: swill')) {
    $(this).closest('label').siblings('h3').text('quality: plausible');
    parsedIdea['quality'] = 'quality: plausible';
    toLocalStorage(parsedIdea);
  } else if (parsedIdea['quality'] === ('quality: plausible')) {
    $(this).closest('label').siblings('h3').text('quality: genius');
    parsedIdea['quality'] = 'quality: genius';
    toLocalStorage(parsedIdea);
 } 
};

function downVote() {
  var key = $(this).closest('article').attr('id')
  var retrievedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(retrievedIdea);
  if (parsedIdea['quality'] === ('quality: genius')) {
    $(this).closest('label').siblings('h3').text('quality: plausible');
    parsedIdea['quality'] = 'quality: plausible';
    toLocalStorage(parsedIdea);
  } else if (parsedIdea['quality'] === ('quality: plausible')) {
   $(this).closest('label').siblings('h3').text('quality: swill');
   parsedIdea['quality'] = 'quality: swill';
   toLocalStorage(parsedIdea);
 } 
};

