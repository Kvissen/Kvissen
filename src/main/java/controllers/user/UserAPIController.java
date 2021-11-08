package controllers.user;

import controllers.user.dao.UserDAO;
import controllers.user.dto.UserAPI;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
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
	public UserAPI[] getAllUsers() throws SQLException
	{
		return UserDAO.retrieveAllUsers();
	}
	
	@POST
	@Path("create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public UserAPI createUser(final UserAPI userAPI) throws SQLException
	{
		return UserDAO.createUser(userAPI);
	}
}
