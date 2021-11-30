package controllers.result.model;

/**
 * @author Alfred Röttger Rydahl
 * @date 30/11/2021
 **/
public class ScoreCalculator
{
	public static int calculate(final int correct, final int total)
	{
		return correct * 100 / total;
	}
}
