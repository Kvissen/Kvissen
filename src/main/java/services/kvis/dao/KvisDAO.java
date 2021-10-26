package services.kvis.dao;

import services.Table;
import services.kvis.dto.Kvis;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Class responsible for retrieving Kvisses from the Database.
 *
 * @author Alfred Röttger Rydahl
 * @date 26/10/2021
 **/
public class KvisDAO
{
	//TODO: Should be moved out somewhere, but resides here for now as this is the only place it is used.
	private static final String URL = "jdbc:postgresql://130.225.170.170:5432/kvis_db?user=admin&password=kvissen";
	
	/**
	 * Private constructor to avoid instantiation.
	 */
	private KvisDAO() {}
	
	/**
	 * Retrieves all Kvisses from the Database.
	 *
	 * @return Array full of Kvisses.
	 * @throws SQLException Catch this!
	 */
	public static Kvis[] getAll() throws SQLException
	{
		// Get connection
		try (Connection connection = DriverManager.getConnection(URL))
		{
			connection.setAutoCommit(true);
			
			// Prepare statement
			final String query = String.format("SELECT * FROM %s", Table.KVIS.TableName);
			final Statement stmt = connection.createStatement();
			
			// Execute
			final ResultSet res = stmt.executeQuery(query);
			
			// Parse
			return parseKvisses(res);
		}
		catch (Exception e)
		{
			System.out.println("KvisDAO.getAll() failed:\n" + e.getMessage());
			return null;
		}
	}
	
	/**
	 * Parsing a [ResultSet] from query to [Table.KVIS].
	 *
	 * @param queryResult [ResultSet] from query.
	 * @return Array of [Kvis] objects.
	 * @throws SQLException Catch This!
	 */
	private static Kvis[] parseKvisses(final ResultSet queryResult) throws SQLException
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
}
