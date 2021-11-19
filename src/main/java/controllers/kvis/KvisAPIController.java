package controllers.kvis;

import com.fasterxml.jackson.core.JsonProcessingException;
import common.EnvVars;
import controllers.kvis.dao.KvisDAO;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;
import controllers.prometheus.Metrics;

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
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllKvis() throws SQLException, JsonProcessingException
	{
		Metrics.kvisAllRequestCount.inc();
		return Response.ok(KvisDAO.getAll()).build();
	}
	
	@Path("id/{kvis_id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSingleKvis(@PathParam("kvis_id") final String id) throws SQLException, JsonProcessingException
	{
		Metrics.kvisIdReqeustCount.inc();
		
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
	@Produces(MediaType.APPLICATION_JSON)
	public Response getKvissesFromUser(@PathParam("username") final String username) throws SQLException, JsonProcessingException
	{
		Metrics.kvisUsernameRequestCount.inc();
		return Response.ok(KvisDAO.getKvissesFromUser(username)).build();
	}
	
	@Path("create")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createKvis(final KvisAPIDTO apidto) throws SQLException, JsonProcessingException
	{
		Metrics.kvisCreateAttempts.inc();
		try
		{
			final KvisAPIDTO dto = KvisDAO.createKvis(apidto);
			
			return Response
					.created(URI.create(EnvVars.BASE_URL + "/api/kvis/" + dto.uuid))
					.build();
		}
		catch (Exception e)
		{
			Metrics.kvisCreateFailed.inc();
			throw e;
		}
		
		
	}
}
