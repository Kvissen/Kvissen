package controllers.kvis.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author Alfred Röttger Rydahl
 * @date 02/11/2021
 **/
public class Question
{
	public final String question;
	public final Answer[] answers;
	
	@JsonCreator
	public Question(@JsonProperty("question") String question, @JsonProperty("answers") Answer[] answers)
	{
		this.question = question;
		this.answers = answers;
	}
}
