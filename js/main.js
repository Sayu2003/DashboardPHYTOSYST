var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')

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

d3.select("#chart")
    .append("svg")
    .attr('width', 200)
    .attr('height', 200);

var circles = svg.Container. selectAll("circle")
                          .data("finalValue")
                          .enter()
                          .append("circle")

  var circleAttributes = circles
                       .attr("cx", 50)
                       .attr("cy", 50)
                       .attr("r", function (d) { return d; })
                      .style("fill", "green");                        




//  //var svgContainer = d3.select("chart").append("svg")
//                                      .attr("width", 600)
//                                     .attr("height", 100);
 
//  var circles = svgContainer.selectAll("circle")
//                            .data(finalValue)
//                            .enter()
//                           .append("circle")

// var circleAttributes = circles
//                        .attr("cx", 50)
//                        .attr("cy", 50)
//                        .attr("r", function (d) { return d; })
//                       .style("fill", "green");

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
    var percentage = map_range(this.value, 1023, 400, 0, 100);
    var finalValue = Math.floor(percentage);
    valueDiv.innerHTML = finalValue;
  
  });

  //I notice the sensor didn't fall all the way to 0, but instead stopped at 400
  //Going to need to research and implement a Remap or Map function in Javascript

function map_range(value, low1, high1, low2, high2){
  return low2 + (high2-low2) * (value - low1)/(high1-low1);
}



});



 
