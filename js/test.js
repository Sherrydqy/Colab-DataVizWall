 var canvas = document.getElementById('canvas'),    //  获取页面里SVG元素   
 svgCtx = d3.select('#svgCanvas'),    //  创建canvas上下文   
 canvasCtx = canvas.getContext('2d');//  绘制路径，既能适应canvas有能适应svg
 function drawPath(context) {   
   context.moveTo(10, 10);   
   context.lineTo(110, 150);   
   context.lineTo(210, 10);   
   context.lineTo(310, 150);
 }//  用canvas绘制图形
 function drawInCanvas() {    //  调用路径绘制方法   
   drawPath(canvasCtx);    //  设置渲染方式   
   canvasCtx.lineWidth = 1;   
   canvasCtx.strokeStyle = 'blue';   
   canvasCtx.stroke();
 }//  用SVG绘制图形
 function drawInSvg() {    //  创建SVG路径绘制上下文   
   var canvas = d3.path();    //  调用路径绘制方法   
   drawPath(canvas);   
   svgCtx.append('path')            //  设置路径参数          
   .attr('d', canvas.toString())           //   设置渲染方式          
   .attr('stroke-width', '1px')          
   .attr('stroke', 'blue')          
   .attr('fill', 'none');
 }//  调用canvas绘制方法drawInCanvas();//  调用SVG绘制方法drawInSvg();
