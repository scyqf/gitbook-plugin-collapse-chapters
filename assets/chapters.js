require(["gitbook", "jQuery"], function (gitbook, $) {

  function expand(chapter) {
    chapter.show();
    if (chapter.parent().attr('class') != 'summary'
      && chapter.parent().attr('class') != 'book-summary'
      && chapter.length != 0
    ) {
      expand(chapter.parent());
    }
  }

  function trigger() {
    $parent = $(this).parent().parent();
    if ($parent.hasClass("active")) {
      return;
    }
    if ($parent.hasClass("expanded")) {
      $parent.find("ul").show();
    } else {
      $parent.find("ul").hide();
    }
  }

  gitbook.events.bind("page.change", function () {
    $('li.chapter').not(".active").removeClass("expanded").children('ul.articles').hide();
    $chapter = $('li.chapter.active');
    $children = $chapter.children('ul.articles');
    $parent = $chapter.parent();
    $siblings = $chapter.siblings().children('ul.articles');

    expand($chapter);

    if ($children.length > 0) {
      $children.show();
    }

    $("i.exc-trigger").bind("click", trigger)

  });

});
