<?php
class Prodavac_Merkantila_Api extends Controller{
  
    public function __construct()
    {
       
       parent::__construct();
		if(isset($_GET['session_id'])){
			Session::set_session_id($session_id);
		}
       	/*Session::init();
        $logged = Session::get('loggedIn');
        $status = Session::get('role');
        if ($logged == false || $status != 'Administrator' && $status != 'Redovan korisnik' && $status != 'Logistika') {
            unset($logged);
            unset($status);
            Session::destroy();
            header('Content-Type: application/json');
            echo json_encode(array('logedIn'=>0), JSON_NUMERIC_CHECK);
            die;
        } */
    }

     public function get_clients(){
        $sql = 'SELECT clients.*, places.place_name, places.post_number FROM input_merkantila
				INNER JOIN input_records ON input_records.input_id = input_merkantila.input_id
				INNER JOIN type_of_goods ON type_of_goods.type_of_goods_id = input_merkantila.type_of_goods_id
				INNER JOIN clients ON (clients.client_id = input_records.client_id)
				INNER JOIN places ON (places.place_id = clients.place_id)
				WHERE input_merkantila.sort_of_goods_id = :sort_of_goods_id
				GROUP BY input_records.client_id ORDER BY clients.client_id';
        $params = array(':sort_of_goods_id'=>'1');
        $result = $this->model->get_values($sql, $params);
        header('Content-Type: application/json');
        echo json_encode(array('logedIn'=>1, 'data'=>$result), JSON_NUMERIC_CHECK);		
    }


    public function get_goods_type($client_id){
    	$sql = "SELECT input_merkantila.type_of_goods_id as id, type_of_goods.goods_type as name FROM input_merkantila 
				INNER JOIN input_records ON input_records.input_id = input_merkantila.input_id
				INNER JOIN type_of_goods ON type_of_goods.type_of_goods_id = input_merkantila.type_of_goods_id
				WHERE input_records.client_id= :client_id AND input_merkantila.sort_of_goods_id= :sort_of_goods_id GROUP BY id";
		$params = array(':client_id'=>$client_id, ':sort_of_goods_id'=>'1');
		$result = $this->model->get_values($sql,$params);
		header('Content-Type: application/json');
        echo json_encode(array('logedIn'=>1, 'data'=>$result), JSON_NUMERIC_CHECK);		
    }

    public function get_goods(){
    	//print_r($_GET);
    	$client_id = $_GET['client_id'];
    	$good_type_id = $_GET['good_type_id'];
    	$sql = "SELECT goods.goods_id as id, goods.goods_name as name FROM input_merkantila 
				INNER JOIN input_records ON input_records.input_id = input_merkantila.input_id
				INNER JOIN type_of_goods ON type_of_goods.type_of_goods_id = input_merkantila.type_of_goods_id
				INNER JOIN goods ON goods.goods_id = input_merkantila.goods_id
				WHERE input_records.client_id= :client_id 
				AND input_merkantila.sort_of_goods_id= :sort_of_goods_id 
				AND input_merkantila.type_of_goods_id= :type_of_goods_id 
				GROUP BY id";
		$params = array(':client_id'=>$client_id, ':sort_of_goods_id'=>'1', ':type_of_goods_id'=>$good_type_id);
		$result = $this->model->get_values($sql,$params);
		header('Content-Type: application/json');
        echo json_encode(array('logedIn'=>1, 'data'=>$result), JSON_NUMERIC_CHECK);		
    }

    public function get_sum_srps(){
    	$client_id = $_GET['client_id'];
    	$good_type_id = $_GET['good_type_id'];
    	$good_id = $_GET['good_id'];
    	$sql = 'SELECT input_records.document_br, clients.firm_name, type_of_goods.goods_type, sort_of_goods.goods_sort, goods.goods_name, sum(input_merkantila.srps) AS srps FROM input_merkantila
				INNER JOIN input_records ON input_records.input_id  = input_merkantila.input_id  
				INNER JOIN clients  ON clients.client_id  = input_records.client_id  
				INNER JOIN type_of_goods  ON type_of_goods.type_of_goods_id  = input_merkantila.type_of_goods_id  
				INNER JOIN sort_of_goods  ON sort_of_goods.sort_of_goods_id  = input_merkantila.sort_of_goods_id 
				INNER JOIN goods  ON goods.goods_id  = input_merkantila.goods_id  
				WHERE input_records.client_id= :client_id
				AND  input_merkantila.sort_of_goods_id= :sort_of_goods_id
				AND  input_merkantila.type_of_goods_id= :type_of_goods_id
				AND  input_merkantila.goods_id= :good_id';
		$params = array(':client_id'=>$client_id, ':sort_of_goods_id'=>'1', ':type_of_goods_id'=>$good_type_id, ':good_id'=>$good_id);
		$result = $this->model->get_values($sql,$params);
		header('Content-Type: application/json');
        echo json_encode(array('logedIn'=>1, 'data'=>$result));			
    }

    
 }
 
   




