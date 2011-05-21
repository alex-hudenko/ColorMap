<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='//layouts/main';
	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();
	
	protected function ajaxSuccess($data = array()) {
		$json = CJSON::encode(
			array(
				'success' => true,
		) + $data);
		
		$callback = Yii::app()->request->getParam('callback');
		
		if ($callback) {
			$json = $callback . '(' . $json . ')';
		}
		
		$this->noStroreHeaders();
		
		header("content-type: application/x-javascript");
		
		echo $json;
		
		Yii::app()->end();
	}
    
	protected function ajaxError($message, $data = array()) {
		$json = CJSON::encode(array_merge(
			array(
				'id' => -1,
				'success' => false,
				'message' => $message
			),
			$data
		));
		$callback = Yii::app()->request->getParam('callback');

		if ($callback) {
			$json = $callback . '(' . $json . ')';
		}

		$this->noStroreHeaders();
		header("content-type: application/x-javascript");

		echo $json;

		Yii::app()->end();
	}
	
	protected function noStroreHeaders()
	{
		header('Cache-Control: no-store');
		header('Pragma: no-store');
	}
	
}