package controllers.kvis.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import controllers.KvisDatabase;
import controllers.Table;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Alfred Röttger Rydahl
 * @date 22/11/2021
 **/
public class KvisActivationDAO
{
	/**
	 *
	 *
	 * @param id
	 * @param findCode
	 * @return Interaction Code or null if error
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static String activateKvis(final String id, final String findCode) throws SQLException, JsonProcessingException
	{
		// Query String
		final String query = String.format("SELECT * FROM activate_kvis('%s', '%s')", id, findCode);
		
		// Execute query
		final String result =
				KvisDatabase.queryDatabase(
						query,
						new IResultSetParser<String>()
						{
							@Override
							public String parse(ResultSet resultSet) throws SQLException, JsonProcessingException
							{
								if (resultSet.next())
									return resultSet.getString("interaction_code");
								else
									return null;
							}
						});
		
		return result;
	}
	
	/**
	 * Moves the given Kvis out of the group of active kvisses.
	 *
	 * @param id Kvis ID
	 * @throws SQLException
	 * @throws JsonProcessingException
	 */
	public static void deactivateKvis(final String id) throws SQLException, JsonProcessingException
	{
		// Query String
		final String query = String.format("SELECT * FROM deactivate_kvis('%s*)", id);
		
		// Execute
		KvisDatabase.queryDatabase(query, resultSet -> null);
	}
	
	/**
	 * Retrieve the Kvis unique ID from a find id.
	 *
	 * Return null if none was found.
	 *
	 * @param findId
	 * @return KvisID or null
	 */
	public static String getActivatedKvis(final String findId) throws SQLException, JsonProcessingException
	{
		// Create query
		final String query = String.format("SELECT * FROM %s WHERE interaction_code = '%s'", Table.ACTIVE_KVIS.TableName, findId);
		
		// Execute
		return KvisDatabase.queryDatabase(
				query,
				new IResultSetParser<String>()
				{
					@Override
					public String parse(ResultSet resultSet) throws SQLException, JsonProcessingException
					{
						if (resultSet.next())
							return resultSet.getString("kvis_id");
						else
							return null;
					}
				});
	}
}
