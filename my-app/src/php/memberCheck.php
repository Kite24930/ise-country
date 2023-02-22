<?php
header('Content-Type: application/json');
$db_type = 'mysql';
$db_host = 'mysql38.onamae.ne.jp';
$db_name = 'o69c8_competition';
$db_user = 'o69c8_access';
$db_pass = 'fudver-myzre2-pogTeq';

$data['msg'] = 'ok';

$uid = $_POST['uid'];

try {
    $db = new PDO($db_type.':host='.$db_host.';dbname='.$db_name.';charset=utf8mb4', $db_user, $db_pass);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> setAttribute(PDO::MYSQL_ATTR_MULTI_STATEMENTS, false);
    $db -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $sql = 'select name, memberID from member where LINEID = :LINEID';
    $stmh = $db -> prepare($sql);
    $stmh -> bindValue(':LINEID', $uid, PDO::PARAM_STR);
    $stmh -> execute();
    if ($stmh -> rowCount() > 0) {
        $data['check'] = true;
        while ($row = $stmh -> fetch(PDO::FETCH_ASSOC)) {
            $data['member'] = $row;
        }
    } else {
        $data['check'] = false;
    }
    $db = null;
} catch (PDOException $e) {
    $data['msg'] = $e;
}

echo json_encode($data);