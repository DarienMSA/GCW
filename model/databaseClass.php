<?php
class Database
{
    private $host = 'localhost';
    private $db_name = 'gardenrushdb'; //id17883892_gardenrushdb
    private $username = 'root'; //id17883892_arsagadb
    private $password = ""; //|lms-F&6x+12_f^~

    private $conn;

    public function connect()
    {
        $this->con = null;
        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
        } catch (PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
            die();
        }

        return $this->conn;
    }
}
