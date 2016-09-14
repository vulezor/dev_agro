<?php
class Prodavac_Merkantila_Api extends Controller{
  
    public function __construct()
    {
        parent::__construct();
       //Ajax::ajaxCheck();
       
	   $check_session = $this->check_logedIn($data->session_id); //checking if session exists
	    if(!$check_session){
	    	echo json_encode(array('logedIn'=>0), JSON_NUMERIC_CHECK);
	    	die();
	    }
    }

    private function check_logedIn($session_id)
    {
        Session::set_session_id($session_id);
        Session::init();
        $logged = Session::get('loggedIn');
        $status = Session::get('role');
        if ($logged == false && $status != 'magacioner') {
            unset($logged);
            unset($status);
            Session::destroy();
            return false;
        } else {
            return true;
        }
    }

    public function check(){
    	echo "only check";
    }
 }
 
   











?>













