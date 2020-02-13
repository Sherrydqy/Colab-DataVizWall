
var windowHeight = window.innerHeight;

function testhide(){
  document.getElementById("jssor_1").style.visibility="hidden";
}
function testshow(){
  document.getElementById("jssor_1").style.visibility="visible";
}
  window.jssor_1_slider_init = function() {
      var jssor_1_options = {
        $SlideWidth: 920,
      };
      var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
      window.jssor_1_slider_init = function() {

          var jssor_1_options = {
            $AutoPlay: 1,
            $SlideWidth: 720,
            $ArrowNavigatorOptions: {
              $Class: $JssorArrowNavigator$
            },
            $BulletNavigatorOptions: {
              $Class: $JssorBulletNavigator$
            }
          };

          var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

          /*#region responsive code begin*/

          var MAX_WIDTH = 980;

          function ScaleSlider() {
              var containerElement = jssor_1_slider.$Elmt.parentNode;
              var containerWidth = containerElement.clientWidth;

              if (containerWidth) {

                  var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

                  jssor_1_slider.$ScaleWidth(expectedWidth);
              }
              else {
                  window.setTimeout(ScaleSlider, 30);
              }
          }

          ScaleSlider();

          $Jssor$.$AddEvent(window, "load", ScaleSlider);
          $Jssor$.$AddEvent(window, "resize", ScaleSlider);
          $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
          /*#endregion responsive code end*/
      };



      document.getElementById("jssor_1").style.width="100%";
      document.getElementById("jssor_1").style.height="100%";
    //  document.getElementById("jssor_1").style.marginTop="20%";
      document.getElementById("jssor_1").style.visibility="visible";
      document.getElementById("slides").style.height=windowHeight+"px";
      document.getElementById("img1").style.backgroundImage = 'url(../assets/001.jpg)';
      document.getElementById("img2").style.backgroundImage = 'url(../assets/005.jpg)';
      window.jssor_1_slider_init = function() {

          var jssor_1_options = {
            $AutoPlay: 1,
            $SlideWidth: 720,
            $ArrowNavigatorOptions: {
              $Class: $JssorArrowNavigator$
            },
            $BulletNavigatorOptions: {
              $Class: $JssorBulletNavigator$
            }
          };

        };
  };
//
