import './style.css';
import liff from '@line/liff';
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import {sha256, headerSet} from "../src/js/module";

const INPUT_AREA = document.getElementById('inputArea');
const CHECK_AREA = document.getElementById('checkArea');
let memberID = '';
headerSet();

document.getElementById('infoCheck').addEventListener('click', () => {
    memberID = document.getElementById('memberID').value;
    if (memberID !== '') {
        document.getElementById('span-memberID').innerText = memberID;
        let params = new URLSearchParams();
        params.append('memberID', memberID);
        axios.post('/src/php/memberGet.php', params)
            .then((res) => {
                if (res.data.check) {
                    document.getElementById('memberName').innerText = res.data.member.name;
                    INPUT_AREA.classList.add('d-none');
                    CHECK_AREA.classList.remove('d-none');
                } else {
                    window.alert('登録された会員番号がありません\n会員番号をご確認ください');
                }
            })
    } else {
        window.alert('会員番号を入力してください。');
    }
})

document.getElementById('fix').addEventListener('click', () => {
    INPUT_AREA.classList.remove('d-none');
    CHECK_AREA.classList.add('d-none');
})

liff.init({
    liffId: '1657935821-PNbmYlE5',
    // withLoginOnExternalBrowser: true,
})
    .then(() => {
        btnAdd();
    })
    .catch((error) => {
        console.log(error);
    });

function btnAdd() {
    liff.getProfile()
        .then((profile) => {
            const BUTTON = document.getElementById('submit');
            sha256(profile.userId)
                .then(hash => {
                    BUTTON.addEventListener('click', {LINEID: hash, handleEvent: signup});
                })
        })
}

function signup() {
    if (document.getElementById('check').checked) {
        let params = new URLSearchParams();
        params.append('LINEID', this.LINEID);
        params.append('memberID', memberID);
        axios.post('/src/php/memberSignup.php', params)
            .then((res) => {
                if (res.data.msg === 'ok') {
                    window.alert('連携が完了しました\nTOPページに戻ります');
                    window.location.href = '/';
                } else {
                    window.alert('連携に失敗しました\n再度、連携するを押してください\n何度もエラーが出る場合はお問い合わせください。');
                }
            })
    } else {
        window.alert('内容をご確認いただけましたら、「確認しました」にチェックを入れてください。')
    }
}