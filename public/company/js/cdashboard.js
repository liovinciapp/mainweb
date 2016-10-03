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


$(document).ready(function(){
  var listOfProj = $('#secret-info').data('info');
  var currentProj, currentPos;

  var sess = window.localStorage;
  var ajaxReqProcessing = false;



    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
initialHide();
function initialHide() {
   checkCookie(function(deleted) {
      if(deleted) {
        window.location.href = "/clogin"; 
      }
    });
  //add active to menu item
  hideCurrentPage(function(hidden) {
      if(hidden) {
        $("#container-projects-view").show();
        initProjectsSetup();
      }
    });
}
  //removes views and sends a callback on complete
  function hideCurrentPage(cb) {
    $("#main-wrap").children().hide();
    //checks that there are no children views before it sends back callback
    if($("#main-wrap").children(':visible').length == 0) {
      cb(true);
    }
  }
      
  $("#logout").click(function(){
    $('#logoutmodal').modal('show');
    $('.confirm-logout').click(function(e){
      e.preventDefault();

    logoutCall();
    })

     $('.cancel-logout').click(function(e){
      e.preventDefault();

    $('#logoutmodal').modal('hide');
    })
  
  });

  function newAjaxReqInit() {
     if(ajaxReqProcessing) {
                var errMsg = "Sorry in middle of processing your previous request. If this has taken longer than usual please refresh the page and try doing your previous request again or contact the admin.";
                $('#error-message').text(errMsg);
                $('#errormodal').modal('show');
                return false;
            } else {
              processAjax();
              return true;
              
            }
  }
  function processAjax() {
    ajaxReqProcessing = true;
    show('loading', true);
  }

  function processAjaxComplete() {
    ajaxReqProcessing = false;
    show('loading', false);
  }



$('#addphasemodal').on('keyup', '.description-box',function () {
    var charactersAllowed = 300;
        var left = charactersAllowed - $(this).val().length;
        if (left < 0) {
            $('.counter-text2').addClass('error');
            left = 0;
        }
        else {
            $('.counter-text2').removeClass('error');
        }
        $('.counter-text2').text('Characters left: ' + left);
    });

$('#addphasemodal').on('keyup', '#new-phase-title',function () {
    var charactersAllowed = 30;
        var left = charactersAllowed - $(this).val().length;
        if (left < 0) {
            $('.counter-title2').addClass('error');
            left = 0;
        }
        else {
            $('.counter-title2').removeClass('error');
        }
        $('.counter-title2').text('Characters left: ' + left);
    });

$('#ultimate-container').on('keyup', '.edit-phase-text',function () {
    var charactersAllowed = 300;
        var left = charactersAllowed - $(this).val().length;
        if (left < 0) {
            $('.counter-text').addClass('error');
            left = 0;
        }
        else {
            $('.counter-text').removeClass('error');
        }
        $('.counter-text').text('Characters left: ' + left);
    });

$('#ultimate-container').on('keyup', '.edit-phase-title',function () {
    var charactersAllowed = 30;
        var left = charactersAllowed - $(this).val().length;
        if (left < 0) {
            $('.counter-title').addClass('error');
            left = 0;
        }
        else {
            $('.counter-title').removeClass('error');
        }
        $('.counter-title').text('Characters left: ' + left);
    });
  $('#confirm-error').click(function(e) {
    $('#errormodal').modal('hide');
  });

  function logoutCall() {
      Cookies.remove("cToken");
      Cookies.remove("cid");
      Cookies.remove("cSess");
    checkCookie(function(deleted) {
      if(deleted) {
        window.location.href = "/clogin"; 
      }
    });
  }

  //check if there is a cookie
  function checkCookie(cb) {
      var cToken = Cookies.get("cToken");
      if (cToken) {
          cb(false);
      }else{
          cb(true);
      }
  }

  function initProjectsSetup() {
     $('#menu-company').text(sess.getItem('company'));
     $('#menu-projects-count').text("Total Projects: " + sess.getItem('count'));
     if(listOfProj.length > 1) {
      
      $('.img-down-arrow').show();
     } else {

      $('.img-down-arrow').hide();
     }
     currentPos = 0;
     currentProj = listOfProj[currentPos];
    projectCreation(currentProj);

  }

$(".menu-item").click(function(e) {
  //not sure if needed
  e.preventDefault();
  

  if($(this).parent().hasClass('menu-proj')) {
    $(this).parent().addClass('active').siblings().removeClass('active');

    hideCurrentPage(function(hidden) {
      if(hidden) {
        $("#container-projects-view").show();
      }
    });
  }


  if($(this).parent().hasClass('menu-add')) {
    $(this).parent().addClass('active').siblings().removeClass('active');

    hideCurrentPage(function(hidden) {
      if(hidden) {
        $("#container-add-project-view").show();
      }
    });
  }
});


/////////////////////CONTAINER PROJECT VIEW /////////////////////////

  //For Adding all projects to View
  function projectCreation (proj) {
    $('.separate-proj').data('index', currentPos);
    $('.proj-body').data('id', proj._id);
    var createUrl = "http://www.liovinci.com/i/" + proj.url;
    $('.view-proj-profile').attr('href', createUrl);
    $('.proj-title').text(proj.title);
    $('.descr-height').text(proj.description);
    var rd = proj.releaseDate;
    if(rd ===undefined || rd === null || rd == 0) {
      rd = "TBA"
    }
    $('.release-date').text(rd);
    $('.stats-trackers').text(proj.trackedCount + " Trackers");
    $('.stats-phases').text(proj.phaseCount + " Phases");
    $('.stats-comments').text(proj.commentCount + " Comments");
    var picDef = "http://projects.liovinci.com/" + proj.defaultPicId;
    $('.proj-default-image').attr('src', picDef);
  
      

    hashtagsAdd();
    function hashtagsAdd() {
      $('.hashtags-list').empty();
      proj.tagsArray.forEach(function(x) {

        var tagsHtml = '<span class="hashtag">#'+x+'</span>'
        $('.hashtags-list').append(tagsHtml);
      });
    }

 function displayImages() {
  if( proj.pictureArray.length < 2) {

        $('.extra-proj-pics').hide();
      } else {

        $('.extra-proj-pics').show();
      }


      

        var gallery = $('.extra-proj-pics');
        gallery.empty();
         proj.pictureArray.forEach(function(pic) {
          //if multiple pics then just ignoring for default
           if(pic === proj.defaultPicId) {

           } else {

            var picStartUrl = "http://projects.liovinci.com/";
            var editProjPicHtml = '<div class="proj-view-image">'
              +' <img class="img-responsive img-center extra-proj-pic-img" src="' +  picStartUrl + pic+ '" alt="...">'
              +'</div>';
              gallery.append(editProjPicHtml);              
               
           }
          });
         
          

    

  }

  displayImages();
   //html part to replace in index
     // <div id="carousel-project" data-ride="carousel" class="carousel slide">
     //                                <!-- Indicators-->
     //                                <ol class="carousel-indicators"></ol>
     //                                <!-- Wrapper for slides-->
     //                                <div role="listbox" class="carousel-inner"></div>
     //                                <!-- Controls--><a href="#carousel-project" role="button" data-slide="prev" class="left carousel-control" onclick="ga('send','event','projects','/scrollpicarrows')"><span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a href="#carousel-project" role="button" data-slide="next" class="right carousel-control" onclick="ga('send','event','projects','/scrollpicarrows')"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a>
     //                              </div>
 //   function displayImages() {
 //    //TODO FOR TESTING ADDING MULTIPLE IMAGES
 //      // proj.pictureArray = ["p_15280322638e2093a8fb17745f9ddcf9898a8bd8.jpg", "p_18c6fab03babe95d91b276e73a2cfdbdfa6ff427.jpg", "p_86e7d26d244d70231190ec1f702e9b4dd0d45a48.jpg"];
 // //since first pic is default pic
 //     if( proj.pictureArray.length < 2) {

 //        $('.extra-proj-pics').hide();
 //      } else {

 //        $('.extra-proj-pics').show();

 //    var picStartUrl = "http://projects.liovinci.com/";
 //    var x = 0;
 //    var carouselSelect = $('#carousel-project');
 //    $('.carousel-indicators').empty();
 //     $('.carousel-inner').empty();
 //       proj.pictureArray.forEach(function(pic) {
 //        //if multiple pics then just ignoring for default
 //         if(pic === proj.defaultPicId) {

 //         } else {
 //            var indicatorHtml = '<li data-target="#carousel-project" onclick="ga(\'send\',\'event\',\'projects\',\'/scrollpicarrows\')" data-slide-to="'+ x +'"></li>';

 //          var carouselImageHtml = '<div class="item" data-slide-number="'+ x + '">'
 //                      +'<img class="carousel-img img-responsive center-block" src="' + picStartUrl + pic + '"></div>'

 //              //to set first active items
 //                if(x === 0) {
 //                  indicatorHtml = '<li data-target="#carousel-project" onclick="ga(\'send\',\'event\',\'projects\',\'/scrollpicarrows\')" class="active" data-slide-to="'+ x +'"></li>';
 //                  carouselImageHtml = '<div class="active item">'
 //                      +'<img class="carousel-img img-responsive" src="' + picStartUrl+ pic + '"></div>'
 //              }

 //              if(proj.pictureArray.length === 2) {
 //              } else {

 //              carouselSelect.children().eq(0).append(indicatorHtml);
 //              }
 //              carouselSelect.children().eq(1).eq(0).append(carouselImageHtml);
 //              x++;
 //         }
 //        });

 //      }
 //  }

 //  displayImages();


    projPhasesAdd();
    function projPhasesAdd () {
      $('#cd-timeline').empty();
      if(proj.phaseArray.length > 0) {
        var newSortedPhases = proj.phaseArray;

            newSortedPhases.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or  zero.
              return new Date(b.date) - new Date(a.date);
            });


            newSortedPhases.forEach(function(phase) {
              var newD = phase.date.split("T", 1);
              var dateC = new Date(newD);
              var phaseDate = new Date(dateC.getTime() + dateC.getTimezoneOffset()*60000);
              var phaseDay = phaseDate.getDate();
              var phaseMonthIndex = phaseDate.getMonth();
              var phaseYear = phaseDate.getFullYear();
              var phaseDateText = monthNames[phaseMonthIndex] + ' ' + phaseDay + ', ' +  + phaseYear;
              var picStartUrl = "http://phases.liovinci.com/";
               var phaseHtmlWithImage =   '<div data-phaseid="'+phase._id+'" class="cd-timeline-block">'
                +'<div class="cd-timeline-img cd-right">'
                  +'<img src="/company/img/liovinci-logo-icon.png" alt="liovinci">'
                +'</div> '
                +'<div class="cd-timeline-content">'
                  + '<div>'
                  +'<span class="cd-date phase-date">'+phaseDateText+'</span> <span style="font-size:16px; margin-right: 5px;" class="phase-edit-border pull-right hidden-xs showopacity glyphicon glyphicon-pencil" onclick="ga(\'send\',\'event\',\'phases\',\'/editphase\')"/></div>'
                  +'<h2 class="phase-title">'+phase.title +'</h2>'
                  +'<p class="phase-text">' + phase.text+'</p>'
                  +'<img class="phase-picture" src="'+picStartUrl+ phase.picture +'"/>'
                +'</div> '
              +'</div> ';

                var phaseHtmlNOImage =   '<div class="cd-timeline-block">'
                +'<div class="cd-timeline-img cd-right">'
                  +'<img src="/company/img/liovinci-logo-icon.png" alt="liovinci">'
                +'</div> '
                +'<div data-phaseid="'+phase._id+'" class="cd-timeline-content">'
                + '<div>'
                  +'<span class="cd-date phase-date">'+phaseDateText+'</span><span style="font-size:16px; margin-right: 5px;" class="phase-edit-border pull-right hidden-xs showopacity glyphicon glyphicon-pencil" onclick="ga(\'send\',\'event\',\'phases\',\'/editphase\')"/></div>'
                  +'<h2 class="phase-title">'+phase.title +'</h2>'
                  +'<p class="phase-text">' + phase.text+'</p>'
                +'</div> '
              +'</div> ';

            

            if(phase.picture) {

                $('#cd-timeline').append(phaseHtmlWithImage);
              } else {

                $('#cd-timeline').append(phaseHtmlNOImage);
              }
          });
      }
    }
   

  }




  $('#container-projects-view').on('click', 'button', function(){
    var _this = $(this);
    if(_this.hasClass('edit-project-view')) {
      var indexNum = _this.closest('.separate-proj').data('index');
      setupEditProj(_this, indexNum);
    }


  });

