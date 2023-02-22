import './style.css';
import liff from '@line/liff';
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import {sha256, headerSet} from "./src/js/module";

const COMP_LIST = document.getElementById('compList');
headerSet();

liff.init({
    liffId: '1657935821-PNbmYlE5',
    // withLoginOnExternalBrowser: true,
})
.then(() => {
    idGet();
    btnSet();
})
.catch((error) => {
    console.log(error);
});

function idGet() {
    liff.getProfile()
        .then((profile) => {
            memberCheck(profile.userId);
        })
}

function memberCheck(uid) {
    sha256(uid)
        .then(hash => {
            let params = new URLSearchParams();
            params.append('uid', hash);
            axios.post('/src/php/memberCheck.php', params)
                .then((res) => {
                    if (!res.data.check) {
                        window.alert('会員番号とLINEを連携してください。');
                        window.location.href = '/signup';
                    } else {
                        document.getElementById('LINEid').innerHTML = '会員番号：' + res.data.member.memberID + '<br>' + '会員名：' + res.data.member.name;
                        tableSet(res.data.member.memberID, res.data.member.name);
                    }
                })
        })
}

function btnSet() {
    const BTN_AREA = document.getElementById('btnArea');
    if (liff.isInClient()) {
        BTN_AREA.classList.add('d-none');
    } else {
        const BUTTON = document.createElement('span');
        BUTTON.classList.add('btn', 'btn-success');
        if (liff.isLoggedIn()) {
            BUTTON.innerText = 'ログアウト';
            BUTTON.addEventListener('click', liff.logout);
        } else {
            BUTTON.innerText = 'ログイン';
            BUTTON.addEventListener('click', liff.login);
        }
        BTN_AREA.appendChild(BUTTON);
    }
}

function tableSet(memberID, memberName) {
    axios.get('/src/php/listGet.php')
        .then((res) => {
            console.log(res.data);
            res.data.competition.forEach((d) => {
                const CARD = document.createElement('div');
                CARD.classList.add('card', 'mb-2', 'position-relative');
                const CARD_BODY = document.createElement('div');
                CARD_BODY.classList.add('card-body');
                const TITLE = document.createElement('h5');
                TITLE.classList.add('card-title');
                TITLE.innerText = d.date;
                CARD_BODY.appendChild(TITLE);
                const NAME = document.createElement('p');
                NAME.classList.add('card-text');
                NAME.innerText = d.name;
                CARD_BODY.appendChild(NAME);
                const VENUE = document.createElement('p');
                VENUE.classList.add('card-text');
                VENUE.innerText = d.venue;
                CARD_BODY.appendChild(VENUE);
                const PRICE = document.createElement('p');
                PRICE.classList.add('card-text');
                PRICE.innerText = '参加料(1名)：' + d.price + '円';
                CARD_BODY.appendChild(PRICE);
                const REQUEST_AREA = document.createElement('p');
                REQUEST_AREA.classList.add('text-center');
                const REQUEST = document.createElement('a');
                REQUEST.href = '/apply?player=' + memberName + '&memberID=' + memberID + '&competition=' + d.name + '&date=' + d.date + '&venue=' + d.venue + '&price=' + d.price + '&num=' + d.id;
                REQUEST.classList.add('btn', 'btn-success');
                REQUEST.innerText = '申し込む';
                REQUEST_AREA.appendChild(REQUEST)
                CARD_BODY.appendChild(REQUEST_AREA);
                CARD.appendChild(CARD_BODY);
                COMP_LIST.appendChild(CARD);
            })
        })
}