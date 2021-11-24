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
		try { return queryDatabase(query); }
		catch (Exception e) {
			System.out.println("UserDAO.retrieveAllUsers() failed:\n" + e.getMessage()); throw e;
		}
	}
	
	/**
	 *
	 *
	 * @param userToCreate
	 * @return
	 * @throws SQLException
	 */
	public static UserAPI createUser(final UserAPI userToCreate) throws SQLException
	{
		// Convert
		final UserDB dbObject = UserFactory.APIToDB(userToCreate);

		// Create query
		final String query = String.format("INSERT INTO %s (school_id) VALUES('%s') RETURNING *",
				Table.USER.TableName, dbObject.schoolId);

		// Execute
		try {
			return queryDatabase(query)[0];
		} catch (Exception e) {
			System.out.println("UserDAO.createUser() failed:\n" + e.getMessage());
			throw e;
		}
	}

	/**
	 * @param schoolId is "schoolId" or external ID
	 * @return the queried user
	 * @throws SQLException if operation fails
	 * @author Erlend
	 */
	public static UserAPI[] retrieveUser(String schoolId) throws SQLException {

		// Create query
		final String query = String.format("SELECT * FROM %s WHERE school_id LIKE '%s'",
				Table.USER.TableName, schoolId);

		// Execute query
		try {
			return queryDatabase(query);
		} catch (Exception e) {
			System.out.println("UserDAO.retrieveUser() failed:\n" + e.getMessage());
			throw e;
		}
	}

	/**
	 * @param query
	 * @return
	 * @throws SQLException
	 */
	private static UserAPI[] queryDatabase(final String query) throws SQLException {
		// Get connection
		Connection connection = ConnectionPool.getInstance().getConnection();

		// Prepare statement
		PreparedStatement stmt = connection.prepareStatement(query);

		// Execute
		ResultSet res = stmt.executeQuery();

		// Parse
		final UserAPI[] users = UserFactory.DBToAPI(parseDBResponse(res));
		
		// Clean up
		connection.close();
		stmt.close();
		res.close();
		
		// Return
		return users;
	}
	
	/**
	 *
	 *
	 * @param resultSet
	 * @return
	 * @throws SQLException
	 */
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
