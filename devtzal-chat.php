<?php
/*
Plugin Name: Devtzal Chat 
Plugin URI: https://devtzal.com/
Description: Chatbot Client
Version: 1.0
Author: Devtzal
Text Domain: devtzal-chat
*/


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( !defined('ABSPATH') ) {
    exit("Do not access this file directly.");
}

define( 'DEVTZALCHAT_VERSION', '1.0' );
/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-devtzal-chat-activator.php
 */

function activate_devtzal_chat(){
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-devtzal-chat-activator.php';
	$initializer = new Devtzal_Chat_Activator();
	$initializer->activate();
 }
/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-devtzal-chat-deactivator.php
 */
function deactivate_devtzal_chat(){

    require_once plugin_dir_path( __FILE__ ) . 'includes/class-devtzal-chat-deactivator.php';
	Devtzal_Chat_Desactivator::deactivate();
 }

register_activation_hook( __FILE__, 'activate_devtzal_chat' );
register_deactivation_hook( __FILE__, 'deactivate_devtzal_chat' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */

require plugin_dir_path( __FILE__ ) . 'includes/class-devtzal-chat.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_devtzal_chat() {

	$plugin = new DevtzalChat();
	$plugin->run();

}
run_devtzal_chat();

function build_chat() {
    wp_enqueue_script('vuejs');
    wp_enqueue_script('vuejs1');
    return '<div id ="app-chat"></div>';
}

add_shortcode('chat', 'build_chat');





