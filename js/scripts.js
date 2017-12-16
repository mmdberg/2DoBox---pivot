
$('#save-button').click(function(event) {
  event.preventDefault();

  var $ideaTitle = $('[name=idea-title]');
  var $ideaDescription = $('[name=idea-description');

  var idea = `<article>
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

  $('#idea-list').prepend(idea);  
})