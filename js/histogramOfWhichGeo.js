var theCollection = window.location.href.split("=")[1];
console.log(theCollection);
var prefix = "https://emuseum1.as.miami.edu";
var margin = {top: 10, right: 10, bottom: 10, left: 291},
    width =  window.innerWidth- margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;
    x = margin.left +10;
    y = margin.top;
var regNumber = /^\d{4}$/;
var regString = RegExp('')
var filteredCollection = [];
var displayData;
var displayDataCount = [];
var j = 0;
var intervalOfArts = 300;
var intervalofYears = 200;
var artWidth = 150;
var artHeight = 200;

var btnColor = d3.select("#btn_color");
btnColor.on("mouseover", function(){
  d3.select(this).style("cursor","pointer");
});
btnColor.on("mouseout", function(){
  d3.select(this).style("cursor","none");
});
btnColor.on("click",function(){
  url = "colorOfWhichGeo.html";
  window.location.href = url;
});

d3.csv("../data/lowe-art-all.csv").then(function(data){
  var thisCollection = _.filter(data, {'collection': theCollection});
              g = d3.select("body")
                    .append("svg")
                    .attr("viewBox", [0,0,width*20,height*20]);

              var svg = g.append("g");2
                         //.attr("cursor", "grab");
              g.call(d3.zoom()
                         .extent([[0,0],[width,height]])
                         .scaleExtent([1,40])
                         .on("zoom", zoomed));
/*              function dragstarted() {
                d3.select(this).raise();
                svg.attr("cursor", "grabbing");
              }

              function dragged(d){
                d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
              }
              function dragended() {
              svg.attr("cursor", "grab");
              }*/

              function zoomed() {
                svg.attr("transform", d3.event.transform);
              }

              svg.call(d3.zoom()
                      .extent([[0,0],[width,height]])
                      .scaleExtent([0.1,8])
                      .on("zoom", zoomed));

  thisCollection.forEach(function(d,i){

    console.log(typeof(d.display_date));
    if(typeof(d.display_date) === "number" && regNumber.test(d.display_date) == true){
      filteredCollection[j] = d;
      filteredCollection[j].display_date = d.display_date.toString();
      j++;

    } else if(typeof(d.display_date) === "string" && regNumber.test(d.display_date.slice(0,4)) == true){
        //console.log("String: "+regNumber.test(d.display_date.slice(0,4))+d.display_date.slice(0,4));
        filteredCollection[j] = d;
        filteredCollection[j].display_date = d.display_date.slice(0,4);
        j++;
    }
  });

      displayData = _.groupBy(filteredCollection,'display_date');
      //  console.log(displayData);
        var maxAmountPerYear=0;
        var k = 0;
        for (var key in displayData){ //遍历所有的key值
          displayDataCount[k] = displayData[key].length;
          k++
          if(displayData[key].length>maxAmountPerYear){
            maxAmountPerYear = displayData[key].length;
          }
        }
        console.log(displayDataCount);
      var allYears = Object.keys(displayData);
      svg.attr("width",maxAmountPerYear*20+30 )
         .attr("height", allYears.length * 30 +20);
      var yScale = d3.scaleBand()
                     .domain(allYears)
                     .range([0, allYears.length*intervalofYears])
                     .paddingInner(10);
      var l = 0;

      for (var key in displayData){
        for(var m=0;m<displayData[key].length;m++){
          svg.append("defs")
             .append("pattern")
             .attr("x", 0)
             .attr("y", 0)
             .attr("width", 1)
 			       .attr("height", 1)
             .attr("id", "bg"+key+m)
             .append("image")
             .attr("x", 0)
             .attr("y", 0)
    			   .attr("width", artWidth)
 			       .attr("height", artHeight)
             .attr("xlink:href", prefix+displayData[key][m].primary_media);
           }
        var barData = svg.append("g")
                          .attr("id","y"+l)
                          .style("left", margin.left)
                          .style("top",margin.top+intervalofYears*l)
                          .selectAll("rect")
                          .data(displayData[key])
                          .enter()
                          .append("rect")
                          .attr("id","rect-"+key+"-"+m)
                          .attr("x", function(d,m){
                            return (m*(artWidth+10)+10);
                          })
                          .attr("y", intervalofYears*l-100)
                          .attr("width", artWidth)
                          .attr("height", artHeight)
                          .attr("fill",function(d,m){
                            return "url(#bg"+key+m+")";
                          });



    l++;

      }
      yAxis = d3.axisLeft()
                .scale(yScale);
      svg.append("g")
         .attr("class", "y-axis-year")
        // .attr("transform", "translate("+margin.left+","+margin.top+")")
         .call(yAxis);
    });
