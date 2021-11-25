package controllers.kvis.dto.kvisAPI;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

/**
 * @author Alfred Röttger Rydahl
 * @date 25/11/2021
 **/
public class KvisActivatedAPIDTO
{
	public final String kvisId;
	public final String interaction_code;
	public final Timestamp activated_time;
	
	@JsonCreator
	public KvisActivatedAPIDTO(@JsonProperty("kvisId") final String kvisId,
							   @JsonProperty("findId") final String interaction_code,
							   @JsonProperty("activatedTimestamp") final Timestamp activated_time)
	{
		this.kvisId = kvisId;
		this.interaction_code = interaction_code;
		this.activated_time = activated_time;
	}
}
