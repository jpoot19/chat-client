<?php
/**
 * @package DevtzalChat
 */

 class DevtzalChat{
      /**
   * The loader that's responsible for maintaining and registering all hooks that power
   * the plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      DevtzalChat_Loader    $loader    Maintains and registers all hooks for the plugin.
   */
    protected $loader;
    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $plugin_name    The string used to uniquely identify this plugin.
     */
      protected $plugin_name;
      /**
       * The current version of the plugin.
       *
       * @since    1.0.0
       * @access   protected
       * @var      string    $version    The current version of the plugin.
       */
      protected $version;
  
      /**
       * Define the core functionality of the plugin.
       *
       * Set the plugin name and the plugin version that can be used throughout the plugin.
       * Load the dependencies, define the locale, and set the hooks for the admin area and
       * the public-facing side of the site.
       *
       * @since    1.0.0
       */
      public function __construct() {
          if ( defined( 'DEVTZALCHAT_VERSION' ) ) {
            $this->version = DEVTZALCHAT_VERSION;
          } else {
            $this->version = '1.0.0';
          }
          $this->plugin_name = 'devtzal-chat';
      
          $this->load_dependencies();
        //   $this->set_locale();
        //   $this->define_admin_hooks();
          $this->define_public_hooks();
      
        }
  
        /**
         * Load the required dependencies for this plugin.
         *
         * Include the following files that make up the plugin:
         *
         * - DevtzalChat_Loader. Orchestrates the hooks of the plugin.
         * - DevtzalChat_i18n. Defines internationalization functionality.
         * - DevtzalChat_Admin. Defines all hooks for the admin area.
         * - DevtzalChat_Public. Defines all hooks for the public side of the site.
         *
         * Create an instance of the loader which will be used to register the hooks
         * with WordPress.
         *
         * @since    1.0.0
         * @access   private
         */
        private function load_dependencies(){
  
          /**
           * The class responsible for orchestrating the actions and filters of the
           * core plugin.
           */
          require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-devtzal-chat-loader.php';
           /**
           * The class responsible for defining internationalization functionality
           * of the plugin.
           */
        //   require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-eli-chatbot-i18n.php';
  
          /**
           * The class responsible for defining all actions that occur in the admin area.
           */
        //   require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-eli-chatbot-admin.php';
          /**
           * The class responsible for defining all actions that occur in the cliengo form.
           */
        //   require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-eli-chatbot-form.php';
  
          /**
           * The class responsible for defining all actions that occur in the public-facing
           * side of the site.
           */
          require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-devtzal-chat-public.php';
  
          $this->loader = new DevtzalChat_Loader();
        }
  
  
          /**
         * Define the locale for this plugin for internationalization.
         *
         * Uses the Cliengo_i18n class in order to set the domain and to register the hook
         * with WordPress.
         *
         * @since    1.0.0
         * @access   private
         */
        // private function set_locale() {
  
        //   $plugin_i18n = new EliChatbot_i18n();
  
        //   $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
  
        // }
        /**
       * Register all of the hooks related to the admin area functionality
       * of the plugin.
       *
       * @since    1.0.0
       * @access   private
       */
    //   private function define_admin_hooks(){
    //     $plugin_admin      = new EliChatbot_Admin( $this->get_plugin_name(), $this->get_version() );
    //     $this->loader->add_action( 'admin_menu', $plugin_admin, 'eli_chatbot_options_page' );
    //   }
  
      /**
       * Register all of the hooks related to the public-facing functionality
       * of the plugin.
       *
       * @since    1.0.0
       * @access   private
       */
      private function define_public_hooks(){
          $plugin_public = new DevtzalChat_Public($this->get_plugin_name(), $this->get_version());
          $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
          $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
          $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_media' );
      }
  
  
      /**
       * Run the loader to execute all of the hooks with WordPress.
       *
       * @since    1.0.0
       */
      public function run() {
        $this->loader->run();
      }
  
  
      /**
       * The name of the plugin used to uniquely identify it within the context of
       * WordPress and to define internationalization functionality.
       *
       * @since     1.0.0
       * @return    string    The name of the plugin.
       */
      public function get_plugin_name() {
        return $this->plugin_name;
      }
  
      /**
       * The reference to the class that orchestrates the hooks with the plugin.
       *
       * @since     1.0.0
       * @return    DevtzalChat_Loader    Orchestrates the hooks of the plugin.
       */
      public function get_loader() {
        return $this->loader;
      }
  
  
      /**
       * Retrieve the version number of the plugin.
       *
       * @since     1.0.0
       * @return    string    The version number of the plugin.
       */
      public function get_version() {
        return $this->version;
      }
  
 }