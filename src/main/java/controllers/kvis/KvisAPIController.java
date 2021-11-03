package controllers.kvis;

import com.fasterxml.jackson.core.JsonProcessingException;
import controllers.kvis.dao.KvisDAO;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

@Path("kvis")
public class KvisAPIController
{
	@Path("all")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public KvisAPIDTO[] getAllKvis() throws SQLException, JsonProcessingException
	{
		return KvisDAO.getAll();
	}
	
	@Path("create")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createKvis(final KvisAPIDTO apidto) throws SQLException, JsonProcessingException
	{
		KvisDAO.createKvis(apidto);
		return Response.status(Response.Status.CREATED).build();
	}
	
	@Path("user={username}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public KvisAPIDTO[] getKvissesFromUser(@PathParam("username") final String username) throws SQLException, JsonProcessingException
	{
		return KvisDAO.getKvissesFromUser(username);
	}
}
