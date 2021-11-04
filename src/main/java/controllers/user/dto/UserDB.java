package controllers.user.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * @author Alfred Röttger Rydahl
 * @date 04/11/2021
 **/
public class UserDB
{
	public final String uuid;
	public final String schoolId;
	
	@JsonCreator
	public UserDB(String uuid, String schoolId)
	{
		this.uuid = uuid;
		this.schoolId = schoolId;
	}
}
