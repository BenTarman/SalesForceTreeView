({

queueWorkList : function(component) {
	var action = component.get("c.getWorkList");
		
		action.setCallback(this, function(response) {
      
		//makes sure the data we have is valid
		if(component.isValid() && response.getState() === "SUCCESS"){ 
			component.set("v.work", response.getReturnValue());
			component.set("v.allWork", response.getReturnValue());
			
			}
  
		else 
			alert(response.getError());
    
        });
        //calls back to server when we get a response
        $A.enqueueAction(action);
	},
	
	
	
	
queueRelationships : function(component) {
	
	var action = component.get("c.getTreeData");
		
	  action.setCallback(this, function(response) {
            var results;
            var relationships = [];
         
            //makes sure the data we have is valid
            if(component.isValid() && response.getState() === "SUCCESS") {
                results = response.getReturnValue();     
                	for(var j = 0; j < results.length; j++)
                	{
                		for(var item in results[j])
                				relationships[j] = results[j];
                	}
   
                //sets the parent and child variables in treeGraph.cmp file
               component.set("v.relationships",relationships);   
            }
            else
                alert(response.getError());
            
        });
        //calls back to server when we get a response
        $A.enqueueAction(action);
		
	},
	
queueWorkInfo : function(component) {

	var action = component.get("c.getWorkInfo");	
	  action.setCallback(this, function(response) {

            //makes sure the data we have is valid
            if(component.isValid() && response.getState() === "SUCCESS") 
              component.set("v.workInfo", response.getReturnValue());
    
            else 
                alert(response.getError());
  
        });
        
        //calls back to server when we get a response
        $A.enqueueAction(action);
	},
	
	
})