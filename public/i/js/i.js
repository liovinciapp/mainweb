function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('ultimate-container', true);
    show('loading', false);
});

$(document).ready(function () {

    
var ready = false;
  var testProj = $('#secret-info').data('info');



  function displayImages() {
    var picStartUrl = "http://projects.liovinci.com/";
    var x = 0;
    var carouselSelect = $('#carousel-project');
     testProj.pictureArray.forEach(function(pic) {
          var indicatorHtml = '<li data-target="#carousel-project" data-slide-to="'+ x +'"></li>';

      var carouselImageHtml = '<div class="item" data-slide-number="'+ x + '">'
                  +'<img class="carousel-img img-responsive center-block" src="' + picStartUrl + pic + '"></div>'

          //to set first active items
            if(x === 0) {
              indicatorHtml = '<li data-target="#carousel-project" class="active" data-slide-to="'+ x +'"></li>';
              carouselImageHtml = '<div class="active item">'
                  +'<img class="carousel-img img-responsive" src="' + picStartUrl+ pic + '"></div>'
          }

          if(testProj.pictureArray.length === 1) {
            $('#carousel-project').find('.carousel-control').hide();
            $('#carousel-project').find('.carousel-control').hide();
          } else {

          carouselSelect.children().eq(0).append(indicatorHtml);
          }
          carouselSelect.children().eq(1).eq(0).append(carouselImageHtml);
          x++;
        });

  }

  displayImages();

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

  function projectDetails() {

    var pic = "http://projects.liovinci.com/" + testProj.defaultPicId;
    var siteUrl = "http://liovinci.com/i/" + testProj.url;
    $("meta[property='og:title']").attr("content", testProj.title);
    $("meta[property='og:description']").attr("content", testProj.description);
    $("meta[property='og:image:url']").attr("content", pic);
    $("meta[property='og:url']").attr("content", siteUrl);

ready = true;

   if(testProj.releaseDate == 0 || !testProj.releaseDate) {
    $('#project-release-date').hide();
    $('#project-release-date-field').hide();
   } else {
        $('#project-release-date').text(testProj.releaseDate);

   }

   

  testProj.tagsArray.forEach(function(tag) {
    var newTag = '<span class="hashtag">#' + tag + '</span>';
    $('#hashtags-list').append(newTag);

  });
   
  }

projectDetails();

  function setupPhases() {
   

    if(testProj.phaseArray.length > 0) {
      var newSortedPhases = testProj.phaseArray;

       newSortedPhases.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.date) - new Date(a.date);
});

      var x = 0;
      newSortedPhases.forEach(function(phase) {
        
    var newD = phase.date.split("T", 1);
        var dateC = new Date(newD);
         var phaseDate = new Date(dateC.getTime() + dateC.getTimezoneOffset()*60000);
        var phaseDay = phaseDate.getDate();
        var phaseMonthIndex = phaseDate.getMonth();
        var phaseYear = phaseDate.getFullYear();
            var phaseDateText = monthNames[phaseMonthIndex] + ' ' + phaseDay + ', ' +  + phaseYear;

    var picStartUrl = "http://phases.liovinci.com/";

                var phaseSource = phase.source;

                
         var phaseHtmlWithImage =   '<div class="cd-timeline-block">'
          +'<div class="cd-timeline-img cd-right">'
            +'<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">'
          +'</div> '
          +'<div class="cd-timeline-content">'
            + '<div>'
            +'<span class="cd-date phase-date">'+phaseDateText+'</span></div>'
            +'<h2 class="phase-title">'+phase.title +'</h2>'
            +'<p class="phase-text">' + phase.text+'</p>'
            +'<img class="phase-pic" src="'+picStartUrl+ phase.picture +'"/>'
          +'</div> '
        +'</div> ';

 if(phaseSource!== undefined && phaseSource !== null && phaseSource.indexOf('http') > -1) {

  var phaseHtmlWithImage =   '<div class="cd-timeline-block">'
          +'<div class="cd-timeline-img cd-right">'
            +'<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">'
          +'</div> '
          +'<div class="cd-timeline-content">'
            + '<div>'
            +'<span class="cd-date phase-date">'+phaseDateText+'</span></div>'
            +'<h2 class="phase-title">'+phase.title +'</h2>'
            +'<p class="phase-text">' 
            + phase.text + '<span><a class="no-source-line" href="' + phaseSource + '" target="_blank" rel="nofollow"> Read More... </a></span></p>'
            +'<img class="phase-pic" src="'+picStartUrl+ phase.picture +'"/>'
          +'</div> '
        +'</div> ';

                    
  }

          var phaseHtmlNOImage =   '<div class="cd-timeline-block">'
          +'<div class="cd-timeline-img cd-right">'
            +'<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">'
          +'</div> '
          +'<div class="cd-timeline-content">'
          + '<div>'
            +'<span class="cd-date phase-date">'+phaseDateText+'</span></div>'
            +'<h2 class="phase-title">'+phase.title +'</h2>'
            +'<p class="phase-text">' + phase.text+'</p>'
          +'</div> '
        +'</div> ';
      
        if(phase.picture) {

        $("#cd-timeline").append(phaseHtmlWithImage);
        } else {

        $("#cd-timeline").append(phaseHtmlNOImage);
        }
      });
    } else {

        var noPhase = '<div class="cd-timeline-block">'
        +'<div class="cd-timeline-img cd-right">'
            +'<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">'
          +'</div> '
        +'<div class="cd-timeline-content">'
          + '<div>'
            +'<span class="no-phase-title"> To </span> '
            +'<img class="resize-lock" src="/i/img/ic_lock_open.png" alt="unlock"/> <span class="no-phase-title">'
            + ' phases, get the app and track this project.</span>'
            
          +'</div> '
        +'</div> '
        $("#cd-timeline").append(noPhase);

    }
  }

  setupPhases();
  function setupVerifiedCompany() {
    if(testProj.companyWebsite) {
      $('#project-company-site').attr('href', testProj.companyWebsite);
       $('#company-site').text(testProj.companyWebsite);
       $('.verified').show();
      $('#lv-home').hide();
    } else{
      $('#project-company-site').hide();
      $('.verified').hide();
      $('#lv-home').show();

    }
   }
