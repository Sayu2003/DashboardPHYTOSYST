var data = [{
      "city":"Monday",
      "male": 79,
      "female": 21
    

    }, {
      "city": "Tuesday",
      "male": 82,
      "female": 18
    
    }, {
      "city": "Wednesday",
      "male": 78,
      "female": 22
     
    }, {
      "city": "Thursday",
      "male": 90,
      "female": 10
     
    }, {
      "city": "Friday",
      "male": 79,
      "female": 21
     
    }, {
      "city": "Saturday",
      "male": 86,
      "female": 14
     
    }, {
      "city": "Sunday",
      "male": 97,
      "female": 3
     
    }];

 // Variables



var margin = { top: 40, 
               right: 30,
               bottom: 30, 
               left: 40
        };
              var  width =500;
               var  height = 500;

var barWidth= 40;
var color = d3.scaleOrdinal()
    .range(["#E8D1FF","#11B5F0"]);
var labels= ["Female","Male"]

var x = d3.scaleBand()
         .domain(data.map(function(d) {
         return d.city
          }))
        .range([0, width ]);

 var y1 = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) {
          return d.male
          })])
         .range([height, 0]);

  var y2 = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) {
          return d.female
          })])
         .range([height, 0]);
       

  var bar = d3.select("#chartone")
           .data(data)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.axisBottom(x)
              bar.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis);

  bar.append("g")
             .attr("class", "axis")
            .call(d3.axisLeft(y1));

   var graficos = bar.selectAll('rect')
                   .data(data);

      bar.selectAll("text")
                  .data(function(d)
                   {
                    return d.female;
                  })
                  .enter()
                  .append("text");
  

//MAle
    var Malebar = graficos.enter();

    Malebar.append('rect')
      .attr('x', function(d, i) {
        return x(d.city);
      })
      .attr('y', function(d, i) {
        return y1(d.male);
      })
      .attr('height', function(d, i) {
        return height - y1(d.male)
      })
      .attr('width', barWidth)
      .attr("transform", "translate(" + 30 + ",0)")
      .style('fill', "#11B5F0")
      .attr('class', 'bar')
     
     
      

 Malebar.append("text")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .text(function(d)
         {
          return d.male;
         })

         .style('fill',"#ffff")
         .attr('x', function(d, i) {
        return x(d.city);
      })
      .attr('y', function(d, i) {
        return y1(d.male);
      })
      .attr('height', function(d, i) {
        return height - y1(d.male)
      })
      .attr('width', barWidth)
      .attr("transform", "translate(" + 45 + ",0)");
     