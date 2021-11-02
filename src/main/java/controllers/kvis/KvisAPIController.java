package controllers.kvis;

import controllers.kvis.dao.KvisDAO;
import controllers.kvis.dto.Kvis;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.*;

@Path("kvis")
public class KvisAPIController
{
	@Path("all")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public KvisAPIDTO[] getAllKvis() throws SQLException
	{
		return KvisDAO.getAll();
	}
	
	@Path("user={username}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public KvisAPIDTO[] getKvissesFromUser(@PathParam("username") final String username) throws SQLException
	{
		return KvisDAO.getKvissesFromUser(username);
	}
}
