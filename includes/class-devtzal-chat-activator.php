<?php
/**
 * @package DevtzalChat
 */

class Devtzal_Chat_Activator
{
    public static function activate() {
		flush_rewrite_rules();
		
	}
}