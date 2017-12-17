
$('#save-button').click(function(event) {

  var $ideaTitle = $('[name=idea-title]');
  var $ideaDescription = $('[name=idea-description');

  var idea = 
    `<article>
      <h2>${$ideaTitle.val()}</h2>
      <label for="remove-button">
        <button class="remove button"></button>
      </label>
      <p>${$ideaDescription.val()}</p>
      <label for="quality-up-button">
        <button class="quality-up button" name="quality-up-button"></button>
      </label>
      <label for="quality-down-button">
        <button class="quality-down button" name="quality-down-button"></button>
      </label>
      <h3>quality: swill</h3>
    </article>`

  if (`${$ideaTitle.val()}` == "" || `${$ideaDescription.val()}` == ""){
    return false;
  } else {
    event.preventDefault();
    $('#idea-list').prepend(idea);
    $ideaTitle.val('');
    $ideaDescription.val('');
    $ideaTitle.focus();
  }

});

$('#idea-list').on('click', '.remove', function(e) {
 $(this).closest('article').fadeOut(function() {
   $(this).remove();
 })
});

$('#idea-list').on('click', '.quality-up', function(e) {
if ($(this).closest('label').siblings('h3').text() === ('quality: swill')) {
$(this).closest('label').siblings('h3').text('quality: plausible');
} else if ($(this).closest('label').siblings('h3').text() === ('quality: plausible')) {
 $(this).closest('label').siblings('h3').text('quality: genius');
} 
});

$('#idea-list').on('click', '.quality-down', function(e) {
if ($(this).closest('label').siblings('h3').text() === ('quality: genius')) {
$(this).closest('label').siblings('h3').text('quality: plausible');
} else if ($(this).closest('label').siblings('h3').text() === ('quality: plausible')) {
 $(this).closest('label').siblings('h3').text('quality: swill');
} 
});



