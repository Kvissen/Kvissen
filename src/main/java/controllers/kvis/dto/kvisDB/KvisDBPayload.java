package controllers.kvis.dto.kvisDB;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import controllers.kvis.dto.Question;

/**
 *
 *
 * @author Alfred Röttger Rydahl
 * @date 02/11/2021
 **/
public class KvisDBPayload
{
	public final Question[] questions;
	
	@JsonCreator
	public KvisDBPayload(@JsonProperty("questions") Question[] questions)
	{
		this.questions = questions;
	}
}
