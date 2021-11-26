package controllers.result.dto;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

/**
 * Creation methods for KvisResult objects.
 *
 * @author Alfred Röttger Rydahl
 * @date 26/11/2021
 **/
public class KvisResultFactory
{
	/**
	 * Takes a ResultSet that is expected to have a given set of variables to be able to
	 * create the KvisResultAPIDTO.
	 *
	 * This goes through every row of the ResultSet and creates a KvisResultAPIDTO, and puts it
	 * into an array.
	 *
	 * @param resultSet
	 * @return Array of KvisResultAPIDTO objects
	 */
	public static KvisResultAPIDTO[] fromResultSet(final ResultSet resultSet) throws SQLException
	{
		// Create LinkedList
		LinkedList<KvisResultAPIDTO> list = new LinkedList<>();
		
		// Go through every row and create object
		while(resultSet.next())
		{
			list.add(
					new KvisResultAPIDTO.Builder()
							.setId(resultSet.getString("id"))
							.setKvisId(resultSet.getString("kvis_id"))
							.setName(resultSet.getString("name"))
							.setKvisEnded(resultSet.getTimestamp("kvis_started"))
							.setKvisEnded(resultSet.getTimestamp("kvis_ended"))
							.setScore(resultSet.getInt("score"))
							.setCorrectAnswers(resultSet.getInt("correct_answers"))
							.setWrongAnswers(resultSet.getInt("wrong_answers"))
							.build()
			);
		}
		
		// Return the result as an array
		return list.toArray(new KvisResultAPIDTO[0]);
	}
	
	/**
	 * Private constructor to avoid instantiation.
	 */
	private KvisResultFactory() {}
}
