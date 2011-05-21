<?php
class GrabFavoritePalettesCommand extends CConsoleCommand
{
	public function run($args)
	{
		$xml = Curl::file_get_contents('http://kuler-api.adobe.com/rss/get.cfm?listtype=popular&key='.Yii::app()->params['kuler_api_key'].'&itemsPerPage=1000');
		
		if (!$xml) {
			throw new CException('Can not get palette');
		}
		
		$colors = KulerParser::parseMultiColorXml($xml);
		
		if (empty($colors)) {
			throw new CException('Kuler return no colors');
		}
		
		foreach ($colors as $_colors) {
			$palette = new Palette();			
			$palette->colors = implode(',', $_colors);
			if ($palette->save()) {
				echo "$_colors \n";
			}
		}
	}
}