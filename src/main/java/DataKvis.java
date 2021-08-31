import org.glassfish.jersey.server.JSONP;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * @author Alfred Röttger Rydahl
 * @date 31/08/2021
 * @description
 **/
@XmlRootElement
public class DataKvis implements Serializable
{
	@XmlElement
	private String question = "Hvad dag er det i dag";
	
	public DataKvis() {}
	
	public DataKvis(String question) { this.question = question; }
	
	public String getQuestion()
	{
		return question;
	}
	
	public void setQuestion(String question)
	{
		this.question = question;
	}
}
