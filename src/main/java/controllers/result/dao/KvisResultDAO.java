package controllers.result.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import controllers.KvisDatabase;
import controllers.Table;
import controllers.kvis.dao.IResultSetParser;
import controllers.result.dto.KvisResultAPIDTO;
import controllers.result.dto.KvisResultFactory;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Alfred Röttger Rydahl
 * @date 26/11/2021
 **/
public class KvisResultDAO
{
	/**
	 * Retrieves all the Kvis Results from the Database.
	 *
	 * @return Array of KvisResultAPIDTOs
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static KvisResultAPIDTO[] getAllKvisResults() throws SQLException, JsonProcessingException
	{
		// Create query
		final String query = String.format("SELECT * FROM %s", Table.RESULT.TableName);
		
		// Execute
		return getFromDatabase(query);
	}
	
	/**
	 * Retrieves a single Kvis Result form the database with the given unique ID.
	 *
	 * @param id Unique ID of the requested Kvis Result.
	 * @return Array of with a single or none Kvis Result.
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static KvisResultAPIDTO[] getKvisResult(final String id) throws SQLException, JsonProcessingException
	{
		// Create query
		final String query = String.format("SELECT * FROM %s WHERE id='%s'", Table.RESULT.TableName, id);
		
		// Execute
		return getFromDatabase(query);
	}
	
	/**
	 * Retrieves all the Kvis Results to the given unique Kvis ID.
	 *
	 * @param kvisId Unique UUID for the Kvis which results is desired.
	 * @return An Array of all the Kvis Results that this given Kvis has.
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static KvisResultAPIDTO[] getKvisResults(final String kvisId) throws SQLException, JsonProcessingException
	{
		// Create query
		final String query = String.format("SELECT * FROM %s WHERE kvis_id='%s'", Table.RESULT.TableName, kvisId);
		
		// Execute
		return getFromDatabase(query);
	}
	
	/**
	 * Creates the given KvisResultAPIDTO entity in the Database, where the ID is ignored as it's
	 * generated on the DB side.
	 *
	 * @param kvisResult The KvisResultAPIDTO to create in the Database.
	 * @return The resulting created entity in the DB, where the given ID is present.
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static KvisResultAPIDTO createKvisResult(final KvisResultAPIDTO kvisResult) throws SQLException, JsonProcessingException
	{
		// Create query
		final String query = String.format(
				"INSERT INTO %s " +
				"(kvis_id, name, score, correct_answers, wrong_answers, kvis_started, kvis_ended) " +
				"VALUES " +
				"('%s', '%s', %s, %s, %s, '%s', '%s')" +
				"RETURNING *",
				Table.RESULT.TableName,
				kvisResult.kvisId,
				kvisResult.name,
				kvisResult.score,
				kvisResult.correctAnswers,
				kvisResult.wrongAnswers,
				kvisResult.kvisStarted,
				kvisResult.kvisEnded
		);
		
		// Execute
		return getFromDatabase(query)[0];
	}
	
	/**
	 * Standard way of querying the DB and get parsed result back.
	 *
	 * @param query The query to make to the DB.
	 * @return Parsed KvisResultAPIDTO array.
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	private static KvisResultAPIDTO[] getFromDatabase(final String query) throws SQLException, JsonProcessingException
	{
		return KvisDatabase.queryDatabase(
				query,
				new IResultSetParser<KvisResultAPIDTO[]>()
				{
					@Override
					public KvisResultAPIDTO[] parse(final ResultSet resultSet) throws SQLException
					{
						return KvisResultFactory.fromResultSet(resultSet);
					}
				}
		);
	}
}
