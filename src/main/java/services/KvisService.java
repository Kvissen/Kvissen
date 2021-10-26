package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
import java.sql.*;


@Path("kvis")
public class KvisService
{
	@GET
	public String getTest()
	{
		return "Hello World";
	}
	
	@Path("defaultTest")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String ping() throws IOException, InterruptedException, SQLException
	{
		try (Connection c = DriverManager.getConnection("jdbc:postgresql://130.225.170.170:5432/kvis_db?user=admin&password=kvissen"))
		{
			//TODO: Finish this to try to get an answer from the server which maybe is located in Ireland
			PreparedStatement stmt = c.prepareStatement(
					"INSERT INTO test (description) VALUES ('Dette er en test')"
			);
			
			if (stmt.execute())
				return "Things went well";
			else
				return String.format("Tried to execute statement, but went bad\n\n%s", stmt.getMetaData());
		}
		catch (Exception e)
		{
			return String.format("Things went bad\n\nException:\n%s", e.getMessage());
		}
	}
	
	/*
	@Path("json")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public DataKvis getHelloJson()
	{
		return new DataKvis();
	}
	 */
}
