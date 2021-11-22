package controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import controllers.kvis.dao.IResultSetParser;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Alfred Röttger Rydahl
 * @date 22/11/2021
 **/
public class KvisDatabase
{
	/**
	 * Creates PreparedStatement from the give query string, executes it and returns a parsed array of [Kvis]
	 * objects.
	 *
	 * @param query query String
	 * @return Array of [Kvis] objects
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
}
