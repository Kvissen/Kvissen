package services.kvis;

import services.kvis.dao.KvisDAO;
import services.kvis.dto.Kvis;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
import java.sql.*;


@Path("kvis")
public class KvisService
{
	@Path("all")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Kvis[] getAllKvis()
	{
		try {
			return KvisDAO.getAll();
		}
		catch (SQLException e) {
			//TODO: Return server error
			return null;
		}
	}
}