$('#container-projects-view').on('click', '.img-down-arrow', function(){
    var _this = $(this);
    $('.img-down-arrow').attr('disabled', true);
    if(listOfProj.length > (currentPos+1)) {
      currentPos = currentPos +1;
        projectCreation(listOfProj[currentPos]);
    } else {
      currentPos = 0;
        projectCreation(listOfProj[currentPos]);

    }

    $('.img-down-arrow').attr('disabled', false);

    
  });


//////////////////////////END PROJECTS HOME ////////////////////

//////////////////////////ADD PROJECT ////////////////////

   $('#container-add-project-view').on('click', 'button', function(){
        var _this = $(this);
        if(_this.hasClass('add-proj-save')) {
          startNewProjSaveProcess();
        }

        if(_this.hasClass('add-proj-clear')) {
            $('#container-add-project-view').find('input, textarea').val('');
            $('#container-add-project-view').find('#add-proj-image').attr('src', 'company/img/default-proj-pic.png');
        }

       function startNewProjSaveProcess() {
         $("#container-add-project-view").find('.validation-error').text("");
          if(newAjaxReqInit()) {

            $("#container-add-project-view").find('input, textarea, button').attr('disabled',true);

            var fileInput = $('#container-add-project-view').find("input[type=file]")[0];
            var file = fileInput.files && fileInput.files[0];
            var newProjTitle = $('#new-proj-title').val();
           var newProjDescr = $('#new-proj-descr').val();
           var newProjTags = $('#new-proj-hashtag').val();
           var newProjReleaseDate = $('#new-release-date').val();

           //removes all symbols and only keeps numbers and characters
            var cleanupTag = newProjTags.replace(/[^A-Za-z0-9#]/g,'');;

            //removes first hashtag
              var removeFirstHash = cleanupTag.replace(/^#/, '');

              //replaces all hashtags with commas
              var newTags = removeFirstHash.replace(/#/g ,',');

              //removes anywhite space in the entire string
              var tagsNoSpace = newTags.replace(/ /g,'');

              //turns tags into array to now lowercase and trim the tags and make sure no random commas
              var newTagArr = tagsNoSpace.split(',');
              var newTagStr ="";
              newTagArr.forEach(function(i){
                if(i.length> 0) {
                   var lowerC = i.toLowerCase();
                  var trimC = lowerC.trim();
                  newTagStr = newTagStr.concat(trimC + ",");
                }
               
              })

              newTagStr = newTagStr.replace(/,\s*$/, "");;

            if( file ) {
                var img = new Image();

                img.src = window.URL.createObjectURL( file );

                img.onload = function() {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL( img.src );

                    if( width == 640 && height == 480 ) {
                        
                        continueToSubmitProj();
                    }
                    else {
                        //fail
                        $("#container-add-project-view").find('.validation-error').text("Please fix the following errors: -Your image is too big or small - 640x480");
                        $("#container-add-project-view").find('input, textarea, button').attr('disabled',false);
                        processAjaxComplete();
                    }
                };
            } else { //No file was input or browser doesn't support client side reading
                $("#container-add-project-view").find('.validation-error').text("Please fix the following errors: -No Image Found");
                        
                $("#container-add-project-view").find('input, textarea, button').attr('disabled',false);
                processAjaxComplete();
                        
            }



            //after picture check
            function continueToSubmitProj() {
              if(newProjTitle.length > 0 && newProjDescr.length > 0 && newProjTags.length > 0) {
                postNewProj();
              } else {
                $("#container-add-project-view").find('.validation-error').text("Please fix the following errors: -Fill out all fields (Release Date is optional)");
                    
                $("#container-add-project-view").find('input, textarea, button').attr('disabled',false);
                processAjaxComplete();
              }
            }




            function postNewProj() {


                var formData = new FormData();
                formData.append('picture', fileInput.files[0]);
                formData.append('title', newProjTitle.trim());
                formData.append('text', newProjDescr.trim());
                formData.append('tags', newTagStr);
                formData.append('release', newProjReleaseDate.trim());
                
              
                $.ajax({
                        type: "POST",
                        url: "/cAddProject",
                        data: formData,
                      processData: false, // Don't process the files
                      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                     
                      success: function (data) {
                            if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableAddProject();
                              } else {
                                alert('Successfully added the project.');
                                enableAddProject();
                                successAddProject();
                                updateProjTotalCount();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableAddProject();
                            }
                        }
                    });

                  function enableAddProject() {
                    processAjaxComplete();
                    $("#container-add-project-view").find('input, textarea, button').attr('disabled',false);

                  }

                  function successAddProject() {
                    $('#container-add-project-view').find('input, textarea').val('');
                    $('#container-add-project-view').find('#add-proj-image').attr('src', 'company/img/default-proj-pic.png');
                    $('#container-add-project-view').modal('hide');
                  }

                  function updateProjTotalCount() {
                    var count = +parseInt(sess.getItem('count')) + + 1;
                    sess.setItem('count', count);
                    location.reload(true);
                  }
        
            }

          }
       }
    });





//////////////////////////END ADD PROJECT ////////////////////




//////////////////////////EDIT PROJECT ////////////////////

      function setupEditProj(_this, number) {
       hideCurrentPage(function(hidden) {
        if(hidden) {

          
          $("#container-edit-project-view").show();
          editProjectCreation(listOfProj[number]);
        }
      });
    }



//For Adding all projects to View
  function editProjectCreation (proj) {
    $('.separate-proj').data('index', currentPos);
    $('.proj-body').data('id', proj._id);
    var createUrl = "http://www.liovinci.com/i/" + proj.url;
    $('.view-proj-profile').attr('href', createUrl);
    $('.proj-title').text(proj.title);
    $('.edit-descr-height').val(proj.description);
    var rd = proj.releaseDate;
    if(rd ===undefined || rd === null || rd == 0) {
      rd = "TBA"
    }
    $('#edit-release-date').val(rd);
    var picDef = "http://projects.liovinci.com/" + proj.defaultPicId;
    $('.proj-default-image').attr('src', picDef);
  
     

    hashtagsAdd();
    function hashtagsAdd() {
      $('.hashtags-list').empty();
      proj.tagsArray.forEach(function(x) {

        var tagsHtml = '<span class="hashtag">#'+x+'</span>'
        $('.hashtags-list').append(tagsHtml);
      });
    }
    
    function displayImages() {
      $('.proj-add-image').remove();
       //TODO FOR TESTING ADDING MULTIPLE IMAGES
     //since first pic is default pic
     if( proj.pictureArray.length > 1) {


        var gallery = $('.edit-extra-proj-pics');

         proj.pictureArray.forEach(function(pic) {
          //if multiple pics then just ignoring for default
           if(pic === proj.defaultPicId) {

           } else {

            var picStartUrl = "http://projects.liovinci.com/";
            var editProjPicHtml = '<div class="proj-add-image">'
              +' <img class="img-responsive img-center extra-proj-pic-img" src="' +  picStartUrl + pic+ '" alt="...">'
              +'<p class="edit-proj-picture edit-proj-default"><i class="glyphicon glyphicon-camera pull-left edit-proj-cam" onclick="ga(\'send\',\'event\',\'projects\',\'/picoptions\')"></i><span class="edit-proj-pic-text"> </span></p>'
              +'</div>';
              gallery.append(editProjPicHtml);              
               
           }
          });
         
          
      }

    

  }

  displayImages();

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    projPhasesAdd();
    function projPhasesAdd () {
      $('#cd-timeline2').empty();
      if(proj.phaseArray.length > 0) {
        var newSortedPhases = proj.phaseArray;

            newSortedPhases.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            });


            newSortedPhases.forEach(function(phase) {

              var newD = phase.date.split("T", 1);
              var dateC = new Date(newD);
              var phaseDate = new Date(dateC.getTime() + dateC.getTimezoneOffset()*60000);
              var phaseDay = phaseDate.getDate();
              var phaseMonthIndex = phaseDate.getMonth();
              var phaseYear = phaseDate.getFullYear();
              var phaseDateText = monthNames[phaseMonthIndex] + ' ' + phaseDay + ', ' +  + phaseYear;
              var picStartUrl = "http://phases.liovinci.com/";
               var phaseHtmlWithImage =   '<div data-phaseid="'+phase._id+'" class="cd-timeline-block">'
                +'<div class="cd-timeline-img cd-right">'
                  +'<img src="/company/img/liovinci-logo-icon.png" alt="liovinci">'
                +'</div> '
                +'<div class="cd-timeline-content">'
                  + '<div>'
                  +'<span class="cd-date phase-date">'+phaseDateText+'</span></div>'
                  +'<h2 class="phase-title">'+phase.title +'</h2>'
                  +'<p class="phase-text">' + phase.text+'</p>'
                  +'<img src="'+picStartUrl+ phase.picture +'"/>'
                +'</div> '
              +'</div> ';

                var phaseHtmlNOImage =   '<div class="cd-timeline-block">'
                +'<div class="cd-timeline-img cd-right">'
                  +'<img src="/company/img/liovinci-logo-icon.png" alt="liovinci">'
                +'</div> '
                +'<div data-phaseid="'+phase._id+'" class="cd-timeline-content">'
                + '<div>'
                  +'<span class="cd-date phase-date">'+phaseDateText+'</span></div>'
                  +'<h2 class="phase-title">'+phase.title +'</h2>'
                  +'<p class="phase-text">' + phase.text+'</p>'
                +'</div> '
              +'</div> ';

            

            if(phase.picture) {


               $('#cd-timeline2').append(phaseHtmlWithImage);
              } else {

                $('#cd-timeline2').append(phaseHtmlNOImage);
              }
          });
      }
    }
   

  }



//////////////////////////PROJECT EDIT DETAILS INFO ////////////////////
   $('#container-edit-project-view').on('click', '.edit-proj-cancel', function(){
        var _this = $(this);
      hideCurrentPage(function(hidden) {
        if(hidden) {
          $("#container-edit-project-view").hide();
          projectCreation(listOfProj[currentPos]);
          $("#container-projects-view").show();
        }
      });
     
    });


$('#container-edit-project-view').on('click', '.edit-proj-save', function(){
        var _this = $(this);
        editProjSaveProcess();
    });


  function editProjSaveProcess() {
    $("#container-edit-project-view").find('.validation-error').text("");
    if(newAjaxReqInit()) {
      $("#container-edit-project-view").find('input, textarea, button').attr('disabled',true);
      var newEditDescr = $('#edit-description').val();
      var newEditTags = $('#edit-hashtag').val();
      var newEditRelease = $('#edit-release-date').val();

      if(newEditTags.length > 0) {
        //removes all symbols and only keeps numbers and characters
       var cleanupTag = newEditTags.replace(/[^A-Za-z0-9#]/g,'');;

       //removes first hashtag
        var removeFirstHash = cleanupTag.replace(/^#/, '');

              //replaces all hashtags with commas
              var newTags = removeFirstHash.replace(/#/g ,',');

              //removes anywhite space in the entire string
              var tagsNoSpace = newTags.replace(/ /g,'');

              //turns tags into array to now lowercase and trim the tags and make sure no random commas
              var newTagArr = tagsNoSpace.split(',');
              var newTagStr ="";
              newTagArr.forEach(function(i){
                if(i.length> 0) {
                   var lowerC = i.toLowerCase();
                  var trimC = lowerC.trim();
                  newTagStr = newTagStr.concat(trimC + ",");
                }
               
              })

              newTagStr = newTagStr.replace(/,\s*$/, "");
      }
      
              if(newEditDescr.length > 0) {
                postEditProj();
              } else {
                $("#container-edit-project-view").find('.validation-error').text("Please fix the following errors: -You cannot leave the description blank.");
                    
                $("#container-edit-project-view").find('input, textarea, button').attr('disabled',false);
                processAjaxComplete();
              }

              function postEditProj() {

                var newEditProj = {
                  projId: listOfProj[currentPos]._id,
                  description: newEditDescr,
                  tags: newTagStr,
                  release: newEditRelease
                }
                
                   $.ajax({
                        type: "POST",
                        url: "/cEditProject",
                        data: newEditProj,
                      
                      success: function (data) {
                            if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableEditProject();
                              } else {
                                alert('Successfully added the project.');
                                enableEditProject();
                                successEditProject();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableEditProject();
                            }
                        }
                    });


                  function enableEditProject() {
                    processAjaxComplete();
                    $("#container-edit-project-view").find('input, textarea, button').attr('disabled',false);

                  }

                  function successEditProject() {
                    //updating manually here so no server grab needed
                    listOfProj[currentPos].description = newEditDescr;

                    if(newEditRelease.length > 0 ) {

                    listOfProj[currentPos].releaseDate = newEditRelease;
                    } 

                    if(newTagStr.length > 0) {
                      var tagWithComma = "," + newTagStr;
                      listOfProj[currentPos].tags = listOfProj[currentPos].tags.concat(tagWithComma);
                       var editTagsArr = newTagStr.split(',');
                 
                        editTagsArr.forEach(function(i){
                          listOfProj[currentPos].tagsArray.push(i);
                        });
                    }

                    location.reload(true);
                  }

              }


    }

  }



//////////////////////////END EDIT PROJECT ////////////////////


//////////////////////PICTURE EDIT DEFAULT////////////////////////////
    //to display option for default profile pic - only upload option
    $('#container-edit-project-view').on('mouseenter', '.edit-proj-default', function(){
          var _this = $(this);
        var picPar = _this.closest('.proj-add-image');
        picPar.find('.edit-proj-pic-text').text("Options");
    });

 //to hide options for default profile pic - only upload option
 $('#container-edit-project-view').on('mouseleave', '.edit-proj-default', function(){
         var _this = $(this);
        var picPar = _this.closest('.proj-add-image');
        picPar.find('.edit-proj-pic-text').text("");
    });

   $('#container-edit-project-view').on('click', '.edit-proj-default', function(){
        var _this = $(this);
        $('#projimageoptionsmodal').modal('show');
        var projTitle = $('#container-edit-project-view').find('.proj-title').text();
        $(".proj-img-title").text(projTitle);
        var imageSelect = _this.closest('.proj-add-image').find('.extra-proj-pic-img').attr('src');
        $('#extra-options-image').attr('src', imageSelect);
    });


      $('#container-edit-project-view').on('mouseenter', '.edit-proj-first-image', function(){
          var _this = $(this);
        var picPar = _this.css('opacity', 1.0);
      
    });

 //to hide options for default profile pic - only upload option
 $('#container-edit-project-view').on('mouseleave', '.edit-proj-first-image', function(){
         var _this = $(this);
        var picPar = _this.css('opacity', 0.5);

    });
 
    //pops up upload image modal
   $('#container-edit-project-view').on('click', '.edit-proj-first-image', function(){
        var _this = $(this);
        $('#uploadimagemodal').modal('show');
        var projTitle = $('#container-edit-project-view').find('.proj-title').text();
        $(".proj-img-title").text(projTitle);
    });


   //processes any button clicks
    $('#uploadimagemodal').on('click', 'button', function(){
        var _this = $(this);
      if(_this.hasClass('cancel-edit-proj-upload')) {
        $('#uploadimagemodal').modal('hide');
      }

      if(_this.hasClass('confirm-edit-proj-upload')) {
        addNewProjPic();
      }
       

       function addNewProjPic() {

           if(newAjaxReqInit()) {

           $("#uploadimagemodal").find('input, button').attr('disabled',true);
              var fileInput = $('#uploadimagemodal').find("input[type=file]")[0];
              var file = fileInput.files && fileInput.files[0];

              if( file ) {
                var img = new Image();

                img.src = window.URL.createObjectURL( file );

                  img.onload = function() {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL( img.src );

                    if( width == 640 && height == 480 ) {
                        
                        postNewProjPic();
                    }
                    else {
                        //fail
                            $("#uploadimagemodal").find('.validation-error').text("Please fix the following errors: -Your image is too big or small - 640x480");

                        $("#uploadimagemodal").find('input, button').attr('disabled',false);
                        processAjaxComplete();
                    }
                  };
                } else { 
                    $("#uploadimagemodal").find('.validation-error').text("Please fix the following errors: -No Image Found");

                            $("#uploadimagemodal").find('input, button').attr('disabled',false);
                            processAjaxComplete();
                }


                function postNewProjPic() {

                  var formData = new FormData();
                  formData.append('picture',fileInput.files[0]);
                  formData.append('projId', listOfProj[currentPos]._id);
               
              
                $.ajax({
                        type: "POST",
                        url: "/cAddMorePics",
                        data: formData,
                      processData: false, // Don't process the files
                      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                      

                      success: function (data) {
                            if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableEditProject();
                              } else {
                                alert('Successfully added the picture.');
                                enableEditProject();
                                successEditProject(data.picture);
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableEditProject();
                            }
                        }
                    });


                  function enableEditProject() {
                      processAjaxComplete();
                      $("#uploadimagemodal").find('input, button').attr('disabled',false);
                      $('#uploadimagemodal').modal('hide');
                  }

                  function successEditProject(pic) {
                      listOfProj[currentPos].pictureArray.push(pic);
                      addNewImageToGallery(pic);
                      $('#uploadimagemodal').find('#uploaded-proj-image').attr('src', 'company/img/default-proj-pic.png');
                  }

                  function addNewImageToGallery(pic) {

                      var gallery = $('.edit-extra-proj-pics');

                      

                          var picStartUrl = "http://projects.liovinci.com/";
                          var editProjPicHtml = '<div class="proj-add-image">'
                            +' <img class="img-responsive img-center extra-proj-pic-img" src="' +  picStartUrl + pic+ '" alt="...">'
                            +'<p class="edit-proj-picture edit-proj-default"><i class="glyphicon glyphicon-camera pull-left edit-proj-cam" onclick="ga(\'send\',\'event\',\'projects\',\'/gallerypicoptions\')"></i><span class="edit-proj-pic-text"> </span></p>'
                            +'</div>';
                            gallery.append(editProjPicHtml);              
                             
                
                  }
              }
           }
       }
    });

//////////////////////END PICTURE EDIT DEFAULT////////////////////////////


//////////////////////PICTURE EDIT OTHER PICS////////////////////////////
  

    $('#projimageoptionsmodal').on('click', 'button', function(){

        var _this = $(this);
        if(_this.hasClass('confirm-set-default')) {
          setNewProjDefault();
        }

        if(_this.hasClass('confirm-remove-proj-image')) {
          removeProjImage();
        }

        if(_this.hasClass('cancel-proj-image-options')) {
          $('#projimageoptionsmodal').modal('hide');
        }

      

       function setNewProjDefault() {
            if(newAjaxReqInit()) {
            $("#projimageoptionsmodal").find('button').attr('disabled',true);

          var imageSrc = $('#extra-options-image').attr('src');
          var theImage = imageSrc.substr(imageSrc.lastIndexOf('/') + 1);
          var projId = listOfProj[currentPos]._id;
          var newDefaultPic = {
            picture: theImage,
            projId: projId
          }

                $.ajax({
                        type: "POST",
                        url: "/cDefaultPic",
                        data: newDefaultPic,

                      success: function (data) {
                            if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableEditProject();
                              } else {
                                alert('Successfully set the picture as default.');
                                enableEditProject();
                                successEditProject();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableEditProject();
                            }
                        }
                    });


                  function enableEditProject() {
                      processAjaxComplete();
                       $("#projimageoptionsmodal").find('button').attr('disabled',false);
                      $('#projimageoptionsmodal').modal('hide');
                  }

                  function successEditProject() {
                      $('#projimageoptionsmodal').find('#extra-options-image').attr('src', 'company/img/default-proj-pic.png');
                      location.reload(true);
                  }
        }
       }
      


      function removeProjImage() {
        if(newAjaxReqInit()) {
            $("#projimageoptionsmodal").find('button').attr('disabled',true);

          var imageSrc = $('#extra-options-image').attr('src');
          var theImage = imageSrc.substr(imageSrc.lastIndexOf('/') + 1);
          var projId = listOfProj[currentPos]._id;
          var newRemovePic = {
            picture: theImage,
            projId: projId
          }
 
                $.ajax({
                        type: "POST",
                        url: "/cRemovePic",
                        data: newRemovePic,

                      success: function (data) {
                            if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableEditProject();
                              } else {
                                alert('Successfully removed the picture.');
                                enableEditProject();
                                successEditProject();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableEditProject();
                            }
                        }
                    });


                  function enableEditProject() {
                      processAjaxComplete();
                       $("#projimageoptionsmodal").find('button').attr('disabled',false);
                      
                      $('#projimageoptionsmodal').modal('hide');
                  }

                  function successEditProject() {
                      $('#projimageoptionsmodal').find('#extra-options-image').attr('src', 'company/img/default-proj-pic.png');
                    location.reload(true);
                  }
          
        }

      }
     
    });




//////////////////////END PICTURE EDIT OTHER PICS////////////////////////////


//////////////////////////ADD Phase ////////////////////


//for add
   $('#container-projects-view').on('click', '.add-phase-border', function(){

        var _this = $(this);
        $('#addphasemodal').modal('show');
        var thePar = _this.closest('.separate-proj');
        var projTitle = thePar.find('.proj-title:first').text();
        $(".proj-img-title").text(projTitle);
        var projId = thePar.children().eq(0).data('id');

     

   });



//for edit
  $('#container-edit-project-view').on('click', '.add-phase-border', function(){

        var _this = $(this);
        $('#addphasemodal').modal('show');
        var thePar = _this.closest('.separate-proj');
        var projTitle = thePar.find('.proj-title:first').text();
        $(".proj-img-title").text(projTitle);
        var projId = thePar.children().eq(0).data('id');


   });



   $("#new-phase-datepicker").datepicker({
      inline: true
    });



  $('#addphasemodal').on('click', 'button', function(){
    var _this = $(this);
      if(_this.hasClass('cancel-new-phase')) {
        $('#addphasemodal').modal('hide');
      }

      if(_this.hasClass('clear-new-phase')) {
        $('#addphasemodal').find('input, textarea').val('');
        $('#addphasemodal').find('#add-phase-image').attr('src', 'company/img/default-proj-pic.png');
      }

      if(_this.hasClass('submit-new-phase')) {
         if(newAjaxReqInit()) {
          $("#addphasemodal").find('input, textarea, button').attr('disabled',true);
          $("#addphasemodal").find('.validation-error').text("");
                   
           var fileInput = $('#addphasemodal').find("input[type=file]")[0];
           var file = fileInput.files && fileInput.files[0];
           var newPhaseTitle = $('#new-phase-title').val();
           var newPhaseText = $('#new-phase-text').val();
           var newPhaseDate = $('#new-phase-datepicker').val();

            if( file ) {
                var img = new Image();

                img.src = window.URL.createObjectURL( file );

                img.onload = function() {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL( img.src );

                    if( width == 400 && height == 300 ) {
                        continueToSubmitPhase();
                    }
                    else {
                        //fail
                        $("#addphasemodal").find('.validation-error').text("Please fix the following errors: -Your image is too big or small - 400x300");

                        $("#addphasemodal").find('input, textarea, button').attr('disabled',false);
                        processAjaxComplete();
                    }
                };
            } else { //No file was input or browser doesn't support client side reading
                        $("#addphasemodal").find('.validation-error').text("Please fix the following errors: -No image found");
                        $("#addphasemodal").find('input, textarea, button').attr('disabled',false);
                processAjaxComplete();
                        
            }


            //after picture check
            function continueToSubmitPhase() {
              if(newPhaseTitle.length > 0 && newPhaseTitle.length < 31 && newPhaseText.length > 0 && newPhaseText.length < 301 && newPhaseDate.length > 0) {
                postNewPhase();
              } else {
                        $("#addphasemodal").find('.validation-error').text("Please fix the following errors: -Fill out all fields");
  
                        $("#addphasemodal").find('input, textarea, button').attr('disabled',false);
                processAjaxComplete();
              }
            }

            function postNewPhase() {
                var formData = new FormData();
                formData.append('picture', fileInput.files[0]);

                formData.append('projId', listOfProj[currentPos]._id);
                formData.append('title', newPhaseTitle.trim());
                formData.append('text', newPhaseText.trim());
                formData.append('date', newPhaseDate);
                
              
                $.ajax({
                        type: "POST",
                        url: "/cAddPhase",
                        data: formData,
                      processData: false, // Don't process the files
                      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                      
                         success: function (data) {
                             if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableAddPhase();
                              } else {
                                alert('Successfully added the phase.');
                                enableAddPhase();
                                successAddPhase();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableAddPhase();
                            }
                        }
                    });



                  function enableAddPhase() {
                      processAjaxComplete();
                        $("#addphasemodal").find('input, textarea, button').attr('disabled',false);

                  }


                   function successAddPhase() {
                     $('#addphasemodal').find('input, textarea').val('');
                     $('#addphasemodal').find('#add-phase-image').attr('src', 'company/img/default-proj-pic.png');
                     $('#addphasemodal').modal('hide');
                     location.reload(true);
                   }
                  
            
                     
                      
            }

        }
        
      }
  
  }); 

