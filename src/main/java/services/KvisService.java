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
	@PUT
	@Produces(MediaType.TEXT_PLAIN)
	public String ping() throws IOException, InterruptedException, SQLException
	{
		try (Connection c = DriverManager.getConnection("jdbc:postgresql://130.225.170.170/test?user=admin&password=secret&ssl=true"))
		{
			//TODO: Finish this to try to get an answer from the server which maybe is located in Ireland
			Statement stmt = c.prepareCall(
					"INSERT INTO test (description) VALUES ('Dette er en test')"
			);
		}
		catch (Exception e)
		{
			return String.format("Things went bad\n\nException:\n%s", e.getMessage());
		}
		
		return "Things went well!";
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
