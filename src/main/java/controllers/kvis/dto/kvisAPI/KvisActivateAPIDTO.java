package controllers.kvis.dto.kvisAPI;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Alfred Röttger Rydahl
 * @date 23/11/2021
 **/
public class KvisActivateAPIDTO
{
	public final String kvisId;
	public final String findId;
	
	@JsonCreator
	public KvisActivateAPIDTO(@JsonProperty("kvisId") final String kvisId, @JsonProperty("findId") final String findId)
	{
		this.kvisId = kvisId;
		this.findId = findId;
	}
}
