<?php
class Test_Api extends Controller{
	public function __construct()
    {
        parent::__construct();
		if(isset($_GET['session_id'])){
			Session::set_session_id($session_id);
		}
       	Session::init();
        $logged = Session::get('loggedIn');
        $status = Session::get('role');
        if ($logged == false || $status != 'Administrator' && $status != 'Redovan korisnik' && $status != 'Logistika') {
            unset($logged);
            unset($status);
            Session::destroy();
            header('Content-Type: application/json');
            echo json_encode(array('logedIn'=>0), JSON_NUMERIC_CHECK);
            die;
        } 
	
    }


    public function check(){
    	echo "only check";
    }
}
?>