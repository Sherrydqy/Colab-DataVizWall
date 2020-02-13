var geography;
var sum = 0;
var originalColor, originalOpacity,url, whichGeo;
var margin = {top: 10, right: 10, bottom: 10, left: 291},
    width =  window.innerWidth- margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;
var g;
d3.csv("./data/lowe-art-all.csv").then(function(data){
  //The call to console.log() is made directly after the d3.json() returned. Thus, the server might not have sent the reply fully yet. Therefore, you can only access data when the callback is returned.
   geography = d3.nest()
    .key(function(d){return d.collection;})
    .rollup(function(v){return v.length;})
    .entries(data);
    geography.forEach(function(d){
      console.log(d.value);
      sum+=d.value;
    });
    g = d3.select("body")
          .append("svg")
          .attr("viewBox", [0,0,width,height]);

    var svg = g.append("g");
               //.attr("cursor", "grab");
    g.call(d3.zoom()
               .extent([[0,0],[width,height]])
               .scaleExtent([1,8])
               .on("zoom", zoomed));

    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }
    svg.call(d3.zoom()
            .extent([[0,0],[width,height]])
            .scaleExtent([1,8])
            .on("zoom", zoomed));

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
console.log(geography);
    var layout = d3.layout.cloud()
      .size([width, height])
      .words(geography.map(function(d) {return {text: d.key, size: d.value}; }))
      .padding(25)        //space between words
      .rotate(function() { return ~~(Math.random()*2 ) * 90; })
      .fontSize(function(d) {
        console.log(d.text+", "+d.size/sum*(width*height/100)+200);
        return d.size/sum*(width*height/3500)+20;
      })      // font size of words
      .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
      console.log(words);
      g = svg.append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
            .style("font-size", function(d) { return d.size; })
            .style("fill", "#69b3a2")
            .style("opacity",function(d){return d.size/sum+0.7;})
            .attr("text-anchor", "middle")
            .style("font-family", "Garamond")
            .attr("transform", function(d) {

              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; })
            .on("mouseover",function(d){
              var selectedGeo = d.text;
              console.log(selectedGeo);
              originalColor = d3.select(this).style("fill");
              originalOpacity = d3.select(this).style("opacity");
              whichGeo = d.text;
              console.log(originalColor);
              d3.select(this)
                .style("fill","orange")
                .style("opacity","1.0")
                .style("cursor","pointer");
            })
            .on("mouseout",function(d){
              whichGeo = null;
              d3.select(this)
                .style("fill",originalColor)
                .style("opacity",originalOpacity)
                .style("cursor","default");
            })
            .on("click",function(d){
              url = "home-whichGeo.html?index="+whichGeo;
              window.location.href = url;
            });
          //  inf_ctx.updateChunks();

    }



       return g.node();
});






// append the svg object to the body of the page
