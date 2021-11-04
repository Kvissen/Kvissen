package controllers.user.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Alfred Röttger Rydahl
 * @date 04/11/2021
 **/
public class UserDB
{
	public final String uuid;
	public final String schoolId;
	
	@JsonCreator
	public UserDB(@JsonProperty("user_id") String uuid, @JsonProperty("school_id") String schoolId)
	{
		this.uuid = uuid;
		this.schoolId = schoolId;
	}
}
