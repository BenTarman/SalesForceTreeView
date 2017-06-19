({

	init : function(component, event, helper)
	{

	},
	

    
    buildTree : function(component)
    {
    
     
            
   var svg = d3.select('div.container');
   
   clearStuff();


        //get most recent array of relationships
        var relationships = component.get("v.relationships");
        var work = component.get("v.work");
        
        
    
      if(relationships.length == 0 )
    	  return;
      
      

       
        

    
    
       //Width and height
    var svgWidth = 400 * work.length;

    var svgHeight = 1800;
    			     //Create SVG element
    svg = svg.append("svg")
            .attr("width", 400*10)
            .attr("height", 900)
            //.attr("transform", "translate(-1000,-200)") initial x/y position pre much.
             .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")
  
  

  	
	function makeTree()
	{      

        	
        var parents = [];
        var childs = [];
        
        for (let i = 0; i < relationships.length; i++)
        {
        	parents[i] = relationships[i].agf__Parent_Work_Subject__c;
        	childs[i] = relationships[i].agf__Child_Subject__c;
        }
           
        
      
    	
           
          var posX = 0, posY = 200;
         var x = 200, y = 400; //where central node is located (these values don't really matter its all relative
         											//should look into this.
 
 var linkDistance = 120;
 
 
    var circleRadius = 20;
    var changeX = 100;
    var changeY;
    //Original data
        

        
    	
  

    
    


       
           function database()
           { 
        	   this.centre;
        	   this.child = new Set();
        	   this.parent = new Set();
           }

       var idNumber = 0;
       
 
       
 for (var i = 0; i < work.length; i++)
 {
 		 var nodes = [];     
         var edges = [];
        
        
        if (i % 2 === 0)
   					posY = 1200;
        else
        {
        posX = posX+700;
        posY = 300;
        }
          
 	       
      
      	test = work[i].agf__Subject__c;
           
         var data = new database();
         
         var target = 0;
         
         //this corresponds to the initial node
        nodes.push({"name": test, "x": posX, "y": posY, "fixed": true, "color": "#167005"}); 
		
     		//These 2 recurisve functions generate my nodes and edges array just fine. 
         buildParents(childs, parents, test);
         
         target = data.parent.size;
         
         buildChildren(childs, parents, test);
         
         //apply id to each node
      
  			nodes.forEach(function(d) {
        d.generatedId='id'+idNumber;
        idNumber++;
        });
  
   
				//build makes the force-directed layout.
   			    build(nodes, edges, posX, posY);
    
}
        
  
      
      

		
			
 

           function buildParents(childs, parents, test)
           {      
          
             
       //LOOK UP OBJECT
     var lookup = {};
for (var i = 0, len = nodes.length; i < len; i++) {
    lookup[nodes[i].name] = nodes[i];
}

     
        	   for (var i = 0; i < parents.length; i++)
        	   {
        		   if (test === childs[i])
        		   {
               //calculate positionings
        	 			 x = x - changeX;
    						changeY =  Math.round(Math.sqrt(Math.pow(linkDistance, 2) - Math.pow(changeX, 2)));
    						y = y - changeY;
    			 
        			
                 data.parent.add(parents[i]);
        			 //this node corresponds to the parents
			nodes.push({"name": parents[i], "x":  Math.round(x), "y":  Math.round(y), "fixed": true, "color": "#0e029a"});

					target++;
          
					
         
          
            edges.push({"source": nodes.indexOf(lookup[test]), "target": target});
             test = parents[i];
          
        			   buildParents(childs, parents, test);
        			   test = childs[i]; //reset incase we have more parents for current loop
                 
                 //reset y coordinate, shift x coordinate rightwards (probably adjust this a lot)
                 	 x = x + changeX + changeX + changeX;
                   y = y + changeY;
        		   }
        	   }
           }
	
  
	
      
           function buildChildren(childs, parents, test)
           {
  
     //LOOK UP OBJECT
     var lookup = {};
for (var i = 0, len = nodes.length; i < len; i++) {
    lookup[nodes[i].name] = nodes[i];
}

        	  
        	   for (var i = 0; i < childs.length; i++)
        	   {
        		   if (test === parents[i])
        		   {
                //calculate positionings
        	 			 x = x - changeX;
    						changeY =  Math.round(Math.sqrt(Math.pow(linkDistance, 2) - Math.pow(changeX, 2)));
    						y = y + changeY;
        	
        			   
        			  
                 data.child.add(childs[i]);
        			 //this node corresponds to all the children
				nodes.push({"name": childs[i], "x":  Math.round(x), "y":  Math.round(y), "fixed": true, "color": "#630a94"});


			target++;
					
          edges.push({"source": nodes.indexOf(lookup[test]), "target": target});
             test = childs[i];
            		
         
       
   
        		 buildChildren(childs, parents, test);
                
                
        			   test = parents[i]; //reset incase we have more children for current loop
                
              
                 	 x = x + changeX + changeX + changeX;
                   y = y - changeY;
        		   }
        	   }
           }  
  
  		

  

function build(nodes, edges, centerX, centerY)
{

    
    var simulation = d3.forceSimulation()
    
            .force("link", d3.forceLink().id(function(d,i) {
                return i;
            }).distance(linkDistance))
            .force("charge", d3.forceManyBody().strength(-1000))
            
            .force("center", d3.forceCenter(centerX,centerY));




    var colors = d3.scaleOrdinal(d3.schemeCategory10);

   

   
    var edge = svg.append('g')
            //.attr('class','links')
             .attr("stroke", "#aaa")
            .selectAll(".link")
            .data(edges)
            .enter()
            .append("line")
            

    //Create nodes as circles
    var node = svg.append('g')
            .attr('class','nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", circleRadius)
            .attr('fill',function (d) {
                return d.color;
            })
           
        
            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
                    

 
     var nodes_text = svg.append('g')
        .attr("class", "labels")
        .selectAll(".nodetext")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "nodetext slds-text-heading--label")
        .attr("text-anchor", "middle")
        .attr("dx", -20)
        .attr("dy", 20)
        .text(d => d.name)
        .attr('opacity', 1)
            
         
    //Every time the simulation "ticks", this will be called
    simulation
            .nodes(nodes)
            .on("tick", ticked);
    simulation
            .force("link")
            .links(edges);
    function ticked() {
        edge
                .attr("x1", function (d) {
                    var xPos = d.source.x;
                    if (xPos < 0) return 0;
                    if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                    return xPos;
                })
                .attr("y1", function (d) {
                    var yPos = d.source.y;
                    if (yPos < 0) return 0;
                    if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                    return yPos;
                })
                .attr("x2", function (d) {
                    var xPos = d.target.x;
                    if (xPos < 0) return 0;
                    if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                    return xPos;
                })
                .attr("y2", function (d) {
                    var yPos = d.target.y;
                    if (yPos < 0) return 0;
                    if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                    return yPos;
                });

        node
                .attr("cx", function (d) {
                    var xPos = d.x;
                    if (xPos < 0) return 0;
                    if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                    return xPos;
                })
                .attr("cy", function (d) {
                    var yPos = d.y;
                    if (yPos < 0) return 0;
                    if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                    return yPos;
                });

        nodes_text
                .attr("x", function(d) {
                    var xPos = d.x;
                    if (xPos < 0) return 0;
                    if (xPos > (svgWidth - circleRadius)) return (svgWidth - circleRadius);
                    return xPos;
                })
                .attr("y", function(d) {
                    var yPos = d.y;
                    if (yPos < 0) return 0;
                    if (yPos > (svgHeight - circleRadius)) return (svgHeight - circleRadius);
                    return yPos;
                });
    }

    
    function dragstarted(d,i) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
         //function to update detail box
        buildText(nodes[i].name);
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
  
    
  function buildText(nodeName){
	  		var textDetails = "";
   			
   			var work = component.get("v.allWork");
   			var foundWork;
   			
   			//loop through our work and get details associated after found based on nodeName
   			
   			for(var i = 0; i < work.length; ++i){
   			if(work[i].agf__Subject__c === nodeName)
   			foundWork = i;
   			}
   			
   			
   			textDetails+= "Work ID: "
   			textDetails+= work[foundWork].Name;
   			textDetails += '\n';
			textDetails += "Subject: ";
			textDetails += nodeName;
			textDetails += '\n';
			textDetails += '\n';
			textDetails += "Type: ";
			textDetails += work[foundWork].agf__Type__c;
			textDetails += '\n';
			textDetails += '\n';
			textDetails += "Team Name: ";
			textDetails += work[foundWork].agf__Scrum_Team_Name__c;
			textDetails += '\n';
			textDetails += '\n';
			textDetails += "Priority: ";
			textDetails += work[foundWork].agf__Priority__c;
			textDetails += '\n';
			textDetails += "Status: ";
			textDetails += work[foundWork].agf__Status__c;
			textDetails += '\n';
			textDetails += "Sprint: ";
			textDetails += work[foundWork].agf__Sprint_Timeframe__c;
			textDetails += '\n';
			textDetails += "Due Date: ";
			//do not want the whole data information. Unreadable
			if( "undefined" != typeof work[foundWork].agf__Due_Date__c){
			for(var i= 0; i < 10; ++i)
			textDetails += work[foundWork].agf__Due_Date__c[i];
			}
			textDetails += '\n';
			textDetails += '\n';
			textDetails += "Description: ";
			textDetails += work[foundWork].agf__Details__c;
		
			
			
			
			//set our new string to clickedWork, which is the string within the detail box
			component.set("v.clickedWork",textDetails);
			
  }
    
    
    }
  
    }
    

     function clearStuff()
    {
   svg.selectAll("*").remove();
    

    }


    makeTree();
    
    
   
  
  }
	
	
	
})