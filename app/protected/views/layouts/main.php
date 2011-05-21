<!doctype html>
<html>

	<head>
		<meta charset="utf-8"/>
		<title></title>
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->		
		<link rel="stylesheet" media="all" href="<?php echo Yii::app()->request->baseUrl; ?>/css/less.css"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<!-- Adding "maximum-scale=1" fixes the Mobile Safari auto-zoom bug: http://filamentgroup.com/examples/iosScaleBug/ -->
				
		<link rel="stylesheet" media="all" href="<?php echo Yii::app()->request->baseUrl; ?>/css/main.css"/>
		<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.12.custom.css" rel="stylesheet" />	
		
		<!-- libs -->
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
		<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/script/jquery-ui-1.8.12.custom.min.js"></script>
		<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/script/jquery.color.js"></script>
		
		<!-- color maps -->
		<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/script/ColorMap.js"></script>
		<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/script/ColorMapStyleCollection.js"></script>
		<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/script/map.js"></script>
		
	</head>
	
	<body lang="en">
		<?php echo $content; ?>
	</body>
	
</html>