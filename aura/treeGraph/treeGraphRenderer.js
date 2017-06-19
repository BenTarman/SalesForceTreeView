({
	 afterRender: function(component, helper) {
        var svg = component.find("svg");
        var value = svg.getElement().innerText;		
        value = value.replace("<![CDATA[", "").replace("]]>", "");
        svg.getElement().innerHTML = value;        
    }
	
})