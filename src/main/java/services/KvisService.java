package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

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
	public String ping() throws IOException, InterruptedException
	{
		final String ip = "130.225.170.170";
		InetAddress address = InetAddress.getByName(ip);
		boolean reachable = address.isReachable(10000);
		
		return String.format("Tried to ping %s with went %s", ip, reachable);
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
