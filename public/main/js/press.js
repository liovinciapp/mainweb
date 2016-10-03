$(document).ready(function() {


    var oneTimeScroll = false;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {

            if (!oneTimeScroll) {
                ga('send', 'event', 'scroll', '/phasepage');
                oneTimeScroll = true;
            }


        }

    });
function isOdd(num) { return num % 2;}

    function setupPress() {
       var y = 0;
var x = 1;
var realX = 0;
            thenAndNowTxt.forEach(function(text) {
                if(isOdd(x)) {
                    var tnImage = thenAndNowPics[realX];
                         var tnHtmlThen = '<div class="cd-timeline-block">' 
                     + '<div class="cd-timeline-img cd-right">' 
                     + '<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">' 
                     + '</div> ' + '<div class="cd-timeline-content">' 
                     + '<div class="phase-body">' 
                     + '<span class="cd-date phase-date">' 
                     + text + '</span></div><br><br>' 
                    + '<img src="' + tnImage + '"/>'
                     + '</div> ' + '</div> ';
                    $("#cd-timeline").append(tnHtmlThen);
                } else {
                    var tnImage = thenAndNowPics[realX];
                    var projTitle = nowTitle[y];
                    var projDescr = nowDescr[y];
                    var linkToOpen = nowLinks[y];
                     var tnHtmlNow = '<div class="cd-timeline-block">' 
                     + '<div class="cd-timeline-img cd-right">' 
                     + '<img src="/i/img/liovinci-logo-icon.png" alt="liovinci">' 
                     + '</div> ' + '<div class="cd-timeline-content">' 
                     + '<div class="phase-body">' 
                     + '<span class="cd-date phase-date">' 
                     + text + '</span></div>' 
                     + '<a href="' + linkToOpen + '" target="_blank"><h2  class="phase-project">' 
                     + projTitle + '</h2>' 
                     + '<p class="phase-title">' + projDescr + '</p>' 
                     + '<img src="' + tnImage + '"/></a>'
                     + '</div> ' + '</div> ';

                    $("#cd-timeline").append(tnHtmlNow);
                    y++;
                }
           
                x++;
                realX++;
            });
       
    }
    var thenAndNowTxt = [
        "Translators Then", "Translators Now", 
        "Eyesight Solution Then", "Eyesight Solution Now", 
        "Long Distance Travel Then", "Long Distance Travel Now", 
        "Games Then", "Games Now", 
        "Clothing Then", "Clothing Now",
        "Flying Cars Then", "Flying Cars Now",
        "Looking at Space Then", "Looking at Space Now",
        "Chef Then", "Chef Now",
        "Driving Then", "Driving Now",
        "Audio Then", "Audio Now"
    ];

   var thenAndNowPics = [
        "/main/img/press/tn1.png",
        "/main/img/press/tn2.png", 
        "/main/img/press/tn3.png",
        "/main/img/press/tn4.png", 
        "/main/img/press/tn5.png",
        "/main/img/press/tn6.png",
        "/main/img/press/tn7.png",
        "/main/img/press/tn8.png",
        "/main/img/press/tn9.png",
        "/main/img/press/tn10.png",
        "/main/img/press/tn11.png",
        "/main/img/press/tn12.png",
        "/main/img/press/tn13.png",
        "/main/img/press/tn14.png",
        "/main/img/press/tn15.png",
        "/main/img/press/tn16.png",
        "/main/img/press/tn17.png",
        "/main/img/press/tn18.png",
        "/main/img/press/tn19.png",
        "/main/img/press/tn20.png"
    ];

 var nowTitle = [
        "Pilot", 
        "Bionic Eye", 
        "Hyperloop ",
        "The VOID", 
        "Kniterate", 
        "AeroMobil", 
        "VSS Unity",
        "Moley", 
        "Self Driving Car", 
        "AirPods"
    ];
     var nowDescr = [
        "The earpiece that is a universal translator.", 
        "The eye implant that helps people without sight.", 
        "It will allow the world to transport people and goods inexpensively, safely, and at speeds never thought possible.",
        "It is a real-time interactive environment, and blending the real world with the digital.",
        "The 3D printer for knitwear. For the first time ever, you can design and print new garments at home.", 
        "A flying car that perfectly makes use of existing infrastructure created for automobiles and planes.", 
        "A spaceship to allow consumers to travel into space.",
        "The world's first robotic kitchen.",
        "Combining automotive technologies with artificial intelligence to create a publicly available self-driving car.", 
        "The new cord-free headphones."
    ];
    var nowLinks = [
        "http://liovinci.com/i/pilot", 
        "http://www.liovinci.com/i/bionic-eye", 
        "http://www.liovinci.com/i/hyperloop",
        "http://www.liovinci.com/i/the-void", 
        "http://www.liovinci.com/i/kniterate", 
        "http://www.liovinci.com/i/aeromobil", 
        "http://www.liovinci.com/i/vss-unity",
        "http://www.liovinci.com/i/moley", 
        "http://www.liovinci.com/i/self-driving-car",
        "http://www.liovinci.com/i/airpods"
        
    ];
 
    setupPress();


});