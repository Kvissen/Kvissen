package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("kvis")
public class KvisService
{
	@GET
	public String getTest()
	{
		return "Hello World";
	}
	
	@Path("ping")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String ping()
	{
		final String ip = "130.225.170.170";
		
		return ip;
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
