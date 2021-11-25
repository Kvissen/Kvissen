package controllers.kvis.dto;

import controllers.kvis.dto.kvisAPI.KvisActivatedAPIDTO;
import controllers.kvis.dto.kvisDB.KvisActivatedDBDTO;

/**
 * @author Alfred Röttger Rydahl
 * @date 25/11/2021
 **/
public class KvisActivatedFactory
{
	public static KvisActivatedAPIDTO[] DBToAPI(final KvisActivatedDBDTO[] dbdtos)
	{
		// Get the length of DB object array
		final int length = dbdtos.length;
		
		// Create Array
		final KvisActivatedAPIDTO[] res = new KvisActivatedAPIDTO[length];
		
		for (int i=0; i < length; i++)
			res[i] = DBToAPI(dbdtos[i]);
		
		return res;
	}
	
	
	public static KvisActivatedAPIDTO DBToAPI(final KvisActivatedDBDTO dbdto)
	{
		return new KvisActivatedAPIDTO(dbdto.kvis_id, dbdto.interaction_code, dbdto.activated_time);
	}
	
	
	public static KvisActivatedDBDTO APIToDB(final KvisActivatedAPIDTO apidto)
	{
		return new KvisActivatedDBDTO(apidto.kvisId, apidto.interaction_code, apidto.activated_time);
	}
	
	private KvisActivatedFactory() {}
}
