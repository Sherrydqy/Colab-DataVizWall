var margin = {top: 10, right: 10, bottom: 10, left: 291},
    width =  window.innerWidth- margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;
    x = margin.left +10;
    y = margin.top;
var prefix = "https://emuseum1.as.miami.edu";
var sortedCollections=[];
var column = 100;
var intervalOfArts = 300;
var artWidth = 150;
var artHeight = 200;
var totalArts;
var remainder;
var row;

var flagCancel = 0;
var btnC = d3.select("#btn_cancle");
btnC.on("mouseover", function(){
  d3.select(this).style("cursor","pointer");
});
btnC.on("mouseout", function(){
  d3.select(this).style("cursor","none");
});



d3.csv("../data/art-of-europe-color.csv").then(function(data){
  //console.log(_.sortBy(data,"dominantColor"));
    sortedCollections = _.sortBy(data, "dominantColor");
    totalArts = sortedCollections.length;
    row = parseInt(totalArts/column);
    remainder = totalArts - (row*column);
    console.log(row*column+remainder);
    g = d3.select("body")
          .append("svg")
          .attr("viewBox", [0,0,width*15,height*15])
          .style("marginTop",-300+"px")
          .style("z-index",0);

    var svg = g.append("g");
               //.attr("cursor", "grab");
    g.call(d3.zoom()
               .extent([[0,0],[width,height]])
               .scaleExtent([1,40])
               .on("zoom", zoomed));
    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }

    svg.call(d3.zoom()
            .extent([[0,0],[width,height]])
            .scaleExtent([0.1,8])
            .on("zoom", zoomed));

    var colorSvg = svg.append("g")
                      .attr("id", "colorChart");

    for (var i=0; i<row; i++){
      for (var j=0; j<column; j++){
        svg.append("defs")
           .append("pattern")
           .attr("x", 0)
           .attr("y", 0)
           .attr("width", 1)
           .attr("height", 1)
           .attr("id", "pic"+"-"+i+"-"+j)
           .append("image")
           .attr("x", 0)
           .attr("y", 0)
           .attr("width", artWidth)
           .attr("height", artHeight)
           .attr("xlink:href", prefix+sortedCollections[i*column+j].primary_media);
        colorSvg.append("rect")
                .attr("id","rect"+"-"+i+"-"+j)
                .style("left", margin.left)
                .style("top",margin.top+intervalOfArts*i)
                .attr("x", j*artWidth+intervalOfArts)
                .attr("y", i*artHeight+intervalOfArts)
                .attr("width", artWidth)
                .attr("height", artHeight)
                .attr("fill",function(d,m){
                  return "url(#pic"+"-"+i+"-"+j+")";
                })
                .on("mouseover",function(){
                  d3.select(this).attr("cursor","pointer");
                })
                .on("mouseout", function(){
                  d3.select(this).attr("cursor","none");
                })
                .on("click",function(){
                  document.getElementById("lightBoxBg").style.visibility="visible";
                  flag = 1;

                  var thisI = parseInt(d3.select(this).attr("id").split("-")[1]);
                  var thisJ = parseInt(d3.select(this).attr("id").split("-")[2]);
                  console.log("i: "+thisI);
                  console.log("j: "+thisJ);
                document.getElementById("thisImg").style.backgroundImage = "url("+prefix+sortedCollections[thisI*column+thisJ].primary_media+")";
              document.getElementById("slideTitle").innerHTML = sortedCollections[thisI*column+thisJ].title;
              document.getElementById("slideInfoMaker").innerHTML = sortedCollections[thisI*column+thisJ].people;
              document.getElementById("slideInfoDate").innerHTML = sortedCollections[thisI*column+thisJ].display_date;
              document.getElementById("slideInfoMedium").innerHTML = sortedCollections[thisI*column+thisJ].medium;
              document.getElementById("slideInfoDimension").innerHTML = sortedCollections[thisI*column+thisJ].dimensions;
              //
            });
            }
          }
});