//////////////////////////END ADD Phase ////////////////////

/////////////////////////EDIT PHASE ////////////////////




   $('#container-projects-view').on('click', '.phase-edit-border', function(){
        var _this = $(this);
        var theParent = _this.closest('.cd-timeline-block');
        var phaseDate, phaseTitle = "", phaseText ="", phasePic ="", phaseId ="", phaseInd = null;
        phaseId = theParent.data('phaseid');
        var phaseArr = listOfProj[currentPos];
        var theProjPhases = phaseArr.phaseArray;
        for(var x = 0; x < theProjPhases.length; x++) {
          if(theProjPhases[x]._id == phaseId) {
            phaseInd = x;
          }
        };
        var editPhaseDate = theProjPhases[phaseInd].date.split('T',1);
      
        //format might be different since saving it without reloading and diff format in db - vs / for date separation
        if(editPhaseDate.indexOf("-") > 0) {
          var formatDate = editPhaseDate[0].split("-");
          var year, month, day;
          var x = 1;
          formatDate.forEach(function(dateVal) {
            if(x === 1) {
              year = dateVal;
            }

            if(x === 2) {
              month = dateVal;
            }

            if(x === 3) {
              
              day = dateVal;
            }

            x++;
          })
          var  buildDate = month + "/" + day + "/" + year;
          phaseDate = buildDate;
        } else {
          phaseDate = editPhaseDate;
        }
        


        phaseTitle = theParent.find('.phase-title:first').text();
        phaseText = theParent.find('.phase-text:first').text();
        phasePic = theParent.find('.phase-picture:first').attr('src');
        if(phasePic )
        var newHtml = '<div class="cd-timeline-img cd-right">'
                  +'<img src="/company/img/liovinci-logo-icon.png" alt="liovinci">'
                +'</div> '
                +'<div data-phasepos="'+phaseInd +'"  class="cd-timeline-content">'
                  +'<div class="edit-phase-options"><span style="font-size:16px; margin-right: 5px;" class="phase-save-border phase-edit-save pull-right hidden-xs showopacity glyphicon glyphicon-ok" onclick="ga(\'send\',\'event\',\'phases\',\'/saveeditphase\')"/>'
                  +'<span style="font-size:16px; margin-right: 5px;" class="phase-save-border phase-edit-cancel pull-right hidden-xs showopacity glyphicon glyphicon-remove" onclick="ga(\'send\',\'event\',\'phases\',\'/canceleditphase\')"/></div>'
                  +'<div><span class="cd-date"><input class="edit-phase-date edit-phase-datepicker" type="text" name="phase-date" placeholder="Phase Date" class="date-on-top pull-right" value="'+ phaseDate +'"/></span></div>'
                  +'<input type="text" class="edit-phase-title" maxlength="30" value="'+phaseTitle +'"></input>'
                  +'<p class="pull-left counter-title margin-phase">Characters left: 30</p>'
                  +'<textarea class="edit-phase-text" maxlength="300">' + phaseText+'</textarea>'
                  +'<p class="counter-text">Characters left: 300</p>'
                  +'<img class="edit-phase-pic" src="'+phasePic +'"/>'
                   +'<div class="edit-phase"><i class="glyphicon glyphicon-camera pull-left edit-phase-cam edit-phase-pic e-ph-p-new-tooltip" onclick="ga(\'send\',\'event\',\'phases\',\'/piceditphase\')"></i>'
                   +'<span class="edit-pic-text"> </span></div>'
                   +'<div class="remove-phase" onclick="ga(\'send\',\'event\',\'phases\',\'/deleteeditphase\')">DELETE PHASE</div>'
                +'</div>';
        theParent.empty();
        theParent.append(newHtml);
        $(".edit-phase-datepicker").datepicker({
           inline: true
        });


        ///////////////PHASE EDIT OPTIONS
            $('#container-projects-view').off('click', '.phase-save-border');
        $('#container-projects-view').on('click', '.phase-save-border', function() {
            var _this1 = $(this);
          if(_this1.hasClass('phase-edit-cancel')) {

            phaseCanel(_this1);
           }


           if(_this1.hasClass('phase-edit-save')) {
             savePhase(_this1);
           }

        });


            $('#container-projects-view').off('click', '.remove-phase');
        $('#container-projects-view').on('click', '.remove-phase', function() {
          var _this1 = $(this);

              removePhase(_this1);
        });
 

  
    function phaseCanel(_this1) {
         var thePhaseCtPar = _this1.closest('.cd-timeline-content');
                
              var thePhaseInd = thePhaseCtPar.data('phasepos');
               var phaseArr = listOfProj[currentPos];
              var cancelProjPhase = phaseArr.phaseArray;
              var phase = cancelProjPhase[thePhaseInd];

              var newD = phase.date.split("T", 1);
              var dateC = new Date(newD);
              var phaseDate = new Date(dateC.getTime() + dateC.getTimezoneOffset()*60000);
              var phaseDay = phaseDate.getDate();
              var phaseMonthIndex = phaseDate.getMonth();
              var phaseYear = phaseDate.getFullYear();
              var phaseDateText = monthNames[phaseMonthIndex] + ' ' + phaseDay + ', ' +  + phaseYear;
              var picStartUrl = "http://phases.liovinci.com/";

               var phaseHtmlWithImage = '<div>'
                  +'<span class="cd-date phase-date">'+phaseDateText+'</span> <span style="font-size:16px; margin-right: 5px;" class="phase-edit-border pull-right hidden-xs showopacity glyphicon glyphicon-pencil" onclick="ga(\'send\',\'event\',\'phases\',\'/editphase\')"/></div>'
                  +'<h2 class="phase-title">'+phase.title +'</h2>'
                  +'<p class="phase-text">' + phase.text+'</p>'
                  +'<img class="phase-picture" src="'+picStartUrl+ phase.picture +'"/>'
                +'</div> ';

                var phaseHtmlNOImage =  '<div>'
                  +'<span class="cd-date phase-date">'+phaseDateText+'</span><span style="font-size:16px; margin-right: 5px;" class="phase-edit-border pull-right hidden-xs showopacity glyphicon glyphicon-pencil"/></div>'
                  +'<h2 class="phase-title">'+phase.title +'</h2>'
                  +'<p class="phase-text">' + phase.text+'</p>'
                +'</div> '
              +'</div> ';

            

                thePhaseCtPar.empty();
            if(phase.picture) {

                thePhaseCtPar.append(phaseHtmlWithImage);
              } else {

               thePhaseCtPar.append(phaseHtmlNOImage);
              }

          }


          function savePhase(_this1) {

            if(newAjaxReqInit()) {

              var _thisEdit =_this1;
              var theSaveParent = _thisEdit.closest('.cd-timeline-block');

              //disable 
              theSaveParent.find('input, textarea, button').attr('disabled',true);

              var succesAjaxParent = theSaveParent.find('.cd-timeline-content:first');
                var editPhaseDate, editPhaseTitle = "", editPhaseText ="", editPhasePic ="", editPhaseId ="", editPhaseInd = null;
                editPhaseId = theSaveParent.data('phaseid');
              

                editPhaseTitle = theSaveParent.find('.edit-phase-title:first').val();
                editPhaseText = theSaveParent.find('.edit-phase-text:first').val();
                editPhaseDate = theSaveParent.find('.edit-phase-date:first').val()

                //used for show new Phase
                var editPhasePic = theSaveParent.find('.edit-phase-pic:first').attr('src');
                
                 if(editPhaseTitle.length > 0 && editPhaseText.length > 0 && editPhaseDate.length > 0 ) {
                  postEditPhase();
                 } else {
                  alert("Please fix the following errors: Some of the fields are blank.")
                 }
               

                function postEditPhase() {

                   var editPhaseDetails = {
                    title: editPhaseTitle,
                    date: editPhaseDate,
                    text: editPhaseText,
                    phaseId: editPhaseId
                  };

                   $.ajax({
                      type: "POST",
                      url: "/cEditPhase",
                      data: editPhaseDetails,
                        success: function (data) {
                             if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableEditPhase();
                              } else {
                                alert('Successfully edited the phase.');
                                showNewPhase();
                                enableEditPhase();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableEditPhase();
                            }
                        }  
                     
                  });

              

                function showNewPhase() {
                    //since is in date format
                    var newDateC = new Date(editPhaseDetails.date);
                    var newPhaseDate = new Date(newDateC.getTime() + newDateC.getTimezoneOffset()*60000);
                    var newPhaseDay = newPhaseDate.getDate();
                    var newPhaseMonthIndex = newPhaseDate.getMonth();
                    var newPhaseYear = newPhaseDate.getFullYear();
                    var newPhaseDateText = monthNames[newPhaseMonthIndex] + ' ' + newPhaseDay + ', ' +  + newPhaseYear;
                  
                     var newPhaseHtmlWithImage = '<div>'
                        +'<span class="cd-date phase-date">'+newPhaseDateText+'</span> <span style="font-size:16px; margin-right: 5px;" class="phase-edit-border pull-right hidden-xs showopacity glyphicon glyphicon-pencil"/></div>'
                        +'<h2 class="phase-title">'+editPhaseDetails.title +'</h2>'
                        +'<p class="phase-text">' + editPhaseDetails.text+'</p>'
                        +'<img class="phase-picture" src="'+editPhasePic +'"/>'
                      +'</div> ';

                      var newPhaseHtmlNOImage =  '<div>'
                        +'<span class="cd-date phase-date">'+newPhaseDateText+'</span><span style="font-size:16px; margin-right: 5px;" class="phase-edit-border pull-right hidden-xs showopacity glyphicon glyphicon-pencil"/></div>'
                        +'<h2 class="phase-title">'+editPhaseDetails.title +'</h2>'
                        +'<p class="phase-text">' + editPhaseDetails.text+'</p>'
                      +'</div> '
                    +'</div> ';

                  

                      succesAjaxParent.empty();
                  if(editPhasePic) {

                      succesAjaxParent.append(newPhaseHtmlWithImage);
                    } else {

                     succesAjaxParent.append(newPhaseHtmlNOImage);
                    }
                }

                function enableEditPhase() {
                  theSaveParent.find('input, textarea, button').attr('disabled',false);
                  processAjaxComplete();
                }

                }
               

            }
           
          }



          function removePhase(_this1) {
              var theRemParent = _this1.closest('.cd-timeline-block');
              var remTitle = theRemParent.find('.edit-phase-title:first').val();
               var remPhaseId = theRemParent.data('phaseid');
              $('.remove-phase-title').text(remTitle);
              $('#removephasemodal').modal('show');

              $('.confirm-remove-phase').unbind();
              $('.confirm-remove-phase').click(function(e) {

                postRemovePhase();
                 
              })

               $('.cancel-remove-phase').click(function(e) {
                
              $('#removephasemodal').modal('hide');
              })

            
            function postRemovePhase() {

               if(newAjaxReqInit()) {
                  
                
              //disable 
              theRemParent.find('input, textarea, button').attr('disabled',true);

              var remPhaseId = theRemParent.data('phaseid');
              
                var removePhaseDetails = {
                    phaseId: remPhaseId
                  };

                   $.ajax({
                      type: "POST",
                      url: "/cRemovePhase",
                      data: removePhaseDetails,
                        success: function (data) {
                             if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableRemPhase();
                              } else {
                                alert('Successfully removed the phase.');
                                successRemovePhase();
                                enableRemPhase();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableRemPhase();
                            }
                        }  
                     
                  });

                }
            }
           

            function successRemovePhase() {

                //removes itself too
                theRemParent.remove(); 
                location.reload();
            }

            function enableRemPhase() {
              processAjaxComplete();
              theRemParent.find('input, textarea, button').attr('disabled',false);
            }
          

          }












    });



