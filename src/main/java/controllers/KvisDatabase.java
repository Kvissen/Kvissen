package controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import controllers.kvis.dao.IResultSetParser;

import java.sql.*;

/**
 * @author Alfred Röttger Rydahl
 * @date 22/11/2021
 **/
public class KvisDatabase
{
	/**
	 * Creates PreparedStatement from the give query string, executes it and returns an object of type T.
	 *
	 * It takes an IResultSetParser which has the responsibility of parsing the data in the ResultSet.
	 *
	 * @param query query String
	 * @param parser
	 * @return Object of type T
	 */
	public static <T> T queryDatabase(final String query, final IResultSetParser<T> parser) throws SQLException, JsonProcessingException
	{
		// Get connection
		Connection connection = ConnectionPool.getInstance().getConnection();
		
		// Prepare statement
		PreparedStatement stmt = connection.prepareStatement(query);
		
		// Execute
		ResultSet resultSet = stmt.executeQuery();
		
		// Parse
		final T result = parser.parse(resultSet);
		
		// Clean up
		connection.close();
		stmt.close();
		resultSet.close();
		
		// Return
		return result;
	}
	
	/**
	 * Utility method for visualising a ResultSet from an SQL call.
	 *
	 * @param resultSet ResultSet to visualize
	 */
	public static void printResultSet(final ResultSet resultSet) throws SQLException
	{
		// Retrieve column count
		ResultSetMetaData metadata = resultSet.getMetaData();
		int columnCount = metadata.getColumnCount();
		
		// Iterate over all columns
		for (int i=1; i<=columnCount; i++)
		{
			String columnName = metadata.getColumnName(i);
			System.out.println(columnName);
		}
	}
}
