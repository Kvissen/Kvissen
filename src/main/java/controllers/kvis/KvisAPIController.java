package controllers.kvis;

import com.fasterxml.jackson.core.JsonProcessingException;
import common.AccessScope;
import common.EnvVars;
import controllers.kvis.dao.KvisDAO;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.sql.SQLException;

@Path("kvis")
public class KvisAPIController
{
	@Path("all")
	@GET
	@RolesAllowed({AccessScope.creatorScope, AccessScope.playerScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllKvis() throws SQLException, JsonProcessingException
	{
		return Response.ok(KvisDAO.getAll()).build();
	}
	
	@Path("id/{kvis_id}")
	@GET
	@RolesAllowed({AccessScope.creatorScope, AccessScope.playerScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getSingleKvis(@PathParam("kvis_id") final String id) throws SQLException, JsonProcessingException
	{
		// If getSingle() throws array out of bounds exception, then there wasn't anything on that id
		try
		{
			return Response.ok(KvisDAO.getSingle(id)).build();
		}
		catch(ArrayIndexOutOfBoundsException e)
		{
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
	
	@Path("user/{username}")
	@GET
	@RolesAllowed({AccessScope.creatorScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getKvissesFromUser(@PathParam("username") final String username) throws SQLException, JsonProcessingException
	{
		return Response.ok(KvisDAO.getKvissesFromUser(username)).build();
	}

	@Path("create")
	@POST
	@RolesAllowed({AccessScope.creatorScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createKvis(final KvisAPIDTO apidto) throws SQLException, JsonProcessingException
	{
		final KvisAPIDTO dto = KvisDAO.createKvis(apidto);
		return Response
				.created(URI.create(EnvVars.BASE_URL + "/api/kvis/" + dto.uuid))
				.build();
	}
}