////////////////////// EDIT PHASE PICS////////////////////////////
   


      //to display option for default profile pic - only upload option
    $('#container-projects-view').on('mouseenter', '.edit-phase-pic', function(){
          var _this = $(this);
        var picPar = _this.closest('.edit-phase');
        picPar.find('.edit-pic-text').text("Change Pic");
      
     
    });

 //to hide options for default profile pic - only upload option
 $('#container-projects-view').on('mouseleave', '.edit-phase-pic', function(){
           var _this = $(this);
        var picPar = _this.closest('.edit-phase');
        picPar.find('.edit-pic-text').text("");
      
     
   
    });
   

   $('#container-projects-view').on('click', '.edit-phase-pic', function(){
        var _this = $(this);
        $('#uploadphaseimagemodal').modal('show');
        var thePar = _this.closest('.separate-proj');
        var projTitle = thePar.find('.proj-title:first').text();
        var phaseTitle = _this.closest('.cd-timeline-block').find('.edit-phase-title:first').val();
        var image = _this.closest('.cd-timeline-block').find('.edit-phase-pic:first').attr('src');
        $('#upload-phase-image').attr('src',image);
        $(".proj-img-title").text(projTitle + " - " + phaseTitle);
      
        var thePhaseParent = _this.closest('.cd-timeline-block');
        var phaseId = thePhaseParent.data('phaseid');
              
         $('#upload-phase-id').data('id', phaseId);
            
    });


   $('#uploadphaseimagemodal').off();
  $('#uploadphaseimagemodal').on('click', 'button', function(){
    var _this = $(this);
      if(_this.hasClass('cancel-update-ph-pic')) {
        $('#uploadphaseimagemodal').modal('hide');
      }

       if(_this.hasClass('confirm-update-ph-pic')) {
          postNewPic();
       }
});
  
     function postNewPic() {
        $("#uploadphaseimagemodal").find('.validation-error').text("");
         if(newAjaxReqInit()) {
          $("#uploadphaseimagemodal").find('input, textarea, button').attr('disabled',true);
             var fileInput = $('#uploadphaseimagemodal').find("input[type=file]")[0];
           var file = fileInput.files && fileInput.files[0];
          
            if( file ) {
                var img = new Image();

                img.src = window.URL.createObjectURL( file );

                img.onload = function() {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL( img.src );

                    if( width == 400 && height == 300 ) {
                        
                        postNewPhasePic();
                    } else {
                        //fail
                            $("#uploadphaseimagemodal").find('.validation-error').text("Please fix the following errors: -Your image is too big or small - 400x300");

                        $("#uploadphaseimagemodal").find('input, textarea, button').attr('disabled',false);
                        processAjaxComplete();
                    }
                };
            } else { 
                $("#uploadphaseimagemodal").find('.validation-error').text("Please fix the following errors: -No Image Found");

                        $("#uploadphaseimagemodal").find('input, textarea, button').attr('disabled',false);
                        processAjaxComplete();
            }
        


             function postNewPhasePic() {
                var phaseId =  $('#upload-phase-id').data('id');
                var formData = new FormData();
                formData.append('picture', fileInput.files[0]);

                formData.append('phaseId', phaseId);
                
              
                $.ajax({
                        type: "POST",
                        url: "/cNewPhasePic",
                        data: formData,
                      processData: false, // Don't process the files
                      contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                      
                         success: function (data) {
                             if(data) {
                              if(data.errorType > 0) {
                                alert('An error has occured - the error number is ' + data.errorType );
                                enableAddPhase();
                              } else {
                                alert('Successfully added the phase.');
                                enableAddPhase();
                                successAddPhase();
                              }
                            } else {
                              alert("Server has not returned anything.");
                              enableAddPhase();
                            }
                        }
                    });



                  function enableAddPhase() {
                      processAjaxComplete();
                      $("#uploadphaseimagemodal").find('input, textarea, button').attr('disabled',false); 

                  }


                   function successAddPhase() {
                      alert("Your phase image has been updated!")
                      $('#uploadphaseimagemodal').find('#uploaded-proj-image').attr('src', 'company/img/default-proj-pic.png');
                      $('#uploadphaseimagemodal').modal('hide');
                   }
                  
                 
           
          }



         }

     }

        

//////////////////////END EDIT PHASE PICS////////////////////////////



});      

   






        