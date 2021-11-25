package controllers.kvis.dto.kvisDB;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

/**
 * @author Alfred Röttger Rydahl
 * @date 25/11/2021
 **/
public class KvisActivatedDBDTO
{
	public final String kvis_id;
	public final String interaction_code;
	public final Timestamp activated_time;
	
	@JsonCreator
	public KvisActivatedDBDTO(@JsonProperty("kvis_id") String kvis_id,
							  @JsonProperty("interaction_code") String interaction_code,
							  @JsonProperty("activated_time") Timestamp activated_time)
	{
		this.kvis_id = kvis_id;
		this.interaction_code = interaction_code;
		this.activated_time = activated_time;
	}
}
