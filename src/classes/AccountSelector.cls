public class AccountSelector {
    
    public class AccountData {
        @AuraEnabled public Account[] accounts = getAllAccounts();
        @AuraEnabled public User user = getUserInformation();
        @AuraEnabled public AggregateResult[] groupedByTypeResult = getAccountsGroupByType();
    }
    
    public static User getUserInformation(){
        return [SELECT Id, Name, Email, UserName FROM User WHERE Id =:UserInfo.getUserId()];
    }
    
    @AuraEnabled
    public static AccountData initialization(){
        return new AccountData();
    }

    @AuraEnabled
    public static Account[] getAllAccounts(){
        return [SELECT Id, Name, Phone FROM Account LIMIT 50000];
    }
    
    @AuraEnabled
    public static AggregateResult[] getAccountsGroupByType(){
        return [SELECT Count(Name)countType, Type FROM Account GROUP BY Type];
    }
    
	@AuraEnabled
    public static Boolean deleteAccount(Id accountId){
        return Database.delete(new Account(Id = accountId)).isSuccess();
    }    
    
    
}