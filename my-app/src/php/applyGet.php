<?php
header('Content-Type: application/json');
$db_type = 'mysql';
$db_host = 'mysql38.onamae.ne.jp';
$db_name = 'o69c8_competition';
$db_user = 'o69c8_access';
$db_pass = 'fudver-myzre2-pogTeq';

$data['msg'] = 'ok';

$LINEID = $_POST['LINEID'];

try {
    $db = new PDO($db_type.':host='.$db_host.';dbname='.$db_name.';charset=utf8mb4', $db_user, $db_pass);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> setAttribute(PDO::MYSQL_ATTR_MULTI_STATEMENTS, false);
    $db -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $sql = 'select * from allApply where LINEID = :LINEID order by date';
    $stmh = $db -> prepare($sql);
    $stmh -> bindValue(':LINEID', $LINEID, PDO::PARAM_STR);
    $stmh -> execute();
    while ($row = $stmh -> fetch(PDO::FETCH_ASSOC)) {
        $data['apply'][] = $row;
    }
    $db = null;
} catch (PDOException $e) {
    $data['msg'] = $e;
}

echo json_encode($data);