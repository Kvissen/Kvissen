package services.kvis;

import services.kvis.dao.KvisDAO;
import services.kvis.dto.Kvis;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.*;

@Path("kvis")
public class KvisService
{
	@Path("all")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Kvis[] getAllKvis()
	{
		try { return KvisDAO.getAll(); }
		catch (Exception e)
		{
			//TODO: Return server error
			return null;
		}
	}
	
	@Path("user={username}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Kvis[] getKvissesFromUser(@PathParam("username") final String username)
	{
		try { return KvisDAO.getKvissesFromUser(username); }
		catch (Exception e)
		{
			//TODO: Return server error
			return null;
		}
	}
}
