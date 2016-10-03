$(document).ready(function() {

    console.log("starting phases..");
    var phases = $('#secret-info').data('info');

    var oneTimeScroll = false;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {

            if (!oneTimeScroll) {
                ga('send', 'event', 'scroll', '/phasepage');
                oneTimeScroll = true;
            }


        }

    });

    function setupPhases() {
        var thePhase = phases;
        if (phases.length > 0) {
            var newSortedPhases = phases;

            newSortedPhases.sort(function(a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
            });

            var x = 0;
            newSortedPhases.forEach(function(phase) {

                var newD = phase.date.split("T", 1);
                var dateC = new Date(newD);
                var phaseDate = new Date(dateC.getTime() + dateC.getTimezoneOffset() * 60000);
                var phaseDay = phaseDate.getDate();
                var phaseMonthIndex = phaseDate.getMonth();
                var phaseYear = phaseDate.getFullYear();
                var phaseDateText = monthNames[phaseMonthIndex] + ' ' + phaseDay + ', ' + +phaseYear;

                var projTitle = phase.projectTitle;
                var secondPartOfUrl = projTitle.replace(/\s+/g, '-').toLowerCase();
                var linkToOpen = "http://www.liovinci.com/i/" + secondPartOfUrl;

                var phaseSource = phase.source;
               var picStartUrl = "http://phases.liovinci.com/";
                var phaseHtmlWithImage = '<div class="cd-timeline-block">' + '<div class="cd-timeline-img cd-right">' + '<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">' + '</div> ' + '<div class="cd-timeline-content">' + '<div class="phase-body">' + '<span class="cd-date phase-date">' + phaseDateText + '</span></div>' + '<a href="' + linkToOpen + '" target="_blank"><h2  class="phase-project">' + phase.projectTitle + '</h2>' + '<h4 class="phase-company">' + phase.projectCompany + '</h4>' + '<h3 class="phase-title">' + phase.title + '</h3>' + '<p class="phase-text">' + phase.text + '</p>' + '<img src="' + picStartUrl + phase.picture + '"/></a>' + '</div> ' + '</div> ';
                 if(phaseSource!== undefined && phaseSource !== null && phaseSource.indexOf('http') > -1) {
                      var phaseHtmlWithImage = '<div class="cd-timeline-block">' + '<div class="cd-timeline-img cd-right">' 
                      + '<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">'
                       + '</div> ' + '<div class="cd-timeline-content">' 
                       + '<div class="phase-body">' 
                       + '<span class="cd-date phase-date">' + phaseDateText + '</span></div>' 
                       + '<a href="' + linkToOpen + '" target="_blank"><h2  class="phase-project">' 
                       + phase.projectTitle + '</h2>' + '<h4 class="phase-company">' 
                       + phase.projectCompany + '</h4>' + '<h3 class="phase-title">' 
                       + phase.title + '</h3></a>' + '<a href="' + phaseSource + '" target="_blank" rel="nofollow"><p class="phase-text">' 
                       + phase.text + ' Read More... </p></a>' + '<a href="' + linkToOpen + '" target="_blank"><img src="' + picStartUrl + phase.picture + '"/></a>' + '</div> ' + '</div> ';
               
                 }
                
                var phaseHtmlNOImage = '<div class="cd-timeline-block">' + '<div class="cd-timeline-img cd-right">' + '<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">' + '</div> ' + '<div class="cd-timeline-content">' + '<div class="phase-body">' + '<span class="cd-date phase-date">' + phaseDateText + '</span></div>' + '<h2 class="phase-project">' + phase.projectTitle + '</h2>' + '<h4 class="phase-company">' + phase.projectCompany + '</h4>' + '<h2 class="phase-title">' + phase.title + '</h2>' + '<p class="phase-text">' + phase.text + '</p>' + '</div> ' + '</div> ';

                if (phase.picture) {

                    $("#cd-timeline").append(phaseHtmlWithImage);
                } else {

                    $("#cd-timeline").append(phaseHtmlNOImage);
                }
            });
        } else {
            //$("#cd-timeline").hide();

            var noPhase = '<div class="cd-timeline-block">' + '<div class="cd-timeline-img cd-right">' + '<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">' + '</div> ' + '<div class="cd-timeline-content">' + '<div>' + '<span class="no-phase-title"> To </span> ' + '<img class="resize-lock" src="/i/img/ic_lock_open.png" alt="unlock"/> <span class="no-phase-title">' + ' phases, get the app and track this project.</span>'

            +'</div> ' + '</div> '
            $("#cd-timeline").append(noPhase);

            //TODO
            //show messsage unlock phases/updatse by downloading the app and tracking this project.
        }
    }
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    setupPhases();


});