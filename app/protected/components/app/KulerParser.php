<?php

/**
* 
*/

function add_number_sign($v) {
	return '#' . trim($v);
}

class KulerParser
{
	static public function parseOneColorXml($xml)
	{
		preg_match_all('/Hex\:(?P<colors>.*)\<\/desc/si', $xml, $matches);
		if (isset($matches['colors'][0]) && !empty($matches['colors'][0])) {
			 return array_map('add_number_sign', explode(',', trim($matches['colors'][0])));
		}
	}
	
	static public function parseMultiColorXml($xml) {
		preg_match_all('/Hex\:(?P<colors>[^<]*)/si', $xml, $matches);
		if (isset($matches['colors']) && $matches['colors']) {
			$rows = array();
			foreach ($matches['colors'] as $colors) {
				$rows[] = array_map('add_number_sign', explode(', ', trim($colors)));
			}
			return $rows;
		}
	}
}
