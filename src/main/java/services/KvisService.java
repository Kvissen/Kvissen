package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
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
		Process p = Runtime.getRuntime().exec("ping 130.225.170.170");
		
		Thread.sleep(10000);
		
		byte[] arr = new byte[1024];
		int readBytes = p.getInputStream().read(arr, 0, arr.length);
		
		p.destroy();
		
		String msg = new String(arr, StandardCharsets.UTF_8);
		
		return String.format("Bytes Read: %s\n\n%s\n", readBytes, msg);
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