setupVerifiedCompany();
var oneTimeScroll = false;
$(window).scroll(function() {
        if($(this).scrollTop() > 100){

            $('#container-footer').show();

            if(!oneTimeScroll) {
              ga('send','event','scroll','/ipage');
              oneTimeScroll = true;
            }

         
        }
        else{
            $('#container-footer').hide()
            
        }
    });



  /* ===========================
     Scroll to Top Button
  ==============================*/
  $(window).scroll(function() {
        if($(this).scrollTop() > 100){
            $('#to-top').stop().animate({
                bottom: '30px'
                }, 750);
       
        }
        else{
            $('#to-top').stop().animate({
               bottom: '-100px'
            }, 750);
            
        }
    });

    $('#to-top').click(function() {
        $('html, body').stop().animate({
           scrollTop: 0
        }, 750, function() {
           $('#to-top').stop().animate({
               bottom: '-100px'
           }, 750);
        });
    });


///IMAGE POPUP
$('.phase-pic-left').click(function(){
    var _this = $(this);
  var phaseTitle = _this.parent().parent().siblings('.phase-title-left').children().eq(0).text();
       $('#myModalLabel').text(phaseTitle);

  $('#imagepreview').attr('src', _this.attr('src')); // here asign the image to the modal when the user click the enlarge link

   $('#imagemodal').modal('show');
});

$('.phase-pic-right').click(function(){
    var _this = $(this);
    var phaseTitle = _this.parent().parent().siblings('.phase-title-right').children().eq(0).text();
       $('#myModalLabel').text(phaseTitle);

    $('#imagepreview').attr('src', _this.attr('src')); // here asign the image to the modal when the user click the enlarge link

   $('#imagemodal').modal('show');
});


 
var isMobile = {
  
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.iOS());
      
    }
};


function setupDevice() {
  if(isMobile.Android()) {

     $('.iphone-app').hide();
      $('#get-the-app').attr('href', 'https://play.google.com/store/apps/details?id=com.liovinci.liovinci')
  }

  if(isMobile.iOS()) {

     $('.android-app').hide();
      $('#get-the-app').attr('href', 'https://itunes.apple.com/us/app/liovinci/id1088105850')

  }


}
setupDevice();



});