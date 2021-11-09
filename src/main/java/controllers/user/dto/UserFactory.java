package controllers.user.dto;

/**
 * @author Alfred Röttger Rydahl
 * @date 04/11/2021
 **/
public class UserFactory
{
	public static UserAPI[] DBToAPI(final UserDB[] dbs)
	{
		// Get the length
		final int length = dbs.length;
		
		// Create array
		final UserAPI[] userAPIS = new UserAPI[length];
		
		for(int i=0; i < length; ++i)
			userAPIS[i] = DBToAPI(dbs[i]);
		
		return userAPIS;
	}
	
	/**
	 *
	 *
	 * @param api
	 * @return
	 */
	public static UserDB APIToDB(final UserAPI api)
	{
		return new UserDB(api.uuid, api.schoolId);
	}
	
	/**
	 *
	 *
	 * @param db
	 * @return
	 */
	public static UserAPI DBToAPI(final UserDB db)
	{
		return new UserAPI(db.uuid, db.schoolId);
	}
	
	private UserFactory() {}
}
