



  function makeIdea(event) {
    var idea = new Idea(Date.now(), $('.idea-title').val(), $('.idea-description').val(), 'quality: Swill', 0, "importance: Normal", 0);
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
        <button class="quality-up arrow button"></button>
        <button class="quality-down arrow button"></button>
        <p class="quality">quality: ${idea.quality}</p>
        <button class="importance-up arrow button"></button>
        <button class="importance-down arrow button"></button>
        <p class="importance">importance: ${idea.importance}</p>
      </article>`
    );
  };



  function upQualityVote() {
    var article = $(this).closest('article');
    var key = $(this).closest('article').attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(key));
    if (parsedIdea.qualityCount < 2) {
      increaseQuality(parsedIdea, article)
    }
    localStorage.setItem(key, JSON.stringify(parsedIdea));
    toLocalStorage(key, parsedIdea);
  };

  function downVote() {
    var article = $(this).closest('article');
    var key = $(this).closest('article').attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(key));
    if (parsedIdea.qualityCount > 0) {
      decreaseQuality(parsedIdea, article)
    }
    toLocalStorage(key, parsedIdea);
  };

  var arrayQuality = ["quality: Swill", "quality: Plausible", "quality: Genius"];

  function increaseQuality(parse, article) {
    parse.qualityCount++;
    parse.quality = arrayQuality[parse.qualityCount];
    article.find('.quality').text(arrayQuality[parse.qualityCount]);
  }

  function decreaseQuality(parse, article) {
    parse.qualityCount--;
    parse.quality = arrayQuality[parse.qualityCount];
    article.find('.quality').text(arrayQuality[parse.qualityCount]);
  }






  // function upQualityVote() {
  //   var article = $(this).closest('article');
  //   var key = $(this).closest('article').attr('id');
  //   var parsedIdea = JSON.parse(localStorage.getItem(key));
  //   if (parsedIdea.qualityCount < 2) {
  //     increaseQuality(parsedIdea, article)
  //   }
  //   localStorage.setItem(key, JSON.stringify(parsedIdea));
  //   toLocalStorage(key, parsedIdea);
  // };

  // function downQualityVote() {
  //   var article = $(this).closest('article');
  //   var key = $(this).closest('article').attr('id');
  //   var parsedIdea = JSON.parse(localStorage.getItem(key));
  //   if (parsedIdea.qualityCount > 0) {
  //     decreaseQuality(parsedIdea, article)
  //   }
  //   toLocalStorage(key, parsedIdea);
  // };

  // var arrayImportance = ["importance: None", "importance: Low", "importance: Normal", "importance: High", "importance: Critical"];

  // function increaseQuality(parse, article) {
  //   parse.qualityCount++;
  //   parse.quality = arrayQuality[parse.qualityCount];
  //   article.find('.quality').text(arrayQuality[parse.qualityCount]);
  // }

  // function decreaseQuality(parse, article) {
  //   parse.qualityCount--;
  //   parse.quality = arrayQuality[parse.qualityCount];
  //   article.find('.quality').text(arrayQuality[parse.qualityCount]);
  // }




  // function fromLocalStorage() {
  //   var key = $(this).closest('article').attr('id');
  //   var retrievedIdea = localStorage.getItem(key);
  //   return JSON.parse(retrievedIdea);
  // };




  function quality(changeCount) {
    // var article = $(this).closest("article");
    // var ideaID = $(this).closest('article').attr("id");
    // var parsedIdea = JSON.parse(localStorage.getItem(ideaID));

    // console.log(changeCount);
    // console.log(upVote());
    // console.log(downVote());

    // if (changeCount < 2) {
    //   parsedIdea.quality = arrayQuality[changeCount];
    //   article.find('.quality').text(arrayQuality[changeCount]);
    // }
    // localStorage.setItem(ideaID, JSON.stringify(parsedIdea));

  }


  function upVote() {
    var ideaID = $(this).closest('article').attr("id");
    var parsedIdea = JSON.parse(localStorage.getItem(ideaID));
    var increment = parsedIdea.count++;
    parsedIdea.count++;
    console.log('parsedIdea.count++: ', parsedIdea.count++);
    // console.log(increment);
    // quality(up);
    localStorage.setItem(ideaID, JSON.stringify(parsedIdea));

  };

  function downVote() {
    var ideaID = $(this).closest('article').attr("id");
    var parsedIdea = JSON.parse(localStorage.getItem(ideaID));
    var decrement = parsedIdea.count--;
    parsedIdea.count--;
    console.log('parsedIdea.count--: ', parsedIdea.count--);
    // console.log(decrement);
    // quality(down);
    localStorage.setItem(ideaID, JSON.stringify(parsedIdea));

  };



  // function editContent(editContent) {
  //   $(this).focusout(function () {
  //     var key = $(this).closest('article').attr('id');
  //     var retrievedIdea = localStorage.getItem(key);
  //     var parsedIdea = JSON.parse(retrievedIdea);
  //     parsedIdea['editContent'] = $(this).html();
  //     var stringifiedObject = JSON.stringify(parsedIdea);
  //     localStorage.setItem(key, stringifiedObject);
  //   })
  // };





  // function setLocalStorage(key) {

  //   var retrievedIdea = localStorage.getItem(key);
  //   var parsedIdea = JSON.parse(retrievedIdea);

  //   var stringifiedObject = JSON.stringify(parsedIdea);
  //   localStorage.setItem(key, stringifiedObject);
  // }