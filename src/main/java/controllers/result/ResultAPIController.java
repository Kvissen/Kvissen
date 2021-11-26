package controllers.result;

import com.fasterxml.jackson.core.JsonProcessingException;
import common.EnvVars;
import controllers.result.dao.KvisResultDAO;
import controllers.result.dto.KvisResultAPIDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.sql.SQLException;

/**
 * @author Alfred Röttger Rydahl
 * @date 26/11/2021
 **/
@Path("kvis_result")
public class ResultAPIController
{
	@Path("{kvisId}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getResultsId(@PathParam("kvisId") final String id) throws SQLException, JsonProcessingException
	{
		//TODO: Metrics
		
		// Serve request
		try
		{
			return Response
					.ok(KvisResultDAO.getKvisResults(id))
					.build();
		}
		catch (Exception e)
		{
			//TODO: Metrics
			
			throw e;
		}
	}
	
	@Path("specific/{kvisResultId}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSpecificResult(@PathParam("kvisResultId") final String id) throws SQLException, JsonProcessingException
	{
		//TODO: Metrics
		
		// Serve Request
		try
		{
			return Response
					.ok(KvisResultDAO.getKvisResult(id))
					.build();
		}
		catch (Exception e)
		{
			//TODO: Metrics
			throw e;
		}
	}
	
	@Path("create")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createResult(final KvisResultAPIDTO apidto) throws SQLException, JsonProcessingException
	{
		//TODO: Metrics
		
		// Serve Request
		try
		{
			final KvisResultAPIDTO created = KvisResultDAO.createKvisResult(apidto);
			return Response
					.created(URI.create(EnvVars.BASE_URL + "/api/kvis_result/specific/" + created.id))
					.build();
		}
		catch (Exception e)
		{
			//TODO: Metrics
			throw e;
		}
	}
}