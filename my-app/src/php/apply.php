<?php
header('Content-Type: application/json');
$db_type = 'mysql';
$db_host = 'mysql38.onamae.ne.jp';
$db_name = 'o69c8_competition';
$db_user = 'o69c8_access';
$db_pass = 'fudver-myzre2-pogTeq';

$data['msg'] = 'ok';
$data['check'] = true;

$memberID = $_POST['memberID'];
$competitionNum = $_POST['competitionNum'];
$today = date('Y-m-d');

try {
    $db = new PDO($db_type.':host='.$db_host.';dbname='.$db_name.';charset=utf8mb4', $db_user, $db_pass);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> setAttribute(PDO::MYSQL_ATTR_MULTI_STATEMENTS, false);
    $db -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $sql = 'select * from apply where memberID = :memberID and competitionNum = :competitionNum';
    $stmh = $db -> prepare($sql);
    $stmh -> bindValue(':memberID', $memberID, PDO::PARAM_INT);
    $stmh -> bindValue(':competitionNum', $competitionNum, PDO::PARAM_INT);
    $stmh -> execute();
    $count = $stmh -> rowCount();
    if ($count == 0) {
        $sql = 'select count(id) as count from apply';
        $stmh = $db -> prepare($sql);
        $stmh -> execute();
        $row = $stmh -> fetch(PDO::FETCH_ASSOC);
        $count = $row['count'] + 1;
        $sql = 'insert into apply(id, memberID, competitionNum, applied) values(:id, :memberID, :competitionNum, :applied)';
        $stmh = $db -> prepare($sql);
        $stmh -> bindValue(':id', $count, PDO::PARAM_INT);
        $stmh -> bindValue(':memberID', $memberID, PDO::PARAM_INT);
        $stmh -> bindValue(':competitionNum', $competitionNum, PDO::PARAM_INT);
        $stmh -> bindValue(':applied', $today);
        $stmh -> execute();
    } else {
        $data['msg'] = '重複した申し込みがあります。';
        $data['check'] = false;
    }
    $db = null;
} catch (PDOException $e) {
    $data['msg'] = '申し込み中にエラーが発生しました。';
    $data['check'] = false;
}

echo json_encode($data);