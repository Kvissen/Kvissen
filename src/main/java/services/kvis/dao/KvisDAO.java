package services.kvis.dao;

import services.Table;
import services.kvis.dto.Kvis;
import services.ConnectionPool;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Class responsible for retrieving Kvisses from the Database.
 *
 * @author Alfred Röttger Rydahl
 * @date 26/10/2021
 **/
public final class KvisDAO
{
	/**
	 * Retrieves all Kvisses from the Database.
	 *
	 * @return Array full of Kvisses.
	 */
	public static Kvis[] getAll()
	{
		// Prepare query
		final String query = String.format("SELECT * FROM %s", Table.KVIS.TableName);
		
		// Run
		return queryDatabase(query);
	}
	
	/**
	 * Retrieves all Kvisses belonging to the user with the given username from the database.
	 *
	 * @param username Name of the user
	 * @return Array of Kvisses
	 */
	public static Kvis[] getKvissesFromUser(final String username)
	{
		// Prepare query
		final String query = String.format("SELECT * FROM %s WHERE username='%s'", Table.KVIS.TableName, username);
		
		// Run
		return queryDatabase(query);
	}
	
	/**
	 * Creates PreparedStatement from the give query string, executes it and returns a parsed array of [Kvis]
	 * objects.
	 *
	 * @param query query String
	 * @return Array of [Kvis] objects
	 */
	private static Kvis[] queryDatabase(final String query)
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
			return parseDBResponse(res);
		}
		catch (SQLException e) { System.out.println("KvisDAO.getAll() failed:\n" + e.getMessage()); return null; }
	}
	
	/**
	 * Parsing a [ResultSet] from query to [Table.KVIS].
	 *
	 * @param queryResult [ResultSet] from query.
	 * @return Array of [Kvis] objects.
	 * @throws SQLException Catch This!
	 */
	private static Kvis[] parseDBResponse(final ResultSet queryResult) throws SQLException
	{
		List<Kvis> res = new ArrayList<>(2);
		while(queryResult.next())
		{
			res.add(
					new Kvis(
							queryResult.getString(1),
							queryResult.getString(2)
					)
			);
		}
		return res.toArray(new Kvis[0]);
	}
	
	/**
	 * Private constructor to avoid instantiation.
	 */
	private KvisDAO() {}
}
