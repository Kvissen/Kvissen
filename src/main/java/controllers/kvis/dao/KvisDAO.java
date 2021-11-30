package controllers.kvis.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import controllers.KvisDatabase;
import controllers.Table;
import controllers.kvis.dto.KvisFactory;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;
import controllers.kvis.dto.kvisDB.KvisDBDTO;
import controllers.kvis.dto.kvisDB.KvisDBPayload;

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
		try { return KvisFactory.DBToAPI(KvisDatabase.queryDatabase(query, new IResultSetParser<KvisDBDTO[]>()
		{
			@Override
			public KvisDBDTO[] parse(ResultSet resultSet) throws SQLException, JsonProcessingException
			{
				return parseDBResponse(resultSet);
			}
		})); }
		catch (Exception e)
		{
			System.out.println("KvisDAO.getAll() failed:\n" + e.getMessage()); throw e;
		}
	}
	
	/**
	 * Retrieve a Single Kvis from its unique ID.
	 *
	 * @param id Unique Kvis ID
	 * @return Single KvisAPIDTO object
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static KvisAPIDTO getSingle(final String id) throws SQLException, JsonProcessingException
	{
		// Prepare query
		final String query = String.format("SELECT * FROM %s WHERE kvis_id = '%s'", Table.KVIS.TableName, id);
		
		// Run
		try { return KvisFactory.DBToAPI(KvisDatabase.queryDatabase(query, new IResultSetParser<KvisDBDTO[]>()
		{
			@Override
			public KvisDBDTO[] parse(ResultSet resultSet) throws SQLException, JsonProcessingException
			{
				return parseDBResponse(resultSet);
			}
		}))[0]; }
		catch (Exception e)
		{
			System.err.println("KvisDAO.getSingle() failed:\n" + e.getMessage()); throw e;
		}
	}
	
	/**
	 * This function delete the given Kvis from the Database. This is function is idempotent, which
	 * means, calling this function more than once with the same argument results in the same state.
	 *
	 * @param id The Unique ID of the Kvis to be Deleted
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static void deleteKvis(final String id) throws SQLException, JsonProcessingException
	{
		// Prepare query
		final String query = String.format(
				"DELETE FROM %s WHERE kvis_id='%s'",
				Table.KVIS.TableName,
				id
		);
		
		// Execute, but parsing is not necessary
		try
		{
			KvisDatabase.queryDatabase(query, new IResultSetParser<Object>()
			{
				@Override
				public Object parse(ResultSet resultSet) throws SQLException, JsonProcessingException
				{
					return null;
				}
			});
		}
		catch (Exception e)
		{
			System.err.printf("Delete Kvis error with ID: %s%n", id);
			throw e;
		}
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
		try { return KvisFactory.DBToAPI(KvisDatabase.queryDatabase(query, new IResultSetParser<KvisDBDTO[]>()
		{
			@Override
			public KvisDBDTO[] parse(ResultSet resultSet) throws SQLException, JsonProcessingException
			{
				return parseDBResponse(resultSet);
			}
		}));
		}
		catch (Exception e) {
			System.out.println("KvisDAO.getKvissesFromUser() failed:\n" + e.getMessage()); throw e;
		}
	}
	
	/**
	 *
	 *
	 * @param apidto
	 * @return
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static KvisAPIDTO createKvis(final KvisAPIDTO apidto) throws SQLException, JsonProcessingException
	{
		// Convert
		final KvisDBDTO dbdto = KvisFactory.APIToDB(apidto);
		
		// Run
		try {
			// Prepare query
			final String query = String.format(
					"INSERT INTO %s (name, created, user_id, kvis) VALUES(\"%s\", \"%s\",\"%s\", \"%s\") RETURNING *",
					Table.KVIS.TableName,
					dbdto.name,
					dbdto.ts,
					dbdto.creator,
					new ObjectMapper().writeValueAsString(dbdto.payload)
			);
			
			return KvisFactory.DBToAPI(KvisDatabase.queryDatabase(query, new IResultSetParser<KvisDBDTO[]>()
			{
				@Override
				public KvisDBDTO[] parse(final ResultSet resultSet) throws SQLException, JsonProcessingException
				{
					return parseDBResponse(resultSet);
				}
			}))[0];
		}
		catch (Exception e) {
			System.out.println("KvisDAO.createKvis() failed:\n" + e.getMessage()); throw e;
		}
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
