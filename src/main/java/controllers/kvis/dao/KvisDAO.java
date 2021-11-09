package controllers.kvis.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import controllers.ConnectionPool;
import controllers.Table;
import controllers.kvis.dto.KvisFactory;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;
import controllers.kvis.dto.kvisDB.KvisDBDTO;
import controllers.kvis.dto.kvisDB.KvisDBPayload;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

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
	public static KvisAPIDTO[] getAll() throws SQLException, JsonProcessingException
	{
		// Prepare query
		final String query = String.format("SELECT * FROM %s", Table.KVIS.TableName);
		
		// Run
		return KvisFactory.DBToAPI(queryDatabase(query));
	}
	
	public static KvisAPIDTO getSingle(final String id) throws SQLException, JsonProcessingException
	{
		// Prepare query
		final String query = String.format("SELECT * FROM %s WHERE kvis_id = '%s'", Table.KVIS.TableName, id);
		
		// Run
		return KvisFactory.DBToAPI(queryDatabase(query))[0];
	}
	
	/**
	 * Retrieves all Kvisses belonging to the user with the given username from the database.
	 *
	 * @param username Name of the user
	 * @return Array of Kvisses
	 */
	public static KvisAPIDTO[] getKvissesFromUser(final String username) throws SQLException, JsonProcessingException
	{
		// Prepare query
		final String query = String.format("SELECT * FROM %s WHERE user_id='%s'", Table.KVIS.TableName, username);
		
		// Run
		return KvisFactory.DBToAPI(queryDatabase(query));
	}
	
	public static KvisAPIDTO createKvis(final KvisAPIDTO apidto) throws JsonProcessingException, SQLException
	{
		// Convert
		final KvisDBDTO dbdto = KvisFactory.APIToDB(apidto);
		
		// Prepare query
		final String query = String.format(
				"INSERT INTO %s (name, created, user_id, kvis) VALUES('%s', '%s','%s', '%s') RETURNING *",
				Table.KVIS.TableName,
				dbdto.name,
				dbdto.ts,
				dbdto.creator,
				new ObjectMapper().writeValueAsString(dbdto.payload)
		);
		
		// Run
		return KvisFactory.DBToAPI(queryDatabase(query))[0];
	}
	
	/**
	 * Creates PreparedStatement from the give query string, executes it and returns a parsed array of [Kvis]
	 * objects.
	 *
	 * @param query query String
	 * @return Array of [Kvis] objects
	 */
	private static KvisDBDTO[] queryDatabase(final String query) throws SQLException, JsonProcessingException
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
		catch (SQLException | JsonProcessingException e)
		{ System.out.println("KvisDAO.getAll() failed:\n" + e.getMessage()); throw e; }
	}
	
	/**
	 * Parsing a [ResultSet] from query to [Table.KVIS].
	 *
	 * @param queryResult [ResultSet] from query.
	 * @return Array of [Kvis] objects.
	 * @throws SQLException Catch This!
	 */
	private static KvisDBDTO[] parseDBResponse(final ResultSet queryResult) throws SQLException, JsonProcessingException
	{
		LinkedList<KvisDBDTO> res = new LinkedList<>();
		while(queryResult.next())
		{
			res.add(
					new KvisDBDTO.KvisDBDTOBuilder()
							.setUuid(queryResult.getString("kvis_id"))
							.setName(queryResult.getString("name"))
							.setCreator(queryResult.getString("user_id"))
							.setTimestamp(queryResult.getTimestamp("created"))
							.setPayload(
									new ObjectMapper().readValue(
											queryResult.getString("kvis"),
											KvisDBPayload.class
									)
									
							)
							.build()
			);
		}
		return res.toArray(new KvisDBDTO[0]);
	}
	
	/**
	 * Private constructor to avoid instantiation.
	 */
	private KvisDAO() {}
}
