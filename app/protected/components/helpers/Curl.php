<?php
	/**
	* 
	*/
	class Curl
	{
		static public function file_get_contents($url)
		{
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
			$_str = curl_exec($curl);
			curl_close($curl);
			return $_str;
		}
	}
	
?>