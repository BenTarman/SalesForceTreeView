({
	init : function(component, event, helper) {
//this is used to represent the filter type options
var items = ["None","Team","Type","Sprint","Status", "Priority"];
					
					component.set("v.itemList", items);
	
		component.set("v.clickedWork","Your work information is here after clicking a node.");
	helper.queueWorkList(component);
		helper.queueRelationships(component);
	helper.queueWorkInfo(component);

},

//for possible behavior when work element is clicked
getWork:function(component,event){

console.log("Clicked an element");
component.set("v.clickedWork","you clicked");

},


selectChange : function(component, event, helper)
{
					
	var eventValue = event.getSource().get("v.value");		
	var workInfo = component.get("v.workInfo");
	
	//reset select list on change.
	$('#topLevel').empty();
	var topLevel = [];
			
	component.set("v.filterType",eventValue);
			
			if (eventValue === "Team")
			{
					let teams = new Set(); //dont want duplicate in filter
					teams.add("None");
					for (let i = 0; i < workInfo.length; i++)
						teams.add(workInfo[i].agf__Scrum_Team_Name__c);
				
					
				 topLevel = Array.from(teams); //convert set to an array.
			}
			
			else if(eventValue === "Type"){
			//let limits the scope to strictly in this else if
		
			let type = new Set(); //dont want duplicate in filter
					type.add("None");
					for (let i = 0; i < workInfo.length; i++)
						type.add(workInfo[i].agf__Type__c);
					
				 topLevel = Array.from(type); //convert set to an array.
			
			
			}
			
			else if(eventValue === "Sprint"){
			//let limits the scope to strictly in this else if
		
			let sprint = new Set(); //dont want duplicate in filter
					sprint.add("None");
					for (let i = 0; i < workInfo.length; i++)
						sprint.add(workInfo[i].agf__Sprint_Timeframe__c);
					
				 topLevel = Array.from(sprint); //convert set to an array.
			
			
			}
			
			else if(eventValue === "Status"){
			//let limits the scope to strictly in this else if
		
			let status = new Set(); //dont want duplicate in filter
					status.add("None");
					for (let i = 0; i < workInfo.length; i++)
						status.add(workInfo[i].agf__Status__c);
					
				 topLevel = Array.from(status); //convert set to an array.
			
			
			}
			
			else if(eventValue === "Priority"){
			//let limits the scope to strictly in this else if
		
			let priority = new Set(); //dont want duplicate in filter
					priority.add("None");
					for (let i = 0; i < workInfo.length; i++)
						priority.add(workInfo[i].agf__Priority__c);
					
				 topLevel = Array.from(priority); //convert set to an array.
			
			
			}
				
			$("#topLevel").select2({
				  data: topLevel
				})
				
				
			//change handler for jquery filter
			$('#topLevel').change(function() {
				let val = $(this).val();  
			
				
				component.set("v.clickedFiltered", val);
			});
			
},
			
			
reloadData : function(component)
{
//THIS ONLY CALLS A CONTROLLER TO FILTER TEAMS AS OF NOW (probalby just use a switch statement or some shit, pass in another attirubte to have as the arguement...
				
	var eventValue = component.get("v.filterType");
	var filter = component.get("v.clickedFiltered");
	var action;
				
	if(eventValue === "Team")
		action = component.get("c.getTeamFilter");
		
	else if(eventValue === "Sprint")
		action = component.get("c.getSprintFilter");
		
	else if(eventValue === "Status")
		action = component.get("c.getStatusFilter");
		
	else if(eventValue === "Priority")
		action = component.get("c.getPriorityFilter");
				
	else
		action = component.get("c.getTypeFilter");
				
	action.setParams({
		"filter": filter
	});
				
		action.setCallback(this, function(a) {
			component.set("v.work", a.getReturnValue());
		});
				
	$A.enqueueAction(action);
 
    
    
}


})