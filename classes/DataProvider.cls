public class DataProvider{
	
	
    @AuraEnabled 
    public static agf__ADM_Parent_Work__c[] getTreeData() {
      
        return [Select agf__Parent_Work_Subject__c, agf__Child_Subject__c FROM agf__ADM_Parent_Work__c];
    }
    
    //this function gets all the work
      @AuraEnabled 
    public static agf__ADM_Work__c[] getWorkList() {
    	
    	return [Select agf__Subject__c,Name,agf__Type__c,agf__Scrum_Team_Name__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c,agf__Details__c,agf__Due_Date__c FROM agf__ADM_Work__c];
    }
    
    @AuraEnabled
    public static agf__ADM_Work__c[] getWorkInfo()
    {
    	return [Select agf__Subject__c, agf__Sprint_Name__c, agf__Scrum_Team_Name__c,agf__Type__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c FROM agf__ADM_Work__c];
    }


    //This is used for our filter
    
      @AuraEnabled
     public static agf__ADM_Work__c[] getTeamFilter(String filter) {
     	  String name = '%' + filter + '%';
 
        return [Select agf__Subject__c,Name,agf__Type__c,agf__Scrum_Team_Name__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c,agf__Epic__c FROM agf__ADM_Work__c WHERE agf__Scrum_Team_Name__c LIKE :name];
        
        
    }
    
     @AuraEnabled
     public static agf__ADM_Work__c[] getTypeFilter(String filter) {
     	  String name = '%' + filter + '%';
 
        return [Select agf__Subject__c,Name,agf__Type__c,agf__Scrum_Team_Name__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c,agf__Epic__c FROM agf__ADM_Work__c WHERE agf__Type__c LIKE :name];
        
        
    }
    
     @AuraEnabled
     public static agf__ADM_Work__c[] getSprintFilter(String filter) {
     	  String name = '%' + filter + '%';
 
        return [Select agf__Subject__c,Name,agf__Type__c,agf__Scrum_Team_Name__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c,agf__Epic__c FROM agf__ADM_Work__c WHERE agf__Sprint_Timeframe__c LIKE :name];
        
        
    }
     
    @AuraEnabled
     public static agf__ADM_Work__c[] getStatusFilter(String filter) {
     	  String name = '%' + filter + '%';
 
        return [Select agf__Subject__c,Name,agf__Type__c,agf__Scrum_Team_Name__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c,agf__Epic__c FROM agf__ADM_Work__c WHERE agf__Status__c LIKE :name];
        
        
    }
    
    @AuraEnabled
     public static agf__ADM_Work__c[] getPriorityFilter(String filter) {
     	  String name = '%' + filter + '%';
 
        return [Select agf__Subject__c,Name,agf__Type__c,agf__Scrum_Team_Name__c,agf__Priority__c,agf__Status__c,agf__Sprint_Timeframe__c,agf__Epic__c FROM agf__ADM_Work__c WHERE agf__Priority__c LIKE :name];
        
        
    }
    
     
     
    
}