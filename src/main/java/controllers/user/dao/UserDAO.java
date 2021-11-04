package controllers.user.dao;

import controllers.ConnectionPool;
import controllers.Table;
import controllers.user.dto.UserAPI;
import controllers.user.dto.UserDB;
import controllers.user.dto.UserFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

/**
 * @author Alfred Röttger Rydahl
 * @date 04/11/2021
 **/
public class UserDAO
{
	/**
	 *
	 *
	 * @return
	 */
	public static UserAPI[] retrieveAllUsers() throws SQLException
	{
		// Create query
		final String query = String.format("SELECT * FROM %s", Table.USER.TableName);
		
		// Execute query
		return queryDatabase(query);
	}
	
	public static UserAPI createUser(final UserAPI userToCreate) throws SQLException
	{
		// Convert
		final UserDB dbObject = UserFactory.APIToDB(userToCreate);
		
		// Create query
		final String query = String.format("INSERT INTO %s (school_id) VALUES('%s') RETURNING *",
				Table.USER.TableName, dbObject.schoolId);
		
		// Execute
		return queryDatabase(query)[0];
	}
	
	private static UserAPI[] queryDatabase(final String query) throws SQLException
	{
		try (
				// Get connection
				Connection connection = ConnectionPool.getInstance().getConnection();
				
				// Prepare statement
				PreparedStatement stmt = connection.prepareStatement(query);
				
				// Execute
				ResultSet res = stmt.executeQuery()
		)
		{
			// Parse
			return UserFactory.DBToAPI(parseDBResponse(res));
		}
		catch (SQLException e)
		{ System.out.println("KvisDAO.getAll() failed:\n" + e.getMessage()); throw e; }
	}
	
	private static UserDB[] parseDBResponse(final ResultSet resultSet) throws SQLException
	{
		LinkedList<UserDB> res = new LinkedList<>();
		while(resultSet.next())
		{
			res.add(
					new UserDB(
							resultSet.getString("user_id"),
							resultSet.getString("school_id")
					)
			);
		}
		return res.toArray(new UserDB[0]);
	}
	
	private UserDAO() {}
}
