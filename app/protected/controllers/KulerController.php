<?php

class KulerController extends Controller
{
	
	public function actionIndex()
	{
		$this->forward('kuler/popular');
	}
	
	public function actionPopular()
	{
		$palette = Palette::model()->findRandom();
		// $palette = Palette::model()->findByPk(16);
		if ($palette) {
			$this->ajaxSuccess(array('colors' => explode(',', $palette->colors)));
		}		
	}
		
	public function actionRandom()
	{
		$xml = $this->_getRandomPaletteXml();
		$colors = KulerParser::parseOneColorXml($xml);
		if ($colors) {
			$this->ajaxSuccess(array('colors' => $colors));
		}
	}
	
	private function _getRandomPaletteXml()
	{
		// getting xml
		// if (isset(Yii::app()->session['xml'])) {
		// 	Yii::app()->session['xml'] = Curl::file_get_contents('http://kuler-api.adobe.com/rss/get.cfm?listtype=random&key='.Yii::app()->params['kuler_api_key'].'&itemsPerPage=1');
		// }		
		// $xml = Yii::app()->session['xml'];
		return Curl::file_get_contents('http://kuler-api.adobe.com/rss/get.cfm?listtype=random&key='.Yii::app()->params['kuler_api_key'].'&itemsPerPage=1');
	}
	
}