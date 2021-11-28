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
	public final String findId;
	public final Timestamp activatedTime;
	
	@JsonCreator
	public KvisActivatedAPIDTO(@JsonProperty("kvisId") final String kvisId,
							   @JsonProperty("findId") final String interactionCode,
							   @JsonProperty("activatedTime") final Timestamp activatedTime)
	{
		this.kvisId = kvisId;
		this.findId = interactionCode;
		this.activatedTime = activatedTime;
	}
}
