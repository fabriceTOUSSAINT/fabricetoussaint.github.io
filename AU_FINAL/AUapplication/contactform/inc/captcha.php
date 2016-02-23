<?php

$captcha_length = 4;

$captcha_format = 'letters';

?>
<?php
session_start();


/**
 * Written in saveform.php:
 * $captcha_length = xx;
 * $captcha_format = 'www';
 */


$captcha_length = (isset($captcha_length) && $captcha_length)?$captcha_length:6;


if(isset($_GET['length']) && $_GET['length']) $captcha_length = $_GET['length'];


$captcha_characters = array();

$captcha_number = array(1,2,3,4,5,6,7,8,9);

$captcha_letter = array('a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z');



/**
 * DEFAULT NUMBER OF LETTERS AND NUMBERS
 */
$nb_numbers = ceil($captcha_length/2);
$nb_letters = $captcha_length-ceil($captcha_length/2);

/**
 * NUMBERS IN THE CAPTCHA
 */

if(isset($_GET['format']) && $_GET['format']=='numbers')
{
	$captcha_characters = array();
	$nb_numbers = $captcha_length;
}

$captcha_rand_number = array_rand($captcha_number, $nb_numbers);



if(!is_array($captcha_rand_number)) // If you are picking only one entry, array_rand() returns the key for a random entry.
{
	$captcha_rand_number = array($captcha_rand_number);
}

//var_dump($captcha_rand_number);


foreach($captcha_rand_number as $value)
{
	$captcha_characters[] = $captcha_number[$value];
}


/**
 * LETTERS IN THE CAPTCHA
 */

if(isset($_GET['format']) && $_GET['format']=='letters')
{
	$captcha_characters = array();
	$nb_letters = $captcha_length;
}


if(count($captcha_characters)<$captcha_length)
{
	$captcha_rand_letter = array_rand($captcha_letter, $nb_letters);
	
	if(!is_array($captcha_rand_letter)) // If you are picking only one entry, array_rand() returns the key for a random entry.
	{
		$captcha_rand_letter = array($captcha_rand_letter);
	}
	//var_dump($captcha_rand_letter);

	foreach($captcha_rand_letter as $value)
	{
		$captcha_characters[] = $captcha_letter[$value];
	}

}
//var_dump($captcha_characters);

/**
 * SHUFFLE AND IMAGE
 */

shuffle($captcha_characters);

$captcha_img_value = '';

foreach($captcha_characters as $value)
{
	$captcha_img_value .= $value;
}

$_SESSION['captcha_img_string'] = $captcha_img_value;



// Create a 100*30 image
$im = imagecreate(110, 28);

// White background and blue text
$bg = imagecolorallocate($im, 238, 238, 238);
$textcolor = imagecolorallocate($im, 0, 0, 255);

// Write the string at the top left
imagestring($im, 5, 10, 6, $captcha_img_value, $textcolor);

// Output the image
header('Content-type: image/png');

imagepng($im);
imagedestroy($im);
?>