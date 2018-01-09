var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')
var d3 = require('d3');

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})


var board = new five.Board();
var valueDiv = document.querySelector("#plantValue");




                       



board.on("ready", function() {
  
  var sensor = new five.Sensor({
  pin: "A0", 
  freq: 250, //emits data events every 250ms
  threshold: 2 //emits change events when the ADC value has changed by +2/-2

  
});
 

  
  sensor.on("change", function() { //could use "data" as well
    //var sensorInfo = this.value;
    //alueDiv.innerHTML = sensorInfo;
    //supposed to range from 0-1023, will have to calibrate
    var percentage = map_range(this.value, 1023, 374, 0, 100);
    var finalValue = Math.floor(percentage);
    valueDiv.innerHTML = finalValue + "%";



        var limit = 60 * 1,
            duration = 750,
            now = new Date(Date.now() - duration)

        var width = 500,
            height = 200

        var groups = {
            
            target: {
                value: 0,
                color: 'green',
                data: d3.range(limit).map(function() {
                    return 0
                })
            },
           
        }

        
        var x = d3.time.scale()
            .domain([now - (limit - 2), now - duration])
            .range([0, width])

        var y = d3.scale.linear()
            .domain([0, 100])
            .range([height, 0])

        var line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function(d) {
                return y(d)
            })

        var svg = d3.select('#chart').append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height + 50)

        var axis = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))

        var paths = svg.append('g')

        for (var name in groups) {
            var group = groups[name]
            group.path = paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style('stroke', group.color)
        }

        function tick() {
        now = new Date()

            // Add new values
            for (var name in groups) {
                var group = groups[name]
                //group.data.push(group.value) // Real values arrive at irregular intervals
                group.data.push(20 + Math.random() * 100)
                group.path.attr('d', line)
            }

            // Shift domain
            x.domain([now - (limit - 2) * duration, now - duration])

            // Slide x-axis left
            axis.transition()
                .duration(duration)
                .ease('linear')
                .call(x.axis)

            // Slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease('linear')
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .each('end', tick)

            // Remove oldest data point from each group
            for (var name in groups) {
                var group = groups[name]
                group.data.shift()
            }
        }

        tick()


//     d3.select("#chart")
//     .append("svg")
//     .attr('width', 600)
//     .attr('height', 600);

// var circles = svg.Container. selectAll("circle")
//                           .data("finalValue")
//                           .enter()
//                           .append("circle")

//   var circleAttributes = circles
//                        .attr("cx", "50")
//                        .attr("cy", "50")
//                        .attr("r", function (d) { return d; })
//                       .style("fill", "green"); 
  
  });




  //I notice the sensor didn't fall all the way to 0, but instead stopped at 400
  //Going to need to research and implement a Remap or Map function in Javascript

function map_range(value, low1, high1, low2, high2){
  return low2 + (high2-low2) * (value - low1)/(high1-low1);
}


// d3.select("#chart")
//     .append("svg")
//     .attr('width', 300)
//     .attr('height', 300);

// var circles = svg.Container. selectAll("circle")
//                           .data("finalValue")
//                           .enter()
//                           .append("circle")

//   var circleAttributes = circles
//                        .attr("cx", "50")
//                        .attr("cy", "50")
//                        .attr("r", function (d) { return d; })
//                       .style("fill", "green"); 






});



 
