<?php
class Wearehouse_Api_Model extends Model{
    public function __construct(){
        parent::__construct();
    }

    //get values
    public function get_values($sql, $id){

        if($id===null){
            $obj = array();
        } else if (is_array($id)) {
            $obj = $id;
        }
        return $this->db->select($sql, $obj);
    }

    //set values
    public function set_values($table, $obj){

        $this->db->insert($table, $obj);
        return $this->db->lastInsertId();
    }

    public function update_values($table, $data, $where){
         $this->db->update($table, $data, $where);
    }
}
?>