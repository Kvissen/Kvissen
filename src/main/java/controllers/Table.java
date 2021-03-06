package controllers;

/**
 * Enumeration that holds all table names in the database.
 *
 * @author Alfred Röttger Rydahl
 * @date 26/10/2021
 **/
public enum Table
{
	KVIS("kvissen"),
	ACTIVE_KVIS("active_kvisses"),
	USER("users"),
	RESULT("kvis_result");
	
	/**
	 * The name of the table to be used with SQL statements.
	 */
	public final String TableName;
	
	Table(String tableName)
	{
		TableName = tableName;
	}
}
