package controllers.kvis;

import com.fasterxml.jackson.core.JsonProcessingException;
import controllers.kvis.dao.KvisDAO;
import controllers.kvis.dto.kvisAPI.KvisAPIDTO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
	
	@Path("user={username}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public KvisAPIDTO[] getKvissesFromUser(@PathParam("username") final String username) throws SQLException, JsonProcessingException
	{
		return KvisDAO.getKvissesFromUser(username);
	}
}
