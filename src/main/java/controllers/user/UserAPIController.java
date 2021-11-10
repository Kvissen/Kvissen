package controllers.user;

import controllers.user.dao.UserDAO;
import controllers.user.dto.UserAPI;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

/**
 * @author Alfred Röttger Rydahl
 * @date 04/11/2021
 **/
@Path("users")
public class UserAPIController
{
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUsers() throws SQLException
	{
		return Response.ok(UserDAO.retrieveAllUsers()).build();
	}
	
	@POST
	@Path("create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createUser(final UserAPI userAPI) throws SQLException
	{
		return Response.ok(UserDAO.createUser(userAPI)).build();
	}
}
