package controllers.kvis;

import com.fasterxml.jackson.core.JsonProcessingException;
import common.EnvVars;
import controllers.kvis.dao.KvisActivationDAO;
import controllers.kvis.dao.KvisDAO;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;
import controllers.kvis.dto.kvisAPI.KvisActivateAPIDTO;
import controllers.prometheus.Metrics;
import org.postgresql.util.PSQLException;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.sql.SQLException;

import static common.AccessScope.creatorScope;
import static common.AccessScope.playerScope;

@Path("kvis")
public class KvisAPIController
{
	@Path("all")
	@GET
	@RolesAllowed({creatorScope, playerScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllKvis() throws SQLException, JsonProcessingException
	{
		Metrics.kvisAllRequestCount.inc();
		return Response.ok(KvisDAO.getAll()).build();
	}
	
	@Path("id/{kvis_id}")
	@GET
	@RolesAllowed({creatorScope, playerScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
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
	@RolesAllowed({creatorScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getKvissesFromUser(@PathParam("username") final String username) throws SQLException, JsonProcessingException
	{
		Metrics.kvisUsernameRequestCount.inc();
		return Response.ok(KvisDAO.getKvissesFromUser(username)).build();
	}

	@Path("create")
	@POST
	@RolesAllowed({creatorScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
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
	
	@Path("activate")
	@GET
	@RolesAllowed({creatorScope, playerScope})
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllActive() throws SQLException, JsonProcessingException
	{
		// Metrics
		Metrics.kvisGetActivated.inc();
		
		return Response
				.ok(KvisActivationDAO.getAllActiveKvisses())
				.build();
	}
	
	@Path("activate")
	@POST
	@RolesAllowed({creatorScope})
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response activateKvis(final KvisActivateAPIDTO kvisActivate) throws SQLException, JsonProcessingException
	{
		// Metrics
		Metrics.kvisActivateAttempts.inc();
		
		try
		{
			final String result = KvisActivationDAO.activateKvis(kvisActivate.kvisId, kvisActivate.findId);
			return Response
					.ok(result)
					.build();
		}
		catch (PSQLException e)
		{
			Metrics.kvisActivatesFailed.inc();

			if (e.getMessage().contains("duplicate key"))
				return Response.status(Response.Status.CONFLICT)
						.entity("\"in use\"")
						.build();
			
			// Other SQL exception
			throw e;
		}
		catch (Exception e)
		{
			// Failed metric
			Metrics.kvisActivatesFailed.inc();
			throw e;
		}
	}
	
	@Path("activate/{findId}")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response retrieveActivatedKvis(@PathParam("findId") final String findId) throws SQLException, JsonProcessingException
	{
		// Metrics
		Metrics.kvisActivatedRequests.inc();
		
		try
		{
			// Retrieve the KvisID
			final String kvisId = KvisActivationDAO.getActivatedKvis(findId);
			if (kvisId == null)
			{
				// Wrong id metrics
				Metrics.kvisActivatedRequestWrongId.inc();
				
				return Response.noContent().build();
			}
			
			// Retrieve the corresponding Kvis
			return Response
					.ok(KvisDAO.getSingle(kvisId))
					.build();
		}
		catch (Exception e)
		{
			// Failed Metrics
			Metrics.kvisActivatedRequestFailed.inc();
			throw e;
		}
	}
	
	@Path("deactivate/{kvis_id}")
	@GET
	@PermitAll
	@Produces(MediaType.APPLICATION_JSON)
	public Response deactivateKvis(@PathParam("kvis_id") final String kvis_id) throws SQLException, JsonProcessingException
	{
		// Metrics
		Metrics.kvisDeactivationRequests.inc();
		
		try
		{
			// Deactivate
			KvisActivationDAO.deactivateKvis(kvis_id);
			
			return Response.accepted().build();
		}
		catch (Exception e)
		{
			// Record failure metric
			Metrics.kvisDeactivationRequestsFailed.inc();
			
			throw e;
		}
	}
}
