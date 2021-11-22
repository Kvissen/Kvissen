package controllers.kvis.dao;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Parser interface to be used, when a ResultSet needs to be parsed after a DB query.
 *
 * @author Alfred Röttger Rydahl
 * @date 22/11/2021
 **/
public interface IResultSetParser<T>
{
	T parse(final ResultSet resultSet) throws SQLException, JsonProcessingException;
}
