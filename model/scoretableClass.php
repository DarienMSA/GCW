<?php
class scoreTable
{
    private $conn;
    private $table = 'scoretable';

    public $id_scoreTable;
    public $username;
    public $score;
    public $date;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getScoresbyScore()
    {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY score DESC;';

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function getScoresbyDate()
    {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY date DESC;';

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function insertScore()
    {
        $query = 'INSERT INTO ' . $this->table . ' SET username = :username, score = :score, date = NOW();';
        $stmt = $this->conn->prepare($query);



        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->score = htmlspecialchars(strip_tags($this->score));

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':score', $this->score);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
